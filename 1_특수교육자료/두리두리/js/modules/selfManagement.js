/* ==========================================================================
   두리두리 (Duri-Duri) - Self Management Modules (일상생활 자기관리)
   Sub-modules:
   1. 위생 관리 (손씻기 6단계: 실습 / 퀴즈 / 6칸 슬롯 퍼즐 3모드)
   2. 위생 관리 (머리감기 6단계: 실습 / 퀴즈 / 6칸 슬롯 퍼즐 3모드)
   3. 위생 관리 (목욕하기 6단계: 실습 / 퀴즈 / 6칸 슬롯 퍼즐 3모드)
   4. 계절별 옷입기 (여름옷 5단계 / 겨울옷 6단계 / 봄가을옷 5단계)
   5. 세탁 분류 (1모드: 세탁기 / 손세탁 / 세탁소 드라이, 2모드: 흰 옷 & 색깔 옷)
   6. 기초 금융 (1모드: 물건 값 결제 15문제, 2모드: 거스름돈/잔돈 받기 15문제)
   7. 시간 계산 (3단계 30문제: L1=시/분 읽기 가감, L2=시간 덧셈·뺄셈, L3=실생활 경과시간) [NEW]

   * 모든 단계 명칭: 일단계, 이단계, 삼단계, 사단계, 오단계, 육단계 한글 표준 적용!
   ========================================================================== */

