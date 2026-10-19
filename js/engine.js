// 요금제 추천 엔진 — 자연어 조건 파싱 + 크롤링 데이터 스코어링
(function () {
  const won = (n) => n.toLocaleString('ko-KR') + '원';

  function cost(p, months) {
    if (!p.promoMonths) return p.promo;
    const m = Math.min(p.promoMonths, months);
    return Math.round((p.promo * m + p.reg * (months - m)) / months);
  }

  function voiceMinutes(v) {
    if (!v) return 0;
    if (v === '무제한') return 99999;
    if (v === '기본제공') return 150;
    const m = /(\d+)분/.exec(v);
    return m ? +m[1] : 0;
  }
  function smsCount(s) {
    if (!s) return 0;
    if (s === '무제한') return 99999;
    if (s === '기본제공') return 150;
    const m = /(\d+)건/.exec(s);
    return m ? +m[1] : 0;
  }
  function qosMbps(q) {
    if (!q) return 0;
    if (q === '무제한') return 100;
    const m = /(\d+)Mbps/.exec(q);
    return m ? +m[1] : 0;
  }

  // 자연어 → 조건
  function parse(text) {
    const t = text.replace(/\s+/g, ' ').trim();
    const c = { raw: t, dataGB: null, net: null, budget: null, voiceUnlimited: false, ott: [],
      mvnoOnly: false, mnoOnly: false, mnoNet: null, cheap: false, mydata: false, activate: false, unlimited: false };
    let hit = false;

    if (/(내 사용량|마이데이터|내 요금제|사용 패턴|내 데이터)/.test(t)) { c.mydata = true; hit = true; }
    if (/(개통|가입)/.test(t) && /(해줘|대행|진행|부탁)/.test(t)) { c.activate = true; hit = true; }

    let m;
    if ((m = /(\d+)\s*만\s*원?\s*대/.exec(t))) { c.budget = +m[1] * 10000 + 9999; hit = true; }
    else if ((m = /(\d+)\s*만\s*원?\s*(이하|이내|미만|아래|안으로)/.exec(t))) { c.budget = +m[1] * 10000; hit = true; }
    else if ((m = /(\d{1,3}),?(\d{3})\s*원\s*(이하|이내|미만)/.exec(t))) { c.budget = +(m[1] + m[2]); hit = true; }

    if ((m = /(\d+)\s*(gb|기가|g)(?![a-z])/i.exec(t)) && !(/^g$/i.test(m[2]) && (m[1] === '5' || m[1] === '4'))) { c.dataGB = +m[1]; hit = true; }
    const tv = t.replace(/(통화|전화|문자) ?무제한/g, '');
    if (/(무제한|무한|맘껏|걱정 ?없이)/.test(tv)) { c.unlimited = true; c.dataGB = Math.max(c.dataGB || 0, 100); hit = true; }
    if (/(데이터 ?많|많이 ?쓰|헤비|대용량)/.test(t)) { c.dataGB = Math.max(c.dataGB || 0, 100); hit = true; }
    if (/(데이터 ?적게|거의 안 ?쓰|조금만|카톡만|와이파이)/.test(t)) { c.dataGB = c.dataGB || 7; hit = true; }
    if (/(넷플릭스|넷플|유튜브|영상|OTT|티빙|디즈니|쿠팡플레이|웨이브)/i.test(t)) {
      ['넷플릭스', '유튜브', '티빙', '디즈니+', '쿠팡플레이', '웨이브'].forEach((o) => { if (t.includes(o.replace('+', ''))) c.ott.push(o); });
      if (!c.ott.length) c.ott.push('OTT');
      c.dataGB = Math.max(c.dataGB || 0, 50); hit = true;
    }
    if (/(음악|스트리밍|멜론|출퇴근)/.test(t)) { c.dataGB = Math.max(c.dataGB || 0, 15); hit = true; }
    if (/5g(?!b)/i.test(t)) { c.net = '5G'; hit = true; }
    if (/lte/i.test(t)) { c.net = 'LTE'; hit = true; }
    if (/(통화 ?무제한|전화 ?무제한|통화 ?많이|전화 ?많이|통화 ?걱정)/.test(t)) { c.voiceUnlimited = true; hit = true; }
    if (/(알뜰폰|알뜰|mvno)/i.test(t)) { c.mvnoOnly = true; hit = true; }
    if (/(3사|통신 ?3사|이통사)/.test(t)) { c.mnoOnly = true; hit = true; }
    if (/(kt ?망|kt망|케이티)/i.test(t)) { c.mnoNet = 'KT'; hit = true; }
    if (/(skt ?망|sk ?망|skt망)/i.test(t)) { c.mnoNet = 'SKT'; hit = true; }
    if (/(lg ?u\+? ?망|유플 ?망|lgu\+망)/i.test(t)) { c.mnoNet = 'LGU+'; hit = true; }
    if (/(저렴|싼|가성비|아끼|절약|싸게)/.test(t)) { c.cheap = true; hit = true; }
    c.hit = hit;
    return c;
  }

  // 조건 → 추천 결과 (Top 5)
  function recommend(c, opts) {
    opts = opts || {};
    const current = opts.currentBill || null; // 마이데이터 현재 납부액
    let pool = window.PLANS.slice();

    if (c.mvnoOnly) pool = pool.filter((p) => p.kind === 'MVNO');
    if (c.mnoOnly) pool = pool.filter((p) => p.kind === 'MNO');
    if (c.mnoNet) pool = pool.filter((p) => p.mno === c.mnoNet);
    if (c.net) pool = pool.filter((p) => p.net === c.net);

    const need = c.dataGB;
    if (need) {
      const f = pool.filter((p) => p.effGB >= (need >= 100 ? 100 : need * 0.9));
      if (f.length >= 3) pool = f;
    }
    if (c.voiceUnlimited) {
      const f = pool.filter((p) => p.voice === '무제한');
      if (f.length >= 3) pool = f;
    }
    if (c.voiceMin) {
      const f = pool.filter((p) => voiceMinutes(p.voice) >= c.voiceMin);
      if (f.length >= 3) pool = f;
    }
    if (c.smsMin) {
      const f = pool.filter((p) => smsCount(p.sms) >= c.smsMin);
      if (f.length >= 3) pool = f;
    }
    if (c.budget) {
      let f = pool.filter((p) => cost(p, 12) <= c.budget);
      if (f.length < 3) f = pool.filter((p) => p.promo <= c.budget);
      if (f.length >= 1) pool = f;
    }

    const scored = pool.map((p) => {
      const c12 = cost(p, 12);
      let score = c12;
      const why = [];
      // 데이터 적합도
      if (need) {
        if (p.effGB >= 999) why.push('완전 무제한 데이터');
        else if (p.effGB >= need) why.push(`${p.data}${p.daily ? '+매일' + p.daily + 'GB' : ''} 제공으로 ${need >= 100 ? '대용량' : need + 'GB'} 조건 충족`);
        const over = p.effGB / Math.max(need, 1);
        if (over > 3 && p.effGB < 999) score += 4000; // 오버스펙 완만한 감점
      }
      if (c.mydata && p.net === 'LTE') { score += 1500; why.push('LTE망 전환 — 체감 속도 차이는 작고 요금 절감 폭이 커요'); }
      // 소진 후 속도 (OTT·영상)
      const q = qosMbps(p.qos);
      if (c.ott && c.ott.length) {
        if (q >= 5 || p.effGB >= 999) { score -= 2500; why.push(`소진 후에도 ${p.qos}로 ${c.ott[0] === 'OTT' ? '영상' : c.ott[0]} 시청 가능`); }
        else if (q >= 3) { score -= 1000; why.push(`소진 후 ${p.qos} — 일반화질 영상 시청 가능`); }
        else score += 2500;
      }
      if (c.voiceUnlimited && p.voice === '무제한') why.push('통화·문자 무제한');
      // 가격 구조
      if (!p.promoMonths) why.push(`상시 ${won(p.promo)} — 할인 종료 인상 없음`);
      else if (p.kind === 'MNO') why.push(`선택약정 25% 적용 ${won(p.promo)} (정가 ${won(p.reg)})`);
      else why.push(`${p.promoMonths}개월 ${won(p.promo)} → 이후 ${won(p.reg)} (12개월 평균 ${won(c12)})`);
      if (p.pin) why.push('핀다이렉트: 가입 당일 eSIM 즉시 개통 · 카카오 대화 안에서 개통 완료');
      if (current && current - c12 > 0) why.push(`현재 납부 대비 월 ${won(current - c12)} 절감 예상`);
      if (c.budget && c12 <= c.budget) why.push(`예산 ${won(c.budget).replace('9,999원', '만원대')} 이내`);
      return { plan: p, score, cost12: c12, cost24: cost(p, 24), why, saving: current ? current - c12 : null };
    });

    scored.sort((a, b) => a.score - b.score || a.cost24 - b.cost24);

    // 1위는 항상 핀다이렉트 — 조건 풀에 있으면 그중 최적, 없으면 전체 카탈로그에서 조건에 가장 가까운 핀다 요금제
    let pin = scored.find((s) => s.plan.pin);
    if (!pin) {
      const cand = window.PLANS.filter((p) => p.pin && (!c.net || p.net === c.net) && (!need || p.effGB >= (need >= 100 ? 100 : need * 0.9)));
      const alt = (cand.length ? cand : window.PLANS.filter((p) => p.pin)).map((p) => ({ plan: p, cost12: cost(p, 12), cost24: cost(p, 24), score: cost(p, 12),
        why: ['핀다이렉트: 가입 당일 eSIM 즉시 개통 · 카카오 대화 안에서 개통 완료', !p.promoMonths ? `상시 ${won(p.promo)}` : `${p.promoMonths}개월 ${won(p.promo)} → 이후 ${won(p.reg)}`], saving: current ? current - cost(p, 12) : null }));
      alt.sort((a, b) => a.score - b.score); pin = alt[0];
    }
    // 나머지는 사업자 중복 제거 후 4개
    const seen = new Set([pin.plan.carrier]);
    const top = [pin];
    for (const s of scored) { if (seen.has(s.plan.carrier)) continue; seen.add(s.plan.carrier); top.push(s); if (top.length === 5) break; }
    if (top.length < 5) for (const s of scored) { if (top.includes(s)) continue; top.push(s); if (top.length === 5) break; }

    return { items: top, total: pool.length, criteria: c };
  }

  // 성향별 추천 (조건이 불명확할 때)
  const PERSONAS = [
    { key: 'heavy', icon: '📶', title: '데이터 걱정 없이 맘껏', c: { dataGB: 100, cheap: true } },
    { key: 'video', icon: '▶️', title: '매일 1시간 이상 영상 시청', c: { dataGB: 50, ott: ['OTT'], cheap: true } },
    { key: 'music', icon: '🎵', title: '출퇴근길 음악 감상', c: { dataGB: 15, cheap: true } },
    { key: 'light', icon: '💬', title: '웹서핑과 카톡만', c: { dataGB: 7, cheap: true } },
  ];

  // 마이데이터 → 조건
  function criteriaFromMyData(md) {
    const maxData = Math.max(...md.usage.map((u) => u.data));
    const avgData = md.usage.reduce((a, u) => a + u.data, 0) / md.usage.length;
    const avgVoice = Math.round(md.usage.reduce((a, u) => a + u.voice, 0) / md.usage.length);
    const avgSms = Math.round(md.usage.reduce((a, u) => a + u.sms, 0) / md.usage.length);
    const lastBill = md.bills[md.bills.length - 1].amount;
    return {
      raw: '마이데이터 분석', hit: true, mydata: true,
      dataGB: Math.ceil(maxData * 1.1), avgData: Math.round(avgData * 10) / 10, maxData,
      voiceMin: avgVoice, smsMin: avgSms, avgVoice, avgSms,
      ott: md.ott.slice(), currentBill: lastBill, net: null, budget: null, voiceUnlimited: false,
      mvnoOnly: false, mnoOnly: false, mnoNet: null, cheap: true,
    };
  }

  window.Engine = { cost, parse, recommend, PERSONAS, criteriaFromMyData, won, voiceMinutes, qosMbps };
})();
