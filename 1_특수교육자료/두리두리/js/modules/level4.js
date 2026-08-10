/* ==========================================================================
   두리두리 (Duri-Duri) - Level 4: 문장 상황 파악 독해
   Sub-Levels by Sentence Count:
     - Level 1: 1문장 독해 (15문제)
     - Level 2: 2문장 독해 (15문제)
     - Level 3: 3문장 독해 (15문제)
     - Level 4: 4문장 독해 (15문제)
   ========================================================================== */

class Level4Manager {
  constructor() {
    this.unlockedSubLevel = parseInt(localStorage.getItem('duri_l4_unlocked') || '1', 10);
    this.currentSubLevel = 1; // 1, 2, 3, 4
    this.currentIndex = 0;

    /* ==========================================================================
       LEVEL 1: 1문장 독해 (15문제)
       ========================================================================== */
    this.level1Questions = [
      {
        id: 1,
        sentenceCount: 1,
        title: "1문장 독해 1",
        emojis: "🌈☁️✨",
        passage: "하늘에 알록달록 무지개가 예쁘게 떠 있습니다.",
        question: "하늘에 무엇이 떠 있나요?",
        choices: [
          { text: "1. 알록달록 무지개", isCorrect: true },
          { text: "2. 커다란 비행기", isCorrect: false },
          { text: "3. 검은 먹구름", isCorrect: false }
        ],
        explanation: "맞아요! 하늘에 아름다운 무지개가 떠 있어요! ⭐"
      },
      {
        id: 2,
        sentenceCount: 1,
        title: "1문장 독해 2",
        emojis: "🐰🌿🏃‍♂️",
        passage: "토끼가 풀밭에서 깡충깡충 신나게 뛰놀고 있습니다.",
        question: "풀밭에서 깡충깡충 뛰노는 동물은 누구일까요?",
        choices: [
          { text: "1. 느림보 거북이", isCorrect: false },
          { text: "2. 귀여운 토끼", isCorrect: true },
          { text: "3. 듬직한 곰", isCorrect: false }
        ],
        explanation: "참 잘했어요! 토끼가 깡충깡충 신나게 놀고 있어요! ⭐"
      },
      {
        id: 3,
        sentenceCount: 1,
        title: "1문장 독해 3",
        emojis: "🍉☀️😋",
        passage: "더운 여름날 시원한 수박을 냠냠 맛있게 먹었어요.",
        question: "여름날에 어떤 과일을 시원하게 먹었나요?",
        choices: [
          { text: "1. 달콤한 수박", isCorrect: true },
          { text: "2. 새콤한 귤", isCorrect: false },
          { text: "3. 따뜻한 군고구마", isCorrect: false }
        ],
        explanation: "딩동댕! 여름에는 시원한 수박이 최고지요! ⭐"
      },
      {
        id: 4,
        sentenceCount: 1,
        title: "1문장 독해 4",
        emojis: "🎂🕯️🎉",
        passage: "생일 파티에서 불을 끄고 커다란 케이크 초를 후~ 불었습니다.",
        question: "생일 파티에서 무엇의 촛불을 껐나요?",
        choices: [
          { text: "1. 맛있는 케이크", isCorrect: true },
          { text: "2. 바삭한 과자", isCorrect: false },
          { text: "3. 시원한 사이다", isCorrect: false }
        ],
        explanation: "정답입니다! 생일에는 케이크 촛불을 꺼야지요! ⭐"
      },
      {
        id: 5,
        sentenceCount: 1,
        title: "1문장 독해 5",
        emojis: "🌧️☂️🚶‍♀️",
        passage: "비가 내리는 날에는 알록달록 예쁜 우산을 써야 합니다.",
        question: "비가 내릴 때 필요한 준비물은 무엇인가요?",
        choices: [
          { text: "1. 선글라스", isCorrect: false },
          { text: "2. 예쁜 우산", isCorrect: true },
          { text: "3. 두꺼운 털장갑", isCorrect: false }
        ],
        explanation: "맞았습니다! 비가 오면 우산을 준비해야 해요! ⭐"
      },
      {
        id: 6,
        sentenceCount: 1,
        title: "1문장 독해 6",
        emojis: "🛝👫🎈",
        passage: "놀이터에서 친구들과 재미있게 미끄럼틀을 탔습니다.",
        question: "어디에서 친구들과 미끄럼틀을 탔나요?",
        choices: [
          { text: "1. 놀이터", isCorrect: true },
          { text: "2. 도서관", isCorrect: false },
          { text: "3. 수영장", isCorrect: false }
        ],
        explanation: "훌륭해요! 신나는 놀이터에서 미끄럼틀을 탔어요! ⭐"
      },
      {
        id: 7,
        sentenceCount: 1,
        title: "1문장 독해 7",
        emojis: "🌙⭐🌙",
        passage: "밤하늘에 반짝이는 노란 별과 반달이 찾아왔습니다.",
        question: "밤하늘에 무엇이 반짝이며 떠 있나요?",
        choices: [
          { text: "1. 뜨거운 태양", isCorrect: false },
          { text: "2. 노란 별과 반달", isCorrect: true },
          { text: "3. 붉은 단풍잎", isCorrect: false }
        ],
        explanation: "맞아요! 밤하늘에는 별과 달이 찾아와요! ⭐"
      },
      {
        id: 8,
        sentenceCount: 1,
        title: "1문장 독해 8",
        emojis: "🐶🐾🦴",
        passage: "강아지가 신나서 꼬리를 펄럭이며 멍멍 짖었습니다.",
        question: "꼬리를 흔들며 멍멍 짖은 동물은 누구일까요?",
        choices: [
          { text: "1. 강아지", isCorrect: true },
          { text: "2. 병아리", isCorrect: false },
          { text: "3. 고래", isCorrect: false }
        ],
        explanation: "정답이에요! 멍멍 짖는 귀여운 강아지입니다! ⭐"
      },
      {
        id: 9,
        sentenceCount: 1,
        title: "1문장 독해 9",
        emojis: "💡🏠🔌",
        passage: "어두운 방 안을 밝히기 위해 전등 스위치를 딸깍 켰습니다.",
        question: "어두운 방을 밝히려고 무엇을 켰나요?",
        choices: [
          { text: "1. 냉장고", isCorrect: false },
          { text: "2. 전등 스위치", isCorrect: true },
          { text: "3. 수도꼭지", isCorrect: false }
        ],
        explanation: "참 잘했어요! 전등 스위치를 켜면 방이 밝아져요! ⭐"
      },
      {
        id: 10,
        sentenceCount: 1,
        title: "1문장 독해 10",
        emojis: "❄️🧣🧤",
        passage: "추운 겨울에는 따뜻한 목도리와 털모자를 써야 합니다.",
        question: "추운 겨울 몸을 따뜻하게 하려면 무엇을 착용해야 하나요?",
        choices: [
          { text: "1. 반바지와 반팔", isCorrect: false },
          { text: "2. 목도리와 털모자", isCorrect: true },
          { text: "3. 물안경", isCorrect: false }
        ],
        explanation: "딩동댕! 겨울철에는 목도리와 털모자가 체온을 지켜줘요! ⭐"
      },
      {
        id: 11,
        sentenceCount: 1,
        title: "1문장 독해 11",
        emojis: "📖📚🏫",
        passage: "민지는 도서관에서 조용히 동화책을 읽었습니다.",
        question: "민지는 도서관에서 무엇을 읽었나요?",
        choices: [
          { text: "1. 재미있는 동화책", isCorrect: true },
          { text: "2. 신문 기사", isCorrect: false },
          { text: "3. 영어 자막", isCorrect: false }
        ],
        explanation: "맞아요! 도서관에서 재미있는 동화책을 읽었어요! ⭐"
      },
      {
        id: 12,
        sentenceCount: 1,
        title: "1문장 독해 12",
        emojis: "🚌🚏👫",
        passage: "버스 정류장에서 버스를 기다리며 순서대로 줄을 섰습니다.",
        question: "무엇을 기다리며 줄을 섰나요?",
        choices: [
          { text: "1. 버스", isCorrect: true },
          { text: "2. 비행기", isCorrect: false },
          { text: "3. 배", isCorrect: false }
        ],
        explanation: "정답입니다! 정류장에서 버스를 기다렸어요! ⭐"
      },
      {
        id: 13,
        sentenceCount: 1,
        title: "1문장 독해 13",
        emojis: "🪥🧼✨",
        passage: "아침에 일어나서 치약과 칫솔로 치아를 깨끗이 닦았습니다.",
        question: "아침에 칫솔로 무엇을 깨끗하게 닦았나요?",
        choices: [
          { text: "1. 신발", isCorrect: false },
          { text: "2. 치아(이빨)", isCorrect: true },
          { text: "3. 창문", isCorrect: false }
        ],
        explanation: "아주 훌륭해요! 칫솔로 이빨을 깨끗하게 양치했어요! ⭐"
      },
      {
        id: 14,
        sentenceCount: 1,
        title: "1문장 독해 14",
        emojis: "🍎😋🌳",
        passage: "새콤달콤한 사과를 씻어서 아삭아삭 씹어 먹었습니다.",
        question: "아삭아삭 씹어 먹은 과일은 무엇인가요?",
        choices: [
          { text: "1. 사과", isCorrect: true },
          { text: "2. 감자", isCorrect: false },
          { text: "3. 식빵", isCorrect: false }
        ],
        explanation: "맞았습니다! 새콤달콤 아삭한 사과예요! ⭐"
      },
      {
        id: 15,
        sentenceCount: 1,
        title: "1문장 독해 15",
        emojis: "🐦🎶🌳",
        passage: "새들이 나뭇가지 위에 앉아 예쁘게 노래를 부릅니다.",
        question: "나뭇가지 위에서 노래하는 친구들은 누구인가요?",
        choices: [
          { text: "1. 새들", isCorrect: true },
          { text: "2. 개구리들", isCorrect: false },
          { text: "3. 물고기들", isCorrect: false }
        ],
        explanation: "완벽해요! 나무 위에서 새들이 쨉쨉 노래하고 있어요! ⭐"
      }
    ];

    /* ==========================================================================
       LEVEL 2: 2문장 독해 (15문제)
       ========================================================================== */
    this.level2Questions = [
      {
        id: 1,
        sentenceCount: 2,
        title: "2문장 독해 1",
        emojis: "🏊‍♂️🏖️🥽",
        passage: "오늘은 가족들과 함께 시원한 야외 수영장에 물놀이를 하러 가기로 했어요. 수영을 할 때 몸을 안전하게 보호하고 눈을 지키려면 구명조끼와 물안경이 필요합니다.",
        question: "수영장에서 몸을 안전하게 지키기 위해 필요한 물건은 무엇인가요?",
        choices: [
          { text: "1. 구명조끼와 물안경", isCorrect: true },
          { text: "2. 두꺼운 점퍼와 장갑", isCorrect: false },
          { text: "3. 우산과 장화", isCorrect: false }
        ],
        explanation: "맞아요! 수영장 필수 안전장비는 구명조끼와 물안경입니다! ⭐"
      },
      {
        id: 2,
        sentenceCount: 2,
        title: "2문장 독해 2",
        emojis: "⏰🏃‍♂️🏫",
        passage: "민우는 어제 늦게까지 게임을 하느라 아침 일찍 일어나지 못했어요. 그래서 학교에 지각하지 않으려고 서둘러 가방을 메고 달려갔습니다.",
        question: "민우가 아침에 늦게 일어난 이유는 무엇인가요?",
        choices: [
          { text: "1. 감기에 걸려서", isCorrect: false },
          { text: "2. 늦게까지 게임을 해서", isCorrect: true },
          { text: "3. 비가 많이 와서", isCorrect: false }
        ],
        explanation: "참 잘했어요! 늦게까지 게임을 하면 아침에 일어나기 힘들어요! ⭐"
      },
      {
        id: 3,
        sentenceCount: 2,
        title: "2문장 독해 3",
        emojis: "🍁📸🍂",
        passage: "가을이 되어 공원 산책로의 나뭇잎들이 붉고 노랗게 물들었습니다. 사람들은 바닥에 떨어진 단풍잎을 주우며 즐겁게 사진을 찍었습니다.",
        question: "가을 공원에서 나뭇잎들은 어떻게 변했나요?",
        choices: [
          { text: "1. 하얗게 눈이 쌓였다", isCorrect: false },
          { text: "2. 붉고 노랗게 물들었다", isCorrect: true },
          { text: "3. 모두 파랗게 변했다", isCorrect: false }
        ],
        explanation: "딩동댕! 가을이 되면 알록달록 단풍잎으로 물들어요! ⭐"
      },
      {
        id: 4,
        sentenceCount: 2,
        title: "2문장 독해 4",
        emojis: "🐱🌭💖",
        passage: "지수는 길에서 귀여운 아기 고양이를 발견하고 소시지를 조금 떼어 주었습니다. 고양이는 기분이 좋은지 지수의 다리에 몸을 비비며 얌전히 먹었습니다.",
        question: "지수가 아기 고양이에게 준 음식은 무엇인가요?",
        choices: [
          { text: "1. 소시지", isCorrect: true },
          { text: "2. 초콜릿", isCorrect: false },
          { text: "3. 시원한 아이스크림", isCorrect: false }
        ],
        explanation: "정답이에요! 지수가 고양이에게 소시지를 떼어주었어요! ⭐"
      },
      {
        id: 5,
        sentenceCount: 2,
        title: "2문장 독해 5",
        emojis: "🌷🦋🐝",
        passage: "할머니댁 마당 정원에 예쁜 알록달록 꽃들이 가득 피어났습니다. 나비와 벌들이 향기로운 꽃냄새를 맡고 마당으로 모여들었습니다.",
        question: "마당에 피어난 예쁜 꽃들을 찾아온 손님들은 누구인가요?",
        choices: [
          { text: "1. 나비와 벌", isCorrect: true },
          { text: "2. 펭귄과 잠자리", isCorrect: false },
          { text: "3. 병아리와 오리", isCorrect: false }
        ],
        explanation: "맞았습니다! 꽃 향기를 맡고 나비와 벌이 찾아왔어요! ⭐"
      },
      {
        id: 6,
        sentenceCount: 2,
        title: "2문장 독해 6",
        emojis: "🔬🧪✨",
        passage: "수업 시간에 선생님께서 재미있는 과학 실험을 보여주셨습니다. 학생들은 눈을 반짝이며 실험 도구를 관찰하고 신나게 질문했습니다.",
        question: "수업 시간에 학생들이 열심히 관찰한 것은 무엇인가요?",
        choices: [
          { text: "1. 과학 실험", isCorrect: true },
          { text: "2. 운동장 축구공", isCorrect: false },
          { text: "3. 요리책", isCorrect: false }
        ],
        explanation: "훌륭해요! 신기한 과학 실험을 관찰했어요! ⭐"
      },
      {
        id: 7,
        sentenceCount: 2,
        title: "2문장 독해 7",
        emojis: "🌧️💧🏃‍♂️",
        passage: "비가 내린 후 하천 길에 커다란 물웅덩이가 생겼습니다. 영호는 물웅덩이를 껑충 뛰어넘으며 신나게 학교로 걸어갔습니다.",
        question: "영호는 하천 길에서 무엇을 껑충 뛰어넘었나요?",
        choices: [
          { text: "1. 높은 담장", isCorrect: false },
          { text: "2. 물웅덩이", isCorrect: true },
          { text: "3. 시멘트 벽", isCorrect: false }
        ],
        explanation: "맞아요! 비 온 뒤 생긴 물웅덩이를 뛰어넘었어요! ⭐"
      },
      {
        id: 8,
        sentenceCount: 2,
        title: "2문장 독해 8",
        emojis: "🛒🍲🍛",
        passage: "엄마와 함께 마트에 가서 싱싱한 과일과 채소를 바구니에 담았습니다. 집에 돌아와 보글보글 맛있는 카레를 요리해 먹었습니다.",
        question: "집에 돌아와서 요리해 먹은 음식은 무엇인가요?",
        choices: [
          { text: "1. 카레", isCorrect: true },
          { text: "2. 햄버거", isCorrect: false },
          { text: "3. 팥빙수", isCorrect: false }
        ],
        explanation: "정답입니다! 영양 가득한 맛있는 카레를 먹었어요! ⭐"
      },
      {
        id: 9,
        sentenceCount: 2,
        title: "2문장 독해 9",
        emojis: "🌩️☔🌧️",
        passage: "하늘에 검은 먹구름이 짙게 깔리더니 천둥소리가 쾅 울렸습니다. 곧이어 세찬 소나기가 내리기 시작해 사람들이 우산을 폈습니다.",
        question: "먹구름이 깔린 후 어떤 날씨가 시작되었나요?",
        choices: [
          { text: "1. 세찬 소나기", isCorrect: true },
          { text: "2. 따뜻한 햇살", isCorrect: false },
          { text: "3. 하얀 함박눈", isCorrect: false }
        ],
        explanation: "참 잘했어요! 천둥과 함께 세찬 소나기가 내렸어요! ⭐"
      },
      {
        id: 10,
        sentenceCount: 2,
        title: "2문장 독해 10",
        emojis: "🩹🚰🤝",
        passage: "놀이터에서 친구가 시소를 타다가 넘어져 손바닥에 흙이 묻었습니다. 나는 친구에게 흙을 털어주고 수도가에서 손을 함께 씻어주었습니다.",
        question: "넘어진 친구의 손을 어떻게 해주었나요?",
        choices: [
          { text: "1. 수도가에서 손을 함께 씻어주었다", isCorrect: true },
          { text: "2. 모른 척 혼자 집에 갔다", isCorrect: false },
          { text: "3. 흙을 더 묻혔다", isCorrect: false }
        ],
        explanation: "딩동댕! 다친 친구의 손을 씻어주는 따뜻한 행동이에요! ⭐"
      },
      {
        id: 11,
        sentenceCount: 2,
        title: "2문장 독해 11",
        emojis: "👴🍎🌳",
        passage: "민식이는 주말에 할아버지와 함께 시골 과수원에 방문했습니다. 나무마다 빨갛게 잘 익은 탐스러운 사과가 가득 달려 있었습니다.",
        question: "시골 과수원 나무에 달린 과일은 무엇이었나요?",
        choices: [
          { text: "1. 잘 익은 사과", isCorrect: true },
          { text: "2. 노란 바나나", isCorrect: false },
          { text: "3. 보랏빛 포도", isCorrect: false }
        ],
        explanation: "맞았습니다! 과수원에 빨간 사과가 달려 있었어요! ⭐"
      },
      {
        id: 12,
        sentenceCount: 2,
        title: "2문장 독해 12",
        emojis: "🍱🍚😋",
        passage: "점심시간이 되어 학생들이 급식실로 차례대로 이동했습니다. 밥과 반찬을 식판에 예쁘게 담아 맛있게 먹었습니다.",
        question: "점심시간에 학생들이 음식을 담아 먹은 용기는 무엇인가요?",
        choices: [
          { text: "1. 식판", isCorrect: true },
          { text: "2. 냄비", isCorrect: false },
          { text: "3. 종이컵", isCorrect: false }
        ],
        explanation: "훌륭합니다! 급식실 식판에 음식을 예쁘게 담아 먹었어요! ⭐"
      },
      {
        id: 13,
        sentenceCount: 2,
        title: "2문장 독해 13",
        emojis: "📺🦁🐘",
        passage: "아빠와 함께 거실 소파에 앉아 신나는 동물 탐험 다큐멘터리를 시청했습니다. 사자와 코끼리가 나오는 장면이 정말 멋졌습니다.",
        question: "거실에서 아빠와 무엇을 시청했나요?",
        choices: [
          { text: "1. 동물 탐험 다큐멘터리", isCorrect: true },
          { text: "2. 음악 방송", isCorrect: false },
          { text: "3. 뉴스", isCorrect: false }
        ],
        explanation: "맞아요! 멋진 동물 탐험 다큐멘터리를 봤어요! ⭐"
      },
      {
        id: 14,
        sentenceCount: 2,
        title: "2문장 독해 14",
        emojis: "⚽🏃‍♂️🏆",
        passage: "체육 시간에 모두 운동장으로 나가서 발야구 경기를 했습니다. 우리 팀이 공을 멀리 차서 역전승을 거두었습니다.",
        question: "체육 시간에 운동장에서 한 경기는 무엇인가요?",
        choices: [
          { text: "1. 발야구 경기", isCorrect: true },
          { text: "2. 수영 경기", isCorrect: false },
          { text: "3. 스키 경기", isCorrect: false }
        ],
        explanation: "정답이에요! 운동장에서 신나는 발야구 경기를 했어요! ⭐"
      },
      {
        id: 15,
        sentenceCount: 2,
        title: "2문장 독해 15",
        emojis: "🌙🛌✨",
        passage: "어두운 밤이 되자 방 안의 불을 끄고 따뜻한 이불 속에 누웠습니다. 눈을 감고 예쁜 꿈을 꾸며 스르륵 잠이 들었습니다.",
        question: "밤이 되어 따뜻한 이불 속에서 무엇을 했나요?",
        choices: [
          { text: "1. 잠이 들었다", isCorrect: true },
          { text: "2. 자전거를 탔다", isCorrect: false },
          { text: "3. 청소를 했다", isCorrect: false }
        ],
        explanation: "완벽해요! 이불 속에서 스르륵 잠이 들었어요! ⭐"
      }
    ];

    /* ==========================================================================
       LEVEL 3: 3문장 독해 (15문제)
       ========================================================================== */
    this.level3Questions = [
      {
        id: 1,
        sentenceCount: 3,
        title: "3문장 독해 1",
        emojis: "⛰️🏞️🍃",
        passage: "일요일 아침 일찍 가족들과 근처 야산으로 등산을 떠났습니다. 산길을 오르는 동안 싱그러운 풀냄새와 맑은 새소리가 들려왔습니다. 정상에 올라 시원한 바람을 맞으며 도시 풍경을 바라보니 기분이 상쾌했습니다.",
        question: "가족들과 일요일 아침에 어디로 떠났나요?",
        choices: [
          { text: "1. 근처 야산으로 등산", isCorrect: true },
          { text: "2. 바닷가 낚시", isCorrect: false },
          { text: "3. 영화관 구경", isCorrect: false }
        ],
        explanation: "맞아요! 일요일 아침 근처 산으로 등산을 갔어요! ⭐"
      },
      {
        id: 2,
        sentenceCount: 3,
        title: "3문장 독해 2",
        emojis: "📚🏫🤫",
        passage: "학교 도서관은 책을 읽고 공부하는 조용한 공간입니다. 도서관 안에서는 큰 소리로 이야기하거나 뛰어다니면 안 됩니다. 읽고 난 책은 다음 사람을 위해 원래 자리에 예쁘게 꽂아두어야 합니다.",
        question: "도서관에서 지켜야 할 바른 태도는 무엇인가요?",
        choices: [
          { text: "1. 큰 소리로 노래 부르기", isCorrect: false },
          { text: "2. 읽은 책을 제자리에 정돈하기", isCorrect: true },
          { text: "3. 과자를 먹으며 뛰기", isCorrect: false }
        ],
        explanation: "참 잘했어요! 읽은 책은 제자리에 정돈해야 해요! ⭐"
      },
      {
        id: 3,
        sentenceCount: 3,
        title: "3문장 독해 3",
        emojis: "🎨🖍️😊",
        passage: "민지는 미술 시간에 친구의 초상화를 그리는 과제를 받았습니다. 짝꿍의 얼굴을 관찰하며 다정한 미소를 알록달록 크레파스로 표현했습니다. 민지의 그림을 본 짝꿍은 고맙다며 밝게 웃어주었습니다.",
        question: "민지가 크레파스로 표현한 것은 무엇인가요?",
        choices: [
          { text: "1. 짝꿍의 다정한 미소", isCorrect: true },
          { text: "2. 무서운 공룡", isCorrect: false },
          { text: "3. 커다란 비행기", isCorrect: false }
        ],
        explanation: "딩동댕! 짝꿍의 다정한 미소를 그렸어요! ⭐"
      },
      {
        id: 4,
        sentenceCount: 3,
        title: "3문장 독해 4",
        emojis: "🐶🏷️📞",
        passage: "어제저녁 집 근처 횡단보도 앞에서 길 잃은 강아지 한 마리를 보았습니다. 강아지 목줄에 적힌 전화번호로 주인분께 바로 연락을 드렸습니다. 잠시 후 찾아오신 주인분이 고맙다며 따뜻한 빵을 선물로 주셨습니다.",
        question: "길 잃은 강아지의 주인을 어떻게 찾을 수 있었나요?",
        choices: [
          { text: "1. 목줄에 적힌 전화번호로 연락해서", isCorrect: true },
          { text: "2. 경찰서에 신고해서", isCorrect: false },
          { text: "3. 방송국에 제보해서", isCorrect: false }
        ],
        explanation: "정답이에요! 목줄 전화번호로 연락해서 주인을 찾았어요! ⭐"
      },
      {
        id: 5,
        sentenceCount: 3,
        title: "3문장 독해 5",
        emojis: "❄️⛄🍠",
        passage: "겨울방학이 시작되자 시골 할머니댁으로 놀러 갔습니다. 마당에서 사촌들과 함께 동글동글 눈사람을 만들고 눈싸움을 했습니다. 밤에는 할머니께서 화로에 구워주신 군고구마를 맛있게 먹었습니다.",
        question: "시골 할머니댁 밤에 맛있게 먹은 음식은 무엇인가요?",
        choices: [
          { text: "1. 군고구마", isCorrect: true },
          { text: "2. 수박", isCorrect: false },
          { text: "3. 아이스크림", isCorrect: false }
        ],
        explanation: "맞았습니다! 따뜻한 화로 군고구마를 맛있게 먹었어요! ⭐"
      },
      {
        id: 6,
        sentenceCount: 3,
        title: "3문장 독해 6",
        emojis: "🏛️📚💳",
        passage: "동네에 새로 생긴 종합도서관에 가서 회원증을 만들었습니다. 책꽂이에 재미있는 과학 동화책이 가득 진열되어 있었습니다. 마음에 드는 책 두 권을 골라 대출하고 집으로 돌아왔습니다.",
        question: "종합도서관에서 대출해 온 책은 모두 몇 권인가요?",
        choices: [
          { text: "1. 두 권", isCorrect: true },
          { text: "2. 다섯 권", isCorrect: false },
          { text: "3. 열 권", isCorrect: false }
        ],
        explanation: "훌륭해요! 읽고 싶은 동화책 두 권을 대출했어요! ⭐"
      },
      {
        id: 7,
        sentenceCount: 3,
        title: "3문장 독해 7",
        emojis: "🌸🌱🚰",
        passage: "봄이 오자 학교 화단에 알록달록 예쁜 튤립과 민들레가 피었습니다. 환경 미화 시간에 학생들이 잡초를 뽑고 물을 뿌려주었습니다. 정성껏 보살핀 덕분에 꽃들이 햇살을 받으며 더욱 싱싱하게 자랐습니다.",
        question: "학생들이 환경 미화 시간에 화단에서 한 일은 무엇인가요?",
        choices: [
          { text: "1. 잡초를 뽑고 물을 주었다", isCorrect: true },
          { text: "2. 꽃을 꺾었다", isCorrect: false },
          { text: "3. 쓰레기를 버렸다", isCorrect: false }
        ],
        explanation: "맞아요! 정성껏 잡초를 뽑고 물을 주었어요! ⭐"
      },
      {
        id: 8,
        sentenceCount: 3,
        title: "3문장 독해 8",
        emojis: "⛵🛁💦",
        passage: "동생이 유치원에서 만든 종이배를 보여주며 자랑했습니다. 우리는 욕조에 물을 가득 채우고 종이배를 둥둥 띄워보았습니다. 바람을 후 불자 종이배가 물 위를 미끄러지듯 나아갔습니다.",
        question: "욕조 물 위에서 띄운 것은 무엇인가요?",
        choices: [
          { text: "1. 종이배", isCorrect: true },
          { text: "2. 장난감 자동차", isCorrect: false },
          { text: "3. 진짜 연", isCorrect: false }
        ],
        explanation: "정답입니다! 알록달록 예쁜 종이배를 띄웠어요! ⭐"
      },
      {
        id: 9,
        sentenceCount: 3,
        title: "3문장 독해 9",
        emojis: "🚌🚏🤝",
        passage: "버스를 탈 때는 승객들이 차례대로 줄을 서서 기다려야 합니다. 버스가 오면 어르신과 어린아이가 먼저 탈 수 있도록 양보하는 것이 좋습니다. 버스 안에서는 손잡이를 꼭 잡아야 안전합니다.",
        question: "버스 안에서 안전을 위해 꼭 잡아야 하는 것은 무엇인가요?",
        choices: [
          { text: "1. 손잡이", isCorrect: true },
          { text: "2. 창문", isCorrect: false },
          { text: "3. 의자 밑 바닥", isCorrect: false }
        ],
        explanation: "참 잘했어요! 안전을 위해 손잡이를 꼭 잡아야 해요! ⭐"
      },
      {
        id: 10,
        sentenceCount: 3,
        title: "3문장 독해 10",
        emojis: "🏖️🌅🌊",
        passage: "민우네 가족은 주말에 동해 바닷가로 여행을 떠났습니다. 해변에서 하얀 모래성도 쌓고 시원한 바닷물에 발을 담갔습니다. 저녁에는 바다 위로 지는 아름다운 붉은 노을을 감상했습니다.",
        question: "민우네 가족이 저녁에 감상한 풍경은 무엇인가요?",
        choices: [
          { text: "1. 바다 위 아름다운 노을", isCorrect: true },
          { text: "2. 높이 뜬 무지개", isCorrect: false },
          { text: "3. 번개와 소나기", isCorrect: false }
        ],
        explanation: "딩동댕! 저녁 바다 위 붉은 노을을 감상했어요! ⭐"
      },
      {
        id: 11,
        sentenceCount: 3,
        title: "3문장 독해 11",
        emojis: "🍱🌍🌱",
        passage: "급식 시간에 음식을 남기지 않고 깨끗하게 다 먹는 것은 좋은 습관입니다. 음식을 남기면 많은 쓰레기가 생겨 지구가 아파합니다. 내가 먹을 만큼만 적당히 담아 식사하는 지혜가 필요합니다.",
        question: "음식을 먹을 만큼만 담아 깨끗이 먹어야 하는 이유는 무엇인가요?",
        choices: [
          { text: "1. 쓰레기를 줄여 지구를 보호하기 위해", isCorrect: true },
          { text: "2. 키가 작아지기 위해", isCorrect: false },
          { text: "3. 신발이 깨끗해지기 위해", isCorrect: false }
        ],
        explanation: "맞았습니다! 지구 환경을 지키기 위해 잔반을 줄여요! ⭐"
      },
      {
        id: 12,
        sentenceCount: 3,
        title: "3문장 독해 12",
        emojis: "📱👀🌿",
        passage: "컴퓨터나 스마트폰을 너무 오래 사용하면 눈과 목 건강에 나쁩니다. 화면을 볼 때는 적당한 거리를 유지하고 1시간 마다 쉬어야 합니다. 쉴 때는 창밖의 푸른 나무나 하늘을 바라보는 것이 좋습니다.",
        question: "스마트폰을 사용할 때 눈 건강을 위해 어떻게 해야 하나요?",
        choices: [
          { text: "1. 1시간마다 쉬며 푸른 풍경 바라보기", isCorrect: true },
          { text: "2. 밤새도록 뚫어지게 보기", isCorrect: false },
          { text: "3. 화면에 눈을 바짝 대기", isCorrect: false }
        ],
        explanation: "훌륭합니다! 휴식 시간에 창밖 푸른 풍경을 봐요! ⭐"
      },
      {
        id: 13,
        sentenceCount: 3,
        title: "3문장 독해 13",
        emojis: "🚴‍♀️🛞🪖",
        passage: "우리 동네 자전거 도로에서 친구들과 안전모를 쓰고 자전거를 탔습니다. 바람을 가르며 달리니 스트레스가 싹 날아가는 것 같았습니다. 보행자가 지나갈 때는 속도를 줄이고 띵동 벨을 누르며 안전하게 달렸습니다.",
        question: "자전거를 탈 때 머리를 보호하기 위해 꼭 써야 하는 것은 무엇인가요?",
        choices: [
          { text: "1. 안전모(헬멧)", isCorrect: true },
          { text: "2. 물안경", isCorrect: false },
          { text: "3. 두꺼운 털모자", isCorrect: false }
        ],
        explanation: "맞아요! 안전을 위해 머리에 헬멧을 착용해요! ⭐"
      },
      {
        id: 14,
        sentenceCount: 3,
        title: "3문장 독해 14",
        emojis: "🌴🌵🏛️",
        passage: "토요일 오후 식물원에 가서 희귀한 열대 식물들을 관찰했습니다. 커다란 야자수와 뾰족한 선인장이 인상적이었습니다. 안내 선생님의 설명을 들으며 식물에 대한 새로운 지식을 많이 배웠습니다.",
        question: "토요일 오후에 방문한 장소는 어디인가요?",
        choices: [
          { text: "1. 식물원", isCorrect: true },
          { text: "2. 야구장", isCorrect: false },
          { text: "3. 놀이공원", isCorrect: false }
        ],
        explanation: "정답이에요! 야자수와 선인장이 있는 식물원에 갔어요! ⭐"
      },
      {
        id: 15,
        sentenceCount: 3,
        title: "3문장 독해 15",
        emojis: "📖📝💖",
        passage: "자기 전 오늘 하루 있었던 일들을 생각하며 다이어리에 일기를 썼습니다. 친구와 오해가 풀렸던 기쁜 순간이 가장 먼저 떠올랐습니다. 내일도 행복한 하루가 되기를 바라는 마음으로 잠자리에 들었습니다.",
        question: "일기를 쓰며 가장 먼저 떠오른 기쁜 순간은 무엇인가요?",
        choices: [
          { text: "1. 친구와 오해가 풀렸던 순간", isCorrect: true },
          { text: "2. 폰을 잃어버렸던 순간", isCorrect: false },
          { text: "3. 비에 젖었던 순간", isCorrect: false }
        ],
        explanation: "완벽해요! 친구와 오해가 풀려 마음이 기뻤어요! ⭐"
      }
    ];

    /* ==========================================================================
       LEVEL 4: 4문장 독해 (15문제)
       ========================================================================== */
    this.level4Questions = [
      {
        id: 1,
        sentenceCount: 4,
        title: "4문장 독해 1",
        emojis: "🏕️🔥🌌✨",
        passage: "여름 휴가철을 맞아 가족들과 강원도 캠핑장으로 여행을 다녀왔습니다. 아빠와 함께 텐트를 치고 맑은 계곡물에서 물고기도 잡았습니다. 저녁에는 캠프파이어 불꽃 둘러앉아 맛있는 바비큐를 먹으며 대화를 나누었습니다. 밤하늘을 쏟아질 듯 쏟아지는 수많은 별을 보며 평생 잊지 못할 추억을 만들었습니다.",
        question: "저녁에 가족들과 텐트 주변에서 한 활동은 무엇인가요?",
        choices: [
          { text: "1. 캠프파이어와 바비큐 식사", isCorrect: true },
          { text: "2. 눈사람 만들기", isCorrect: false },
          { text: "3. 팽이치기", isCorrect: false }
        ],
        explanation: "맞아요! 따뜻한 캠프파이어 불꽃 둘러앉아 바비큐를 먹었어요! ⭐"
      },
      {
        id: 2,
        sentenceCount: 4,
        title: "4문장 독해 2",
        emojis: "🚨🏫🎒🏃‍♂️",
        passage: "우리 학교에서는 매달 한 번씩 안전 대피 훈련을 실시합니다. 사이렌이 울리면 학생들은 질서를 지켜 가방으로 머리를 보호하고 계단으로 이동합니다. 절대로 밀거나 뛰지 않고 선생님의 안내를 따라 운동장으로 대피합니다. 올바른 대피 방법을 익혀두면 진짜 위급 상황이 올 때 안전을 지킬 수 있습니다.",
        question: "대피 훈련 사이렌이 울릴 때 가방으로 무엇을 보호하나요?",
        choices: [
          { text: "1. 머리", isCorrect: true },
          { text: "2. 발가락", isCorrect: false },
          { text: "3. 신발", isCorrect: false }
        ],
        explanation: "참 잘했어요! 낙하물로부터 머리를 보호해야 해요! ⭐"
      },
      {
        id: 3,
        sentenceCount: 4,
        title: "4문장 독해 3",
        emojis: "🌹💌👵😊",
        passage: "동네 복지관에서 어르신들을 위한 카네이션 만들기 봉사활동이 열렸습니다. 우리는 빨간 색종이를 접어 예쁜 꽃송이를 정성껏 만들었습니다. 완성된 카네이션에 '건강하세요'라는 편지를 적어 어르신 가슴에 달아드렸습니다. 기뻐하시는 할머니의 환한 미소를 보니 내 마음도 뿌듯해졌습니다.",
        question: "어르신 가슴에 달아드린 꽃과 함께 적은 글은 무엇인가요?",
        choices: [
          { text: "1. '건강하세요' 편지", isCorrect: true },
          { text: "2. '축구 이기자'", isCorrect: false },
          { text: "3. '비가 오네요'", isCorrect: false }
        ],
        explanation: "딩동댕! 따뜻한 마음이 담긴 건강하세요 편지예요! ⭐"
      },
      {
        id: 4,
        sentenceCount: 4,
        title: "4문장 독해 4",
        emojis: "♻️🍾📦🌍",
        passage: "재활용품 분리수거는 깨끗한 지구를 만들기 위해 꼭 필요한 행동입니다. 페트병은 라벨 비닐을 떼어내고 착착 접어서 플라스틱 함에 넣어야 합니다. 종이 상자는 테이프를 제거하고 펼쳐서 종이류에 따로 모아 버립니다. 이처럼 작은 분리수거 실천이 환경 오염을 막는 큰 힘이 됩니다.",
        question: "플라스틱 페트병을 버릴 때 가장 먼저 할 일은 무엇인가요?",
        choices: [
          { text: "1. 라벨 비닐 떼어내기", isCorrect: true },
          { text: "2. 물 채워 넣기", isCorrect: false },
          { text: "3. 불로 태우기", isCorrect: false }
        ],
        explanation: "정답이에요! 라벨 비닐을 떼어내서 분리배출해요! ⭐"
      },
      {
        id: 5,
        sentenceCount: 4,
        title: "4문장 독해 5",
        emojis: "🏛️🖼️🤫📝",
        passage: "박물관에 입장할 때는 타인을 배려하는 정숙한 관람 태도가 필요합니다. 전시물에 손을 대거나 카메라 플래시를 터뜨리는 행동은 피해야 합니다. 안내원의 설명을 들을 때는 귀를 기울이고 메모장에 중요한 내용을 적습니다. 관람이 끝난 후 궁금한 점을 질문하면 더욱 깊이 있는 공부가 됩니다.",
        question: "박물관 관람 시 피해야 할 행동은 무엇인가요?",
        choices: [
          { text: "1. 전시물 손대기 및 플래시 터뜨리기", isCorrect: true },
          { text: "2. 설명 귀 기울여 듣기", isCorrect: false },
          { text: "3. 메모장에 중요한 내용 적기", isCorrect: false }
        ],
        explanation: "맞았습니다! 전시물을 보존하기 위해 손대지 않아야 해요! ⭐"
      },
      {
        id: 6,
        sentenceCount: 4,
        title: "4문장 독해 6",
        emojis: "🐶🐾🧹🌳",
        passage: "유기견 보호소로 자원봉사를 가서 아픔을 겪은 강아지들을 만났습니다. 우리는 견사를 깨끗하게 청소하고 신선한 사료와 물을 가득 채워주었습니다. 따뜻한 햇살 아래서 강아지들과 잔디밭을 함께 산책하며 교감했습니다. 사지 말고 입양하는 문화가 더욱 넓게 퍼졌으면 좋겠다고 생각했습니다.",
        question: "유기견 보호소 봉사활동에서 한 일은 무엇인가요?",
        choices: [
          { text: "1. 청소, 사료 주기, 잔디밭 산책", isCorrect: true },
          { text: "2. 강아지에게 화내기", isCorrect: false },
          { text: "3. 울타리 부수기", isCorrect: false }
        ],
        explanation: "훌륭합니다! 사랑으로 사료를 주고 함께 산책했어요! ⭐"
      },
      {
        id: 7,
        sentenceCount: 4,
        title: "4문장 독해 7",
        emojis: "🏃‍♂️🏁🤝💖",
        passage: "초등학교 체육대회 날 청군과 백군으로 나뉘어 열띤 응원전이 펼쳐졌습니다. 박 터뜨리기, 계주 달리기를 하며 모든 학생이 최선을 다해 뛰었습니다. 경기 결과 청군이 이겼지만 백군도 끝까지 포기하지 않고 서로 손을 잡았습니다. 승패보다 서로 용기를 북돋아 준 참된 우정이 돋보인 하루였습니다.",
        question: "체육대회에서 경기 결과보다 돋보였던 가치는 무엇인가요?",
        choices: [
          { text: "1. 포기하지 않고 서로 북돋운 참된 우정", isCorrect: true },
          { text: "2. 상대 팀 비웃기", isCorrect: false },
          { text: "3. 혼자만 상 받기", isCorrect: false }
        ],
        explanation: "맞아요! 결과보다 따뜻하게 격려해 주는 우정이 멋집니다! ⭐"
      },
      {
        id: 8,
        sentenceCount: 4,
        title: "4문장 독해 8",
        emojis: "🏬🍩🍩🥰",
        passage: "전통시장에 가면 대형 마트와 다른 정겨운 사람 냄새가 물씬 풍깁니다. 갓 튀겨낸 고소한 도넛과 보글보글 떡볶이 냄새가 입안에 침을 고이게 합니다. 상인 아주머니께서는 인사하는 나에게 덤으로 붕어빵 하나를 더 얹어주셨습니다. 따뜻한 정이 넘치는 전통시장에 오면 언제나 마음이 훈훈해집니다.",
        question: "전통시장 아주머니께서 인사를 나눈 나에게 선물로 얹어주신 것은 무엇인가요?",
        choices: [
          { text: "1. 붕어빵 하나", isCorrect: true },
          { text: "2. 신발 한 짝", isCorrect: false },
          { text: "3. 장난감 팽이", isCorrect: false }
        ],
        explanation: "정답이에요! 다정하게 인사를 주고받아 붕어빵을 주셨어요! ⭐"
      },
      {
        id: 9,
        sentenceCount: 4,
        title: "4문장 독해 9",
        emojis: "📖💡🌱✨",
        passage: "올바른 독서 습관은 지식뿐만 아니라 마음의 키도 크게 만들어 줍니다. 하루 30분씩 규칙적으로 책을 읽으면 집중력과 사고력이 깊어집니다. 읽은 후에는 인상 깊었던 문장을 공책에 적어보거나 느낌을 정리합니다. 꾸준한 독서는 내 꿈을 이루는 든든한 밑거름이 되어 줍니다.",
        question: "매일 규칙적인 독서가 주는 유익은 무엇인가요?",
        choices: [
          { text: "1. 집중력과 사고력이 깊어지고 꿈의 밑거름이 됨", isCorrect: true },
          { text: "2. 잠이 많아짐", isCorrect: false },
          { text: "3. 눈이 나빠짐", isCorrect: false }
        ],
        explanation: "참 잘했어요! 꾸준한 책 읽기는 꿈을 가꾸는 밑거름이에요! ⭐"
      },
      {
        id: 10,
        sentenceCount: 4,
        title: "4문장 독해 10",
        emojis: "🪲🌿🔍✨",
        passage: "자연관찰 생태 체험관에 방문하여 장수풍뎅이와 애벌레의 성장 과정을 살펴보았습니다. 썩은 톱밥 속에서 애벌레가 번데기를 거쳐 멋진 성충이 되는 모습이 신기했습니다. 손바닥 위에 살포시 올려놓으니 집게 뿔을 멋지게 쳐들었습니다. 생명의 신비로움과 자연을 아끼는 마음을 깨닫게 되었습니다.",
        question: "생태 체험관에서 관찰한 곤충은 무엇인가요?",
        choices: [
          { text: "1. 장수풍뎅이", isCorrect: true },
          { text: "2. 메뚜기", isCorrect: false },
          { text: "3. 귀뚜라미", isCorrect: false }
        ],
        explanation: "딩동댕! 멋진 집게 뿔을 가진 장수풍뎅이에요! ⭐"
      },
      {
        id: 11,
        sentenceCount: 4,
        title: "4문장 독해 11",
        emojis: "🧑‍🚒🚒💦👨‍🚒",
        passage: "소방서 견학 체험에 참여하여 소방관 아저씨들의 노고를 직접 체험했습니다. 무거운 소방복을 입고 커다란 소방호스를 잡아보며 불을 끄는 훈련을 했습니다. 위험을 무릅쓰고 생명을 구하는 소방관 아저씨들께 깊은 감사함을 느꼈습니다. 나도 커서 남을 돕는 보람찬 사람이 되고 싶다는 꿈이 생겼습니다.",
        question: "소방서 견학을 통해 느낀 점은 무엇인가요?",
        choices: [
          { text: "1. 소방관의 노고에 감사하고 남을 돕는 꿈이 생김", isCorrect: true },
          { text: "2. 장난감을 사고 싶어짐", isCorrect: false },
          { text: "3. 잠을 자고 싶어짐", isCorrect: false }
        ],
        explanation: "맞았습니다! 소방관 아저씨들께 고마운 마음을 가졌어요! ⭐"
      },
      {
        id: 12,
        sentenceCount: 4,
        title: "4문장 독해 12",
        emojis: "🍅🌱🚰😋",
        passage: "주말 농장에 아빠와 함께 상추와 방울토마토 모종을 심었습니다. 주말마다 찾아가 잡초를 솎아내고 사랑의 마음으로 물을 정성껏 주었습니다. 몇 주 뒤 싱싱한 붉은 방울토마토가 열려 직접 수확하여 맛보았습니다. 내가 직접 키운 채소라 그런지 마트에서 산 것보다 훨씬 달콤했습니다.",
        question: "주말 농장에서 직접 수확하여 맛본 열매는 무엇인가요?",
        choices: [
          { text: "1. 붉은 방울토마토", isCorrect: true },
          { text: "2. 노란 참외", isCorrect: false },
          { text: "3. 수박", isCorrect: false }
        ],
        explanation: "훌륭해요! 직접 가꾼 달콤한 방울토마토를 맛보았어요! ⭐"
      },
      {
        id: 13,
        sentenceCount: 4,
        title: "4문장 독해 13",
        emojis: "🚆🌊🥚🥤",
        passage: "기차를 타고 부산 바다로 여행을 떠나는 날 아침 가슴이 두근거렸습니다. 창밖으로 들판과 강줄기가 빠르게 지나가는 풍경이 마치 한 폭의 그림 같았습니다. 승무원 누나께서 주신 맛있는 계란과 사이다를 먹으며 이야기를 나누었습니다. 기차 여행만의 특별한 로망과 설렘을 만끽한 즐거운 날이었습니다.",
        question: "기차를 타고 어디로 여행을 떠났나요?",
        choices: [
          { text: "1. 부산 바다", isCorrect: true },
          { text: "2. 제주도 한라산", isCorrect: false },
          { text: "3. 서울 N타워", isCorrect: false }
        ],
        explanation: "맞아요! 신나는 기차를 타고 부산 바다로 여행 갔어요! ⭐"
      },
      {
        id: 14,
        sentenceCount: 4,
        title: "4문장 독해 14",
        emojis: "🏛️🖼️🎨✨",
        passage: "미술관에 전시된 유명 작가들의 회화 작품을 감상하는 소중한 시간을 가졌습니다. 도슨트 해설사 선생님께서 그림 속에 담긴 시대 배경과 의미를 쉽고 재미있게 알려주셨습니다. 조명 아래 빛나는 그림들을 보며 예술 작품이 주는 감동을 마음 깊이 느꼈습니다. 그림을 보는 안목이 한 층 넓어진 유익한 하루였습니다.",
        question: "미술관에서 그림의 의미를 재미있게 설명해 주신 분은 누구인가요?",
        choices: [
          { text: "1. 도슨트 해설사 선생님", isCorrect: true },
          { text: "2. 경비원 아저씨", isCorrect: false },
          { text: "3. 수영 강사님", isCorrect: false }
        ],
        explanation: "정답입니다! 친절한 도슨트 해설사 선생님께서 설명해 주셨어요! ⭐"
      },
      {
        id: 15,
        sentenceCount: 4,
        title: "4문장 독해 15",
        emojis: "🤖⚙️☀️👏",
        passage: "학교 과학 동아리 발표회에서 우리 팀이 만든 태양광 로봇을 선보였습니다. 빛을 받으면 톱니바퀴가 돌아가며 앞으로 씩씩하게 걸어가는 로봇이었습니다. 친구들과 선생님들께서 신기해하며 큰 박수를 보내주셨습니다. 팀원들과 밤새 고민하고 노력한 결실을 보아 가슴이 벅차올랐습니다.",
        question: "과학 동아리 발표회에서 우리 팀이 선보인 것은 무엇인가요?",
        choices: [
          { text: "1. 태양광 로봇", isCorrect: true },
          { text: "2. 드론 비행기", isCorrect: false },
          { text: "3. 3D 프린터 신발", isCorrect: false }
        ],
        explanation: "완벽해요! 햇빛을 받아 씩씩하게 걷는 태양광 로봇이에요! ⭐"
      }
    ];

    // Track user state for all 4 sub-levels
    this.userStateL1 = this.level1Questions.map(() => ({ answered: false, selectedIdx: null, isCorrect: false }));
    this.userStateL2 = this.level2Questions.map(() => ({ answered: false, selectedIdx: null, isCorrect: false }));
    this.userStateL3 = this.level3Questions.map(() => ({ answered: false, selectedIdx: null, isCorrect: false }));
    this.userStateL4 = this.level4Questions.map(() => ({ answered: false, selectedIdx: null, isCorrect: false }));
  }