class SelfManagementManager {
  constructor() {
    this.currentSubIndex = 0;
    this.subModules = ['hygiene', 'hairwash', 'bodywash', 'dressup', 'laundry', 'finance', 'timecalc'];
    this.equippedClothes = new Set();
    this.paidMoney = 0;

    /* 한글 단계 명칭 매핑 (일단계~십단계) */
    this.krStepNames = ['', '일단계', '이단계', '삼단계', '사단계', '오단계', '육단계', '칠단계', '팔단계', '구단계', '십단계'];

    /* --------------------------------------------------------------------------
       1. 올바른 손씻기 6단계 데이터 (질병관리청 표준)
       -------------------------------------------------------------------------- */
    this.handwash6Steps = [
      {
        step: 1,
        title: "일단계: 손바닥 마주대기 🖐️🖐️",
        cleanTitle: "손바닥 마주대기 🖐️🖐️",
        shortTitle: "손바닥",
        emoji: "🖐️🖐️",
        desc: "손바닥과 손바닥을 마주 대고 쓱싹쓱싹 문질러요!",
        audio: "일단계! 손바닥과 손바닥을 마주 대고 쓱싹쓱싹 문질러요!"
      },
      {
        step: 2,
        title: "이단계: 손등과 손바닥 마주대기 🖐️🤚",
        cleanTitle: "손등 마주대기 🖐️🤚",
        shortTitle: "손등",
        emoji: "🖐️🤚",
        desc: "손등과 손바닥을 마주 대고 구석구석 문질러요!",
        audio: "이단계! 손등과 손바닥을 마주 대고 쓱싹쓱싹 문질러요!"
      },
      {
        step: 3,
        title: "삼단계: 손가락 깍지 끼기 🤝",
        cleanTitle: "손가락 깍지 끼기 🤝",
        shortTitle: "깍지끼기",
        emoji: "🤝",
        desc: "손가락 사이사이에 깍지를 끼고 문질러요!",
        audio: "삼단계! 손가락 사이에 깍지를 끼고 사이사이를 문질러요!"
      },
      {
        step: 4,
        title: "사단계: 손가락 모아 쥐기 ✊",
        cleanTitle: "손가락 모아 쥐기 ✊",
        shortTitle: "손가락모으기",
        emoji: "✊",
        desc: "두 손을 모아 손가락을 쥐고 문질러요!",
        audio: "사단계! 두 손을 모아 손가락을 마주 쥐고 문질러요!"
      },
      {
        step: 5,
        title: "오단계: 엄지손가락 돌려 씻기 👍",
        cleanTitle: "엄지손가락 돌려 씻기 👍",
        shortTitle: "엄지손가락",
        emoji: "👍",
        desc: "엄지손가락을 다른 편 손바닥으로 감싸서 돌려 씻어요!",
        audio: "오단계! 엄지손가락을 반대쪽 손바닥으로 돌려주며 문질러요!"
      },
      {
        step: 6,
        title: "육단계: 손톱 밑 긁어 씻기 💅",
        cleanTitle: "손톱 밑 긁어 씻기 💅",
        shortTitle: "손톱밑",
        emoji: "💅",
        desc: "손톱 밑을 반대편 손바닥에 문질러 세균을 깨끗이 닦아요!",
        audio: "육단계! 손톱 밑을 반대쪽 손바닥에 문질러 세균을 깨끗이 닦아요!"
      }
    ];

    this.hygieneMode = 1;
    this.currentHygieneStep = 1;
    this.gameUserStep = 1;
    this.gameShuffledSteps = [];
    this.slotPlacedSteps = [null, null, null, null, null, null];
    this.currentTargetSlotIdx = 0;
    this.slotShuffledCards = [];

    /* --------------------------------------------------------------------------
       2. 올바른 머리감기 6단계 데이터 (질병관리청/위생 수칙 표준)
       -------------------------------------------------------------------------- */
    this.hairwash6Steps = [
      {
        step: 1,
        title: "일단계: 따뜻한 물로 머리 적시기 🚿💧",
        cleanTitle: "물로 머리 충분히 적시기 🚿💧",
        shortTitle: "물적시기",
        emoji: "🚿💧",
        desc: "미지근한 따뜻한 물로 머리카락과 두피를 촉촉하게 푹 적셔요!",
        audio: "일단계! 따뜻한 물로 머리카락과 두피를 충분히 적셔요!"
      },
      {
        step: 2,
        title: "이단계: 샴푸 거품 몽글몽글 내기 🧴🫧",
        cleanTitle: "샴푸로 보글보글 거품 내기 🧴🫧",
        shortTitle: "샴푸거품",
        emoji: "🧴🫧",
        desc: "손에 샴푸를 짜서 거품을 몽글몽글 풍성하게 내어 머리에 발라요!",
        audio: "이단계! 손에 샴푸를 적당히 짜서 풍성한 거품을 내요!"
      },
      {
        step: 3,
        title: "삼단계: 손가락 지문으로 두피 문지르기 💆‍♂️",
        cleanTitle: "손가락 지문으로 두피 문지르기 💆‍♂️",
        shortTitle: "두피문지르기",
        emoji: "💆‍♂️",
        desc: "손톱이 아닌 손가락 지문 부위로 두피를 구석구석 시원하게 문질러요!",
        audio: "삼단계! 손톱이 아닌 손가락 끝 지문 부위로 두피를 골고루 문질러요!"
      },
      {
        step: 4,
        title: "사단계: 물로 샴푸 거품 깨끗이 헹구기 🚿✨",
        cleanTitle: "물로 거품 깨끗이 헹구기 🚿✨",
        shortTitle: "거품헹구기",
        emoji: "🚿✨",
        desc: "깨끗한 물로 샴푸 거품이 남지 않도록 구석구석 깨끗이 헹궈요!",
        audio: "사단계! 샴푸 거품이 남지 않도록 따뜻한 물로 깨끗이 헹궈요!"
      },
      {
        step: 5,
        title: "오단계: 린스로 머릿결 부드럽게 하기 🧴🌸",
        cleanTitle: "린스로 머릿결 부드럽게 하기 🧴🌸",
        shortTitle: "린스하기",
        emoji: "🧴🌸",
        desc: "머리카락 끝부분에 린스를 바르고 살짝 헹궈 머릿결을 부드럽게 해요!",
        audio: "오단계! 머리카락 끝부분에 린스를 바르고 부드럽게 헹궈요!"
      },
      {
        step: 6,
        title: "육단계: 수건과 드라이어로 머리 말리기 🧺💨",
        cleanTitle: "수건과 드라이어로 뽀송하게 말리기 🧺💨",
        shortTitle: "머리말리기",
        emoji: "🧺💨",
        desc: "수건으로 톡톡 물기를 닦고 드라이어로 머리를 뽀송뽀송하게 말려요!",
        audio: "육단계! 수건으로 물기를 닦고 드라이어로 머리를 뽀송뽀송하게 말려요!"
      }
    ];

    this.hairwashMode = 1;
    this.currentHairwashStep = 1;
    this.hairGameUserStep = 1;
    this.hairGameShuffledSteps = [];
    this.hairSlotPlacedSteps = [null, null, null, null, null, null];
    this.hairCurrentTargetSlotIdx = 0;
    this.hairSlotShuffledCards = [];

    /* --------------------------------------------------------------------------
       3. 올바른 목욕하기 6단계 데이터 (위생 수칙 표준)
       -------------------------------------------------------------------------- */
    this.bodywash6Steps = [
      {
        step: 1,
        title: "일단계: 따뜻한 물로 온몸 적시기 🚿💧",
        cleanTitle: "따뜻한 물로 온몸 적시기 🚿💧",
        shortTitle: "온몸적시기",
        emoji: "🚿💧",
        desc: "샤워기로 미지근하고 따뜻한 물을 온몸에 골고루 충분히 적셔요!",
        audio: "일단계! 샤워기로 미지근하고 따뜻한 물을 온몸에 충분히 적셔요!"
      },
      {
        step: 2,
        title: "이단계: 바디워시 거품 타월 만들기 🧼🫧",
        cleanTitle: "바디워시 거품 타월 만들기 🧼🫧",
        shortTitle: "거품만들기",
        emoji: "🧼🫧",
        desc: "샤워 타월이나 스펀지에 바디워시를 짜서 거품을 풍성하게 퐁퐁 내요!",
        audio: "이단계! 샤워 타월에 바디워시를 적당히 짜서 거품을 풍성하게 퐁퐁 내요!"
      },
      {
        step: 3,
        title: "삼단계: 목, 가슴, 팔 살살 문질러 닦기 🧽💪",
        cleanTitle: "목·가슴·팔 살살 문질러 닦기 🧽💪",
        shortTitle: "상체닦기",
        emoji: "🧽💪",
        desc: "거품 타월로 목, 가슴, 배, 팔을 구석구석 부드럽게 문질러 닦아요!",
        audio: "삼단계! 거품 타월로 목, 가슴, 배, 양쪽 팔을 부드럽게 문질러 닦아요!"
      },
      {
        step: 4,
        title: "사단계: 등, 다리, 발가락 구석구석 닦기 🦶🦵",
        cleanTitle: "등·다리·발가락 구석구석 닦기 🦶🦵",
        shortTitle: "하체등닦기",
        emoji: "🦶🦵",
        desc: "손이 닿는 등 뒤와 다리, 발가락 사이사이를 깨끗하고 구석구석 닦아요!",
        audio: "사단계! 손이 닿는 등 뒤와 다리, 발가락 사이사이를 깨끗이 닦아요!"
      },
      {
        step: 5,
        title: "오단계: 샤워기로 거품 깨끗이 헹구기 🚿✨",
        cleanTitle: "샤워기로 거품 깨끗이 헹구기 🚿✨",
        shortTitle: "거품헹구기",
        emoji: "🚿✨",
        desc: "따뜻한 물로 온몸의 바디워시 거품이 남아있지 않게 싹 헹궈내요!",
        audio: "오단계! 샤워기로 온몸의 바디워시 거품을 남김없이 깨끗이 헹궈내요!"
      },
      {
        step: 6,
        title: "육단계: 수건으로 물기 닦고 로션 바르기 🧺🧴",
        cleanTitle: "수건으로 물기 닦고 로션 바르기 🧺🧴",
        shortTitle: "물기닦기",
        emoji: "🧺🧴",
        desc: "큰 바스타월 수건으로 물기를 톡톡 닦고 로션을 발라 뽀송하게 옷을 입어요!",
        audio: "육단계! 수건으로 온몸의 물기를 톡톡 닦고 로션을 발라 뽀송하게 옷을 입어요!"
      }
    ];

    this.bodywashMode = 1;
    this.currentBodywashStep = 1;
    this.bodyGameUserStep = 1;
    this.bodyGameShuffledSteps = [];
    this.bodySlotPlacedSteps = [null, null, null, null, null, null];
    this.bodyCurrentTargetSlotIdx = 0;
    this.bodySlotShuffledCards = [];

    /* --------------------------------------------------------------------------
       4. 계절별 옷입기 단계 데이터 (한글 단계 명칭 적용)
       -------------------------------------------------------------------------- */
    this.seasonDressData = {
      summer: [
        { step: 1, title: "일단계: 속옷(팬티와 브래지어) 입기 🩲👙", cleanTitle: "속옷(팬티와 브래지어) 입기 🩲👙", shortTitle: "팬티·브래지어", emoji: "🩲👙", desc: "쾌적하고 깨끗한 팬티와 브래지어 속옷을 먼저 입어요!", audio: "일단계! 시원하고 깨끗한 팬티와 브래지어 속옷을 먼저 바르게 입어요!" },
        { step: 2, title: "이단계: 반팔 티셔츠 입기 👕", cleanTitle: "반팔 티셔츠 머리 넣어 입기 👕", shortTitle: "반팔티입기", emoji: "👕", desc: "시원한 반팔 티셔츠에 머리를 쏙 넣어 바르게 입어요!", audio: "이단계! 시원한 반팔 티셔츠에 머리를 쏙 넣고 팔을 넣어 입어요!" },
        { step: 3, title: "삼단계: 반바지 입기 🩳", cleanTitle: "시원한 반바지 입기 🩳", shortTitle: "반바지입기", emoji: "🩳", desc: "활동하기 편한 시원한 반바지나 치마를 입어요!", audio: "삼단계! 시원한 반바지나 치마를 쏙 입어요!" },
        { step: 4, title: "사단계: 얇은 발목 양말 신기 🧦", cleanTitle: "얇은 발목 양말 신기 🧦", shortTitle: "양말신기", emoji: "🧦", desc: "땀을 흡수하는 얇은 발목 양말을 발에 딱 맞춰 신어요!", audio: "사단계! 얇은 발목 양말을 양발에 똑바로 신어요!" },
        { step: 5, title: "오단계: 샌들 또는 운동화 신기 👟", cleanTitle: "시원한 샌들/운동화 신기 👟👡", shortTitle: "신발신기", emoji: "👟", desc: "시원한 샌들이나 편한 운동화를 꽉 조여 신으면 외출 준비 끝!", audio: "오단계! 시원한 샌들이나 편한 운동화를 신으면 여름 옷입기 완성!" }
      ],
      winter: [
        { step: 1, title: "일단계: 속옷(팬티와 브래지어) 및 내복 입기 🩲👙", cleanTitle: "속옷(팬티와 브래지어) 및 내복 입기 🩲👙", shortTitle: "팬티·브라·내복", emoji: "🩲👙", desc: "체온을 지켜주는 팬티와 브래지어 속옷, 따뜻한 내복 상하의를 먼저 입어요!", audio: "일단계! 팬티와 브래지어 속옷, 그리고 따뜻한 내복을 쏙 입어요!" },
        { step: 2, title: "이단계: 긴팔 셔츠 및 긴바지 입기 👔👖", cleanTitle: "두꺼운 긴팔 셔츠/긴바지 입기 👔👖", shortTitle: "겉옷입기", emoji: "👔👖", desc: "두꺼운 긴팔 셔츠와 따뜻한 긴바지를 챙겨 입어요!", audio: "이단계! 두꺼운 긴팔 셔츠와 따뜻한 긴바지를 입어요!" },
        { step: 3, title: "삼단계: 포근한 겨울 양말 신기 🧦", cleanTitle: "두꺼운 포근한 양말 신기 🧦", shortTitle: "겨울양말", emoji: "🧦", desc: "발이 시렵지 않도록 길고 두꺼운 겨울 양말을 신어요!", audio: "삼단계! 발이 따뜻하도록 두꺼운 겨울 양말을 신어요!" },
        { step: 4, title: "사단계: 두꺼운 패딩 외투 입기 🧥", cleanTitle: "두꺼운 패딩 점퍼 입기 🧥", shortTitle: "패딩입기", emoji: "🧥", desc: "바람을 막아주는 두꺼운 다운 패딩 점퍼를 입고 지퍼를 채워요!", audio: "사단계! 바람을 막아주는 두꺼운 패딩을 입고 지퍼를 채워요!" },
        { step: 5, title: "오단계: 목도리와 모자 챙기기 🧣🎧", cleanTitle: "목도리 감고 방한모자 쓰기 🧣🎧", shortTitle: "목도리모자", emoji: "🧣🎧", desc: "목에 포근한 목도리를 두르고 귀도리나 모자를 써요!", audio: "오단계! 목에 목도리를 둘러 감고 귀도리나 모자를 착용해요!" },
        { step: 6, title: "육단계: 장갑 끼고 방한 부츠 신기 🧤🥾", cleanTitle: "방한 장갑 끼고 털부츠 신기 🧤🥾", shortTitle: "장갑부츠", emoji: "🧤🥾", desc: "손이 꽁꽁 얽지 않게 장갑을 끼고 털부츠를 신으면 겨울 준비 끝!", audio: "육단계! 따뜻한 장갑을 끼고 털부츠를 신으면 겨울 옷입기 완벽 성공!" }
      ],
      spring: [
        { step: 1, title: "일단계: 속옷(팬티와 브래지어) 입기 🩲👙", cleanTitle: "속옷(팬티와 브래지어) 입기 🩲👙", shortTitle: "팬티·브래지어", emoji: "🩲👙", desc: "보송보송하고 깨끗한 팬티와 브래지어 속옷을 바르게 입어요!", audio: "일단계! 깨끗한 팬티와 브래지어 속옷을 바르게 입어요!" },
        { step: 2, title: "이단계: 긴팔 티셔츠 입기 👔", cleanTitle: "가벼운 긴팔 티셔츠 입기 👔", shortTitle: "긴팔티입기", emoji: "👔", desc: "화사하고 가벼운 긴팔 티셔츠를 머리부터 쏙 입어요!", audio: "이단계! 가볍고 편안한 긴팔 티셔츠를 입어요!" },
        { step: 3, title: "삼단계: 활동성 좋은 긴바지 입기 👖", cleanTitle: "활동하기 편한 청바지/바지 입기 👖", shortTitle: "긴바지입기", emoji: "👖", desc: "야외활동하기 좋은 면바지나 청바지를 입어요!", audio: "삼단계! 편안하고 활동하기 좋은 긴바지를 입어요!" },
        { step: 4, title: "사단계: 얇은 가디건/자켓 입기 🧥", cleanTitle: "일교차 대비 얇은 자켓 입기 🧥", shortTitle: "자켓입기", emoji: "🧥", desc: "아침저녁 바람을 막아줄 얇은 가디건이나 바람막이 자켓을 걸쳐요!", audio: "사단계! 쌀쌀한 바람을 막아줄 얇은 자켓이나 가디건을 입어요!" },
        { step: 5, title: "오단계: 양말 신어 운동화 완성하기 🧦👟", cleanTitle: "양말 신어 편한 운동화 신기 🧦👟", shortTitle: "양말운동화", emoji: "🧦👟", desc: "예쁜 양말을 신은 후 끈이 단단한 운동화를 신으면 봄가을 외출 준비 끝!", audio: "오단계! 양말과 운동화를 깔끔하게 신으면 봄가을 옷입기 완성!" }
      ]
    };

    this.selectedSeason = 'summer';
    this.dressupMode = 1;
    this.currentDressStep = 1;
    this.dressGameUserStep = 1;
    this.dressGameShuffledSteps = [];
    this.dressSlotPlacedSteps = [];
    this.dressCurrentTargetSlotIdx = 0;
    this.dressSlotShuffledCards = [];

    /* --------------------------------------------------------------------------
       5. 세탁 분류 데이터 (세탁기 / 손세탁 / 세탁소 드라이 & 흰 옷 / 색깔 옷)
       -------------------------------------------------------------------------- */
    this.laundryMethodItems = [
      { name: "면 티셔츠 👕", type: "machine", typeName: "세탁기용", icon: "🧺", desc: "튼튼한 면 소재 티셔츠는 세탁기에 넣고 돌려요!" },
      { name: "시원한 반바지 🩳", type: "machine", typeName: "세탁기용", icon: "🧺", desc: "데일리 반바지는 세탁기에 쏙 넣어요!" },
      { name: "스포츠 양말 🧦", type: "machine", typeName: "세탁기용", icon: "🧺", desc: "매일 신는 양말은 세탁기로 깨끗이 빨아요!" },
      { name: "하얀 수건 🧺", type: "machine", typeName: "세탁기용", icon: "🧺", desc: "수건은 푹푹 세탁기 헹굼으로 청결하게 돌려요!" },
      { name: "편안한 팬티 속옷 🩲", type: "machine", typeName: "세탁기용", icon: "🧺", desc: "세탁망에 넣어 세탁기로 빨아도 좋아요!" },
      { name: "울 니트 🧶", type: "hand", typeName: "손세탁용", icon: "🧤", desc: "줄어들기 쉬운 울 니트는 미지근한 물에 살살 손세탁해요!" },
      { name: "포근한 목도리 🧣", type: "hand", typeName: "손세탁용", icon: "🧤", desc: "부드러운 목도리는 세제로 살살 손으로 조물조물 빨아요!" },
      { name: "레이스 브래지어 👙", type: "hand", typeName: "손세탁용", icon: "🧤", desc: "와이어나 레이스가 상하지 않게 미지근한 물로 손세탁해요!" },
      { name: "모양 변하는 캡 모자 🧢", type: "hand", typeName: "손세탁용", icon: "🧤", desc: "챙과 모양이 일그러지지 않게 솔로 살살 손세탁해요!" },
      { name: "얇은 실크 스카프 🧣", type: "hand", typeName: "손세탁용", icon: "🧤", desc: "비단 스카프는 가볍게 조물조물 손으로 헹궈요!" },
      { name: "두꺼운 모직 코트 🧥", type: "dry", typeName: "세탁소(드라이)", icon: "🏢", desc: "물에 닿으면 변형되는 코트는 세탁소 드라이클리닝을 맡겨요!" },
      { name: "정장 슈트 자켓 👔", type: "dry", typeName: "세탁소(드라이)", icon: "🏢", desc: "각이 잡힌 정장 외투는 전문 세탁소 드라이클리닝이 필수예요!" },
      { name: "실크 드레스 원피스 👗", type: "dry", typeName: "세탁소(드라이)", icon: "🏢", desc: "고급 원단 원피스는 옷감이 상하지 않게 세탁소에 맡겨요!" },
      { name: "가죽 점퍼 🧥", type: "dry", typeName: "세탁소(드라이)", icon: "🏢", desc: "가죽 소재는 물세탁이 안 되므로 세탁소 드라이클리닝을 해요!" },
      { name: "두꺼운 깃털 다운 점퍼 🥼", type: "dry", typeName: "세탁소(드라이)", icon: "🏢", desc: "다운 외투는 세탁소에 맡겨 전문 드라이로 안전하게 케어해요!" }
    ];

    this.laundryColorItems = [
      { name: "흰 티셔츠 👕", type: "white", typeName: "흰 옷", icon: "⚪" },
      { name: "빨간 원피스 👗", type: "color", typeName: "색깔 옷", icon: "🔴" },
      { name: "하얀 수건 🧺", type: "white", typeName: "흰 옷", icon: "⚪" },
      { name: "파란 청바지 👖", type: "color", typeName: "색깔 옷", icon: "🔴" },
      { name: "흰 양말 🧦", type: "white", typeName: "흰 옷", icon: "⚪" },
      { name: "검은 바지 🖤", type: "color", typeName: "색깔 옷", icon: "🔴" },
      { name: "흰 와이셔츠 👔", type: "white", typeName: "흰 옷", icon: "⚪" },
      { name: "노란 니트 💛", type: "color", typeName: "색깔 옷", icon: "🔴" }
    ];

    this.laundryMode = 1;
    this.laundryIndex = 0;
    this.shuffledMethodItems = [];
    this.shuffledColorItems = [];

    /* --------------------------------------------------------------------------
       6. 마트 계산대 시뮬레이션 데이터 (1모드: 물건값 결제 15문제, 2모드: 거스름돈 받기 15문제)
       -------------------------------------------------------------------------- */
    this.financeItems = [
      { name: "딸기우유 🍓🥛", price: 2500, emoji: "🍓🥛" },
      { name: "사과 한 봉지 🍎", price: 4200, emoji: "🍎" },
      { name: "바나나 한 송이 🍌", price: 3800, emoji: "🍌" },
      { name: "포근한 식빵 🍞", price: 1700, emoji: "🍞" },
      { name: "고소한 치즈 🧀", price: 5400, emoji: "🧀" },
      { name: "달콤한 초콜릿 🍫", price: 1200, emoji: "🍫" },
      { name: "상큼한 귤 한 망 🍊", price: 6500, emoji: "🍊" },
      { name: "계란 한 판(10개) 🥚", price: 4800, emoji: "🥚" },
      { name: "새콤달콤 쥬스 🧃", price: 2300, emoji: "🧃" },
      { name: "시원한 아이스크림 🍦", price: 8900, emoji: "🍦" },
      { name: "참치 삼각김밥 🍙", price: 1500, emoji: "🍙" },
      { name: "바삭한 컵라면 🍜", price: 1300, emoji: "🍜" },
      { name: "달콤한 포도 🍇", price: 7600, emoji: "🍇" },
      { name: "바삭한 쿠키 과자 🍪", price: 2800, emoji: "🍪" },
      { name: "신선한 샌드위치 🥪", price: 3400, emoji: "🥪" }
    ];

    this.financeChangeItems = [
      { name: "딸기우유 🍓🥛", price: 2500, paid: 5000, change: 2500, emoji: "🍓🥛" },
      { name: "사과 한 봉지 🍎", price: 4200, paid: 5000, change: 800, emoji: "🍎" },
      { name: "포근한 식빵 🍞", price: 1700, paid: 2000, change: 300, emoji: "🍞" },
      { name: "고소한 치즈 🧀", price: 5400, paid: 10000, change: 4600, emoji: "🧀" },
      { name: "달콤한 초콜릿 🍫", price: 1200, paid: 5000, change: 3800, emoji: "🍫" },
      { name: "상큼한 귤 한 망 🍊", price: 6500, paid: 10000, change: 3500, emoji: "🍊" },
      { name: "계란 한 판(10개) 🥚", price: 4800, paid: 5000, change: 200, emoji: "🥚" },
      { name: "새콤달콤 쥬스 🧃", price: 2300, paid: 5000, change: 2700, emoji: "🧃" },
      { name: "시원한 아이스크림 🍦", price: 8900, paid: 10000, change: 1100, emoji: "🍦" },
      { name: "바나나 한 송이 🍌", price: 3800, paid: 5000, change: 1200, emoji: "🍌" },
      { name: "참치 삼각김밥 🍙", price: 1500, paid: 5000, change: 3500, emoji: "🍙" },
      { name: "바삭한 컵라면 🍜", price: 1300, paid: 2000, change: 700, emoji: "🍜" },
      { name: "달콤한 포도 🍇", price: 7600, paid: 10000, change: 2400, emoji: "🍇" },
      { name: "바삭한 쿠키 과자 🍪", price: 2800, paid: 5000, change: 2200, emoji: "🍪" },
      { name: "신선한 샌드위치 🥪", price: 3400, paid: 5000, change: 1600, emoji: "🥪" }
    ];

    this.financeMode = 1;
    this.financeIndex = 0;
    this.paidMoney = 0;
    this.paidHistory = [];

    this.financeChangeIndex = 0;
    this.paidChangeMoney = 0;
    this.paidChangeHistory = [];

    /* --------------------------------------------------------------------------
       7. 시간 계산 3단계 30문제 데이터 [NEW]
       -------------------------------------------------------------------------- */
    this.timeCalcQuestions = {
      level1: [
        { id: 1, title: "초급 1: 정각 시간 가감", clockEmoji: "🕒", q: "현재 시계가 3시 00분을 가리키고 있습니다. 1시간 후는 몇 시 몇 분일까요?", choices: [{text: "1. 4시 00분", isCorrect: true}, {text: "2. 3시 30분", isCorrect: false}, {text: "3. 5시 00분", isCorrect: false}], exp: "3시에서 1시간이 지나면 4시 00분이 됩니다! 🕒➔🕓" },
        { id: 2, title: "초급 2: 반시 시간 가감", clockEmoji: "🕞", q: "현재 시각이 5시 30분입니다. 30분 후는 몇 시 몇 분일까요?", choices: [{text: "1. 6시 00분", isCorrect: true}, {text: "2. 5시 00분", isCorrect: false}, {text: "3. 6시 30분", isCorrect: false}], exp: "5시 30분에 30분을 더하면 60분이 되어 6시 00분이 됩니다!" },
        { id: 3, title: "초급 3: 2시간 후", clockEmoji: "🕑", q: "지금 시각은 2시 00분입니다. 2시간 후는 몇 시 몇 분일까요?", choices: [{text: "1. 4시 00분", isCorrect: true}, {text: "2. 3시 00분", isCorrect: false}, {text: "3. 5시 00분", isCorrect: false}], exp: "2시에 2시간을 더하면 4시 00분이 됩니다!" },
        { id: 4, title: "초급 4: 영화 시작 시각", clockEmoji: "🕠", q: "영화 시작 시각이 7시 30분입니다. 1시간 후는 몇 시 몇 분일까요?", choices: [{text: "1. 8시 30분", isCorrect: true}, {text: "2. 8시 00분", isCorrect: false}, {text: "3. 7시 00분", isCorrect: false}], exp: "7시 30분에서 1시간이 지나면 8시 30분입니다!" },
        { id: 5, title: "초급 5: 1시간 전", clockEmoji: "🕘", q: "아침 9시 00분에서 1시간 전 시각은 몇 시 몇 분이었을까요?", choices: [{text: "1. 8시 00분", isCorrect: true}, {text: "2. 10시 00분", isCorrect: false}, {text: "3. 8시 30분", isCorrect: false}], exp: "9시에서 1시간 빼면 8시 00분입니다!" },
        { id: 6, title: "초급 6: 30분 전", clockEmoji: "🕧", q: "점심시간 12시 30분에서 30분 전 시각은 몇 시 몇 분이었을까요?", choices: [{text: "1. 12시 00분", isCorrect: true}, {text: "2. 1시 00분", isCorrect: false}, {text: "3. 11시 30분", isCorrect: false}], exp: "12시 30분에서 30분을 빼면 정각 12시 00분입니다!" },
        { id: 7, title: "초급 7: 15분 후", clockEmoji: "🕓", q: "오후 4시 15분에서 15분 후는 몇 시 몇 분일까요?", choices: [{text: "1. 4시 30분", isCorrect: true}, {text: "2. 4시 45분", isCorrect: false}, {text: "3. 5시 00분", isCorrect: false}], exp: "15분에 15분을 더하면 30분이 되어 4시 30분입니다!" },
        { id: 8, title: "초급 8: 15분 후 정각", clockEmoji: "🕕", q: "저녁 6시 45분에서 15분 후는 몇 시 몇 분일까요?", choices: [{text: "1. 7시 00분", isCorrect: true}, {text: "2. 6시 30분", isCorrect: false}, {text: "3. 7시 15분", isCorrect: false}], exp: "45분에 15분을 더하면 60분이 되어 7시 00분이 됩니다!" },
        { id: 9, title: "초급 9: 3시간 후", clockEmoji: "🕗", q: "아침 8시 00분에서 3시간 후는 몇 시 몇 분일까요?", choices: [{text: "1. 11시 00분", isCorrect: true}, {text: "2. 10시 00분", isCorrect: false}, {text: "3. 12시 00분", isCorrect: false}], exp: "8시에 3시간을 더하면 11시 00분이 됩니다!" },
        { id: 10, title: "초급 10: 1시간 30분 후", clockEmoji: "🕚", q: "오전 11시 30분에서 1시간 30분 후는 몇 시 몇 분일까요?", choices: [{text: "1. 1시 00분", isCorrect: true}, {text: "2. 12시 30분", isCorrect: false}, {text: "3. 2시 00분", isCorrect: false}], exp: "11시 30분에 1시간 30분을 더하면 1시 00분이 됩니다!" }
      ],
      level2: [
        { id: 11, title: "중급 1: 60분 올림 계산", clockEmoji: "🕒", q: "2시 40분에 공부를 시작해서 50분 동안 했어요. 몇 시 몇 분에 끝났을까요?", choices: [{text: "1. 3시 30분", isCorrect: true}, {text: "2. 3시 10분", isCorrect: false}, {text: "3. 2시 50분", isCorrect: false}], exp: "40분 + 50분 = 90분(1시간 30분)이므로 3시 30분에 끝납니다!" },
        { id: 12, title: "중급 2: 45분 후", clockEmoji: "🕔", q: "5시 20분에서 45분 후는 몇 시 몇 분일까요?", choices: [{text: "1. 6시 5분", isCorrect: true}, {text: "2. 6시 15분", isCorrect: false}, {text: "3. 5시 65분", isCorrect: false}], exp: "20분 + 45분 = 65분(1시간 5분)이므로 6시 5분입니다!" },
        { id: 13, title: "중급 3: 30분 후", clockEmoji: "🕚", q: "10시 50분에서 30분 후는 몇 시 몇 분일까요?", choices: [{text: "1. 11시 20분", isCorrect: true}, {text: "2. 11시 30분", isCorrect: false}, {text: "3. 10시 80분", isCorrect: false}], exp: "50분 + 30분 = 80분(1시간 20분)이므로 11시 20분입니다!" },
        { id: 14, title: "중급 4: 60분 내림 뺄셈", clockEmoji: "🕗", q: "8시 10분에서 30분 전은 몇 시 몇 분이었을까요?", choices: [{text: "1. 7시 40분", isCorrect: true}, {text: "2. 7시 30분", isCorrect: false}, {text: "3. 8시 40분", isCorrect: false}], exp: "8시 10분을 7시 70분으로 바꾼 뒤 30분을 빼면 7시 40분입니다!" },
        { id: 15, title: "중급 5: 40분 전", clockEmoji: "🕓", q: "4시 15분에서 40분 전은 몇 시 몇 분이었을까요?", choices: [{text: "1. 3시 35분", isCorrect: true}, {text: "2. 3시 45분", isCorrect: false}, {text: "3. 4시 25분", isCorrect: false}], exp: "4시 15분 ➔ 3시 75분에서 40분을 빼면 3시 35분입니다!" },
        { id: 16, title: "중급 6: 1시간 40분 후", clockEmoji: "🕤", q: "9시 35분에서 1시간 40분 후는 몇 시 몇 분일까요?", choices: [{text: "1. 11시 15분", isCorrect: true}, {text: "2. 10시 75분", isCorrect: false}, {text: "3. 11시 35분", isCorrect: false}], exp: "9시+1시간=10시, 35분+40분=75분(1시간15분) ➔ 11시 15분입니다!" },
        { id: 17, title: "중급 7: 2시간 50분 후", clockEmoji: "🕐", q: "1시 25분에서 2시간 50분 후는 몇 시 몇 분일까요?", choices: [{text: "1. 4시 15분", isCorrect: true}, {text: "2. 3시 75분", isCorrect: false}, {text: "3. 4시 25분", isCorrect: false}], exp: "1시+2시간=3시, 25분+50분=75분(1시간15분) ➔ 4시 15분입니다!" },
        { id: 18, title: "중급 8: 50분 전", clockEmoji: "🕕", q: "6시 5분에서 50분 전은 몇 시 몇 분이었을까요?", choices: [{text: "1. 5시 15분", isCorrect: true}, {text: "2. 5시 25분", isCorrect: false}, {text: "3. 6시 15분", isCorrect: false}], exp: "6시 5분 ➔ 5시 65분에서 50분을 빼면 5시 15분입니다!" },
        { id: 19, title: "중급 9: 이동시간 가감", clockEmoji: "🕖", q: "7시 45분에 출발하여 1시간 25분 동안 이동했어요. 도착 시각은?", choices: [{text: "1. 9시 10분", isCorrect: true}, {text: "2. 8시 70분", isCorrect: false}, {text: "3. 9시 20분", isCorrect: false}], exp: "7시+1시간=8시, 45분+25분=70분(1시간10분) ➔ 9시 10분입니다!" },
        { id: 20, title: "중급 10: 1시간 35분 전", clockEmoji: "🕦", q: "11시 10분에서 1시간 35분 전은 몇 시 몇 분이었을까요?", choices: [{text: "1. 9시 35분", isCorrect: true}, {text: "2. 9시 45분", isCorrect: false}, {text: "3. 10시 35분", isCorrect: false}], exp: "11시 10분 ➔ 10시 70분에서 1시간 35분을 빼면 9시 35분입니다!" }
      ],
      level3: [
        { id: 21, title: "고급 1: 영화 상영 시간", clockEmoji: "🎬", q: "영화가 2시 10분에 시작해서 4시 30분에 끝났어요. 영화 상영 시간은 얼마일까요?", choices: [{text: "1. 2시간 20분", isCorrect: true}, {text: "2. 2시간 10분", isCorrect: false}, {text: "3. 1시간 40분", isCorrect: false}], exp: "4시 30분 - 2시 10분 = 2시간 20분입니다!" },
        { id: 22, title: "고급 2: 기차 소요 시간", clockEmoji: "🚆", q: "기차가 9시 45분에 출발해서 12시 15분에 도착했어요. 기차를 탄 시간은 얼마일까요?", choices: [{text: "1. 2시간 30분", isCorrect: true}, {text: "2. 3시간 30분", isCorrect: false}, {text: "3. 2시간 45분", isCorrect: false}], exp: "12시 15분(11시 75분) - 9시 45분 = 2시간 30분입니다!" },
        { id: 23, title: "고급 3: 도서관 공부 시간", clockEmoji: "📚", q: "도서관에서 1시 30분부터 공부를 시작해서 5시 10분에 나왔어요. 공부한 시간은 얼마일까요?", choices: [{text: "1. 3시간 40분", isCorrect: true}, {text: "2. 4시간 20분", isCorrect: false}, {text: "3. 3시간 20분", isCorrect: false}], exp: "5시 10분(4시 70분) - 1시 30분 = 3시간 40분입니다!" },
        { id: 24, title: "고급 4: 축구 경기 시간", clockEmoji: "⚽", q: "축구 경기가 3시 50분에 시작해서 5시 35분에 끝났어요. 경기를 한 시간은 얼마일까요?", choices: [{text: "1. 1시간 45분", isCorrect: true}, {text: "2. 2시간 15분", isCorrect: false}, {text: "3. 1시간 35분", isCorrect: false}], exp: "5시 35분(4시 95분) - 3시 50분 = 1시간 45분입니다!" },
        { id: 25, title: "고급 5: 자전거 탄 시간", clockEmoji: "🚴", q: "자전거를 10시 20분부터 타기 시작해서 11시 55분에 마쳤어요. 자전거를 탄 시간은 얼마일까요?", choices: [{text: "1. 1시간 35분", isCorrect: true}, {text: "2. 1시간 25분", isCorrect: false}, {text: "3. 2시간 15분", isCorrect: false}], exp: "11시 55분 - 10시 20분 = 1시간 35분입니다!" },
        { id: 26, title: "고급 6: 빵 구운 시간", clockEmoji: "🍰", q: "오븐에 4시 25분에 빵을 넣고 50분 동안 구웠어요. 빵이 다 구워진 시각은?", choices: [{text: "1. 5시 15분", isCorrect: true}, {text: "2. 5시 25분", isCorrect: false}, {text: "3. 4시 75분", isCorrect: false}], exp: "4시 25분 + 50분 = 4시 75분(5시 15분)입니다!" },
        { id: 27, title: "고급 7: 수면 시간 계산", clockEmoji: "😴", q: "밤 10시 30분에 잠들어서 아침 6시 30분에 깨어났어요. 몇 시간 동안 잤을까요?", choices: [{text: "1. 8시간", isCorrect: true}, {text: "2. 7시간 30분", isCorrect: false}, {text: "3. 9시간", isCorrect: false}], exp: "10시 30분 ➔ 자정 12시까지 1시간 30분 + 아침 6시 30분 = 8시간입니다!" },
        { id: 28, title: "고급 8: 소풍 버스 소요 시간", clockEmoji: "🚌", q: "소풍 버스를 아침 8시 40분에 타서 10시 25분에 도착했어요. 버스를 탄 시간은 얼마일까요?", choices: [{text: "1. 1시간 45분", isCorrect: true}, {text: "2. 1시간 35분", isCorrect: false}, {text: "3. 2시간 15분", isCorrect: false}], exp: "10시 25분(9시 85분) - 8시 40분 = 1시간 45분입니다!" },
        { id: 29, title: "고급 9: 미술 수업 종료 시각", clockEmoji: "🎨", q: "미술 수업이 1시 45분에 시작해서 3시간 15분 동안 진행되었어요. 몇 시 몇 분에 끝날까요?", choices: [{text: "1. 5시 00분", isCorrect: true}, {text: "2. 4시 45분", isCorrect: false}, {text: "3. 5시 15분", isCorrect: false}], exp: "1시 45분 + 3시간 15분 = 4시 60분(5시 00분)입니다!" },
        { id: 30, title: "고급 10: 마라톤 완주 소요 시간", clockEmoji: "🏃", q: "마라톤 선수가 9시 15분에 출발해서 11시 08분에 들어왔어요. 달린 시간은 얼마일까요?", choices: [{text: "1. 1시간 53분", isCorrect: true}, {text: "2. 2시간 07분", isCorrect: false}, {text: "3. 1시간 43분", isCorrect: false}], exp: "11시 08분(10시 68분) - 9시 15분 = 1시간 53분입니다!" }
      ]
    };

    this.timeCalcLevel = 1; // 1, 2, or 3
    this.timeCalcIndex = 0;
  }

  getStepKr(num) {
    return this.krStepNames[num] || `${num}단계`;
  }

