/* ==========================================================================
   두리두리 (Duri-Duri) - Level 5: 복합 감정 / 문장 / 스토리 (Complex Story)
   Activity 1: 다양한 상황 속 감정 추측하기 (총 45문제, 3단계 레벨별 15문제)
   ========================================================================== */

class Level5Manager {
  constructor() {
    this.currentSubIndex = 0; // 0: inferEmotion, 1: arrangeSentence, 2: relatedSentence, 3: storyMaker5W1H
    this.subActivities = [
      'inferEmotion',
      'arrangeSentence',
      'relatedSentence',
      'storyMaker5W1H'
    ];

    /* --------------------------------------------------------------------------
       EMOTION SUB-LEVEL SYSTEM (총 45문제: L1=15, L2=15, L3=15)
       -------------------------------------------------------------------------- */
    this.unlockedEmotionLevel = parseInt(localStorage.getItem('duri_l5_emotion_unlocked') || '1', 10);
    this.currentEmotionLevel = 1;
    this.emotionIndex = 0;

    /* --- Level 1: 기초 감정 (기쁨, 슬픔, 화남, 놀람, 무서움) 15문제 --- */
    this.emotionL1Questions = [
      {
        id: 1,
        title: "기초 감정 1: 선물",
        emojis: "🎁💖😊",
        story: "생일 파티에서 꼭 갖고 싶었던 예쁜 로봇 선물을 받았습니다. 이때 내 마음속 감정은 어떨까요?",
        choices: [
          { text: "1. 기쁘고 너무 행복해요! 😊", isCorrect: true },
          { text: "2. 슬프고 눈물이 나와요 😢", isCorrect: false },
          { text: "3. 화가 나고 속상해요 😡", isCorrect: false }
        ],
        explanation: "맞아요! 갖고 싶던 선물을 받으면 마음이 기쁘고 행복합니다! ⭐"
      },
      {
        id: 2,
        title: "기초 감정 2: 분실",
        emojis: "🧸💔😭",
        story: "아끼던 예쁜 인형을 공원에서 그만 잃어버려서 찾지 못했어요. 이때 내 마음속 감정은 어떨까요?",
        choices: [
          { text: "1. 신나고 웃음이 나와요 😆", isCorrect: false },
          { text: "2. 속상하고 슬퍼서 눈물이 나요 😢", isCorrect: true },
          { text: "3. 졸리고 심심해요 😴", isCorrect: false }
        ],
        explanation: "참 잘했어요! 소중한 인형을 잃어버리면 슬프고 속상합니다! ⭐"
      },
      {
        id: 3,
        title: "기초 감정 3: 파괴",
        emojis: "🧱💥😡",
        story: "열심히 공들여 만든 블록 탑을 누군가 발로 툭 차서 무너뜨렸어요. 이때 내 마음속 감정은 어떨까요?",
        choices: [
          { text: "1. 화가 나고 가슴이 부글부글해요 😡", isCorrect: true },
          { text: "2. 너무 신나요 😆", isCorrect: false },
          { text: "3. 고맙고 따뜻해요 😊", isCorrect: false }
        ],
        explanation: "딩동댕! 노력해서 만든 것이 무너지면 화가 납니다! ⭐"
      },
      {
        id: 4,
        title: "기초 감정 4: 돌발 소리",
        emojis: "🎈💥😲",
        story: "길을 걸어가는데 옆에서 갑자기 커다란 풍선이 팡! 하고 터졌어요. 이때 내 마음속 감정은 어떨까요?",
        choices: [
          { text: "1. 푹 자고 싶어요 😴", isCorrect: false },
          { text: "2. 깜짝 놀라고 가슴이 쿵 했어요 😲", isCorrect: true },
          { text: "3. 배가 고파요 😋", isCorrect: false }
        ],
        explanation: "정답이에요! 갑작스러운 큰 소리에는 쿵 하고 놀라지요! ⭐"
      },
      {
        id: 5,
        title: "기초 감정 5: 천둥 번개",
        emojis: "⚡🌩️😱",
        story: "어두운 밤에 창밖에서 우르릉 쾅! 하고 커다란 천둥 번개가 쳤어요. 이때 내 마음속 감정은 어떨까요?",
        choices: [
          { text: "1. 무섭고 가슴이 쿵쾅거려요 😱", isCorrect: true },
          { text: "2. 상쾌하고 신나요 😆", isCorrect: false },
          { text: "3. 든든하고 편안해요 😊", isCorrect: false }
        ],
        explanation: "맞았습니다! 무서운 천둥 소리에는 가슴이 두근거려요! ⭐"
      },
      {
        id: 6,
        title: "기초 감정 6: 간식",
        emojis: "🍦😋🌸",
        story: "더운 날 엄마가 달콤하고 시원한 아이스크림을 사주셨어요. 이때 내 마음속 감정은 어떨까요?",
        choices: [
          { text: "1. 기분이 무척 좋고 행복해요 😋", isCorrect: true },
          { text: "2. 화가 부글부글 나요 😡", isCorrect: false },
          { text: "3. 서럽고 우울해요 😢", isCorrect: false }
        ],
        explanation: "훌륭해요! 시원하고 달콤한 간식을 먹으면 기분이 최고예요! ⭐"
      },
      {
        id: 7,
        title: "기초 감정 7: 부상",
        emojis: "🩹😭🩹",
        story: "놀이터에서 신나게 달리다가 넘어져 무릎에 피가 나고 아파요. 이때 내 마음속 감정은 어떨까요?",
        choices: [
          { text: "1. 신나서 춤이 나와요 😆", isCorrect: false },
          { text: "2. 아프고 슬퍼서 눈물이 나요 😢", isCorrect: true },
          { text: "3. 귀찮고 졸려요 😴", isCorrect: false }
        ],
        explanation: "맞아요! 다쳐서 피가 나고 아프면 눈물이 핑 돌아요! ⭐"
      },
      {
        id: 8,
        title: "기초 감정 8: 새치기",
        emojis: "🚶‍♀️💥😡",
        story: "내가 열심히 차례를 기다리는데 누군가 얌체처럼 내 앞으로 새치기했어요. 이때 내 마음속 감정은 어떨까요?",
        choices: [
          { text: "1. 화가 나고 몹시 억울해요 😡", isCorrect: true },
          { text: "2. 고맙고 기쁩니다 😊", isCorrect: false },
          { text: "3. 편안하고 차분해요 😌", isCorrect: false }
        ],
        explanation: "정답입니다! 순서를 지키지 않으면 화가 나는 게 당연해요! ⭐"
      },
      {
        id: 9,
        title: "기초 감정 9: 장난감 상자",
        emojis: "📦🎁😲",
        story: "상자 뚜껑을 열었더니 인형이 짠! 하고 스프링처럼 튀어나왔어요. 이때 내 마음속 감정은 어떨까요?",
        choices: [
          { text: "1. 속상하고 우울해요 😢", isCorrect: false },
          { text: "2. 깜짝 놀라고 신기해요 😲", isCorrect: true },
          { text: "3. 미안하고 죄송해요 😥", isCorrect: false }
        ],
        explanation: "참 잘했어요! 짠! 하고 튀어나온 모습에 신기해서 놀랐어요! ⭐"
      },
      {
        id: 10,
        title: "기초 감정 10: 어둠 소리",
        emojis: "👻🌙😱",
        story: "어둡고 조용한 방 안에서 무서운 이상한 소리가 들려왔어요. 이때 내 마음속 감정은 어떨까요?",
        choices: [
          { text: "1. 무섭고 몸이 으슬으슬 떨려요 😱", isCorrect: true },
          { text: "2. 즐겁고 신납니다 😆", isCorrect: false },
          { text: "3. 상쾌하고 기뻐요 😊", isCorrect: false }
        ],
        explanation: "딩동댕! 어두운 곳에서 들리는 소리는 무서워요! ⭐"
      },
      {
        id: 11,
        title: "기초 감정 11: 달리기 1등",
        emojis: "🏃‍♂️🥇😄",
        story: "운동회 달리기 경기에서 최선을 다해 달려 1등으로 들어왔어요. 이때 내 마음속 감정은 어떨까요?",
        choices: [
          { text: "1. 너무 기쁘고 자랑스러워요 😄", isCorrect: true },
          { text: "2. 슬프고 눈물이 납니다 😢", isCorrect: false },
          { text: "3. 화가 나서 씩씩대요 😡", isCorrect: false }
        ],
        explanation: "맞았습니다! 노력해서 1등을 하면 마음이 아주 기쁩니다! ⭐"
      },
      {
        id: 12,
        title: "기초 감정 12: 아픈 반려동물",
        emojis: "🐹🏥😢",
        story: "키우던 귀여운 햄스터가 아파서 동물병원 치료를 받으러 갔어요. 이때 내 마음속 감정은 어떨까요?",
        choices: [
          { text: "1. 안타깝고 슬퍼요 😢", isCorrect: true },
          { text: "2. 신나고 재미있어요 😆", isCorrect: false },
          { text: "3. 억울하고 씩씩대요 😡", isCorrect: false }
        ],
        explanation: "훌륭해요! 소중한 반려 동물이 아프면 마음이 아프고 슬퍼요! ⭐"
      },
      {
        id: 13,
        title: "상황 13: 훼손",
        emojis: "🧸💥😡",
        story: "동생이 허락도 없이 내 소중한 장난감을 고장 내놓았어요. 이때 내 마음속 감정은 어떨까요?",
        choices: [
          { text: "1. 너무 화가 나요 😡", isCorrect: true },
          { text: "2. 신나고 기쁩니다 😆", isCorrect: false },
          { text: "3. 고맙고 뿌듯해요 😊", isCorrect: false }
        ],
        explanation: "맞아요! 소중한 물건을 망가뜨리면 화가 나지요! ⭐"
      },
      {
        id: 14,
        title: "상황 14: 마술 소품",
        emojis: "🎩🐰😲",
        story: "마술사 아저씨가 비어있던 모자 속에서 흰 토끼를 짠! 하고 꺼냈어요. 이때 내 마음속 감정은 어떨까요?",
        choices: [
          { text: "1. 우와! 하고 신기해서 놀랐어요 😲", isCorrect: true },
          { text: "2. 억울하고 화가 납니다 😡", isCorrect: false },
          { text: "3. 아프고 슬퍼요 😢", isCorrect: false }
        ],
        explanation: "정답입니다! 가슴이 쿵쿵 신기해서 깜짝 놀랐어요! ⭐"
      },
      {
        id: 15,
        title: "상황 15: 높은 구름다리",
        emojis: "🌉🏞️😱",
        story: "높고 아슬아슬한 구름다리 위를 건너갈 때 발아래 까마득한 낭떠러지를 보았어요. 이때 내 마음속 감정은 어떨까요?",
        choices: [
          { text: "1. 아찔하고 무서워요 😱", isCorrect: true },
          { text: "2. 졸리고 평화로워요 😴", isCorrect: false },
          { text: "3. 달콤하고 신나요 😋", isCorrect: false }
        ],
        explanation: "완벽해요! 높은 곳에서 아래를 내려다보면 아찔하고 무섭습니다! ⭐"
      }
    ];

    /* --- Level 2: 중급 감정 (속상함, 짜증남, 부끄러움, 신남, 미안함) 15문제 --- */
    this.emotionL2Questions = [
      {
        id: 1,
        title: "중급 감정 1: 소풍 취소",
        emojis: "🎢🌧️😞",
        story: "주말에 가기로 한 신나는 놀이공원 소풍이 소나기 때문에 취소되었어요. 이때 내 마음은 어떨까요?",
        choices: [
          { text: "1. 너무 속상하고 아쉬워요 😞", isCorrect: true },
          { text: "2. 기뻐서 웃음이 나와요 😆", isCorrect: false },
          { text: "3. 든든하고 뿌듯해요 😌", isCorrect: false }
        ],
        explanation: "맞아요! 기대했던 소풍이 취소되면 너무나 속상합니다! ⭐"
      },
      {
        id: 2,
        title: "중급 감정 2: 연필 부러짐",
        emojis: "✏️💥😤",
        story: "공부하려고 연필을 잡았는데 연필심이 툭툭 자꾸 부러져요. 이때 내 마음은 어떨까요?",
        choices: [
          { text: "1. 답답하고 짜증이 나요 😤", isCorrect: true },
          { text: "2. 너무 신나고 재미있어요 😆", isCorrect: false },
          { text: "3. 슬프고 눈물이 나와요 😢", isCorrect: false }
        ],
        explanation: "참 잘했어요! 일이 자꾸 방해받으면 짜증이 납니다! ⭐"
      },
      {
        id: 3,
        title: "중급 감정 3: 실수 발표",
        emojis: "🎤😳💦",
        story: "친구들 앞에서 발표하다가 침이 꼴깍 넘어가 목소리가 삐걱 갈라졌어요. 이때 내 마음은 어떨까요?",
        choices: [
          { text: "1. 얼굴이 빨개지고 부끄러워요 😳", isCorrect: true },
          { text: "2. 씩씩하고 자랑스러워요 😄", isCorrect: false },
          { text: "3. 무섭고 가슴이 떨려요 😱", isCorrect: false }
        ],
        explanation: "딩동댕! 남들 앞에서 실수하면 얼굴이 빨개지고 창피해요! ⭐"
      },
      {
        id: 4,
        title: "중급 감정 4: 방학 시작",
        emojis: "🏖️😆🎉",
        story: "내일부터 기다리던 여름방학이 시작되어 시골 할머니댁에 놀러 가요. 이때 내 마음은 어떨까요?",
        choices: [
          { text: "1. 기대되고 너무 신나요 😆", isCorrect: true },
          { text: "2. 우울하고 슬픕니다 😢", isCorrect: false },
          { text: "3. 억울하고 화가 나요 😡", isCorrect: false }
        ],
        explanation: "정답이에요! 방학이 찾아오면 가슴이 두근두근 신납니다! ⭐"
      },
      {
        id: 5,
        title: "중급 감정 5: 신발 흙 묻힘",
        emojis: "👟💥😥",
        story: "실수로 지나가던 친구의 신발을 발로 툭 차서 흙을 묻혔어요. 이때 내 마음은 어떨까요?",
        choices: [
          { text: "1. 미안하고 죄송해요 😥", isCorrect: true },
          { text: "2. 기쁘고 신납니다 😆", isCorrect: false },
          { text: "3. 자랑스럽고 기뻐요 😄", isCorrect: false }
        ],
        explanation: "맞았습니다! 실수로 남에게 피해를 주면 미안해집니다! ⭐"
      },
      {
        id: 6,
        title: "중급 감정 6: 번진 그림",
        emojis: "🎨💧😞",
        story: "열심히 색칠한 그림에 음료수를 쏟아서 종이가 번져버렸어요. 이때 내 마음은 어떨까요?",
        choices: [
          { text: "1. 속상하고 눈물이 글썽여요 😞", isCorrect: true },
          { text: "2. 상쾌하고 상큼해요 😋", isCorrect: false },
          { text: "3. 우스꽝스럽고 재미있어요 😆", isCorrect: false }
        ],
        explanation: "훌륭해요! 정성껏 그린 그림이 망가지면 속상합니다! ⭐"
      },
      {
        id: 7,
        title: "중급 감정 7: 에어컨 고장",
        emojis: "☀️💦😤",
        story: "더운 여름날 에어컨이 고장 나서 방 안이 땀으로 끈적거려요. 이때 내 마음은 어떨까요?",
        choices: [
          { text: "1. 덥고 쾌쾌해서 짜증이 나요 😤", isCorrect: true },
          { text: "2. 시원하고 행복해요 😊", isCorrect: false },
          { text: "3. 고맙고 뿌듯해요 😌", isCorrect: false }
        ],
        explanation: "맞아요! 땀나고 더운 날씨에는 짜증이 나기 쉬워요! ⭐"
      },
      {
        id: 8,
        title: "중급 감정 8: 칭찬 들었을 때",
        emojis: "👗😊🌸",
        story: "짝꿍 친구가 나에게 '너 오늘 진짜 옷 예쁘다' 하고 칭찬해 주었어요. 이때 내 마음은 어떨까요?",
        choices: [
          { text: "1. 쑥스럽고 기분이 좋아요 😊", isCorrect: true },
          { text: "2. 화가 나고 답답해요 😡", isCorrect: false },
          { text: "3. 무섭고 아픕니다 😱", isCorrect: false }
        ],
        explanation: "정답입니다! 칭찬을 받으면 부끄러우면서도 마음이 미소 지어져요! ⭐"
      },
      {
        id: 9,
        title: "중급 감정 9: 워터파크",
        emojis: "🏊‍♂️😆🌊",
        story: "워터파크에 가서 커다란 미끄럼틀을 쌩하고 타고 내려왔어요. 이때 내 마음은 어떨까요?",
        choices: [
          { text: "1. 가슴이 뻥 뚫리고 신나요 😆", isCorrect: true },
          { text: "2. 슬프고 속상해요 😢", isCorrect: false },
          { text: "3. 귀찮고 졸려요 😴", isCorrect: false }
        ],
        explanation: "참 잘했어요! 신나는 놀이기구는 가슴이 뻥 뚫리게 재미있어요! ⭐"
      },
      {
        id: 10,
        title: "중급 감정 10: 약속 지각",
        emojis: "⏰😥🏃‍♂️",
        story: "약속 시간에 10분이나 늦어서 친구를 길에서 기다리게 했어요. 이때 내 마음은 어떨까요?",
        choices: [
          { text: "1. 미안하고 안절부절못해요 😥", isCorrect: true },
          { text: "2. 당당하고 자랑스러워요 😄", isCorrect: false },
          { text: "3. 신나고 재미있어요 😆", isCorrect: false }
        ],
        explanation: "딩동댕! 기다려준 친구에게 미안한 마음이 커져요! ⭐"
      },
      {
        id: 11,
        title: "중급 감정 11: 피아노 탈락",
        emojis: "🎹😞💧",
        story: "열심히 연습한 피아노 발표회에서 건반을 잘못 눌러 상을 못 받았어요. 이때 내 마음은 어떨까요?",
        choices: [
          { text: "1. 아쉽고 속상해요 😞", isCorrect: true },
          { text: "2. 기쁘고 춤추고 싶어요 😆", isCorrect: false },
          { text: "3. 편안하고 느긋해요 😌", isCorrect: false }
        ],
        explanation: "맞았습니다! 실수로 상을 놓치면 속상하고 아쉬워요! ⭐"
      },
      {
        id: 12,
        title: "중급 감정 12: 공부 방해",
        emojis: "✍️👶😤",
        story: "동생이 계속 옆에서 장난치며 알짱거려 내 공부를 방해해요. 이때 내 마음은 어떨까요?",
        choices: [
          { text: "1. 툴툴대며 짜증이 나요 😤", isCorrect: true },
          { text: "2. 고맙고 따뜻해요 😊", isCorrect: false },
          { text: "3. 상쾌하고 상큼해요 😋", isCorrect: false }
        ],
        explanation: "훌륭합니다! 집중해야 할 때 방해받으면 짜증이 납니다! ⭐"
      },
      {
        id: 13,
        title: "중급 감정 13: 엉덩방아",
        emojis: "👟💥😳",
        story: "길을 걸어가다가 발이 꼬여서 쿵 하고 바닥에 엉덩방아를 찧었어요. 이때 내 마음은 어떨까요?",
        choices: [
          { text: "1. 창피하고 얼굴이 화끈거려요 😳", isCorrect: true },
          { text: "2. 너무 신나고 자랑스러워요 😄", isCorrect: false },
          { text: "3. 우울하고 슬픕니다 😢", isCorrect: false }
        ],
        explanation: "맞아요! 사람이 많은 곳에서 넘어지면 부끄럽고 창피해요! ⭐"
      },
      {
        id: 14,
        title: "중급 감정 14: 퍼레이드 구경",
        emojis: "🎡🍭😆",
        story: "좋아하는 놀이공원에 가서 솜사탕을 들고 밤 퍼레이드를 구경해요. 이때 내 마음은 어떨까요?",
        choices: [
          { text: "1. 환상적이고 너무 신나요 😆", isCorrect: true },
          { text: "2. 화가 부글부글 나요 😡", isCorrect: false },
          { text: "3. 무섭고 떨립니다 😱", isCorrect: false }
        ],
        explanation: "정답이에요! 예쁜 야간 퍼레이드는 너무나 신납니다! ⭐"
      },
      {
        id: 15,
        title: "중급 감정 15: 흠집 냄",
        emojis: "🧸💥😥",
        story: "친구의 장난감을 빌려서 가지고 놀다가 실수로 살짝 흠집을 냈어요. 이때 내 마음은 어떨까요?",
        choices: [
          { text: "1. 조마조마하고 미안해요 😥", isCorrect: true },
          { text: "2. 통쾌하고 신납니다 😆", isCorrect: false },
          { text: "3. 느긋하고 졸려요 😴", isCorrect: false }
        ],
        explanation: "완벽해요! 남의 물건을 망가뜨리면 미안해서 조마조마합니다! ⭐"
      }
    ];

    /* --- Level 3: 고급/복합 감정 (뿌듯함, 아쉬움, 질투함, 서운함, 감동함, 억울함) 15문제 --- */
    this.emotionL3Questions = [
      {
        id: 1,
        title: "고급 감정 1: 성취",
        emojis: "📐✏️😌",
        story: "아무리 풀어도 안 나오던 어려운 수학 문제를 혼자 힘으로 끝까지 풀어내었어요. 이때 내 마음은 어떨까요?",
        choices: [
          { text: "1. 뿌듯하고 성취감이 넘쳐요 😌✨", isCorrect: true },
          { text: "2. 억울하고 속상해요 😣", isCorrect: false },
          { text: "3. 무섭고 떨립니다 😱", isCorrect: false }
        ],
        explanation: "맞아요! 힘든 과제를 스스로 완성하면 뿌듯한 성취감이 들어요! ⭐"
      },
      {
        id: 2,
        title: "고급 감정 2: 작별",
        emojis: "🚗🥺👋",
        story: "즐거웠던 삼촌과의 주말 여행이 끝이 나고 집으로 돌아갈 시간이 되었어요. 이때 내 마음은 어떨까요?",
        choices: [
          { text: "1. 더 놀고 싶고 아쉬워요 🥺", isCorrect: true },
          { text: "2. 화가 나고 짜증이 납니다 😤", isCorrect: false },
          { text: "3. 창피하고 부끄러워요 😳", isCorrect: false }
        ],
        explanation: "참 잘했어요! 재미있는 시간이 끝날 때는 마음이 아쉽습니다! ⭐"
      },
      {
        id: 3,
        title: "고급 감정 3: 남의 선물",
        emojis: "💻😒✨",
        story: "내 친구가 최신형 컴퓨터를 선물 받았다며 반 친구들에게 자랑하고 있어요. 이때 내 마음은 어떨까요?",
        choices: [
          { text: "1. 부럽고 괜히 샘이 나요 😒", isCorrect: true },
          { text: "2. 상쾌하고 슬픕니다 😢", isCorrect: false },
          { text: "3. 미안하고 죄송해요 😥", isCorrect: false }
        ],
        explanation: "딩동댕! 남이 더 좋은 걸 가지면 부럽고 시기하는 마음이 들 수 있어요! ⭐"
      },
      {
        id: 4,
        title: "고급 감정 4: 잊혀짐",
        emojis: "🎂😔💔",
        story: "오늘이 내 생일인데 가장 친한 친구가 축하한다는 말 한마디 없이 지나쳤어요. 이때 내 마음은 어떨까요?",
        choices: [
          { text: "1. 마음이 섭섭하고 서운해요 😔", isCorrect: true },
          { text: "2. 신나고 기쁩니다 😆", isCorrect: false },
          { text: "3. 자랑스럽고 뿌듯해요 😌", isCorrect: false }
        ],
        explanation: "정답이에요! 기대했던 관심이나 축하를 못 받으면 서운합니다! ⭐"
      },
      {
        id: 5,
        title: "고급 감정 5: 친구의 간호",
        emojis: "🤒🍲🥺",
        story: "내가 감기로 아플 때 친구가 걱정하며 직접 쓴 편지와 따뜻한 죽을 가져왔어요. 이때 내 마음은 어떨까요?",
        choices: [
          { text: "1. 가슴이 뭉클하고 감동적이에요 🥺💖", isCorrect: true },
          { text: "2. 짜증 나고 답답해요 😤", isCorrect: false },
          { text: "3. 억울하고 씩씩대요 😣", isCorrect: false }
        ],
        explanation: "맞았습니다! 타인의 따뜻한 진심과 위로는 깊은 감동을 줍니다! ⭐"
      },
      {
        id: 6,
        title: "고급 감정 6: 누명",
        emojis: "💥😣💦",
        story: "내가 절대 하지 않은 일인데 친구가 나를 의심하고 모함하며 화를 냈어요. 이때 내 마음은 어떨까요?",
        choices: [
          { text: "1. 억울하고 가슴이 타들어 가요 😣", isCorrect: true },
          { text: "2. 신나고 고맙습니다 😆", isCorrect: false },
          { text: "3. 편안하고 졸려요 😴", isCorrect: false }
        ],
        explanation: "훌륭해요! 오해를 받고 모함을 당하면 너무나 억울해요! ⭐"
      },
      {
        id: 7,
        title: "고급 감정 7: 청소 완성",
        emojis: "🧹✨😌",
        story: "주말에 방 청소를 구석구석 깨끗이 하고 나니 방이 반짝반짝 빛나요. 이때 내 마음은 어떨까요?",
        choices: [
          { text: "1. 상쾌하고 뿌듯해요 😌", isCorrect: true },
          { text: "2. 슬프고 아쉽습니다 🥺", isCorrect: false },
          { text: "3. 부끄럽고 창피해요 😳", isCorrect: false }
        ],
        explanation: "맞아요! 열심히 가꾼 자리를 보면 개운하고 뿌듯해요! ⭐"
      },
      {
        id: 8,
        title: "고급 감정 8: 아쉬운 2등",
        emojis: "⚽🥈🥺",
        story: "결승전 축구 경기에서 최선을 다했지만 한 골 차이로 아깝게 2등을 했어요. 이때 내 마음은 어떨까요?",
        choices: [
          { text: "1. 최선을 다했지만 아쉬워요 🥺", isCorrect: true },
          { text: "2. 통쾌하고 신납니다 😆", isCorrect: false },
          { text: "3. 미안하고 죄송해요 😥", isCorrect: false }
        ],
        explanation: "정답입니다! 조금 부족하게 놓치면 아쉬움이 크게 남아요! ⭐"
      },
      {
        id: 9,
        title: "고급 감정 9: 짝꿍 상장",
        emojis: "🏆😒✨",
        story: "짝꿍이 미술 대회에서 아주 멋진 그림으로 1등 큰 상장을 받았어요. 이때 내 마음은 어떨까요?",
        choices: [
          { text: "1. 축하하면서도 부러운 마음이 들어요 😒", isCorrect: true },
          { text: "2. 억울하고 화가 납니다 😣", isCorrect: false },
          { text: "3. 졸리고 심심해요 😴", isCorrect: false }
        ],
        explanation: "참 잘했어요! 축하해 주면서도 부러운 샘이 나는 것이 사람 마음이에요! ⭐"
      },
      {
        id: 10,
        title: "고급 감정 10: 소외감",
        emojis: "👫😔💔",
        story: "함께 놀자고 말했는데 친구들이 나를 쏙 빼놓고 저희끼리 신나게 놀러 갔어요. 이때 내 마음은 어떨까요?",
        choices: [
          { text: "1. 외롭고 서운해요 😔", isCorrect: true },
          { text: "2. 신나고 행복합니다 😆", isCorrect: false },
          { text: "3. 자랑스럽고 뿌듯해요 😌", isCorrect: false }
        ],
        explanation: "딩동댕! 나만 혼자 빼놓아지면 마음이 씁쓸하고 서운해요! ⭐"
      },
      {
        id: 11,
        title: "고급 감정 11: 어버이날 편지",
        emojis: "💌🥺💖",
        story: "부모님께서 내가 직접 접어 만든 편지를 보시고 눈시울이 붉어지며 꼭 안아주셨어요. 이때 내 마음은 어떨까요?",
        choices: [
          { text: "1. 따뜻하고 가슴 깊이 감동해요 🥺💖", isCorrect: true },
          { text: "2. 짜증 나고 더워요 😤", isCorrect: false },
          { text: "3. 억울하고 답답합니다 😣", isCorrect: false }
        ],
        explanation: "맞았습니다! 사랑을 주고받으면 감동의 눈물이 흐릅니다! ⭐"
      },
      {
        id: 12,
        title: "고급 감정 12: 동생의 실수 오해",
        emojis: "🍵💥😣",
        story: "동생이 유리컵을 깨뜨렸는데 엄마가 나에게 '네가 그랬지!' 하고 화를 내셨어요. 이때 내 마음은 어떨까요?",
        choices: [
          { text: "1. 너무 억울해서 눈물이 왈칵 나요 😣", isCorrect: true },
          { text: "2. 기쁘고 상쾌해요 😆", isCorrect: false },
          { text: "3. 자랑스럽고 뿌듯합니다 😌", isCorrect: false }
        ],
        explanation: "훌륭합니다! 내 잘못이 아닌데 오해를 받으면 억울해서 눈물이 나와요! ⭐"
      },
      {
        id: 13,
        title: "고급 감정 13: 짐 돕기 감사",
        emojis: "👵🛍️😌",
        story: "무거운 장바구니를 든 할머니를 도와드리고 '착한 학생 고마워' 인사를 받았어요. 이때 내 마음은 어떨까요?",
        choices: [
          { text: "1. 마음이 훈훈하고 뿌듯해요 😌", isCorrect: true },
          { text: "2. 섭섭하고 서운해요 😔", isCorrect: false },
          { text: "3. 억울하고 답답합니다 😣", isCorrect: false }
        ],
        explanation: "맞아요! 이웃을 돕고 배려하면 가슴속이 따뜻하고 뿌듯해요! ⭐"
      },
      {
        id: 14,
        title: "고급 감정 14: 영화 클라이맥스",
        emojis: "🎬🥺❓",
        story: "정말 재밌는 영화가 최고 클라이맥스 장면에서 '다음 주에 이어집니다' 하고 끝났어요. 이때 내 마음은 어떨까요?",
        choices: [
          { text: "1. 다음 편이 너무 궁금하고 아쉬워요 🥺", isCorrect: true },
          { text: "2. 화가 부글부글 나요 😡", isCorrect: false },
          { text: "3. 창피하고 부끄럽습니다 😳", isCorrect: false }
        ],
        explanation: "정답이에요! 손에 땀을 쥐게 하다가 끝나면 너무 아쉽지요! ⭐"
      },
      {
        id: 15,
        title: "고급 감정 15: 저금통 기부",
        emojis: "🪙💌🥺",
        story: "어려운 이웃을 위해 모아둔 저금통을 기부하고 감사 편지를 전달받았어요. 이때 내 마음은 어떨까요?",
        choices: [
          { text: "1. 가슴이 뭉클하고 행복해요 🥺💖", isCorrect: true },
          { text: "2. 억울하고 속상합니다 😣", isCorrect: false },
          { text: "3. 툴툴대며 짜증이 나요 😤", isCorrect: false }
        ],
        explanation: "완벽해요! 나눔을 실천하면 내 마음도 더 커지고 감동스럽습니다! ⭐"
      }
    ];

    // State tracking for all 3 emotion levels
    this.emotionStateL1 = this.emotionL1Questions.map(() => ({ answered: false, selectedIdx: null, isCorrect: false }));
    this.emotionStateL2 = this.emotionL2Questions.map(() => ({ answered: false, selectedIdx: null, isCorrect: false }));
    this.emotionStateL3 = this.emotionL3Questions.map(() => ({ answered: false, selectedIdx: null, isCorrect: false }));
  }

