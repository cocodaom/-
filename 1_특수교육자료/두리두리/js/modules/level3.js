/* ==========================================================================
   두리두리 (Duri-Duri) - Level 3: 그림 상황 파악 & 이웃 돕기
   Sub-Levels:
     - Level 1 (기초): 10문제 (기초 예의, 인사, 신체 위생, 정리정돈)
     - Level 2 (중급): 15문제 (이웃 돕기, 배려, 공공장소 에티켓)
     - Level 3 (고급/심화): 10문제 (공감, 경청, 오해 해결, 사이버 매너, 스포츠맨십)
   ========================================================================== */

class Level3Manager {
  constructor() {
    this.unlockedSubLevel = parseInt(localStorage.getItem('duri_l3_unlocked') || '1', 10);
    this.currentSubLevel = 1; // 1, 2, or 3
    this.currentIndex = 0;

    /* --------------------------------------------------------------------------
       LEVEL 1 QUESTIONS (기초 - 10문제)
       -------------------------------------------------------------------------- */
    this.level1Questions = [
      {
        id: 1,
        title: "상황 1: 반갑게 인사하기",
        emojis: "👋😊🏫",
        story: "아침에 학교 입구에서 선생님과 경비원 아저씨를 만났어요!",
        subText: "선생님과 이웃 어른을 만났을 때 어떻게 하는 것이 좋을까요?",
        choices: [
          { text: "1. \"안녕하세요!\" 하고 허리를 굽혀 기분 좋게 인사한다.", isCorrect: true },
          { text: "2. 고개를 푹 숙이고 못 본 척 지나간다.", isCorrect: false },
          { text: "3. 혀를 메롱 하고 달려간다.", isCorrect: false }
        ],
        explanation: "맞아요! 먼저 밝게 인사하면 하루가 행복해집니다! ⭐"
      },
      {
        id: 2,
        title: "상황 2: 장난감 가지고 놀고 난 후",
        emojis: "🧸📦✨",
        story: "친구와 신나게 장난감을 가지고 놀고 난 후 방 안이 어지러워졌어요.",
        subText: "놀이가 끝난 후 올바른 행동은 무엇일까요?",
        choices: [
          { text: "1. 장난감을 그냥 바닥에 둔 채 밖으로 나간다.", isCorrect: false },
          { text: "2. \"같이 정돈하자!\" 하며 장난감 상자에 차곡차곡 정리한다.", isCorrect: true },
          { text: "3. 장난감을 발로 툭툭 찬다.", isCorrect: false }
        ],
        explanation: "참 잘했어요! 제자리에 치우고 정리하는 것은 훌륭한 습관이에요! ⭐"
      },
      {
        id: 3,
        title: "상황 3: 칭찬이나 선물을 받았을 때",
        emojis: "🎁💖😊",
        story: "선생님께서 열심히 노력한 나에게 예쁜 스티커 선물을 주셨어요.",
        subText: "선물이나 칭찬을 받으면 어떤 말을 하는 것이 좋을까요?",
        choices: [
          { text: "1. \"감사합니다!\" 하고 웃으며 고마움을 표현한다.", isCorrect: true },
          { text: "2. 뺏듯이 가져가며 아무 말도 하지 않는다.", isCorrect: false },
          { text: "3. \"더 좋은 건 없나요?\" 하고 불평한다.", isCorrect: false }
        ],
        explanation: "딩동댕! 고마운 마음을 말로 표현하는 것이 멋진 예의입니다! ⭐"
      },
      {
        id: 4,
        title: "상황 4: 재채기나 기침이 나올 때",
        emojis: "🤧👕🧼",
        story: "사람들이 모여 있는 교실에서 갑자기 재채기가 '에취!' 하고 나오려고 해요.",
        subText: "기침이나 재채기를 할 때 올바른 위생 행동은 무엇일까요?",
        choices: [
          { text: "1. 친구의 얼굴을 향해 기침을 퍼뜨린다.", isCorrect: false },
          { text: "2. 옷소매 안쪽이나 휴지로 입과 코를 가리고 기침한다.", isCorrect: true },
          { text: "3. 바닥에 침을 뱉는다.", isCorrect: false }
        ],
        explanation: "정답이에요! 옷소매로 입을 가리는 것은 이웃을 지키는 소중한 위생 규칙이에요! ⭐"
      },
      {
        id: 5,
        title: "상황 5: 줄 서서 내 순서를 기다릴 때",
        emojis: "🛝👫⏳",
        story: "놀이터 미끄럼틀을 타려고 친구들이 차례차례 줄을 서서 기다리고 있어요.",
        subText: "미끄럼틀이나 그네를 탈 때 어떻게 해야 할까요?",
        choices: [
          { text: "1. 내 차례가 올 때까지 차분하게 순서를 기다린다.", isCorrect: true },
          { text: "2. 앞 친구를 밀쳐내고 먼저 타버린다.", isCorrect: false },
          { text: "3. 엉엉 울면서 당장 먼저 타고 싶다고 떼를 쓴다.", isCorrect: false }
        ],
        explanation: "아주 훌륭해요! 순서를 지키면 모두가 안전하고 재미있게 놀 수 있어요! ⭐"
      },
      {
        id: 6,
        title: "상황 6: 음식을 먹기 전 손 씻기",
        emojis: "🧼🚰🥪",
        story: "밖에서 흙장난을 하고 놀다가 집에서 맛있는 간식을 먹으려고 해요.",
        subText: "음식을 먹기 전 가장 먼저 해야 하는 행동은 무엇일까요?",
        choices: [
          { text: "1. 흙 묻은 손 그대로 빵을 덥석 집어먹는다.", isCorrect: false },
          { text: "2. 스마트폰 게임을 하면서 밥을 먹는다.", isCorrect: false },
          { text: "3. 비누로 손을 깨끗하게 씻고 식탁에 앉는다.", isCorrect: true }
        ],
        explanation: "맞았습니다! 깨끗하게 손을 씻어야 배가 아프지 않아요! ⭐"
      },
      {
        id: 7,
        title: "상황 7: 실수로 친구 발을 밟았을 때",
        emojis: "👟💥😥",
        story: "복도를 걸어가다가 실수로 친구의 발을 툭 밟았어요.",
        subText: "실수를 했을 때 바로 해야 하는 정직한 행동은 무엇일까요?",
        choices: [
          { text: "1. \"미안해! 많이 아팠지?\" 하고 진심으로 사과한다.", isCorrect: true },
          { text: "2. \"네 발이 거기 있어서 그래!\" 하고 친구 탓을 한다.", isCorrect: false },
          { text: "3. 낄낄 웃으며 모른 척 지나간다.", isCorrect: false }
        ],
        explanation: "참 잘했어요! 실수했을 땐 바로 미안하다고 사과해야 화해할 수 있어요! ⭐"
      },
      {
        id: 8,
        title: "상황 8: 밥 먹을 때 감사히 먹기",
        emojis: "🍱🙏🍚",
        story: "부모님과 급식실 선생님께서 맛있는 식사를 준비해 주셨어요.",
        subText: "식사를 시작할 때 올바른 태도는 무엇일까요?",
        choices: [
          { text: "1. \"잘 먹겠습니다!\" 하고 감사히 인사한 뒤 남기지 않고 먹는다.", isCorrect: true },
          { text: "2. \"반찬이 이게 뭐야!\" 하고 숟가락을 던진다.", isCorrect: false },
          { text: "3. 밥으로 장난을 치며 흩뿌린다.", isCorrect: false }
        ],
        explanation: "훌륭합니다! 음식을 준비해 주신 분들께 감사하는 마음을 가져요! ⭐"
      },
      {
        id: 9,
        title: "상황 9: 밤늦게 집 안에서 행동하기",
        emojis: "🌙🏠🤫",
        story: "밤 9시가 지나서 모두가 잠자리에 들 시간이 되었어요.",
        subText: "늦은 밤 집 안에서는 어떻게 행동해야 할까요?",
        choices: [
          { text: "1. 큰 소리로 가요를 부르며 방 안을 쿵쿵 뛴다.", isCorrect: false },
          { text: "2. 소리를 줄이고 살금살금 사뿐하게 걷는다.", isCorrect: true },
          { text: "3. 드럼이나 피아노를 쾅쾅 친다.", isCorrect: false }
        ],
        explanation: "맞아요! 늦은 밤에는 조용히 행동해야 가족과 이웃이 편히 쉴 수 있어요! ⭐"
      },
      {
        id: 10,
        title: "상황 10: 다른 사람 물건을 사용하고 싶을 때",
        emojis: "🖍️🤝🎨",
        story: "그림을 그리는데 짝꿍이 가진 예쁜 색연필을 나도 써보고 싶어요.",
        subText: "남의 물건을 쓰고 싶을 때 어떻게 해야 할까요?",
        choices: [
          { text: "1. 짝꿍 모르게 슬쩍 빼앗아 쓴다.", isCorrect: false },
          { text: "2. \"혹시 이 색연필 좀 빌려 써도 될까?\" 하고 허락을 구한다.", isCorrect: true },
          { text: "3. 짝꿍 색연필을 툭 차서 바닥에 떨어뜨린다.", isCorrect: false }
        ],
        explanation: "완벽합니다! 남의 물건은 반드시 물어보고 허락을 받은 뒤 빌려 써야 해요! ⭐"
      }
    ];

    /* --------------------------------------------------------------------------
       LEVEL 2 QUESTIONS (중급 - 15문제)
       -------------------------------------------------------------------------- */
    this.level2Questions = [
      {
        id: 1,
        title: "상황 1: 놀이터에서 다친 친구 돕기",
        emojis: "👧😭🩹",
        story: "놀이터에서 넘어져서 친구가 무릎을 다쳐서 울고 있어요!",
        subText: "친구의 마음을 이해하고 도울 수 있는 올바른 행동은 무엇일까요?",
        choices: [
          { text: "1. \"괜찮니?\"라고 부드럽게 물어보고 주변 어른이나 선생님께 알려서 도와준다.", isCorrect: true },
          { text: "2. 친구를 그냥 지나치고 모른 척하며 혼자 놀러 간다.", isCorrect: false },
          { text: "3. 다친 친구를 보며 큰 소리로 놀린다.", isCorrect: false }
        ],
        explanation: "아주 훌륭해요! 다친 친구의 상태를 살피고 어른께 알려서 도와주는 것이 최고의 선택이에요! ⭐"
      },
      {
        id: 2,
        title: "상황 2: 무거운 장바구니를 든 할머니",
        emojis: "👵🛍️🧗",
        story: "할머니께서 무거운 장바구니를 들고 끙끙대며 계단을 올라가고 계세요.",
        subText: "힘들어하시는 어르신을 뵈었을 때 바람직한 태도는 무엇일까요?",
        choices: [
          { text: "1. 할머니 옆을 쌩하고 뛰어가서 먼저 계단을 올라간다.", isCorrect: false },
          { text: "2. \"할머니, 제가 도와드릴까요?\"라고 다가가서 짐을 함께 들어 드린다.", isCorrect: true },
          { text: "3. 짐이 왜 이렇게 무겁냐고 할머니에게 불평한다.", isCorrect: false }
        ],
        explanation: "참 잘했어요! 힘들어하시는 어르신의 짐을 함께 들어드리면 마음이 따뜻해집니다! ⭐"
      },
      {
        id: 3,
        title: "상황 3: 횡단보도를 건너시는 시각장애인 이웃",
        emojis: "🧑‍🦯🚦🐕",
        story: "흰 지팡이를 짚은 이웃분이 횡단보도 신호등 앞에서 주춤거리며 서 계세요.",
        subText: "횡단보도 앞에서 도움이 필요한 분께 어떻게 해드려야 할까요?",
        choices: [
          { text: "1. 모른 척하고 신호가 바뀌자마자 나 혼자 빨리 건너간다.", isCorrect: false },
          { text: "2. 소리를 지르며 신호등을 빨리 건너라고 재촉한다.", isCorrect: false },
          { text: "3. \"신호등이 초록불로 바뀌었어요, 함께 건너요\"라고 친절하게 알려드린다.", isCorrect: true }
        ],
        explanation: "훌륭해요! 도움이 필요한 이웃에게 신호 상황을 친절하게 설명해 드리면 큰 도움이 됩니다! ⭐"
      },
      {
        id: 4,
        title: "상황 4: 엘리베이터로 달려오는 양손 가득한 아저씨",
        emojis: "🛗🏃‍♂️📦",
        story: "양손에 큰 상자를 가득 든 이웃 아저씨가 엘리베이터를 향해 달려오고 계세요.",
        subText: "엘리베이터 안에서 다른 이웃을 배려하는 올바른 행동은 무엇일까요?",
        choices: [
          { text: "1. 열림 버튼을 누르고 \"어서 오세요\" 하면서 문이 닫히지 않게 기다려준다.", isCorrect: true },
          { text: "2. 닫힘 버튼을 여러 번 눌러서 엘리베이터를 먼저 출발시킨다.", isCorrect: false },
          { text: "3. 장난으로 엘리베이터 안에서 쿵쿵 뛰며 놀아본다.", isCorrect: false }
        ],
        explanation: "딩동댕! 엘리베이터 열림 버튼을 눌러 기다려주는 것은 멋진 배려 행동이에요! ⭐"
      },
      {
        id: 5,
        title: "상황 5: 강아지를 잃어버리고 울먹이는 친구",
        emojis: "🐶🔍🏷️",
        story: "이웃집 친구가 멍하니 주위를 둘러보며 '강아지가 어디 갔지?' 하고 울먹이고 있어요.",
        subText: "슬퍼하고 걱정하는 친구를 도울 수 있는 길은 무엇일까요?",
        choices: [
          { text: "1. 강아지를 잃어버렸다고 놀리면서 장난을 친다.", isCorrect: false },
          { text: "2. \"나도 함께 찾아볼게!\" 하며 주위를 같이 살피고 찾아본다.", isCorrect: true },
          { text: "3. 재미있는 스마트폰 동영상을 보며 그냥 지나친다.", isCorrect: false }
        ],
        explanation: "정답이에요! 걱정하는 친구와 함께 잃어버린 반려동물을 찾아주면 큰 힘이 됩니다! ⭐"
      },
      {
        id: 6,
        title: "상황 6: 비 오는 날 우산이 없는 짝꿍",
        emojis: "🌧️☂️👦",
        story: "갑자기 비가 많이 쏟아지는데, 짝꿍 친구가 우산이 없어서 학교 문 앞에서 발을 굴리고 있어요.",
        subText: "비 오는 날 우산이 없는 친구를 만났을 때 어떻게 할까요?",
        choices: [
          { text: "1. 내 우산을 혼자만 푹 쓰고 빗길을 신나게 달려간다.", isCorrect: false },
          { text: "2. \"내 우산 같이 쓰고 집까지 가자!\" 하고 우산을 함께 나눠 쓴다.", isCorrect: true },
          { text: "3. 빗물을 발로 튀기며 친구 옷을 젖게 만든다.", isCorrect: false }
        ],
        explanation: "아주 훌륭해요! 빗속에서 친구와 우산을 나누어 쓰는 것은 정말 따뜻한 행동이에요! ⭐"
      },
      {
        id: 7,
        title: "상황 7: 휠체어를 타고 문턱에 걸린 친구",
        emojis: "👨‍🦽🚪🧱",
        story: "휠체어를 탄 친구가 문턱이 높아 바퀴가 걸려 건물 안으로 들어가지 못하고 있어요.",
        subText: "이동하기 힘든 친구를 만났을 때 올바른 태도는 무엇일까요?",
        choices: [
          { text: "1. \"내가 뒤에서 살짝 밀어줄게!\" 하고 도와주거나 어른께 알려드린다.", isCorrect: true },
          { text: "2. 친구를 지나쳐서 나 먼저 건물 안으로 뛰어 들어간다.", isCorrect: false },
          { text: "3. 휠체어를 잡고 흔들며 괴롭힌다.", isCorrect: false }
        ],
        explanation: "맞았습니다! 문턱을 넘기 힘든 친구를 도와주거나 주변 어른을 부르는 것이 바람직해요! ⭐"
      },
      {
        id: 8,
        title: "상황 8: 길거리에서 부모님을 잃어버려 우는 아이",
        emojis: "👶😭🏙️",
        story: "길거리에서 아주 어린 동생이 부모님을 잃어버렸는지 엉엉 울고 있어요.",
        subText: "길을 잃은 어린아이를 보았을 때 안전한 행동은 무엇일까요?",
        choices: [
          { text: "1. 무서우니까 모른 척하고 다른 길로 돌아간다.", isCorrect: false },
          { text: "2. \"울지마, 부모님 찾아줄게\" 하고 안심시킨 뒤 가까운 경찰서나 안내소 어른께 도와달라고 한다.", isCorrect: true },
          { text: "3. 어린아이의 손에 든 과자를 빼앗아 먹는다.", isCorrect: false }
        ],
        explanation: "참 잘했어요! 길을 잃은 아이를 안내소나 경찰서 어른께 연결해 주는 것이 가장 안전해요! ⭐"
      },
      {
        id: 9,
        title: "상황 9: 급식실에서 식판을 엎지른 친구",
        emojis: "🍱💥🧹",
        story: "급식실에서 친구가 발이 걸려 식판을 바닥에 떨어뜨려 음식과 국물이 쏟아졌어요.",
        subText: "실수로 당황한 친구를 도울 수 있는 올바른 반응은 무엇일까요?",
        choices: [
          { text: "1. 휴지와 닦을 거리(걸레)를 가져와서 쏟아진 음식을 함께 치워준다.", isCorrect: true },
          { text: "2. 손가락질하며 \"칠칠맞네!\" 하고 크게 웃는다.", isCorrect: false },
          { text: "3. 쏟아진 음식을 발로 툭툭 차며 놀린다.", isCorrect: false }
        ],
        explanation: "딩동댕! 실수로 음식을 쏟은 친구의 마음을 위로하며 함께 정리해 주는 모습이 아름다워요! ⭐"
      },
      {
        id: 10,
        title: "상황 10: 버스에서 지팡이를 짚으신 할아버지",
        emojis: "🚌👵🪑",
        story: "버스에 승객이 가득 찼는데, 지팡이를 짚으신 할아버지께서 버스에 타셨어요.",
        subText: "대중교통 이용 시 어르신을 뵈었을 때 예의 바른 행동은 무엇일까요?",
        choices: [
          { text: "1. 자는 척 눈을 감고 휴대폰만 뚫어지게 본다.", isCorrect: false },
          { text: "2. \"할아버지, 여기 앉으세요!\" 하고 밝게 웃으며 자리를 양보해 드린다.", isCorrect: true },
          { text: "3. 창밖을 보며 노래를 크게 부른다.", isCorrect: false }
        ],
        explanation: "훌륭합니다! 버스나 지하철에서 어르신께 자리를 양보하는 것은 멋진 예의 행동이에요! ⭐"
      },
      {
        id: 11,
        title: "상황 11: 동네 놀이터와 공원의 쓰레기",
        emojis: "🏞️🧃🚮",
        story: "우리가 자주 놀던 동네 쉼터 벤치 주변에 음료수 캔과 과자 봉지가 버려져 있어요.",
        subText: "공공장소를 깨끗이 유지하기 위한 올바른 자세는 무엇일까요?",
        choices: [
          { text: "1. 쓰레기를 집어서 가까운 쓰레기통에 깨끗하게 버린다.", isCorrect: true },
          { text: "2. 내 쓰레기가 아니니까 내가 가져온 과자 껍질도 바닥에 더 던진다.", isCorrect: false },
          { text: "3. 발로 쓰레기를 더 멀리 차 버린다.", isCorrect: false }
        ],
        explanation: "맞아요! 모두가 이용하는 공원을 깨끗하게 가꾸는 것은 멋진 이웃의 태도입니다! ⭐"
      },
      {
        id: 12,
        title: "상황 12: 줄 서 있는 곳에서 새치기하는 사람",
        emojis: "🧍‍♀️🧍‍♂️🚶‍♀️",
        story: "체험장 입구에서 차례차례 줄을 서 있는데, 어떤 사람이 옆에서 슬그머니 새치기를 하려고 해요.",
        subText: "줄서기 규칙을 지키지 않는 행동을 보았을 때 차분한 대응은 무엇일까요?",
        choices: [
          { text: "1. 새치기하는 사람을 주먹으로 때린다.", isCorrect: false },
          { text: "2. 나도 화가 나니까 맨 앞으로 달려가서 새치기한다.", isCorrect: false },
          { text: "3. \"차례대로 줄을 서서 기다려야 해요\" 하고 차분하게 순서를 알려준다.", isCorrect: true }
        ],
        explanation: "정답이에요! 차분하고 예의 바르게 사회적 규칙을 설명해 주는 것이 좋습니다! ⭐"
      },
      {
        id: 13,
        title: "상황 13: 층간소음으로 올라오신 아랫집 이웃",
        emojis: "🏢👟🤫",
        story: "집 안에서 신나게 쿵쿵 뛰어놀다가, 층간소음 때문에 아랫집 이웃 아저씨께서 올라오셨어요.",
        subText: "아파트 공동생활에서 이웃을 배려하는 진정한 태도는 무엇일까요?",
        choices: [
          { text: "1. \"우리 집인데 내 마음대로 뛸 거예요!\" 하고 화를 낸다.", isCorrect: false },
          { text: "2. \"죄송합니다, 앞으로는 실내화를 신고 사뿐사뿐 걸을게요\" 하고 사과한다.", isCorrect: true },
          { text: "3. 더 큰 소리로 발을 구르며 집 안을 뛰어다닌다.", isCorrect: false }
        ],
        explanation: "참 잘했어요! 이웃 간에는 미안함을 잘 표현하고 실내에서 배려하며 걷는 것이 중요해요! ⭐"
      },
      {
        id: 14,
        title: "상황 14: 도서관에서 크게 울리는 휴대폰 벨소리",
        emojis: "📚🔔📱",
        story: "모두가 조용히 책을 읽고 공부하는 도서관에서 내 휴대폰 벨소리가 띵동띵동 울렸어요.",
        subText: "조용한 공공장소에서 발생한 돌발 상황에 올바른 에티켓은 무엇일까요?",
        choices: [
          { text: "1. 빠르게 진동이나 무음으로 바꾸고 \"죄송합니다\" 인사 후 밖으로 나가서 작게 통화한다.", isCorrect: true },
          { text: "2. 벨소리가 울리든 말든 상관없이 큰 소리로 전화를 받는다.", isCorrect: false },
          { text: "3. 휴대폰을 도서관 바닥에 쾅 던져버린다.", isCorrect: false }
        ],
        explanation: "완벽합니다! 공공장소 에티켓을 지켜 다른 사람들의 학습을 방해하지 않는 것이 최고예요! ⭐"
      },
      {
        id: 15,
        title: "상황 15: 길에서 남의 소중한 지갑이나 열쇠를 발견했을 때",
        emojis: "🎒🔑👛",
        story: "앞서 걸어가던 이웃 주민분이 주머니에서 열쇠와 지갑을 툭 떨어뜨리고 모르고 걸어가고 계세요.",
        subText: "앞사람이 소중한 물건을 떨어뜨린 모습을 보았을 때 올바른 행동은 무엇일까요?",
        choices: [
          { text: "1. \"저기요! 물건 떨어뜨리셨어요!\" 하고 얼른 주워서 전해드린다.", isCorrect: true },
          { text: "2. 슬쩍 주워서 주머니에 넣고 내 것처럼 가져간다.", isCorrect: false },
          { text: "3. 발로 툭툭 차서 길가 구석에 던져 버린다.", isCorrect: false }
        ],
        explanation: "참 잘했어요! 남이 떨어뜨린 소중한 물건을 정직하게 주워서 찾아주는 것은 멋진 행동입니다! ⭐"
      }
    ];

    /* --------------------------------------------------------------------------
       LEVEL 3 QUESTIONS (고급/심화 - 10문제)
       -------------------------------------------------------------------------- */
    this.level3Questions = [
      {
        id: 1,
        title: "상황 1: 힘들어하는 친구의 고민과 비밀 듣기",
        emojis: "🫂💬❤️",
        story: "친구가 가슴속 깊은 고민이 있다며 눈물을 글썽이며 나에게 이야기를 털어놓았어요.",
        subText: "친구가 마음을 열고 고민을 털어놓았을 때 어떻게 들어주는 것이 좋을까요?",
        choices: [
          { text: "1. 이야기를 진심으로 경청하고, 다른 친구들에게 소문내지 않고 비밀을 지켜준다.", isCorrect: true },
          { text: "2. \"별것도 아닌 걸로 울지마!\" 하고 이야기를 가로막는다.", isCorrect: false },
          { text: "3. 쉬는 시간에 반 전체 친구들에게 \"얘 고민이 있대!\" 하며 소문을 퍼뜨린다.", isCorrect: false }
        ],
        explanation: "깊은 배려입니다! 친구의 진심을 경청하고 신뢰를 지켜주는 것은 훌륭한 친구의 덕목이에요! ⭐"
      },
      {
        id: 2,
        title: "상황 2: 억울한 오해를 받았을 때 차분히 대화하기",
        emojis: "😤💬🤝",
        story: "내가 하지 않은 일인데 친구가 나를 오해하고 쏘아붙이며 화를 냈어요.",
        subText: "억울한 오해를 받았을 때 감정적으로 싸우지 않고 지혜롭게 해결하려면?",
        choices: [
          { text: "1. 똑같이 소리를 지르고 물건을 던지며 화를 낸다.", isCorrect: false },
          { text: "2. 차분한 목소리로 \"나도 속상해, 내 이야기를 끝까지 들어봐 줘\" 하고 당시 상황을 사실대로 설명한다.", isCorrect: true },
          { text: "3. 평생 절교하겠다며 뒤돌아서 욕을 한다.", isCorrect: false }
        ],
        explanation: "지혜로운 해결책이에요! 감정을 누르고 차분히 사실을 설명할 때 오해가 풀립니다! ⭐"
      },
      {
        id: 3,
        title: "상황 3: 모둠(팀) 활동에서 다른 사람 의견 존중하기",
        emojis: "🧩👥💡",
        story: "모둠 미술 과제를 하는데, 내 생각과 전혀 다른 친구의 아이디어가 발표되었어요.",
        subText: "팀 활동에서 나와 다른 의견을 접했을 때 올바른 협동 태도는?",
        choices: [
          { text: "1. \"그건 말이 안 돼! 무조건 내 생각대로 해!\" 하고 소리친다.", isCorrect: false },
          { text: "2. \"그 생각도 멋지다! 내 생각과 섞어서 더 좋게 만들어볼까?\" 하고 존중하며 협력한다.", isCorrect: true },
          { text: "3. 내 의견이 안 뽑혔으니 모둠 활동을 아예 참여하지 않고 엎드려 있는다.", isCorrect: false }
        ],
        explanation: "멋진 협동심입니다! 나와 다른 생각도 경청하고 장점을 합치면 훌륭한 결과가 나와요! ⭐"
      },
      {
        id: 4,
        title: "상황 4: 편견이나 차별 없는 태도 지키기",
        emojis: "🌏🤝❤️",
        story: "우리 반에 피부색이 다르거나 서툰 한국어를 쓰는 전학생 친구가 찾아왔어요.",
        subText: "나와 외모나 언어가 다른 새 친구를 대하는 올바른 이웃의 마음가짐은?",
        choices: [
          { text: "1. 힐끔거리며 피하고 함께 놀지 않는다.", isCorrect: false },
          { text: "2. \"환영해! 같이 한국어도 연습하고 신나게 놀자!\" 하고 따뜻하게 다가간다.", isCorrect: true },
          { text: "3. 서툰 발음을 따라 하며 놀린다.", isCorrect: false }
        ],
        explanation: "아름다운 포용입니다! 다름을 인정하고 따뜻하게 맞이하는 마음이 세상을 환하게 만듭니다! ⭐"
      },
      {
        id: 5,
        title: "상황 5: 용기 있게 진심 어린 사과 건네기",
        emojis: "💌🤝🩹",
        story: "내가 감정이 격해져서 실수로 친구에게 마음 상하는 심한 말을 해버렸어요.",
        subText: "자신의 잘못을 깨달았을 때 필요한 용기 있는 행동은?",
        choices: [
          { text: "1. 자존심이 상하니까 절대로 먼저 사과하지 않고 뻔뻔하게 행동한다.", isCorrect: false },
          { text: "2. \"내가 아까 너무 경솔했어, 상처 줘서 정말 미안해\" 하고 진심으로 사과한다.", isCorrect: true },
          { text: "3. 딴청을 피우며 \"네가 먼저 시비 걸었잖아\" 하고 화를 낸다.", isCorrect: false }
        ],
        explanation: "진정한 용기입니다! 잘못을 인정하고 먼저 사과할 수 있는 사람이 진정 성숙한 이웃이에요! ⭐"
      },
      {
        id: 6,
        title: "상황 6: 사이버/온라인(SNS, 채팅) 에티켓",
        emojis: "📱💬✨",
        story: "반 단체 채팅방에서 누군가 특정 친구의 굴욕 사진을 올리고 비웃고 있어요.",
        subText: "온라인 공간에서 친구 괴롭힘을 보았을 때 올바른 사이버 이웃 태도는?",
        choices: [
          { text: "1. 나도 같이 ㅋㅋㅋ 댓글을 달며 사진을 다른 방에 퍼뜨린다.", isCorrect: false },
          { text: "2. \"친구에게 상처가 되는 행동이야, 당장 사진을 지우자\" 하고 단호하게 말하거나 선생님께 알린다.", isCorrect: true },
          { text: "3. 재미있으니 동조하며 더 우스꽝스러운 합성 사진을 만든다.", isCorrect: false }
        ],
        explanation: "정의로운 행동이에요! 온라인에서도 타인의 명예와 마음을 지켜주는 고품격 이웃이 되어야 해요! ⭐"
      },
      {
        id: 7,
        title: "상황 7: 도움이 필요한 사람을 위해 목소리 내기",
        emojis: "🛡️👦📢",
        story: "운동장 구석에서 형들이 작은 동생을 둘러싸고 돈이나 물건을 빼앗으려 하고 있어요.",
        subText: "부당한 폭력이나 괴롭힘을 목격했을 때 지혜롭고 안전한 대처법은?",
        choices: [
          { text: "1. 무서우니 나도 같이 구경하거나 못 본 척 도망간다.", isCorrect: false },
          { text: "2. 내가 위험하지 않도록 즉시 가까운 선생님이나 경비원 아저씨께 달려가 알리고 도움을 청한다.", isCorrect: true },
          { text: "3. 나도 옆에서 거들며 동생의 물건을 빼앗는다.", isCorrect: false }
        ],
        explanation: "지혜롭고 용기 있는 선택이에요! 안전하게 어른의 도움을 요청하여 이웃을 구하는 것이 최고입니다! ⭐"
      },
      {
        id: 8,
        title: "상황 8: 패배를 인정하고 승자를 축하하기 (스포츠맨십)",
        emojis: "⚽🤝🏆",
        story: "열심히 준비한 체육대회 축구 경기에서 아쉽게 1점 차이로 상대 팀에게 졌어요.",
        subText: "경기나 게임에서 패배했을 때 올바른 스포츠맨십 태도는?",
        choices: [
          { text: "1. \"심판이 편파적이었어!\" 하며 상대 팀에게 흙을 뿌리고 울고불고 떼를 쓴다.", isCorrect: false },
          { text: "2. 아쉽지만 최선을 다한 서로를 격려하고 \"우승 축하해! 멋진 경기였어!\" 하고 손을 잡는다.", isCorrect: true },
          { text: "3. 상대 팀 친구들에게 욕설을 하며 트로피를 빼앗는다.", isCorrect: false }
        ],
        explanation: "멋진 스포츠맨십입니다! 승자를 축하하고 진심을 다하는 모습이 진정한 승리자의 태도예요! ⭐"
      },
      {
        id: 9,
        title: "상황 9: 약속과 시간을 철저히 지키기",
        emojis: "⏰🤝🎒",
        story: "주말에 친구들과 공원에서 오전 10시에 만나서 함께 공부하기로 약속했어요.",
        subText: "타인과의 약속 시간을 대하는 바람직한 이웃의 책임감은?",
        choices: [
          { text: "1. 약속 시간에 늦어도 연락 한 통 없이 1시간 뒤에 느긋하게 나타난다.", isCorrect: false },
          { text: "2. 약속 시간 5분 전에 미리 도착해 준비하고, 늦을 것 같으면 사전에 사과와 연락을 취한다.", isCorrect: true },
          { text: "3. 가기 귀찮아졌다고 아무 말 없이 약속을 펑크 내고 집에서 게임만 한다.", isCorrect: false }
        ],
        explanation: "믿음직한 사람이에요! 시간을 지키는 것은 이웃에 대한 신뢰와 존중의 기본입니다! ⭐"
      },
      {
        id: 10,
        title: "상황 10: 환경 보호와 에너지 절약 실천하기",
        emojis: "🌍💡🌱",
        story: "아무도 없는 교실에 전등과 에어컨이 켜져 있고 물조절 수도꼭지에서 물이 졸졸 세고 있어요.",
        subText: "지구와 이웃 공동체를 위해 내가 할 수 있는 작은 실천은?",
        choices: [
          { text: "1. 내 돈으로 내는 거 아니니까 신경 끄고 그냥 지나친다.", isCorrect: false },
          { text: "2. 스위치를 꺼서 전기를 아끼고, 수도꼭지를 잠근 뒤 담당 선생님께 알린다.", isCorrect: true },
          { text: "3. 물을 더 크게 틀어놓고 교실 불을 껐다 켰다 장난친다.", isCorrect: false }
        ],
        explanation: "훌륭한 시민 의식이에요! 작지만 소중한 환경 보호 실천이 미래 우리 이웃의 지구를 지킵니다! ⭐"
      }
    ];

    // State Tracking
    this.userStateL1 = this.level1Questions.map(() => ({ answered: false, selectedIdx: null, isCorrect: false }));
    this.userStateL2 = this.level2Questions.map(() => ({ answered: false, selectedIdx: null, isCorrect: false }));
    this.userStateL3 = this.level3Questions.map(() => ({ answered: false, selectedIdx: null, isCorrect: false }));
  }