  render(container) {
    const subName = this.subModules[this.currentSubIndex];
    let html = `
      <div class="sub-nav-bar" style="flex-wrap:wrap;">
        <button class="sub-nav-btn ${this.currentSubIndex===0?'active':''}" onclick="selfManagementManager.switchSub(0)"><i class="fa-solid fa-soap"></i> 1. 손씻기 (육단계)</button>
        <button class="sub-nav-btn ${this.currentSubIndex===1?'active':''}" onclick="selfManagementManager.switchSub(1)"><i class="fa-solid fa-shower"></i> 2. 머리감기 (육단계)</button>
        <button class="sub-nav-btn ${this.currentSubIndex===2?'active':''}" onclick="selfManagementManager.switchSub(2)"><i class="fa-solid fa-bath"></i> 3. 목욕하기 (육단계)</button>
        <button class="sub-nav-btn ${this.currentSubIndex===3?'active':''}" onclick="selfManagementManager.switchSub(3)"><i class="fa-solid fa-shirt"></i> 4. 계절별 옷입기</button>
        <button class="sub-nav-btn ${this.currentSubIndex===4?'active':''}" onclick="selfManagementManager.switchSub(4)"><i class="fa-solid fa-box"></i> 5. 세탁 분류 (방법/색깔)</button>
        <button class="sub-nav-btn ${this.currentSubIndex===5?'active':''}" onclick="selfManagementManager.switchSub(5)"><i class="fa-solid fa-cash-register"></i> 6. 마트 계산대 (결제/잔돈)</button>
        <button class="sub-nav-btn ${this.currentSubIndex===6?'active':''}" onclick="selfManagementManager.switchSub(6)"><i class="fa-solid fa-clock"></i> 7. 시간 계산 (3단계 30문제)</button>
      </div>
      <div id="selfMgmtSubWorkspace"></div>
    `;
    container.innerHTML = html;

    const workspace = document.getElementById('selfMgmtSubWorkspace');
    if (subName === 'hygiene') this.renderHygiene(workspace);
    else if (subName === 'hairwash') this.renderHairwash(workspace);
    else if (subName === 'bodywash') this.renderBodywash(workspace);
    else if (subName === 'dressup') this.renderSeasonDressup(workspace);
    else if (subName === 'laundry') this.renderLaundry(workspace);
    else if (subName === 'finance') this.renderFinance(workspace);
    else if (subName === 'timecalc') this.renderTimeCalc(workspace);
  }

  switchSub(idx) {
    soundManager.playClick();
    this.currentSubIndex = idx;

    if (this.subModules[idx] === 'laundry') {
      this.shuffledMethodItems = [...this.laundryMethodItems].sort(() => Math.random() - 0.5);
      this.shuffledColorItems = [...this.laundryColorItems].sort(() => Math.random() - 0.5);
      this.laundryIndex = 0;
    } else if (this.subModules[idx] === 'finance') {
      this.financeIndex = 0;
      this.paidMoney = 0;
      this.paidHistory = [];
      this.financeChangeIndex = 0;
      this.paidChangeMoney = 0;
      this.paidChangeHistory = [];
    } else if (this.subModules[idx] === 'timecalc') {
      this.timeCalcIndex = 0;
    }

    const container = document.getElementById('selfManagementArea');
    if (container) this.render(container);
  }

  /* --------------------------------------------------------------------------
     1. Hand Washing (손씻기)
     -------------------------------------------------------------------------- */
  renderHygiene(workspace) {
    let modeTitle = "";
    if (this.hygieneMode === 1) modeTitle = "1모드: 올바른 손씻기 순서 실습 (일단계~육단계)";
    else if (this.hygieneMode === 2) modeTitle = "2모드: 손씻기 순서 맞추기 퀴즈 (일단계~육단계)";
    else if (this.hygieneMode === 3) modeTitle = "3모드: 육칸 슬롯 순서 배치 퍼즐 (스냅 & 튕기기)";

    workspace.innerHTML = `
      <div class="activity-header">
        <div class="activity-header-text">
          <h2>🧼 올바른 손 씻기 (질병관리청 육단계 수칙)</h2>
          <p>${modeTitle}</p>
        </div>
        <button class="speak-btn" onclick="selfManagementManager.speakHygieneModeInfo()"><i class="fa-solid fa-volume-high"></i></button>
      </div>

      <div style="display:flex; gap:0.5rem; justify-content:center; flex-wrap:wrap; margin-bottom:1.25rem;">
        <button class="primary-btn ${this.hygieneMode===1?'pulse':''}" style="padding:0.6rem 1.1rem; font-size:0.95rem; background:${this.hygieneMode===1?'#38a169':'#64748b'};" onclick="selfManagementManager.switchHygieneMode(1)">1모드: 순서 실습</button>
        <button class="primary-btn ${this.hygieneMode===2?'pulse':''}" style="padding:0.6rem 1.1rem; font-size:0.95rem; background:${this.hygieneMode===2?'#3182ce':'#64748b'};" onclick="selfManagementManager.switchHygieneMode(2)">2모드: 순서 퀴즈</button>
        <button class="primary-btn ${this.hygieneMode===3?'pulse':''}" style="padding:0.6rem 1.1rem; font-size:0.95rem; background:${this.hygieneMode===3?'#8b5cf6':'#64748b'};" onclick="selfManagementManager.switchHygieneMode(3)">3모드: 육칸 슬롯 퍼즐 게임</button>
      </div>

      <div id="hygieneSubWorkspace" style="max-width:800px; margin: 0 auto;"></div>
    `;

    const subWorkspace = document.getElementById('hygieneSubWorkspace');
    if (this.hygieneMode === 1) this.renderHygienePractice(subWorkspace);
    else if (this.hygieneMode === 2) this.renderHygieneGame(subWorkspace);
    else if (this.hygieneMode === 3) this.renderHygieneSlotPuzzle(subWorkspace);
  }

  switchHygieneMode(m) {
    soundManager.playClick();
    this.hygieneMode = m;
    this.currentHygieneStep = 1;
    this.gameUserStep = 1;

    if (m === 2) {
      this.gameShuffledSteps = [...this.handwash6Steps].sort(() => Math.random() - 0.5);
    } else if (m === 3) {
      this.slotPlacedSteps = [null, null, null, null, null, null];
      this.currentTargetSlotIdx = 0;
      this.slotShuffledCards = [...this.handwash6Steps].sort(() => Math.random() - 0.5);
    }

    const workspace = document.getElementById('selfMgmtSubWorkspace');
    if (workspace) this.renderHygiene(workspace);
  }

  speakHygieneModeInfo() {
    if (this.hygieneMode === 1) ttsManager.speak("손씻기 일단계부터 육단계까지 차례대로 실습하며 동작을 익혀보세요!");
    else if (this.hygieneMode === 2) ttsManager.speak("섞여 있는 손씻기 동작을 일단계부터 육단계까지 순서대로 클릭해보세요!");
    else if (this.hygieneMode === 3) ttsManager.speak("아래 동작 카드를 클릭하여 육칸 슬롯에 올바른 순서대로 넣어보세요!");
  }

  /* Handwash Practice */
  renderHygienePractice(workspace) {
    const curStepObj = this.handwash6Steps[this.currentHygieneStep - 1];

    workspace.innerHTML = `
      <div style="text-align:center;">
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.05); padding:0.75rem 1.25rem; border-radius:14px; margin-bottom:1rem; font-weight:700;">
          <div>📌 손씻기 실습 진행률</div>
          <div>🧼 <span style="color:#2b6cb0; font-size:1.3rem;">${this.getStepKr(this.currentHygieneStep)}</span> / 육단계</div>
        </div>

        <div style="display:grid; grid-template-columns: repeat(6, 1fr); gap:0.4rem; margin-bottom:1.5rem;">
          ${this.handwash6Steps.map(s => `
            <div style="padding:0.5rem 0.2rem; border-radius:10px; font-weight:800; font-size:0.85rem; border:2px solid ${s.step===this.currentHygieneStep?'#38a169':(s.step<this.currentHygieneStep?'#cbd5e1':'#edf2f7')}; background:${s.step===this.currentHygieneStep?'#f0fdf4':(s.step<this.currentHygieneStep?'#e2e8f0':'#fff')}; color:${s.step===this.currentHygieneStep?'#15803d':'#64748b'};">
              <div>${s.emoji}</div>
              <div>${this.getStepKr(s.step)}</div>
            </div>
          `).join('')}
        </div>

        <div class="clip-theme-card" style="padding:2.2rem; background:#e6fffa; border:4px solid #319795; margin-bottom:1.5rem; border-radius:22px;">
          <div style="font-size:5.5rem; margin-bottom:0.5rem;">${curStepObj.emoji}</div>
          <h2 style="font-size:2rem; color:#234e52; font-family:var(--font-family-friendly); margin-bottom:0.75rem;">${curStepObj.title}</h2>
          <p style="font-size:1.3rem; color:#2d3748; font-weight:700; line-height:1.6; margin:0;">${curStepObj.desc}</p>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center;">
          <button class="primary-btn" ${this.currentHygieneStep===1?'disabled':''} onclick="selfManagementManager.prevHygieneStep()"><i class="fa-solid fa-arrow-left"></i> 이전 단계</button>
          
          <button class="primary-btn" style="font-size:1.1rem; padding:0.75rem 1.4rem; background:#319795;" onclick="ttsManager.speak('${curStepObj.audio}')">
            🔊 설명 다시 듣기
          </button>

          <button class="primary-btn pulse" style="background:#38a169;" onclick="selfManagementManager.nextHygieneStep()">
            ${this.currentHygieneStep === 6 ? '손씻기 육단계 완료! 🎉' : '다음 단계 🧼 <i class="fa-solid fa-arrow-right"></i>'}
          </button>
        </div>
      </div>
    `;

    ttsManager.speak(curStepObj.audio);
  }

  nextHygieneStep() {
    soundManager.playClick();
    if (this.currentHygieneStep < 6) {
      this.currentHygieneStep++;
      const workspace = document.getElementById('hygieneSubWorkspace');
      if (workspace) this.renderHygienePractice(workspace);
    } else {
      soundManager.playCelebration();
      appState.addStar(1);
      ttsManager.speak("축하합니다! 올바른 손씻기 일단계부터 육단계까지 모두 참 잘 마쳤습니다!");
      appState.showCelebrationModal("손씻기 실습 완수!", "손바닥, 손등, 손가락 깍지, 손가락 모으기, 엄지, 손톱 밑까지 깨끗해졌어요! 🧼✨");
    }
  }

  prevHygieneStep() {
    soundManager.playClick();
    if (this.currentHygieneStep > 1) {
      this.currentHygieneStep--;
      const workspace = document.getElementById('hygieneSubWorkspace');
      if (workspace) this.renderHygienePractice(workspace);
    }
  }

  /* Handwash Quiz */
  renderHygieneGame(workspace) {
    const isCompleted = (this.gameUserStep > 6);
    const targetStepObj = this.handwash6Steps[this.gameUserStep - 1];

    workspace.innerHTML = `
      <div style="text-align:center;">
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.05); padding:0.75rem 1.25rem; border-radius:14px; margin-bottom:1rem; font-weight:700;">
          <div>📌 순서 찾기 퀴즈</div>
          <div>🎯 찾을 목표: <span style="color:#e53e3e; font-size:1.3rem;">${isCompleted ? '완료!' : this.getStepKr(this.gameUserStep) + ' 동작'}</span></div>
        </div>

        ${!isCompleted ? `
          <div class="clip-theme-card" style="padding:1.5rem; background:#fffbe6; border:4px solid #3182ce; margin-bottom:1.5rem; border-radius:20px;">
            <h3 style="font-size:1.4rem; color:#2b6cb0; margin:0;">
              👉 다음으로 올바른 <span style="color:#e53e3e; font-size:1.6rem; font-weight:800;">${this.getStepKr(this.gameUserStep)}</span> 동작 카드를 클릭하세요!
            </h3>
          </div>
        ` : ''}

        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:1rem; margin-bottom:1.5rem;">
          ${this.gameShuffledSteps.map(s => {
            let isPassed = (s.step < this.gameUserStep);
            return `
              <button class="btn-choice" style="padding:1.25rem; border-radius:18px; ${isPassed?'background:#f0fdf4; border:3px solid #22c55e; opacity:0.6;':''}" ${isPassed||isCompleted?'disabled':''} onclick="selfManagementManager.checkHygieneGameStep(${s.step}, this)">
                <div style="font-size:3.5rem; margin-bottom:0.4rem;">${s.emoji}</div>
                <div style="font-size:1.15rem; font-weight:800; color:#2d3748;">${s.cleanTitle}</div>
              </button>
            `;
          }).join('')}
        </div>

        ${isCompleted ? `
          <div class="clip-theme-card" style="padding:1.75rem; background:#f0fdf4; border:4px solid #22c55e; margin-bottom:1.5rem; text-align:center;">
            <h2 style="color:#15803d; margin-bottom:0.5rem;">🎉 손씻기 순서 맞추기 완벽 성공! ⭐</h2>
            <p style="font-size:1.15rem; color:#276749;">일단계부터 육단계까지 순서대로 정확히 맞췄습니다!</p>
            <button class="primary-btn" style="font-size:1.1rem; padding:0.75rem 1.5rem; background:#38a169;" onclick="selfManagementManager.switchHygieneMode(2)">
              다시 도전하기 🔄
            </button>
          </div>
        ` : ''}
      </div>
    `;

    if (!isCompleted && targetStepObj) {
      ttsManager.speak(`손씻기 ${this.getStepKr(this.gameUserStep)} 동작 카드를 찾아 클릭하세요!`);
    }
  }

  checkHygieneGameStep(stepNum, btn) {
    if (stepNum === this.gameUserStep) {
      soundManager.playCorrect();
      btn.classList.add('correct');
      const stepObj = this.handwash6Steps[stepNum - 1];

      this.gameUserStep++;

      if (this.gameUserStep <= 6) {
        ttsManager.speak(`정답입니다! ${stepObj.cleanTitle} 성공! 다음 ${this.getStepKr(this.gameUserStep)}를 찾아보세요!`);
      } else {
        soundManager.playCelebration();
        appState.addStar(1);
        ttsManager.speak("축하합니다! 손씻기 일단계부터 육단계까지 올바른 순서대로 완벽하게 성공했어요!");
        appState.showCelebrationModal("위생 수칙 마스터!", "올바른 손씻기 순서 맞추기를 완벽하게 성공했습니다! 🧼⭐");
      }

      const workspace = document.getElementById('hygieneSubWorkspace');
      if (workspace) this.renderHygieneGame(workspace);
    } else {
      soundManager.playWrong();
      btn.classList.add('wrong');
      setTimeout(() => btn.classList.remove('wrong'), 800);
      ttsManager.speak(`아쉬워요! 지금 찾아야 할 단계는 ${this.getStepKr(this.gameUserStep)}입니다. 다시 확인해 보세요!`);
    }
  }

  /* Handwash Slot Puzzle */
  renderHygieneSlotPuzzle(workspace) {
    const isAllPlaced = this.slotPlacedSteps.every(s => s !== null);
    const activeSlotStep = this.currentTargetSlotIdx + 1;

    workspace.innerHTML = `
      <div style="text-align:center;">
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.05); padding:0.75rem 1.25rem; border-radius:14px; margin-bottom:1rem; font-weight:700;">
          <div>📌 육칸 슬롯 순서 배치 퍼즐</div>
          <div>🎯 채울 슬롯: <span style="color:#8b5cf6; font-size:1.3rem;">${isAllPlaced ? '육칸 완벽 완성! 🎉' : this.getStepKr(activeSlotStep) + ' 슬롯'}</span></div>
        </div>

        <div class="clip-theme-card" style="padding:1.25rem; background:#fffbe6; border:3px solid #8b5cf6; margin-bottom:1.25rem; border-radius:18px;">
          <p style="font-size:1.15rem; color:#4a5568; font-weight:700; margin:0;">
            ${isAllPlaced 
              ? '🎉 육칸 슬롯에 손씻기 동작을 완벽하게 채웠습니다!' 
              : `아래 섞여 있는 동작 카드를 클릭하여 <span style="color:#8b5cf6; font-size:1.3rem; font-weight:800;">${this.getStepKr(activeSlotStep)} 슬롯</span>에 순서대로 넣으세요! (맞으면 쏙 들어가고 틀리면 튕겨나갑니다!)`}
          </p>
        </div>

        <h4 style="margin-bottom:0.75rem; color:#2b6cb0; font-weight:800; text-align:left;">📥 순서 슬롯 (일단계 ➔ 육단계):</h4>
        <div style="display:grid; grid-template-columns: repeat(6, 1fr); gap:0.5rem; margin-bottom:1.5rem;">
          ${this.slotPlacedSteps.map((placedObj, idx) => {
            const stepNum = idx + 1;
            const isActive = (idx === this.currentTargetSlotIdx && !isAllPlaced);
            if (placedObj) {
              return `
                <div style="background:#f0fdf4; border:3px solid #22c55e; border-radius:14px; padding:0.6rem 0.3rem; text-align:center; animation:popIn 0.3s ease;">
                  <div style="font-size:2.2rem; margin-bottom:0.2rem;">${placedObj.emoji}</div>
                  <div style="font-size:0.8rem; font-weight:800; color:#15803d;">${this.getStepKr(stepNum)}</div>
                  <div style="font-size:0.7rem; color:#276749; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${placedObj.shortTitle}</div>
                </div>
              `;
            } else {
              return `
                <div style="background:${isActive?'#fffbe6':'#edf2f7'}; border:3px dashed ${isActive?'#8b5cf6':'#cbd5e1'}; border-radius:14px; padding:0.8rem 0.3rem; text-align:center; color:${isActive?'#6b21a8':'#a0aec0'}; ${isActive?'box-shadow:0 0 10px rgba(139,92,246,0.3);':''}">
                  <div style="font-size:1.8rem; margin-bottom:0.2rem;">${isActive?'❓':'🔒'}</div>
                  <div style="font-size:0.85rem; font-weight:800;">${this.getStepKr(stepNum)}</div>
                  <div style="font-size:0.7rem;">${isActive?'[대기중]':'빈 슬롯'}</div>
                </div>
              `;
            }
          }).join('')}
        </div>

        <h4 style="margin-bottom:0.75rem; color:#4a5568; font-weight:800; text-align:left;">🎴 섞여 있는 손씻기 동작 카드를 클릭하세요:</h4>
        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:0.9rem; margin-bottom:1.5rem;">
          ${this.slotShuffledCards.map(s => {
            const isAlreadyPlaced = this.slotPlacedSteps.some(p => p && p.step === s.step);
            return `
              <button id="slotCard_${s.step}" class="btn-choice" style="padding:1rem; border-radius:16px; ${isAlreadyPlaced?'opacity:0.25; pointer-events:none;':''}" ${isAlreadyPlaced||isAllPlaced?'disabled':''} onclick="selfManagementManager.tryPlaceSlotCard(${s.step}, this)">
                <div style="font-size:3rem; margin-bottom:0.3rem;">${s.emoji}</div>
                <div style="font-size:1.1rem; font-weight:800; color:#2d3748;">${s.cleanTitle}</div>
              </button>
            `;
          }).join('')}
        </div>

        ${isAllPlaced ? `
          <div class="clip-theme-card" style="padding:1.75rem; background:#f0fdf4; border:4px solid #22c55e; margin-bottom:1.5rem; text-align:center;">
            <h2 style="color:#15803d; margin-bottom:0.5rem;">🎉 육칸 슬롯 퍼즐 완벽 성공! ⭐</h2>
            <p style="font-size:1.15rem; color:#276749;">일단계부터 육단계까지 육칸을 순서대로 완벽히 맞췄습니다!</p>
            <button class="primary-btn" style="font-size:1.1rem; padding:0.75rem 1.5rem; background:#8b5cf6;" onclick="selfManagementManager.switchHygieneMode(3)">
              다시 도전하기 🔄
            </button>
          </div>
        ` : ''}

        <div style="display:flex; justify-content:center;">
          <button class="primary-btn" style="background:#e2e8f0; color:#475569;" onclick="selfManagementManager.switchHygieneMode(3)">
            <i class="fa-solid fa-rotate-left"></i> 슬롯 처음부터 다시 맞추기
          </button>
        </div>
      </div>
    `;

    if (!isAllPlaced) {
      ttsManager.speak(`아래 동작 카드 중 ${this.getStepKr(activeSlotStep)}에 알맞은 카드를 클릭하세요!`);
    }
  }

