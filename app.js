/* ============================================================================
   2026 Cloud Innovation Day for LG Group — 27-Slide Task-First Presenter Controller
   Slides 04~18: Plain-Language Task Brief + Live Step-by-Step Task Walkthrough
   ============================================================================ */

let currentSlide = 0;
let slides = [];
let currentModalUrl = '';
let activeBenchSlideId = null;
let benchAnimStart = performance.now();
let benchSettledKey = '';

const SPEAKER_NOTES = [
  "[Slide 01 · 표지 — 2026 Google Cloud Innovation Day for LG Group (00:00 ~ 00:45 · 45초)]\n[시각 큐] 행사 공식 커버 슬라이드 유지. 청중과 시선을 맞춘 뒤 차분한 호흡으로 시작.\n\n안녕하십니까, 저는 Google Cloud에서 AI Customer Engineer로 일하고 있는 고락윤입니다. 이번 세션에서는 다음에 대한 명확한 답을 드리려 합니다. 첫째, 최신 프론티어 모델인 Gemini 4.0 Carbon은 기업 현장의 복잡한 실무를 어디까지 스스로 끝낼 수 있는가. 둘째, 빠르게 진화하는 Gemini와 Claude, 그리고 OpenAI 모델까지 어떻게 쓸 수 있는가입니다.",
  "[Slide 02 · 섹션 01 — Gemini 4.0 Carbon (00:45 ~ 01:20 · 35초)]\n[시각 큐] `01 Gemini 4.0 Carbon` 섹션 디바이더 표시 (`15개 부문 1위 · 100만 Output 토큰 · 실전 보안 · 무결성`).\n\n먼저 1부, 차세대 프론티어 추론 모델인 Gemini 4.0 Carbon입니다. 새 모델이 나올 때마다 점수가 몇 점 올랐다는 이야기는 이미 익숙하실 텐데요. 오늘은 숫자 나열 대신 실제 기업 현장에서 무엇이 달라지는지, 쉬운 예제로 직관적으로 설명드리려 합니다.",
  "[Slide 03 · 공식 벤치마크 전체 성적표 — 17개 공식 평가 중 15개 부문 1위 (01:20 ~ 02:15 · 55초)]\n[시각 큐] Google 공식 발표(`Introducing Gemini 4 Carbon`)의 17개 벤치마크 표 제시. 파란 테두리 `Gemini 4 Carbon` · `Gemini 4 Argon` 열 지시.\n\n화면의 표는 Google 공식 발표에 수록된 전체 17개 프론티어 벤치마크 성적표입니다. 파란색 테두리로 표시된 Gemini 4 Carbon 열을 보시면 종합 기본기부터 자율 코딩과 서버 운영, PC 화면 조작, 장기 업무 운영, 차트·설계 도면 판독, 초장문 추론, 수리·과학, 사이버보안까지 17개 평가 중 15개 부문에서 1위를 기록했습니다. 다만 현업 입장에서는 생소한 벤치마크 이름보다 이 시험이 실제 업무로 치면 어떤 상황을 검증한 것인지가 더 중요하실 겁니다. 그래서 Carbon이 1위를 기록한 15개 개별 벤치마크를 실제 업무 상황에 대입해 하나씩 살펴보겠습니다.",
  "[Slide 04 · 01 / 15 · 전과목 종합 (AA Index v5.0) (02:15 ~ 02:45 · 30초)]\n[시각 큐] 좌측 9각형 밸런스 레이더(`3.8 Flash 31점 → 4 Argon 50점 → 4 Carbon 59점 · 1위`)와 우측 4대 영역 9개 공식 시험 채점판.\n\n첫 번째 벤치마크인 AA Index v5.0은 독립 평가기관 Artificial Analysis가 지식 실무, 코딩, 과학, 종합 추론 등 4대 영역 9개 공식 시험을 동시에 치르게 해 합산하는 종합 평가입니다. 특정 과목만 잘하고 다른 영역에서 빈틈이 생기면 현업에 쓰기 어려운데, Carbon은 왼쪽 9각형 레이더처럼 9개 시험 전반에서 고른 점수를 거두며 59점으로 1위에 올랐습니다.",
  "[Slide 05 · 02 / 15 · 재무 · 법무 · 세무 · 코딩 8종 종합 (Vals Index v2.2) (02:45 ~ 03:25 · 40초)]\n[시각 큐] 대표 실무 예시 — 좌측 214쪽 분기보고서(`12쪽 4,120억` vs `194쪽 주석 4,108억`, `-12억`), 중앙 공급계약서(`본문 제8조 100% 상한` vs `207쪽 별첨 B 제3항` 무제한 배상), 우측 해외 로열티 `85억` 원천징수 `8.5억`(`70.4% · 1위`).\n\n두 번째 벤치마크인 Vals Index v2.2는 회계, 법무, 세무, 실무 코딩 네 분야 8개 실무 벤치마크를 종합 채점하는 평가로 Carbon이 70.4%로 1위를 기록했습니다. 화면의 대표 예시처럼 214쪽 분기보고서에서 12쪽 요약 손익계산서의 4,120억 원과 194쪽 주석 세부표 합계 4,108억 원 사이의 해외 대손상각 12억 원 차이를 정확히 짚어냅니다. 가운데 계약서에서는 본문 제8조의 100% 배상 상한을 무력화하는 207쪽 별첨 B 제3항의 라인 휴지 손실 무제한 배상 조항과, 오른쪽 해외 로열티 85억 원의 10% 원천징수 세액 8.5억 원까지 빠짐없이 검토해 냅니다.",
  "[Slide 06 · 03 / 15 · 대규모 코딩 (SWE-sweep) (03:25 ~ 04:00 · 35초)]\n[시각 큐] 다크 테마 IDE 좌측 2,400개 파일 트리 탐색 → 중앙 할인·환율·부가세 등 5개 연관 파일 동시 패치 → 하단 `128 / 128` 통합 회귀 테스트 통과.\n\n세 번째 벤치마크인 SWE-sweep은 어느 파일이 원인인지 전혀 알려주지 않고 2,400개 파일 규모의 저장소를 통째로 맡기는 고난도 코딩 평가입니다. 실제 기업 시스템은 파일 하나만 고치면 다른 모듈에서 연쇄 오류가 나기 쉬운데, Carbon은 의존성 흐름을 스스로 추적해 할인·환율·부가세 등 연관된 5개 모듈을 한꺼번에 수리하고 128개 회귀 테스트를 모두 통과시키며 9.6%로 1위를 기록했습니다.",
  "[Slide 07 · 04 / 15 · 서버 장애 복구 (Terminal-Bench 4.0) (04:00 ~ 04:35 · 35초)]\n[시각 큐] 리눅스 SSH 터미널 실시간 명령어 입력으로 `libssl.so.1.1` 누락 및 `/etc/shop-api.conf` SSL 경로 오타 수리 → 우측 `RUNNING (142 / 142)` 전환.\n\n네 번째 벤치마크인 Terminal-Bench 4.0은 멈춰 버린 리눅스 서버 터미널에 AI를 직접 투입해 복구 능력을 검증하는 시험입니다. 새벽에 서비스 장애가 발생했을 때 사람이 명령어를 불러주는 것이 아니라, Carbon이 직접 에러 로그를 읽어 OpenSSL 라이브러리 충돌과 설정 경로 오타를 고치고 서비스를 재기동해 142개 엔드포인트 정상 응답까지 확인합니다. 65.2% 복구율로 1위에 올랐습니다.",
  "[Slide 08 · 05 / 15 · 55개 직무 PC 화면 · 터미널 실무 (Agents' Last Exam v1.1) (04:35 ~ 05:10 · 35초)]\n[시각 큐] Windows 11 데스크톱 GUI 조작 예시 — 포털 `10월_실적.xlsx` 다운로드 → 돌발 보안·세션 만료 팝업 `닫기` → `실적_2026` 폴더 분류 → 취합 시트 제출(`77.4% · 1위`).\n\n다섯 번째 벤치마크인 Agents' Last Exam v1.1은 재무·운영·엔지니어링 등 55개 직무 환경에서 PC 화면 조작과 터미널·코드 실행을 결합해 실무를 끝까지 마치는지 평가합니다. 화면의 예시처럼 사내 포털에서 실적 엑셀을 내려받다가 돌발 보안·세션 만료 팝업이 화면을 가려도 멈추지 않고 스스로 팝업을 닫은 뒤, 폴더 분류와 전사 취합 시트 최종 제출까지 처리하며 77.4%로 1위를 기록했습니다.",
  "[Slide 09 · 06 / 15 · 다중 업무 앱 자동화 (AutomationBench) (05:10 ~ 05:45 · 35초)]\n[시각 큐] 상단 6개 업무 앱(`1. Mail 수신` `#PO-4820 +120대` → `2. CRM 조회` `VIP Tier-1 · 10% 할인` → `3. 재고 Sheets` `80대 차감 · 40대 부족분` → `4. 조건 분기` → `5. 청구 · 일정` → `6. 사내 메신저`) 및 하단 실행 로그.\n\n여섯 번째 벤치마크인 AutomationBench는 Zapier 환경에서 여러 업무용 앱을 가로질러 조건 분기 업무를 사람 개입 없이 완주하는 시험입니다. 화면처럼 주문 수량을 120대로 늘려 달라는 메일이 도착하자 CRM에서 VIP Tier-1 등급과 10% 약정 할인율을 먼저 조회하고, 재고 시트에서 현 재고 80대는 즉시 출고로, 부족분 40대는 생산 발주로 자동 분리합니다. 이어서 할인 청구서 발행과 출하 일정 등록, 사내 메신저 공유까지 6개 앱 연쇄 업무를 완주하며 53.9%로 1위를 기록했습니다.",
  "[Slide 10 · 07 / 15 · 장기 매장 운영 (Vending-Bench 2) (05:45 ~ 06:25 · 40초)]\n[시각 큐] 스마트 무인 매장 진열대, 중앙 365일 누적 잔고 곡선(`3.8 Flash $5,094` 점선 vs `4 Carbon $16,484` 실선 · 약 3.2배), 우측 사계절 의사결정 로그.\n\n일곱 번째 벤치마크인 Vending-Bench 2는 초기 자금 500달러로 무인 매장을 365일 동안 매일 운영하게 해 장기 의사결정 일관성을 평가하는 경영 시뮬레이션입니다. 아래쪽 회색 점선인 경량 모델 3.8 Flash가 5,094달러에 머무는 동안, 위쪽 파란 실선인 Carbon은 폭염 예보에 맞춘 생수 선발주, 공급처 전환, 계절 품목 교체와 타임세일을 일관되게 수행해 약 3.2배인 16,484달러로 1위를 기록했습니다. 구매나 SCM 수요 예측 업무에 시사하는 바가 큰 결과입니다.",
  "[Slide 11 · 08 / 15 · 이중축 차트 판독 (Chartography) (06:25 ~ 07:00 · 35초)]\n[시각 큐] 반도체 CVD 공정 온도(좌측 파란 축 `°C`)·수율(우측 초록 축 `%`) 이중축 차트에서 `14:22` 교차 착시 배제 후 `14:35` 최고 온도(`450.4°C`)의 우측 수율(`94.8%`) 판독.\n\n여덟 번째 벤치마크인 Chartography는 제조·엔지니어링 현장에서 자주 쓰이는, 왼쪽 온도 축과 오른쪽 수율 축의 눈금이 서로 다른 이중 보조축 그래프 판독 시험입니다. 일반 모델들은 14시 22분에 두 선이 교차하는 지점을 최고점으로 착각하거나 왼쪽 눈금을 잘못 읽곤 하는데, Carbon은 14시 35분 실제 최고 온도인 450.4도 지점을 찾은 뒤 정확히 오른쪽 수율 축으로 시선을 옮겨 94.8%를 읽어내며 72.5%로 1위에 올랐습니다.",
  "[Slide 12 · 09 / 15 · 실내 사진 → 공간 설계도 복원 (Blueprint-Bench 2) (07:00 ~ 07:40 · 40초)]\n[시각 큐] 좌측 실내 사진 20장(`Cam 01 ~ Cam 20`) 및 공간 메모장 → 중앙 `11.6m × 8.8m` 2D 설계도 복원 후 3D 입체 공간 확장 → 우측 유사도(`3.8 Flash 38.6% → 4 Argon 54.4% → 4 Carbon 58.6% · 1위`).\n\n아홉 번째 벤치마크인 Blueprint-Bench 2는 도면이 없는 현장에서 여러 각도로 찍은 실내 사진 스무 장만 주고 정확한 평면 설계도를 복원하게 하는 공간 추론 시험입니다. 사진마다 시야각이 달라 방들의 연결 구조를 맞추기 까다로운데, Carbon은 거실·주방 개방 통로와 중앙 복도의 문 세 곳, 창호 방향과 면적 비율을 대조해 평면 설계도를 먼저 복원하고, 화면처럼 곧바로 3D 입체 공간까지 자연스럽게 확장하며 유사도 58.6%로 1위를 기록했습니다. 설비 현장 실측이나 디지털 트윈 구축에 바로 연결할 수 있는 역량입니다.",
  "[Slide 13 · 10 / 15 · 초장문 다중 홉 경로 탐색 (GraphWalks 256k~1M) (07:40 ~ 08:15 · 35초)]\n[시각 큐] 초장문 그래프 탐색(BFS) 현업 비유 — 1,000페이지 문서 매트릭스 위에서 `18쪽 → 340쪽 → 690쪽 → 940쪽` 4단계 단서가 연결되어 `K-정밀 3공장 열처리 온도 이탈` 원인 도출(`96.2% · 1위`).\n\n열 번째 벤치마크인 GraphWalks는 최대 100만 토큰 규모의 대형 그래프에서 외부 검색 도구나 코드 실행 없이 모델의 기억력만으로 다단계 연결 경로를 추적하는 초장문 추론 평가입니다. 이를 제조 문서에 대입한 화면의 비유처럼, 1,000쪽 분량 기록 속 18쪽 불량 로트 번호에서 출발해 340쪽 조립 이력, 690쪽 구매 원장을 거쳐 940쪽 K-정밀 3공장 열처리 온도 이탈까지 앞 단서를 놓치지 않고 연결해 내며 96.2%로 1위를 기록했습니다.",
  "[Slide 14 · 11 / 15 · 연구급 순수 수리 추론 (RiemannBench) (08:15 ~ 08:50 · 35초)]\n[시각 큐] 현업 R&D 비유 — 좌측 리아푸노프 미분방정식 및 라살 불변 원리 엄밀 증명(`문제` · `1단계`~`4단계` · `검산` · `결론`)과 우측 감쇠 로봇 팔 위상 궤적 원점 수렴(`80.0% · 1위`).\n\n열한 번째 벤치마크인 RiemannBench는 수학 교수진과 국제수학올림피아드 메달리스트들이 출제한 연구 수준의 순수 수학 난제를 외부 계산기 없이 논리 추론만으로 풀어 닫힌 해를 구하는 시험입니다. 현업 R&D에 비유하면 화면처럼 로봇 팔 제어기를 설계할 때 리아푸노프 미분 전개부터 라살 불변 원리를 통한 원점 점근 수렴 증명까지 부호나 논리 비약이 하나만 있어도 실패하는데, Carbon은 이러한 고난도 수식 증명을 완결하며 80.0%로 1위를 기록했습니다.",
  "[Slide 15 · 12 / 15 · 실험 데이터 보정 (Terminal-Bench-Science 0.1) (08:50 ~ 09:25 · 35초)]\n[시각 큐] 상단 가열 금속 막대 열전달 히트맵 및 하단 13개 센서 실측점 위 5차례 시뮬레이션 곡선(`실행 1` ~ `실행 5`) 자동 보정으로 `오차 18.0% → 0.3%` 수렴(`64.8% · 1위`).\n\n열두 번째 벤치마크인 Terminal-Bench-Science는 실험실 실측 데이터에 시뮬레이션 코드를 반복 실행해 파라미터를 맞추는 과학 엔지니어링 평가입니다. 가열 금속 막대의 온도 센서 실측점 13개와 초기 시뮬레이션 곡선이 평균 오차 18%로 어긋나 있을 때, Carbon이 직접 파이썬 SciPy 솔버 코드를 다섯 차례 반복 실행하며 열전달 계수를 자동 보정해 오차를 0.3% 이내, 실측과 99.7% 일치시키며 64.8%로 1위에 올랐습니다.",
  "[Slide 16 · 13 / 15 · 숨은 보안 구멍 탐지 (SEC-bench Pro) (09:25 ~ 09:55 · 30초)]\n[시각 큐] `312개 파일 · 48,600줄` 코드에서 `api/gateway.go → auth/legacy_hdr.go → db/invoice_store.go` 3단계 호출 그래프를 추적해 `X-Compat: v1_mobile` 권한 우회 탐지(`88.2% · 1위`).\n\n열세 번째 벤치마크인 SEC-bench Pro는 312개 파일, 48,600줄 규모 코드에서 외부 입력값이 gateway.go, legacy_hdr.go, invoice_store.go 세 파일을 거치며 흘러가는 경로를 추적해, 구형 모바일 호환 헤더 한 줄로 관리자 권한이 우회되는 보안 구멍을 88.2% 정확도로 찾아냅니다.",
  "[Slide 17 · 14 / 15 · 격리 샌드박스 모의 해킹 실증 (ExploitGym) (09:55 ~ 10:25 · 30초)]\n[시각 큐] 좌측 외부망 차단 컨테이너(`Docker --network=none`) 내 `webhook_deser.py` 2중 관문, 중앙 적색 모의 공격 파동(1차 `HTTP 422` 차단 → `offset=4` 보정 후 2차 적색 패킷 연속 관통 · `HTTP 200 OK`), 우측 검증 리포트(`54.8% · 1위`).\n\n열네 번째 벤치마크인 ExploitGym은 보안 약점이 실제로 침투 가능한 위험인지 격리 환경에서 실증하는 평가로, Carbon이 외부망이 차단된 컨테이너 안에서 타임스탬프 서명과 CRC16 체크섬 조건을 분석해 검증 코드를 직접 작성합니다. 화면 가운데 붉은 모의 공격 흐름처럼 1차 시도가 두 번째 관문에서 막히자 4바이트 오프셋을 스스로 보정해 2중 관문을 통과시키며 침투 가능 여부를 54.8%로 입증해 1위를 기록했습니다.",
  "[Slide 18 · 15 / 15 · 기능 보존 보안 패치 (CWE-bench) (10:25 ~ 11:00 · 35초)]\n[시각 큐] `search_checkout.py` 파라미터 바인딩 패치 후 우측 상단 보안 테스트(SQL 인젝션 공격 `40건` 차단)와 우측 하단 기능 테스트(`O'Connor` 포함 정상 요청 `500건` 통과) 동시 합격(`71.0% · 1위`).\n\n열다섯 번째 벤치마크인 CWE-bench는 보안 패치가 공격은 막으면서 원래 기능은 그대로 유지하는지를 보안 테스트와 기능 테스트로 함께 채점하는 평가입니다. 화면 예시처럼 SQL 인젝션 공격 40건은 모두 차단하면서도 작은따옴표가 들어간 고객명 O'Connor 같은 정상 요청 500건은 그대로 통과시키며 71.0%로 1위를 기록했습니다.",
  "[Slide 19 · 실시간 검증 · 실험 1 — 장애물을 즉시 피해가는 로봇 50대 (11:00 ~ 11:55 · 55초)]\n[시각 큐] 50대 물류 AGV 로봇이 주행하는 3D 창고 교차로에 돌발 장애물이 낙하하고 A* 경로 재탐색으로 충돌 없이 우회하는 실시간 웹 시뮬레이션.\n\n지금까지 살펴본 공간 추론과 알고리즘 코딩 역량을 한눈에 직관적으로 확인하실 수 있도록 두 가지 실시간 3D 웹 시뮬레이션을 준비했습니다. 두 화면 모두 외부 게임 엔진 없이 Carbon이 한 호흡으로 작성한 순수 웹 코드입니다.\n첫 번째 실험은 물류창고 자율주행 로봇 50대 군집 제어입니다. 보시는 것처럼 좁은 교차로 한가운데 돌발 장애물이 연쇄적으로 떨어지는 상황에서도 50대의 로봇이 서로 엉키거나 멈춰 서지 않고 실시간으로 A* 우회 경로를 재계산해 충돌 0건으로 물류를 이송합니다.",
  "[Slide 20 · 실시간 검증 · 실험 2 — 수식만으로 그리는 블랙홀 중력 렌즈 (11:55 ~ 12:40 · 45초)]\n[시각 큐] 일반상대성이론 측지선 미분방정식만으로 빛의 중력 렌즈 휨과 강착원반 조석 붕괴를 매 프레임 계산하는 실시간 3D 화면.\n\n두 번째 실험은 미리 만들어 둔 동영상이나 이미지 에셋 하나 없이, 오직 일반상대성이론의 측지선 미분방정식 수식만으로 매 프레임 휘어지는 빛의 궤적을 계산해 그리는 블랙홀 중력 렌즈 시뮬레이션입니다. 앞서 수리·과학 벤치마크에서 확인한 물리 모델링 역량이 실제 시뮬레이션 코드로 어떻게 구현되는지 그대로 보여줍니다.",
  "[Slide 21 · Output Token 스케일 (Long Decode 연속 생성 한도) — 직접 써 내려가는 Output 100만 토큰 (12:40 ~ 14:40 · 2분 00초)]\n[시각 큐] 상단 `Input · 읽기` 대비 `Output · 쓰기 ★` 흐름도를 먼저 짚고, 좌측 `[X 6.4만 토큰 중단]`(`16개 중 2번째 모듈에서 출력 끊김`)과 우측 `[O 100만 토큰 완주]`(`16 / 16개 전 모듈 완성`, `코드 약 7만 줄 · A4 약 2,000쪽 · 무중단 에이전트`) 대조.\n\n방금 보신 3D 시뮬레이션이나 수천 개 파일 규모의 과제를 중간에 끊기지 않고 끝까지 완성하게 해 주는 기반이 바로 Output 토큰, 즉 AI가 직접 써 내려가는 연속 생성 한도입니다.\n흔히 백만 토큰 컨텍스트라고 말할 때는 대부분 AI가 참고 문서를 읽는 양인 Input 토큰을 뜻합니다. 수백 쪽 자료를 읽게 하는 것은 기존 모델들도 이미 가능했지만, 실제 기업 업무에서 발목을 잡던 병목은 읽고 난 뒤 결과물을 직접 작성하는 Output에 있었습니다.\n화면 왼쪽을 보시겠습니다. 기존 세대 모델들의 출력 한도는 약 6만 4천 토큰입니다. 짧은 요약이나 단일 함수를 작성할 때는 충분하지만, 16개 모듈로 이루어진 마이크로서비스 전체 코드를 짜 달라고 하면 두 번째 모듈 중간쯤에서 출력 한도에 걸려 이하 생략이라는 문구를 남기고 멈춰 버립니다. 결국 사람이 앞뒤 맥락을 다시 붙여 주며 열다섯 번씩 이어 써 달라고 수동으로 개입해야 했습니다.\n반면 오른쪽의 Gemini 4.0 Carbon은 Long Decode 역량을 통해 연속 출력 한도를 약 16배인 최대 100만 Output 토큰까지 확장했습니다. 코드로 치면 약 7만 줄, 문서로 치면 A4 약 2,000쪽 분량을 한 번의 지시로 끝까지 작성합니다. 설계부터 DB, 인증, 결제, 통합 테스트, 배포 스크립트까지 16개 전 모듈을 인터페이스 불일치 없이 완주하는 것, 이것이 밤새 스스로 일하는 자율 에이전트를 가능하게 하는 실무상의 핵심 차이입니다.",
  "[Slide 22 · 실전 검증 · 안전성 — 거짓 보고와 편법 우회를 크게 줄였습니다 (14:40 ~ 16:00 · 1분 20초)]\n[시각 큐] 좌측 `실전 보안 · 장기 엔지니어링 검증`(Chrome 패치 `10배 이상`, 시큐어 코딩 `2배 이상`, Multi-day 디버깅 · `WebDev +89 Elo / 1,768점`), 우측 무결성 3지표(환각 `-50%`, 치팅 성공 `0.0%`, 간접 프롬프트 인젝션 `0.0%`), 하단 `기업 도입 안심 기준` 배너.\n\n1부의 마지막은 기업 현장에 도입할 때 가장 엄격하게 따져 보시는 실전 검증과 안전성입니다. 모델 성능이 아무리 높아도 결과를 꾸며내거나 외부 공격에 흔들린다면 핵심 업무를 맡길 수 없기 때문입니다.\n왼쪽을 보시면 Google 내부 Chrome 보안팀이 실제 상용 브라우저 취약점 패치 업무에 투입해 검증한 결과, 타사 프론티어 모델 기준 대비 고품질 패치 생성률이 10배 이상 높았고, 보안 약점 없는 안전한 코드 생성률도 Gemini 4 Argon 대비 2배 이상 향상되었습니다. 또한 며칠간 막히는 원인을 스스로 추적해 고치는 Multi-day 장기 디버깅과 WebDev Arena 리더보드에서도 89점 상승한 1,768점을 기록했습니다.\n오른쪽의 무결성 지표도 분명합니다. Argon 대비 근거 없는 주장을 하는 환각 비율은 약 50%, 절반으로 줄었고, Terminal-Bench 4.0에서 채점기를 속이거나 편법으로 통과한 치팅 성공률 0.0%, 외부 웹·문서에 숨겨진 Gray Swan 간접 프롬프트 인젝션 공격 성공률 역시 0.0%를 기록했습니다. 현재 Google Cloud에서는 빠른 응답의 Gemini 3.8 Flash와 주력 모델인 Gemini 4 Argon을 바로 쓰실 수 있고, 고난도 과제용 Carbon도 프리뷰 프로그램을 통해 순차 확대되고 있습니다.",
  "[Slide 23 · 섹션 02 — 3대 AI를 한곳에서 (16:00 ~ 16:30 · 30초)]\n[시각 큐] `02 3대 AI를 한곳에서` 섹션 디바이더 (`단일 플랫폼 거버넌스 · 개발자 모델 선택 자율성`).\n\n이제 2부로 넘어가겠습니다. 지금까지 Gemini 4.0의 역량을 살펴보셨지만, LG 그룹처럼 다양한 계열사와 현업 부서가 함께 움직이는 대기업 환경에서는 자연스럽게 또 하나의 고민이 생깁니다. 부서마다, 그리고 개발팀마다 과제 성격에 따라 써 보고 싶은 모델이 다를 수 있다는 점인데요. Google Cloud는 이 요구를 단일 플랫폼 거버넌스와 개발자 모델 선택 자율성이라는 구조로 풀었습니다.",
  "[Slide 24 · Google Cloud model garden — Gemini · Claude · OpenAI, 원하는 두뇌를 골라 씁니다 (16:30 ~ 17:30 · 1분 00초)]\n[시각 큐] `Google Gemini 4.0`(`Carbon · Argon · 3.8 Flash`), `Anthropic Claude 5.5`(`Opus 5.5 · Fable 5.1`), `NEW · 10.21` 배지가 붙은 `OpenAI GPT-6 / 6.1`(`GPT-6 Astra · 6.1 Sol · 6.1 Terra`) 3열 카드 및 하단 `단일 IAM · VPC-SC 거버넌스 · 개발자 자율 선택 · 통합 청구 · 간편 활성화` 바.\n\n그 중심이 바로 Google Cloud model garden입니다. 기존에도 Google의 Gemini 시리즈와 Anthropic의 Claude 모델을 한곳에서 제공하고 있었는데, 지난 10월 21일부로 OpenAI의 최신 프론티어 모델인 GPT-6 및 GPT-6.1 시리즈까지 Google Cloud에 공식 합류했습니다.\n이로써 최대 100만 토큰 출력과 멀티모달 추론에 강한 Google Gemini 4.0, PC 화면 조작 평가 OSWorld 1위와 특유의 감도·직관성을 갖춘 Anthropic Claude 5.5, 그리고 에이전트 코딩 평가 FrontierSWE 2 1위를 기록한 OpenAI GPT-6 및 6.1까지, 글로벌 3대 프론티어 AI를 단일 플랫폼 거버넌스와 통합 청구 체계 위에서 자율적으로 골라 쓸 수 있게 되었습니다.",
  "[Slide 25 · 멀티 모델 오케스트레이션 — 업무마다 최적 비율로 섞어 쓰세요 (17:30 ~ 18:30 · 1분 00초)]\n[시각 큐] 좌측 실시간 동적 라우터(`문서 800p 유입` → `PC 업무 · 문서` → `코드 리팩터링` → `복합 파이프라인` 자동 순환 및 비중 막대)와 우측 Gemini · Claude · OpenAI 역할 분담 카드 연동 화면.\n\n세 모델이 한곳에 모였을 때의 실질적인 가치는 특정 모델 하나만 고집하지 않고 업무 성격마다 최적의 비율로 섞어 쓰는 오케스트레이션에 있습니다.\n화면 왼쪽 동적 라우터와 오른쪽 역할 카드를 함께 보시겠습니다. 800쪽 대용량 문서와 로그 분석이 들어오면 초장문에 강한 Gemini 4.0이 주력으로 초안을 취합하고, PC 화면 조작이 많은 문서 실무에서는 Claude 5.5 비중을 높이며, 저장소 단위의 대규모 코드 리팩터링에서는 OpenAI GPT-6 및 6.1이 주력으로 투입됩니다. 전사 복합 파이프라인에서는 세 모델이 각자 가장 잘하는 단계를 나눠 맡아 결과물의 완성도를 높여 줍니다.",
  "[Slide 26 · 단일 플랫폼 거버넌스 × Developer Autonomy — 하나의 거버넌스로 통제하고, 개발자에겐 모델 자율성을 줍니다 (18:30 ~ 19:35 · 1분 05초)]\n[시각 큐] 좌측 `Google Cloud 단일 플랫폼 거버넌스` 방패(`IAM · VPC-SC 망분리`, `Model Armor · 감사 로그`, `통합 한도 · 부서 정산`) 아래 3개 모델 슬롯 자동 전환, 우측 `단일 거버넌스` · `개발자 자율성` · `표준 가시성` 3단 카드.\n\n마지막으로 보안 조직과 현장 개발팀 모두에게 가장 중요한 거버넌스 구조입니다.\n그동안 현장 개발팀이 외부 모델을 하나 더 도입하려면 모델마다 보안 아키텍처를 새로 검토하고 네트워크 통제와 감사 로그 체계를 별도로 구축하느라 수개월씩 시간이 걸리곤 했습니다.\nGoogle Cloud에서는 화면 왼쪽처럼 IAM 권한 통제, VPC-SC 망분리, 유해 입출력을 막는 Model Armor, 그리고 감사 로그와 부서별 정산 체계를 하나의 플랫폼 표준으로 묶어 일관되게 통제합니다. 오른쪽 카드에 적힌 것처럼 이렇게 초기 표준 환경만 잘 구성해 두면, 개발팀은 새로운 모델을 시험할 때마다 무거운 보안 인프라 구축 절차를 매번 반복하지 않고도 사내 표준 안에서 Gemini, Claude, GPT-6을 손쉽게 실험하고 전환할 수 있습니다. 보안 기준은 흔들림 없이 하나로 유지하면서, 현장에는 모델 선택의 자율성과 속도를 돌려드리는 구조입니다.",
  "[Slide 27 · 클로징 — 감사합니다 (19:35 ~ 20:00 · 25초)]\n[시각 큐] `감사합니다` 및 클로징 문구(`Gemini 4.0부터 단일 거버넌스 · 3대 AI 자율 선택까지, Google Cloud가 함께합니다.`).\n\n오늘 세션을 한 문장으로 정리하면, 끝까지 완수하는 출력 스케일과 실전 신뢰성을 갖춘 Gemini 4.0 Carbon부터 세계 3대 프론티어 AI를 아우르는 단일 거버넌스 플랫폼까지 이제 Google Cloud 한곳에서 바로 시작하실 수 있다는 점입니다. LG 그룹의 성공적인 AI 전환 여정에 저희 Google Cloud가 가장 든든한 기술 파트너로 함께하겠습니다. 경청해 주셔서 감사합니다."
];