  render(container) {
    const activityName = this.subActivities[this.currentSubIndex];
    let html = `
      <div class="sub-nav-bar">
        <button class="sub-nav-btn ${this.currentSubIndex===0?'active':''}" onclick="level5Manager.switchSub(0)"><i class="fa-solid fa-heart-crack"></i> 1. 다양한 감정 추측 (45문제)</button>
        <button class="sub-nav-btn ${this.currentSubIndex===1?'active':''}" onclick="level5Manager.switchSub(1)"><i class="fa-solid fa-layer-group"></i> 2. 문장 조립</button>
        <button class="sub-nav-btn ${this.currentSubIndex===2?'active':''}" onclick="level5Manager.switchSub(2)"><i class="fa-solid fa-link"></i> 3. 연관 문장</button>
        <button class="sub-nav-btn ${this.currentSubIndex===3?'active':''}" onclick="level5Manager.switchSub(3)"><i class="fa-solid fa-pen-nib"></i> 4. 6하원칙 스토리</button>
      </div>
      <div id="level5SubWorkspace"></div>
    `;
    container.innerHTML = html;

    const workspace = document.getElementById('level5SubWorkspace');
    if (activityName === 'inferEmotion') this.renderInferEmotion(workspace);
    else if (activityName === 'arrangeSentence') this.renderArrangeSentence(workspace);
    else if (activityName === 'relatedSentence') this.renderRelatedSentence(workspace);
    else if (activityName === 'storyMaker5W1H') this.renderStoryMaker5W1H(workspace);
  }