  tryPlaceSlotCard(stepNum, btnElem) {
    const targetStepNeeded = this.currentTargetSlotIdx + 1;
    const clickedStepObj = this.handwash6Steps[stepNum - 1];

    if (stepNum === targetStepNeeded) {
      soundManager.playCorrect();
      btnElem.classList.add('correct');

      this.slotPlacedSteps[this.currentTargetSlotIdx] = clickedStepObj;
      this.currentTargetSlotIdx++;

      if (this.currentTargetSlotIdx < 6) {
        ttsManager.speak(`정답입니다! ${clickedStepObj.shortTitle} 동작이 ${this.getStepKr(targetStepNeeded)} 슬롯에 쏙 들어갔어요! 다음 ${this.getStepKr(this.currentTargetSlotIdx + 1)}를 골라보세요!`);
      } else {
        soundManager.playCelebration();
        appState.addStar(1);
        ttsManager.speak("축하합니다! 육칸 슬롯에 손씻기 단계를 순서대로 완벽하게 맞췄습니다!");
        appState.showCelebrationModal("육칸 슬롯 완성 퍼즐 완수!", "손씻기 단계를 육칸 안에 정확한 순서대로 완벽히 집어넣었습니다! 🧼⭐");
      }

      const workspace = document.getElementById('hygieneSubWorkspace');
      if (workspace) this.renderHygieneSlotPuzzle(workspace);

    } else {
      soundManager.playWrong();
      btnElem.classList.add('wrong');
      btnElem.style.transform = "translateX(15px)";
      setTimeout(() => {
        btnElem.style.transform = "translateX(-15px)";
        setTimeout(() => {
          btnElem.style.transform = "none";
          btnElem.classList.remove('wrong');
        }, 150);
      }, 150);

      ttsManager.speak(`아쉬워요! 튕겨나갑니다! 지금 채울 칸은 ${this.getStepKr(targetStepNeeded)} 슬롯입니다!`);
    }
  }

  /* --------------------------------------------------------------------------
     2. Hair Washing (머리감기)
     -------------------------------------------------------------------------- */
  renderHairwash(workspace) {
    let modeTitle = "";
    if (this.hairwashMode === 1) modeTitle = "1모드: 올바른 머리감기 순서 실습 (일단계~육단계)";
    else if (this.hairwashMode === 2) modeTitle = "2모드: 머리감기 순서 맞추기 퀴즈 (일단계~육단계)";
    else if (this.hairwashMode === 3) modeTitle = "3모드: 육칸 슬롯 순서 배치 퍼즐 (스냅 & 튕기기)";

    workspace.innerHTML = `
      <div class="activity-header">
        <div class="activity-header-text">
          <h2>🧴 올바른 머리 감기 (위생 수칙 육단계)</h2>
          <p>${modeTitle}</p>
        </div>
        <button class="speak-btn" onclick="selfManagementManager.speakHairwashModeInfo()"><i class="fa-solid fa-volume-high"></i></button>
      </div>

      <div style="display:flex; gap:0.5rem; justify-content:center; flex-wrap:wrap; margin-bottom:1.25rem;">
        <button class="primary-btn ${this.hairwashMode===1?'pulse':''}" style="padding:0.6rem 1.1rem; font-size:0.95rem; background:${this.hairwashMode===1?'#38a169':'#64748b'};" onclick="selfManagementManager.switchHairwashMode(1)">1모드: 순서 실습</button>
        <button class="primary-btn ${this.hairwashMode===2?'pulse':''}" style="padding:0.6rem 1.1rem; font-size:0.95rem; background:${this.hairwashMode===2?'#3182ce':'#64748b'};" onclick="selfManagementManager.switchHairwashMode(2)">2모드: 순서 퀴즈</button>
        <button class="primary-btn ${this.hairwashMode===3?'pulse':''}" style="padding:0.6rem 1.1rem; font-size:0.95rem; background:${this.hairwashMode===3?'#8b5cf6':'#64748b'};" onclick="selfManagementManager.switchHairwashMode(3)">3모드: 육칸 슬롯 퍼즐 게임</button>
      </div>

      <div id="hairwashSubWorkspace" style="max-width:800px; margin: 0 auto;"></div>
    `;

    const subWorkspace = document.getElementById('hairwashSubWorkspace');
    if (this.hairwashMode === 1) this.renderHairwashPractice(subWorkspace);
    else if (this.hairwashMode === 2) this.renderHairwashGame(subWorkspace);
    else if (this.hairwashMode === 3) this.renderHairwashSlotPuzzle(subWorkspace);
  }

  switchHairwashMode(m) {
    soundManager.playClick();
    this.hairwashMode = m;
    this.currentHairwashStep = 1;
    this.hairGameUserStep = 1;

    if (m === 2) {
      this.hairGameShuffledSteps = [...this.hairwash6Steps].sort(() => Math.random() - 0.5);
    } else if (m === 3) {
      this.hairSlotPlacedSteps = [null, null, null, null, null, null];
      this.hairCurrentTargetSlotIdx = 0;
      this.hairSlotShuffledCards = [...this.hairwash6Steps].sort(() => Math.random() - 0.5);
    }

    const workspace = document.getElementById('selfMgmtSubWorkspace');
    if (workspace) this.renderHairwash(workspace);
  }

  speakHairwashModeInfo() {
    if (this.hairwashMode === 1) ttsManager.speak("머리감기 일단계부터 육단계까지 차례대로 실습하며 순서를 익혀보세요!");
    else if (this.hairwashMode === 2) ttsManager.speak("섞여 있는 머리감기 동작을 일단계부터 육단계까지 순서대로 클릭해보세요!");
    else if (this.hairwashMode === 3) ttsManager.speak("아래 머리감기 동작 카드를 클릭하여 육칸 슬롯에 올바른 순서대로 넣어보세요!");
  }

  /* Hairwash Practice */
  renderHairwashPractice(workspace) {
    const curStepObj = this.hairwash6Steps[this.currentHairwashStep - 1];

    workspace.innerHTML = `
      <div style="text-align:center;">
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.05); padding:0.75rem 1.25rem; border-radius:14px; margin-bottom:1rem; font-weight:700;">
          <div>📌 머리감기 실습 진행률</div>
          <div>🧴 <span style="color:#2b6cb0; font-size:1.3rem;">${this.getStepKr(this.currentHairwashStep)}</span> / 육단계</div>
        </div>

        <div style="display:grid; grid-template-columns: repeat(6, 1fr); gap:0.4rem; margin-bottom:1.5rem;">
          ${this.hairwash6Steps.map(s => `
            <div style="padding:0.5rem 0.2rem; border-radius:10px; font-weight:800; font-size:0.85rem; border:2px solid ${s.step===this.currentHairwashStep?'#38a169':(s.step<this.currentHairwashStep?'#cbd5e1':'#edf2f7')}; background:${s.step===this.currentHairwashStep?'#f0fdf4':(s.step<this.currentHairwashStep?'#e2e8f0':'#fff')}; color:${s.step===this.currentHairwashStep?'#15803d':'#64748b'};">
              <div>${s.emoji}</div>
              <div>${this.getStepKr(s.step)}</div>
            </div>
          `).join('')}
        </div>

        <div class="clip-theme-card" style="padding:2.2rem; background:#fffbe6; border:4px solid #d69e2e; margin-bottom:1.5rem; border-radius:22px;">
          <div style="font-size:5.5rem; margin-bottom:0.5rem;">${curStepObj.emoji}</div>
          <h2 style="font-size:2rem; color:#744210; font-family:var(--font-family-friendly); margin-bottom:0.75rem;">${curStepObj.title}</h2>
          <p style="font-size:1.3rem; color:#2d3748; font-weight:700; line-height:1.6; margin:0;">${curStepObj.desc}</p>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center;">
          <button class="primary-btn" ${this.currentHairwashStep===1?'disabled':''} onclick="selfManagementManager.prevHairwashStep()"><i class="fa-solid fa-arrow-left"></i> 이전 단계</button>
          
          <button class="primary-btn" style="font-size:1.1rem; padding:0.75rem 1.4rem; background:#d69e2e;" onclick="ttsManager.speak('${curStepObj.audio}')">
            🔊 설명 다시 듣기
          </button>

          <button class="primary-btn pulse" style="background:#38a169;" onclick="selfManagementManager.nextHairwashStep()">
            ${this.currentHairwashStep === 6 ? '머리감기 육단계 완료! 🎉' : '다음 단계 🧴 <i class="fa-solid fa-arrow-right"></i>'}
          </button>
        </div>
      </div>
    `;

    ttsManager.speak(curStepObj.audio);
  }

  nextHairwashStep() {
    soundManager.playClick();
    if (this.currentHairwashStep < 6) {
      this.currentHairwashStep++;
      const workspace = document.getElementById('hairwashSubWorkspace');
      if (workspace) this.renderHairwashPractice(workspace);
    } else {
      soundManager.playCelebration();
      appState.addStar(1);
      ttsManager.speak("축하합니다! 올바른 머리감기 일단계부터 육단계까지 모두 참 잘 마쳤습니다!");
      appState.showCelebrationModal("머리감기 실습 완수!", "물 적시기, 샴푸 거품, 두피 마사지, 헹구기, 린스, 드라이까지 머리가 뽀송뽀송해졌어요! 🧴✨");
    }
  }

  prevHairwashStep() {
    soundManager.playClick();
    if (this.currentHairwashStep > 1) {
      this.currentHairwashStep--;
      const workspace = document.getElementById('hairwashSubWorkspace');
      if (workspace) this.renderHairwashPractice(workspace);
    }
  }

  /* Hairwash Quiz */
  renderHairwashGame(workspace) {
    const isCompleted = (this.hairGameUserStep > 6);
    const targetStepObj = this.hairwash6Steps[this.hairGameUserStep - 1];

    workspace.innerHTML = `
      <div style="text-align:center;">
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.05); padding:0.75rem 1.25rem; border-radius:14px; margin-bottom:1rem; font-weight:700;">
          <div>📌 머리감기 순서 찾기 퀴즈</div>
          <div>🎯 찾을 목표: <span style="color:#e53e3e; font-size:1.3rem;">${isCompleted ? '완료!' : this.getStepKr(this.hairGameUserStep) + ' 동작'}</span></div>
        </div>

        ${!isCompleted ? `
          <div class="clip-theme-card" style="padding:1.5rem; background:#fffbe6; border:4px solid #3182ce; margin-bottom:1.5rem; border-radius:20px;">
            <h3 style="font-size:1.4rem; color:#2b6cb0; margin:0;">
              👉 다음으로 올바른 <span style="color:#e53e3e; font-size:1.6rem; font-weight:800;">${this.getStepKr(this.hairGameUserStep)}</span> 머리감기 동작 카드를 클릭하세요!
            </h3>
          </div>
        ` : ''}

        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:1rem; margin-bottom:1.5rem;">
          ${this.hairGameShuffledSteps.map(s => {
            let isPassed = (s.step < this.hairGameUserStep);
            return `
              <button class="btn-choice" style="padding:1.25rem; border-radius:18px; ${isPassed?'background:#f0fdf4; border:3px solid #22c55e; opacity:0.6;':''}" ${isPassed||isCompleted?'disabled':''} onclick="selfManagementManager.checkHairwashGameStep(${s.step}, this)">
                <div style="font-size:3.5rem; margin-bottom:0.4rem;">${s.emoji}</div>
                <div style="font-size:1.15rem; font-weight:800; color:#2d3748;">${s.cleanTitle}</div>
              </button>
            `;
          }).join('')}
        </div>

        ${isCompleted ? `
          <div class="clip-theme-card" style="padding:1.75rem; background:#f0fdf4; border:4px solid #22c55e; margin-bottom:1.5rem; text-align:center;">
            <h2 style="color:#15803d; margin-bottom:0.5rem;">🎉 머리감기 순서 맞추기 완벽 성공! ⭐</h2>
            <p style="font-size:1.15rem; color:#276749;">일단계부터 육단계까지 순서대로 정확히 맞췄습니다!</p>
            <button class="primary-btn" style="font-size:1.1rem; padding:0.75rem 1.5rem; background:#38a169;" onclick="selfManagementManager.switchHairwashMode(2)">
              다시 도전하기 🔄
            </button>
          </div>
        ` : ''}
      </div>
    `;

    if (!isCompleted && targetStepObj) {
      ttsManager.speak(`머리감기 ${this.getStepKr(this.hairGameUserStep)} 동작 카드를 찾아 클릭하세요!`);
    }
  }

  checkHairwashGameStep(stepNum, btn) {
    if (stepNum === this.hairGameUserStep) {
      soundManager.playCorrect();
      btn.classList.add('correct');
      const stepObj = this.hairwash6Steps[stepNum - 1];

      this.hairGameUserStep++;

      if (this.hairGameUserStep <= 6) {
        ttsManager.speak(`정답입니다! ${stepObj.cleanTitle} 성공! 다음 ${this.getStepKr(this.hairGameUserStep)}를 찾아보세요!`);
      } else {
        soundManager.playCelebration();
        appState.addStar(1);
        ttsManager.speak("축하합니다! 머리감기 일단계부터 육단계까지 올바른 순서대로 완벽하게 성공했어요!");
        appState.showCelebrationModal("위생 수칙 마스터!", "올바른 머리감기 순서 맞추기를 완벽하게 성공했습니다! 🧴⭐");
      }

      const workspace = document.getElementById('hairwashSubWorkspace');
      if (workspace) this.renderHairwashGame(workspace);
    } else {
      soundManager.playWrong();
      btn.classList.add('wrong');
      setTimeout(() => btn.classList.remove('wrong'), 800);
      ttsManager.speak(`아쉬워요! 지금 찾아야 할 단계는 ${this.getStepKr(this.hairGameUserStep)}입니다. 다시 확인해 보세요!`);
    }
  }

  /* Hairwash Slot Puzzle */
  renderHairwashSlotPuzzle(workspace) {
    const isAllPlaced = this.hairSlotPlacedSteps.every(s => s !== null);
    const activeSlotStep = this.hairCurrentTargetSlotIdx + 1;

    workspace.innerHTML = `
      <div style="text-align:center;">
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.05); padding:0.75rem 1.25rem; border-radius:14px; margin-bottom:1rem; font-weight:700;">
          <div>📌 육칸 슬롯 순서 배치 퍼즐 (머리감기)</div>
          <div>🎯 채울 슬롯: <span style="color:#8b5cf6; font-size:1.3rem;">${isAllPlaced ? '육칸 완벽 완성! 🎉' : this.getStepKr(activeSlotStep) + ' 슬롯'}</span></div>
        </div>

        <div class="clip-theme-card" style="padding:1.25rem; background:#fffbe6; border:3px solid #8b5cf6; margin-bottom:1.25rem; border-radius:18px;">
          <p style="font-size:1.15rem; color:#4a5568; font-weight:700; margin:0;">
            ${isAllPlaced 
              ? '🎉 육칸 슬롯에 머리감기 단계를 완벽하게 채웠습니다!' 
              : `아래 섞여 있는 동작 카드를 클릭하여 <span style="color:#8b5cf6; font-size:1.3rem; font-weight:800;">${this.getStepKr(activeSlotStep)} 슬롯</span>에 순서대로 넣으세요! (맞으면 쏙 들어가고 틀리면 튕겨나갑니다!)`}
          </p>
        </div>

        <h4 style="margin-bottom:0.75rem; color:#2b6cb0; font-weight:800; text-align:left;">📥 순서 슬롯 (일단계 ➔ 육단계):</h4>
        <div style="display:grid; grid-template-columns: repeat(6, 1fr); gap:0.5rem; margin-bottom:1.5rem;">
          ${this.hairSlotPlacedSteps.map((placedObj, idx) => {
            const stepNum = idx + 1;
            const isActive = (idx === this.hairCurrentTargetSlotIdx && !isAllPlaced);
            if (placedObj) {
              return `
                <div style="background:#f0fdf4; border:3px solid #22c55e; border-radius:14px; padding:0.6rem 0.3rem; text-align:center; animation:popIn 0.3s ease;">
                  <div style="font-size:2.2rem; margin-bottom:0.2rem;">${placedObj.emoji}</div>
                  <div style="font-size:0.8rem; font-weight:800; color:#15803d;">${this.getStepKr(stepNum)}</div>
                  <div style="font-size:0.7rem; color:#276749; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${placedObj.shortTitle}</div>
                </div>
              `;
            } else {
              return `
                <div style="background:${isActive?'#fffbe6':'#edf2f7'}; border:3px dashed ${isActive?'#8b5cf6':'#cbd5e1'}; border-radius:14px; padding:0.8rem 0.3rem; text-align:center; color:${isActive?'#6b21a8':'#a0aec0'}; ${isActive?'box-shadow:0 0 10px rgba(139,92,246,0.3);':''}">
                  <div style="font-size:1.8rem; margin-bottom:0.2rem;">${isActive?'❓':'🔒'}</div>
                  <div style="font-size:0.85rem; font-weight:800;">${this.getStepKr(stepNum)}</div>
                  <div style="font-size:0.7rem;">${isActive?'[대기중]':'빈 슬롯'}</div>
                </div>
              `;
            }
          }).join('')}
        </div>

        <h4 style="margin-bottom:0.75rem; color:#4a5568; font-weight:800; text-align:left;">🎴 섞여 있는 머리감기 동작 카드를 클릭하세요:</h4>
        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:0.9rem; margin-bottom:1.5rem;">
          ${this.hairSlotShuffledCards.map(s => {
            const isAlreadyPlaced = this.hairSlotPlacedSteps.some(p => p && p.step === s.step);
            return `
              <button id="hairSlotCard_${s.step}" class="btn-choice" style="padding:1rem; border-radius:16px; ${isAlreadyPlaced?'opacity:0.25; pointer-events:none;':''}" ${isAlreadyPlaced||isAllPlaced?'disabled':''} onclick="selfManagementManager.tryPlaceHairSlotCard(${s.step}, this)">
                <div style="font-size:3rem; margin-bottom:0.3rem;">${s.emoji}</div>
                <div style="font-size:1.1rem; font-weight:800; color:#2d3748;">${s.cleanTitle}</div>
              </button>
            `;
          }).join('')}
        </div>

        ${isAllPlaced ? `
          <div class="clip-theme-card" style="padding:1.75rem; background:#f0fdf4; border:4px solid #22c55e; margin-bottom:1.5rem; text-align:center;">
            <h2 style="color:#15803d; margin-bottom:0.5rem;">🎉 육칸 슬롯 퍼즐 완벽 성공! ⭐</h2>
            <p style="font-size:1.15rem; color:#276749;">일단계부터 육단계까지 육칸을 순서대로 완벽히 맞췄습니다!</p>
            <button class="primary-btn" style="font-size:1.1rem; padding:0.75rem 1.5rem; background:#8b5cf6;" onclick="selfManagementManager.switchHairwashMode(3)">
              다시 도전하기 🔄
            </button>
          </div>
        ` : ''}

        <div style="display:flex; justify-content:center;">
          <button class="primary-btn" style="background:#e2e8f0; color:#475569;" onclick="selfManagementManager.switchHairwashMode(3)">
            <i class="fa-solid fa-rotate-left"></i> 슬롯 처음부터 다시 맞추기
          </button>
        </div>
      </div>
    `;

    if (!isAllPlaced) {
      ttsManager.speak(`아래 동작 카드 중 ${this.getStepKr(activeSlotStep)}에 알맞은 카드를 클릭하세요!`);
    }
  }

  tryPlaceHairSlotCard(stepNum, btnElem) {
    const targetStepNeeded = this.hairCurrentTargetSlotIdx + 1;
    const clickedStepObj = this.hairwash6Steps[stepNum - 1];

    if (stepNum === targetStepNeeded) {
      soundManager.playCorrect();
      btnElem.classList.add('correct');

      this.hairSlotPlacedSteps[this.hairCurrentTargetSlotIdx] = clickedStepObj;
      this.hairCurrentTargetSlotIdx++;

      if (this.hairCurrentTargetSlotIdx < 6) {
        ttsManager.speak(`정답입니다! ${clickedStepObj.shortTitle} 동작이 ${this.getStepKr(targetStepNeeded)} 슬롯에 쏙 들어갔어요! 다음 ${this.getStepKr(this.hairCurrentTargetSlotIdx + 1)}를 골라보세요!`);
      } else {
        soundManager.playCelebration();
        appState.addStar(1);
        ttsManager.speak("축하합니다! 육칸 슬롯에 머리감기 단계를 순서대로 완벽하게 맞췄습니다!");
        appState.showCelebrationModal("육칸 슬롯 완성 퍼즐 완수!", "머리감기 단계를 육칸 안에 정확한 순서대로 완벽히 집어넣었습니다! 🧴⭐");
      }

      const workspace = document.getElementById('hairwashSubWorkspace');
      if (workspace) this.renderHairwashSlotPuzzle(workspace);

    } else {
      soundManager.playWrong();
      btnElem.classList.add('wrong');
      btnElem.style.transform = "translateX(15px)";
      setTimeout(() => {
        btnElem.style.transform = "translateX(-15px)";
        setTimeout(() => {
          btnElem.style.transform = "none";
          btnElem.classList.remove('wrong');
        }, 150);
      }, 150);

      ttsManager.speak(`아쉬워요! 튕겨나갑니다! 지금 채울 칸은 ${this.getStepKr(targetStepNeeded)} 슬롯입니다!`);
    }
  }