const BENCH_STAGE_META = [
  {
    "id": 0,
    "sim_title": "4대 영역 · 9개 공식 평가 동시 풀이"
  },
  {
    "id": 1,
    "sim_title": "8개 실무 벤치마크 종합 · 대표 검토 예시"
  },
  {
    "id": 2,
    "sim_title": "2,400개 파일 탐색 → 5개 모듈 일괄 수리"
  },
  {
    "id": 3,
    "sim_title": "로그 역추적 → 설정 패치 → 서버 정상 기동"
  },
  {
    "id": 4,
    "sim_title": "55개 직무 PC · 터미널 실무 (GUI 조작 예시)"
  },
  {
    "id": 5,
    "sim_title": "6개 업무 앱 조건 분기 · 무인 연쇄 실행"
  },
  {
    "id": 6,
    "sim_title": "365일(1년) 일별 운영 및 누적 잔고 추이"
  },
  {
    "id": 7,
    "sim_title": "이중축(온도 °C · 수율 %) 공정 차트 판독"
  },
  {
    "id": 8,
    "sim_title": "실내 사진 20장 → 설계도 복원 · 3D 공간 확장"
  },
  {
    "id": 9,
    "sim_title": "초장문 그래프 다중 홉(BFS) 추적 (1,000쪽 비유)"
  },
  {
    "id": 10,
    "sim_title": "연구급 순수 수리 추론 (제어 미분방정식 비유)"
  },
  {
    "id": 11,
    "sim_title": "실험 측정값(점)에 시뮬레이션 곡선 보정"
  },
  {
    "id": 12,
    "sim_title": "3개 파일 호출 흐름 추적 · 권한 우회 포착"
  },
  {
    "id": 13,
    "sim_title": "격리 컨테이너 모의 해킹 코드(PoC) 작성 · 침투 실증"
  },
  {
    "id": 14,
    "sim_title": "보안 테스트 통과 + 기존 기능 유지"
  }
];

