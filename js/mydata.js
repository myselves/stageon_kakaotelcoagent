// 통신 마이데이터 (가상 고객 데이터) — 프로토타입에서는 본인 인증을 생략하고 아래 값을 그대로 사용한다.
window.MYDATA = {
  name: '홍길동',
  phone: '010-1234-5678',
  birth: '1990-12-25',
  carrier: 'SKT',
  plan: { name: '5GX 레귤러', net: '5G', data: '110GB', qos: '5Mbps', voice: '무제한', sms: '기본제공', reg: 69000 },
  contract: { type: '선택약정 24개월', endedAt: '2026-08-31', status: '만료 (할인 종료)' },
  // 최근 3개월 청구 — 9월부터 선택약정 25% 할인이 끝나 정가 납부 중
  bills: [
    { month: '2026-07', amount: 52900 },
    { month: '2026-08', amount: 52900 },
    { month: '2026-09', amount: 71450 },
  ],
  // 최근 3개월 실사용
  usage: [
    { month: '2026-07', data: 41.2, voice: 168, sms: 38 },
    { month: '2026-08', data: 52.4, voice: 191, sms: 44 },
    { month: '2026-09', data: 50.8, voice: 182, sms: 41 },
  ],
  ott: ['넷플릭스', '티빙'],
  bundle: '없음',
  device: '갤럭시 S25 · 할부 없음 · eSIM 지원',
};