  /* --------------------------------------------------------------------------
     3. Body Washing (목욕하기)
     -------------------------------------------------------------------------- */
  renderBodywash(workspace) {
    let modeTitle = "";
    if (this.bodywashMode === 1) modeTitle = "1모드: 올바른 목욕하기 순서 실습 (일단계~육단계)";
    else if (this.bodywashMode === 2) modeTitle = "2모드: 목욕하기 순서 맞추기 퀴즈 (일단계~육단계)";
    else if (this.bodywashMode === 3) modeTitle = "3모드: 육칸 슬롯 순서 배치 퍼즐 (스냅 & 튕기기)";

    workspace.innerHTML = `
      <div class="activity-header">
        <div class="activity-header-text">
          <h2>🛁 올바른 목욕하기 (위생 수칙 육단계)</h2>
          <p>${modeTitle}</p>
        </div>
        <button class="speak-btn" onclick="selfManagementManager.speakBodywashModeInfo()"><i class="fa-solid fa-volume-high"></i></button>
      </div>

      <div style="display:flex; gap:0.5rem; justify-content:center; flex-wrap:wrap; margin-bottom:1.25rem;">
        <button class="primary-btn ${this.bodywashMode===1?'pulse':''}" style="padding:0.6rem 1.1rem; font-size:0.95rem; background:${this.bodywashMode===1?'#38a169':'#64748b'};" onclick="selfManagementManager.switchBodywashMode(1)">1모드: 순서 실습</button>
        <button class="primary-btn ${this.bodywashMode===2?'pulse':''}" style="padding:0.6rem 1.1rem; font-size:0.95rem; background:${this.bodywashMode===2?'#3182ce':'#64748b'};" onclick="selfManagementManager.switchBodywashMode(2)">2모드: 순서 퀴즈</button>
        <button class="primary-btn ${this.bodywashMode===3?'pulse':''}" style="padding:0.6rem 1.1rem; font-size:0.95rem; background:${this.bodywashMode===3?'#8b5cf6':'#64748b'};" onclick="selfManagementManager.switchBodywashMode(3)">3모드: 육칸 슬롯 퍼즐 게임</button>
      </div>

      <div id="bodywashSubWorkspace" style="max-width:800px; margin: 0 auto;"></div>
    `;

    const subWorkspace = document.getElementById('bodywashSubWorkspace');
    if (this.bodywashMode === 1) this.renderBodywashPractice(subWorkspace);
    else if (this.bodywashMode === 2) this.renderBodywashGame(subWorkspace);
    else if (this.bodywashMode === 3) this.renderBodywashSlotPuzzle(subWorkspace);
  }

  switchBodywashMode(m) {
    soundManager.playClick();
    this.bodywashMode = m;
    this.currentBodywashStep = 1;
    this.bodyGameUserStep = 1;

    if (m === 2) {
      this.bodyGameShuffledSteps = [...this.bodywash6Steps].sort(() => Math.random() - 0.5);
    } else if (m === 3) {
      this.bodySlotPlacedSteps = [null, null, null, null, null, null];
      this.bodyCurrentTargetSlotIdx = 0;
      this.bodySlotShuffledCards = [...this.bodywash6Steps].sort(() => Math.random() - 0.5);
    }

    const workspace = document.getElementById('selfMgmtSubWorkspace');
    if (workspace) this.renderBodywash(workspace);
  }

  speakBodywashModeInfo() {
    if (this.bodywashMode === 1) ttsManager.speak("목욕하기 일단계부터 육단계까지 차례대로 실습하며 순서를 익혀보세요!");
    else if (this.bodywashMode === 2) ttsManager.speak("섞여 있는 목욕하기 동작을 일단계부터 육단계까지 순서대로 클릭해보세요!");
    else if (this.bodywashMode === 3) ttsManager.speak("아래 목욕하기 동작 카드를 클릭하여 육칸 슬롯에 올바른 순서대로 넣어보세요!");
  }

  /* Bodywash Practice */
  renderBodywashPractice(workspace) {
    const curStepObj = this.bodywash6Steps[this.currentBodywashStep - 1];

    workspace.innerHTML = `
      <div style="text-align:center;">
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.05); padding:0.75rem 1.25rem; border-radius:14px; margin-bottom:1rem; font-weight:700;">
          <div>📌 목욕하기 실습 진행률</div>
          <div>🛁 <span style="color:#2b6cb0; font-size:1.3rem;">${this.getStepKr(this.currentBodywashStep)}</span> / 육단계</div>
        </div>

        <div style="display:grid; grid-template-columns: repeat(6, 1fr); gap:0.4rem; margin-bottom:1.5rem;">
          ${this.bodywash6Steps.map(s => `
            <div style="padding:0.5rem 0.2rem; border-radius:10px; font-weight:800; font-size:0.85rem; border:2px solid ${s.step===this.currentBodywashStep?'#38a169':(s.step<this.currentBodywashStep?'#cbd5e1':'#edf2f7')}; background:${s.step===this.currentBodywashStep?'#f0fdf4':(s.step<this.currentBodywashStep?'#e2e8f0':'#fff')}; color:${s.step===this.currentBodywashStep?'#15803d':'#64748b'};">
              <div>${s.emoji}</div>
              <div>${this.getStepKr(s.step)}</div>
            </div>
          `).join('')}
        </div>

        <div class="clip-theme-card" style="padding:2.2rem; background:#ebf8ff; border:4px solid #3182ce; margin-bottom:1.5rem; border-radius:22px;">
          <div style="font-size:5.5rem; margin-bottom:0.5rem;">${curStepObj.emoji}</div>
          <h2 style="font-size:2rem; color:#2b6cb0; font-family:var(--font-family-friendly); margin-bottom:0.75rem;">${curStepObj.title}</h2>
          <p style="font-size:1.3rem; color:#2d3748; font-weight:700; line-height:1.6; margin:0;">${curStepObj.desc}</p>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center;">
          <button class="primary-btn" ${this.currentBodywashStep===1?'disabled':''} onclick="selfManagementManager.prevBodywashStep()"><i class="fa-solid fa-arrow-left"></i> 이전 단계</button>
          
          <button class="primary-btn" style="font-size:1.1rem; padding:0.75rem 1.4rem; background:#3182ce;" onclick="ttsManager.speak('${curStepObj.audio}')">
            🔊 설명 다시 듣기
          </button>

          <button class="primary-btn pulse" style="background:#38a169;" onclick="selfManagementManager.nextBodywashStep()">
            ${this.currentBodywashStep === 6 ? '목욕하기 육단계 완료! 🎉' : '다음 단계 🛁 <i class="fa-solid fa-arrow-right"></i>'}
          </button>
        </div>
      </div>
    `;

    ttsManager.speak(curStepObj.audio);
  }

  nextBodywashStep() {
    soundManager.playClick();
    if (this.currentBodywashStep < 6) {
      this.currentBodywashStep++;
      const workspace = document.getElementById('bodywashSubWorkspace');
      if (workspace) this.renderBodywashPractice(workspace);
    } else {
      soundManager.playCelebration();
      appState.addStar(1);
      ttsManager.speak("축하합니다! 올바른 목욕하기 일단계부터 육단계까지 모두 참 잘 마쳤습니다!");
      appState.showCelebrationModal("목욕하기 실습 완수!", "온몸 적시기, 거품 타월, 상체/하체 닦기, 헹구기, 로션 바르기까지 아주 깨끗해졌어요! 🛁✨");
    }
  }

  prevBodywashStep() {
    soundManager.playClick();
    if (this.currentBodywashStep > 1) {
      this.currentBodywashStep--;
      const workspace = document.getElementById('bodywashSubWorkspace');
      if (workspace) this.renderBodywashPractice(workspace);
    }
  }

  /* Bodywash Quiz */
  renderBodywashGame(workspace) {
    const isCompleted = (this.bodyGameUserStep > 6);
    const targetStepObj = this.bodywash6Steps[this.bodyGameUserStep - 1];

    workspace.innerHTML = `
      <div style="text-align:center;">
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.05); padding:0.75rem 1.25rem; border-radius:14px; margin-bottom:1rem; font-weight:700;">
          <div>📌 목욕하기 순서 찾기 퀴즈</div>
          <div>🎯 찾을 목표: <span style="color:#e53e3e; font-size:1.3rem;">${isCompleted ? '완료!' : this.getStepKr(this.bodyGameUserStep) + ' 동작'}</span></div>
        </div>

        ${!isCompleted ? `
          <div class="clip-theme-card" style="padding:1.5rem; background:#fffbe6; border:4px solid #3182ce; margin-bottom:1.5rem; border-radius:20px;">
            <h3 style="font-size:1.4rem; color:#2b6cb0; margin:0;">
              👉 다음으로 올바른 <span style="color:#e53e3e; font-size:1.6rem; font-weight:800;">${this.getStepKr(this.bodyGameUserStep)}</span> 목욕하기 동작 카드를 클릭하세요!
            </h3>
          </div>
        ` : ''}

        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:1rem; margin-bottom:1.5rem;">
          ${this.bodyGameShuffledSteps.map(s => {
            let isPassed = (s.step < this.bodyGameUserStep);
            return `
              <button class="btn-choice" style="padding:1.25rem; border-radius:18px; ${isPassed?'background:#f0fdf4; border:3px solid #22c55e; opacity:0.6;':''}" ${isPassed||isCompleted?'disabled':''} onclick="selfManagementManager.checkBodywashGameStep(${s.step}, this)">
                <div style="font-size:3.5rem; margin-bottom:0.4rem;">${s.emoji}</div>
                <div style="font-size:1.15rem; font-weight:800; color:#2d3748;">${s.cleanTitle}</div>
              </button>
            `;
          }).join('')}
        </div>

        ${isCompleted ? `
          <div class="clip-theme-card" style="padding:1.75rem; background:#f0fdf4; border:4px solid #22c55e; margin-bottom:1.5rem; text-align:center;">
            <h2 style="color:#15803d; margin-bottom:0.5rem;">🎉 목욕하기 순서 맞추기 완벽 성공! ⭐</h2>
            <p style="font-size:1.15rem; color:#276749;">일단계부터 육단계까지 순서대로 정확히 맞췄습니다!</p>
            <button class="primary-btn" style="font-size:1.1rem; padding:0.75rem 1.5rem; background:#38a169;" onclick="selfManagementManager.switchBodywashMode(2)">
              다시 도전하기 🔄
            </button>
          </div>
        ` : ''}
      </div>
    `;

    if (!isCompleted && targetStepObj) {
      ttsManager.speak(`목욕하기 ${this.getStepKr(this.bodyGameUserStep)} 동작 카드를 찾아 클릭하세요!`);
    }
  }

  checkBodywashGameStep(stepNum, btn) {
    if (stepNum === this.bodyGameUserStep) {
      soundManager.playCorrect();
      btn.classList.add('correct');
      const stepObj = this.bodywash6Steps[stepNum - 1];

      this.bodyGameUserStep++;

      if (this.bodyGameUserStep <= 6) {
        ttsManager.speak(`정답입니다! ${stepObj.cleanTitle} 성공! 다음 ${this.getStepKr(this.bodyGameUserStep)}를 찾아보세요!`);
      } else {
        soundManager.playCelebration();
        appState.addStar(1);
        ttsManager.speak("축하합니다! 목욕하기 일단계부터 육단계까지 올바른 순서대로 완벽하게 성공했어요!");
        appState.showCelebrationModal("위생 수칙 마스터!", "올바른 목욕하기 순서 맞추기를 완벽하게 성공했습니다! 🛁⭐");
      }

      const workspace = document.getElementById('bodywashSubWorkspace');
      if (workspace) this.renderBodywashGame(workspace);
    } else {
      soundManager.playWrong();
      btn.classList.add('wrong');
      setTimeout(() => btn.classList.remove('wrong'), 800);
      ttsManager.speak(`아쉬워요! 지금 찾아야 할 단계는 ${this.getStepKr(this.bodyGameUserStep)}입니다. 다시 확인해 보세요!`);
    }
  }

  /* Bodywash Slot Puzzle */
  renderBodywashSlotPuzzle(workspace) {
    const isAllPlaced = this.bodySlotPlacedSteps.every(s => s !== null);
    const activeSlotStep = this.bodyCurrentTargetSlotIdx + 1;

    workspace.innerHTML = `
      <div style="text-align:center;">
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.05); padding:0.75rem 1.25rem; border-radius:14px; margin-bottom:1rem; font-weight:700;">
          <div>📌 육칸 슬롯 순서 배치 퍼즐 (목욕하기)</div>
          <div>🎯 채울 슬롯: <span style="color:#8b5cf6; font-size:1.3rem;">${isAllPlaced ? '육칸 완벽 완성! 🎉' : this.getStepKr(activeSlotStep) + ' 슬롯'}</span></div>
        </div>

        <div class="clip-theme-card" style="padding:1.25rem; background:#fffbe6; border:3px solid #8b5cf6; margin-bottom:1.25rem; border-radius:18px;">
          <p style="font-size:1.15rem; color:#4a5568; font-weight:700; margin:0;">
            ${isAllPlaced 
              ? '🎉 육칸 슬롯에 목욕하기 단계를 완벽하게 채웠습니다!' 
              : `아래 섞여 있는 동작 카드를 클릭하여 <span style="color:#8b5cf6; font-size:1.3rem; font-weight:800;">${this.getStepKr(activeSlotStep)} 슬롯</span>에 순서대로 넣으세요! (맞으면 쏙 들어가고 틀리면 튕겨나갑니다!)`}
          </p>
        </div>

        <h4 style="margin-bottom:0.75rem; color:#2b6cb0; font-weight:800; text-align:left;">📥 순서 슬롯 (일단계 ➔ 육단계):</h4>
        <div style="display:grid; grid-template-columns: repeat(6, 1fr); gap:0.5rem; margin-bottom:1.5rem;">
          ${this.bodySlotPlacedSteps.map((placedObj, idx) => {
            const stepNum = idx + 1;
            const isActive = (idx === this.bodyCurrentTargetSlotIdx && !isAllPlaced);
            if (placedObj) {
              return `
                <div style="background:#f0fdf4; border:3px solid #22c55e; border-radius:14px; padding:0.6rem 0.3rem; text-align:center; animation:popIn 0.3s ease;">
                  <div style="font-size:2.2rem; margin-bottom:0.2rem;">${placedObj.emoji}</div>
                  <div style="font-size:0.8rem; font-weight:800; color:#15803d;">${this.getStepKr(stepNum)}</div>
                  <div style="font-size:0.7rem; color:#276749; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${placedObj.shortTitle}</div>
                </div>
              `;
            } else {
              return `
                <div style="background:${isActive?'#fffbe6':'#edf2f7'}; border:3px dashed ${isActive?'#8b5cf6':'#cbd5e1'}; border-radius:14px; padding:0.8rem 0.3rem; text-align:center; color:${isActive?'#6b21a8':'#a0aec0'}; ${isActive?'box-shadow:0 0 10px rgba(139,92,246,0.3);':''}">
                  <div style="font-size:1.8rem; margin-bottom:0.2rem;">${isActive?'❓':'🔒'}</div>
                  <div style="font-size:0.85rem; font-weight:800;">${this.getStepKr(stepNum)}</div>
                  <div style="font-size:0.7rem;">${isActive?'[대기중]':'빈 슬롯'}</div>
                </div>
              `;
            }
          }).join('')}
        </div>

        <h4 style="margin-bottom:0.75rem; color:#4a5568; font-weight:800; text-align:left;">🎴 섞여 있는 목욕하기 동작 카드를 클릭하세요:</h4>
        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:0.9rem; margin-bottom:1.5rem;">
          ${this.bodySlotShuffledCards.map(s => {
            const isAlreadyPlaced = this.bodySlotPlacedSteps.some(p => p && p.step === s.step);
            return `
              <button id="bodySlotCard_${s.step}" class="btn-choice" style="padding:1rem; border-radius:16px; ${isAlreadyPlaced?'opacity:0.25; pointer-events:none;':''}" ${isAlreadyPlaced||isAllPlaced?'disabled':''} onclick="selfManagementManager.tryPlaceBodySlotCard(${s.step}, this)">
                <div style="font-size:3rem; margin-bottom:0.3rem;">${s.emoji}</div>
                <div style="font-size:1.1rem; font-weight:800; color:#2d3748;">${s.cleanTitle}</div>
              </button>
            `;
          }).join('')}
        </div>

        ${isAllPlaced ? `
          <div class="clip-theme-card" style="padding:1.75rem; background:#f0fdf4; border:4px solid #22c55e; margin-bottom:1.5rem; text-align:center;">
            <h2 style="color:#15803d; margin-bottom:0.5rem;">🎉 육칸 슬롯 퍼즐 완벽 성공! ⭐</h2>
            <p style="font-size:1.15rem; color:#276749;">일단계부터 육단계까지 육칸을 순서대로 완벽히 맞췄습니다!</p>
            <button class="primary-btn" style="font-size:1.1rem; padding:0.75rem 1.5rem; background:#8b5cf6;" onclick="selfManagementManager.switchBodywashMode(3)">
              다시 도전하기 🔄
            </button>
          </div>
        ` : ''}

        <div style="display:flex; justify-content:center;">
          <button class="primary-btn" style="background:#e2e8f0; color:#475569;" onclick="selfManagementManager.switchBodywashMode(3)">
            <i class="fa-solid fa-rotate-left"></i> 슬롯 처음부터 다시 맞추기
          </button>
        </div>
      </div>
    `;

    if (!isAllPlaced) {
      ttsManager.speak(`아래 동작 카드 중 ${this.getStepKr(activeSlotStep)}에 알맞은 카드를 클릭하세요!`);
    }
  }

  tryPlaceBodySlotCard(stepNum, btnElem) {
    const targetStepNeeded = this.bodyCurrentTargetSlotIdx + 1;
    const clickedStepObj = this.bodywash6Steps[stepNum - 1];

    if (stepNum === targetStepNeeded) {
      soundManager.playCorrect();
      btnElem.classList.add('correct');

      this.bodySlotPlacedSteps[this.bodyCurrentTargetSlotIdx] = clickedStepObj;
      this.bodyCurrentTargetSlotIdx++;

      if (this.bodyCurrentTargetSlotIdx < 6) {
        ttsManager.speak(`정답입니다! ${clickedStepObj.shortTitle} 동작이 ${this.getStepKr(targetStepNeeded)} 슬롯에 쏙 들어갔어요! 다음 ${this.getStepKr(this.bodyCurrentTargetSlotIdx + 1)}를 골라보세요!`);
      } else {
        soundManager.playCelebration();
        appState.addStar(1);
        ttsManager.speak("축하합니다! 육칸 슬롯에 목욕하기 단계를 순서대로 완벽하게 맞췄습니다!");
        appState.showCelebrationModal("육칸 슬롯 완성 퍼즐 완수!", "목욕하기 단계를 육칸 안에 정확한 순서대로 완벽히 집어넣었습니다! 🛁⭐");
      }

      const workspace = document.getElementById('bodywashSubWorkspace');
      if (workspace) this.renderBodywashSlotPuzzle(workspace);

    } else {
      soundManager.playWrong();
      btnElem.classList.add('wrong');
      btnElem.style.transform = "translateX(15px)";
      setTimeout(() => {
        btnElem.style.transform = "translateX(-15px)";
        setTimeout(() => {
          btnElem.style.transform = "none";
          btnElem.classList.remove('wrong');
        }, 150);
      }, 150);

      ttsManager.speak(`아쉬워요! 튕겨나갑니다! 지금 채울 칸은 ${this.getStepKr(targetStepNeeded)} 슬롯입니다!`);
    }
  }

  /* --------------------------------------------------------------------------
     4. Seasonal Dress-Up Steps (계절별 옷입기 - 한글 단계 명칭)
     -------------------------------------------------------------------------- */
  renderSeasonDressup(workspace) {
    let modeTitle = "";
    if (this.dressupMode === 1) modeTitle = "1모드: 계절별 옷입기 순서 실습";
    else if (this.dressupMode === 2) modeTitle = "2모드: 계절별 옷입기 순서 맞추기 퀴즈";
    else if (this.dressupMode === 3) modeTitle = "3모드: 계절별 슬롯 순서 배치 퍼즐 (스냅 & 튕기기)";

    workspace.innerHTML = `
      <div class="activity-header">
        <div class="activity-header-text">
          <h2>👗 계절별 올바른 옷입기 단계 (여름 / 겨울 / 봄·가을)</h2>
          <p>${modeTitle}</p>
        </div>
        <button class="speak-btn" onclick="selfManagementManager.speakDressModeInfo()"><i class="fa-solid fa-volume-high"></i></button>
      </div>

      <div style="display:flex; gap:0.5rem; justify-content:center; flex-wrap:wrap; margin-bottom:1rem;">
        <button class="primary-btn ${this.selectedSeason==='summer'?'pulse':''}" style="padding:0.6rem 1.1rem; font-size:0.95rem; background:${this.selectedSeason==='summer'?'#e53e3e':'#64748b'};" onclick="selfManagementManager.switchSeason('summer')">☀️ 여름옷 입기 (오단계)</button>
        <button class="primary-btn ${this.selectedSeason==='winter'?'pulse':''}" style="padding:0.6rem 1.1rem; font-size:0.95rem; background:${this.selectedSeason==='winter'?'#3182ce':'#64748b'};" onclick="selfManagementManager.switchSeason('winter')">❄️ 겨울옷 입기 (육단계)</button>
        <button class="primary-btn ${this.selectedSeason==='spring'?'pulse':''}" style="padding:0.6rem 1.1rem; font-size:0.95rem; background:${this.selectedSeason==='spring'?'#d69e2e':'#64748b'};" onclick="selfManagementManager.switchSeason('spring')">🌸 봄·가을옷 입기 (오단계)</button>
      </div>

      <div style="display:flex; gap:0.5rem; justify-content:center; flex-wrap:wrap; margin-bottom:1.25rem;">
        <button class="primary-btn ${this.dressupMode===1?'pulse':''}" style="padding:0.55rem 1rem; font-size:0.9rem; background:${this.dressupMode===1?'#38a169':'#64748b'};" onclick="selfManagementManager.switchDressMode(1)">1모드: 순서 실습</button>
        <button class="primary-btn ${this.dressupMode===2?'pulse':''}" style="padding:0.55rem 1rem; font-size:0.9rem; background:${this.dressupMode===2?'#3182ce':'#64748b'};" onclick="selfManagementManager.switchDressMode(2)">2모드: 순서 퀴즈</button>
        <button class="primary-btn ${this.dressupMode===3?'pulse':''}" style="padding:0.55rem 1rem; font-size:0.9rem; background:${this.dressupMode===3?'#8b5cf6':'#64748b'};" onclick="selfManagementManager.switchDressMode(3)">3모드: 슬롯 퍼즐 게임</button>
      </div>

      <div id="dressSubWorkspace" style="max-width:800px; margin: 0 auto;"></div>
    `;

    const subWorkspace = document.getElementById('dressSubWorkspace');
    if (this.dressupMode === 1) this.renderDressPractice(subWorkspace);
    else if (this.dressupMode === 2) this.renderDressGame(subWorkspace);
    else if (this.dressupMode === 3) this.renderDressSlotPuzzle(subWorkspace);
  }