let inlineSimReloadTimer = null;

function releaseControlFocus() {
  const ae = document.activeElement;
  if (ae && ae !== document.body && ae !== document.documentElement && typeof ae.blur === 'function') {
    ae.blur();
  }
}

function stopTokenComparison() {
  if (tokAnimId) {
    cancelAnimationFrame(tokAnimId);
    tokAnimId = null;
  }
  if (tokCycleTimer) {
    clearTimeout(tokCycleTimer);
    tokCycleTimer = null;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  slides = Array.from(document.querySelectorAll('.slide'));
  const params = new URLSearchParams(window.location.search);
  const startSlideParam = parseInt(params.get('slide') || '', 10);
  if (!isNaN(startSlideParam) && startSlideParam >= 1 && startSlideParam <= slides.length) {
    currentSlide = startSlideParam - 1;
  }
  buildOverviewGrid();
  syncFullscreenState();
  updateSlideUI();

  document.addEventListener('fullscreenchange', syncFullscreenState);
  document.addEventListener('webkitfullscreenchange', syncFullscreenState);
  window.addEventListener('resize', syncFullscreenState);
  if (window.matchMedia) {
    const fsMedia = window.matchMedia('(display-mode: fullscreen)');
    if (fsMedia.addEventListener) {
      fsMedia.addEventListener('change', syncFullscreenState);
    } else if (fsMedia.addListener) {
      fsMedia.addListener(syncFullscreenState);
    }
  }

  // Prevent inline 3D simulation iframes (Slides 19 & 20) from ever trapping presenter focus
  window.addEventListener('blur', () => {
    setTimeout(() => {
      const modalOpen = document.getElementById('simModalBackdrop')?.classList.contains('open');
      if (!modalOpen && document.activeElement && document.activeElement.tagName === 'IFRAME') {
        document.activeElement.blur();
        window.focus();
      }
    }, 0);
  });

  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) return;

    const modalOpen = document.getElementById('simModalBackdrop')?.classList.contains('open');
    if (modalOpen) {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        closeSimModal();
      }
      return;
    }

    const isFs = document.body.classList.contains('is-fullscreen');

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ' || e.key === 'Enter' || e.key === 'n' || e.key === 'N') {
      e.preventDefault();
      e.stopPropagation();
      nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'Backspace' || e.key === 'p' || e.key === 'P') {
      e.preventDefault();
      e.stopPropagation();
      prevSlide();
    } else if (e.key === 'Home') {
      e.preventDefault();
      e.stopPropagation();
      goToSlide(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      e.stopPropagation();
      goToSlide(slides.length - 1);
    } else if (e.key === 'r' || e.key === 'R') {
      e.preventDefault();
      e.stopPropagation();
      replayCurrentAnimation();
    } else if ((e.key === 'o' || e.key === 'O') && !isFs) {
      e.preventDefault();
      e.stopPropagation();
      toggleOverview();
    } else if ((e.key === 's' || e.key === 'S') && !isFs) {
      e.preventDefault();
      e.stopPropagation();
      toggleNotes();
    } else if (e.key === 'f' || e.key === 'F') {
      e.preventDefault();
      e.stopPropagation();
      toggleFullScreen();
    } else if (e.key === 'Escape') {
      document.getElementById('overviewBackdrop')?.classList.remove('open');
      document.getElementById('notesDrawer')?.classList.remove('open');
      releaseControlFocus();
    }
  }, true);
});

function resolveSimSrc(url) {
  if (window.EMBEDDED_SIMS_B64 && window.EMBEDDED_SIMS_B64[url]) {
    return `data:text/html;base64,${window.EMBEDDED_SIMS_B64[url]}`;
  }
  return url;
}

function updateSlideUI() {
  activeBenchSlideId = null;
  if (inlineSimReloadTimer) {
    clearTimeout(inlineSimReloadTimer);
    inlineSimReloadTimer = null;
  }

  slides.forEach((s, idx) => {
    if (idx === currentSlide) {
      s.classList.add('active');
      const targetId = s.getAttribute('data-autosim-target');
      const simSrc = s.getAttribute('data-autosim-src');
      if (targetId && simSrc) {
        const mount = document.getElementById(targetId);
        if (mount && !mount.querySelector('iframe')) {
          mount.innerHTML = `<iframe src="${resolveSimSrc(simSrc)}" tabindex="-1" allow="fullscreen; autoplay"></iframe>`;
        }
      }
      if (s.hasAttribute('data-bench-id')) {
        activeBenchSlideId = parseInt(s.getAttribute('data-bench-id') || '0', 10);
        benchAnimStart = performance.now();
        benchSettledKey = '';
        if (window.showReplay) window.showReplay();
        const scan = s.querySelector('.mm-rdoc-scanline');
        if (scan) {
          scan.style.animation = 'none';
          void scan.offsetWidth;
          scan.style.animation = '';
        }
      }
      if (s.id === 'slideTokenCompare') {
        playTokenComparison();
      }
      if (s.id === 'slideBenchOverview') {
        animateBenchmarks();
      }
      if (s.id === 'slideModelGarden') {
        startLlmDynamicLoop();
      }
      if (s.id === 'slideAgentGovPlatform') {
        startGovAutoLoop();
      }
      if (s.id === 'slidePriceGear') {
        mountCost3DCompare();
      }
    } else {
      s.classList.remove('active');
      const targetId = s.getAttribute('data-autosim-target');
      if (targetId) {
        const mount = document.getElementById(targetId);
        if (mount && mount.querySelector('iframe')) {
          mount.innerHTML = '';
        }
      }
      if (s.id === 'slideTokenCompare') {
        stopTokenComparison();
      }
      if (s.id === 'slidePriceGear') {
        unmountCost3DCompare();
      }
      if (s.id === 'slideModelGarden') {
        stopLlmDynamicLoop();
      }
      if (s.id === 'slideAgentGovPlatform') {
        stopGovAutoLoop();
      }
    }
  });

  const activeSlide = slides[currentSlide];
  const part = activeSlide?.getAttribute('data-part') || 'intro';
  document.body.classList.remove('part-cover', 'part-model', 'part-arch');
  const partBadge = document.getElementById('slidePartBadge');
  if (part === 'model') {
    document.body.classList.add('part-model');
    if (partBadge) partBadge.textContent = 'PART 1 · CARBON';
  } else if (part === 'arch') {
    document.body.classList.add('part-arch');
    if (partBadge) partBadge.textContent = 'PART 2 · 3-LLM';
  } else {
    document.body.classList.add('part-cover');
    if (partBadge) partBadge.textContent = 'OVERVIEW';
  }

  const total = slides.length;
  const numStr = String(currentSlide + 1).padStart(2, '0') + ' / ' + String(total).padStart(2, '0');
  const counterEl = document.getElementById('slideCounter');
  if (counterEl) counterEl.textContent = numStr;

  const secName = activeSlide?.getAttribute('data-section') || '';
  const badgeEl = document.getElementById('slideSectionBadge');
  if (badgeEl) badgeEl.textContent = secName;

  const notesTitle = document.getElementById('notesTitle');
  const notesBody = document.getElementById('notesBody');
  if (notesTitle) notesTitle.textContent = `발표자 대본 (Slide ${String(currentSlide + 1).padStart(2, '0')} · ${secName})`;
  if (notesBody) notesBody.textContent = SPEAKER_NOTES[currentSlide] || '';

  const ovItems = document.querySelectorAll('.overview-item');
  ovItems.forEach((item, idx) => {
    item.classList.toggle('current', idx === currentSlide);
  });

  const footerEl = document.getElementById('cidRunningFooter');
  if (footerEl) {
    const hideFooter = (currentSlide === 0 || currentSlide === total - 1);
    footerEl.classList.toggle('hidden', hideFooter);
  }
}

function nextSlide() {
  releaseControlFocus();
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    updateSlideUI();
  }
}

function prevSlide() {
  releaseControlFocus();
  if (currentSlide > 0) {
    currentSlide--;
    updateSlideUI();
  }
}

function goToSlide(idx) {
  releaseControlFocus();
  if (idx >= 0 && idx < slides.length) {
    currentSlide = idx;
    updateSlideUI();
    document.getElementById('overviewBackdrop')?.classList.remove('open');
  }
}

function replayActiveBench() {
  benchAnimStart = performance.now();
  benchSettledKey = '';
}

function replayCurrentAnimation() {
  releaseControlFocus();
  const s = slides[currentSlide];
  if (!s) return;
  const targetId = s.getAttribute('data-autosim-target');
  const simSrc = s.getAttribute('data-autosim-src');
  if (targetId && simSrc) {
    reloadInlineSim(targetId, simSrc);
    return;
  }
  if (s.hasAttribute('data-bench-id')) {
    benchAnimStart = performance.now();
    benchSettledKey = '';
    if (window.showReplay) window.showReplay();
    const scan = s.querySelector('.mm-rdoc-scanline');
    if (scan) {
      scan.style.animation = 'none';
      void scan.offsetWidth;
      scan.style.animation = '';
    }
    return;
  }
  if (s.id === 'slideTokenCompare') {
    playTokenComparison();
    return;
  }
  if (s.id === 'slideBenchOverview') {
    animateBenchmarks();
    return;
  }
  if (s.id === 'slideModelGarden') {
    llmActiveIdx = 0;
    startLlmDynamicLoop();
    return;
  }
  if (s.id === 'slideAgentGovPlatform') {
    govActiveIdx = 0;
    startGovAutoLoop();
  }
}

function reloadInlineSim(mountId, src) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  if (inlineSimReloadTimer) {
    clearTimeout(inlineSimReloadTimer);
    inlineSimReloadTimer = null;
  }
  mount.innerHTML = '';
  inlineSimReloadTimer = setTimeout(() => {
    inlineSimReloadTimer = null;
    if (!mount.closest('.slide')?.classList.contains('active')) return;
    mount.innerHTML = `<iframe src="${resolveSimSrc(src)}" tabindex="-1" allow="fullscreen; autoplay"></iframe>`;
  }, 40);
}

function openSimModal(url, title) {
  releaseControlFocus();
  currentModalUrl = url;
  const backdrop = document.getElementById('simModalBackdrop');
  const titleEl = document.getElementById('simModalTitle');
  const bodyEl = document.getElementById('simModalBody');
  if (titleEl) titleEl.textContent = title || '실시간 3D 시뮬레이션';
  if (bodyEl) {
    bodyEl.innerHTML = `<iframe src="${resolveSimSrc(url)}" allow="fullscreen; autoplay"></iframe>`;
  }
  if (backdrop) backdrop.classList.add('open');
}

function reloadModalSim() {
  releaseControlFocus();
  if (!currentModalUrl) return;
  const bodyEl = document.getElementById('simModalBody');
  if (bodyEl) {
    bodyEl.innerHTML = '';
    setTimeout(() => {
      if (!document.getElementById('simModalBackdrop')?.classList.contains('open')) return;
      bodyEl.innerHTML = `<iframe src="${resolveSimSrc(currentModalUrl)}" allow="fullscreen; autoplay"></iframe>`;
    }, 40);
  }
}

function closeSimModal() {
  releaseControlFocus();
  const backdrop = document.getElementById('simModalBackdrop');
  const bodyEl = document.getElementById('simModalBody');
  if (backdrop) backdrop.classList.remove('open');
  if (bodyEl) bodyEl.innerHTML = '';
}

function toggleNotes() {
  releaseControlFocus();
  document.getElementById('notesDrawer')?.classList.toggle('open');
}

function toggleOverview() {
  releaseControlFocus();
  document.getElementById('overviewBackdrop')?.classList.toggle('open');
}

function buildOverviewGrid() {
  const grid = document.getElementById('overviewGrid');
  if (!grid) return;
  grid.innerHTML = slides.map((s, idx) => {
    const sec = s.getAttribute('data-section') || '';
    const part = s.getAttribute('data-part') || 'intro';
    const partTag = part === 'model' ? '[Part 1]' : (part === 'arch' ? '[Part 2]' : '[개요]');
    const title = s.querySelector('h1')?.textContent?.trim() || sec;
    return `
      <div class="overview-item" onclick="goToSlide(${idx})">
        <div style="font-size: 12px; font-weight: 800; color: #64748B; margin-bottom: 4px;">
          SLIDE ${String(idx + 1).padStart(2, '0')} · ${partTag} ${sec}
        </div>
        <div style="font-size: 14.5px; font-weight: 800; color: #0F172A; line-height: 1.35;">
          ${title}
        </div>
      </div>
    `;
  }).join('');
}

function syncFullscreenState() {
  const params = new URLSearchParams(window.location.search);
  const forcedFs = params.get('fullscreen') === '1' || params.get('present') === '1';
  const apiFs = Boolean(document.fullscreenElement || document.webkitFullscreenElement);
  const mediaFs = Boolean(window.matchMedia && window.matchMedia('(display-mode: fullscreen)').matches);
  const isFs = forcedFs || apiFs || mediaFs;

  document.body.classList.toggle('is-fullscreen', isFs);
  if (isFs) {
    document.getElementById('notesDrawer')?.classList.remove('open');
    document.getElementById('overviewBackdrop')?.classList.remove('open');
    closeSimModal();
  }
}

function toggleFullScreen() {
  releaseControlFocus();
  const docEl = document.documentElement;
  const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
  if (!fsEl) {
    if (docEl.requestFullscreen) {
      docEl.requestFullscreen().then(syncFullscreenState).catch(() => {});
    } else if (docEl.webkitRequestFullscreen) {
      docEl.webkitRequestFullscreen();
      syncFullscreenState();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen().then(syncFullscreenState).catch(() => {});
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
      syncFullscreenState();
    }
  }
}



/* ============================================================================
   Slides 04~18: Task-First 1:1 Uniform-Scale Walkthrough Renderer (640 x 380)
   Shows WHAT the task is and HOW Gemini 4.0 Carbon executes it step-by-step
   ============================================================================ */
const BP = {
  bg: '#F9FAFB',
  panel: '#FFFFFF',
  soft: '#F3F4F6',
  blueBg: '#E8F0FE',
  navy: '#174EA6',
  blue: '#1A73E8',
  border: '#D1D5DB',
  grid: '#E5E7EB',
  text: '#111827',
  sub: '#374151',
  muted: '#6B7280',
  greenBg: '#E6F4EA',
  green: '#0D652D',
  amberBg: '#FEF7E0',
  amber: '#B06000',
  redBg: '#FCE8E6',
  red: '#A50E0E'
};

function rRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawPill(ctx, x, y, text, bg, fg, font) {
  ctx.font = font || 'bold 11.5px Pretendard, sans-serif';
  const tw = ctx.measureText(text).width;
  const pw = tw + 18, ph = 22;
  ctx.fillStyle = bg;
  rRect(ctx, x, y, pw, ph, 11);
  ctx.fill();
  ctx.fillStyle = fg;
  ctx.fillText(text, x + 9, y + 15);
  return pw;
}

function drawArrow(ctx, x1, y1, x2, y2, color, lw) {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = lw || 2;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const hl = 7;
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - hl * Math.cos(ang - 0.45), y2 - hl * Math.sin(ang - 0.45));
  ctx.lineTo(x2 - hl * Math.cos(ang + 0.45), y2 - hl * Math.sin(ang + 0.45));
  ctx.closePath();
  ctx.fill();
}

