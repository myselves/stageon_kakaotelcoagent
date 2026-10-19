// ChatGPT for Kakao · Kakao Tools '요금제 AI 추천' 프로토타입 — 대화 흐름 / 렌더링
(function () {
  const $ = (s) => document.querySelector(s);
  const chat = $('#chat');
  const won = Engine.won;
  const MD = window.MYDATA;

  const S = { km: false, mydata: false, last: null, qa: null, busy: false, timing: 'now' };
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const el = (html) => { const d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstElementChild; };
  const now = () => { const d = new Date(); const h = d.getHours(); return `${h < 12 ? '오전' : '오후'} ${h % 12 || 12}:${String(d.getMinutes()).padStart(2, '0')}`; };
  const scroll = () => { chat.scrollTop = chat.scrollHeight; };

  // 매 답변마다 AI 개통 대행 가능 안내
  const AI_TIP = `<div class="ai-tip">⚡ 가입부터 개통까지 AI가 대행해 드려요. 카드의 [AI 개통]을 눌러주세요.</div>`;
  const kmLine = () => (S.km ? `\n💛 카카오멤버십 ON — 모든 요금제에 카카오멤버십이 포함돼요. (무료)` : '');

  // ===== 기본 메시지 =====
  function addUser(text) {
    chat.appendChild(el(`<div class="msg user"><span class="time">${now()}</span><div class="body"><div class="bubble">${esc(text)}</div></div></div>`));
    scroll();
  }
  function addAI(html, opt) {
    opt = opt || {};
    html = html.replace(/>[ \t]*\n\s*</g, '><').replace(/>[ \t]*\n\s*(?=\S)/g, '>'); // 템플릿 들여쓰기 공백 제거 (pre-wrap 대응)
    const m = el(`<div class="msg ai"><div class="avatar">AI</div><div class="body"><div class="name">요금제 AI 추천 <span style="color:#6b7480">· Kakao Tools</span></div>${opt.tool ? `<div class="tool-line done"><span class="dot"></span>Kakao Tools · 요금제 AI 추천</div>` : ''}<div class="bubble ${opt.wide ? 'wide' : ''}">${html}</div></div><span class="time">${now()}</span></div>`);
    chat.appendChild(m); scroll();
    return m.querySelector('.bubble');
  }
  async function typing(ms) {
    const t = el(`<div class="msg ai"><div class="avatar">AI</div><div class="body"><div class="bubble typing"><i></i><i></i><i></i></div></div></div>`);
    chat.appendChild(t); scroll(); await sleep(ms || 700); t.remove();
  }
  async function toolCall(label, ms) {
    const t = el(`<div class="msg ai"><div class="avatar">AI</div><div class="body"><div class="tool-line"><span class="dot"></span>Kakao Tools · 요금제 AI 추천 — ${label}</div></div></div>`);
    chat.appendChild(t); scroll(); await sleep(ms || 1100); t.remove();
  }

  // ===== 요금제 카드 =====
  function brandTag(p) {
    const b = window.BRANDS[p.carrier] || { bg: '#333', fg: '#fff' };
    return `<span class="brand"><i style="background:${b.bg};color:${b.fg}">${esc(p.carrier)}</i><span class="net">${p.mno}망 · ${p.net}</span></span>`;
  }
  const qosLabel = (q) => (q === '옵션' ? 'QoS 옵션' : q);
  function specLine(p) {
    const d = p.effGB >= 999 ? '데이터 완전 무제한' : `${p.data}${p.daily ? ' + 매일 ' + p.daily + 'GB' : ''} + 소진 후 ${qosLabel(p.qos)}`;
    return `${d} · 통화 ${p.voice} · 문자 ${p.sms}`;
  }
  function priceRow(item) {
    const p = item.plan;
    const after = !p.promoMonths ? `상시 할인가 · 12개월 평균 ${won(item.cost12)}` : p.kind === 'MNO' ? `정가 ${won(p.reg)} · 선택약정 24개월` : `${p.promoMonths}개월 후 ${won(p.reg)} · 12개월 평균 ${won(item.cost12)}`;
    return `<div class="price-row"><span class="price">월 ${won(p.promo)}${p.promoMonths ? `<small>${p.promoMonths}개월</small>` : '<small>상시</small>'}</span><span class="after">${after}</span></div>`;
  }
  function planCard(item, rank, ctx) {
    const p = item.plan;
    const b = window.BRANDS[p.carrier] || { bg: '#333', fg: '#fff' };
    const data = p.effGB >= 999 ? '무제한' : `${p.data}${p.daily ? '+매일' + p.daily + 'GB' : ''}`;
    const after = !p.promoMonths ? '상시' : p.kind === 'MNO' ? `정가 ${won(p.reg)}` : `${p.promoMonths}개월 후 ${won(p.reg)}`;
    const save = item.saving && item.saving > 0 ? `<em class="save">월 ${won(item.saving)} 절감</em> · ` : '';
    return `<div class="plan ${rank === 1 ? 'top' : ''}" data-act="detail" data-id="${p.id}">
      <div class="r1"><span class="rank">${rank}</span><span class="pname">${esc(p.name)}</span><span class="price">월 ${won(p.promo)}</span></div>
      <div class="r2"><span class="spec"><i class="bb" style="background:${b.bg};color:${b.fg}">${esc(p.carrier)}</i>${save}${data} · ${qosLabel(p.qos)} · ${p.mno}망${item.saving ? '' : ' · ' + after}</span>
        <span class="mini"><span class="badge ai" title="AI 개통 가능">⚡</span><span class="badge km" title="카카오멤버십 포함">K</span><button class="btn navy xs" data-act="activate" data-id="${p.id}">AI 개통</button></span></div>
    </div>`;
  }
  function condChips(c) {
    const a = [];
    if (c.mydata) a.push('마이데이터 실사용 기준');
    if (c.dataGB) a.push(c.unlimited ? '데이터 무제한·대용량' : `데이터 ${c.dataGB}GB 이상`);
    if (c.net) a.push(c.net);
    if (c.budget) a.push(`월 ${Math.floor(c.budget / 10000)}만원대 이내`);
    if (c.voiceUnlimited) a.push('통화 무제한');
    if (c.voiceMin) a.push(`통화 ${c.voiceMin}분 이상`);
    if (c.ott && c.ott.length) a.push(c.ott.join('·') + ' 시청');
    if (c.mvnoOnly) a.push('알뜰폰만');
    if (c.mnoOnly) a.push('통신 3사만');
    if (c.mnoNet) a.push(c.mnoNet + '망');
    if (c.cheap && !c.mydata) a.push('저렴한 순');
    return a.length ? `<div class="cond-chips">${a.map((x) => `<span>${esc(x)}</span>`).join('')}</div>` : '';
  }

  // ===== 추천 실행 =====
  async function runRecommend(c, opt) {
    opt = opt || {};
    S.busy = true;
    await typing(500);
    await toolCall(c.mydata ? '마이데이터 기반 요금제 비교 중' : '크롤링 요금제 비교 중', 1200);
    const res = Engine.recommend(c, { currentBill: c.currentBill || null });
    S.last = res;
    const items = res.items;
    if (!items.length) {
      addAI(`조건에 맞는 요금제를 찾지 못했어요. 조건을 조금 바꿔서 다시 말씀해 주세요.${AI_TIP}`);
      S.busy = false; return;
    }
    const title = opt.title || (c.mydata ? '개인 맞춤 Top 5' : `조건에 맞는 요금제 Top 5`);
    const sub = c.mydata
      ? `최근 3개월 실사용 평균 ${c.avgData}GB · 현재 납부 ${won(c.currentBill)} 기준`
      : `판매 중 ${window.PLANS.length}개 중 ${res.total}개 비교 · 12개월 총비용 낮은 순`;
    const html = `<div class="card-title">${title}</div><div class="card-sub">${sub}</div>${condChips(c)}
      ${items.map((it, i) => planCard(it, i + 1, { current: c.currentBill })).join('')}
      <div class="km-note">K 카카오멤버십 포함 — 통신이용 혜택을 카카오멤버십으로 받기 (무료)</div>
      ${AI_TIP}
      ${S.mydata || c.mydata
        ? `<div class="btn-row"><button class="btn ghost sm" data-act="qa">조건 바꿔 다시 추천</button><button class="btn y sm" data-act="mydata-again">다시 추천 받기</button></div>`
        : `<button class="btn y block sm" style="margin-top:8px" data-act="mydata">내 사용량 기반 추천 받기</button>`}`;
    addAI(html, { wide: true, tool: true });
    S.busy = false;
  }

  // ===== 성향별 카드 (조건 불명확) =====
  async function personaCard() {
    await typing(500);
    await toolCall('성향별 대표 요금제 조회', 900);
    const tiles = Engine.PERSONAS.map((ps) => {
      const r = Engine.recommend(Object.assign({ ott: [] }, ps.c)).items.slice(0, 2);
      return `<button class="persona" data-act="persona" data-key="${ps.key}"><div class="ph">${ps.icon} ${ps.title}</div>
        ${r.map((it) => `<div class="pp" style="margin-bottom:5px">${esc(it.plan.carrier)} ${esc(it.plan.name)}<span class="pv">${it.plan.effGB >= 999 ? '무제한' : it.plan.data}${it.plan.daily ? '+매일' + it.plan.daily + 'GB' : ''} · ${qosLabel(it.plan.qos)} <span class="pr">월 ${won(it.plan.promo)}</span></span></div>`).join('')}
      </button>`;
    }).join('');
    addAI(`<div class="card-title">추천 요금제</div><div class="card-sub">성향별로 가장 잘 맞는 요금제를 추천해드려요. 성향을 누르면 Top 5를 보여드릴게요.</div>
      <div class="persona-grid">${tiles}</div>${AI_TIP}
      <button class="btn y block" style="margin-top:10px" data-act="mydata">내 사용량 기반 추천 받기</button>`, { wide: true, tool: true });
  }

  // ===== CASE A · 조건 문답 =====
  const QA = [
    { key: 'data', ic: '📶', title: '데이터 사용량', sub: '월 평균 데이터 사용량을 선택해주세요!', opts: [['무제한·대용량 (100GB+)', 100], ['50GB 이상', 50], ['30~50GB', 30], ['10~30GB', 10], ['10GB 미만', 5]], hint: '정확히 모르셔도 괜찮아요. 가장 가까운 항목을 선택해 주세요!' },
    { key: 'voice', ic: '📞', title: '통화/문자 사용량', sub: '월 평균 통화 시간을 선택해주세요!', opts: [['300분 이상 (무제한 권장)', 300], ['100분~300분', 150], ['100분 미만', 50]], hint: '통화/문자 사용량도 요금제 선택에 중요해요!' },
    { key: 'ott', ic: '▶️', title: 'OTT 사용', sub: '이용 중인 OTT 서비스를 선택해주세요.', opts: [['넷플릭스', '넷플릭스'], ['티빙', '티빙'], ['유튜브 프리미엄', '유튜브'], ['디즈니+', '디즈니+'], ['없음', '']] },
    { key: 'bill', ic: '💳', title: '현재 납부 요금', sub: '현재 사용 중인 요금제는 얼마인가요?', opts: [['3만원대', 35000], ['5만원대', 55000], ['6만원대', 65000], ['8만원 이상', 85000]], input: true },
    { key: 'contract', ic: '🔒', title: '통신사 약정', sub: '이용중인 통신사에 약정이 있으신가요?', opts: [['없음', '없음'], ['3개월 이내 만료', '3개월 이내 만료'], ['6개월 이상 남음', '6개월 이상 남음']] },
  ];
  async function startQA() {
    S.qa = { i: 0, ans: {} };
    await typing(400);
    addAI(`조건 선택해서 찾기\n원하시는 조건을 선택해 주세요!`);
    await sleep(300);
    askNext();
  }
  function askNext() {
    const q = QA[S.qa.i];
    if (!q) return finishQA();
    const opts = q.opts.map((o) => `<button class="opt" data-act="opt" data-key="${q.key}" data-val="${esc(String(o[1]))}" data-label="${esc(o[0])}">${esc(o[0])}</button>`).join('');
    addAI(`<div class="q-title">${q.ic} ${q.title}</div><div class="q-sub">${q.sub}</div><div class="opts">${opts}</div>
      ${q.input ? `<div class="inline-input"><input type="number" placeholder="직접 입력 (원)" data-key="${q.key}"><button class="btn y sm" data-act="opt-input" data-key="${q.key}">입력 완료</button></div>` : ''}
      ${q.hint ? `<div class="hint">💡 ${q.hint}</div>` : ''}`, { wide: true });
  }
  async function answerQA(key, val, label, bubble) {
    bubble.querySelectorAll('.opt, .inline-input button').forEach((b) => { b.disabled = true; if (b.dataset.val === String(val)) b.classList.add('sel'); });
    S.qa.ans[key] = { val, label };
    addUser(label);
    S.qa.i++;
    await sleep(350);
    askNext();
  }
  async function finishQA() {
    const a = S.qa.ans;
    const c = { raw: '조건 문답', hit: true, cheap: true, ott: a.ott.val ? [a.ott.val] : [], dataGB: +a.data.val, net: null, budget: null,
      voiceUnlimited: +a.voice.val >= 300, voiceMin: +a.voice.val >= 300 ? 0 : +a.voice.val, mvnoOnly: false, mnoOnly: false, mnoNet: null,
      currentBill: +a.bill.val || null, contract: a.contract.label, unlimited: +a.data.val >= 100 };
    S.pendingC = c;
    await typing(400);
    addAI(`<div class="q-title">선택하신 조건으로 알아볼까요?</div>
      <div class="summary">
        <div class="s"><div class="ic">📶</div><div class="k">사용 데이터</div><div class="v">${esc(a.data.label.split(' ')[0])}</div></div>
        <div class="s"><div class="ic">📞</div><div class="k">통화</div><div class="v">${esc(a.voice.label.split(' ')[0])}</div></div>
        <div class="s"><div class="ic">▶️</div><div class="k">OTT</div><div class="v">${esc(a.ott.val || '없음')}</div></div>
        <div class="s"><div class="ic">💳</div><div class="k">현재 납부</div><div class="v">${c.currentBill ? won(c.currentBill) : '-'}</div></div>
        <div class="s"><div class="ic">🔒</div><div class="k">약정</div><div class="v">${esc(a.contract.label.split(' ')[0])}</div></div>
      </div>
      <button class="btn y block" data-act="rec-pending">AI 추천 받기</button>`, { wide: true });
  }

  // ===== CASE B · 마이데이터 자동 분석 (본인 인증 생략) =====
  async function startMyData() {
    if (S.busy) return;
    S.busy = true;
    await typing(500);
    addAI(`통신 마이데이터로 자동 분석할게요.\n<span style="color:#6b7480;font-size:12px">※ 프로토타입: 본인 인증·동의 절차는 생략하고 가상의 통신 마이데이터(${esc(MD.name)} · ${esc(MD.carrier)})를 불러옵니다.</span>`);
    await sleep(500);
    const b = addAI(`<div class="steps">
      <div class="step done" id="st1"><div class="sh">👤 개인정보 확인<span class="st">완료</span></div><div class="sb">${esc(MD.name)} | ${esc(MD.carrier)} | ${esc(MD.phone)} ✎<div class="tags"><span>최근 3개월 데이터</span><span>현재 납부요금</span><span>혜택 분석</span></div></div></div>
      <div class="step" id="st2"><div class="sh">🔍 통신 사용량 분석<span class="st">대기 중</span></div><div class="sb" style="display:none"></div><div class="bar"><i></i></div></div>
      <div class="step" id="st3"><div class="sh">✨ 혜택·결합 분석<span class="st">대기 중</span></div><div class="sb" style="display:none"></div><div class="bar"><i></i></div></div>
    </div>`, { wide: true });
    const run = async (id, text, ms) => {
      const s = b.querySelector('#' + id); s.classList.add('run'); s.querySelector('.st').textContent = '진행 중';
      const bar = s.querySelector('.bar i'); await sleep(50); bar.style.width = '70%'; await sleep(ms); bar.style.width = '100%'; await sleep(300);
      s.classList.remove('run'); s.classList.add('done'); s.querySelector('.st').textContent = '완료';
      const sb = s.querySelector('.sb'); sb.innerHTML = text; sb.style.display = 'block'; scroll();
    };
    const c = Engine.criteriaFromMyData(MD);
    await run('st2', `최근 3개월 데이터 평균 ${c.avgData}GB (최대 ${c.maxData}GB) · 통화 평균 ${c.avgVoice}분 · 문자 ${c.avgSms}건<br>현재 요금제 ${esc(MD.carrier)} ${esc(MD.plan.name)} (${MD.plan.data}) · 최근 납부 ${won(c.currentBill)}`, 1300);
    await run('st3', `선택약정 ${esc(MD.contract.status)} (${MD.contract.endedAt}) → 9월부터 정가 납부 중 · 결합 ${esc(MD.bundle)} · OTT 별도 구독 ${MD.ott.join('·')}<br>→ 110GB 요금제에서 평균 ${c.avgData}GB 사용 · 위약금 없이 지금 변경 가능`, 1300);
    await sleep(400);
    S.mydata = true;
    await typing(500);
    addAI(`<div class="q-title">마이데이터 분석이 완료됐어요!</div><div class="q-sub">현재 사용 패턴에 맞는 요금제 5개를 추천해드릴게요.</div>
      <div class="summary">
        <div class="s"><div class="ic">📶</div><div class="k">월 데이터</div><div class="v">${c.avgData}GB</div></div>
        <div class="s"><div class="ic">📞</div><div class="k">통화/문자</div><div class="v">${c.avgVoice}분/${c.avgSms}건</div></div>
        <div class="s"><div class="ic">▶️</div><div class="k">OTT</div><div class="v">${MD.ott.length}개</div></div>
        <div class="s"><div class="ic">💳</div><div class="k">현재 납부</div><div class="v">${won(c.currentBill)}</div></div>
        <div class="s"><div class="ic">🔒</div><div class="k">약정</div><div class="v">만료</div></div>
      </div>
      <div class="hint">진단: 약정 할인 종료로 월 ${won(MD.bills[2].amount - MD.bills[1].amount)} 인상 · 110GB 중 ${c.avgData}GB 사용 → 60~110GB 구간 저가 요금제로 변경 시 절감 폭이 커요.</div>`, { wide: true });
    S.busy = false;
    await sleep(600);
    await runRecommend(c);
  }

  // ===== 요금제 상세 바텀시트 =====
  function findItem(id) {
    const it = S.last && S.last.items.find((x) => x.plan.id === id);
    if (it) return it;
    const p = window.PLANS.find((x) => x.id === id);
    return Engine.recommend({ ott: [] }, {}).items.find((x) => x.plan.id === id) || { plan: p, cost12: Engine.cost(p, 12), cost24: Engine.cost(p, 24), why: [], saving: null };
  }
  function openDetail(id) {
    const it = findItem(id); const p = it.plan; const c = (S.last && S.last.criteria) || {};
    const cur = S.mydata || c.mydata;
    const left = cur ? '현재 요금제' : '선택 조건';
    const curBill = c.currentBill || null;
    const rows = cur ? [
      ['월요금', won(MD.bills[2].amount), `월 ${won(p.promo)}`],
      ['기본 데이터', MD.plan.data, p.effGB >= 999 ? '무제한' : p.data + (p.daily ? '+매일' + p.daily + 'GB' : '')],
      ['소진 후 속도', MD.plan.qos, qosLabel(p.qos)],
      ['통화/문자', `${MD.plan.voice}/${MD.plan.sms}`, `${p.voice}/${p.sms}`],
      ['통신망', `${MD.carrier} 5G`, `${p.mno}망 ${p.net}`],
      ['약정', '만료 (위약금 없음)', p.kind === 'MNO' ? '선택약정 24개월' : '무약정'],
    ] : [
      ['월요금', curBill ? won(curBill) : (c.budget ? `${Math.floor(c.budget / 10000)}만원대 이내` : '-'), `월 ${won(p.promo)}`],
      ['기본 데이터', c.dataGB ? (c.unlimited ? '무제한·대용량' : c.dataGB + 'GB 이상') : '-', p.effGB >= 999 ? '무제한' : p.data + (p.daily ? '+매일' + p.daily + 'GB' : '')],
      ['OTT/혜택', c.ott && c.ott.length ? c.ott.join('·') : '없음', Engine.qosMbps(p.qos) >= 3 || p.effGB >= 999 ? '소진 후 영상 시청 가능' : '소진 후 저속'],
      ['통화/문자', c.voiceUnlimited ? '무제한' : c.voiceMin ? c.voiceMin + '분 이상' : '-', `${p.voice}/${p.sms}`],
      ['통신망', c.mnoNet ? c.mnoNet + '망' : c.net || '-', `${p.mno}망 ${p.net}`],
    ];
    const saving = curBill ? curBill - it.cost12 : null;
    const reasons = (it.why.length ? it.why : ['조건 대비 12개월 총비용이 낮아요']).slice(0, 3);
    const basis = [
      `크롤링 스냅샷(${window.PLAN_SNAPSHOT_DATE}, 모요·사업자 공홈) 기준 판매 중인 요금제만 비교`,
      `할인가·정상가 분리 — 12개월 평균 ${won(it.cost12)} · 24개월 평균 ${won(it.cost24)}로 총비용 산출`,
      cur ? `최근 3개월 실사용(최대 ${c.maxData}GB)에 10% 여유를 둔 ${c.dataGB}GB 이상 요금제만 후보` : '카드·인터넷 결합 등 조건부 할인은 제외한 무조건 할인가 기준',
    ];
    $('#sheetBody').innerHTML = `
      <div class="sec pricebox">${brandTag(p)}<div class="pn">${esc(p.name)}</div><div class="pr">월 ${won(p.promo)}<small>${p.promoMonths ? `${p.promoMonths}개월 후 ${won(p.reg)}` : '상시'}</small></div>
        <div class="badges" style="margin-top:8px"><span class="badge ai">⚡ AI 개통 가능</span><span class="badge km">K 카카오멤버십 포함</span>${saving && saving > 0 ? `<span class="badge save">월 ${won(saving)} 절감 예상</span>` : ''}</div></div>
      <div class="sec"><h4>${left} vs 추천 요금제 비교</h4><table class="cmp"><tr><th></th><th>${left}</th><th>추천 요금제</th></tr>${rows.map((r) => `<tr><td>${r[0]}</td><td class="cur">${esc(r[1])}</td><td class="rec">${esc(r[2])}</td></tr>`).join('')}</table></div>
      <div class="sec"><h4>변경 시점 비교</h4><div class="timing"><button class="sel" data-timing="now">지금 변경</button><button data-timing="3m">3개월 후 변경</button><button data-timing="6m">6개월 후 변경</button></div><div class="timing-note" id="timingNote"></div></div>
      <div class="sec"><h4>AI 요금제 추천 사유</h4><ul class="numlist">${reasons.map((r, i) => `<li><span class="n">${i + 1}</span><span>${esc(r)}</span></li>`).join('')}</ul></div>
      <div class="sec"><h4>요금제 분석 판단 근거</h4><ul class="numlist">${basis.map((r, i) => `<li><span class="n b">${i + 1}</span><span>${esc(r)}</span></li>`).join('')}</ul></div>
      <div class="sec"><div class="km-box"><div class="km-logo" style="width:30px;height:30px;border-radius:9px;background:#FEE500;display:grid;place-items:center;font-weight:900;color:#3C1E1E">K</div><div class="txt">통신이용 혜택을 카카오멤버십으로 받기 (무료)<span>${S.km ? '이 요금제에 카카오멤버십이 포함돼 개통돼요.' : 'ON으로 켜면 모든 요금제에 카카오멤버십이 포함돼요.'}</span></div><button class="switch" id="kmSwitch2" role="switch" aria-checked="${S.km}"></button></div></div>
      <div class="sec" style="font-size:12px;color:#6b7480">🤖 AI 개통 — 가입부터 번호이동·eSIM 개통까지 AI가 대행해 드려요. 카카오 대화 안에서 끝나요.</div>`;
    S.timing = 'now'; S.detailId = id;
    renderTiming(it, saving);
    $('#sheetWrap').classList.add('open');
    $('#sheetBody').scrollTop = 0;
  }
  function renderTiming(it, saving) {
    const p = it.plan;
    const note = $('#timingNote'); const foot = $('#sheetFoot');
    const s = saving && saving > 0 ? saving : null;
    if (S.timing === 'now') {
      note.innerHTML = `지금 변경 시 ${s ? `첫 달부터 월 ${won(s)} 절감 · 12개월 누적 약 ${won(s * 12)}` : `${p.promoMonths ? `${p.promoMonths}개월 할인가 즉시 적용` : '상시 할인가 적용'}`}. ${S.mydata ? '약정이 만료돼 위약금이 없어요.' : ''}`;
      foot.innerHTML = `<button class="btn y block" data-act="activate" data-id="${p.id}">⚡ AI 개통으로 요금제 변경하기</button>`;
    } else {
      const m = S.timing === '3m' ? 3 : 6;
      note.innerHTML = `${m}개월 후 변경 시 ${s ? `약 ${won(s * m)}의 절감 기회를 놓쳐요.` : '할인 조건이 바뀔 수 있어요.'} 변경 시점 30일·7일·당일에 가격·프로모션을 재검증해 알림톡으로 알려드릴게요.`;
      foot.innerHTML = `<button class="btn navy block" data-act="alarm" data-id="${p.id}" data-m="${m}">🔔 ${m}개월 후 변경 알림톡 받기</button>`;
    }
  }
  function closeDetail() { $('#sheetWrap').classList.remove('open'); }

  // ===== AI 개통 대행 =====
  async function startActivation(id) {
    closeDetail();
    const it = findItem(id); const p = it.plan;
    addUser(`${p.carrier} ${p.name} AI 개통 요청`);
    await typing(500);
    const b = addAI(`<div class="q-title">⚡ ${esc(p.carrier)} ${esc(p.name)} 가입·개통을 제가 대행할게요</div><div class="q-sub">아래 정보를 확인해 주세요. ${S.mydata ? '마이데이터로 가입 정보를 자동 입력했어요.' : '가입자 정보는 가상 데이터로 자동 입력했어요(프로토타입).'}</div>
      <div class="act-info">
        <div class="f"><div class="k">가입자</div><div class="v">${esc(MD.name)}</div></div>
        <div class="f"><div class="k">휴대폰 번호</div><div class="v">${esc(MD.phone)}</div></div>
        <div class="f"><div class="k">가입 유형</div><div class="v">번호이동 (${esc(MD.carrier)} → ${esc(p.carrier)})</div></div>
        <div class="f"><div class="k">월 요금</div><div class="v" style="color:#E8352B">${won(p.promo)}${p.promoMonths ? ` <small style="color:#8A909A;font-weight:600">${p.promoMonths}개월</small>` : ''}</div></div>
        <div class="f full"><div class="k">단말</div><div class="v">${esc(MD.device)}</div></div>
        <div class="f full"><div class="k">카카오멤버십</div><div class="v">${S.km ? '✅ 포함 — 통신이용 혜택을 카카오멤버십으로 받기 (무료)' : '미포함 (상단 토글로 포함 가능)'}</div></div>
      </div>
      <div class="k" style="font-size:11px;color:#8A909A">개통 방식</div>
      <div class="seg"><button class="sel" data-sim="esim">eSIM · 즉시 개통</button><button data-sim="usim">유심 배송 · 1~2일</button></div>
      <div class="btn-row"><button class="btn ghost" data-act="act-cancel">취소</button><button class="btn y" data-act="act-go" data-id="${p.id}">AI 개통 진행하기</button></div>`, { wide: true });
    b.dataset.sim = 'esim';
  }
  async function runActivation(id, bubble) {
    const it = findItem(id); const p = it.plan;
    const sim = bubble.dataset.sim || 'esim';
    bubble.querySelectorAll('button').forEach((x) => (x.disabled = true));
    addUser('AI 개통 진행해줘');
    await typing(400);
    const steps = [['가입 정보 확인 · 약관 동의', '마이데이터 기반 자동 입력'], ['본인인증 · 번호이동 신청', `${MD.carrier} → ${p.carrier} 번호이동 접수`], [sim === 'esim' ? 'eSIM 프로파일 발급' : '유심 배송 접수', sim === 'esim' ? 'QR 즉시 발급' : '내일 도착 예정'], ['개통 완료', S.km ? '카카오멤버십 포함 적용' : '요금제 적용']];
    const b = addAI(`<div class="q-title">AI 개통 진행 중</div><div class="q-sub">${esc(p.carrier)} ${esc(p.name)} · ${sim === 'esim' ? 'eSIM 즉시 개통' : '유심 배송'}</div>
      <div class="stepper">${steps.map((s, i) => `<div class="sp" id="ap${i}"><span class="n">${i + 1}</span><span>${esc(s[0])}</span><span class="d">${esc(s[1])}</span></div>`).join('')}</div>`, { wide: true });
    for (let i = 0; i < steps.length; i++) {
      const s = b.querySelector('#ap' + i); s.classList.add('run'); await sleep(900); s.classList.remove('run'); s.classList.add('done'); s.querySelector('.n').textContent = '✓';
    }
    await sleep(300);
    await typing(500);
    addAI(`🎉 ${esc(p.carrier)} ${esc(p.name)} 개통 신청이 완료됐어요!\n${sim === 'esim' ? 'eSIM QR을 카카오톡으로 보내드렸어요. 설치하면 바로 사용할 수 있어요.' : '유심이 내일 도착하면 카카오톡 알림으로 개통 안내를 드릴게요.'}\n\n• 월 요금 ${won(p.promo)}${p.promoMonths ? ` (${p.promoMonths}개월 후 ${won(p.reg)})` : ' (상시)'}${it.saving && it.saving > 0 ? `\n• 현재 대비 월 ${won(it.saving)} 절감` : ''}${S.km ? '\n• 카카오멤버십 포함 — 통신이용 혜택을 카카오멤버십으로 받기 (무료)' : ''}\n• 할인 종료 30일·7일·당일 전에 더 유리한 요금제가 있으면 알림톡으로 알려드릴게요.${AI_TIP}`);
  }

  async function setAlarm(id, m) {
    closeDetail();
    const it = findItem(id); const p = it.plan;
    addUser(`${m}개월 후 변경 알림톡 받기`);
    await typing(500);
    addAI(`🔔 ${esc(p.carrier)} ${esc(p.name)} 변경 알림을 설정했어요.\n${m}개월 후 변경 시점 30일·7일·당일에 가격·프로모션을 재검증해 알림톡으로 알려드릴게요. 더 저렴한 요금제가 새로 나오면 그때도 알려드려요.${AI_TIP}`);
  }

  // ===== 입력 처리 =====
  async function handle(text) {
    if (!text.trim() || S.busy) return;
    addUser(text);
    const c = Engine.parse(text);
    if (c.activate) {
      if (S.last && S.last.items.length) return startActivation(S.last.items[0].plan.id);
      await typing(400); return addAI(`먼저 요금제를 추천해 드린 뒤에 개통을 대행해 드릴게요. 조건을 말씀해 주세요. 예) 월 3만원대 / 데이터 무제한 / 5G${AI_TIP}`);
    }
    if (c.mydata) return startMyData();
    if (!c.hit) return personaCard();
    return runRecommend(c);
  }

  // ===== 이벤트 =====
  chat.addEventListener('click', async (e) => {
    const b = e.target.closest('[data-act], [data-sim], [data-key].opt');
    if (!b) return;
    const act = b.dataset.act;
    const bubble = b.closest('.bubble');
    if (b.dataset.sim) { bubble.querySelectorAll('[data-sim]').forEach((x) => x.classList.toggle('sel', x === b)); bubble.dataset.sim = b.dataset.sim; return; }
    if (act === 'detail') return openDetail(b.dataset.id);
    if (act === 'activate') return startActivation(b.dataset.id);
    if (act === 'act-go') return runActivation(b.dataset.id, bubble);
    if (act === 'act-cancel') { bubble.querySelectorAll('button').forEach((x) => (x.disabled = true)); addUser('취소'); await typing(300); return addAI(`네, 개통을 취소했어요. 언제든 다시 말씀해 주세요.${AI_TIP}`); }
    if (act === 'mydata' || act === 'mydata-again') { addUser(act === 'mydata' ? '내 사용량 기반 추천 받기' : '다시 추천 받기'); return startMyData(); }
    if (act === 'qa') { addUser('조건 선택해서 찾기'); return startQA(); }
    if (act === 'persona') { const ps = Engine.PERSONAS.find((x) => x.key === b.dataset.key); addUser(ps.title); return runRecommend(Object.assign({ raw: ps.title, hit: true, ott: [] }, ps.c)); }
    if (act === 'opt') return answerQA(b.dataset.key, b.dataset.val, b.dataset.label, bubble);
    if (act === 'opt-input') { const inp = bubble.querySelector('input'); const v = +inp.value; if (!v) return inp.focus(); return answerQA(b.dataset.key, v, won(v), bubble); }
    if (act === 'rec-pending') { b.disabled = true; addUser('AI 추천 받기'); return runRecommend(S.pendingC); }
  });

  $('#sheetClose').addEventListener('click', closeDetail);
  $('#sheetDim').addEventListener('click', closeDetail);
  $('#sheetBody').addEventListener('click', (e) => {
    const t = e.target.closest('[data-timing]');
    if (t) { S.timing = t.dataset.timing; $('#sheetBody').querySelectorAll('[data-timing]').forEach((x) => x.classList.toggle('sel', x === t)); const it = findItem(S.detailId); const c = (S.last && S.last.criteria) || {}; renderTiming(it, c.currentBill ? c.currentBill - it.cost12 : null); return; }
    if (e.target.id === 'kmSwitch2') { setKm(!S.km); e.target.setAttribute('aria-checked', S.km); const sp = e.target.previousElementSibling.querySelector('span'); sp.textContent = S.km ? '이 요금제에 카카오멤버십이 포함돼 개통돼요.' : 'ON으로 켜면 모든 요금제에 카카오멤버십이 포함돼요.'; }
  });
  $('#sheetFoot').addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]'); if (!b) return;
    if (b.dataset.act === 'activate') startActivation(b.dataset.id);
    if (b.dataset.act === 'alarm') setAlarm(b.dataset.id, b.dataset.m);
  });

  function setKm(on) {
    S.km = on;
    document.body.classList.toggle('km-on', on);
    $('#kmSwitch').setAttribute('aria-checked', on);
    $('#kmState').textContent = on ? 'ON' : 'OFF';
  }
  $('#kmSwitch').addEventListener('click', async () => {
    setKm(!S.km);
    if (S.busy) return;
    await typing(300);
    addAI(S.km ? `카카오멤버십 포함 ON\n이제 추천되는 모든 요금제에 카카오멤버십이 포함돼요. 통신이용 혜택을 카카오멤버십으로 받기 (무료) — 추가 비용 없이 개통 시 자동 적용돼요.${AI_TIP}` : `카카오멤버십 포함을 껐어요. 언제든 상단 토글로 다시 켤 수 있어요.${AI_TIP}`);
  });

  const input = $('#input');
  const send = () => { const v = input.value; input.value = ''; handle(v); };
  $('#send').addEventListener('click', send);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.isComposing) send(); });

  const CHIPS = ['데이터 많이 쓰고 넷플릭스 자주 보는데 맞는 요금제 추천해줘', '월 3만원대 데이터 많은 요금제 추천해줘', '알뜰폰 중 통화 무제한 요금제 추천해줘', '50기가 이상 저렴한 요금제 추천해줘', '내 사용량 기반으로 추천해줘', '쓸만한 요금제 추천해줘'];
  $('#chips').innerHTML = CHIPS.map((c) => `<button class="chip">${esc(c)}</button>`).join('');
  $('#chips').addEventListener('click', (e) => { const c = e.target.closest('.chip'); if (c) handle(c.textContent); });

  // ===== 시작 =====
  async function greet() {
    chat.querySelectorAll('.msg').forEach((m) => m.remove());
    S.last = null; S.mydata = false; S.qa = null;
    await typing(500);
    addAI(`안녕하세요!\n저는 요금제 추천 AI예요.\n원하는 요금제 조건을 말씀해주세요.\n예) 월 3만원대 / 데이터 무제한 / 5G\n\n통신 3사와 알뜰폰 요금제를 모두 비교해 드리고, 마이데이터를 연결하면 내 사용 패턴에 맞춰 추천해드려요.${AI_TIP}
      <div class="btn-row"><button class="btn line" data-act="qa">조건 선택해서 찾기</button><button class="btn y" data-act="mydata">마이데이터로 자동 분석</button></div>`);
  }
  $('#btnNew').addEventListener('click', greet);
  greet();
})();