  switchSeason(s) {
    soundManager.playClick();
    this.selectedSeason = s;
    this.currentDressStep = 1;
    this.dressGameUserStep = 1;

    const dataset = this.seasonDressData[s];
    this.dressGameShuffledSteps = [...dataset].sort(() => Math.random() - 0.5);
    this.dressSlotPlacedSteps = Array(dataset.length).fill(null);
    this.dressCurrentTargetSlotIdx = 0;
    this.dressSlotShuffledCards = [...dataset].sort(() => Math.random() - 0.5);

    const workspace = document.getElementById('selfMgmtSubWorkspace');
    if (workspace) this.renderSeasonDressup(workspace);
  }

  switchDressMode(m) {
    soundManager.playClick();
    this.dressupMode = m;
    this.currentDressStep = 1;
    this.dressGameUserStep = 1;

    const dataset = this.seasonDressData[this.selectedSeason];

    if (m === 2) {
      this.dressGameShuffledSteps = [...dataset].sort(() => Math.random() - 0.5);
    } else if (m === 3) {
      this.dressSlotPlacedSteps = Array(dataset.length).fill(null);
      this.dressCurrentTargetSlotIdx = 0;
      this.dressSlotShuffledCards = [...dataset].sort(() => Math.random() - 0.5);
    }

    const workspace = document.getElementById('selfMgmtSubWorkspace');
    if (workspace) this.renderSeasonDressup(workspace);
  }

  speakDressModeInfo() {
    const seasonNames = { summer: "여름옷", winter: "겨울옷", spring: "봄가을옷" };
    const name = seasonNames[this.selectedSeason];
    if (this.dressupMode === 1) ttsManager.speak(`${name} 입기 단계를 차례대로 실습해보세요!`);
    else if (this.dressupMode === 2) ttsManager.speak(`섞여 있는 ${name} 입기 카드를 순서대로 선택해보세요!`);
    else ttsManager.speak(`아래 카드를 클릭하여 ${name} 입기 슬롯에 순서대로 채워보세요!`);
  }

  /* Dress Practice */
  renderDressPractice(workspace) {
    const dataset = this.seasonDressData[this.selectedSeason];
    const totalSteps = dataset.length;
    const curStepObj = dataset[this.currentDressStep - 1];

    workspace.innerHTML = `
      <div style="text-align:center;">
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.05); padding:0.75rem 1.25rem; border-radius:14px; margin-bottom:1rem; font-weight:700;">
          <div>📌 옷입기 실습 진행률</div>
          <div>👔 <span style="color:#2b6cb0; font-size:1.3rem;">${this.getStepKr(this.currentDressStep)}</span> / ${this.getStepKr(totalSteps)}</div>
        </div>

        <div style="display:grid; grid-template-columns: repeat(${totalSteps}, 1fr); gap:0.4rem; margin-bottom:1.5rem;">
          ${dataset.map(s => `
            <div style="padding:0.5rem 0.2rem; border-radius:10px; font-weight:800; font-size:0.85rem; border:2px solid ${s.step===this.currentDressStep?'#38a169':(s.step<this.currentDressStep?'#cbd5e1':'#edf2f7')}; background:${s.step===this.currentDressStep?'#f0fdf4':(s.step<this.currentDressStep?'#e2e8f0':'#fff')}; color:${s.step===this.currentDressStep?'#15803d':'#64748b'};">
              <div>${s.emoji}</div>
              <div>${this.getStepKr(s.step)}</div>
            </div>
          `).join('')}
        </div>

        <div class="clip-theme-card" style="padding:2.2rem; background:#fffbe6; border:4px solid #f6ad55; margin-bottom:1.5rem; border-radius:22px;">
          <div style="font-size:5.5rem; margin-bottom:0.5rem;">${curStepObj.emoji}</div>
          <h2 style="font-size:2rem; color:#c05621; font-family:var(--font-family-friendly); margin-bottom:0.75rem;">${curStepObj.title}</h2>
          <p style="font-size:1.3rem; color:#2d3748; font-weight:700; line-height:1.6; margin:0;">${curStepObj.desc}</p>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center;">
          <button class="primary-btn" ${this.currentDressStep===1?'disabled':''} onclick="selfManagementManager.prevDressStep()"><i class="fa-solid fa-arrow-left"></i> 이전 단계</button>
          
          <button class="primary-btn" style="font-size:1.1rem; padding:0.75rem 1.4rem; background:#f6ad55;" onclick="ttsManager.speak('${curStepObj.audio}')">
            🔊 설명 다시 듣기
          </button>

          <button class="primary-btn pulse" style="background:#38a169;" onclick="selfManagementManager.nextDressStep()">
            ${this.currentDressStep === totalSteps ? '옷입기 완성! 🎉' : '다음 단계 👔 <i class="fa-solid fa-arrow-right"></i>'}
          </button>
        </div>
      </div>
    `;

    ttsManager.speak(curStepObj.audio);
  }

  nextDressStep() {
    soundManager.playClick();
    const dataset = this.seasonDressData[this.selectedSeason];
    if (this.currentDressStep < dataset.length) {
      this.currentDressStep++;
      const workspace = document.getElementById('dressSubWorkspace');
      if (workspace) this.renderDressPractice(workspace);
    } else {
      soundManager.playCelebration();
      appState.addStar(1);
      const seasonNames = { summer: "여름옷", winter: "겨울옷", spring: "봄가을옷" };
      ttsManager.speak(`축하합니다! ${seasonNames[this.selectedSeason]} 입기를 완벽하게 성공했어요!`);
      appState.showCelebrationModal(`${seasonNames[this.selectedSeason]} 입기 완수!`, "속옷(팬티와 브래지어)부터 겉옷까지 바르게 잘 입었습니다! 👔✨");
    }
  }

  prevDressStep() {
    soundManager.playClick();
    if (this.currentDressStep > 1) {
      this.currentDressStep--;
      const workspace = document.getElementById('dressSubWorkspace');
      if (workspace) this.renderDressPractice(workspace);
    }
  }

  /* Dress Quiz */
  renderDressGame(workspace) {
    const dataset = this.seasonDressData[this.selectedSeason];
    const totalSteps = dataset.length;
    const isCompleted = (this.dressGameUserStep > totalSteps);
    const targetStepObj = dataset[this.dressGameUserStep - 1];

    if (!this.dressGameShuffledSteps || this.dressGameShuffledSteps.length !== totalSteps) {
      this.dressGameShuffledSteps = [...dataset].sort(() => Math.random() - 0.5);
    }

    workspace.innerHTML = `
      <div style="text-align:center;">
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.05); padding:0.75rem 1.25rem; border-radius:14px; margin-bottom:1rem; font-weight:700;">
          <div>📌 옷입기 순서 찾기 퀴즈</div>
          <div>🎯 찾을 목표: <span style="color:#e53e3e; font-size:1.3rem;">${isCompleted ? '완료!' : this.getStepKr(this.dressGameUserStep) + ' 동작'}</span></div>
        </div>

        ${!isCompleted ? `
          <div class="clip-theme-card" style="padding:1.5rem; background:#fffbe6; border:4px solid #3182ce; margin-bottom:1.5rem; border-radius:20px;">
            <h3 style="font-size:1.4rem; color:#2b6cb0; margin:0;">
              👉 다음으로 올바른 <span style="color:#e53e3e; font-size:1.6rem; font-weight:800;">${this.getStepKr(this.dressGameUserStep)}</span> 옷입기 카드를 클릭하세요!
            </h3>
          </div>
        ` : ''}

        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:1rem; margin-bottom:1.5rem;">
          ${this.dressGameShuffledSteps.map(s => {
            let isPassed = (s.step < this.dressGameUserStep);
            return `
              <button class="btn-choice" style="padding:1.25rem; border-radius:18px; ${isPassed?'background:#f0fdf4; border:3px solid #22c55e; opacity:0.6;':''}" ${isPassed||isCompleted?'disabled':''} onclick="selfManagementManager.checkDressGameStep(${s.step}, this)">
                <div style="font-size:3.5rem; margin-bottom:0.4rem;">${s.emoji}</div>
                <div style="font-size:1.15rem; font-weight:800; color:#2d3748;">${s.cleanTitle}</div>
              </button>
            `;
          }).join('')}
        </div>

        ${isCompleted ? `
          <div class="clip-theme-card" style="padding:1.75rem; background:#f0fdf4; border:4px solid #22c55e; margin-bottom:1.5rem; text-align:center;">
            <h2 style="color:#15803d; margin-bottom:0.5rem;">🎉 옷입기 순서 맞추기 완벽 성공! ⭐</h2>
            <p style="font-size:1.15rem; color:#276749;">속옷부터 신발까지 순서대로 완벽하게 맞췄습니다!</p>
            <button class="primary-btn" style="font-size:1.1rem; padding:0.75rem 1.5rem; background:#38a169;" onclick="selfManagementManager.switchDressMode(2)">
              다시 도전하기 🔄
            </button>
          </div>
        ` : ''}
      </div>
    `;

    if (!isCompleted && targetStepObj) {
      ttsManager.speak(`옷입기 ${this.getStepKr(this.dressGameUserStep)} 동작 카드를 찾아 클릭하세요!`);
    }
  }

  checkDressGameStep(stepNum, btn) {
    const dataset = this.seasonDressData[this.selectedSeason];
    const totalSteps = dataset.length;

    if (stepNum === this.dressGameUserStep) {
      soundManager.playCorrect();
      btn.classList.add('correct');
      const stepObj = dataset[stepNum - 1];

      this.dressGameUserStep++;

      if (this.dressGameUserStep <= totalSteps) {
        ttsManager.speak(`정답입니다! ${stepObj.cleanTitle} 성공! 다음 ${this.getStepKr(this.dressGameUserStep)}를 찾아보세요!`);
      } else {
        soundManager.playCelebration();
        appState.addStar(1);
        ttsManager.speak("축하합니다! 옷입기 단계를 올바른 순서대로 완벽하게 성공했어요!");
        appState.showCelebrationModal("옷입기 마스터!", "올바른 옷입기 순서 맞추기를 완벽하게 성공했습니다! 👔⭐");
      }

      const workspace = document.getElementById('dressSubWorkspace');
      if (workspace) this.renderDressGame(workspace);
    } else {
      soundManager.playWrong();
      btn.classList.add('wrong');
      setTimeout(() => btn.classList.remove('wrong'), 800);
      ttsManager.speak(`아쉬워요! 지금 찾아야 할 단계는 ${this.getStepKr(this.dressGameUserStep)}입니다. 다시 확인해 보세요!`);
    }
  }

  /* Dress Slot Puzzle */
  renderDressSlotPuzzle(workspace) {
    const dataset = this.seasonDressData[this.selectedSeason];
    const totalSteps = dataset.length;

    if (!this.dressSlotPlacedSteps || this.dressSlotPlacedSteps.length !== totalSteps) {
      this.dressSlotPlacedSteps = Array(totalSteps).fill(null);
      this.dressCurrentTargetSlotIdx = 0;
      this.dressSlotShuffledCards = [...dataset].sort(() => Math.random() - 0.5);
    }

    const isAllPlaced = this.dressSlotPlacedSteps.every(s => s !== null);
    const activeSlotStep = this.dressCurrentTargetSlotIdx + 1;

    workspace.innerHTML = `
      <div style="text-align:center;">
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.05); padding:0.75rem 1.25rem; border-radius:14px; margin-bottom:1rem; font-weight:700;">
          <div>📌 옷입기 슬롯 순서 배치 퍼즐</div>
          <div>🎯 채울 슬롯: <span style="color:#8b5cf6; font-size:1.3rem;">${isAllPlaced ? '완벽 완성! 🎉' : this.getStepKr(activeSlotStep) + ' 슬롯'}</span></div>
        </div>

        <div class="clip-theme-card" style="padding:1.25rem; background:#fffbe6; border:3px solid #8b5cf6; margin-bottom:1.25rem; border-radius:18px;">
          <p style="font-size:1.15rem; color:#4a5568; font-weight:700; margin:0;">
            ${isAllPlaced 
              ? '🎉 슬롯에 옷입기 단계를 완벽하게 채웠습니다!' 
              : `아래 섞여 있는 카드를 클릭하여 <span style="color:#8b5cf6; font-size:1.3rem; font-weight:800;">${this.getStepKr(activeSlotStep)} 슬롯</span>에 순서대로 넣으세요! (맞으면 쏙 들어가고 틀리면 튕겨나갑니다!)`}
          </p>
        </div>

        <h4 style="margin-bottom:0.75rem; color:#2b6cb0; font-weight:800; text-align:left;">📥 옷입기 순서 슬롯 (일단계 ➔ ${this.getStepKr(totalSteps)}):</h4>
        <div style="display:grid; grid-template-columns: repeat(${totalSteps}, 1fr); gap:0.5rem; margin-bottom:1.5rem;">
          ${this.dressSlotPlacedSteps.map((placedObj, idx) => {
            const stepNum = idx + 1;
            const isActive = (idx === this.dressCurrentTargetSlotIdx && !isAllPlaced);
            if (placedObj) {
              return `
                <div style="background:#f0fdf4; border:3px solid #22c55e; border-radius:14px; padding:0.6rem 0.3rem; text-align:center; animation:popIn 0.3s ease;">
                  <div style="font-size:2.2rem; margin-bottom:0.2rem;">${placedObj.emoji}</div>
                  <div style="font-size:0.8rem; font-weight:800; color:#15803d;">${this.getStepKr(stepNum)}</div>
                  <div style="font-size:0.7rem; color:#276749; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${placedObj.shortTitle}</div>
                </div>
              `;
            } else {
              return `
                <div style="background:${isActive?'#fffbe6':'#edf2f7'}; border:3px dashed ${isActive?'#8b5cf6':'#cbd5e1'}; border-radius:14px; padding:0.8rem 0.3rem; text-align:center; color:${isActive?'#6b21a8':'#a0aec0'}; ${isActive?'box-shadow:0 0 10px rgba(139,92,246,0.3);':''}">
                  <div style="font-size:1.8rem; margin-bottom:0.2rem;">${isActive?'❓':'🔒'}</div>
                  <div style="font-size:0.85rem; font-weight:800;">${this.getStepKr(stepNum)}</div>
                  <div style="font-size:0.7rem;">${isActive?'[대기중]':'빈 슬롯'}</div>
                </div>
              `;
            }
          }).join('')}
        </div>

        <h4 style="margin-bottom:0.75rem; color:#4a5568; font-weight:800; text-align:left;">🎴 섞여 있는 옷입기 카드를 클릭하세요:</h4>
        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:0.9rem; margin-bottom:1.5rem;">
          ${this.dressSlotShuffledCards.map(s => {
            const isAlreadyPlaced = this.dressSlotPlacedSteps.some(p => p && p.step === s.step);
            return `
              <button id="dressSlotCard_${s.step}" class="btn-choice" style="padding:1rem; border-radius:16px; ${isAlreadyPlaced?'opacity:0.25; pointer-events:none;':''}" ${isAlreadyPlaced||isAllPlaced?'disabled':''} onclick="selfManagementManager.tryPlaceDressSlotCard(${s.step}, this)">
                <div style="font-size:3rem; margin-bottom:0.3rem;">${s.emoji}</div>
                <div style="font-size:1.1rem; font-weight:800; color:#2d3748;">${s.cleanTitle}</div>
              </button>
            `;
          }).join('')}
        </div>

        ${isAllPlaced ? `
          <div class="clip-theme-card" style="padding:1.75rem; background:#f0fdf4; border:4px solid #22c55e; margin-bottom:1.5rem; text-align:center;">
            <h2 style="color:#15803d; margin-bottom:0.5rem;">🎉 슬롯 퍼즐 완벽 성공! ⭐</h2>
            <p style="font-size:1.15rem; color:#276749;">속옷부터 신발까지 순서대로 완벽하게 맞췄습니다!</p>
            <button class="primary-btn" style="font-size:1.1rem; padding:0.75rem 1.5rem; background:#8b5cf6;" onclick="selfManagementManager.switchDressMode(3)">
              다시 도전하기 🔄
            </button>
          </div>
        ` : ''}

        <div style="display:flex; justify-content:center;">
          <button class="primary-btn" style="background:#e2e8f0; color:#475569;" onclick="selfManagementManager.switchDressMode(3)">
            <i class="fa-solid fa-rotate-left"></i> 처음부터 다시 맞추기
          </button>
        </div>
      </div>
    `;

    if (!isAllPlaced) {
      ttsManager.speak(`아래 카드 중 ${this.getStepKr(activeSlotStep)}에 알맞은 카드를 클릭하세요!`);
    }
  }

  tryPlaceDressSlotCard(stepNum, btnElem) {
    const dataset = this.seasonDressData[this.selectedSeason];
    const totalSteps = dataset.length;
    const targetStepNeeded = this.dressCurrentTargetSlotIdx + 1;
    const clickedStepObj = dataset[stepNum - 1];

    if (stepNum === targetStepNeeded) {
      soundManager.playCorrect();
      btnElem.classList.add('correct');

      this.dressSlotPlacedSteps[this.dressCurrentTargetSlotIdx] = clickedStepObj;
      this.dressCurrentTargetSlotIdx++;

      if (this.dressCurrentTargetSlotIdx < totalSteps) {
        ttsManager.speak(`정답입니다! ${clickedStepObj.shortTitle} 카드가 ${this.getStepKr(targetStepNeeded)} 슬롯에 쏙 들어갔어요! 다음 ${this.getStepKr(this.dressCurrentTargetSlotIdx + 1)}를 골라보세요!`);
      } else {
        soundManager.playCelebration();
        appState.addStar(1);
        ttsManager.speak("축하합니다! 옷입기 단계를 순서대로 완벽하게 맞췄습니다!");
        appState.showCelebrationModal("슬롯 완성 퍼즐 완수!", "옷입기 단계를 정확한 순서대로 완벽히 집어넣었습니다! 👔⭐");
      }

      const workspace = document.getElementById('dressSubWorkspace');
      if (workspace) this.renderDressSlotPuzzle(workspace);

    } else {
      soundManager.playWrong();
      btnElem.classList.add('wrong');
      btnElem.style.transform = "translateX(15px)";
      setTimeout(() => {
        btnElem.style.transform = "translateX(-15px)";
        setTimeout(() => {
          btnElem.style.transform = "none";
          btnElem.classList.remove('wrong');
        }, 150);
      }, 150);

      ttsManager.speak(`아쉬워요! 튕겨나갑니다! 지금 채울 칸은 ${this.getStepKr(targetStepNeeded)} 슬롯입니다!`);
    }
  }