function drawTaskScene(ctx, id, p) {
  // Workspace coordinates: x in [0..600], y in [0..304]
  if (id === 0) {
    // 01. AA Index v5.0: 4 Core Exam Domains Solved Simultaneously
    const exams = [
      { tag: '과목 1 · 논리 추론', q: '생산 라인 A·B·C 교대 제약 6개 배정', work: '제약 조건 교차 탐색 → 충돌 0건 시간표', ok: '✓ 최적 배정 도출' },
      { tag: '과목 2 · 실전 코딩', q: '비동기 워커 큐 메모리 누수 디버깅', work: '핸들 미반환 지점 추적 → release() 패치', ok: '✓ 단위 테스트 통과' },
      { tag: '과목 3 · 고급 수학', q: '비선형 편미분방정식 경계해 유도', work: '∇²u + λu = 0 단계 전개 · 수렴 검증', ok: '✓ 수리 증명 완료' },
      { tag: '과목 4 · 전문 과학', q: '배터리 전해질 계면 저항 상승 원인', work: '이온 전도도 · 부반응 열역학 메커니즘 규명', ok: '✓ 정밀 판정 완료' }
    ];
    exams.forEach((ex, i) => {
      const cx = (i % 2) * 304, cy = Math.floor(i / 2) * 124;
      const done = p > 0.22 + i * 0.16;
      ctx.fillStyle = BP.panel;
      ctx.strokeStyle = done ? BP.blue : BP.border;
      ctx.lineWidth = done ? 2 : 1.2;
      rRect(ctx, cx, cy, 292, 112, 8); ctx.fill(); ctx.stroke();

      drawPill(ctx, cx + 12, cy + 10, ex.tag, done ? BP.blueBg : BP.soft, done ? BP.navy : BP.sub, 'bold 11.5px Pretendard, sans-serif');
      if (done) {
        drawPill(ctx, cx + 178, cy + 10, ex.ok, BP.greenBg, BP.green, 'bold 11px Pretendard, sans-serif');
      }
      ctx.fillStyle = BP.text;
      ctx.font = 'bold 13px Pretendard, sans-serif';
      ctx.fillText(ex.q, cx + 12, cy + 52);

      ctx.fillStyle = BP.sub;
      ctx.font = '12px Pretendard, sans-serif';
      ctx.fillText(ex.work, cx + 12, cy + 74);

      const prog = Math.min(1, Math.max(0, (p - i * 0.12) / 0.45));
      ctx.fillStyle = BP.grid;
      rRect(ctx, cx + 12, cy + 88, 268, 10, 5); ctx.fill();
      ctx.fillStyle = done ? BP.blue : '#93C5FD';
      rRect(ctx, cx + 12, cy + 88, 268 * prog, 10, 5); ctx.fill();
    });

    ctx.fillStyle = BP.blueBg;
    rRect(ctx, 0, 256, 600, 42, 8); ctx.fill();
    ctx.fillStyle = BP.navy;
    ctx.font = 'bold 13.5px Pretendard, sans-serif';
    ctx.fillText('10개 세부 벤치마크 전 과목 편차 없이 고른 득점  →  종합 AA Index 59점 (1위)', 18, 282);

  } else if (id === 1) {
    // 02. Vals Index v2.2: Finance, Law, Tax Real Office Documents
    const docs = [
      {
        pill: '재무 · 분기보고서 검산',
        docA: 'p.12 요약 손익계산서', lineA: '연결 영업이익: 4,120억 원',
        docB: 'p.194 주석 14호 세부표', lineB: '세부 항목 합계: 4,108억 원',
        res: '! -12억 원 단수·누락 불일치 검출', isWarn: true
      },
      {
        pill: '법무 · 공급계약서 검토',
        docA: '본문 제8조 손해배상', lineA: '배상 상한: 계약금액 100%',
        docB: '별첨 B 특약사항 3항', lineB: '"납기지연 간접손해는 상한 예외"',
        res: '! 숨은 무제한 배상 조항 적출', isWarn: true
      },
      {
        pill: '세무 · 조세조약 세액 산출',
        docA: '해외 법인 로열티 지급', lineA: '연간 지급액: 85.0억 원',
        docB: '조세조약 제12조 · 특례', lineB: '제한세율 10% · R&D 공제 대조',
        res: '✓ 원천징수 및 공제 세액 산출 완료', isWarn: false
      }
    ];
    docs.forEach((d, i) => {
      const dx = i * 204, dw = 192;
      const active = p > 0.18 + i * 0.22;
      ctx.fillStyle = BP.panel;
      ctx.strokeStyle = active ? BP.blue : BP.border;
      ctx.lineWidth = active ? 2 : 1.2;
      rRect(ctx, dx, 4, dw, 292, 8); ctx.fill(); ctx.stroke();

      drawPill(ctx, dx + 10, 14, d.pill, BP.blueBg, BP.navy, 'bold 11.5px Pretendard, sans-serif');

      // Sub-box A
      ctx.fillStyle = BP.soft;
      rRect(ctx, dx + 10, 48, dw - 20, 68, 6); ctx.fill();
      ctx.fillStyle = BP.muted; ctx.font = 'bold 11px Pretendard, sans-serif';
      ctx.fillText(d.docA, dx + 18, 68);
      ctx.fillStyle = BP.text; ctx.font = 'bold 12.5px Pretendard, sans-serif';
      ctx.fillText(d.lineA, dx + 18, 94);

      // Cross-check connector
      drawArrow(ctx, dx + dw / 2, 120, dx + dw / 2, 146, active ? BP.blue : BP.border, 2);
      ctx.fillStyle = active ? BP.navy : BP.muted;
      ctx.font = 'bold 11px Pretendard, sans-serif';
      ctx.fillText('1:1 교차 대조', dx + dw / 2 + 8, 137);

      // Sub-box B
      ctx.fillStyle = BP.soft;
      ctx.strokeStyle = (active && d.isWarn) ? BP.red : BP.grid;
      ctx.lineWidth = 1.3;
      rRect(ctx, dx + 10, 150, dw - 20, 72, 6); ctx.fill(); ctx.stroke();
      ctx.fillStyle = BP.muted; ctx.font = 'bold 11px Pretendard, sans-serif';
      ctx.fillText(d.docB, dx + 18, 170);
      ctx.fillStyle = BP.text; ctx.font = 'bold 12px Pretendard, sans-serif';
      ctx.fillText(d.lineB, dx + 18, 196);

      // Verdict bar
      if (active) {
        ctx.fillStyle = d.isWarn ? BP.amberBg : BP.greenBg;
        rRect(ctx, dx + 10, 236, dw - 20, 44, 6); ctx.fill();
        ctx.fillStyle = d.isWarn ? BP.amber : BP.green;
        ctx.font = 'bold 11.5px Pretendard, sans-serif';
        ctx.fillText(d.res, dx + 15, 263);
      }
    });

  } else if (id === 2) {
    // 03. SWE-sweep: 2,400-File Repo Multi-Module Bug Repair
    // Left: Bug Report
    ctx.fillStyle = BP.panel; ctx.strokeStyle = BP.border; ctx.lineWidth = 1.2;
    rRect(ctx, 0, 8, 168, 284, 8); ctx.fill(); ctx.stroke();
    drawPill(ctx, 12, 20, '입력 · 버그 리포트', BP.redBg, BP.red, 'bold 11.5px Pretendard, sans-serif');
    ctx.fillStyle = BP.text; ctx.font = 'bold 13.5px Pretendard, sans-serif';
    ctx.fillText('이슈 #482 접수', 12, 66);
    ctx.font = '12px Pretendard, sans-serif'; ctx.fillStyle = BP.sub;
    ctx.fillText('대량 주문 결제 시', 12, 92);
    ctx.fillText('간헐적 합계 0원 오류', 12, 110);
    ctx.fillStyle = BP.soft; rRect(ctx, 12, 134, 144, 66, 6); ctx.fill();
    ctx.fillStyle = BP.navy; ctx.font = 'bold 11.5px Pretendard, sans-serif';
    ctx.fillText('대상: 2,400개 소스파일', 20, 158);
    ctx.fillStyle = BP.muted; ctx.font = '11.5px Pretendard, sans-serif';
    ctx.fillText('문제 파일 힌트: 없음', 20, 180);

    drawArrow(ctx, 172, 150, 196, 150, BP.blue, 2);

    // Center: 5 Linked Modules inside Repo
    ctx.fillStyle = BP.panel; ctx.strokeStyle = BP.blue; ctx.lineWidth = 1.8;
    rRect(ctx, 200, 8, 224, 284, 8); ctx.fill(); ctx.stroke();
    drawPill(ctx, 212, 20, '연결된 5개 모듈 추적 · 일괄 수리', BP.blueBg, BP.navy, 'bold 11.5px Pretendard, sans-serif');

    const mods = [
      '1. api/order_checkout.py',
      '2. pricing/bulk_discount.py',
      '3. utils/currency_round.py',
      '4. tax/vat_calculator.py',
      '5. db/ledger_commit.py'
    ];
    mods.forEach((m, mi) => {
      const my = 56 + mi * 44;
      const fixed = p > 0.20 + mi * 0.13;
      ctx.fillStyle = fixed ? BP.greenBg : BP.soft;
      ctx.strokeStyle = fixed ? BP.green : BP.border;
      ctx.lineWidth = 1.2;
      rRect(ctx, 212, my, 200, 34, 6); ctx.fill(); ctx.stroke();
      ctx.fillStyle = BP.text; ctx.font = 'bold 12px monospace';
      ctx.fillText(m, 220, my + 21);
      if (mi < 4) {
        drawArrow(ctx, 312, my + 34, 312, my + 44, BP.muted, 1.4);
      }
    });

    drawArrow(ctx, 428, 150, 452, 150, BP.blue, 2);

    // Right: Test Suite Pass
    const allPass = p > 0.82;
    ctx.fillStyle = BP.panel; ctx.strokeStyle = allPass ? BP.green : BP.border; ctx.lineWidth = allPass ? 2 : 1.2;
    rRect(ctx, 456, 8, 144, 284, 8); ctx.fill(); ctx.stroke();
    drawPill(ctx, 468, 20, '검증 · 통합 테스트', allPass ? BP.greenBg : BP.soft, allPass ? BP.green : BP.sub);
    ctx.fillStyle = allPass ? BP.green : BP.navy;
    ctx.font = 'bold 26px Pretendard, sans-serif';
    const cnt = Math.min(128, Math.round(p * 145));
    ctx.fillText(`${cnt}/128`, 468, 118);
    ctx.fillStyle = BP.text; ctx.font = 'bold 13px Pretendard, sans-serif';
    ctx.fillText(allPass ? '전체 테스트 통과 ✓' : '회귀 검증 실행 중...', 468, 148);
    ctx.fillStyle = BP.sub; ctx.font = '12px Pretendard, sans-serif';
    ctx.fillText('하위 모듈 충돌: 0건', 468, 182);
    ctx.fillText('금액 0원 버그: 해결', 468, 204);

  } else if (id === 3) {
    // 04. Terminal-Bench 4.0: Linux Server Diagnosis & Recovery
    ctx.fillStyle = '#0F172A';
    rRect(ctx, 0, 8, 396, 284, 8); ctx.fill();
    ctx.fillStyle = '#1E293B';
    rRect(ctx, 0, 8, 396, 32, 8); ctx.fill();
    ctx.fillStyle = '#E2E8F0'; ctx.font = 'bold 12px monospace';
    ctx.fillText('bash — prod-api-server (Linux Terminal)', 14, 29);

    const cmds = [
      { c: '$ systemctl status api-gateway', o: '  × Active: failed (SSL symbol mismatch)', col: '#FCA5A5' },
      { c: '$ ldd /usr/bin/api-gateway | grep ssl', o: '  libssl.so.1.1 => not found (installed: 3.0)', col: '#FDE68A' },
      { c: "$ sed -i 's/ssl-1.1/ssl-3.0/' CMakeLists.txt && make", o: '  [100%] Built target api-gateway', col: '#93C5FD' },
      { c: '$ systemctl restart api-gateway && ./healthcheck.sh', o: '  ✓ 142 / 142 Endpoints Healthy (HTTP 200)', col: '#6EE7B7' }
    ];
    const visibleSteps = Math.min(4, Math.floor(p * 4.6) + 1);
    for (let i = 0; i < visibleSteps; i++) {
      const cy = 62 + i * 56;
      ctx.fillStyle = '#F8FAFC'; ctx.font = 'bold 12px monospace';
      ctx.fillText(cmds[i].c, 14, cy);
      ctx.fillStyle = cmds[i].col; ctx.font = '11.5px monospace';
      ctx.fillText(cmds[i].o, 14, cy + 20);
    }

    // Right Server Status Monitor
    const ok = p > 0.76;
    ctx.fillStyle = BP.panel; ctx.strokeStyle = ok ? BP.green : BP.border; ctx.lineWidth = ok ? 2 : 1.2;
    rRect(ctx, 412, 8, 188, 284, 8); ctx.fill(); ctx.stroke();
    drawPill(ctx, 424, 20, '서버 상태 모니터', ok ? BP.greenBg : BP.amberBg, ok ? BP.green : BP.amber);

    ctx.fillStyle = ok ? BP.greenBg : (p < 0.3 ? BP.redBg : BP.amberBg);
    rRect(ctx, 424, 60, 164, 74, 8); ctx.fill();
    ctx.fillStyle = ok ? BP.green : (p < 0.3 ? BP.red : BP.amber);
    ctx.font = 'bold 15px Pretendard, sans-serif';
    ctx.fillText(ok ? '● 정상 가동 복구' : (p < 0.3 ? '● 서버 기동 장애' : '● 원인 수리 중...'), 436, 94);
    ctx.font = '12px Pretendard, sans-serif';
    ctx.fillText(ok ? '응답 속도: 18ms (정상)' : '라이브러리 의존성 재설정', 436, 118);

    const checks = ['로그 역추적 진단', 'CMake 설정 패치', '재빌드 및 기동 확인'];
    checks.forEach((ck, ci) => {
      const done = p > 0.28 + ci * 0.24;
      ctx.fillStyle = done ? BP.text : BP.muted;
      ctx.font = 'bold 12.5px Pretendard, sans-serif';
      ctx.fillText((done ? '✓ ' : '○ ') + ck, 426, 174 + ci * 34);
    });

  } else if (id === 4) {
    // 05. Agents' Last Exam v1.1: Virtual Desktop Multi-App & Popup Dismissal
    ctx.fillStyle = '#EEF2F6'; ctx.strokeStyle = BP.border; ctx.lineWidth = 1.5;
    rRect(ctx, 0, 6, 600, 290, 8); ctx.fill(); ctx.stroke();
    // Windows 11 Title Bar
    ctx.fillStyle = '#E2E8F0';
    rRect(ctx, 0, 6, 600, 28, 8); ctx.fill();
    ctx.fillStyle = BP.text; ctx.font = 'bold 12px Pretendard, sans-serif';
    ctx.fillText('가상 PC 업무 화면 (브라우저 · 파일 탐색기 · 정산 시트)', 14, 24);
    ctx.fillText('─   □   ✕', 532, 24);

    const wins = [
      { t: '1. 구매 포털 (Web)', l1: '10월 거래처 송장 조회', l2: 'invoice_10.pdf 다운로드 ✓', thr: 0.15 },
      { t: '2. 파일 탐색기', l1: '다운로드 폴더 스캔', l2: '/2026_10_정산/ 이동 완료 ✓', thr: 0.55 },
      { t: '3. 재무 정산 시트', l1: '공급가 · 세액 자동 입력', l2: '[최종 제출] 클릭 완료 ✓', thr: 0.80 }
    ];
    wins.forEach((w, wi) => {
      const wx = 14 + wi * 194, wy = 48;
      const done = p > w.thr;
      ctx.fillStyle = BP.panel; ctx.strokeStyle = done ? BP.blue : BP.border; ctx.lineWidth = done ? 2 : 1.2;
      rRect(ctx, wx, wy, 184, 152, 6); ctx.fill(); ctx.stroke();
      ctx.fillStyle = done ? BP.blueBg : BP.soft;
      rRect(ctx, wx, wy, 184, 28, 6); ctx.fill();
      ctx.fillStyle = done ? BP.navy : BP.text; ctx.font = 'bold 12px Pretendard, sans-serif';
      ctx.fillText(w.t, wx + 10, wy + 19);
      ctx.fillStyle = BP.sub; ctx.font = '12px Pretendard, sans-serif';
      ctx.fillText(w.l1, wx + 10, wy + 64);
      if (done) {
        ctx.fillStyle = BP.green; ctx.font = 'bold 12px Pretendard, sans-serif';
        ctx.fillText(w.l2, wx + 10, wy + 102);
      }
    });

    // Unexpected Popup appears between p=0.22 and p=0.50, then gets closed!
    if (p >= 0.20 && p < 0.50) {
      ctx.fillStyle = '#FFFFFF'; ctx.strokeStyle = BP.amber; ctx.lineWidth = 2.2;
      rRect(ctx, 175, 112, 250, 96, 8); ctx.fill(); ctx.stroke();
      ctx.fillStyle = BP.amberBg; rRect(ctx, 175, 112, 250, 30, 8); ctx.fill();
      ctx.fillStyle = BP.amber; ctx.font = 'bold 12px Pretendard, sans-serif';
      ctx.fillText('돌발 시스템 공지 팝업', 188, 132);
      ctx.fillStyle = BP.red; ctx.fillText('[✕ 닫기]', 368, 132);
      ctx.fillStyle = BP.text; ctx.font = '12px Pretendard, sans-serif';
      ctx.fillText('예상 밖 알림창 감지 → [✕] 클릭해 닫기', 188, 172);
    }

    // Status bar at bottom of desktop
    ctx.fillStyle = BP.panel; rRect(ctx, 14, 216, 572, 64, 6); ctx.fill();
    const curMsg = p < 0.22 ? '진행 1/4: 웹 포털에서 송장 PDF 다운로드 중...' :
                   p < 0.50 ? '진행 2/4: 화면을 가린 돌발 팝업창 [✕ 닫기] 클릭 처리 중...' :
                   p < 0.78 ? '진행 3/4: 다운로드된 파일을 정산 폴더로 분류 이동 중...' :
                              '진행 4/4: 스프레드시트 금액 기입 및 최종 제출 완료 ✓';
    ctx.fillStyle = BP.navy; ctx.font = 'bold 13.5px Pretendard, sans-serif';
    ctx.fillText(curMsg, 28, 253);

    // Animated Cursor
    const curX = p < 0.22 ? 100 : (p < 0.50 ? 392 : (p < 0.78 ? 300 : 495));
    const curY = p < 0.22 ? 140 : (p < 0.50 ? 128 : (p < 0.78 ? 145 : 150));
    ctx.fillStyle = BP.blue;
    ctx.beginPath(); ctx.arc(curX, curY, 8, 0, Math.PI * 2); ctx.fill();

  } else if (id === 5) {
    // 06. AutomationBench: 5-Step Pipeline with Auto Format Bypass
    const stages = [
      { n: '1. ERP 조회', s: '매출 원장 추출' },
      { n: '2. 환율 API', s: 'USD·EUR 수신' },
      { n: '3. 데이터 결합', s: '날짜 포맷 충돌!' },
      { n: '4. 보고서 생성', s: '주간 요약표 작성' },
      { n: '5. 메일 발송', s: '임원진 배포 완료' }
    ];
    stages.forEach((st, i) => {
      const sx = i * 122, sy = 132, sw = 108, sh = 92;
      const isConflict = i === 2;
      const reached = p > i * 0.17;
      ctx.fillStyle = isConflict ? BP.amberBg : (reached ? BP.panel : BP.soft);
      ctx.strokeStyle = isConflict ? BP.amber : (reached ? BP.blue : BP.border);
      ctx.lineWidth = reached ? 2 : 1.2;
      rRect(ctx, sx, sy, sw, sh, 8); ctx.fill(); ctx.stroke();

      ctx.fillStyle = isConflict ? BP.amber : BP.text;
      ctx.font = 'bold 12.5px Pretendard, sans-serif';
      ctx.fillText(st.n, sx + 10, sy + 32);
      ctx.fillStyle = isConflict ? BP.red : BP.sub;
      ctx.font = '11.5px Pretendard, sans-serif';
      ctx.fillText(st.s, sx + 10, sy + 58);

      if (i < 4 && i !== 2 && i !== 1) {
        drawArrow(ctx, sx + sw + 2, sy + 46, sx + 120, sy + 46, reached ? BP.blue : BP.border, 2);
      }
    });

    // Auto-Bypass Bridge above Stage 3
    if (p > 0.34) {
      ctx.fillStyle = BP.greenBg; ctx.strokeStyle = BP.green; ctx.lineWidth = 2;
      rRect(ctx, 168, 22, 264, 72, 8); ctx.fill(); ctx.stroke();
      ctx.fillStyle = BP.green; ctx.font = 'bold 13px Pretendard, sans-serif';
      ctx.fillText('✓ 즉석 날짜·통화 변환 코드 자동 생성 (우회 성공)', 182, 50);
      ctx.fillStyle = BP.sub; ctx.font = '12px monospace';
      ctx.fillText("'31-Oct-26' → '2026-10-31' 정규화 후 4단계 전달", 182, 74);

      drawArrow(ctx, 176, 132, 206, 96, BP.green, 2);
      drawArrow(ctx, 394, 96, 424, 132, BP.green, 2);
    }

    ctx.fillStyle = BP.soft; rRect(ctx, 0, 246, 600, 44, 8); ctx.fill();
    ctx.fillStyle = BP.text; ctx.font = 'bold 13px Pretendard, sans-serif';
    ctx.fillText(p > 0.78 ? '결과: 중간 포맷 에러로 멈추지 않고 1~5단계 무인 자동화 파이프라인 완주 완료 ✓' : '실행 중: 외부 API 포맷 불일치 감지 및 우회 어댑터 생성...', 18, 273);

  } else if (id === 6) {
    // 07. Vending-Bench 2: 365-Day Autonomous Store Operations
    const curDay = Math.max(1, Math.round(p * 365));
    const curCash = Math.round(500 + (16484 - 500) * Math.pow(p, 1.08));

    // Left Operations Panel
    ctx.fillStyle = BP.panel; ctx.strokeStyle = BP.border; ctx.lineWidth = 1.2;
    rRect(ctx, 0, 8, 236, 284, 8); ctx.fill(); ctx.stroke();
    drawPill(ctx, 12, 20, `일별 매장 운영 · Day ${curDay} / 365`, BP.blueBg, BP.navy);

    const ops = [
      ['수요 예측', curDay < 90 ? '봄철 출근 시간 스낵 강세' : (curDay < 240 ? '여름 폭염 → 음료 발주 +40%' : '가을·겨울 고마진 품목 확대')],
      ['재고 관리', '안전재고 유지 · 품절 0건'],
      ['가격 조절', '유통기한 임박분 15% 탄력 할인'],
      ['현금 흐름', `누적 잔고 $${curCash.toLocaleString()}`]
    ];
    ops.forEach(([k, v], oi) => {
      const oy = 58 + oi * 54;
      ctx.fillStyle = oi === 3 ? BP.greenBg : BP.soft;
      rRect(ctx, 12, oy, 212, 44, 6); ctx.fill();
      ctx.fillStyle = BP.muted; ctx.font = 'bold 11px Pretendard, sans-serif';
      ctx.fillText(k, 20, oy + 17);
      ctx.fillStyle = oi === 3 ? BP.green : BP.text; ctx.font = 'bold 12px Pretendard, sans-serif';
      ctx.fillText(v, 20, oy + 35);
    });

    // Right 365-Day Balance Growth Chart
    ctx.fillStyle = BP.panel; ctx.strokeStyle = BP.border; ctx.lineWidth = 1.2;
    rRect(ctx, 252, 8, 348, 284, 8); ctx.fill(); ctx.stroke();
    ctx.fillStyle = BP.text; ctx.font = 'bold 13px Pretendard, sans-serif';
    ctx.fillText('365일 누적 현금 잔고 추이 ($500 → $16,484)', 268, 34);

    const gx = 282, gy = 56, gw = 296, gh = 192;
    ctx.strokeStyle = BP.grid; ctx.lineWidth = 1;
    for (let r = 0; r <= 4; r++) {
      const ly = gy + (gh / 4) * r;
      ctx.beginPath(); ctx.moveTo(gx, ly); ctx.lineTo(gx + gw, ly); ctx.stroke();
    }
    ctx.strokeStyle = BP.border; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.stroke();

    const maxPts = Math.max(2, Math.floor(p * 50));
    ctx.beginPath();
    for (let i = 0; i <= maxPts; i++) {
      const u = i / 50;
      const x = gx + u * gw;
      const val = Math.pow(u, 1.08) * 0.86 + Math.sin(u * 12) * 0.02;
      const y = gy + gh - 10 - val * (gh - 24);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = BP.blue; ctx.lineWidth = 3; ctx.stroke();

    ctx.fillStyle = BP.muted; ctx.font = '11.5px Pretendard, sans-serif';
    ctx.fillText('Day 1 ($500)', gx, gy + gh + 20);
    ctx.fillText('Day 180', gx + gw * 0.45, gy + gh + 20);
    ctx.fillStyle = BP.navy; ctx.font = 'bold 12px Pretendard, sans-serif';
    ctx.fillText('Day 365 ($16,484)', gx + gw - 108, gy + gh + 20);

  } else if (id === 7) {
    // 08. Chartography: Dual-Axis Dense Chart Reading
    ctx.fillStyle = BP.panel; ctx.strokeStyle = BP.border; ctx.lineWidth = 1.2;
    rRect(ctx, 0, 6, 600, 290, 8); ctx.fill(); ctx.stroke();

    drawPill(ctx, 16, 16, '질문: 챔버 온도가 최고점(185°C)일 때 Lot B의 공정 수율(%)은?', BP.blueBg, BP.navy, 'bold 12px Pretendard, sans-serif');

    const cx = 68, cy = 58, cw = 452, ch = 192;
    ctx.strokeStyle = BP.grid; ctx.lineWidth = 1;
    for (let r = 0; r <= 4; r++) {
      const ly = cy + (ch / 4) * r;
      ctx.beginPath(); ctx.moveTo(cx, ly); ctx.lineTo(cx + cw, ly); ctx.stroke();
    }
    // Left Y-axis (Temp °C) & Right Y-axis (Yield %)
    ctx.strokeStyle = BP.sub; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy + ch); ctx.stroke();
    ctx.strokeStyle = BP.green;
    ctx.beginPath(); ctx.moveTo(cx + cw, cy); ctx.lineTo(cx + cw, cy + ch); ctx.stroke();

    ctx.fillStyle = BP.sub; ctx.font = 'bold 11.5px Pretendard, sans-serif';
    ctx.fillText('좌측 축: 온도(°C)', 12, 50);
    ctx.fillText('200°C', 22, cy + 10); ctx.fillText('150°C', 22, cy + ch / 2); ctx.fillText('100°C', 22, cy + ch);

    ctx.fillStyle = BP.green;
    ctx.fillText('우측 보조축: 수율(%)', cx + cw - 52, 50);
    ctx.fillText('100%', cx + cw + 10, cy + 10);
    ctx.fillText('94.8%', cx + cw + 10, cy + 54);
    ctx.fillText('80%', cx + cw + 10, cy + ch);

    // Curve 1: Temp (peaks at u = 0.65)
    ctx.beginPath();
    for (let i = 0; i <= 40; i++) {
      const u = i / 40, x = cx + u * cw;
      const tempY = cy + ch - (0.30 + 0.56 * Math.exp(-Math.pow((u - 0.65) / 0.22, 2))) * ch;
      if (i === 0) ctx.moveTo(x, tempY); else ctx.lineTo(x, tempY);
    }
    ctx.strokeStyle = '#64748B'; ctx.lineWidth = 2.2; ctx.stroke();

    // Curve 2: Lot B Yield (at u = 0.65, y = cy + 50 -> 94.8%)
    ctx.beginPath();
    for (let i = 0; i <= 40; i++) {
      const u = i / 40, x = cx + u * cw;
      const yldY = cy + ch - (0.45 + 0.30 * u + 0.08 * Math.sin(u * 5)) * ch;
      if (i === 0) ctx.moveTo(x, yldY); else ctx.lineTo(x, yldY);
    }
    ctx.strokeStyle = BP.blue; ctx.lineWidth = 2.6; ctx.stroke();

    const peakX = cx + 0.65 * cw;
    const peakTempY = cy + ch - 0.86 * ch;
    const lotBY = cy + 50;

    if (p > 0.25) {
      ctx.strokeStyle = BP.navy; ctx.setLineDash([4, 3]); ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(peakX, peakTempY); ctx.lineTo(peakX, cy + ch); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = BP.sub; ctx.beginPath(); ctx.arc(peakX, peakTempY, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillText('1. 최고 온도 지점(185°C) 포착', peakX - 80, peakTempY - 10);
    }
    if (p > 0.55) {
      ctx.fillStyle = BP.blue; ctx.beginPath(); ctx.arc(peakX, lotBY, 6, 0, Math.PI * 2); ctx.fill();
      drawArrow(ctx, peakX + 6, lotBY, cx + cw - 4, lotBY, BP.green, 2.4);
      drawPill(ctx, cx + 120, cy + ch + 12, '✓ 좌측 온도축 혼동 없이 우측 보조축 눈금 94.8% 정확 판독', BP.greenBg, BP.green, 'bold 12px Pretendard, sans-serif');
    }

  } else if (id === 8) {
    // 09. Blueprint-Bench 2: 2D CAD Floorplan & Clearance Check
    ctx.fillStyle = BP.panel; ctx.strokeStyle = BP.border; ctx.lineWidth = 1.2;
    rRect(ctx, 0, 8, 316, 284, 8); ctx.fill(); ctx.stroke();
    drawPill(ctx, 12, 18, '입력 · 2D 설비 배치 CAD 도면', BP.blueBg, BP.navy);

    // Outer walls
    ctx.strokeStyle = BP.text; ctx.lineWidth = 3.5;
    ctx.strokeRect(28, 56, 260, 208);
    // Partition wall with door opening
    ctx.beginPath();
    ctx.moveTo(156, 56); ctx.lineTo(156, 124);
    ctx.moveTo(156, 174); ctx.lineTo(156, 264);
    ctx.stroke();

    // Door swing R900
    ctx.strokeStyle = BP.green; ctx.lineWidth = 2; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.arc(156, 124, 50, 0, Math.PI * 0.5); ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath(); ctx.moveTo(156, 124); ctx.lineTo(206, 124); ctx.stroke();
    ctx.fillStyle = BP.green; ctx.font = 'bold 11px Pretendard, sans-serif';
    ctx.fillText('방화문 R900', 164, 116);

    // Equipment A box
    ctx.fillStyle = BP.blueBg; ctx.strokeStyle = BP.blue; ctx.lineWidth = 1.8;
    rRect(ctx, 214, 72, 62, 108, 4); ctx.fill(); ctx.stroke();
    ctx.fillStyle = BP.navy; ctx.fillText('신규 설비 A', 218, 130);

    // Emergency corridor dimension line
    ctx.strokeStyle = BP.amber; ctx.lineWidth = 1.4;
    drawArrow(ctx, 160, 232, 284, 232, BP.amber, 1.6);
    ctx.fillStyle = BP.amber; ctx.fillText('비상 통로 1,500mm', 176, 224);

    // Scan line
    if (p < 0.92) {
      const sx = 28 + p * 260;
      ctx.strokeStyle = BP.blue; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(sx, 52); ctx.lineTo(sx, 268); ctx.stroke();
    }

    // Right Spatial Verification Results
    ctx.fillStyle = BP.panel; ctx.strokeStyle = BP.border; ctx.lineWidth = 1.2;
    rRect(ctx, 332, 8, 268, 284, 8); ctx.fill(); ctx.stroke();
    drawPill(ctx, 344, 18, '공간 구조 복원 · 간섭 판정 결과', BP.greenBg, BP.green);

    const items = [
      ['벽체 vs 치수선 구분', '얇은 치수선과 실제 격벽 1:1 분리 완료'],
      ['문 회전 반경(R900)', '신규 설비 A와 충돌 간섭 없음 확인'],
      ['비상 대피 통로 폭', '안전 규격 1.5m 이상 유효 폭 확보 확인']
    ];
    items.forEach(([t, s], ii) => {
      const iy = 60 + ii * 72;
      const ok = p > 0.24 + ii * 0.24;
      ctx.fillStyle = ok ? BP.greenBg : BP.soft;
      rRect(ctx, 344, iy, 244, 58, 6); ctx.fill();
      ctx.fillStyle = ok ? BP.green : BP.text; ctx.font = 'bold 12.5px Pretendard, sans-serif';
      ctx.fillText((ok ? '✓ ' : '○ ') + t, 354, iy + 23);
      ctx.fillStyle = BP.sub; ctx.font = '11.5px Pretendard, sans-serif';
      ctx.fillText(s, 354, iy + 44);
    });

  } else if (id === 9) {
    // 10. GraphWalks (256k~1M): 4 Stepping-Stone Clues Across 1,000 Pages
    const clues = [
      { pg: '18쪽 · 불량 접수', info1: '이슈 로트 번호 확인', info2: '#LOT-774 특정' },
      { pg: '340쪽 · 조립 이력', info1: '#LOT-774 투입 부품', info2: '제어 밸브 V-19' },
      { pg: '690쪽 · 구매 원장', info1: '밸브 V-19 납품 업체', info2: 'K-정밀 3공장' },
      { pg: '940쪽 · 품질 감사', info1: 'K-정밀 공정 기록 대조', info2: '3차 열처리 이탈 확정 ✓' }
    ];
    clues.forEach((c, ci) => {
      const cx = ci * 153, cy = 82, cw = 138, ch = 148;
      const act = p > ci * 0.22;
      ctx.fillStyle = act ? BP.panel : BP.soft;
      ctx.strokeStyle = act ? (ci === 3 ? BP.green : BP.blue) : BP.border;
      ctx.lineWidth = act ? 2.2 : 1.2;
      rRect(ctx, cx, cy, cw, ch, 8); ctx.fill(); ctx.stroke();

      drawPill(ctx, cx + 8, cy + 12, c.pg, act ? BP.blueBg : BP.grid, act ? BP.navy : BP.muted, 'bold 11px Pretendard, sans-serif');
      ctx.fillStyle = BP.sub; ctx.font = '12px Pretendard, sans-serif';
      ctx.fillText(c.info1, cx + 10, cy + 68);
      ctx.fillStyle = ci === 3 && act ? BP.green : BP.text;
      ctx.font = 'bold 12.5px Pretendard, sans-serif';
      ctx.fillText(c.info2, cx + 10, cy + 98);

      if (ci > 0 && act) {
        const prevX = (ci - 1) * 153 + 69, curX = cx + 69;
        ctx.strokeStyle = BP.blue; ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(prevX, cy);
        ctx.quadraticCurveTo((prevX + curX) / 2, 18, curX, cy);
        ctx.stroke();
        ctx.fillStyle = BP.navy; ctx.font = 'bold 11px Pretendard, sans-serif';
        ctx.fillText(`단서 ${ci}→${ci + 1} 연결`, (prevX + curX) / 2 - 34, 42);
      }
    });

    // 1,000p Document Bar
    ctx.fillStyle = BP.grid; rRect(ctx, 0, 252, 600, 38, 8); ctx.fill();
    ctx.fillStyle = BP.blueBg; rRect(ctx, 0, 252, Math.min(600, 600 * p), 38, 8); ctx.fill();
    ctx.fillStyle = BP.navy; ctx.font = 'bold 13px Pretendard, sans-serif';
    ctx.fillText('1,000페이지(약 80만 토큰) 전체 문맥 유지  —  앞쪽 단서를 잊지 않고 4단계 연속 추론 완주', 18, 276);

  } else if (id === 10) {
    // 11. RiemannBench: 4-Step Differential Equation Proof & Stable Orbit
    ctx.fillStyle = BP.panel; ctx.strokeStyle = BP.border; ctx.lineWidth = 1.2;
    rRect(ctx, 0, 8, 332, 284, 8); ctx.fill(); ctx.stroke();
    drawPill(ctx, 12, 18, '단계별 수리 방정식 전개 · 부호 검증', BP.blueBg, BP.navy);

    const steps = [
      ['Step 1 · 지배방정식 설정', '∂u/∂t + (u·∇)u = -∇p/ρ + ν∇²u'],
      ['Step 2 · 비선형 항 편미분 전개', '교차 미분항 14개 계수 · 부호 무오류 전개'],
      ['Step 3 · 경계조건 · 보존법칙 대입', '에너지 적분 E(t) ≤ E(0) 부등식 유도'],
      ['Step 4 · 일반해 수렴 엄밀 증명', '✓ 발산 항 0 수렴 증명 완료 (오차 없음)']
    ];
    steps.forEach(([st, eq], si) => {
      const sy = 54 + si * 56;
      const ok = p > si * 0.22;
      ctx.fillStyle = ok ? (si === 3 ? BP.greenBg : BP.soft) : '#F9FAFB';
      rRect(ctx, 12, sy, 308, 46, 6); ctx.fill();
      ctx.fillStyle = ok ? BP.navy : BP.muted; ctx.font = 'bold 11.5px Pretendard, sans-serif';
      ctx.fillText(st, 20, sy + 18);
      ctx.fillStyle = si === 3 && ok ? BP.green : BP.text; ctx.font = 'bold 12px monospace';
      ctx.fillText(eq, 20, sy + 37);
    });

    // Right Stable Closed Orbit Plot
    ctx.fillStyle = BP.panel; ctx.strokeStyle = BP.border; ctx.lineWidth = 1.2;
    rRect(ctx, 348, 8, 252, 284, 8); ctx.fill(); ctx.stroke();
    drawPill(ctx, 360, 18, '물리 궤도 수렴 검증', BP.greenBg, BP.green);

    const ox = 474, oy = 158;
    ctx.strokeStyle = BP.grid; ctx.lineWidth = 1;
    [34, 64, 94].forEach(r => { ctx.beginPath(); ctx.arc(ox, oy, r, 0, Math.PI * 2); ctx.stroke(); });
    ctx.fillStyle = BP.text; ctx.beginPath(); ctx.arc(ox, oy, 14, 0, Math.PI * 2); ctx.fill();

    ctx.beginPath();
    const nPts = Math.max(2, Math.floor(p * 80));
    for (let i = 0; i <= nPts; i++) {
      const u = i / 80, ang = u * Math.PI * 2.2;
      const rad = 74 + Math.cos(ang * 2) * 8;
      const px = ox + Math.cos(ang) * rad, py = oy + Math.sin(ang) * rad * 0.85;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = BP.blue; ctx.lineWidth = 3; ctx.stroke();
    ctx.fillStyle = BP.sub; ctx.font = 'bold 12px Pretendard, sans-serif';
    ctx.fillText('궤도 발산 없이 안정 수렴 ✓', 402, 274);

  } else if (id === 11) {
    // 12. Terminal-Bench-Science 0.1: Lab Sensor Data Calibration Loop
    ctx.fillStyle = BP.panel; ctx.strokeStyle = BP.border; ctx.lineWidth = 1.2;
    rRect(ctx, 0, 8, 236, 284, 8); ctx.fill(); ctx.stroke();
    drawPill(ctx, 12, 18, '코드 재실행 · 파라미터 보정', BP.blueBg, BP.navy);

    const iters = [
      ['1차 시뮬레이션 구동', '초기 열전달 계수 → 오차 14.2%', 0.10, false],
      ['2차 파라미터 코드 수정', '점성·확산 계수 재산출 → 오차 3.8%', 0.42, false],
      ['3차 최종 보정 완료', '측정값 9개 지점 일치 → 오차 0.3% ✓', 0.72, true]
    ];
    iters.forEach(([t, s, thr, win], ii) => {
      const iy = 62 + ii * 72;
      const act = p > thr;
      ctx.fillStyle = act ? (win ? BP.greenBg : BP.soft) : '#F9FAFB';
      ctx.strokeStyle = act ? (win ? BP.green : BP.blue) : BP.grid;
      ctx.lineWidth = 1.4;
      rRect(ctx, 12, iy, 212, 58, 6); ctx.fill(); ctx.stroke();
      ctx.fillStyle = act ? (win ? BP.green : BP.navy) : BP.muted;
      ctx.font = 'bold 12.5px Pretendard, sans-serif';
      ctx.fillText(t, 20, iy + 23);
      ctx.fillStyle = BP.sub; ctx.font = '11.5px Pretendard, sans-serif';
      ctx.fillText(s, 20, iy + 44);
    });

    // Right Curve Fitting Plot
    ctx.fillStyle = BP.panel; ctx.strokeStyle = BP.border; ctx.lineWidth = 1.2;
    rRect(ctx, 252, 8, 348, 284, 8); ctx.fill(); ctx.stroke();
    ctx.fillStyle = BP.text; ctx.font = 'bold 13px Pretendard, sans-serif';
    ctx.fillText('실제 실험실 센서 측정값(●) vs 시뮬레이션 곡선(━)', 268, 34);

    const gx = 276, gy = 56, gw = 300, gh = 196;
    ctx.strokeStyle = BP.border; ctx.lineWidth = 1.4;
    ctx.strokeRect(gx, gy, gw, gh);

    // Fitted simulation curve tightening toward fit = 1.0
    const fit = 0.42 + 0.58 * Math.min(1, p * 1.18);
    ctx.beginPath();
    for (let i = 0; i <= 40; i++) {
      const u = i / 40;
      const x = gx + u * gw;
      const targetY = Math.sin(u * Math.PI) * 136;
      const curY = gy + gh - 24 - (targetY * fit + (1 - fit) * 28);
      if (i === 0) ctx.moveTo(x, curY); else ctx.lineTo(x, curY);
    }
    ctx.strokeStyle = BP.blue; ctx.lineWidth = 3; ctx.stroke();

    // 9 Measured Sensor Dots
    for (let i = 0; i < 9; i++) {
      const u = (i + 0.5) / 9;
      const dx = gx + u * gw;
      const dy = gy + gh - 24 - Math.sin(u * Math.PI) * 136;
      ctx.fillStyle = BP.text;
      ctx.beginPath(); ctx.arc(dx, dy, 5, 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = p > 0.72 ? BP.green : BP.navy;
    ctx.font = 'bold 12.5px Pretendard, sans-serif';
    ctx.fillText(p > 0.72 ? '✓ 결정계수 R² = 0.998 (실험 데이터와 정밀 일치)' : '시뮬레이션 파라미터 자동 피팅 중...', gx + 12, gy + gh + 24);

  } else if (id === 12) {
    // 13. SEC-bench Pro: 3-File Function Call Graph Vulnerability Trace
    const files = [
      { f: '1. api/gateway.ts', code1: 'export function handle(req) {', code2: '  return verifySession(req);', tag: '외부 요청 진입점', warn: false },
      { f: '2. auth/session.ts', code1: 'if (req.hdr["x-legacy"]) {', code2: '  return { trusted: true }; // !', tag: '예외 분기에서 검증 생략', warn: true },
      { f: '3. db/admin_store.ts', code1: 'if (ctx.trusted) {', code2: '  return dumpAllUsers(); }', tag: '! 무인증 관리자 DB 유출', warn: true }
    ];
    files.forEach((fl, fi) => {
      const fx = fi * 204, fy = 22, fw = 188, fh = 200;
      const hit = p > 0.18 + fi * 0.25;
      ctx.fillStyle = BP.panel;
      ctx.strokeStyle = hit ? (fl.warn ? BP.red : BP.blue) : BP.border;
      ctx.lineWidth = hit ? 2.2 : 1.2;
      rRect(ctx, fx, fy, fw, fh, 8); ctx.fill(); ctx.stroke();

      drawPill(ctx, fx + 10, fy + 12, fl.f, BP.soft, BP.text, 'bold 11.5px monospace');
      ctx.fillStyle = '#0F172A'; rRect(ctx, fx + 10, fy + 46, fw - 20, 82, 6); ctx.fill();
      ctx.fillStyle = '#E2E8F0'; ctx.font = '11px monospace';
      ctx.fillText(fl.code1, fx + 16, fy + 74);
      ctx.fillStyle = (hit && fl.warn) ? '#FCA5A5' : '#93C5FD';
      ctx.fillText(fl.code2, fx + 16, fy + 102);

      if (hit) {
        drawPill(ctx, fx + 10, fy + 150, fl.tag, fl.warn ? BP.redBg : BP.blueBg, fl.warn ? BP.red : BP.navy, 'bold 11px Pretendard, sans-serif');
      }
      if (fi < 2) {
        drawArrow(ctx, fx + fw + 2, fy + 96, fx + 202, fy + 96, hit ? BP.blue : BP.border, 2.2);
      }
    });

    ctx.fillStyle = BP.blueBg; rRect(ctx, 0, 244, 600, 44, 8); ctx.fill();
    ctx.fillStyle = BP.navy; ctx.font = 'bold 13px Pretendard, sans-serif';
    ctx.fillText('파일 3개에 걸친 함수 호출 맥락을 끝까지 추적해 숨은 인증 우회 경로 포착 ✓', 18, 271);

  } else if (id === 13) {
    // 14. ExploitGym: Safe Sandbox PoC Verification to Filter Out False Positives
    const alerts = [
      { name: '경고 1: 입력 길이 제한 미흡', real: false, out: '공격 실패 → 단순 오탐 제외' },
      { name: '경고 2: 주석 내 token 문자열', real: false, out: '공격 실패 → 단순 오탐 제외' },
      { name: '경고 3: JWT 서명 검증 누락', real: true, out: '! 권한 탈취 재현 → 진성 확정' },
      { name: '경고 4: 구형 브라우저 헤더', real: false, out: '공격 실패 → 단순 오탐 제외' }
    ];
    // Center Sandbox Column
    ctx.fillStyle = '#EFF6FF'; ctx.strokeStyle = BP.blue; ctx.lineWidth = 1.8;
    rRect(ctx, 214, 10, 152, 280, 10); ctx.fill(); ctx.stroke();
    ctx.fillStyle = BP.navy; ctx.font = 'bold 13px Pretendard, sans-serif';
    ctx.fillText('격리 가상 샌드박스', 236, 36);
    ctx.fillStyle = BP.sub; ctx.font = '11.5px Pretendard, sans-serif';
    ctx.fillText('(모의 해킹 직접 실행)', 234, 54);

    alerts.forEach((al, ai) => {
      const ay = 72 + ai * 52;
      const tested = p > 0.20 + ai * 0.16;
      // Left alert box
      ctx.fillStyle = BP.panel; ctx.strokeStyle = BP.border; ctx.lineWidth = 1.2;
      rRect(ctx, 0, ay, 194, 40, 6); ctx.fill(); ctx.stroke();
      ctx.fillStyle = BP.text; ctx.font = 'bold 11.5px Pretendard, sans-serif';
      ctx.fillText(al.name, 10, ay + 25);

      drawArrow(ctx, 196, ay + 20, 212, ay + 20, BP.muted, 1.5);
      ctx.fillStyle = tested ? (al.real ? BP.redBg : BP.panel) : BP.panel;
      rRect(ctx, 228, ay + 6, 124, 28, 6); ctx.fill();
      ctx.fillStyle = tested ? (al.real ? BP.red : BP.muted) : BP.muted;
      ctx.font = 'bold 11px Pretendard, sans-serif';
      ctx.fillText(tested ? (al.real ? 'PoC 돌파 확인!' : '침투 불가 확인') : '재현 테스트 중', 244, ay + 24);

      drawArrow(ctx, 368, ay + 20, 386, ay + 20, tested ? (al.real ? BP.red : BP.border) : BP.border, 1.5);

      // Right verdict box
      ctx.fillStyle = tested ? (al.real ? BP.redBg : BP.soft) : '#F9FAFB';
      ctx.strokeStyle = tested ? (al.real ? BP.red : BP.grid) : BP.grid;
      rRect(ctx, 390, ay, 210, 40, 6); ctx.fill(); ctx.stroke();
      ctx.fillStyle = tested ? (al.real ? BP.red : BP.muted) : BP.muted;
      ctx.font = 'bold 11.5px Pretendard, sans-serif';
      ctx.fillText(tested ? al.out : '판정 대기...', 400, ay + 25);
    });

  } else if (id === 14) {
    // 15. CWE-bench: Zero-Downtime Security Patch (Block Attacks + Keep Users Working)
    // Left incoming streams
    ctx.fillStyle = BP.redBg; ctx.strokeStyle = BP.red; ctx.lineWidth = 1.5;
    rRect(ctx, 0, 34, 184, 92, 8); ctx.fill(); ctx.stroke();
    ctx.fillStyle = BP.red; ctx.font = 'bold 13px Pretendard, sans-serif';
    ctx.fillText('악성 해킹 공격 유입', 14, 64);
    ctx.fillStyle = BP.sub; ctx.font = '11.5px Pretendard, sans-serif';
    ctx.fillText('SQL Injection · 권한 우회 시도', 14, 90);

    ctx.fillStyle = BP.blueBg; ctx.strokeStyle = BP.blue; ctx.lineWidth = 1.5;
    rRect(ctx, 0, 166, 184, 96, 8); ctx.fill(); ctx.stroke();
    ctx.fillStyle = BP.navy; ctx.font = 'bold 13px Pretendard, sans-serif';
    ctx.fillText('일반 고객 정상 이용', 14, 196);
    ctx.fillStyle = BP.sub; ctx.font = '11.5px Pretendard, sans-serif';
    ctx.fillText('로그인 · 상품 검색 · 결제 500건', 14, 222);

    // Center Patched Service Module
    ctx.fillStyle = BP.panel; ctx.strokeStyle = BP.green; ctx.lineWidth = 2.4;
    rRect(ctx, 222, 24, 156, 250, 10); ctx.fill(); ctx.stroke();
    drawPill(ctx, 238, 40, '보안 패치 적용 서버', BP.greenBg, BP.green);
    ctx.fillStyle = BP.soft; rRect(ctx, 236, 80, 128, 72, 6); ctx.fill();
    ctx.fillStyle = BP.text; ctx.font = 'bold 11.5px Pretendard, sans-serif';
    ctx.fillText('파라미터 바인딩 검증', 246, 108);
    ctx.fillStyle = BP.green; ctx.fillText('→ 공격 구문 무력화', 246, 132);

    ctx.fillStyle = BP.soft; rRect(ctx, 236, 170, 128, 78, 6); ctx.fill();
    ctx.fillStyle = BP.text;
    ctx.fillText('비즈니스 로직 유지', 246, 198);
    ctx.fillStyle = BP.navy; ctx.fillText('→ 기존 API 100% 호환', 246, 222);

    // Animated packets
    const atkX = 186 + Math.min(1, p * 1.6) * 32;
    ctx.fillStyle = BP.red; ctx.beginPath(); ctx.arc(atkX, 80, 7, 0, Math.PI * 2); ctx.fill();

    const usrX = 186 + p * 224;
    ctx.fillStyle = BP.blue; ctx.beginPath(); ctx.arc(usrX, 214, 7, 0, Math.PI * 2); ctx.fill();

    // Right Outcomes
    ctx.fillStyle = BP.greenBg; ctx.strokeStyle = BP.green; ctx.lineWidth = 1.6;
    rRect(ctx, 414, 34, 186, 92, 8); ctx.fill(); ctx.stroke();
    ctx.fillStyle = BP.green; ctx.font = 'bold 13.5px Pretendard, sans-serif';
    ctx.fillText('✓ 해킹 공격 100% 차단', 428, 70);
    ctx.fillStyle = BP.sub; ctx.font = '12px Pretendard, sans-serif';
    ctx.fillText('DB 변조 · 유출 0건', 428, 98);

    ctx.fillStyle = BP.greenBg; ctx.strokeStyle = BP.green; ctx.lineWidth = 1.6;
    rRect(ctx, 414, 166, 186, 96, 8); ctx.fill(); ctx.stroke();
    ctx.fillStyle = BP.green; ctx.font = 'bold 13.5px Pretendard, sans-serif';
    ctx.fillText('✓ 정상 기능 500/500 통과', 428, 202);
    ctx.fillStyle = BP.sub; ctx.font = '12px Pretendard, sans-serif';
    ctx.fillText('고객 서비스 중단 · 장애 0건', 428, 230);
  }
}

function drawActiveBenchLoop(now) {
  if (activeBenchSlideId !== null) {
    const wrap = document.getElementById(`benchWrap_${activeBenchSlideId}`);
    const c = document.getElementById(`benchCanvas_${activeBenchSlideId}`);
    if (wrap && c) {
      const dpr = window.devicePixelRatio || 1;
      const W = wrap.clientWidth, H = wrap.clientHeight;
      if (W > 20 && H > 20) {
        const targetW = Math.round(W * dpr);
        const targetH = Math.round(H * dpr);
        const elapsed = Math.max(0, (now - benchAnimStart) / 1000);
        const p = Math.min(1, elapsed / 3.8);
        const stateKey = `${activeBenchSlideId}:${targetW}:${targetH}`;

        if (p >= 1 && benchSettledKey === stateKey) {
          requestAnimationFrame(drawActiveBenchLoop);
          return;
        }
        if (p >= 1) {
          benchSettledKey = stateKey;
        }

        if (c.width !== targetW || c.height !== targetH) {
          c.width = targetW;
          c.height = targetH;
        }
        const ctx = c.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        ctx.fillStyle = BP.soft;
        ctx.fillRect(0, 0, W, H);

        const meta = BENCH_STAGE_META[activeBenchSlideId];

        // Uniform 1:1 Artboard Scaling (640 x 380) — Crisp & Zero Distortion
        const uScale = Math.min((W - 20) / 640, (H - 16) / 380);
        const ox = (W - 640 * uScale) / 2;
        const oy = (H - 380 * uScale) / 2;

        ctx.save();
        ctx.translate(ox, oy);
        ctx.scale(uScale, uScale);

        // Top Stage Header inside 640x380 Artboard
        ctx.fillStyle = BP.panel;
        ctx.strokeStyle = BP.border;
        ctx.lineWidth = 1.2;
        rRect(ctx, 0, 0, 640, 380, 8);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = BP.blueBg;
        rRect(ctx, 0, 0, 640, 44, 8);
        ctx.fill();
        ctx.fillRect(0, 36, 640, 8);
        ctx.fillStyle = BP.navy;
        ctx.font = 'bold 13.5px Pretendard, sans-serif';
        ctx.fillText(meta.sim_title, 18, 27);

        const stepTxt = p < 0.28 ? '1단계: 과제 입력 확인' : (p < 0.76 ? '2단계: 핵심 추론 · 수행 중' : '3단계: 과제 완수 완료 ✓');
        drawPill(ctx, 446, 11, stepTxt, p >= 0.76 ? BP.greenBg : '#FFFFFF', p >= 0.76 ? BP.green : BP.navy, 'bold 11.5px Pretendard, sans-serif');

        ctx.save();
        ctx.translate(20, 58);
        drawTaskScene(ctx, activeBenchSlideId, p);
        ctx.restore();

        ctx.restore();
      }
    }
  }
  requestAnimationFrame(drawActiveBenchLoop);
}


/* ============================================================================
   Slide 04: Output Token Scale (6.4만 한계 절단 vs Carbon 100만 완주) Live Animation
   ============================================================================ */
let tokAnimId = null;
let tokCycleTimer = null;

function playTokenComparison() {
  if (tokAnimId) cancelAnimationFrame(tokAnimId);
  if (tokCycleTimer) clearTimeout(tokCycleTimer);
  const fill1M = document.getElementById('mmFill1M');
  const stub64 = document.getElementById('mmStub64');
  const lbl64 = document.getElementById('mmLabel64');
  const modCount1M = document.getElementById('outModCount1M');
  const cells1M = document.querySelectorAll('#outModGrid1M .out-mod-cell');
  const cells64 = document.querySelectorAll('#outModGrid64 .out-mod-cell');
  if (!fill1M || !stub64) return;

  const start = performance.now();
  const dur = 2600;

  function tick(now) {
    const slideEl = document.getElementById('slideTokenCompare');
    if (!slideEl || !slideEl.classList.contains('active')) return;
    const t = Math.min(1, (now - start) / dur);
    const ease = 1 - Math.pow(1 - t, 2.6);
    const curK = Math.round(ease * 100);
    const stubPct = Math.min(6.4, ease * 100);
    stub64.style.width = `${Math.max(1.2, stubPct)}%`;
    fill1M.style.width = `${Math.max(14, ease * 100)}%`;

    const doneMods = Math.min(16, Math.max(1, Math.ceil(ease * 16)));
    cells1M.forEach((cell, idx) => {
      cell.classList.toggle('pending', idx >= doneMods);
      cell.classList.toggle('active-writing', t < 1 && idx === doneMods - 1);
    });
    if (cells64.length >= 2) {
      cells64[0].classList.toggle('pending', curK < 3);
      cells64[1].classList.toggle('pending', curK < 6);
    }

    if (t < 1) {
      fill1M.textContent = `${curK}만 Output Token 연속 작성 중...`;
      if (lbl64) {
        lbl64.textContent = curK >= 6
          ? '약 6.4만 Output 한계 벽 (전체의 6.4% 지점에서 절단)'
          : `${curK}만 Output 작성 중...`;
      }
      if (modCount1M) {
        modCount1M.textContent = `(${doneMods} / 16개 모듈 연속 작성 중...)`;
      }
      tokAnimId = requestAnimationFrame(tick);
    } else {
      fill1M.style.width = '100%';
      fill1M.textContent = '최대 100만 Output Token 연속 생성 (기존 대비 약 16배)';
      if (lbl64) lbl64.textContent = '약 6.4만 Output 한계 벽 (전체의 6.4% 지점에서 절단)';
      if (modCount1M) modCount1M.textContent = '(16 / 16개 전 모듈 끊김 없이 100% 완성)';
      cells1M.forEach(cell => cell.classList.remove('pending', 'active-writing'));
      tokCycleTimer = setTimeout(() => {
        if (document.getElementById('slideTokenCompare')?.classList.contains('active')) {
          playTokenComparison();
        }
      }, 5400);
    }
  }
  tokAnimId = requestAnimationFrame(tick);
}

/* ============================================================================
   Slide 06: Vertical Bar Chart Entrance Animation
   ============================================================================ */
function animateBenchmarks() {
  const tbl = document.querySelector('#slideBenchOverview .gblog-table');
  if (tbl) {
    tbl.classList.add('entering');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        tbl.classList.remove('entering');
      });
    });
  }
}