  getCurrentQuestions() {
    if (this.currentSubLevel === 1) return this.level1Questions;
    if (this.currentSubLevel === 2) return this.level2Questions;
    return this.level3Questions;
  }

  getCurrentUserState() {
    if (this.currentSubLevel === 1) return this.userStateL1;
    if (this.currentSubLevel === 2) return this.userStateL2;
    return this.userStateL3;
  }

  render(container) {
    const questions = this.getCurrentQuestions();
    const userState = this.getCurrentUserState();
    const q = questions[this.currentIndex];
    const state = userState[this.currentIndex];
    const totalQ = questions.length;
    const promptText = "그림 상황을 살펴보고, 이럴 때 어떻게 행동하는 것이 좋을지 고르세요!";

    let levelBadgeTitle = "";
    if (this.currentSubLevel === 1) levelBadgeTitle = "🐣 레벨 1 (기초 10문제)";
    else if (this.currentSubLevel === 2) levelBadgeTitle = "🌿 레벨 2 (중급 15문제)";
    else levelBadgeTitle = "🌳 레벨 3 (고급/심화 10문제)";

    container.innerHTML = `
      <!-- Sub-Level Selector Navigation Bar -->
      <div style="display:flex; justify-content:center; gap:0.8rem; margin-bottom:1.5rem; flex-wrap:wrap;">
        <button class="primary-btn ${this.currentSubLevel===1?'active':''}" 
                style="padding:0.6rem 1.2rem; font-size:0.95rem; background:${this.currentSubLevel===1?'var(--primary-blue)':'#cbd5e0'}; cursor:pointer;"
                onclick="level3Manager.switchSubLevel(1)">
          🐣 레벨 1: 기초 (10문제)
        </button>
        <button class="primary-btn ${this.currentSubLevel===2?'active':''}" 
                style="padding:0.6rem 1.2rem; font-size:0.95rem; background:${this.currentSubLevel===2?'var(--primary-blue)':(this.unlockedSubLevel>=2?'#718096':'#e2e8f0')}; opacity:${this.unlockedSubLevel>=2?1:0.7}; cursor:pointer;"
                onclick="level3Manager.switchSubLevel(2)">
          ${this.unlockedSubLevel >= 2 ? '🌿 레벨 2: 중급 (15문제)' : '🔒 레벨 2 (잠김)'}
        </button>
        <button class="primary-btn ${this.currentSubLevel===3?'active':''}" 
                style="padding:0.6rem 1.2rem; font-size:0.95rem; background:${this.currentSubLevel===3?'var(--primary-blue)':(this.unlockedSubLevel>=3?'#718096':'#e2e8f0')}; opacity:${this.unlockedSubLevel>=3?1:0.7}; cursor:pointer;"
                onclick="level3Manager.switchSubLevel(3)">
          ${this.unlockedSubLevel >= 3 ? '🌳 레벨 3: 고급/심화 (10문제)' : '🔒 레벨 3 (잠김)'}
        </button>
      </div>

      <div class="activity-header">
        <div class="activity-header-text">
          <h2>🖼️ 그림 상황 파악 & 이웃 돕기 <span style="font-size:1.1rem; color:var(--accent-coral); font-weight:800; margin-left:0.5rem;">[ ${levelBadgeTitle} ]</span></h2>
          <p>${promptText}</p>
        </div>
        <button class="speak-btn" onclick="ttsManager.speak('${q.story} ${q.subText}')" title="상황 설명 다시 듣기">
          <i class="fa-solid fa-volume-high"></i>
        </button>
      </div>

      <div style="max-width:820px; margin:0 auto;">
        
        <!-- Top Pagination & Progress Indicator -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; background:white; padding:0.8rem 1.2rem; border-radius:15px; border:2px solid var(--border-color); box-shadow:var(--shadow-sm);">
          <div style="font-weight:800; font-size:1.15rem; color:var(--primary-blue);">
            <i class="fa-solid fa-list-check"></i> 문제 ${this.currentIndex + 1} / ${totalQ}
          </div>
          <div style="display:flex; gap:5px; flex-wrap:wrap; justify-content:center; max-width:440px;">
            ${questions.map((_, idx) => {
              const s = userState[idx];
              let bg = '#e2e8f0';
              let color = '#4a5568';
              if (s.answered) {
                bg = s.isCorrect ? '#48bb78' : '#f56565';
                color = '#ffffff';
              }
              if (idx === this.currentIndex) {
                return `<button onclick="level3Manager.goToQuestion(${idx})" style="width:28px; height:28px; border-radius:50%; background:${bg}; color:${color}; font-weight:800; border:3px solid var(--primary-blue); cursor:pointer;">${idx+1}</button>`;
              }
              return `<button onclick="level3Manager.goToQuestion(${idx})" style="width:28px; height:28px; border-radius:50%; background:${bg}; color:${color}; font-weight:700; border:none; cursor:pointer;">${idx+1}</button>`;
            }).join('')}
          </div>
          <button class="primary-btn" style="padding:0.4rem 0.8rem; font-size:0.85rem; background:#718096;" onclick="level3Manager.resetQuiz()">
            <i class="fa-solid fa-rotate-right"></i> 다시 풀기
          </button>
        </div>

        <!-- Situation Card Box -->
        <div class="clip-theme-card" style="padding:2rem; text-align:center; background:#eef2f7; margin-bottom:1.5rem; border:3px solid #cbd5e0; box-shadow:var(--shadow-md);">
          <span style="font-size:0.9rem; font-weight:700; color:#4a5568; background:#e2e8f0; padding:0.3rem 0.8rem; border-radius:20px; display:inline-block; margin-bottom:0.6rem;">
            ${q.title}
          </span>
          <div style="font-size:4.8rem; margin-bottom:0.6rem; animation: float 3s ease-in-out infinite;">${q.emojis}</div>
          <h3 style="font-size:1.5rem; color:var(--text-main); margin-bottom:0.5rem; font-weight:800; line-height:1.4;">
            "${q.story}"
          </h3>
          <p style="color:var(--text-muted); font-size:1.05rem;">${q.subText}</p>
        </div>

        <!-- Choice Options -->
        <div style="display:flex; flex-direction:column; gap:1rem; margin-bottom:1.5rem;">
          ${q.choices.map((choice, cIdx) => {
            let extraStyle = "";
            let extraClass = "";
            if (state.answered) {
              if (cIdx === state.selectedIdx) {
                if (state.isCorrect) {
                  extraClass = "correct";
                  extraStyle = "border:3px solid #48bb78; background:#f0fff4;";
                } else {
                  extraClass = "wrong";
                  extraStyle = "border:3px solid #f56565; background:#fff5f5;";
                }
              }
            }
            return `
              <button class="btn-choice ${extraClass}" 
                      style="text-align:left; padding:1.25rem; align-items:flex-start; font-size:1.15rem; line-height:1.5; ${extraStyle}" 
                      onclick="level3Manager.checkChoice(${choice.isCorrect}, ${cIdx}, this)">
                ${choice.text}
              </button>
            `;
          }).join('')}
        </div>

        <!-- Feedback & Explanation Box -->
        <div id="explanationArea">
          ${state.answered && state.isCorrect ? `
            <div class="clip-theme-card" style="padding:1.2rem; background:#f0fff4; border:2px solid #48bb78; color:#22543d; text-align:center; font-weight:700; font-size:1.15rem; margin-bottom:1.5rem;">
              <i class="fa-solid fa-circle-check"></i> ${q.explanation}
            </div>
          ` : ''}
        </div>

        <!-- Bottom Navigation Bar -->
        <div style="display:flex; justify-content:space-between; align-items:center; gap:1rem;">
          <button class="primary-btn" 
                  style="padding:0.75rem 1.5rem; background:${this.currentIndex > 0 ? 'var(--primary-blue)' : '#cbd5e0'}; cursor:${this.currentIndex > 0 ? 'pointer' : 'not-allowed'};" 
                  onclick="level3Manager.prevQuestion()" ${this.currentIndex === 0 ? 'disabled' : ''}>
            <i class="fa-solid fa-arrow-left"></i> 이전 문제
          </button>

          <span style="font-weight:700; color:var(--text-muted);">
            해결한 문제: ${userState.filter(s => s.isCorrect).length} / ${totalQ}
          </span>

          ${this.currentIndex < totalQ - 1 ? `
            <button class="primary-btn pulse" 
                    style="padding:0.75rem 1.5rem; background:var(--primary-blue);" 
                    onclick="level3Manager.nextQuestion()">
              다음 문제 <i class="fa-solid fa-arrow-right"></i>
            </button>
          ` : `
            <button class="primary-btn pulse" 
                    style="padding:0.75rem 1.5rem; background:#38a169;" 
                    onclick="level3Manager.finishSubLevel()">
              레벨 완료 및 다음 레벨 진출 🎉
            </button>
          `}
        </div>

      </div>
    `;

    ttsManager.speak(`${q.story} ${q.subText}`);
  }