  /* --------------------------------------------------------------------------
     5. Laundry Classification (세탁 방법 & 옷 색깔 분류 2모드)
     -------------------------------------------------------------------------- */
  renderLaundry(workspace) {
    let modeTitle = "";
    if (this.laundryMode === 1) modeTitle = "1모드: 세탁 방법별 분류 (세탁기 🧺 / 손세탁 🧤 / 세탁소 드라이 🏢)";
    else modeTitle = "2모드: 옷 색깔별 분리수거 (흰 옷 ⚪ / 색깔 옷 🔴)";

    workspace.innerHTML = `
      <div class="activity-header">
        <div class="activity-header-text">
          <h2>🧺 올바른 세탁 분류 (세탁 방법 & 옷 색깔)</h2>
          <p>${modeTitle}</p>
        </div>
        <button class="speak-btn" onclick="selfManagementManager.speakLaundryModeInfo()"><i class="fa-solid fa-volume-high"></i></button>
      </div>

      <div style="display:flex; gap:0.5rem; justify-content:center; flex-wrap:wrap; margin-bottom:1.25rem;">
        <button class="primary-btn ${this.laundryMode===1?'pulse':''}" style="padding:0.6rem 1.15rem; font-size:0.95rem; background:${this.laundryMode===1?'#3182ce':'#64748b'};" onclick="selfManagementManager.switchLaundryMode(1)">1모드: 세탁 방법 분류 (3가지)</button>
        <button class="primary-btn ${this.laundryMode===2?'pulse':''}" style="padding:0.6rem 1.15rem; font-size:0.95rem; background:${this.laundryMode===2?'#e53e3e':'#64748b'};" onclick="selfManagementManager.switchLaundryMode(2)">2모드: 옷 색깔 분리수거 (2가지)</button>
      </div>

      <div id="laundrySubWorkspace" style="max-width:800px; margin: 0 auto;"></div>
    `;

    const subWorkspace = document.getElementById('laundrySubWorkspace');
    if (this.laundryMode === 1) this.renderLaundryMethodQuiz(subWorkspace);
    else this.renderLaundryColorQuiz(subWorkspace);
  }

  switchLaundryMode(m) {
    soundManager.playClick();
    this.laundryMode = m;
    this.laundryIndex = 0;
    if (m === 1) {
      this.shuffledMethodItems = [...this.laundryMethodItems].sort(() => Math.random() - 0.5);
    } else {
      this.shuffledColorItems = [...this.laundryColorItems].sort(() => Math.random() - 0.5);
    }
    const workspace = document.getElementById('selfMgmtSubWorkspace');
    if (workspace) this.renderLaundry(workspace);
  }

  speakLaundryModeInfo() {
    if (this.laundryMode === 1) ttsManager.speak("제시된 옷을 보고 세탁기용, 손세탁용, 세탁소 드라이용 중 올바른 세탁 방법을 선택하세요!");
    else ttsManager.speak("제시된 옷을 흰 옷 바구니와 색깔 옷 바구니 중 올바른 곳으로 분류하세요!");
  }

  /* Laundry Mode 1: Laundry Method (Machine vs Hand vs Dry) */
  renderLaundryMethodQuiz(workspace) {
    if (!this.shuffledMethodItems || this.shuffledMethodItems.length !== this.laundryMethodItems.length) {
      this.shuffledMethodItems = [...this.laundryMethodItems].sort(() => Math.random() - 0.5);
    }
    const total = this.shuffledMethodItems.length;
    const isCompleted = (this.laundryIndex >= total);

    if (isCompleted) {
      workspace.innerHTML = `
        <div class="clip-theme-card" style="padding:2rem; background:#f0fdf4; border:4px solid #22c55e; text-align:center;">
          <h2 style="color:#15803d; margin-bottom:0.75rem;">🎉 세탁 방법 분류 마스터 완벽 성공! ⭐</h2>
          <p style="font-size:1.2rem; color:#276749;">세탁기용, 손세탁용, 세탁소 드라이용을 정확하게 모두 분류해냈습니다!</p>
          <button class="primary-btn" style="font-size:1.1rem; padding:0.75rem 1.5rem; background:#3182ce; margin-top:1rem;" onclick="selfManagementManager.switchLaundryMode(1)">
            다시 도전하기 🔄
          </button>
        </div>
      `;
      soundManager.playCelebration();
      appState.addStar(1);
      ttsManager.speak("축하합니다! 세탁기용, 손세탁용, 세탁소 드라이용을 정확하게 모두 맞췄습니다!");
      appState.showCelebrationModal("세탁 분류 완수!", "올바른 세탁 방법 15가지를 완벽하게 구분했습니다! 🧺🧤🏢");
      return;
    }

    const curItem = this.shuffledMethodItems[this.laundryIndex];

    workspace.innerHTML = `
      <div style="text-align:center;">
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.05); padding:0.75rem 1.25rem; border-radius:14px; margin-bottom:1rem; font-weight:700;">
          <div>📌 세탁 방법 분류 진행률</div>
          <div>🧺 <span style="color:#2b6cb0; font-size:1.3rem;">${this.laundryIndex + 1}</span> / ${total} 개</div>
        </div>

        <div class="clip-theme-card" style="padding:2.2rem; background:#ebf8ff; border:4px solid #3182ce; margin-bottom:1.5rem; border-radius:22px;">
          <div style="font-size:5.5rem; margin-bottom:0.5rem;">${curItem.name.split(' ')[1] || '👕'}</div>
          <h2 style="font-size:2.2rem; color:#2b6cb0; font-family:var(--font-family-friendly); margin-bottom:0.75rem;">${curItem.name}</h2>
          <p style="font-size:1.25rem; color:#4a5568; font-weight:700; margin:0;">👉 이 옷은 어떤 세탁 방법으로 빠는 것이 올바를까요?</p>
        </div>

        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:0.9rem; margin-bottom:1.5rem;">
          <button class="btn-choice" style="padding:1.2rem 0.5rem; border-radius:18px; border:3px solid #3182ce;" onclick="selfManagementManager.checkLaundryMethod('machine', this)">
            <div style="font-size:3rem; margin-bottom:0.3rem;">🧺</div>
            <div style="font-size:1.15rem; font-weight:800; color:#2b6cb0;">세탁기 돌리기</div>
            <div style="font-size:0.85rem; color:#718096; margin-top:0.2rem;">(일반 면/수건/속옷)</div>
          </button>

          <button class="btn-choice" style="padding:1.2rem 0.5rem; border-radius:18px; border:3px solid #d69e2e;" onclick="selfManagementManager.checkLaundryMethod('hand', this)">
            <div style="font-size:3rem; margin-bottom:0.3rem;">🧤</div>
            <div style="font-size:1.15rem; font-weight:800; color:#b7791f;">손세탁하기</div>
            <div style="font-size:0.85rem; color:#718096; margin-top:0.2rem;">(울 니트/목도리/모자)</div>
          </button>

          <button class="btn-choice" style="padding:1.2rem 0.5rem; border-radius:18px; border:3px solid #8b5cf6;" onclick="selfManagementManager.checkLaundryMethod('dry', this)">
            <div style="font-size:3rem; margin-bottom:0.3rem;">🏢</div>
            <div style="font-size:1.15rem; font-weight:800; color:#6b21a8;">세탁소 (드라이)</div>
            <div style="font-size:0.85rem; color:#718096; margin-top:0.2rem;">(코트/정장/실크/패딩)</div>
          </button>
        </div>
      </div>
    `;

    ttsManager.speak(`${curItem.name}! 이 옷은 어디에 세탁해야 할까요? 세탁기, 손세탁, 세탁소 드라이 중 선택하세요!`);
  }

  checkLaundryMethod(chosenType, btnElem) {
    const curItem = this.shuffledMethodItems[this.laundryIndex];

    if (curItem.type === chosenType) {
      soundManager.playCorrect();
      btnElem.classList.add('correct');

      ttsManager.speak(`정답입니다! ${curItem.name}는 ${curItem.typeName}로 빨아야 합니다. ${curItem.desc}`);
      this.laundryIndex++;

      setTimeout(() => {
        const subWorkspace = document.getElementById('laundrySubWorkspace');
        if (subWorkspace) this.renderLaundryMethodQuiz(subWorkspace);
      }, 1400);

    } else {
      soundManager.playWrong();
      btnElem.classList.add('wrong');
      setTimeout(() => btnElem.classList.remove('wrong'), 800);

      ttsManager.speak(`아쉬워요! ${curItem.name}는 ${curItem.typeName}입니다! ${curItem.desc}`);
    }
  }

  /* Laundry Mode 2: Color Sorting (White vs Color) */
  renderLaundryColorQuiz(workspace) {
    if (!this.shuffledColorItems || this.shuffledColorItems.length !== this.laundryColorItems.length) {
      this.shuffledColorItems = [...this.laundryColorItems].sort(() => Math.random() - 0.5);
    }
    const total = this.shuffledColorItems.length;
    const isCompleted = (this.laundryIndex >= total);

    if (isCompleted) {
      workspace.innerHTML = `
        <div class="clip-theme-card" style="padding:2rem; background:#f0fdf4; border:4px solid #22c55e; text-align:center;">
          <h2 style="color:#15803d; margin-bottom:0.75rem;">🎉 옷 색깔 분리수거 완벽 성공! ⭐</h2>
          <p style="font-size:1.2rem; color:#276749;">흰 옷과 색깔 옷을 이염되지 않도록 완벽히 분리해냈습니다!</p>
          <button class="primary-btn" style="font-size:1.1rem; padding:0.75rem 1.5rem; background:#e53e3e; margin-top:1rem;" onclick="selfManagementManager.switchLaundryMode(2)">
            다시 도전하기 🔄
          </button>
        </div>
      `;
      soundManager.playCelebration();
      appState.addStar(1);
      ttsManager.speak("축하합니다! 흰 옷과 색깔 옷 분리수거를 완벽하게 해냈습니다!");
      appState.showCelebrationModal("옷 색깔 분리수거 완수!", "흰 옷과 색깔 옷을 완벽하게 구분하여 세탁 준비 완료! ⚪🔴");
      return;
    }

    const curItem = this.shuffledColorItems[this.laundryIndex];

    workspace.innerHTML = `
      <div style="text-align:center;">
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.05); padding:0.75rem 1.25rem; border-radius:14px; margin-bottom:1rem; font-weight:700;">
          <div>📌 옷 색깔 분리수거 진행률</div>
          <div>🧺 <span style="color:#e53e3e; font-size:1.3rem;">${this.laundryIndex + 1}</span> / ${total} 개</div>
        </div>

        <div class="clip-theme-card" style="padding:2.2rem; background:#fff5f5; border:4px solid #e53e3e; margin-bottom:1.5rem; border-radius:22px;">
          <div style="font-size:5.5rem; margin-bottom:0.5rem;">${curItem.name.split(' ')[1] || '👕'}</div>
          <h2 style="font-size:2.2rem; color:#9b2c2c; font-family:var(--font-family-friendly); margin-bottom:0.75rem;">${curItem.name}</h2>
          <p style="font-size:1.25rem; color:#4a5568; font-weight:700; margin:0;">👉 이 옷은 흰 옷 바구니와 색깔 옷 바구니 중 어디에 넣어야 할까요?</p>
        </div>

        <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:1.2rem; margin-bottom:1.5rem;">
          <button class="btn-choice" style="padding:1.5rem; border-radius:20px; border:3px solid #cbd5e0; background:#f7fafc;" onclick="selfManagementManager.checkLaundryColor('white', this)">
            <div style="font-size:3.5rem; margin-bottom:0.3rem;">⚪</div>
            <div style="font-size:1.3rem; font-weight:800; color:#2d3748;">흰 옷 바구니</div>
          </button>

          <button class="btn-choice" style="padding:1.5rem; border-radius:20px; border:3px solid #e53e3e; background:#fff5f5;" onclick="selfManagementManager.checkLaundryColor('color', this)">
            <div style="font-size:3.5rem; margin-bottom:0.3rem;">🔴</div>
            <div style="font-size:1.3rem; font-weight:800; color:#9b2c2c;">색깔 옷 바구니</div>
          </button>
        </div>
      </div>
    `;

    ttsManager.speak(`${curItem.name}! 이 옷은 흰 옷 바구니와 색깔 옷 바구니 중 어느 바구니에 넣어야 할까요?`);
  }

  checkLaundryColor(chosenColor, btnElem) {
    const curItem = this.shuffledColorItems[this.laundryIndex];

    if (curItem.type === chosenColor) {
      soundManager.playCorrect();
      btnElem.classList.add('correct');

      ttsManager.speak(`정답입니다! ${curItem.name}는 ${curItem.typeName} 바구니에 넣어야 세탁할 때 물들지 않아요!`);
      this.laundryIndex++;

      setTimeout(() => {
        const subWorkspace = document.getElementById('laundrySubWorkspace');
        if (subWorkspace) this.renderLaundryColorQuiz(subWorkspace);
      }, 1200);

    } else {
      soundManager.playWrong();
      btnElem.classList.add('wrong');
      setTimeout(() => btnElem.classList.remove('wrong'), 800);

      ttsManager.speak(`아쉬워요! ${curItem.name}는 ${curItem.typeName}입니다. 다시 확인해보세요!`);
    }
  }

  /* --------------------------------------------------------------------------
     6. Supermarket Finance Register Simulation (1모드: 결제 / 2모드: 거스름돈 받기 15문제)
     -------------------------------------------------------------------------- */
  renderFinance(workspace) {
    let modeTitle = "";
    if (this.financeMode === 1) modeTitle = "1모드: 마트 상품 물건값 결제하기 (15문제)";
    else modeTitle = "2모드: 거스름돈(잔돈) 알맞게 받아 챙기기 (15문제)";

    workspace.innerHTML = `
      <div class="activity-header">
        <div class="activity-header-text">
          <h2>💳 마트 계산대 시뮬레이션 (결제 & 거스름돈)</h2>
          <p>${modeTitle}</p>
        </div>
        <button class="speak-btn" onclick="selfManagementManager.speakFinanceModeInfo()"><i class="fa-solid fa-volume-high"></i></button>
      </div>

      <div style="display:flex; gap:0.5rem; justify-content:center; flex-wrap:wrap; margin-bottom:1.25rem;">
        <button class="primary-btn ${this.financeMode===1?'pulse':''}" style="padding:0.6rem 1.15rem; font-size:0.95rem; background:${this.financeMode===1?'#38a169':'#64748b'};" onclick="selfManagementManager.switchFinanceMode(1)">1모드: 물건값 결제하기 (15문제)</button>
        <button class="primary-btn ${this.financeMode===2?'pulse':''}" style="padding:0.6rem 1.15rem; font-size:0.95rem; background:${this.financeMode===2?'#3182ce':'#64748b'};" onclick="selfManagementManager.switchFinanceMode(2)">2모드: 거스름돈(잔돈) 받기 (15문제)</button>
      </div>

      <div id="financeSubWorkspace" style="max-width:800px; margin: 0 auto;"></div>
    `;

    const subWorkspace = document.getElementById('financeSubWorkspace');
    if (this.financeMode === 1) this.renderFinancePayment(subWorkspace);
    else this.renderFinanceChange(subWorkspace);
  }

  switchFinanceMode(m) {
    soundManager.playClick();
    this.financeMode = m;
    if (m === 1) {
      this.financeIndex = 0;
      this.paidMoney = 0;
      this.paidHistory = [];
    } else {
      this.financeChangeIndex = 0;
      this.paidChangeMoney = 0;
      this.paidChangeHistory = [];
    }
    const workspace = document.getElementById('selfMgmtSubWorkspace');
    if (workspace) this.renderFinance(workspace);
  }

  speakFinanceModeInfo() {
    if (this.financeMode === 1) ttsManager.speak("제시된 상품 가격을 보고 지폐와 동전을 내어 정확히 결제해보세요!");
    else ttsManager.speak("낸 돈과 물건 가격을 확인하고, 받아야 할 거스름돈 액수만큼 지폐와 동전을 클릭하여 받으세요!");
  }

  /* Finance Mode 1: Payment */
  renderFinancePayment(workspace) {
    const total = this.financeItems.length;
    const isCompleted = (this.financeIndex >= total);

    if (isCompleted) {
      workspace.innerHTML = `
        <div class="clip-theme-card" style="padding:2.2rem; background:#f0fdf4; border:4px solid #22c55e; text-align:center;">
          <h2 style="color:#15803d; margin-bottom:0.75rem; font-size:2rem;">🎉 마트 물건값 결제 ${total}문제 완수! ⭐</h2>
          <p style="font-size:1.25rem; color:#276749;">지폐와 동전을 올바르게 사용하여 마트에서 ${total}가지 물건을 모두 멋지게 결제했습니다!</p>
          <button class="primary-btn pulse" style="font-size:1.15rem; padding:0.8rem 1.8rem; background:#38a169; margin-top:1.2rem;" onclick="selfManagementManager.restartFinancePayment()">
            ${total}문제 다시 도전하기 🔄
          </button>
        </div>
      `;
      soundManager.playCelebration();
      appState.addStar(1);
      ttsManager.speak(`축하합니다! 마트 계산대 물건값 결제 ${total}문제를 모두 완벽하게 해냈습니다!`);
      appState.showCelebrationModal("기초 금융 결제 완벽 성공!", `마트에서 ${total}가지 상품의 지폐와 동전 계산을 훌륭하게 완수했어요! 🛒💳`);
      return;
    }

    const curItem = this.financeItems[this.financeIndex];

    workspace.innerHTML = `
      <div style="text-align:center;">
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.05); padding:0.75rem 1.25rem; border-radius:14px; margin-bottom:1rem; font-weight:700;">
          <div>📌 1모드: 물건값 결제 진행률</div>
          <div>🛒 <span style="color:#e53e3e; font-size:1.3rem;">${this.financeIndex + 1}</span> / ${total} 문제</div>
        </div>

        <div class="clip-theme-card" style="padding:1.75rem; background:#fffbe6; border:4px solid #38a169; margin-bottom:1.5rem; border-radius:22px;">
          <div style="font-size:4.5rem; margin-bottom:0.3rem;">${curItem.emoji}</div>
          <h3 style="font-size:1.8rem; color:#2b6cb0; margin-bottom:0.5rem;">${curItem.name}</h3>
          <div style="font-size:2rem; font-weight:800; color:#e53e3e; margin-bottom:0.75rem;">
            가격: ${curItem.price.toLocaleString()}원
          </div>
          <div style="font-size:1.25rem; font-weight:700; color:#2d3748; background:#edf2f7; padding:0.6rem 1rem; border-radius:12px; display:inline-block;">
            💳 현재 계산대에 낸 금액: <span id="paidAmtDisplay" style="color:#2563eb; font-size:1.5rem; font-weight:900;">${this.paidMoney.toLocaleString()}원</span>
          </div>
          <div id="paidHistoryList" style="margin-top:0.6rem; font-size:0.95rem; color:#718096; min-height:1.4rem;">
            ${this.paidHistory.length > 0 ? `[ 낸 돈: ${this.paidHistory.map(m => m.toLocaleString() + '원').join(' + ')} ]` : '[ 아래 지폐나 동전을 눌러 돈을 내세요 ]'}
          </div>
        </div>

        <div style="display:grid; grid-template-columns: repeat(5, 1fr); gap:0.6rem; margin-bottom:1.5rem;">
          <button class="btn-choice" style="padding:0.9rem 0.3rem; border-radius:16px; border:2px solid #3182ce; background:#ebf8ff;" onclick="selfManagementManager.addMoney(10000)">
            <div style="font-size:1.8rem;">💵</div>
            <div style="font-size:1rem; font-weight:800; color:#2b6cb0;">10,000원</div>
          </button>
          <button class="btn-choice" style="padding:0.9rem 0.3rem; border-radius:16px; border:2px solid #d69e2e; background:#fffaf0;" onclick="selfManagementManager.addMoney(5000)">
            <div style="font-size:1.8rem;">💵</div>
            <div style="font-size:1rem; font-weight:800; color:#b7791f;">5,000원</div>
          </button>
          <button class="btn-choice" style="padding:0.9rem 0.3rem; border-radius:16px; border:2px solid #38a169; background:#f0fdf4;" onclick="selfManagementManager.addMoney(1000)">
            <div style="font-size:1.8rem;">💵</div>
            <div style="font-size:1rem; font-weight:800; color:#276749;">1,000원</div>
          </button>
          <button class="btn-choice" style="padding:0.9rem 0.3rem; border-radius:16px; border:2px solid #8b5cf6; background:#f5f3ff;" onclick="selfManagementManager.addMoney(500)">
            <div style="font-size:1.8rem;">🪙</div>
            <div style="font-size:1rem; font-weight:800; color:#6b21a8;">500원</div>
          </button>
          <button class="btn-choice" style="padding:0.9rem 0.3rem; border-radius:16px; border:2px solid #718096; background:#f7fafc;" onclick="selfManagementManager.addMoney(100)">
            <div style="font-size:1.8rem;">🪙</div>
            <div style="font-size:1rem; font-weight:800; color:#4a5568;">100원</div>
          </button>
        </div>

        <div style="display:flex; gap:1rem; justify-content:center;">
          <button class="primary-btn" style="background:#718096; padding:0.75rem 1.4rem;" onclick="selfManagementManager.resetMoney()">
            <i class="fa-solid fa-rotate-left"></i> 돈 다시 넣기
          </button>
          <button class="primary-btn pulse" style="background:#38a169; font-size:1.15rem; padding:0.75rem 1.8rem;" onclick="selfManagementManager.checkFinancePayment()">
            계산하기 💳
          </button>
        </div>
      </div>
    `;

    ttsManager.speak(`${curItem.name}! 가격은 ${curItem.price.toLocaleString()}원입니다. 지폐와 동전을 내어 결제하세요!`);
  }