/* ============================================================================
   Slide 23: Side-by-Side 3D Modeling & Cost Comparison
   ============================================================================ */
let currentCost3DMode = 'astra_bh';

const COST_3D_MODES = {
  astra_bh: {
    leftUrl: 'sims/astra6.html',
    rightUrl: 'sims/09_blackhole_tde.html',
    leftBadge: 'OpenAI GPT-6 Astra',
    leftCost: '단가 $10 / $50 (5배)',
    leftModalTitle: 'OpenAI GPT-6 Astra — 3D 블랙홀 중력 렌즈 ($10/$50)',
    rightModalTitle: 'Gemini 4.0 Carbon — 3D 블랙홀 중력 렌즈 ($2/$10 · 1/5 비용)'
  },
  blackhole: {
    leftUrl: 'sims/opus55.html',
    rightUrl: 'sims/09_blackhole_tde.html',
    leftBadge: 'Claude Opus 5.5',
    leftCost: '단가 $4 / $20 (2배)',
    leftModalTitle: 'Claude Opus 5.5 — 3D 블랙홀 중력 렌즈 ($4/$20)',
    rightModalTitle: 'Gemini 4.0 Carbon — 3D 블랙홀 중력 렌즈 ($2/$10 · 1/2 비용)'
  },
  pendulum: {
    leftUrl: 'sims/pendulum_opus55.html',
    rightUrl: 'sims/08_chaos_pendulum.html',
    leftBadge: 'Claude Opus 5.5',
    leftCost: '단가 $4 / $20 (2배)',
    leftModalTitle: 'Claude Opus 5.5 — 3D 자석 카오스 진자 ($4/$20)',
    rightModalTitle: 'Gemini 4.0 Carbon — 3D 자석 카오스 진자 ($2/$10 · 1/2 비용)'
  }
};