  switchSubLevel(targetLevel) {
    soundManager.playClick();
    if (targetLevel > this.unlockedSubLevel) {
      soundManager.playWrong();
      const prevL = targetLevel - 1;
      appState.showCelebrationModal(
        `🔒 레벨 ${targetLevel} 잠김!`,
        `이전 레벨(${prevL}단계)을 먼저 완료하시면 다음 레벨이 해제됩니다! 😊`
      );
      return;
    }
    this.currentSubLevel = targetLevel;
    this.currentIndex = 0;
    const container = document.getElementById('curriculumActivityArea');
    if (container) this.render(container);
  }

  checkChoice(isCorrect, cIdx, btn) {
    const questions = this.getCurrentQuestions();
    const userState = this.getCurrentUserState();
    const state = userState[this.currentIndex];
    const q = questions[this.currentIndex];

    // Save state
    state.answered = true;
    state.selectedIdx = cIdx;
    state.isCorrect = isCorrect;

    if (isCorrect) {
      soundManager.playCorrect();
      btn.classList.add('correct');
      appState.addStar(1);

      ttsManager.speak(q.explanation);

      const explArea = document.getElementById('explanationArea');
      if (explArea) {
        explArea.innerHTML = `
          <div class="clip-theme-card" style="padding:1.2rem; background:#f0fff4; border:2px solid #48bb78; color:#22543d; text-align:center; font-weight:700; font-size:1.15rem; margin-bottom:1.5rem; animation: popIn 0.3s ease;">
            <i class="fa-solid fa-circle-check"></i> ${q.explanation}
          </div>
        `;
      }

      // Check if all questions in this sublevel are completed
      const totalCorrect = userState.filter(s => s.isCorrect).length;
      if (totalCorrect >= questions.length) {
        setTimeout(() => {
          this.finishSubLevel();
        }, 1800);
      }
    } else {
      soundManager.playWrong();
      btn.classList.add('wrong');
      ttsManager.speak("이 상황에서 가장 따뜻하고 올바른 행동이 무엇일지 다시 생각해보세요!");
    }
  }

