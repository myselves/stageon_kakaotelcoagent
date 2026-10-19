// 요금제 크롤링 데이터 (프로토타입용 스냅샷)
// - 알뜰폰(MVNO): 2026-07-31 모요(moyoplan.com)·각사 공홈 수집 baseline, 핀다이렉트 포함 8티어
// - 통신 3사(MNO): 공시 요금제 샘플, promo = 선택약정 25% 적용가
// - promo: 가입 직후 월 납부액(유입가), reg: 정가(할인 종료 후), promoMonths: 0이면 상시 할인
window.PLAN_SNAPSHOT_DATE = '2026-07-31';
window.BRANDS = {
 "핀다이렉트": {
  "key": "pinda",
  "bg": "#1B4DFF",
  "fg": "#fff"
 },
 "모빙": {
  "key": "mobing",
  "bg": "#E60012",
  "fg": "#fff"
 },
 "SK7모바일": {
  "key": "sk7",
  "bg": "#3617CE",
  "fg": "#fff"
 },
 "U+유모바일": {
  "key": "umobile",
  "bg": "#E6007E",
  "fg": "#fff"
 },
 "쉐이크모바일": {
  "key": "shake",
  "bg": "#00A5B5",
  "fg": "#fff"
 },
 "스마텔(SMT)": {
  "key": "smartel",
  "bg": "#2D9CDB",
  "fg": "#fff"
 },
 "시월모바일": {
  "key": "siwol",
  "bg": "#7B61FF",
  "fg": "#fff"
 },
 "아이즈모바일": {
  "key": "eyes",
  "bg": "#FF7A00",
  "fg": "#fff"
 },
 "에이모바일": {
  "key": "amobile",
  "bg": "#009A44",
  "fg": "#fff"
 },
 "이야기모바일": {
  "key": "iyagi",
  "bg": "#FF4D8D",
  "fg": "#fff"
 },
 "KB리브모바일": {
  "key": "liiv",
  "bg": "#FFBC00",
  "fg": "#1a1b2e"
 },
 "KT M모바일": {
  "key": "ktm",
  "bg": "#FF2A2A",
  "fg": "#fff"
 },
 "프리티": {
  "key": "freet",
  "bg": "#FF6B00",
  "fg": "#fff"
 },
 "SKT": {
  "key": "skt",
  "bg": "#EA002C",
  "fg": "#fff"
 },
 "KT": {
  "key": "kt",
  "bg": "#1A1A1A",
  "fg": "#fff"
 },
 "LGU+": {
  "key": "lgu",
  "bg": "#C8006B",
  "fg": "#fff"
 }
};
window.PLANS = [
{"id": "p001", "carrier": "핀다이렉트", "name": "핀다이렉트Z Mini", "mno": "KT", "net": "LTE", "data": "7GB", "effGB": 7, "daily": 0, "qos": "1Mbps", "voice": "무제한", "sms": "무제한", "reg": 22000, "promo": 7000, "promoMonths": 7, "per": "7개월", "pin": true, "tier": "t1", "kind": "MVNO", "ott": []},
{"id": "p002", "carrier": "모빙", "name": "실속 200분6GB+", "mno": "LGU+", "net": "LTE", "data": "7GB", "effGB": 7, "daily": 0, "qos": "1Mbps", "voice": "200분", "sms": "100건", "reg": 16000, "promo": 10, "promoMonths": 6, "per": "6개월", "pin": false, "tier": "t1", "kind": "MVNO", "ott": []},
{"id": "p003", "carrier": "SK7모바일", "name": "LTE 유심", "mno": "SKT", "net": "LTE", "data": "7GB", "effGB": 7, "daily": 0, "qos": "1Mbps", "voice": "2000분", "sms": "2000건", "reg": 8800, "promo": 8800, "promoMonths": 0, "per": "상시", "pin": false, "tier": "t1", "kind": "MVNO", "ott": []},
{"id": "p004", "carrier": "U+유모바일", "name": "6GB", "mno": "LGU+", "net": "LTE", "data": "7GB", "effGB": 7, "daily": 0, "qos": "1Mbps", "voice": "무제한", "sms": "무제한", "reg": 9500, "promo": 9500, "promoMonths": 0, "per": "상시", "pin": false, "tier": "t1", "kind": "MVNO", "ott": []},
{"id": "p005", "carrier": "쉐이크모바일", "name": "쉐이크 LTE 7GB+", "mno": "KT", "net": "LTE", "data": "7GB", "effGB": 7, "daily": 0, "qos": "1Mbps", "voice": "무제한", "sms": "무제한", "reg": 18700, "promo": 12000, "promoMonths": 7, "per": "7개월", "pin": false, "tier": "t1", "kind": "MVNO", "ott": []},
{"id": "p006", "carrier": "스마텔(SMT)", "name": "USIM 심플", "mno": "LGU+", "net": "LTE", "data": "7GB", "effGB": 7, "daily": 0, "qos": "1Mbps", "voice": "100분", "sms": "100건", "reg": 9900, "promo": 10, "promoMonths": 10, "per": "10개월", "pin": false, "tier": "t1", "kind": "MVNO", "ott": []},
{"id": "p007", "carrier": "시월모바일", "name": "시월 무제한 7GB+1Mbps", "mno": "LGU+", "net": "LTE", "data": "7GB", "effGB": 7, "daily": 0, "qos": "1Mbps", "voice": "무제한", "sms": "무제한", "reg": 19810, "promo": 6060, "promoMonths": 7, "per": "7개월", "pin": false, "tier": "t1", "kind": "MVNO", "ott": []},
{"id": "p008", "carrier": "아이즈모바일", "name": "그란데", "mno": "SKT", "net": "LTE", "data": "7GB", "effGB": 7, "daily": 0, "qos": "1Mbps", "voice": "100분", "sms": "100건", "reg": 15100, "promo": 10, "promoMonths": 12, "per": "12개월", "pin": false, "tier": "t1", "kind": "MVNO", "ott": []},
{"id": "p009", "carrier": "에이모바일", "name": "A 갓성비 6GB", "mno": "LGU+", "net": "LTE", "data": "7GB", "effGB": 7, "daily": 0, "qos": "1Mbps", "voice": "300분", "sms": "100건", "reg": 11550, "promo": 110, "promoMonths": 6, "per": "6개월", "pin": false, "tier": "t1", "kind": "MVNO", "ott": []},
{"id": "p010", "carrier": "이야기모바일", "name": "이야기 6GB 100분", "mno": "LGU+", "net": "LTE", "data": "7GB", "effGB": 7, "daily": 0, "qos": "1Mbps", "voice": "100분", "sms": "100건", "reg": 11000, "promo": 10, "promoMonths": 6, "per": "6개월", "pin": false, "tier": "t1", "kind": "MVNO", "ott": []},
{"id": "p011", "carrier": "KB리브모바일", "name": "LTE 무제한 7GB+", "mno": "KT", "net": "LTE", "data": "7GB", "effGB": 7, "daily": 0, "qos": "1Mbps", "voice": "무제한", "sms": "무제한", "reg": 19500, "promo": 15100, "promoMonths": 12, "per": "12개월", "pin": false, "tier": "t1", "kind": "MVNO", "ott": []},
{"id": "p012", "carrier": "KT M모바일", "name": "모두다 맘껏 7GB+", "mno": "KT", "net": "LTE", "data": "7GB", "effGB": 7, "daily": 0, "qos": "1Mbps", "voice": "무제한", "sms": "무제한", "reg": 16300, "promo": 16300, "promoMonths": 0, "per": "상시", "pin": false, "tier": "t1", "kind": "MVNO", "ott": []},
{"id": "p013", "carrier": "프리티", "name": "든든한 200분6G", "mno": "SKT", "net": "LTE", "data": "7GB", "effGB": 7, "daily": 0, "qos": "1Mbps", "voice": "200분", "sms": "100건", "reg": 1980, "promo": 1980, "promoMonths": 0, "per": "상시", "pin": false, "tier": "t1", "kind": "MVNO", "ott": []},
{"id": "p014", "carrier": "핀다이렉트", "name": "핀다이렉트Z Light", "mno": "SKT", "net": "LTE", "data": "15GB", "effGB": 15, "daily": 0, "qos": "1Mbps", "voice": "100분", "sms": "100건", "reg": 28600, "promo": 14000, "promoMonths": 7, "per": "7개월", "pin": true, "tier": "t2", "kind": "MVNO", "ott": []},
{"id": "p015", "carrier": "모빙", "name": "모빙 300분15GB", "mno": "SKT", "net": "LTE", "data": "15GB", "effGB": 15, "daily": 0, "qos": "1Mbps", "voice": "300분", "sms": "300건", "reg": 28600, "promo": 10, "promoMonths": 7, "per": "7개월", "pin": false, "tier": "t2", "kind": "MVNO", "ott": []},
{"id": "p016", "carrier": "SK7모바일", "name": "LTE 유심", "mno": "SKT", "net": "LTE", "data": "15GB", "effGB": 15, "daily": 0, "qos": "1Mbps", "voice": "100분", "sms": "100건", "reg": 12900, "promo": 12900, "promoMonths": 0, "per": "상시", "pin": false, "tier": "t2", "kind": "MVNO", "ott": []},
{"id": "p017", "carrier": "U+유모바일", "name": "데이터 플러스 7GB", "mno": "LGU+", "net": "LTE", "data": "15GB", "effGB": 15, "daily": 0, "qos": "1Mbps", "voice": "무제한", "sms": "무제한", "reg": 17500, "promo": 17500, "promoMonths": 0, "per": "상시", "pin": false, "tier": "t2", "kind": "MVNO", "ott": []},
{"id": "p018", "carrier": "쉐이크모바일", "name": "쉐이크 LTE 15GB+", "mno": "KT", "net": "LTE", "data": "15GB", "effGB": 15, "daily": 0, "qos": "1Mbps", "voice": "무제한", "sms": "무제한", "reg": 29700, "promo": 16000, "promoMonths": 12, "per": "12개월", "pin": false, "tier": "t2", "kind": "MVNO", "ott": []},
{"id": "p019", "carrier": "스마텔(SMT)", "name": "LTE 음성무제한 15GB", "mno": "SKT", "net": "LTE", "data": "15GB", "effGB": 15, "daily": 0, "qos": "1Mbps", "voice": "무제한", "sms": "200건", "reg": 23100, "promo": 8200, "promoMonths": 7, "per": "7개월", "pin": false, "tier": "t2", "kind": "MVNO", "ott": []},
{"id": "p020", "carrier": "시월모바일", "name": "시월 무제한 15GB+1Mbps", "mno": "LGU+", "net": "LTE", "data": "15GB", "effGB": 15, "daily": 0, "qos": "1Mbps", "voice": "무제한", "sms": "무제한", "reg": 30840, "promo": 9940, "promoMonths": 7, "per": "7개월", "pin": false, "tier": "t2", "kind": "MVNO", "ott": []},
{"id": "p021", "carrier": "아이즈모바일", "name": "울트라", "mno": "KT", "net": "LTE", "data": "15GB", "effGB": 15, "daily": 0, "qos": "1Mbps", "voice": "300분", "sms": "200건", "reg": 25300, "promo": 10, "promoMonths": 10, "per": "10개월", "pin": false, "tier": "t2", "kind": "MVNO", "ott": []},
{"id": "p022", "carrier": "에이모바일", "name": "A 스마트 13GB", "mno": "SKT", "net": "LTE", "data": "15GB", "effGB": 15, "daily": 0, "qos": "1Mbps", "voice": "무제한", "sms": "무제한", "reg": 17160, "promo": 990, "promoMonths": 7, "per": "7개월", "pin": false, "tier": "t2", "kind": "MVNO", "ott": []},
{"id": "p023", "carrier": "이야기모바일", "name": "함께이야기해S", "mno": "SKT", "net": "LTE", "data": "15GB", "effGB": 15, "daily": 0, "qos": "1Mbps", "voice": "100분", "sms": "150건", "reg": 14850, "promo": 7700, "promoMonths": 12, "per": "12개월", "pin": false, "tier": "t2", "kind": "MVNO", "ott": []},
{"id": "p024", "carrier": "KB리브모바일", "name": "더블업 LTE 17GB+", "mno": "LGU+", "net": "LTE", "data": "15GB", "effGB": 15, "daily": 0, "qos": "1Mbps", "voice": "무제한", "sms": "무제한", "reg": 17000, "promo": 17000, "promoMonths": 0, "per": "상시", "pin": false, "tier": "t2", "kind": "MVNO", "ott": []},
{"id": "p025", "carrier": "KT M모바일", "name": "모두다 맘껏 15GB+", "mno": "KT", "net": "LTE", "data": "15GB", "effGB": 15, "daily": 0, "qos": "1Mbps", "voice": "무제한", "sms": "무제한", "reg": 21500, "promo": 21500, "promoMonths": 0, "per": "상시", "pin": false, "tier": "t2", "kind": "MVNO", "ott": []},
{"id": "p026", "carrier": "프리티", "name": "더든든한200분15G", "mno": "KT", "net": "LTE", "data": "15GB", "effGB": 15, "daily": 0, "qos": "1Mbps", "voice": "200분", "sms": "100건", "reg": 19800, "promo": 10, "promoMonths": 7, "per": "7개월", "pin": false, "tier": "t2", "kind": "MVNO", "ott": []},
{"id": "p027", "carrier": "핀다이렉트", "name": "핀다이렉트Z", "mno": "KT", "net": "LTE", "data": "11GB", "effGB": 71, "daily": 2, "qos": "3Mbps", "voice": "무제한", "sms": "무제한", "reg": 39600, "promo": 14000, "promoMonths": 7, "per": "7개월", "pin": true, "tier": "t3", "kind": "MVNO", "ott": []},
{"id": "p028", "carrier": "모빙", "name": "데이터 11GB+", "mno": "SKT", "net": "LTE", "data": "11GB", "effGB": 71, "daily": 2, "qos": "3Mbps", "voice": "무제한", "sms": "무제한", "reg": 46200, "promo": 9900, "promoMonths": 7, "per": "7개월", "pin": false, "tier": "t3", "kind": "MVNO", "ott": []},
{"id": "p029", "carrier": "SK7모바일", "name": "LTE 유심", "mno": "SKT", "net": "LTE", "data": "11GB", "effGB": 71, "daily": 2, "qos": "3Mbps", "voice": "무제한", "sms": "무제한", "reg": 33000, "promo": 33000, "promoMonths": 0, "per": "상시", "pin": false, "tier": "t3", "kind": "MVNO", "ott": []},
{"id": "p030", "carrier": "U+유모바일", "name": "71GB+", "mno": "LGU+", "net": "LTE", "data": "11GB", "effGB": 71, "daily": 2, "qos": "3Mbps", "voice": "무제한", "sms": "무제한", "reg": 32990, "promo": 32990, "promoMonths": 0, "per": "상시", "pin": false, "tier": "t3", "kind": "MVNO", "ott": []},
{"id": "p031", "carrier": "쉐이크모바일", "name": "쉐이크 LTE 11GB+", "mno": "KT", "net": "LTE", "data": "11GB", "effGB": 71, "daily": 2, "qos": "3Mbps", "voice": "무제한", "sms": "무제한", "reg": 40700, "promo": 21000, "promoMonths": 7, "per": "7개월", "pin": false, "tier": "t3", "kind": "MVNO", "ott": []},
{"id": "p032", "carrier": "스마텔(SMT)", "name": "스마일 11GB+", "mno": "SKT", "net": "LTE", "data": "11GB", "effGB": 71, "daily": 2, "qos": "3Mbps", "voice": "무제한", "sms": "무제한", "reg": 40700, "promo": 16000, "promoMonths": 7, "per": "7개월", "pin": false, "tier": "t3", "kind": "MVNO", "ott": []},
{"id": "p033", "carrier": "시월모바일", "name": "시월 무제한 11GB+매일2GB+3Mbps", "mno": "LGU+", "net": "LTE", "data": "11GB", "effGB": 71, "daily": 2, "qos": "3Mbps", "voice": "무제한", "sms": "무제한", "reg": 39680, "promo": 12730, "promoMonths": 7, "per": "7개월", "pin": false, "tier": "t3", "kind": "MVNO", "ott": []},
{"id": "p034", "carrier": "아이즈모바일", "name": "아이즈11GB+일2GB", "mno": "LGU+", "net": "LTE", "data": "11GB", "effGB": 71, "daily": 2, "qos": "3Mbps", "voice": "무제한", "sms": "무제한", "reg": 48400, "promo": 9200, "promoMonths": 7, "per": "7개월", "pin": false, "tier": "t3", "kind": "MVNO", "ott": []},
{"id": "p035", "carrier": "에이모바일", "name": "A 스페셜 11GB+", "mno": "LGU+", "net": "LTE", "data": "11GB", "effGB": 71, "daily": 2, "qos": "3Mbps", "voice": "무제한", "sms": "무제한", "reg": 36300, "promo": 4800, "promoMonths": 7, "per": "7개월", "pin": false, "tier": "t3", "kind": "MVNO", "ott": []},
{"id": "p036", "carrier": "이야기모바일", "name": "이야기 완전 FREE 71GB", "mno": "LGU+", "net": "LTE", "data": "11GB", "effGB": 71, "daily": 2, "qos": "3Mbps", "voice": "무제한", "sms": "무제한", "reg": 39600, "promo": 7950, "promoMonths": 7, "per": "7개월", "pin": false, "tier": "t3", "kind": "MVNO", "ott": []},
{"id": "p037", "carrier": "KB리브모바일", "name": "LTE 71GB+", "mno": "LGU+", "net": "LTE", "data": "11GB", "effGB": 71, "daily": 2, "qos": "3Mbps", "voice": "무제한", "sms": "무제한", "reg": 34300, "promo": 29900, "promoMonths": 12, "per": "12개월", "pin": false, "tier": "t3", "kind": "MVNO", "ott": []},
{"id": "p038", "carrier": "KT M모바일", "name": "모두다 맘껏 11GB+", "mno": "KT", "net": "LTE", "data": "11GB", "effGB": 71, "daily": 2, "qos": "3Mbps", "voice": "무제한", "sms": "무제한", "reg": 33100, "promo": 33100, "promoMonths": 0, "per": "상시", "pin": false, "tier": "t3", "kind": "MVNO", "ott": []},
{"id": "p039", "carrier": "프리티", "name": "유심프리티데이터중심11G+", "mno": "LGU+", "net": "LTE", "data": "11GB", "effGB": 71, "daily": 2, "qos": "3Mbps", "voice": "기본제공", "sms": "기본제공", "reg": 42790, "promo": 9900, "promoMonths": 7, "per": "7개월", "pin": false, "tier": "t3", "kind": "MVNO", "ott": []},
{"id": "p040", "carrier": "핀다이렉트", "name": "핀다이렉트Z Max (100GB)", "mno": "KT", "net": "LTE", "data": "100GB", "effGB": 100, "daily": 0, "qos": "5Mbps", "voice": "무제한", "sms": "무제한", "reg": 42900, "promo": 14000, "promoMonths": 7, "per": "7개월", "pin": true, "tier": "t4", "kind": "MVNO", "ott": []},
{"id": "p041", "carrier": "모빙", "name": "데이터 100GB+", "mno": "SKT", "net": "LTE", "data": "100GB", "effGB": 100, "daily": 0, "qos": "5Mbps", "voice": "무제한", "sms": "무제한", "reg": 53900, "promo": 12500, "promoMonths": 7, "per": "7개월", "pin": false, "tier": "t4", "kind": "MVNO", "ott": []},
{"id": "p042", "carrier": "SK7모바일", "name": "LTE 유심", "mno": "SKT", "net": "LTE", "data": "100GB", "effGB": 100, "daily": 0, "qos": "5Mbps", "voice": "무제한", "sms": "무제한", "reg": 40900, "promo": 40900, "promoMonths": 0, "per": "상시", "pin": false, "tier": "t4", "kind": "MVNO", "ott": []},
{"id": "p043", "carrier": "U+유모바일", "name": "100GB+", "mno": "LGU+", "net": "LTE", "data": "100GB", "effGB": 100, "daily": 0, "qos": "5Mbps", "voice": "무제한", "sms": "무제한", "reg": 38200, "promo": 38200, "promoMonths": 0, "per": "상시", "pin": false, "tier": "t4", "kind": "MVNO", "ott": []},
{"id": "p044", "carrier": "쉐이크모바일", "name": "쉐이크 LTE 100GB+", "mno": "KT", "net": "LTE", "data": "100GB", "effGB": 100, "daily": 0, "qos": "5Mbps", "voice": "무제한", "sms": "무제한", "reg": 49500, "promo": 8900, "promoMonths": 6, "per": "6개월", "pin": false, "tier": "t4", "kind": "MVNO", "ott": []},
{"id": "p045", "carrier": "스마텔(SMT)", "name": "스마일 100GB+", "mno": "SKT", "net": "LTE", "data": "100GB", "effGB": 100, "daily": 0, "qos": "5Mbps", "voice": "무제한", "sms": "무제한", "reg": 47300, "promo": 19000, "promoMonths": 7, "per": "7개월", "pin": false, "tier": "t4", "kind": "MVNO", "ott": []},
{"id": "p046", "carrier": "시월모바일", "name": "시월 무제한 100GB+5Mbps", "mno": "LGU+", "net": "LTE", "data": "100GB", "effGB": 100, "daily": 0, "qos": "5Mbps", "voice": "무제한", "sms": "무제한", "reg": 46210, "promo": 17060, "promoMonths": 7, "per": "7개월", "pin": false, "tier": "t4", "kind": "MVNO", "ott": []},
{"id": "p047", "carrier": "아이즈모바일", "name": "롯시&밀리 100GB+", "mno": "KT", "net": "LTE", "data": "100GB", "effGB": 100, "daily": 0, "qos": "5Mbps", "voice": "무제한", "sms": "무제한", "reg": 55000, "promo": 10500, "promoMonths": 7, "per": "7개월", "pin": false, "tier": "t4", "kind": "MVNO", "ott": ["롯데시네마", "밀리의서재"]},
{"id": "p048", "carrier": "에이모바일", "name": "A 스페셜 100GB+", "mno": "LGU+", "net": "LTE", "data": "100GB", "effGB": 100, "daily": 0, "qos": "5Mbps", "voice": "무제한", "sms": "무제한", "reg": 46200, "promo": 7800, "promoMonths": 7, "per": "7개월", "pin": false, "tier": "t4", "kind": "MVNO", "ott": []},
{"id": "p049", "carrier": "이야기모바일", "name": "이야기 스페셜 100GB+", "mno": "LGU+", "net": "LTE", "data": "100GB", "effGB": 100, "daily": 0, "qos": "5Mbps", "voice": "무제한", "sms": "무제한", "reg": 46200, "promo": 23000, "promoMonths": 7, "per": "7개월", "pin": false, "tier": "t4", "kind": "MVNO", "ott": []},
{"id": "p050", "carrier": "KB리브모바일", "name": "LTE 100GB+", "mno": "LGU+", "net": "LTE", "data": "100GB", "effGB": 100, "daily": 0, "qos": "5Mbps", "voice": "무제한", "sms": "무제한", "reg": 41400, "promo": 37000, "promoMonths": 12, "per": "12개월", "pin": false, "tier": "t4", "kind": "MVNO", "ott": []},
{"id": "p051", "carrier": "KT M모바일", "name": "모두다 맘껏 100GB+", "mno": "KT", "net": "LTE", "data": "100GB", "effGB": 100, "daily": 0, "qos": "5Mbps", "voice": "무제한", "sms": "무제한", "reg": 38200, "promo": 38200, "promoMonths": 0, "per": "상시", "pin": false, "tier": "t4", "kind": "MVNO", "ott": []},
{"id": "p052", "carrier": "프리티", "name": "데이터100G", "mno": "KT", "net": "LTE", "data": "100GB", "effGB": 100, "daily": 0, "qos": "5Mbps", "voice": "기본제공", "sms": "기본제공", "reg": 52800, "promo": 17600, "promoMonths": 7, "per": "7개월", "pin": false, "tier": "t4", "kind": "MVNO", "ott": []},
{"id": "p053", "carrier": "핀다이렉트", "name": "핀다이렉트 Speed 10GB", "mno": "KT", "net": "5G", "data": "10GB", "effGB": 10, "daily": 0, "qos": "옵션", "voice": "200분", "sms": "100건", "reg": 29700, "promo": 10, "promoMonths": 7, "per": "7개월", "pin": true, "tier": "t5", "kind": "MVNO", "ott": []},
{"id": "p054", "carrier": "모빙", "name": "5G 100분10GB", "mno": "LGU+", "net": "5G", "data": "10GB", "effGB": 10, "daily": 0, "qos": "옵션", "voice": "100분", "sms": "100건", "reg": 22000, "promo": 10, "promoMonths": 6, "per": "6개월", "pin": false, "tier": "t5", "kind": "MVNO", "ott": []},
{"id": "p055", "carrier": "SK7모바일", "name": "5G 유심", "mno": "SKT", "net": "5G", "data": "10GB", "effGB": 10, "daily": 0, "qos": "옵션", "voice": "200분", "sms": "100건", "reg": 9900, "promo": 9900, "promoMonths": 0, "per": "상시", "pin": false, "tier": "t5", "kind": "MVNO", "ott": []},
{"id": "p056", "carrier": "U+유모바일", "name": "5G 10GB", "mno": "LGU+", "net": "5G", "data": "10GB", "effGB": 10, "daily": 0, "qos": "옵션", "voice": "200분", "sms": "100건", "reg": 9900, "promo": 9900, "promoMonths": 0, "per": "상시", "pin": false, "tier": "t5", "kind": "MVNO", "ott": []},
{"id": "p057", "carrier": "스마텔(SMT)", "name": "USIM 스위트 5G망", "mno": "KT", "net": "5G", "data": "10GB", "effGB": 10, "daily": 0, "qos": "옵션", "voice": "100분", "sms": "100건", "reg": 15400, "promo": 90, "promoMonths": 6, "per": "6개월", "pin": false, "tier": "t5", "kind": "MVNO", "ott": []},
{"id": "p058", "carrier": "아이즈모바일", "name": "5G 데이터안심", "mno": "LGU+", "net": "5G", "data": "10GB", "effGB": 10, "daily": 0, "qos": "옵션", "voice": "100분", "sms": "100건", "reg": 19800, "promo": 10, "promoMonths": 6, "per": "6개월", "pin": false, "tier": "t5", "kind": "MVNO", "ott": []},
{"id": "p059", "carrier": "에이모바일", "name": "A 5G 스마트 10GB", "mno": "SKT", "net": "5G", "data": "10GB", "effGB": 10, "daily": 0, "qos": "옵션", "voice": "200분", "sms": "100건", "reg": 13200, "promo": 110, "promoMonths": 7, "per": "7개월", "pin": false, "tier": "t5", "kind": "MVNO", "ott": []},
{"id": "p060", "carrier": "이야기모바일", "name": "5G 함께이야기해S", "mno": "SKT", "net": "5G", "data": "10GB", "effGB": 10, "daily": 0, "qos": "옵션", "voice": "200분", "sms": "100건", "reg": 11000, "promo": 11000, "promoMonths": 0, "per": "상시", "pin": false, "tier": "t5", "kind": "MVNO", "ott": []},
{"id": "p061", "carrier": "KB리브모바일", "name": "5G 든든 8GB", "mno": "LGU+", "net": "5G", "data": "10GB", "effGB": 10, "daily": 0, "qos": "옵션", "voice": "무제한", "sms": "무제한", "reg": 24900, "promo": 20500, "promoMonths": 12, "per": "12개월", "pin": false, "tier": "t5", "kind": "MVNO", "ott": []},
{"id": "p062", "carrier": "KT M모바일", "name": "5G 데이터 충분 10GB", "mno": "KT", "net": "5G", "data": "10GB", "effGB": 10, "daily": 0, "qos": "옵션", "voice": "200분", "sms": "100건", "reg": 9900, "promo": 9900, "promoMonths": 0, "per": "상시", "pin": false, "tier": "t5", "kind": "MVNO", "ott": []},
{"id": "p063", "carrier": "프리티", "name": "5G 든든한200분10G", "mno": "KT", "net": "5G", "data": "10GB", "effGB": 10, "daily": 0, "qos": "옵션", "voice": "200분", "sms": "200건", "reg": 3300, "promo": 3300, "promoMonths": 0, "per": "상시", "pin": false, "tier": "t5", "kind": "MVNO", "ott": []},
{"id": "p064", "carrier": "핀다이렉트", "name": "핀다이렉트 Speed 20GB", "mno": "KT", "net": "5G", "data": "20GB", "effGB": 20, "daily": 0, "qos": "옵션", "voice": "200분", "sms": "100건", "reg": 38500, "promo": 7900, "promoMonths": 0, "per": "상시", "pin": true, "tier": "t6", "kind": "MVNO", "ott": []},
{"id": "p065", "carrier": "모빙", "name": "5G 200분20GB", "mno": "KT", "net": "5G", "data": "20GB", "effGB": 20, "daily": 0, "qos": "옵션", "voice": "200분", "sms": "100건", "reg": 41800, "promo": 3300, "promoMonths": 7, "per": "7개월", "pin": false, "tier": "t6", "kind": "MVNO", "ott": []},
{"id": "p066", "carrier": "SK7모바일", "name": "5G 유심", "mno": "SKT", "net": "5G", "data": "20GB", "effGB": 20, "daily": 0, "qos": "옵션", "voice": "1000분", "sms": "100건", "reg": 17900, "promo": 17900, "promoMonths": 0, "per": "상시", "pin": false, "tier": "t6", "kind": "MVNO", "ott": []},
{"id": "p067", "carrier": "스마텔(SMT)", "name": "5G 음성무제한 20GB", "mno": "SKT", "net": "5G", "data": "20GB", "effGB": 20, "daily": 0, "qos": "옵션", "voice": "무제한", "sms": "200건", "reg": 19600, "promo": 19600, "promoMonths": 0, "per": "상시", "pin": false, "tier": "t6", "kind": "MVNO", "ott": []},
{"id": "p068", "carrier": "에이모바일", "name": "A 5G 스마트 20GB", "mno": "SKT", "net": "5G", "data": "20GB", "effGB": 20, "daily": 0, "qos": "옵션", "voice": "300분", "sms": "100건", "reg": 24200, "promo": 1650, "promoMonths": 7, "per": "7개월", "pin": false, "tier": "t6", "kind": "MVNO", "ott": []},
{"id": "p069", "carrier": "이야기모바일", "name": "5G 함께이야기해S", "mno": "SKT", "net": "5G", "data": "20GB", "effGB": 20, "daily": 0, "qos": "옵션", "voice": "200분", "sms": "100건", "reg": 18700, "promo": 18700, "promoMonths": 0, "per": "상시", "pin": false, "tier": "t6", "kind": "MVNO", "ott": []},
{"id": "p070", "carrier": "KT M모바일", "name": "5G 모두다 맘껏 안심 20GB+", "mno": "KT", "net": "5G", "data": "20GB", "effGB": 20, "daily": 0, "qos": "옵션", "voice": "무제한", "sms": "무제한", "reg": 19900, "promo": 19900, "promoMonths": 0, "per": "상시", "pin": false, "tier": "t6", "kind": "MVNO", "ott": []},
{"id": "p071", "carrier": "프리티", "name": "5G 더든든한200분20G", "mno": "KT", "net": "5G", "data": "20GB", "effGB": 20, "daily": 0, "qos": "옵션", "voice": "200분", "sms": "100건", "reg": 6600, "promo": 6600, "promoMonths": 0, "per": "상시", "pin": false, "tier": "t6", "kind": "MVNO", "ott": []},
{"id": "p072", "carrier": "핀다이렉트", "name": "핀다이렉트Z Speed 50GB+", "mno": "LGU+", "net": "5G", "data": "50GB", "effGB": 50, "daily": 0, "qos": "1Mbps", "voice": "무제한", "sms": "무제한", "reg": 59400, "promo": 32000, "promoMonths": 7, "per": "7개월", "pin": true, "tier": "t7", "kind": "MVNO", "ott": []},
{"id": "p073", "carrier": "SK7모바일", "name": "5G 유심", "mno": "SKT", "net": "5G", "data": "50GB", "effGB": 50, "daily": 0, "qos": "1Mbps", "voice": "무제한", "sms": "무제한", "reg": 37900, "promo": 37900, "promoMonths": 0, "per": "상시", "pin": false, "tier": "t7", "kind": "MVNO", "ott": []},
{"id": "p074", "carrier": "U+유모바일", "name": "5G 50GB+", "mno": "LGU+", "net": "5G", "data": "50GB", "effGB": 50, "daily": 0, "qos": "1Mbps", "voice": "무제한", "sms": "무제한", "reg": 37850, "promo": 37850, "promoMonths": 0, "per": "상시", "pin": false, "tier": "t7", "kind": "MVNO", "ott": []},
{"id": "p075", "carrier": "쉐이크모바일", "name": "쉐이크 5G 70GB+", "mno": "KT", "net": "5G", "data": "50GB", "effGB": 50, "daily": 0, "qos": "1Mbps", "voice": "무제한", "sms": "무제한", "reg": 45100, "promo": 20000, "promoMonths": 7, "per": "7개월", "pin": false, "tier": "t7", "kind": "MVNO", "ott": []},
{"id": "p076", "carrier": "스마텔(SMT)", "name": "5G 스위트 50GB+", "mno": "KT", "net": "5G", "data": "50GB", "effGB": 50, "daily": 0, "qos": "1Mbps", "voice": "무제한", "sms": "무제한", "reg": 47300, "promo": 41800, "promoMonths": 36, "per": "36개월", "pin": false, "tier": "t7", "kind": "MVNO", "ott": []},
{"id": "p077", "carrier": "시월모바일", "name": "시월5G 무제한 50GB+1Mbps", "mno": "LGU+", "net": "5G", "data": "50GB", "effGB": 50, "daily": 0, "qos": "1Mbps", "voice": "무제한", "sms": "무제한", "reg": 41200, "promo": 29100, "promoMonths": 7, "per": "7개월", "pin": false, "tier": "t7", "kind": "MVNO", "ott": []},
{"id": "p078", "carrier": "에이모바일", "name": "A 5G 스페셜 레귤러", "mno": "LGU+", "net": "5G", "data": "50GB", "effGB": 50, "daily": 0, "qos": "1Mbps", "voice": "무제한", "sms": "무제한", "reg": 43200, "promo": 27800, "promoMonths": 7, "per": "7개월", "pin": false, "tier": "t7", "kind": "MVNO", "ott": []},
{"id": "p079", "carrier": "이야기모바일", "name": "5G 이야기 라이트 50GB+", "mno": "LGU+", "net": "5G", "data": "50GB", "effGB": 50, "daily": 0, "qos": "1Mbps", "voice": "무제한", "sms": "무제한", "reg": 45100, "promo": 31900, "promoMonths": 7, "per": "7개월", "pin": false, "tier": "t7", "kind": "MVNO", "ott": []},
{"id": "p080", "carrier": "KB리브모바일", "name": "5G 무제한 50GB+", "mno": "LGU+", "net": "5G", "data": "50GB", "effGB": 50, "daily": 0, "qos": "1Mbps", "voice": "무제한", "sms": "무제한", "reg": 42400, "promo": 38000, "promoMonths": 12, "per": "12개월", "pin": false, "tier": "t7", "kind": "MVNO", "ott": []},
{"id": "p081", "carrier": "KT M모바일", "name": "5G 모두다 맘껏 50GB+", "mno": "KT", "net": "5G", "data": "50GB", "effGB": 50, "daily": 0, "qos": "1Mbps", "voice": "무제한", "sms": "무제한", "reg": 37900, "promo": 37900, "promoMonths": 0, "per": "상시", "pin": false, "tier": "t7", "kind": "MVNO", "ott": []},
{"id": "p082", "carrier": "핀다이렉트", "name": "핀다이렉트Z Speed (110GB)", "mno": "KT", "net": "5G", "data": "110GB", "effGB": 110, "daily": 0, "qos": "5Mbps", "voice": "무제한", "sms": "무제한", "reg": 47900, "promo": 12000, "promoMonths": 7, "per": "7개월", "pin": true, "tier": "t8", "kind": "MVNO", "ott": []},
{"id": "p083", "carrier": "모빙", "name": "5G 데이터 125GB+", "mno": "LGU+", "net": "5G", "data": "125GB", "effGB": 125, "daily": 0, "qos": "5Mbps", "voice": "무제한", "sms": "무제한", "reg": 53900, "promo": 12000, "promoMonths": 7, "per": "7개월", "pin": false, "tier": "t8", "kind": "MVNO", "ott": []},
{"id": "p084", "carrier": "SK7모바일", "name": "5G 유심", "mno": "SKT", "net": "5G", "data": "110GB", "effGB": 110, "daily": 0, "qos": "5Mbps", "voice": "무제한", "sms": "무제한", "reg": 40900, "promo": 40900, "promoMonths": 0, "per": "상시", "pin": false, "tier": "t8", "kind": "MVNO", "ott": []},
{"id": "p085", "carrier": "U+유모바일", "name": "5G 95GB+", "mno": "LGU+", "net": "5G", "data": "95GB", "effGB": 95, "daily": 0, "qos": "5Mbps", "voice": "무제한", "sms": "무제한", "reg": 40900, "promo": 40900, "promoMonths": 0, "per": "상시", "pin": false, "tier": "t8", "kind": "MVNO", "ott": []},
{"id": "p086", "carrier": "쉐이크모바일", "name": "쉐이크 5G 110GB+", "mno": "KT", "net": "5G", "data": "110GB", "effGB": 110, "daily": 0, "qos": "5Mbps", "voice": "무제한", "sms": "무제한", "reg": 55000, "promo": 20900, "promoMonths": 7, "per": "7개월", "pin": false, "tier": "t8", "kind": "MVNO", "ott": []},
{"id": "p087", "carrier": "스마텔(SMT)", "name": "5G 스마트 125GB+", "mno": "LGU+", "net": "5G", "data": "125GB", "effGB": 125, "daily": 0, "qos": "5Mbps", "voice": "무제한", "sms": "무제한", "reg": 52800, "promo": 20000, "promoMonths": 7, "per": "7개월", "pin": false, "tier": "t8", "kind": "MVNO", "ott": []},
{"id": "p088", "carrier": "아이즈모바일", "name": "5G 아이즈95GB+3Mbps", "mno": "LGU+", "net": "5G", "data": "95GB", "effGB": 95, "daily": 0, "qos": "5Mbps", "voice": "무제한", "sms": "무제한", "reg": 53900, "promo": 13500, "promoMonths": 7, "per": "7개월", "pin": false, "tier": "t8", "kind": "MVNO", "ott": []},
{"id": "p089", "carrier": "에이모바일", "name": "A 5G 스페셜 슈퍼", "mno": "LGU+", "net": "5G", "data": "110GB", "effGB": 110, "daily": 0, "qos": "5Mbps", "voice": "무제한", "sms": "무제한", "reg": 48420, "promo": 8300, "promoMonths": 7, "per": "7개월", "pin": false, "tier": "t8", "kind": "MVNO", "ott": []},
{"id": "p090", "carrier": "이야기모바일", "name": "5G 이야기 스탠다드 95GB+", "mno": "LGU+", "net": "5G", "data": "95GB", "effGB": 95, "daily": 0, "qos": "5Mbps", "voice": "무제한", "sms": "무제한", "reg": 49500, "promo": 23500, "promoMonths": 24, "per": "24개월", "pin": false, "tier": "t8", "kind": "MVNO", "ott": []},
{"id": "p091", "carrier": "KB리브모바일", "name": "5G 95GB+", "mno": "LGU+", "net": "5G", "data": "95GB", "effGB": 95, "daily": 0, "qos": "5Mbps", "voice": "무제한", "sms": "무제한", "reg": 40900, "promo": 40900, "promoMonths": 0, "per": "상시", "pin": false, "tier": "t8", "kind": "MVNO", "ott": []},
{"id": "p092", "carrier": "KT M모바일", "name": "5G 모두다 맘껏 90GB+", "mno": "KT", "net": "5G", "data": "90GB", "effGB": 90, "daily": 0, "qos": "5Mbps", "voice": "무제한", "sms": "무제한", "reg": 40300, "promo": 40300, "promoMonths": 0, "per": "상시", "pin": false, "tier": "t8", "kind": "MVNO", "ott": []},
{"id": "p093", "carrier": "프리티", "name": "5G 더빠른110G+", "mno": "KT", "net": "5G", "data": "110GB", "effGB": 110, "daily": 0, "qos": "5Mbps", "voice": "기본제공", "sms": "기본제공", "reg": 49500, "promo": 23100, "promoMonths": 7, "per": "7개월", "pin": false, "tier": "t8", "kind": "MVNO", "ott": []},
{"id": "p094", "carrier": "SKT", "name": "5G 컴팩트플러스", "mno": "SKT", "net": "5G", "data": "24GB", "effGB": 24, "daily": 0, "qos": "1Mbps", "voice": "무제한", "sms": "기본제공", "reg": 39000, "promo": 29250, "promoMonths": 24, "per": "선택약정 24개월", "pin": false, "tier": "mno", "kind": "MNO", "ott": []},
{"id": "p095", "carrier": "SKT", "name": "5GX 레귤러", "mno": "SKT", "net": "5G", "data": "110GB", "effGB": 110, "daily": 0, "qos": "5Mbps", "voice": "무제한", "sms": "기본제공", "reg": 69000, "promo": 51750, "promoMonths": 24, "per": "선택약정 24개월", "pin": false, "tier": "mno", "kind": "MNO", "ott": []},
{"id": "p096", "carrier": "SKT", "name": "5GX 프라임", "mno": "SKT", "net": "5G", "data": "무제한", "effGB": 999, "daily": 0, "qos": "무제한", "voice": "무제한", "sms": "기본제공", "reg": 89000, "promo": 66750, "promoMonths": 24, "per": "선택약정 24개월", "pin": false, "tier": "mno", "kind": "MNO", "ott": []},
{"id": "p097", "carrier": "KT", "name": "5G 슬림플러스", "mno": "KT", "net": "5G", "data": "21GB", "effGB": 21, "daily": 0, "qos": "1Mbps", "voice": "무제한", "sms": "기본제공", "reg": 47000, "promo": 35250, "promoMonths": 24, "per": "선택약정 24개월", "pin": false, "tier": "mno", "kind": "MNO", "ott": []},
{"id": "p098", "carrier": "KT", "name": "5G 심플 110GB", "mno": "KT", "net": "5G", "data": "110GB", "effGB": 110, "daily": 0, "qos": "5Mbps", "voice": "무제한", "sms": "기본제공", "reg": 69000, "promo": 51750, "promoMonths": 24, "per": "선택약정 24개월", "pin": false, "tier": "mno", "kind": "MNO", "ott": []},
{"id": "p099", "carrier": "KT", "name": "5G 초이스 베이직", "mno": "KT", "net": "5G", "data": "무제한", "effGB": 999, "daily": 0, "qos": "무제한", "voice": "무제한", "sms": "기본제공", "reg": 90000, "promo": 67500, "promoMonths": 24, "per": "선택약정 24개월", "pin": false, "tier": "mno", "kind": "MNO", "ott": []},
{"id": "p100", "carrier": "LGU+", "name": "5G 슬림+", "mno": "LGU+", "net": "5G", "data": "9GB", "effGB": 9, "daily": 0, "qos": "1Mbps", "voice": "무제한", "sms": "기본제공", "reg": 47000, "promo": 35250, "promoMonths": 24, "per": "선택약정 24개월", "pin": false, "tier": "mno", "kind": "MNO", "ott": []},
{"id": "p101", "carrier": "LGU+", "name": "5G 스탠다드", "mno": "LGU+", "net": "5G", "data": "150GB", "effGB": 150, "daily": 0, "qos": "5Mbps", "voice": "무제한", "sms": "기본제공", "reg": 75000, "promo": 56250, "promoMonths": 24, "per": "선택약정 24개월", "pin": false, "tier": "mno", "kind": "MNO", "ott": []},
{"id": "p102", "carrier": "LGU+", "name": "5G 프리미어 에센셜", "mno": "LGU+", "net": "5G", "data": "무제한", "effGB": 999, "daily": 0, "qos": "무제한", "voice": "무제한", "sms": "기본제공", "reg": 85000, "promo": 63750, "promoMonths": 24, "per": "선택약정 24개월", "pin": false, "tier": "mno", "kind": "MNO", "ott": []}
];