function mountCost3DCompare() {
  const cfg = COST_3D_MODES[currentCost3DMode] || COST_3D_MODES.astra_bh;
  const leftMount = document.getElementById('cost3dMountLeft');
  const rightMount = document.getElementById('cost3dMountRight');
  if (leftMount && !leftMount.querySelector('iframe')) {
    leftMount.innerHTML = `<iframe src="${resolveSimSrc(cfg.leftUrl)}" tabindex="-1" allow="fullscreen; autoplay"></iframe>`;
  }
  if (rightMount && !rightMount.querySelector('iframe')) {
    rightMount.innerHTML = `<iframe src="${resolveSimSrc(cfg.rightUrl)}" tabindex="-1" allow="fullscreen; autoplay"></iframe>`;
  }
}

function unmountCost3DCompare() {
  const leftMount = document.getElementById('cost3dMountLeft');
  const rightMount = document.getElementById('cost3dMountRight');
  if (leftMount) leftMount.innerHTML = '';
  if (rightMount) rightMount.innerHTML = '';
}

function switchCost3DCompare(mode) {
  currentCost3DMode = COST_3D_MODES[mode] ? mode : 'astra_bh';
  const cfg = COST_3D_MODES[currentCost3DMode];
  document.getElementById('cost3dBtnAstra')?.classList.toggle('active', currentCost3DMode === 'astra_bh');
  document.getElementById('cost3dBtnBlackhole')?.classList.toggle('active', currentCost3DMode === 'blackhole');
  document.getElementById('cost3dBtnPendulum')?.classList.toggle('active', currentCost3DMode === 'pendulum');

  const lBadge = document.getElementById('cost3dLeftBadge');
  const lCost = document.getElementById('cost3dLeftCost');
  if (lBadge) lBadge.textContent = cfg.leftBadge;
  if (lCost) lCost.textContent = cfg.leftCost;

  unmountCost3DCompare();
  setTimeout(() => mountCost3DCompare(), 40);
}