  goToQuestion(idx) {
    soundManager.playClick();
    this.currentIndex = idx;
    const container = document.getElementById('curriculumActivityArea');
    if (container) this.render(container);
  }

  prevQuestion() {
    if (this.currentIndex > 0) {
      this.goToQuestion(this.currentIndex - 1);
    }
  }

  nextQuestion() {
    const questions = this.getCurrentQuestions();
    if (this.currentIndex < questions.length - 1) {
      this.goToQuestion(this.currentIndex + 1);
    }
  }

  resetQuiz() {
    soundManager.playClick();
    this.currentIndex = 0;
    const userState = this.getCurrentUserState();
    userState.forEach(s => {
      s.answered = false;
      s.selectedIdx = null;
      s.isCorrect = false;
    });
    const container = document.getElementById('curriculumActivityArea');
    if (container) this.render(container);
  }

  finishSubLevel() {
    soundManager.playCelebration();
    const questions = this.getCurrentQuestions();
    const userState = this.getCurrentUserState();
    const totalCorrect = userState.filter(s => s.isCorrect).length;

    if (this.currentSubLevel === 1) {
      // Unlock Level 2
      this.unlockedSubLevel = Math.max(this.unlockedSubLevel, 2);
      localStorage.setItem('duri_l3_unlocked', this.unlockedSubLevel.toString());

      appState.showCelebrationModal(
        "🎉 레벨 1 (기초 10문제) 완파!",
        `기초 상황 10문제를 모두 멋지게 해결했어요! 🌿 레벨 2 중급 (15문제)이 해제되었습니다!`
      );

      setTimeout(() => {
        this.switchSubLevel(2);
      }, 2500);

    } else if (this.currentSubLevel === 2) {
      // Unlock Level 3
      this.unlockedSubLevel = Math.max(this.unlockedSubLevel, 3);
      localStorage.setItem('duri_l3_unlocked', this.unlockedSubLevel.toString());

      appState.showCelebrationModal(
        "🎉 레벨 2 (중급 15문제) 완파!",
        `이웃 돕기 중급 15문제를 완벽하게 해결했어요! 🌳 레벨 3 고급/심화 (10문제)가 해제되었습니다!`
      );

      setTimeout(() => {
        this.switchSubLevel(3);
      }, 2500);

    } else {
      // Completed all 3 Sub-Levels!
      appState.showCelebrationModal(
        "🏆 레벨 1~3 전체 35개 상황 파악 완성!",
        `기초(10), 중급(15), 고급(10) 총 35가지 그림 상황 파악 문제를 모두 완파하셨습니다! 당신은 최고의 배려심 깊은 어린이입니다! ⭐`
      );
    }
  }
}

window.level3Manager = new Level3Manager();