  switchSub(idx) {
    soundManager.playClick();
    this.currentSubIndex = idx;
    const container = document.getElementById('curriculumActivityArea');
    if (container) this.render(container);
  }

  /* --------------------------------------------------------------------------
     1. Emotion Inference Renderer (45 Questions, 3 Levels)
     -------------------------------------------------------------------------- */
  getCurrentEmotionQuestions() {
    if (this.currentEmotionLevel === 1) return this.emotionL1Questions;
    if (this.currentEmotionLevel === 2) return this.emotionL2Questions;
    return this.emotionL3Questions;
  }

  getCurrentEmotionUserState() {
    if (this.currentEmotionLevel === 1) return this.emotionStateL1;
    if (this.currentEmotionLevel === 2) return this.emotionStateL2;
    return this.emotionStateL3;
  }

  renderInferEmotion(workspace) {
    const questions = this.getCurrentEmotionQuestions();
    const userState = this.getCurrentEmotionUserState();
    const q = questions[this.emotionIndex];
    const state = userState[this.emotionIndex];
    const totalQ = questions.length;

    let levelBadgeTitle = "";
    if (this.currentEmotionLevel === 1) levelBadgeTitle = "🐣 레벨 1 (기초 감정 15개)";
    else if (this.currentEmotionLevel === 2) levelBadgeTitle = "🌿 레벨 2 (중급 감정 15개)";
    else levelBadgeTitle = "🌳 레벨 3 (고급/복합 감정 15개)";

    workspace.innerHTML = `
      <!-- Sub-Level Selector Navigation Bar -->
      <div style="display:flex; justify-content:center; gap:0.6rem; margin-bottom:1.5rem; flex-wrap:wrap;">
        <button class="primary-btn ${this.currentEmotionLevel===1?'active':''}" 
                style="padding:0.5rem 1rem; font-size:0.9rem; background:${this.currentEmotionLevel===1?'var(--primary-blue)':'#cbd5e0'}; cursor:pointer;"
                onclick="level5Manager.switchEmotionSubLevel(1)">
          🐣 레벨 1: 기초 감정 (15개)
        </button>
        <button class="primary-btn ${this.currentEmotionLevel===2?'active':''}" 
                style="padding:0.5rem 1rem; font-size:0.9rem; background:${this.currentEmotionLevel===2?'var(--primary-blue)':(this.unlockedEmotionLevel>=2?'#718096':'#e2e8f0')}; opacity:${this.unlockedEmotionLevel>=2?1:0.7}; cursor:pointer;"
                onclick="level5Manager.switchEmotionSubLevel(2)">
          ${this.unlockedEmotionLevel >= 2 ? '🌿 레벨 2: 중급 감정 (15개)' : '🔒 레벨 2 (잠김)'}
        </button>
        <button class="primary-btn ${this.currentEmotionLevel===3?'active':''}" 
                style="padding:0.5rem 1rem; font-size:0.9rem; background:${this.currentEmotionLevel===3?'var(--primary-blue)':(this.unlockedEmotionLevel>=3?'#718096':'#e2e8f0')}; opacity:${this.unlockedEmotionLevel>=3?1:0.7}; cursor:pointer;"
                onclick="level5Manager.switchEmotionSubLevel(3)">
          ${this.unlockedEmotionLevel >= 3 ? '🌳 레벨 3: 고급/복합 감정 (15개)' : '🔒 레벨 3 (잠김)'}
        </button>
      </div>

      <div class="activity-header">
        <div class="activity-header-text">
          <h2>😊 다양한 상황속 감정 추측하기 <span style="font-size:1.05rem; color:var(--accent-coral); font-weight:800; margin-left:0.5rem;">[ ${levelBadgeTitle} ]</span></h2>
          <p>이야기 상황을 듣고 인물의 마음속 감정을 맞혀보세요!</p>
        </div>
        <button class="speak-btn" onclick="ttsManager.speak('${q.story}')" title="이야기 다시 듣기">
          <i class="fa-solid fa-volume-high"></i>
        </button>
      </div>

      <div style="max-width:800px; margin:0 auto;">
        
        <!-- Top Pagination & Progress Indicator -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; background:white; padding:0.8rem 1.2rem; border-radius:15px; border:2px solid var(--border-color); box-shadow:var(--shadow-sm);">
          <div style="font-weight:800; font-size:1.15rem; color:var(--primary-blue);">
            <i class="fa-solid fa-face-smile"></i> 문제 ${this.emotionIndex + 1} / ${totalQ}
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
              if (idx === this.emotionIndex) {
                return `<button onclick="level5Manager.goToEmotionQuestion(${idx})" style="width:28px; height:28px; border-radius:50%; background:${bg}; color:${color}; font-weight:800; border:3px solid var(--primary-blue); cursor:pointer;">${idx+1}</button>`;
              }
              return `<button onclick="level5Manager.goToEmotionQuestion(${idx})" style="width:28px; height:28px; border-radius:50%; background:${bg}; color:${color}; font-weight:700; border:none; cursor:pointer;">${idx+1}</button>`;
            }).join('')}
          </div>
          <button class="primary-btn" style="padding:0.4rem 0.8rem; font-size:0.85rem; background:#718096;" onclick="level5Manager.resetEmotionQuiz()">
            <i class="fa-solid fa-rotate-right"></i> 다시 풀기
          </button>
        </div>

        <!-- Emotion Situation Box -->
        <div class="clip-theme-card" style="padding:2rem; text-align:center; background:#fff0f3; border:3px dashed var(--accent-peach); margin-bottom:1.5rem; box-shadow:var(--shadow-md);">
          <span style="font-size:0.9rem; font-weight:700; color:#d69e2e; background:#fefcbf; padding:0.3rem 0.8rem; border-radius:20px; display:inline-block; margin-bottom:0.6rem;">
            ${q.title}
          </span>
          <div style="font-size:4.5rem; margin-bottom:0.6rem; animation: float 3s ease-in-out infinite;">${q.emojis}</div>
          <h3 style="font-size:1.4rem; color:var(--text-main); font-weight:800; line-height:1.5; margin:0;">
            "${q.story}"
          </h3>
        </div>

        <!-- Emotion Choices Grid -->
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
                      style="text-align:left; padding:1.25rem; font-size:1.2rem; font-weight:700; ${extraStyle}" 
                      onclick="level5Manager.checkEmotionChoice(${choice.isCorrect}, ${cIdx}, this)">
                ${choice.text}
              </button>
            `;
          }).join('')}
        </div>

        <!-- Explanation Area -->
        <div id="emotionExplArea">
          ${state.answered && state.isCorrect ? `
            <div class="clip-theme-card" style="padding:1.2rem; background:#f0fff4; border:2px solid #48bb78; color:#22543d; text-align:center; font-weight:700; font-size:1.15rem; margin-bottom:1.5rem;">
              <i class="fa-solid fa-circle-check"></i> ${q.explanation}
            </div>
          ` : ''}
        </div>

        <!-- Bottom Navigation Bar -->
        <div style="display:flex; justify-content:space-between; align-items:center; gap:1rem;">
          <button class="primary-btn" 
                  style="padding:0.75rem 1.5rem; background:${this.emotionIndex > 0 ? 'var(--primary-blue)' : '#cbd5e0'}; cursor:${this.emotionIndex > 0 ? 'pointer' : 'not-allowed'};" 
                  onclick="level5Manager.prevEmotionQuestion()" ${this.emotionIndex === 0 ? 'disabled' : ''}>
            <i class="fa-solid fa-arrow-left"></i> 이전 문제
          </button>

          <span style="font-weight:700; color:var(--text-muted);">
            해결한 문제: ${userState.filter(s => s.isCorrect).length} / ${totalQ}
          </span>

          ${this.emotionIndex < totalQ - 1 ? `
            <button class="primary-btn pulse" 
                    style="padding:0.75rem 1.5rem; background:var(--primary-blue);" 
                    onclick="level5Manager.nextEmotionQuestion()">
              다음 문제 <i class="fa-solid fa-arrow-right"></i>
            </button>
          ` : `
            <button class="primary-btn pulse" 
                    style="padding:0.75rem 1.5rem; background:#38a169;" 
                    onclick="level5Manager.finishEmotionSubLevel()">
              레벨 완료 및 다음 레벨 진출 🎉
            </button>
          `}
        </div>

      </div>
    `;

    ttsManager.speak(q.story);
  }

  switchEmotionSubLevel(targetLevel) {
    soundManager.playClick();
    if (targetLevel > this.unlockedEmotionLevel) {
      soundManager.playWrong();
      const prevL = targetLevel - 1;
      appState.showCelebrationModal(
        `🔒 감정 레벨 ${targetLevel} 잠김!`,
        `이전 감정 레벨(${prevL}단계) 15문제를 먼저 해소하시면 다음 레벨이 해제됩니다! 😊`
      );
      return;
    }
    this.currentEmotionLevel = targetLevel;
    this.emotionIndex = 0;
    const workspace = document.getElementById('level5SubWorkspace');
    if (workspace) this.renderInferEmotion(workspace);
  }

  checkEmotionChoice(isCorrect, cIdx, btn) {
    const questions = this.getCurrentEmotionQuestions();
    const userState = this.getCurrentEmotionUserState();
    const state = userState[this.emotionIndex];
    const q = questions[this.emotionIndex];

    state.answered = true;
    state.selectedIdx = cIdx;
    state.isCorrect = isCorrect;

    if (isCorrect) {
      soundManager.playCorrect();
      btn.classList.add('correct');
      appState.addStar(1);

      ttsManager.speak(q.explanation);

      const explArea = document.getElementById('emotionExplArea');
      if (explArea) {
        explArea.innerHTML = `
          <div class="clip-theme-card" style="padding:1.2rem; background:#f0fff4; border:2px solid #48bb78; color:#22543d; text-align:center; font-weight:700; font-size:1.15rem; margin-bottom:1.5rem; animation: popIn 0.3s ease;">
            <i class="fa-solid fa-circle-check"></i> ${q.explanation}
          </div>
        `;
      }

      const totalCorrect = userState.filter(s => s.isCorrect).length;
      if (totalCorrect >= questions.length) {
        setTimeout(() => {
          this.finishEmotionSubLevel();
        }, 1800);
      }
    } else {
      soundManager.playWrong();
      btn.classList.add('wrong');
      ttsManager.speak("이 상황일 때 인물의 마음이 어떨지 다시 한번 깊이 떠올려보세요!");
    }
  }

  goToEmotionQuestion(idx) {
    soundManager.playClick();
    this.emotionIndex = idx;
    const workspace = document.getElementById('level5SubWorkspace');
    if (workspace) this.renderInferEmotion(workspace);
  }

  prevEmotionQuestion() {
    if (this.emotionIndex > 0) {
      this.goToEmotionQuestion(this.emotionIndex - 1);
    }
  }

  nextEmotionQuestion() {
    const questions = this.getCurrentEmotionQuestions();
    if (this.emotionIndex < questions.length - 1) {
      this.goToEmotionQuestion(this.emotionIndex + 1);
    }
  }

  resetEmotionQuiz() {
    soundManager.playClick();
    this.emotionIndex = 0;
    const userState = this.getCurrentEmotionUserState();
    userState.forEach(s => {
      s.answered = false;
      s.selectedIdx = null;
      s.isCorrect = false;
    });
    const workspace = document.getElementById('level5SubWorkspace');
    if (workspace) this.renderInferEmotion(workspace);
  }

  finishEmotionSubLevel() {
    soundManager.playCelebration();
    const userState = this.getCurrentEmotionUserState();
    const totalCorrect = userState.filter(s => s.isCorrect).length;

    if (this.currentEmotionLevel === 1) {
      this.unlockedEmotionLevel = Math.max(this.unlockedEmotionLevel, 2);
      localStorage.setItem('duri_l5_emotion_unlocked', this.unlockedEmotionLevel.toString());

      appState.showCelebrationModal(
        "🎉 기초 감정 15문제 완파!",
        `기초 감정 15문제를 모두 완벽하게 해결했어요! 🌿 레벨 2 (중급 감정 15개)가 해제되었습니다!`
      );

      setTimeout(() => {
        this.switchEmotionSubLevel(2);
      }, 2500);

    } else if (this.currentEmotionLevel === 2) {
      this.unlockedEmotionLevel = Math.max(this.unlockedEmotionLevel, 3);
      localStorage.setItem('duri_l5_emotion_unlocked', this.unlockedEmotionLevel.toString());

      appState.showCelebrationModal(
        "🎉 중급 감정 15문제 완파!",
        `속상함, 짜증, 부끄러움 등 중급 감정 15문제를 완파했어요! 🌳 레벨 3 (고급/복합 감정 15개)이 해제되었습니다!`
      );

      setTimeout(() => {
        this.switchEmotionSubLevel(3);
      }, 2500);

    } else {
      appState.showCelebrationModal(
        "🏆 감정 추측하기 총 45문제 완성!",
        `기초(15), 중급(15), 고급/복합(15) 총 45가지 감정 상황을 모두 파악하셨습니다! 마음을 헤아릴 줄 아는 당신은 최고의 감성 박사입니다! ⭐`
      );
    }
  }

  /* --------------------------------------------------------------------------
     2. Sentence Block Ordering
     -------------------------------------------------------------------------- */
  renderArrangeSentence(workspace) {
    const promptText = "낱말 조각 카드를 순서대로 눌러 '엄마가 밥을 해주신다' 문장을 완성하세요!";
    this.sentenceArray = [];
    workspace.innerHTML = `
      <div class="activity-header">
        <div class="activity-header-text">
          <h2>🧩 단어 카드 문장 완성</h2>
          <p>${promptText}</p>
        </div>
        <button class="speak-btn" onclick="ttsManager.speak('${promptText}')"><i class="fa-solid fa-volume-high"></i></button>
      </div>

      <div style="max-width:650px; margin: 0 auto; text-align:center;">
        <div class="clip-theme-card" style="padding:2rem; background:#fffbe6; margin-bottom:1.5rem;">
          <h3 style="font-size:2rem; font-family:var(--font-family-friendly); min-height:45px;" id="sentenceDisplay">
            [ 단어를 클릭하세요 ]
          </h3>
        </div>

        <div style="display:flex; gap:1rem; justify-content:center;">
          <button class="btn-choice" style="font-size:1.4rem; padding:1rem;" onclick="level5Manager.pickSentenceWord('해주신다')">해주신다</button>
          <button class="btn-choice" style="font-size:1.4rem; padding:1rem;" onclick="level5Manager.pickSentenceWord('엄마가')">엄마가</button>
          <button class="btn-choice" style="font-size:1.4rem; padding:1rem;" onclick="level5Manager.pickSentenceWord('밥을')">밥을</button>
        </div>
      </div>
    `;
    ttsManager.speak(promptText);
  }

  pickSentenceWord(word) {
    soundManager.playClick();
    this.sentenceArray.push(word);
    const full = this.sentenceArray.join(" ");
    const elem = document.getElementById('sentenceDisplay');
    if (elem) elem.innerText = full;

    if (full === "엄마가 밥을 해주신다") {
      soundManager.playCorrect();
      appState.addStar(1);
      ttsManager.speak("정답입니다! 엄마가 밥을 해주신다 문장을 멋지게 만들었어요!");
      appState.showCelebrationModal("문장 조립 완성!", "완벽한 한글 문장이 완성되었어요! ✨");
    } else if (this.sentenceArray.length >= 3) {
      soundManager.playWrong();
      this.sentenceArray = [];
      setTimeout(() => { if (elem) elem.innerText = "[ 단어를 클릭하세요 ]"; }, 800);
      ttsManager.speak("순서가 맞지 않아요. 엄마가, 밥을, 해주신다 순서로 다시 눌러보세요!");
    }
  }

  /* --------------------------------------------------------------------------
     3. Contextual Related Sentence Match
     -------------------------------------------------------------------------- */
  renderRelatedSentence(workspace) {
    const context = "'덥고 뜨거운 한여름 ☀️' 날씨 상황 뒤에 이어질 알맞은 행동 문장은 무엇일까요?";
    workspace.innerHTML = `
      <div class="activity-header">
        <div class="activity-header-text">
          <h2>🍉 연관성 있는 문장 연결</h2>
          <p>${context}</p>
        </div>
        <button class="speak-btn" onclick="ttsManager.speak('${context}')"><i class="fa-solid fa-volume-high"></i></button>
      </div>

      <div style="max-width:700px; margin:0 auto;">
        <div class="clip-theme-card" style="padding:1.5rem; text-align:center; background:#fff5f5; margin-bottom:1.5rem;">
          <h3 style="font-size:1.6rem;">☀️ [ 덥고 뜨거운 한여름 ] ➔ ( ? )</h3>
        </div>

        <div style="display:flex; flex-direction:column; gap:1rem;">
          <button class="btn-choice" style="text-align:left; padding:1.25rem;" onclick="level5Manager.checkRelated(false, this)">
            ❄️ 두꺼운 털패딩을 입고 썰매를 타요.
          </button>
          <button class="btn-choice" style="text-align:left; padding:1.25rem;" onclick="level5Manager.checkRelated(true, this)">
            🍉 시원한 수박을 먹고 선풍기를 틀어요.
          </button>
          <button class="btn-choice" style="text-align:left; padding:1.25rem;" onclick="level5Manager.checkRelated(false, this)">
            🍂 낙엽을 모아서 낙엽 불을 쬐어요.
          </button>
        </div>
      </div>
    `;
    ttsManager.speak(context);
  }

  checkRelated(isCorrect, btn) {
    if (isCorrect) {
      soundManager.playCorrect();
      btn.classList.add('correct');
      appState.addStar(1);
      ttsManager.speak("참 잘했어요! 여름에는 시원한 수박을 먹고 선풍기를 틀어요 🍉");
    } else {
      soundManager.playWrong();
      btn.classList.add('wrong');
      ttsManager.speak("무더운 여름 날씨에 어울리는 활동을 골라보세요!");
    }
  }

  /* --------------------------------------------------------------------------
     4. 5W1H 6하원칙 Story Maker
     -------------------------------------------------------------------------- */
  renderStoryMaker5W1H(workspace) {
    const promptText = "6하원칙(누가, 언제, 어디서, 무엇을, 어떻게, 왜)에 맞추어 멋진 이야기를 완성해보세요!";
    workspace.innerHTML = `
      <div class="activity-header">
        <div class="activity-header-text">
          <h2>✍️ 6하원칙 (5W1H) 스토리 메이커</h2>
          <p>${promptText}</p>
        </div>
        <button class="speak-btn" onclick="ttsManager.speak('${promptText}')"><i class="fa-solid fa-volume-high"></i></button>
      </div>

      <div class="grid-2" style="max-width:850px; margin: 0 auto;">
        <div class="clip-theme-card" style="padding:1.5rem;">
          <h4 style="margin-bottom:0.75rem; color:var(--text-muted);">6하원칙 카드 조각:</h4>
          <div style="display:flex; flex-direction:column; gap:0.5rem;">
            <div class="order-item">👤 누가: <strong>두리(강아지)가 🐶</strong></div>
            <div class="order-item">⏰ 언제: <strong>오늘 아침 ☀️</strong></div>
            <div class="order-item">📍 어디서: <strong>공원에서 🏞️</strong></div>
            <div class="order-item">🦴 무엇을: <strong>맛있는 뼈다귀를 🦴</strong></div>
            <div class="order-item">🏃 어떻게: <strong>신나게 달리며 🏃</strong></div>
            <div class="order-item">❤️ 왜: <strong>기분이 너무 좋아서 ❤️</strong></div>
          </div>
        </div>
        <div class="clip-theme-card" style="padding:1.5rem; background:#f0fff4;">
          <h4 style="margin-bottom:0.75rem; color:#276749;">완성된 멋진 스토리:</h4>
          <p style="font-size:1.25rem; font-weight:600; line-height:1.7; color:#1c4532;">
            "오늘 아침 ☀️, 두리가 🐶 공원에서 🏞️ 신나게 달리며 🏃 기분이 너무 좋아서 ❤️ 맛있는 뼈다귀를 🦴 맛있게 먹었습니다!"
          </p>
          <button class="primary-btn pulse" style="margin-top:1.5rem; width:100%; justify-content:center;" onclick="level5Manager.finishStory()">
            스토리 완성 & 발표하기 🎉
          </button>
        </div>
      </div>
    `;
    ttsManager.speak(promptText);
  }

  finishStory() {
    soundManager.playCelebration();
    appState.addStar(1);
    ttsManager.speak("오늘 아침 두리가 공원에서 신나게 달리며 기분이 너무 좋아서 맛있는 뼈다귀를 먹었습니다! 6하원칙 스토리 완성!");
    appState.showCelebrationModal("6하원칙 스토리 완벽 발표!", "6가지 원칙에 맞춰 동화를 완성했어요! 📖");
  }
}

window.level5Manager = new Level5Manager();