function reloadCost3DCompare() {
  unmountCost3DCompare();
  setTimeout(() => mountCost3DCompare(), 50);
}

function openCost3DModal(side) {
  const cfg = COST_3D_MODES[currentCost3DMode] || COST_3D_MODES.astra_bh;
  openSimModal(side === 'left' ? cfg.leftUrl : cfg.rightUrl, side === 'left' ? cfg.leftModalTitle : cfg.rightModalTitle);
}

/* ============================================================================
   Slide 26: Tokenomics 3-LLM Mix Presets
   ============================================================================ */
const LLM_SCENARIOS = [
  {
    badge: '대용량 문서 · 로그 분석 (Gemini 주력)',
    badgeCls: 'gemini',
    lead: 'gemini',
    taskTag: '문서 800p 유입',
    g: 55, c: 25, o: 20,
    gH: '100만 토큰 대량 취합 · 초안 생성',
    cH: '핵심 요약본 문장 다듬기',
    oH: '리스크 항목 교차 점검'
  },
  {
    badge: 'PC 화면 업무 · 문서 실무 (Claude 주력)',
    badgeCls: 'claude',
    lead: 'claude',
    taskTag: 'PC 업무 · 문서',
    g: 25, c: 55, o: 20,
    gH: '사내 레퍼런스 검색 · 구조화',
    cH: 'PC 화면 조작 · 문서 작업 자동화',
    oH: '엣지 케이스 로직 리뷰'
  },
  {
    badge: '대규모 코드 리팩터링 (OpenAI 주력)',
    badgeCls: 'openai',
    lead: 'openai',
    taskTag: '코드 리팩터링',
    g: 25, c: 20, o: 55,
    gH: '저장소 전체 맥락 분석',
    cH: '변경 내역 리포트 문서화',
    oH: '대규모 코드 수정 · 회귀 검증'
  },
  {
    badge: '전사 자율 에이전트 (3대 모델 균형 협동)',
    badgeCls: 'balanced',
    lead: 'all',
    taskTag: '복합 파이프라인',
    g: 34, c: 33, o: 33,
    gH: '1단계: 대규모 사내 자료 수집',
    cH: '2단계: 보고서 · 실행 코드 작성',
    oH: '3단계: 최종 의사결정 교차 검증'
  }
];

let llmActiveIdx = 0;
let llmAutoCycle = true;
let llmScenarioStart = performance.now();
let llmAnimReq = null;
let llmCur = { g: 55, c: 25, o: 20 };
let llmParticles = [];
let llmLastSpawn = 0;
const LLM_CYCLE_MS = 3200;

function applyLlmScenarioMeta(idx) {
  const s = LLM_SCENARIOS[idx] || LLM_SCENARIOS[0];
  for (let i = 0; i < 4; i++) {
    document.getElementById(`mgBtn${i}`)?.classList.toggle('active', i === idx);
  }
  const badge = document.getElementById('mgScenarioBadge');
  if (badge) {
    badge.textContent = s.badge;
    badge.className = `mm-dyn-badge ${s.badgeCls}`;
  }
  const cycleFill = document.getElementById('mgCycleFill');
  if (cycleFill) {
    cycleFill.style.background =
      s.lead === 'claude' ? '#D97757' :
      s.lead === 'openai' ? '#10A37F' :
      s.lead === 'all' ? '#111827' : '#1A73E8';
  }

  document.getElementById('mgChipG')?.classList.toggle('on', s.lead === 'gemini' || s.lead === 'all');
  document.getElementById('mgChipC')?.classList.toggle('on', s.lead === 'claude' || s.lead === 'all');
  document.getElementById('mgChipO')?.classList.toggle('on', s.lead === 'openai' || s.lead === 'all');

  const rG = document.getElementById('mgRowGemini');
  const rC = document.getElementById('mgRowClaude');
  const rO = document.getElementById('mgRowOpenAI');
  if (rG) rG.classList.toggle('lead-gemini', s.lead === 'gemini' || s.lead === 'all');
  if (rC) rC.classList.toggle('lead-claude', s.lead === 'claude' || s.lead === 'all');
  if (rO) rO.classList.toggle('lead-openai', s.lead === 'openai' || s.lead === 'all');

  const hG = document.getElementById('mgHeadGemini');
  const hC = document.getElementById('mgHeadClaude');
  const hO = document.getElementById('mgHeadOpenAI');
  if (hG) hG.textContent = s.gH;
  if (hC) hC.textContent = s.cH;
  if (hO) hO.textContent = s.oH;
}

function selectLlmScenario(idx, manualClick = false) {
  llmActiveIdx = idx % LLM_SCENARIOS.length;
  llmScenarioStart = performance.now();
  applyLlmScenarioMeta(llmActiveIdx);
  if (manualClick && !llmAnimReq) {
    startLlmDynamicLoop();
  }
}

function setLlmMixPreset(idx) {
  selectLlmScenario(idx, true);
}

function toggleLlmAutoCycle() {
  llmAutoCycle = !llmAutoCycle;
  llmScenarioStart = performance.now();
  const btn = document.getElementById('mgAutoBtn');
  if (btn) {
    btn.textContent = llmAutoCycle ? '⏸ 자동 전환' : '▶ 자동 전환 켜기';
    btn.classList.toggle('primary', llmAutoCycle);
  }
}