  addMoney(amt) {
    soundManager.playClick();
    this.paidMoney += amt;
    this.paidHistory.push(amt);
    const disp = document.getElementById('paidAmtDisplay');
    if (disp) disp.innerText = `${this.paidMoney.toLocaleString()}원`;
    const histDisp = document.getElementById('paidHistoryList');
    if (histDisp) histDisp.innerText = `[ 낸 돈: ${this.paidHistory.map(m => m.toLocaleString() + '원').join(' + ')} ]`;
    ttsManager.speak(`${amt.toLocaleString()}원 추가`);
  }

  resetMoney() {
    soundManager.playClick();
    this.paidMoney = 0;
    this.paidHistory = [];
    const disp = document.getElementById('paidAmtDisplay');
    if (disp) disp.innerText = "0원";
    const histDisp = document.getElementById('paidHistoryList');
    if (histDisp) histDisp.innerText = "[ 아래 지폐나 동전을 눌러 돈을 내세요 ]";
  }

  checkFinancePayment() {
    const curItem = this.financeItems[this.financeIndex];

    if (this.paidMoney === curItem.price) {
      soundManager.playCorrect();
      appState.addStar(1);

      ttsManager.speak(`정답입니다! ${curItem.name} 가격 ${curItem.price.toLocaleString()}원을 정확하게 결제했습니다!`);
      this.financeIndex++;
      this.paidMoney = 0;
      this.paidHistory = [];

      setTimeout(() => {
        const subWorkspace = document.getElementById('financeSubWorkspace');
        if (subWorkspace) this.renderFinancePayment(subWorkspace);
      }, 1500);

    } else if (this.paidMoney > curItem.price) {
      const change = this.paidMoney - curItem.price;
      soundManager.playCorrect();
      appState.addStar(1);

      ttsManager.speak(`계산 성공! ${curItem.price.toLocaleString()}원보다 많이 내어서 거스름돈 ${change.toLocaleString()}원을 받아 보관합니다!`);
      this.financeIndex++;
      this.paidMoney = 0;
      this.paidHistory = [];

      setTimeout(() => {
        const subWorkspace = document.getElementById('financeSubWorkspace');
        if (subWorkspace) this.renderFinancePayment(subWorkspace);
      }, 1500);

    } else {
      soundManager.playWrong();
      const needed = curItem.price - this.paidMoney;
      ttsManager.speak(`돈이 부족해요! ${curItem.price.toLocaleString()}원까지 ${needed.toLocaleString()}원이 더 필요합니다! 돈을 더 지불해 보세요.`);
    }
  }

  restartFinancePayment() {
    soundManager.playClick();
    this.financeIndex = 0;
    this.paidMoney = 0;
    this.paidHistory = [];
    this.financeItems.sort(() => Math.random() - 0.5);
    const subWorkspace = document.getElementById('financeSubWorkspace');
    if (subWorkspace) this.renderFinancePayment(subWorkspace);
  }

  /* Finance Mode 2: Change Receiving (거스름돈 받기 15문제) */
  renderFinanceChange(workspace) {
    const total = this.financeChangeItems.length;
    const isCompleted = (this.financeChangeIndex >= total);

    if (isCompleted) {
      workspace.innerHTML = `
        <div class="clip-theme-card" style="padding:2.2rem; background:#f0fdf4; border:4px solid #22c55e; text-align:center;">
          <h2 style="color:#15803d; margin-bottom:0.75rem; font-size:2rem;">🎉 거스름돈(잔돈) 받기 ${total}문제 완수! ⭐</h2>
          <p style="font-size:1.25rem; color:#276749;">낸 돈과 물건 가격을 계산하여 ${total}가지 거스름돈을 완벽하게 잘 받아 챙겼습니다!</p>
          <button class="primary-btn pulse" style="font-size:1.15rem; padding:0.8rem 1.8rem; background:#3182ce; margin-top:1.2rem;" onclick="selfManagementManager.restartFinanceChange()">
            거스름돈 ${total}문제 다시 도전하기 🔄
          </button>
        </div>
      `;
      soundManager.playCelebration();
      appState.addStar(1);
      ttsManager.speak(`축하합니다! 마트 거스름돈 받기 ${total}문제를 모두 완벽하게 완료했습니다!`);
      appState.showCelebrationModal("거스름돈 계산 완벽 성공!", `낸 돈에서 물건 가격을 뺀 거스름돈 ${total}가지를 완벽히 받아 챙겼어요! 🪙💵`);
      return;
    }

    const curItem = this.financeChangeItems[this.financeChangeIndex];

    workspace.innerHTML = `
      <div style="text-align:center;">
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.05); padding:0.75rem 1.25rem; border-radius:14px; margin-bottom:1rem; font-weight:700;">
          <div>📌 2모드: 거스름돈(잔돈) 받기 진행률</div>
          <div>🪙 <span style="color:#3182ce; font-size:1.3rem;">${this.financeChangeIndex + 1}</span> / ${total} 문제</div>
        </div>

        <div class="clip-theme-card" style="padding:1.75rem; background:#ebf8ff; border:4px solid #3182ce; margin-bottom:1.5rem; border-radius:22px;">
          <div style="font-size:4.5rem; margin-bottom:0.3rem;">${curItem.emoji}</div>
          <h3 style="font-size:1.8rem; color:#2b6cb0; margin-bottom:0.5rem;">${curItem.name}</h3>
          
          <div style="display:flex; gap:1rem; justify-content:center; flex-wrap:wrap; margin-bottom:1rem;">
            <div style="font-size:1.25rem; font-weight:800; color:#e53e3e; background:#fff; padding:0.5rem 1rem; border-radius:12px; border:2px solid #feb2b2;">
              🛒 물건 가격: ${curItem.price.toLocaleString()}원
            </div>
            <div style="font-size:1.25rem; font-weight:800; color:#2b6cb0; background:#fff; padding:0.5rem 1rem; border-radius:12px; border:2px solid #90cdf4;">
              💵 손님이 낸 돈: ${curItem.paid.toLocaleString()}원
            </div>
          </div>

          <div style="font-size:1.35rem; font-weight:800; color:#2d3748; background:#fffbe6; padding:0.75rem 1.2rem; border-radius:14px; border:3px solid #d69e2e; display:inline-block;">
            ❓ 받아야 할 거스름돈(잔돈): <span style="color:#c05621;">[ ${curItem.paid.toLocaleString()}원 - ${curItem.price.toLocaleString()}원 = ??? ]</span>
          </div>

          <div style="margin-top:0.8rem; font-size:1.2rem; font-weight:700; color:#2563eb;">
            👛 현재 내 지갑에 챙긴 거스름돈: <span id="paidChangeAmtDisplay" style="font-size:1.5rem; font-weight:900;">${this.paidChangeMoney.toLocaleString()}원</span>
          </div>
          <div id="paidChangeHistoryList" style="margin-top:0.4rem; font-size:0.95rem; color:#718096; min-height:1.4rem;">
            ${this.paidChangeHistory.length > 0 ? `[ 챙긴 돈: ${this.paidChangeHistory.map(m => m.toLocaleString() + '원').join(' + ')} ]` : '[ 아래 지폐나 동전을 눌러 거스름돈을 받아 챙기세요 ]'}
          </div>
        </div>

        <div style="display:grid; grid-template-columns: repeat(5, 1fr); gap:0.6rem; margin-bottom:1.5rem;">
          <button class="btn-choice" style="padding:0.9rem 0.3rem; border-radius:16px; border:2px solid #3182ce; background:#ebf8ff;" onclick="selfManagementManager.addChangeMoney(10000)">
            <div style="font-size:1.8rem;">💵</div>
            <div style="font-size:1rem; font-weight:800; color:#2b6cb0;">10,000원</div>
          </button>
          <button class="btn-choice" style="padding:0.9rem 0.3rem; border-radius:16px; border:2px solid #d69e2e; background:#fffaf0;" onclick="selfManagementManager.addChangeMoney(5000)">
            <div style="font-size:1.8rem;">💵</div>
            <div style="font-size:1rem; font-weight:800; color:#b7791f;">5,000원</div>
          </button>
          <button class="btn-choice" style="padding:0.9rem 0.3rem; border-radius:16px; border:2px solid #38a169; background:#f0fdf4;" onclick="selfManagementManager.addChangeMoney(1000)">
            <div style="font-size:1.8rem;">💵</div>
            <div style="font-size:1rem; font-weight:800; color:#276749;">1,000원</div>
          </button>
          <button class="btn-choice" style="padding:0.9rem 0.3rem; border-radius:16px; border:2px solid #8b5cf6; background:#f5f3ff;" onclick="selfManagementManager.addChangeMoney(500)">
            <div style="font-size:1.8rem;">🪙</div>
            <div style="font-size:1rem; font-weight:800; color:#6b21a8;">500원</div>
          </button>
          <button class="btn-choice" style="padding:0.9rem 0.3rem; border-radius:16px; border:2px solid #718096; background:#f7fafc;" onclick="selfManagementManager.addChangeMoney(100)">
            <div style="font-size:1.8rem;">🪙</div>
            <div style="font-size:1rem; font-weight:800; color:#4a5568;">100원</div>
          </button>
        </div>

        <div style="display:flex; gap:1rem; justify-content:center;">
          <button class="primary-btn" style="background:#718096; padding:0.75rem 1.4rem;" onclick="selfManagementManager.resetChangeMoney()">
            <i class="fa-solid fa-rotate-left"></i> 거스름돈 다시 챙기기
          </button>
          <button class="primary-btn pulse" style="background:#3182ce; font-size:1.15rem; padding:0.75rem 1.8rem;" onclick="selfManagementManager.checkFinanceChange()">
            거스름돈 받기 🪙
          </button>
        </div>
      </div>
    `;

    ttsManager.speak(`${curItem.name}! 가격은 ${curItem.price.toLocaleString()}원이고 낸 돈은 ${curItem.paid.toLocaleString()}원입니다. 받아야 할 거스름돈 ${curItem.change.toLocaleString()}원을 지폐와 동전으로 받으세요!`);
  }

  addChangeMoney(amt) {
    soundManager.playClick();
    this.paidChangeMoney += amt;
    this.paidChangeHistory.push(amt);
    const disp = document.getElementById('paidChangeAmtDisplay');
    if (disp) disp.innerText = `${this.paidChangeMoney.toLocaleString()}원`;
    const histDisp = document.getElementById('paidChangeHistoryList');
    if (histDisp) histDisp.innerText = `[ 챙긴 돈: ${this.paidChangeHistory.map(m => m.toLocaleString() + '원').join(' + ')} ]`;
    ttsManager.speak(`${amt.toLocaleString()}원 거스름돈 챙김`);
  }

  resetChangeMoney() {
    soundManager.playClick();
    this.paidChangeMoney = 0;
    this.paidChangeHistory = [];
    const disp = document.getElementById('paidChangeAmtDisplay');
    if (disp) disp.innerText = "0원";
    const histDisp = document.getElementById('paidChangeHistoryList');
    if (histDisp) histDisp.innerText = "[ 아래 지폐나 동전을 눌러 거스름돈을 받아 챙기세요 ]";
  }

  checkFinanceChange() {
    const curItem = this.financeChangeItems[this.financeChangeIndex];

    if (this.paidChangeMoney === curItem.change) {
      soundManager.playCorrect();
      appState.addStar(1);

      ttsManager.speak(`정답입니다! ${curItem.paid.toLocaleString()}원에서 ${curItem.price.toLocaleString()}원을 뺀 거스름돈 ${curItem.change.toLocaleString()}원을 정확하게 받아 챙겼습니다!`);
      this.financeChangeIndex++;
      this.paidChangeMoney = 0;
      this.paidChangeHistory = [];

      setTimeout(() => {
        const subWorkspace = document.getElementById('financeSubWorkspace');
        if (subWorkspace) this.renderFinanceChange(subWorkspace);
      }, 1600);

    } else if (this.paidChangeMoney > curItem.change) {
      soundManager.playWrong();
      ttsManager.speak(`거스름돈을 너무 많이 가져갔어요! 받아야 할 거스름돈은 ${curItem.change.toLocaleString()}원입니다!`);
    } else {
      soundManager.playWrong();
      const needed = curItem.change - this.paidChangeMoney;
      ttsManager.speak(`거스름돈이 부족해요! ${curItem.change.toLocaleString()}원까지 ${needed.toLocaleString()}원을 더 받아야 합니다!`);
    }
  }

  restartFinanceChange() {
    soundManager.playClick();
    this.financeChangeIndex = 0;
    this.paidChangeMoney = 0;
    this.paidChangeHistory = [];
    this.financeChangeItems.sort(() => Math.random() - 0.5);
    const subWorkspace = document.getElementById('financeSubWorkspace');
    if (subWorkspace) this.renderFinanceChange(subWorkspace);
  }

  /* --------------------------------------------------------------------------
     7. Time Calculation (시간 계산 3단계 30문제) [NEW]
     -------------------------------------------------------------------------- */
  renderTimeCalc(workspace) {
    let levelTitle = "";
    if (this.timeCalcLevel === 1) levelTitle = "1단계: 시/분 읽기 및 정각·반시 시간 가감 (초급 10문제)";
    else if (this.timeCalcLevel === 2) levelTitle = "2단계: 시간 덧셈과 뺄셈 및 60분 올림·내림 (중급 10문제)";
    else levelTitle = "3단계: 실생활 경과 시간 및 소요 시간 계산 (고급 10문제)";

    workspace.innerHTML = `
      <div class="activity-header">
        <div class="activity-header-text">
          <h2>⏱️ 인터랙티브 시간 계산 (3단계 30문제)</h2>
          <p>${levelTitle}</p>
        </div>
        <button class="speak-btn" onclick="selfManagementManager.speakTimeCalcInfo()"><i class="fa-solid fa-volume-high"></i></button>
      </div>

      <div style="display:flex; gap:0.5rem; justify-content:center; flex-wrap:wrap; margin-bottom:1.25rem;">
        <button class="primary-btn ${this.timeCalcLevel===1?'pulse':''}" style="padding:0.6rem 1.1rem; font-size:0.95rem; background:${this.timeCalcLevel===1?'#38a169':'#64748b'};" onclick="selfManagementManager.switchTimeCalcLevel(1)">1단계: 초급 (10문제)</button>
        <button class="primary-btn ${this.timeCalcLevel===2?'pulse':''}" style="padding:0.6rem 1.1rem; font-size:0.95rem; background:${this.timeCalcLevel===2?'#3182ce':'#64748b'};" onclick="selfManagementManager.switchTimeCalcLevel(2)">2단계: 중급 (10문제)</button>
        <button class="primary-btn ${this.timeCalcLevel===3?'pulse':''}" style="padding:0.6rem 1.1rem; font-size:0.95rem; background:${this.timeCalcLevel===3?'#8b5cf6':'#64748b'};" onclick="selfManagementManager.switchTimeCalcLevel(3)">3단계: 고급 (10문제)</button>
      </div>

      <div id="timeCalcSubWorkspace" style="max-width:800px; margin: 0 auto;"></div>
    `;

    const subWorkspace = document.getElementById('timeCalcSubWorkspace');
    this.renderTimeCalcQuiz(subWorkspace);
  }

  switchTimeCalcLevel(lvl) {
    soundManager.playClick();
    this.timeCalcLevel = lvl;
    this.timeCalcIndex = 0;
    const workspace = document.getElementById('selfMgmtSubWorkspace');
    if (workspace) this.renderTimeCalc(workspace);
  }

  speakTimeCalcInfo() {
    if (this.timeCalcLevel === 1) ttsManager.speak("1단계 초급! 정각과 반시 시계 읽기 및 간단한 1시간 후, 30분 전후 시간을 계산해보세요!");
    else if (this.timeCalcLevel === 2) ttsManager.speak("2단계 중급! 60분이 넘어가는 올림 계산과 60분 내림 뺄셈을 차근차근 계산해보세요!");
    else ttsManager.speak("3단계 고급! 영화 상영시간, 버스 이동시간 등 실생활에서 얼마 동안 시간이 걸렸는지 소요 시간을 계산해보세요!");
  }

  renderTimeCalcQuiz(workspace) {
    const listKey = `level${this.timeCalcLevel}`;
    const questions = this.timeCalcQuestions[listKey];
    const total = questions.length;
    const isCompleted = (this.timeCalcIndex >= total);

    if (isCompleted) {
      const levelNames = { 1: "1단계(초급)", 2: "2단계(중급)", 3: "3단계(고급)" };
      workspace.innerHTML = `
        <div class="clip-theme-card" style="padding:2.2rem; background:#f0fdf4; border:4px solid #22c55e; text-align:center;">
          <h2 style="color:#15803d; margin-bottom:0.75rem; font-size:2rem;">🎉 시간 계산 ${levelNames[this.timeCalcLevel]} 10문제 완수! ⭐</h2>
          <p style="font-size:1.25rem; color:#276749;">시각 가감과 소요 시간을 정확하게 모두 계산해냈습니다!</p>
          <button class="primary-btn pulse" style="font-size:1.15rem; padding:0.8rem 1.8rem; background:#8b5cf6; margin-top:1.2rem;" onclick="selfManagementManager.restartCurrentTimeCalcLevel()">
            ${levelNames[this.timeCalcLevel]} 다시 도전하기 🔄
          </button>
        </div>
      `;
      soundManager.playCelebration();
      appState.addStar(1);
      ttsManager.speak(`축하합니다! 시간 계산 ${levelNames[this.timeCalcLevel]} 10문제를 모두 완벽하게 성공했습니다!`);
      appState.showCelebrationModal("시간 계산 마스터!", `${levelNames[this.timeCalcLevel]} 10문제를 정확하게 잘 풀었습니다! ⏱️⭐`);
      return;
    }

    const curQ = questions[this.timeCalcIndex];

    workspace.innerHTML = `
      <div style="text-align:center;">
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.05); padding:0.75rem 1.25rem; border-radius:14px; margin-bottom:1rem; font-weight:700;">
          <div>📌 ${curQ.title}</div>
          <div>⏱️ <span style="color:#8b5cf6; font-size:1.3rem;">${this.timeCalcIndex + 1}</span> / ${total} 문제</div>
        </div>

        <div class="clip-theme-card" style="padding:2rem; background:#f5f3ff; border:4px solid #8b5cf6; margin-bottom:1.5rem; border-radius:22px;">
          <div style="font-size:5rem; margin-bottom:0.3rem;">${curQ.clockEmoji}</div>
          <h3 style="font-size:1.6.rem; color:#5b21b6; font-family:var(--font-family-friendly); margin-bottom:0.8rem; line-height:1.5;">${curQ.q}</h3>
        </div>

        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:1rem; margin-bottom:1.5rem;">
          ${curQ.choices.map((c, i) => `
            <button class="btn-choice" style="padding:1.25rem 0.5rem; border-radius:18px; font-size:1.2rem; font-weight:800;" onclick="selfManagementManager.checkTimeCalcAnswer(${i}, this)">
              ${c.text}
            </button>
          `).join('')}
        </div>

        <div id="timeCalcFeedback" style="display:none; padding:1.2rem; border-radius:16px; font-size:1.2rem; font-weight:800; margin-bottom:1rem;"></div>
      </div>
    `;

    ttsManager.speak(`${curQ.q}`);
  }

  checkTimeCalcAnswer(choiceIdx, btnElem) {
    const listKey = `level${this.timeCalcLevel}`;
    const questions = this.timeCalcQuestions[listKey];
    const curQ = questions[this.timeCalcIndex];
    const selectedChoice = curQ.choices[choiceIdx];

    const fb = document.getElementById('timeCalcFeedback');

    if (selectedChoice.isCorrect) {
      soundManager.playCorrect();
      btnElem.classList.add('correct');

      if (fb) {
        fb.style.display = 'block';
        fb.style.background = '#f0fdf4';
        fb.style.border = '3px solid #22c55e';
        fb.style.color = '#15803d';
        fb.innerHTML = `⭕ <b>정답입니다!</b> ${curQ.exp}`;
      }

      ttsManager.speak(`정답입니다! ${curQ.exp}`);
      this.timeCalcIndex++;

      setTimeout(() => {
        const subWorkspace = document.getElementById('timeCalcSubWorkspace');
        if (subWorkspace) this.renderTimeCalcQuiz(subWorkspace);
      }, 1600);

    } else {
      soundManager.playWrong();
      btnElem.classList.add('wrong');

      if (fb) {
        fb.style.display = 'block';
        fb.style.background = '#fff5f5';
        fb.style.border = '3px solid #e53e3e';
        fb.style.color = '#9b2c2c';
        fb.innerHTML = `❌ <b>아쉬워요!</b> 다시 한번 계산해 보세요!`;
      }

      setTimeout(() => btnElem.classList.remove('wrong'), 800);
      ttsManager.speak("아쉬워요! 다시 한번 차근차근 계산해 보세요!");
    }
  }

  restartCurrentTimeCalcLevel() {
    soundManager.playClick();
    this.timeCalcIndex = 0;
    const subWorkspace = document.getElementById('timeCalcSubWorkspace');
    if (subWorkspace) this.renderTimeCalcQuiz(subWorkspace);
  }
}

window.selfManagementManager = new SelfManagementManager();