  getCurrentQuestions() {
    if (this.currentSubLevel === 1) return this.level1Questions;
    if (this.currentSubLevel === 2) return this.level2Questions;
    if (this.currentSubLevel === 3) return this.level3Questions;
    return this.level4Questions;
  }

  getCurrentUserState() {
    if (this.currentSubLevel === 1) return this.userStateL1;
    if (this.currentSubLevel === 2) return this.userStateL2;
    if (this.currentSubLevel === 3) return this.userStateL3;
    return this.userStateL4;
  }

  render(container) {
    const questions = this.getCurrentQuestions();
    const userState = this.getCurrentUserState();
    const q = questions[this.currentIndex];
    const state = userState[this.currentIndex];
    const totalQ = questions.length;
    const promptText = "지문을 잘 읽고 질문에 알맞은 정답을 선택해 보세요!";

    let levelBadgeTitle = "";
    if (this.currentSubLevel === 1) levelBadgeTitle = "🐣 레벨 1 (1문장 독해 15개)";
    else if (this.currentSubLevel === 2) levelBadgeTitle = "🌿 레벨 2 (2문장 독해 15개)";
    else if (this.currentSubLevel === 3) levelBadgeTitle = "🌳 레벨 3 (3문장 독해 15개)";
    else levelBadgeTitle = "👑 레벨 4 (4문장 독해 15개)";

    container.innerHTML = `
      <!-- Sub-Level Selector Navigation Bar -->
      <div style="display:flex; justify-content:center; gap:0.6rem; margin-bottom:1.5rem; flex-wrap:wrap;">
        <button class="primary-btn ${this.currentSubLevel===1?'active':''}" 
                style="padding:0.5rem 1rem; font-size:0.9rem; background:${this.currentSubLevel===1?'var(--primary-blue)':'#cbd5e0'}; cursor:pointer;"
                onclick="level4Manager.switchSubLevel(1)">
          🐣 레벨 1: 1문장 (15개)
        </button>
        <button class="primary-btn ${this.currentSubLevel===2?'active':''}" 
                style="padding:0.5rem 1rem; font-size:0.9rem; background:${this.currentSubLevel===2?'var(--primary-blue)':(this.unlockedSubLevel>=2?'#718096':'#e2e8f0')}; opacity:${this.unlockedSubLevel>=2?1:0.7}; cursor:pointer;"
                onclick="level4Manager.switchSubLevel(2)">
          ${this.unlockedSubLevel >= 2 ? '🌿 레벨 2: 2문장 (15개)' : '🔒 레벨 2 (잠김)'}
        </button>
        <button class="primary-btn ${this.currentSubLevel===3?'active':''}" 
                style="padding:0.5rem 1rem; font-size:0.9rem; background:${this.currentSubLevel===3?'var(--primary-blue)':(this.unlockedSubLevel>=3?'#718096':'#e2e8f0')}; opacity:${this.unlockedSubLevel>=3?1:0.7}; cursor:pointer;"
                onclick="level4Manager.switchSubLevel(3)">
          ${this.unlockedSubLevel >= 3 ? '🌳 레벨 3: 3문장 (15개)' : '🔒 레벨 3 (잠김)'}
        </button>
        <button class="primary-btn ${this.currentSubLevel===4?'active':''}" 
                style="padding:0.5rem 1rem; font-size:0.9rem; background:${this.currentSubLevel===4?'var(--primary-blue)':(this.unlockedSubLevel>=4?'#718096':'#e2e8f0')}; opacity:${this.unlockedSubLevel>=4?1:0.7}; cursor:pointer;"
                onclick="level4Manager.switchSubLevel(4)">
          ${this.unlockedSubLevel >= 4 ? '👑 레벨 4: 4문장 (15개)' : '🔒 레벨 4 (잠김)'}
        </button>
      </div>

      <div class="activity-header">
        <div class="activity-header-text">
          <h2>📖 문장 상황 파악 독해 <span style="font-size:1.05rem; color:var(--accent-coral); font-weight:800; margin-left:0.5rem;">[ ${levelBadgeTitle} ]</span></h2>
          <p>${promptText}</p>
        </div>
        <button class="speak-btn" onclick="ttsManager.speak('${q.passage} ${q.question}')" title="지문 및 질문 다시 듣기">
          <i class="fa-solid fa-volume-high"></i>
        </button>
      </div>

      <div style="max-width:820px; margin:0 auto;">
        
        <!-- Top Pagination & Progress Indicator -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; background:white; padding:0.8rem 1.2rem; border-radius:15px; border:2px solid var(--border-color); box-shadow:var(--shadow-sm);">
          <div style="font-weight:800; font-size:1.15rem; color:var(--primary-blue);">
            <i class="fa-solid fa-book-open"></i> 문제 ${this.currentIndex + 1} / ${totalQ}
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
                return `<button onclick="level4Manager.goToQuestion(${idx})" style="width:28px; height:28px; border-radius:50%; background:${bg}; color:${color}; font-weight:800; border:3px solid var(--primary-blue); cursor:pointer;">${idx+1}</button>`;
              }
              return `<button onclick="level4Manager.goToQuestion(${idx})" style="width:28px; height:28px; border-radius:50%; background:${bg}; color:${color}; font-weight:700; border:none; cursor:pointer;">${idx+1}</button>`;
            }).join('')}
          </div>
          <button class="primary-btn" style="padding:0.4rem 0.8rem; font-size:0.85rem; background:#718096;" onclick="level4Manager.resetQuiz()">
            <i class="fa-solid fa-rotate-right"></i> 다시 풀기
          </button>
        </div>

        <!-- Passage Card Box -->
        <div class="clip-theme-card" style="padding:2rem; background:#eef9ff; border:3px solid var(--primary-blue); margin-bottom:1.5rem; box-shadow:var(--shadow-md);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem;">
            <span style="font-size:0.85rem; font-weight:700; color:#2b6cb0; background:#ebf8ff; padding:0.3rem 0.8rem; border-radius:15px; border:1px solid #bee3f8;">
              <i class="fa-solid fa-align-left"></i> ${q.sentenceCount}문장 지문 (${q.title})
            </span>
            <span style="font-size:2rem;">${q.emojis}</span>
          </div>
          <p style="font-size:1.3rem; font-weight:600; line-height:1.75; color:var(--text-main); text-align:justify; margin-bottom:1rem; word-break:keep-all;">
            "${q.passage}"
          </p>
          <div style="background:white; padding:0.9rem 1.2rem; border-radius:12px; border-left:5px solid var(--accent-peach);">
            <h4 style="font-size:1.25rem; font-weight:800; color:#2d3748; margin:0;">
              ❓ 질문: ${q.question}
            </h4>
          </div>
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
                      style="text-align:left; padding:1.25rem; font-size:1.15rem; ${extraStyle}" 
                      onclick="level4Manager.checkChoice(${choice.isCorrect}, ${cIdx}, this)">
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
                  onclick="level4Manager.prevQuestion()" ${this.currentIndex === 0 ? 'disabled' : ''}>
            <i class="fa-solid fa-arrow-left"></i> 이전 문제
          </button>

          <span style="font-weight:700; color:var(--text-muted);">
            해결한 문제: ${userState.filter(s => s.isCorrect).length} / ${totalQ}
          </span>

          ${this.currentIndex < totalQ - 1 ? `
            <button class="primary-btn pulse" 
                    style="padding:0.75rem 1.5rem; background:var(--primary-blue);" 
                    onclick="level4Manager.nextQuestion()">
              다음 문제 <i class="fa-solid fa-arrow-right"></i>
            </button>
          ` : `
            <button class="primary-btn pulse" 
                    style="padding:0.75rem 1.5rem; background:#38a169;" 
                    onclick="level4Manager.finishSubLevel()">
              레벨 완료 및 다음 레벨 진출 🎉
            </button>
          `}
        </div>

      </div>
    `;

    ttsManager.speak(`${q.passage} 질문입니다. ${q.question}`);
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
      ttsManager.speak("지문의 내용을 다시 한번 차분하게 읽고 정답을 찾아보세요!");
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
    const userState = this.getCurrentUserState();
    const totalCorrect = userState.filter(s => s.isCorrect).length;

    if (this.currentSubLevel === 1) {
      // Unlock Level 2
      this.unlockedSubLevel = Math.max(this.unlockedSubLevel, 2);
      localStorage.setItem('duri_l4_unlocked', this.unlockedSubLevel.toString());

      appState.showCelebrationModal(
        "🎉 레벨 1 (1문장 독해 15개) 완파!",
        `1문장 독해 15문제를 멋지게 해결했어요! 🌿 레벨 2 (2문장 독해 15개)가 해제되었습니다!`
      );

      setTimeout(() => {
        this.switchSubLevel(2);
      }, 2500);

    } else if (this.currentSubLevel === 2) {
      // Unlock Level 3
      this.unlockedSubLevel = Math.max(this.unlockedSubLevel, 3);
      localStorage.setItem('duri_l4_unlocked', this.unlockedSubLevel.toString());

      appState.showCelebrationModal(
        "🎉 레벨 2 (2문장 독해 15개) 완파!",
        `2문장 독해 15문제를 완벽히 독해했어요! 🌳 레벨 3 (3문장 독해 15개)이 해제되었습니다!`
      );

      setTimeout(() => {
        this.switchSubLevel(3);
      }, 2500);

    } else if (this.currentSubLevel === 3) {
      // Unlock Level 4
      this.unlockedSubLevel = Math.max(this.unlockedSubLevel, 4);
      localStorage.setItem('duri_l4_unlocked', this.unlockedSubLevel.toString());

      appState.showCelebrationModal(
        "🎉 레벨 3 (3문장 독해 15개) 완파!",
        `3문장 독해 15문제를 훌륭하게 해결했어요! 👑 레벨 4 (4문장 독해 15개)가 해제되었습니다!`
      );

      setTimeout(() => {
        this.switchSubLevel(4);
      }, 2500);

    } else {
      // Completed all 4 Sub-Levels!
      appState.showCelebrationModal(
        "🏆 레벨 1~4 총 60개 문장 독해 완파!",
        `1문장(15), 2문장(15), 3문장(15), 4문장(15) 총 60개 문장 독해 문제를 모두 완파하셨습니다! 당신은 최고의 국어 독해 왕입니다! ⭐`
      );
    }
  }
}

window.level4Manager = new Level4Manager();