function drawRouterCanvas(now, gVal, cVal, oVal) {
  const cvs = document.getElementById('mgRouterCanvas');
  if (!cvs) return;
  const rect = cvs.parentElement.getBoundingClientRect();
  if (rect.width < 20 || rect.height < 20) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = Math.round(rect.width);
  const h = Math.round(rect.height);
  if (cvs.width !== w * dpr || cvs.height !== h * dpr) {
    cvs.width = w * dpr;
    cvs.height = h * dpr;
  }
  const ctx = cvs.getContext('2d');
  ctx.save();
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);

  const srcX = 88;
  const srcY = h * 0.5;
  const midX = w * 0.44;
  const midY = h * 0.5;
  const dstX = w - 118;
  const lanes = [
    { key: 'g', y: h * 0.22, pct: gVal, color: '#1A73E8', bg: '#E8F0FE', label: 'Gemini' },
    { key: 'c', y: h * 0.50, pct: cVal, color: '#D97757', bg: '#FFF1E8', label: 'Claude' },
    { key: 'o', y: h * 0.78, pct: oVal, color: '#10A37F', bg: '#E6F9F3', label: 'OpenAI' }
  ];

  // Input trunk line
  ctx.strokeStyle = '#94A3B8';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(srcX + 38, srcY);
  ctx.lineTo(midX - 42, midY);
  ctx.stroke();

  // 3 dynamic branch curves whose stroke width reflects live share!
  lanes.forEach(ln => {
    const lw = 1.6 + (ln.pct / 100) * 8.5;
    ctx.strokeStyle = ln.color;
    ctx.globalAlpha = 0.22 + (ln.pct / 100) * 0.55;
    ctx.lineWidth = lw;
    ctx.beginPath();
    ctx.moveTo(midX + 42, midY);
    ctx.bezierCurveTo(midX + 95, midY, dstX - 95, ln.y, dstX - 42, ln.y);
    ctx.stroke();
  });
  ctx.globalAlpha = 1;

  // Spawn live streaming request particles proportional to gVal : cVal : oVal
  if (now - llmLastSpawn > 95) {
    llmLastSpawn = now;
    const r = Math.random() * 100;
    const targetLane = r < gVal ? 0 : (r < gVal + cVal ? 1 : 2);
    llmParticles.push({ t: 0, lane: targetLane, speed: 0.018 + Math.random() * 0.008 });
    if (llmParticles.length > 42) llmParticles.shift();
  }

  llmParticles.forEach(pt => {
    pt.t += pt.speed;
    if (pt.t <= 0.36) {
      const u = pt.t / 0.36;
      const px = (srcX + 38) + ((midX - 42) - (srcX + 38)) * u;
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.arc(px, srcY, 3.6, 0, Math.PI * 2);
      ctx.fill();
    } else if (pt.t <= 1) {
      const u = (pt.t - 0.36) / 0.64;
      const ln = lanes[pt.lane];
      const p0x = midX + 42, p0y = midY;
      const p1x = midX + 95, p1y = midY;
      const p2x = dstX - 95, p2y = ln.y;
      const p3x = dstX - 42, p3y = ln.y;
      const iu = 1 - u;
      const bx = iu*iu*iu*p0x + 3*iu*iu*u*p1x + 3*iu*u*u*p2x + u*u*u*p3x;
      const by = iu*iu*iu*p0y + 3*iu*iu*u*p1y + 3*iu*u*u*p2y + u*u*u*p3y;
      ctx.fillStyle = ln.color;
      ctx.beginPath();
      ctx.arc(bx, by, 4.2, 0, Math.PI * 2);
      ctx.fill();
    }
  });
  llmParticles = llmParticles.filter(pt => pt.t < 1);

  const fontFam = 'Pretendard, sans-serif';
  // Left Source Pill
  const s = LLM_SCENARIOS[llmActiveIdx] || LLM_SCENARIOS[0];
  ctx.fillStyle = '#F1F5F9';
  ctx.strokeStyle = '#CBD5E1';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(14, srcY - 22, 112, 44, 8);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#0F172A';
  ctx.font = `800 12px ${fontFam}`;
  ctx.textAlign = 'center';
  ctx.fillText(s.taskTag, 70, srcY + 4);

  // Center Router Hub
  ctx.fillStyle = '#111827';
  ctx.beginPath();
  ctx.roundRect(midX - 46, midY - 22, 92, 44, 10);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `800 12px ${fontFam}`;
  ctx.fillText('동적 라우터', midX, midY + 4);

  // Right 3 Destination Pills
  lanes.forEach(ln => {
    const pctRound = Math.round(ln.pct);
    ctx.fillStyle = ln.bg;
    ctx.strokeStyle = ln.color;
    ctx.lineWidth = pctRound >= 32 ? 1.8 : 1;
    ctx.beginPath();
    ctx.roundRect(dstX - 40, ln.y - 15, 144, 30, 999);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#111827';
    ctx.font = `800 12.5px ${fontFam}`;
    ctx.textAlign = 'left';
    ctx.fillText(ln.label, dstX - 26, ln.y + 4.5);

    ctx.fillStyle = ln.color;
    ctx.textAlign = 'right';
    ctx.fillText(`${pctRound}%`, dstX + 90, ln.y + 4.5);
  });

  ctx.restore();
}

function tickLlmDynamic(now) {
  const slideEl = document.getElementById('slideModelGarden');
  if (!slideEl || !slideEl.classList.contains('active')) {
    llmAnimReq = null;
    return;
  }

  const elapsed = now - llmScenarioStart;
  const cycleFill = document.getElementById('mgCycleFill');
  if (llmAutoCycle) {
    const prog = Math.min(100, (elapsed / LLM_CYCLE_MS) * 100);
    if (cycleFill) cycleFill.style.width = `${prog}%`;
    if (elapsed >= LLM_CYCLE_MS) {
      llmActiveIdx = (llmActiveIdx + 1) % LLM_SCENARIOS.length;
      llmScenarioStart = now;
      applyLlmScenarioMeta(llmActiveIdx);
    }
  } else if (cycleFill) {
    cycleFill.style.width = '100%';
  }

  const target = LLM_SCENARIOS[llmActiveIdx] || LLM_SCENARIOS[0];
  // Subtle real-time telemetry breathing (+-1.4%) while smoothly interpolating between scenarios
  const wave = Math.sin(now * 0.0042) * 1.4;
  const tgtG = target.g + wave;
  const tgtC = target.c - wave * 0.6;
  const tgtO = 100 - tgtG - tgtC;

  llmCur.g += (tgtG - llmCur.g) * 0.11;
  llmCur.c += (tgtC - llmCur.c) * 0.11;
  llmCur.o = 100 - llmCur.g - llmCur.c;

  const rG = Math.round(llmCur.g);
  const rC = Math.round(llmCur.c);
  const rO = 100 - rG - rC;

  const barG = document.getElementById('mgBarGemini');
  const barC = document.getElementById('mgBarClaude');
  const barO = document.getElementById('mgBarOpenAI');
  if (barG) { barG.style.width = `${llmCur.g.toFixed(1)}%`; barG.textContent = `${rG}%`; }
  if (barC) { barC.style.width = `${llmCur.c.toFixed(1)}%`; barC.textContent = `${rC}%`; }
  if (barO) { barO.style.width = `${llmCur.o.toFixed(1)}%`; barO.textContent = `${rO}%`; }

  const pctG = document.getElementById('mgPctGemini');
  const pctC = document.getElementById('mgPctClaude');
  const pctO = document.getElementById('mgPctOpenAI');
  if (pctG) pctG.textContent = `${rG}%`;
  if (pctC) pctC.textContent = `${rC}%`;
  if (pctO) pctO.textContent = `${rO}%`;

  const bigG = document.getElementById('mgBigG');
  const bigC = document.getElementById('mgBigC');
  const bigO = document.getElementById('mgBigO');
  if (bigG) bigG.textContent = `${rG}%`;
  if (bigC) bigC.textContent = `${rC}%`;
  if (bigO) bigO.textContent = `${rO}%`;

  const subG = document.getElementById('mgSubGemini');
  const subC = document.getElementById('mgSubClaude');
  const subO = document.getElementById('mgSubOpenAI');
  if (subG) subG.style.width = `${llmCur.g.toFixed(1)}%`;
  if (subC) subC.style.width = `${llmCur.c.toFixed(1)}%`;
  if (subO) subO.style.width = `${llmCur.o.toFixed(1)}%`;

  drawRouterCanvas(now, llmCur.g, llmCur.c, llmCur.o);
  llmAnimReq = requestAnimationFrame(tickLlmDynamic);
}

function startLlmDynamicLoop() {
  llmScenarioStart = performance.now();
  applyLlmScenarioMeta(llmActiveIdx);
  if (!llmAnimReq) {
    llmAnimReq = requestAnimationFrame(tickLlmDynamic);
  }
}

function stopLlmDynamicLoop() {
  if (llmAnimReq) {
    cancelAnimationFrame(llmAnimReq);
    llmAnimReq = null;
  }
}

const GOV_SLOTS = [
  { id: 'Gemini', cls: 'active-gemini', color: '#1A73E8', bg: '#E8F0FE', purpose: '개발팀 A 자율 선택  ·  Gemini 4.0 호출', roleTag: '● 자율 선택 가동', idleTag: '대용량 · 멀티모달', code: '단일 거버넌스 통과 → gemini-4.0-carbon', label: 'Gemini 4.0 Carbon' },
  { id: 'Claude', cls: 'active-claude', color: '#D97757', bg: '#FFF1E8', purpose: '개발팀 B 자율 선택  ·  Claude 5.5 호출', roleTag: '● 자율 선택 가동', idleTag: 'PC 조작 · 감도·직관성', code: '단일 거버넌스 통과 → claude-opus-5.5', label: 'Claude Opus 5.5' },
  { id: 'OpenAI', cls: 'active-openai', color: '#10A37F', bg: '#E6F9F3', purpose: '개발팀 C 자율 선택  ·  OpenAI GPT-6 호출', roleTag: '● 자율 선택 가동', idleTag: '코딩 · 장기 운영', code: '단일 거버넌스 통과 → gpt-6-astra', label: 'OpenAI GPT-6 Astra' }
];

let govActiveIdx = 0;
let govSwitchTime = performance.now();
let govAnimReq = null;
let govArmX = 0.166;
let govPackets = [];
let govLastPkt = 0;
const GOV_CYCLE_MS = 2800;

function applyGovSlotUI(idx) {
  GOV_SLOTS.forEach((sl, i) => {
    const el = document.getElementById(`govRow${sl.id}`);
    const badge = document.getElementById(`govBadge${sl.id}`);
    if (el) {
      el.classList.remove('active-gemini', 'active-claude', 'active-openai');
      if (i === idx) el.classList.add(sl.cls);
    }
    if (badge) {
      badge.textContent = i === idx ? sl.roleTag : sl.idleTag;
    }
  });
}

function selectGovModel(keyOrIdx) {
  if (typeof keyOrIdx === 'string') {
    govActiveIdx = keyOrIdx === 'claude' ? 1 : (keyOrIdx === 'openai' ? 2 : 0);
  } else {
    govActiveIdx = keyOrIdx % 3;
  }
  govSwitchTime = performance.now();
  applyGovSlotUI(govActiveIdx);
  if (!govAnimReq) startGovAutoLoop();
}

function drawGovSwapCanvas(now) {
  const cvs = document.getElementById('govSwapCanvas');
  if (!cvs) return;
  const rect = cvs.parentElement.getBoundingClientRect();
  if (rect.width < 20 || rect.height < 20) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = Math.round(rect.width);
  const h = Math.round(rect.height);
  if (cvs.width !== w * dpr || cvs.height !== h * dpr) {
    cvs.width = w * dpr;
    cvs.height = h * dpr;
  }
  const ctx = cvs.getContext('2d');
  ctx.save();
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);

  const slotXs = [w * 0.166, w * 0.5, w * 0.834];
  const targetX = slotXs[govActiveIdx];
  govArmX += (targetX - govArmX) * 0.16;

  const topY = 26;
  const hubY = h * 0.52;
  const botY = h - 8;
  const curSlot = GOV_SLOTS[govActiveIdx];
  const fontFam = 'Pretendard, sans-serif';

  // Inactive dashed guide lines to all 3 slots
  slotXs.forEach((sx) => {
    ctx.save();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(w * 0.5, hubY + 18);
    ctx.bezierCurveTo(w * 0.5, hubY + 42, sx, botY - 26, sx, botY);
    ctx.stroke();
    ctx.restore();
  });

  // Top trunk from App to Single Security Gate
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(w * 0.5, topY + 10);
  ctx.lineTo(w * 0.5, hubY - 18);
  ctx.stroke();

  // Active live connector arm swinging smoothly to active model!
  ctx.strokeStyle = curSlot.color;
  ctx.lineWidth = 4.5;
  ctx.beginPath();
  ctx.moveTo(w * 0.5, hubY + 18);
  ctx.bezierCurveTo(w * 0.5, hubY + 44, govArmX, botY - 28, govArmX, botY);
  ctx.stroke();

  // Continuous uninterrupted packets (proving 0.0s downtime during model swap!)
  if (now - govLastPkt > 160) {
    govLastPkt = now;
    govPackets.push({ t: 0, speed: 0.024 });
    if (govPackets.length > 24) govPackets.shift();
  }
  govPackets.forEach(p => {
    p.t += p.speed;
    if (p.t < 0.35) {
      const u = p.t / 0.35;
      const py = (topY + 10) + ((hubY - 18) - (topY + 10)) * u;
      ctx.fillStyle = '#0F172A';
      ctx.beginPath();
      ctx.arc(w * 0.5, py, 3.8, 0, Math.PI * 2);
      ctx.fill();
    } else if (p.t <= 1) {
      const u = (p.t - 0.35) / 0.65;
      const p0x = w * 0.5, p0y = hubY + 18;
      const p1x = w * 0.5, p1y = hubY + 44;
      const p2x = govArmX, p2y = botY - 28;
      const p3x = govArmX, p3y = botY;
      const iu = 1 - u;
      const bx = iu*iu*iu*p0x + 3*iu*iu*u*p1x + 3*iu*u*u*p2x + u*u*u*p3x;
      const by = iu*iu*iu*p0y + 3*iu*iu*u*p1y + 3*iu*u*u*p2y + u*u*u*p3y;
      ctx.fillStyle = curSlot.color;
      ctx.beginPath();
      ctx.arc(bx, by, 4.4, 0, Math.PI * 2);
      ctx.fill();
    }
  });
  govPackets = govPackets.filter(p => p.t < 1);

  // Top Purpose Node (Dynamically changing by developer team's autonomous model choice!)
  ctx.fillStyle = curSlot.bg;
  ctx.strokeStyle = curSlot.color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(w * 0.5 - 162, 6, 324, 30, 999);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#0F172A';
  ctx.font = `800 12.5px ${fontFam}`;
  ctx.textAlign = 'center';
  ctx.fillText(curSlot.purpose, w * 0.5, 25);

  // Center Single Platform Governance Gate Hub
  ctx.fillStyle = '#111827';
  ctx.beginPath();
  ctx.roundRect(w * 0.5 - 168, hubY - 19, 336, 38, 9);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = `800 12.5px ${fontFam}`;
  ctx.fillText(curSlot.code, w * 0.5, hubY + 4.5);

  // Active target plug indicator dot at bottom
  ctx.fillStyle = curSlot.color;
  ctx.beginPath();
  ctx.arc(govArmX, botY - 3, 5.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function tickGovAuto(now) {
  const slideEl = document.getElementById('slideAgentGovPlatform');
  if (!slideEl || !slideEl.classList.contains('active')) {
    govAnimReq = null;
    return;
  }
  if (now - govSwitchTime >= GOV_CYCLE_MS) {
    govActiveIdx = (govActiveIdx + 1) % 3;
    govSwitchTime = now;
    applyGovSlotUI(govActiveIdx);
  }
  drawGovSwapCanvas(now);
  govAnimReq = requestAnimationFrame(tickGovAuto);
}

function startGovAutoLoop() {
  govSwitchTime = performance.now();
  govArmX = [0.166, 0.5, 0.834][govActiveIdx] * (document.getElementById('govSwapCanvas')?.parentElement?.clientWidth || 540);
  applyGovSlotUI(govActiveIdx);
  if (!govAnimReq) {
    govAnimReq = requestAnimationFrame(tickGovAuto);
  }
}

function stopGovAutoLoop() {
  if (govAnimReq) {
    cancelAnimationFrame(govAnimReq);
    govAnimReq = null;
  }
}
