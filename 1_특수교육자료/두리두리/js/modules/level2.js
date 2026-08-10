/* ==========================================================================
   두리두리 (Duri-Duri) - Level 2: 글자 & 숫자 습득 (Letters & Numbers)
   Sub-activities:
   1. 자모 결합기 (자음 + 모음)
   2. 자음 & 모음 & 자음 결합기 (초성 + 중성 + 종성 받침 글자)
   3. 낱말 만들기 (2글자 10개, 3글자 10개, 4글자 10개 - 무작위 섞인 조각)
   4. 그림 보고 받침 글자 만들기 (총 30문제)
   5. 1~100 수세기 (1단계: 순차, 2단계: '오' 한자어, 3단계: '다섯' 우리말)
   6. 다양한 사물 갯수 맞추기 (5단계 50문제)
   7. 십 단위 묶음수 (탐색판 / 30문제 묶음퀴즈 / 묶음상자 게임 3모드)
   8. 더해서 10 만들기 (10의 보수 탐색 / 빈칸 퀴즈 / 짝 맞추기 게임 30문제) [UPGRADED]
   ========================================================================== */

class Level2Manager {
  constructor() {
    this.currentSubIndex = 0;
    this.subActivities = [
      'syllableBuilder',
      'syllable3Builder',
      'wordMaker',
      'finalConsonant',
      'count100',
      'objectCountQuiz',
      'tensGroup',
      'makeTenComplement'
    ];

    // Korean Unicode Constants
    this.INITIALS = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ'];
    this.VOWELS = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
    
    this.selectedConsonantIdx = 0;
    this.selectedVowelIdx = 0;

    this.selectedInitial3Idx = 0;
    this.selectedVowel3Idx = 0;
    this.selectedFinal3Idx = 21;

    /* --------------------------------------------------------------------------
       3. 낱말 만들기 3단계 데이터
       -------------------------------------------------------------------------- */
    this.wordMakerData = {
      level1: [
        { target: "나비", emoji: "🦋", pieces: ["마", "비", "나", "구"] },
        { target: "사과", emoji: "🍎", pieces: ["과", "바", "사", "수"] },
        { target: "바다", emoji: "🌊", pieces: ["구", "바", "리", "다"] },
        { target: "시계", emoji: "⏰", pieces: ["계", "가", "시", "구"] },
        { target: "모자", emoji: "🧢", pieces: ["지", "모", "바", "자"] },
        { target: "나무", emoji: "🌳", pieces: ["무", "풀", "나", "잎"] },
        { target: "사자", emoji: "🦁", pieces: ["자", "사", "호", "랑"] },
        { target: "우유", emoji: "🥛", pieces: ["유", "빵", "우", "물"] },
        { target: "아기", emoji: "👶", pieces: ["기", "엄", "아", "마"] },
        { target: "기차", emoji: "🚂", pieces: ["차", "전", "기", "버"] }
      ],
      level2: [
        { target: "비행기", emoji: "✈️", pieces: ["기", "비", "배", "행"] },
        { target: "자전거", emoji: "🚲", pieces: ["거", "자", "전", "차"] },
        { target: "무지개", emoji: "🌈", pieces: ["개", "무", "구", "지"] },
        { target: "신발장", emoji: "👟", pieces: ["장", "신", "옷", "발"] },
        { target: "다람쥐", emoji: "🐿️", pieces: ["쥐", "다", "토", "람"] },
        { target: "호랑이", emoji: "🐯", pieces: ["이", "호", "사", "랑"] },
        { target: "장난감", emoji: "🧸", pieces: ["난", "장", "로", "감"] },
        { target: "냉장고", emoji: "🧊", pieces: ["고", "냉", "문", "장"] },
        { target: "병아리", emoji: "🐥", pieces: ["아", "병", "닭", "리"] },
        { target: "자동차", emoji: "🚗", pieces: ["동", "차", "자", "트"] }
      ],
      level3: [
        { target: "해바라기", emoji: "🌻", pieces: ["라", "해", "꽃", "바", "기"] },
        { target: "아이스크림", emoji: "🍦", pieces: ["스", "아", "크", "이", "림"] },
        { target: "회전목마", emoji: "🎠", pieces: ["목", "회", "마", "전", "말"] },
        { target: "텔레비전", emoji: "📺", pieces: ["비", "텔", "전", "레", "라"] },
        { target: "헬리콥터", emoji: "🚁", pieces: ["콥", "헬", "날", "리", "터"] },
        { target: "미끄럼틀", emoji: "🛝", pieces: ["럼", "미", "틀", "끄", "그"] },
        { target: "소방자동차", emoji: "🚒", pieces: ["동", "소", "차", "방", "자"] },
        { target: "오토바이", emoji: "🏍️", pieces: ["바", "오", "이", "토", "타"] },
        { target: "민들레꽃", emoji: "🌼", pieces: ["레", "민", "꽃", "들", "풀"] },
        { target: "파인애플", emoji: "🍍", pieces: ["애", "파", "플", "인", "과"] }
      ]
    };

    this.selectedWordLevel = 1;
    this.currentWordIdx = 0;
    this.currentWordInput = "";
    this.wordMakerScore = 0;

    /* --------------------------------------------------------------------------
       4. 그림 보고 받침 글자 만들기 (총 30문제)
       -------------------------------------------------------------------------- */
    this.pictureFinalData = [
      { id: 1, word: "달", emoji: "🌙", base: "다", finalChar: "ㄹ", choices: ["ㄹ (달)", "ㄴ (단)", "ㅁ (담)"], answer: 0, exp: "'다'에 'ㄹ' 받침이 만나 예쁜 밤하늘의 '달'이 됩니다!" },
      { id: 2, word: "곰", emoji: "🐻", base: "고", finalChar: "ㅁ", choices: ["ㅁ (곰)", "ㄴ (곤)", "ㅇ (공)"], answer: 0, exp: "'고'에 'ㅁ' 받침이 만나 푹신한 '곰'이 됩니다!" },
      { id: 3, word: "밤", emoji: "🌰", base: "바", finalChar: "ㅁ", choices: ["ㅁ (밤)", "ㄹ (발)", "ㅂ (밥)"], answer: 0, exp: "'바'에 'ㅁ' 받침이 만나 달콤 고소한 '밤'이 됩니다!" },
      { id: 4, word: "산", emoji: "⛰️", base: "사", finalChar: "ㄴ", choices: ["ㄴ (산)", "ㄹ (살)", "ㅁ (삼)"], answer: 0, exp: "'사'에 'ㄴ' 받침이 만나 높푸른 '산'이 됩니다!" },
      { id: 5, word: "별", emoji: "⭐️", base: "벼", finalChar: "ㄹ", choices: ["ㄹ (별)", "ㄴ (변)", "ㅁ (변)"], answer: 0, exp: "'벼'에 'ㄹ' 받침이 만나 반짝이는 '별'이 됩니다!" },
      { id: 6, word: "꽃", emoji: "🌸", base: "꼬", finalChar: "ㅊ", choices: ["ㅊ (꽃)", "ㄱ (꼭)", "ㄴ (꼰)"], answer: 0, exp: "'꼬'에 'ㅊ' 받침이 만나 알록달록 '꽃'이 됩니다!" },
      { id: 7, word: "밥", emoji: "🍚", base: "바", finalChar: "ㅂ", choices: ["ㅂ (밥)", "ㅁ (밤)", "ㄹ (발)"], answer: 0, exp: "'바'에 'ㅂ' 받침이 만나 맛있는 '밥'이 됩니다!" },
      { id: 8, word: "집", emoji: "🏠", base: "지", finalChar: "ㅂ", choices: ["ㅂ (집)", "ㄴ (진)", "ㄹ (질)"], answer: 0, exp: "'지'에 'ㅂ' 받침이 만나 따뜻한 '집'이 됩니다!" },
      { id: 9, word: "물", emoji: "💧", base: "무", finalChar: "ㄹ", choices: ["ㄹ (물)", "ㄴ (문)", "ㅁ (뭄)"], answer: 0, exp: "'무'에 'ㄹ' 받침이 만나 시원한 '물'이 됩니다!" },
      { id: 10, word: "공", emoji: "⚽", base: "고", finalChar: "ㅇ", choices: ["ㅇ (공)", "ㅁ (곰)", "ㄴ (곤)"], answer: 0, exp: "'고'에 'ㅇ' 받침이 만나 둥글둥글 '공'이 됩니다!" },
      { id: 11, word: "책", emoji: "📖", base: "채", finalChar: "ㄱ", choices: ["ㄱ (책)", "ㄴ (챈)", "ㄹ (챌)"], answer: 0, exp: "'채'에 'ㄱ' 받침이 만나 재밌는 '책'이 됩니다!" },
      { id: 12, word: "약", emoji: "💊", base: "야", finalChar: "ㄱ", choices: ["ㄱ (약)", "ㄴ (얀)", "ㅁ (얌)"], answer: 0, exp: "'야'에 'ㄱ' 받침이 만나 아플 때 먹는 '약'이 됩니다!" },
      { id: 13, word: "눈", emoji: "👁️", base: "누", finalChar: "ㄴ", choices: ["ㄴ (눈)", "ㄹ (눌)", "ㅁ (눔)"], answer: 0, exp: "'누'에 'ㄴ' 받침이 만나 사물을 보는 '눈'이 됩니다!" },
      { id: 14, word: "문", emoji: "🚪", base: "무", finalChar: "ㄴ", choices: ["ㄴ (문)", "ㄹ (물)", "ㅁ (뭄)"], answer: 0, exp: "'무'에 'ㄴ' 받침이 만나 열고 닫는 '문'이 됩니다!" },
      { id: 15, word: "손", emoji: "✋", base: "소", finalChar: "ㄴ", choices: ["ㄴ (손)", "ㄹ (솔)", "ㅁ (솜)"], answer: 0, exp: "'소'에 'ㄴ' 받침이 만나 예쁜 '손'이 됩니다!" },
      { id: 16, word: "발", emoji: "🦶", base: "바", finalChar: "ㄹ", choices: ["ㄹ (발)", "ㅂ (밥)", "ㅁ (밤)"], answer: 0, exp: "'바'에 'ㄹ' 받침이 만나 씩씩하게 걷는 '발'이 됩니다!" },
      { id: 17, word: "말", emoji: "🐴", base: "마", finalChar: "ㄹ", choices: ["ㄹ (말)", "ㄴ (만)", "ㅁ (맘)"], answer: 0, exp: "'마'에 'ㄹ' 받침이 만나 다그닥 '말'이 됩니다!" },
      { id: 18, word: "빵", emoji: "🍞", base: "빠", finalChar: "ㅇ", choices: ["ㅇ (빵)", "ㄴ (빤)", "ㄹ (빨)"], answer: 0, exp: "'빠'에 'ㅇ' 받침이 만나 푹신한 '빵'이 됩니다!" },
      { id: 19, word: "강", emoji: "🌊", base: "가", finalChar: "ㅇ", choices: ["ㅇ (강)", "ㄴ (간)", "ㄹ (갈)"], answer: 0, exp: "'가'에 'ㅇ' 받침이 만나 흐르는 '강'이 됩니다!" },
      { id: 20, word: "방", emoji: "🛌", base: "바", finalChar: "ㅇ", choices: ["ㅇ (방)", "ㄴ (반)", "ㄹ (발)"], answer: 0, exp: "'바'에 'ㅇ' 받침이 만나 내 아늑한 '방'이 됩니다!" },
      { id: 21, word: "옷", emoji: "👔", base: "오", finalChar: "ㅅ", choices: ["ㅅ (옷)", "ㄴ (온)", "ㄹ (올)"], answer: 0, exp: "'오'에 'ㅅ' 받침이 만나 입는 '옷'이 됩니다!" },
      { id: 22, word: "목", emoji: "🧣", base: "모", finalChar: "ㄱ", choices: ["ㄱ (목)", "ㄴ (몬)", "ㄹ (몰)"], answer: 0, exp: "'모'에 'ㄱ' 받침이 만나 따뜻한 '목'이 됩니다!" },
      { id: 23, word: "컵", emoji: "🥤", base: "커", finalChar: "ㅂ", choices: ["ㅂ (컵)", "ㄴ (컨)", "ㄹ (컬)"], answer: 0, exp: "'커'에 'ㅂ' 받침이 만나 물을 마시는 '컵'이 됩니다!" },
      { id: 24, word: "잎", emoji: "🍃", base: "이", finalChar: "ㅍ", choices: ["ㅍ (잎)", "ㄴ (인)", "ㄹ (일)"], answer: 0, exp: "'이'에 'ㅍ' 받침이 만나 초록색 '잎'이 됩니다!" },
      { id: 25, word: "빛", emoji: "✨", base: "비", finalChar: "ㅊ", choices: ["ㅊ (빛)", "ㄴ (빈)", "ㄹ (빌)"], answer: 0, exp: "'비'에 'ㅊ' 받침이 만나 환하게 비추는 '빛'이 됩니다!" },
      { id: 26, word: "닭", emoji: "🐔", base: "다", finalChar: "ㄺ", choices: ["ㄺ (닭)", "ㄴ (단)", "ㅁ (담)"], answer: 0, exp: "'다'에 'ㄺ' 받침이 만나 꼬꼬댁 '닭'이 됩니다!" },
      { id: 27, word: "섬", emoji: "🏝️", base: "서", finalChar: "ㅁ", choices: ["ㅁ (섬)", "ㄴ (선)", "ㄹ (설)"], answer: 0, exp: "'서'에 'ㅁ' 받침이 만나 바다 위 '섬'이 됩니다!" },
      { id: 28, word: "돈", emoji: "💵", base: "도", finalChar: "ㄴ", choices: ["ㄴ (돈)", "ㄹ (돌)", "ㅁ (돔)"], answer: 0, exp: "'도'에 'ㄴ' 받침이 만나 지폐 '돈'이 됩니다!" },
      { id: 29, word: "돌", emoji: "🪨", base: "도", finalChar: "ㄹ", choices: ["ㄹ (돌)", "ㄴ (돈)", "ㅁ (돔)"], answer: 0, exp: "'도'에 'ㄹ' 받침이 만나 단단한 '돌'이 됩니다!" },
      { id: 30, word: "꿈", emoji: "💭", base: "꾸", finalChar: "ㅁ", choices: ["ㅁ (꿈)", "ㄴ (꾼)", "ㄹ (꿀)"], answer: 0, exp: "'꾸'에 'ㅁ' 받침이 만나 행복한 '꿈'이 됩니다!" }
    ];

    this.currentPictureFinalIdx = 0;
    this.pictureFinalScore = 0;
    this.selectedPictureFinalAnswers = {};

    /* --------------------------------------------------------------------------
       5. 1~100 수세기 3단계 설정
       -------------------------------------------------------------------------- */
    this.count100Level = 1;
    this.currentCount100 = 0;
    this.quizTarget100 = 5;
    this.count100Score = 0;
    this.count100Answered = false;

    /* --------------------------------------------------------------------------
       6. 사물 갯수 맞추기 50문제 데이터
       -------------------------------------------------------------------------- */
    this.objectCount50Data = {
      level1: [
        { name: "사과", emoji: "🍎", count: 3, choices: [2, 3, 4], answer: 1 },
        { name: "바나나", emoji: "🍌", count: 5, choices: [4, 5, 6], answer: 1 },
        { name: "귀여운 고양이", emoji: "🐱", count: 2, choices: [1, 2, 3], answer: 1 },
        { name: "반짝이는 별", emoji: "⭐", count: 4, choices: [3, 4, 5], answer: 1 },
        { name: "장난감 자동차", emoji: "🚗", count: 1, choices: [1, 2, 3], answer: 0 },
        { name: "달콤한 사탕", emoji: "🍬", count: 5, choices: [3, 4, 5], answer: 2 },
        { name: "멍멍이 강아지", emoji: "🐶", count: 3, choices: [2, 3, 5], answer: 1 },
        { name: "예쁜 새", emoji: "🐥", count: 4, choices: [2, 4, 6], answer: 1 },
        { name: "헤엄치는 물고기", emoji: "🐟", count: 2, choices: [2, 4, 5], answer: 0 },
        { name: "생일 케이크", emoji: "🍰", count: 3, choices: [1, 3, 5], answer: 1 }
      ],
      level2: [
        { name: "색연필", emoji: "✏️", count: 6, choices: [5, 6, 7], answer: 1 },
        { name: "화사한 꽃", emoji: "🌸", count: 8, choices: [7, 8, 9], answer: 1 },
        { name: "알록달록 풍선", emoji: "🎈", count: 7, choices: [6, 7, 8], answer: 1 },
        { name: "축구공", emoji: "⚽", count: 10, choices: [8, 9, 10], answer: 2 },
        { name: "개굴개굴 개구리", emoji: "🐸", count: 6, choices: [6, 7, 8], answer: 0 },
        { name: "나풀나풀 나비", emoji: "🦋", count: 9, choices: [8, 9, 10], answer: 1 },
        { name: "싱그러운 나뭇잎", emoji: "🍃", count: 7, choices: [5, 7, 9], answer: 1 },
        { name: "고소한 쿠키", emoji: "🍪", count: 8, choices: [6, 8, 10], answer: 1 },
        { name: "새콤달콤 딸기", emoji: "🍓", count: 9, choices: [7, 9, 11], answer: 1 },
        { name: "깡충깡충 토끼", emoji: "🐰", count: 10, choices: [9, 10, 12], answer: 1 }
      ],
      level3: [
        { name: "탐스러운 포도", emoji: "🍇", count: 12, choices: [10, 12, 14], answer: 1 },
        { name: "재밌는 그림책", emoji: "📖", count: 11, choices: [11, 13, 15], answer: 0 },
        { name: "알록달록 우산", emoji: "☂️", count: 15, choices: [13, 14, 15], answer: 2 },
        { name: "귀여운 판다", emoji: "🐼", count: 13, choices: [11, 13, 15], answer: 1 },
        { name: "달콤 아이스크림", emoji: "🍦", count: 14, choices: [12, 14, 16], answer: 1 },
        { name: "멋진 빵모자", emoji: "🧢", count: 11, choices: [10, 11, 12], answer: 1 },
        { name: "새콤한 체리", emoji: "🍒", count: 15, choices: [12, 15, 18], answer: 1 },
        { name: "반짝이는 반지", emoji: "💍", count: 13, choices: [11, 13, 14], answer: 1 },
        { name: "영롱한 보석", emoji: "💎", count: 12, choices: [12, 14, 15], answer: 0 },
        { name: "노란 병아리", emoji: "🐤", count: 14, choices: [11, 14, 17], answer: 1 }
      ],
      level4: [
        { name: "달콤 도넛", emoji: "🍩", count: 16, choices: [14, 16, 18], answer: 1 },
        { name: "귀여운 버섯", emoji: "🍄", count: 18, choices: [16, 18, 20], answer: 1 },
        { name: "예쁜 튤립", emoji: "🌷", count: 17, choices: [15, 17, 19], answer: 1 },
        { name: "고소한 도토리", emoji: "🌰", count: 20, choices: [18, 19, 20], answer: 2 },
        { name: "바다 조개껍데기", emoji: "🐚", count: 19, choices: [17, 19, 21], answer: 1 },
        { name: "빛나는 별님", emoji: "🌟", count: 16, choices: [16, 17, 18], answer: 0 },
        { name: "사랑의 하트", emoji: "💖", count: 20, choices: [15, 20, 25], answer: 1 },
        { name: "황금 열쇠", emoji: "🔑", count: 17, choices: [16, 17, 18], answer: 1 },
        { name: "딸랑딸랑 종", emoji: "🔔", count: 18, choices: [17, 18, 19], answer: 1 },
        { name: "상큼한 귤", emoji: "🍊", count: 19, choices: [18, 19, 20], answer: 1 }
      ],
      level5: [
        { name: "영롱한 구슬", emoji: "🔮", count: 24, choices: [20, 24, 28], answer: 1 },
        { name: "반짝이는 동전", emoji: "🪙", count: 25, choices: [22, 25, 27], answer: 1 },
        { name: "알록달록 크레파스", emoji: "🖍️", count: 22, choices: [20, 22, 24], answer: 1 },
        { name: "동글동글 단추", emoji: "🔘", count: 30, choices: [25, 28, 30], answer: 2 },
        { name: "맛있는 캔디", emoji: "🍬", count: 26, choices: [24, 26, 28], answer: 1 },
        { name: "알록달록 블록", emoji: "🧱", count: 28, choices: [26, 28, 30], answer: 1 },
        { name: "우주 반짝이 별", emoji: "✨", count: 21, choices: [19, 21, 23], answer: 1 },
        { name: "맑은 물방울", emoji: "💧", count: 27, choices: [25, 27, 29], answer: 1 },
        { name: "남국 하이비스커스", emoji: "🌺", count: 23, choices: [21, 23, 25], answer: 1 },
        { name: "상큼 청사과", emoji: "🍏", count: 29, choices: [27, 29, 30], answer: 1 }
      ]
    };

    this.selectedObjectLevel = 1;
    this.currentObjectQIdx = 0;
    this.objectQuizScore = 0;
    this.selectedObjectAnswers = {};

    /* --------------------------------------------------------------------------
       7. 십 단위 묶음수 30문제 확장 데이터
       -------------------------------------------------------------------------- */
    this.tensMode = 1;
    this.selectedTensCount = 3;

    this.tensQuiz30Data = {
      level1: [
        { name: "사과 상자", emoji: "🍎", bundles: 2, num: 20, sino: "이십", native: "스물", choices: ["20 (이십/스물)", "10 (십/열)", "30 (삼십/서른)"], answer: 0 },
        { name: "붕어빵 봉지", emoji: "🥐", bundles: 4, num: 40, sino: "사십", native: "마흔", choices: ["30 (삼십/서른)", "40 (사십/마흔)", "50 (오십/쉰)"], answer: 1 },
        { name: "크레파스 곽", emoji: "🖍️", bundles: 1, num: 10, sino: "십", native: "열", choices: ["10 (십/열)", "20 (이십/스물)", "5 (오)"], answer: 0 },
        { name: "달걀 판", emoji: "🥚", bundles: 3, num: 30, sino: "삼십", native: "서른", choices: ["20 (이십/스물)", "30 (삼십/서른)", "40 (사십/마흔)"], answer: 1 },
        { name: "과자 박스", emoji: "🍪", bundles: 2, num: 20, sino: "이십", native: "스물", choices: ["10 (십/열)", "20 (이십/스물)", "40 (사십/마흔)"], answer: 1 },
        { name: "초콜릿 상자", emoji: "🍫", bundles: 4, num: 40, sino: "사십", native: "마흔", choices: ["40 (사십/마흔)", "30 (삼십/서른)", "50 (오십/쉰)"], answer: 0 },
        { name: "바나나 송이", emoji: "🍌", bundles: 3, num: 30, sino: "삼십", native: "서른", choices: ["30 (삼십/서른)", "10 (십/열)", "50 (오십/쉰)"], answer: 0 },
        { name: "색연필 묶음", emoji: "✏️", bundles: 1, num: 10, sino: "십", native: "열", choices: ["20 (이십/스물)", "10 (십/열)", "30 (삼십/서른)"], answer: 1 },
        { name: "사탕 봉지", emoji: "🍬", bundles: 4, num: 40, sino: "사십", native: "마흔", choices: ["20 (이십/스물)", "40 (사십/마흔)", "60 (육십/예순)"], answer: 1 },
        { name: "딸기 바구니", emoji: "🍓", bundles: 2, num: 20, sino: "이십", native: "스물", choices: ["20 (이십/스물)", "30 (삼십/서른)", "10 (십/열)"], answer: 0 }
      ],
      level2: [
        { name: "귤 망", emoji: "🍊", bundles: 5, num: 50, sino: "오십", native: "쉰", choices: ["40 (사십/마흔)", "50 (오십/쉰)", "60 (육십/예순)"], answer: 1 },
        { name: "도토리 자루", emoji: "🌰", bundles: 6, num: 60, sino: "육십", native: "예순", choices: ["50 (오십/쉰)", "60 (육십/예순)", "70 (칠십/일흔)"], answer: 1 },
        { name: "지우개 곽", emoji: "🧼", bundles: 7, num: 70, sino: "칠십", native: "일흔", choices: ["60 (육십/예순)", "70 (칠십/일흔)", "80 (팔십/여든)"], answer: 1 },
        { name: "도넛 상자", emoji: "🍩", bundles: 5, num: 50, sino: "오십", native: "쉰", choices: ["50 (오십/쉰)", "30 (삼십/서른)", "60 (육십/예순)"], answer: 0 },
        { name: "조개껍데기 묶음", emoji: "🐚", bundles: 6, num: 60, sino: "육십", native: "예순", choices: ["40 (사십/마흔)", "60 (육십/예순)", "80 (팔십/여든)"], answer: 1 },
        { name: "버섯 바구니", emoji: "🍄", bundles: 7, num: 70, sino: "칠십", native: "일흔", choices: ["70 (칠십/일흔)", "50 (오십/쉰)", "90 (구십/아흔)"], answer: 0 },
        { name: "꽃다발", emoji: "🌷", bundles: 5, num: 50, sino: "오십", native: "쉰", choices: ["40 (사십/마흔)", "50 (오십/쉰)", "70 (칠십/일흔)"], answer: 1 },
        { name: "단추 곽", emoji: "🔘", bundles: 6, num: 60, sino: "육십", native: "예순", choices: ["60 (육십/예순)", "50 (오십/쉰)", "70 (칠십/일흔)"], answer: 0 },
        { name: "물방울 묶음", emoji: "💧", bundles: 7, num: 70, sino: "칠십", native: "일흔", choices: ["60 (육십/예순)", "70 (칠십/일흔)", "90 (구십/아흔)"], answer: 1 },
        { name: "빵 상자", emoji: "🍞", bundles: 5, num: 50, sino: "오십", native: "쉰", choices: ["50 (오십/쉰)", "40 (사십/마흔)", "60 (육십/예순)"], answer: 0 }
      ],
      level3: [
        { name: "구슬 주머니", emoji: "🔮", bundles: 8, num: 80, sino: "팔십", native: "여든", choices: ["80 (팔십/여든)", "70 (칠십/일흔)", "90 (구십/아흔)"], answer: 0 },
        { name: "클립 상자", emoji: "📎", bundles: 9, num: 90, sino: "구십", native: "아흔", choices: ["80 (팔십/여든)", "90 (구십/아흔)", "100 (백)"], answer: 1 },
        { name: "동전 묶음", emoji: "🪙", bundles: 10, num: 100, sino: "백", native: "백", choices: ["90 (구십/아흔)", "100 (백)", "80 (팔십/여든)"], answer: 1 },
        { name: "풍선 다발", emoji: "🎈", bundles: 8, num: 80, sino: "팔십", native: "여든", choices: ["70 (칠십/일흔)", "80 (팔십/여든)", "100 (백)"], answer: 1 },
        { name: "우유 팩", emoji: "🥛", bundles: 9, num: 90, sino: "구십", native: "아흔", choices: ["90 (구십/아흔)", "80 (팔십/여든)", "70 (칠십/일흔)"], answer: 0 },
        { name: "보석 곽", emoji: "💎", bundles: 10, num: 100, sino: "백", native: "백", choices: ["100 (백)", "90 (구십/아흔)", "80 (팔십/여든)"], answer: 0 },
        { name: "종 묶음", emoji: "🔔", bundles: 8, num: 80, sino: "팔십", native: "여든", choices: ["60 (육십/예순)", "80 (팔십/여든)", "90 (구십/아흔)"], answer: 1 },
        { name: "열쇠 고리", emoji: "🔑", bundles: 9, num: 90, sino: "구십", native: "아흔", choices: ["90 (구십/아흔)", "100 (백)", "70 (칠십/일흔)"], answer: 0 },
        { name: "청사과 박스", emoji: "🍏", bundles: 10, num: 100, sino: "백", native: "백", choices: ["90 (구십/아흔)", "100 (백)", "80 (팔십/여든)"], answer: 1 },
        { name: "반짝이 별 묶음", emoji: "✨", bundles: 8, num: 80, sino: "팔십", native: "여든", choices: ["80 (팔십/여든)", "90 (구십/아흔)", "100 (백)"], answer: 0 }
      ]
    };

    this.selectedTensQuizLevel = 1;
    this.currentTensQIdx = 0;
    this.tensQuizScore = 0;
    this.selectedTensAnswers = {};

    this.gameTargetBundles = 4;
    this.gameUserBundles = 0;

    /* --------------------------------------------------------------------------
       8. 더해서 10 만들기 (10의 보수 30문제 확장 데이터) [UPGRADED]
       -------------------------------------------------------------------------- */
    this.makeTenMode = 1; // 1: 탐색판, 2: 10의 보수 빈칸 퀴즈 (15문제), 3: 10의 보수 짝 맞추기 게임 (15문제)
    this.selectedTenExplorerPair = 7; // default 7 + 3 = 10

    // Mode 2: Fill-in-the-blank Quiz (15 Qs)
    this.makeTenQuizData = [
      { num1: 7, num2: null, target: 10, answer: 3, choices: [2, 3, 4], exp: "7과 3이 만나서 10이 되므로 ⭐은 3입니다!" },
      { num1: 4, num2: null, target: 10, answer: 6, choices: [5, 6, 7], exp: "4와 6이 만나서 10이 되므로 ⭐은 6입니다!" },
      { num1: null, num2: 8, target: 10, answer: 2, choices: [2, 3, 4], exp: "2와 8이 만나서 10이 되므로 ⭐은 2입니다!" },
      { num1: 5, num2: null, target: 10, answer: 5, choices: [4, 5, 6], exp: "5와 5가 만나서 10이 되므로 ⭐은 5입니다!" },
      { num1: 1, num2: null, target: 10, answer: 9, choices: [8, 9, 10], exp: "1과 9가 만나서 10이 되므로 ⭐은 9입니다!" },
      { num1: null, num2: 3, target: 10, answer: 7, choices: [6, 7, 8], exp: "7과 3이 만나서 10이 되므로 ⭐은 7입니다!" },
      { num1: 9, num2: null, target: 10, answer: 1, choices: [1, 2, 3], exp: "9와 1이 만나서 10이 되므로 ⭐은 1입니다!" },
      { num1: null, num2: 2, target: 10, answer: 8, choices: [7, 8, 9], exp: "8과 2가 만나서 10이 되므로 ⭐은 8입니다!" },
      { num1: 6, num2: null, target: 10, answer: 4, choices: [3, 4, 5], exp: "6과 4가 만나서 10이 되므로 ⭐은 4입니다!" },
      { num1: 8, num2: null, target: 10, answer: 2, choices: [1, 2, 3], exp: "8과 2가 만나서 10이 되므로 ⭐은 2입니다!" },
      { num1: null, num2: 5, target: 10, answer: 5, choices: [4, 5, 6], exp: "5와 5가 만나서 10이 되므로 ⭐은 5입니다!" },
      { num1: 2, num2: null, target: 10, answer: 8, choices: [6, 7, 8], exp: "2와 8이 만나서 10이 되므로 ⭐은 8입니다!" },
      { num1: null, num2: 9, target: 10, answer: 1, choices: [1, 2, 3], exp: "1과 9가 만나서 10이 되므로 ⭐은 1입니다!" },
      { num1: 3, num2: null, target: 10, answer: 7, choices: [5, 6, 7], exp: "3과 7이 만나서 10이 되므로 ⭐은 7입니다!" },
      { num1: null, num2: 6, target: 10, answer: 4, choices: [3, 4, 5], exp: "4와 6이 만나서 10이 되므로 ⭐은 4입니다!" }
    ];

    this.currentMakeTenQuizIdx = 0;
    this.makeTenQuizScore = 0;
    this.selectedMakeTenAnswers = {};

    // Mode 3: Card Match Game Data (15 Qs)
    this.makeTenGameData = [
      { base: 6, target: 10, answer: 4, choices: [3, 4, 5], exp: "6의 10의 보수 짝꿍은 4입니다!" },
      { base: 8, target: 10, answer: 2, choices: [2, 3, 4], exp: "8의 10의 보수 짝꿍은 2입니다!" },
      { base: 3, target: 10, answer: 7, choices: [5, 6, 7], exp: "3의 10의 보수 짝꿍은 7입니다!" },
      { base: 9, target: 10, answer: 1, choices: [1, 2, 3], exp: "9의 10의 보수 짝꿍은 1입니다!" },
      { base: 5, target: 10, answer: 5, choices: [4, 5, 6], exp: "5의 10의 보수 짝꿍은 5입니다!" },
      { base: 1, target: 10, answer: 9, choices: [7, 8, 9], exp: "1의 10의 보수 짝꿍은 9입니다!" },
      { base: 7, target: 10, answer: 3, choices: [2, 3, 4], exp: "7의 10의 보수 짝꿍은 3입니다!" },
      { base: 2, target: 10, answer: 8, choices: [6, 7, 8], exp: "2의 10의 보수 짝꿍은 8입니다!" },
      { base: 4, target: 10, answer: 6, choices: [5, 6, 7], exp: "4의 10의 보수 짝꿍은 6입니다!" },
      { base: 9, target: 10, answer: 1, choices: [1, 3, 5], exp: "9의 10의 보수 짝꿍은 1입니다!" },
      { base: 7, target: 10, answer: 3, choices: [3, 5, 7], exp: "7의 10의 보수 짝꿍은 3입니다!" },
      { base: 5, target: 10, answer: 5, choices: [3, 5, 7], exp: "5의 10의 보수 짝꿍은 5입니다!" },
      { base: 8, target: 10, answer: 2, choices: [2, 4, 6], exp: "8의 10의 보수 짝꿍은 2입니다!" },
      { base: 6, target: 10, answer: 4, choices: [2, 4, 6], exp: "6의 10의 보수 짝꿍은 4입니다!" },
      { base: 1, target: 10, answer: 9, choices: [5, 7, 9], exp: "1의 10의 보수 짝꿍은 9입니다!" }
    ];

    this.currentMakeTenGameIdx = 0;
    this.makeTenGameScore = 0;
    this.selectedMakeTenGameAnswers = {};
  }

  render(container) {
    const activityName = this.subActivities[this.currentSubIndex];
    let html = `
      <div class="sub-nav-bar" style="flex-wrap:wrap;">
        <button class="sub-nav-btn ${this.currentSubIndex===0?'active':''}" onclick="level2Manager.switchSub(0)"><i class="fa-solid fa-shapes"></i> 1. 자모 결합기 (자음+모음)</button>
        <button class="sub-nav-btn ${this.currentSubIndex===1?'active':''}" onclick="level2Manager.switchSub(1)"><i class="fa-solid fa-layer-group"></i> 2. 자음+모음+자음 (받침 결합기)</button>
        <button class="sub-nav-btn ${this.currentSubIndex===2?'active':''}" onclick="level2Manager.switchSub(2)"><i class="fa-solid fa-font"></i> 3. 낱말 만들기 (2·3·4글자)</button>
        <button class="sub-nav-btn ${this.currentSubIndex===3?'active':''}" onclick="level2Manager.switchSub(3)"><i class="fa-solid fa-image"></i> 4. 그림 받침 글자 만들기 (30문제)</button>
        <button class="sub-nav-btn ${this.currentSubIndex===4?'active':''}" onclick="level2Manager.switchSub(4)"><i class="fa-solid fa-list-ol"></i> 5. 1~100 수세기 (3단계)</button>
        <button class="sub-nav-btn ${this.currentSubIndex===5?'active':''}" onclick="level2Manager.switchSub(5)"><i class="fa-solid fa-calculator"></i> 6. 사물 갯수 맞추기 (50문제)</button>
        <button class="sub-nav-btn ${this.currentSubIndex===6?'active':''}" onclick="level2Manager.switchSub(6)"><i class="fa-solid fa-cubes"></i> 7. 십 단위 묶음수 (30문제)</button>
        <button class="sub-nav-btn ${this.currentSubIndex===7?'active':''}" onclick="level2Manager.switchSub(7)"><i class="fa-solid fa-puzzle-piece"></i> 8. 10의 보수 (30문제)</button>
      </div>
      <div id="level2SubWorkspace"></div>
    `;
    container.innerHTML = html;

    const workspace = document.getElementById('level2SubWorkspace');
    if (activityName === 'syllableBuilder') this.renderSyllableBuilder(workspace);
    else if (activityName === 'syllable3Builder') this.renderSyllable3Builder(workspace);
    else if (activityName === 'wordMaker') this.renderWordMaker(workspace);
    else if (activityName === 'finalConsonant') this.renderPictureFinalConsonant(workspace);
    else if (activityName === 'count100') this.renderCount100(workspace);
    else if (activityName === 'objectCountQuiz') this.renderObjectCountQuiz(workspace);
    else if (activityName === 'tensGroup') this.renderTensGroup(workspace);
    else if (activityName === 'makeTenComplement') this.renderMakeTenComplement(workspace);
  }

  switchSub(index) {
    soundManager.playClick();
    this.currentSubIndex = index;
    const container = document.getElementById('curriculumActivityArea');
    if (container) this.render(container);
  }

  /* --------------------------------------------------------------------------
     1. Consonant + Vowel Unicode Syllable Builder (자음 + 모음 결합기)
     -------------------------------------------------------------------------- */
  renderSyllableBuilder(workspace) {
    const promptText = "자음과 모음을 클릭하여 한글 글자를 만들어보세요!";
    workspace.innerHTML = `
      <div class="activity-header">
        <div class="activity-header-text">
          <h2>🔤 자음 & 모음 결합기 (가, 나, 다...)</h2>
          <p>${promptText}</p>
        </div>
        <button class="speak-btn" onclick="level2Manager.speakBuiltSyllable()"><i class="fa-solid fa-volume-high"></i></button>
      </div>

      <div class="syllable-builder-wrap">
        <div class="syllable-display" id="syllableOutput">가</div>

        <div class="char-picker-section">
          <h4>1. 초성 자음 선택 (ㄱ~ㅊ):</h4>
          <div class="char-grid">
            ${['ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ','ㅇ','ㅈ','ㅊ'].map((c, i) => `
              <button class="char-chip ${i===this.selectedConsonantIdx?'selected':''}" onclick="level2Manager.selectConsonant(${i})">${c}</button>
            `).join('')}
          </div>
        </div>

        <div class="char-picker-section">
          <h4>2. 중성 모음 선택 (ㅏ~ㅣ):</h4>
          <div class="char-grid">
            ${['ㅏ','ㅑ','ㅓ','ㅕ','ㅗ','ㅛ','ㅜ','ㅠ','ㅡ','ㅣ'].map((v, i) => {
              const realVowelIndices = [0, 2, 4, 6, 8, 12, 13, 17, 18, 20];
              return `<button class="char-chip ${realVowelIndices[i]===this.selectedVowelIdx?'selected':''}" onclick="level2Manager.selectVowel(${realVowelIndices[i]})">${v}</button>`;
            }).join('')}
          </div>
        </div>
      </div>
    `;
    this.updateSyllableDisplay();
  }

  selectConsonant(cIdx) {
    soundManager.playClick();
    const initialMap = [0, 2, 3, 5, 6, 7, 9, 11, 12, 14];
    this.selectedConsonantIdx = initialMap[cIdx];
    this.updateSyllableDisplay();
  }

  selectVowel(vIdx) {
    soundManager.playClick();
    this.selectedVowelIdx = vIdx;
    this.updateSyllableDisplay();
  }

  updateSyllableDisplay() {
    const code = 0xAC00 + (this.selectedConsonantIdx * 588) + (this.selectedVowelIdx * 28);
    const char = String.fromCharCode(code);
    const elem = document.getElementById('syllableOutput');
    if (elem) {
      elem.innerText = char;
      soundManager.playCorrect();
      ttsManager.speak(char);
    }
  }

  speakBuiltSyllable() {
    const elem = document.getElementById('syllableOutput');
    if (elem) ttsManager.speak(elem.innerText);
  }

  /* --------------------------------------------------------------------------
     2. Consonant + Vowel + Consonant (자음 & 모음 & 자음 결합기 - 받침 글자)
     -------------------------------------------------------------------------- */
  renderSyllable3Builder(workspace) {
    const promptText = "초성 자음, 중성 모음, 종성 받침자음을 순서대로 선택하여 받침 있는 글자를 만들어 보세요!";
    
    const initialList = [
      { char: 'ㄱ', idx: 0 }, { char: 'ㄴ', idx: 2 }, { char: 'ㄷ', idx: 3 },
      { char: 'ㄹ', idx: 5 }, { char: 'ㅁ', idx: 6 }, { char: 'ㅂ', idx: 7 },
      { char: 'ㅅ', idx: 9 }, { char: 'ㅇ', idx: 11 }, { char: 'ㅈ', idx: 12 },
      { char: 'ㅊ', idx: 14 }, { char: 'ㅋ', idx: 15 }, { char: 'ㅌ', idx: 16 },
      { char: 'ㅍ', idx: 17 }, { char: 'ㅎ', idx: 18 }
    ];

    const vowelList = [
      { char: 'ㅏ', idx: 0 }, { char: 'ㅑ', idx: 2 }, { char: 'ㅓ', idx: 4 },
      { char: 'ㅕ', idx: 6 }, { char: 'ㅗ', idx: 8 }, { char: 'ㅛ', idx: 12 },
      { char: 'ㅜ', idx: 13 }, { char: 'ㅠ', idx: 17 }, { char: 'ㅡ', idx: 18 },
      { char: 'ㅣ', idx: 20 }
    ];

    const finalList = [
      { char: '없음', idx: 0 },
      { char: 'ㄱ', idx: 1 }, { char: 'ㄴ', idx: 4 }, { char: 'ㄷ', idx: 7 },
      { char: 'ㄹ', idx: 8 }, { char: 'ㅁ', idx: 16 }, { char: 'ㅂ', idx: 17 },
      { char: 'ㅅ', idx: 19 }, { char: 'ㅇ', idx: 21 }, { char: 'ㅈ', idx: 22 },
      { char: 'ㅊ', idx: 23 }, { char: 'ㅋ', idx: 24 }, { char: 'ㅌ', idx: 25 },
      { char: 'ㅍ', idx: 26 }, { char: 'ㅎ', idx: 27 }
    ];

    workspace.innerHTML = `
      <div class="activity-header">
        <div class="activity-header-text">
          <h2>🔤 자음 & 모음 & 자음 결합기 (강, 달, 곰, 밤, 별, 꽃...)</h2>
          <p>${promptText}</p>
        </div>
        <button class="speak-btn" onclick="level2Manager.speakBuiltSyllable3()"><i class="fa-solid fa-volume-high"></i></button>
      </div>

      <div class="syllable-builder-wrap" style="max-width:850px; margin: 0 auto;">
        <div style="display:flex; justify-content:center; align-items:center; gap:2.5rem; margin-bottom:1.5rem; background:#fffbe6; padding:1.5rem; border-radius:20px; border:3px solid #f6ad55; box-shadow:var(--shadow-sm);">
          <div class="syllable-display" id="syllable3Output" style="font-size:5.5rem; color:#2b6cb0; font-family:var(--font-family-friendly);">강</div>
          <div style="font-size:1.15rem; font-weight:800; color:#4a5568; text-align:left; line-height:1.8;">
            <div>📌 첫 자음(초성): <span id="initial3Label" style="color:#d69e2e; font-size:1.4rem;">ㄱ</span></div>
            <div>📌 가운데 모음(중성): <span id="vowel3Label" style="color:#3182ce; font-size:1.4rem;">ㅏ</span></div>
            <div>📌 받침 자음(종성): <span id="final3Label" style="color:#e53e3e; font-size:1.4rem;">ㅇ</span></div>
          </div>
        </div>

        <!-- Initial Picker -->
        <div class="char-picker-section">
          <h4 style="color:#b7791f; font-weight:800;">1. 첫 자음 (초성) 선택:</h4>
          <div class="char-grid">
            ${initialList.map(item => `
              <button class="char-chip ${item.idx===this.selectedInitial3Idx?'selected':''}" onclick="level2Manager.selectInitial3(${item.idx}, '${item.char}')">${item.char}</button>
            `).join('')}
          </div>
        </div>

        <!-- Vowel Picker -->
        <div class="char-picker-section" style="margin-top:1.25rem;">
          <h4 style="color:#2b6cb0; font-weight:800;">2. 가운데 모음 (중성) 선택:</h4>
          <div class="char-grid">
            ${vowelList.map(item => `
              <button class="char-chip ${item.idx===this.selectedVowel3Idx?'selected':''}" onclick="level2Manager.selectVowel3(${item.idx}, '${item.char}')">${item.char}</button>
            `).join('')}
          </div>
        </div>

        <!-- Final Consonant Picker -->
        <div class="char-picker-section" style="margin-top:1.25rem;">
          <h4 style="color:#c53030; font-weight:800;">3. 받침 자음 (종성) 선택:</h4>
          <div class="char-grid">
            ${finalList.map(item => `
              <button class="char-chip ${item.idx===this.selectedFinal3Idx?'selected':''}" style="${item.idx===0?'min-width:65px;':''}" onclick="level2Manager.selectFinal3(${item.idx}, '${item.char}')">${item.char}</button>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    this.updateSyllable3Display();
  }

  selectInitial3(idx, char) {
    soundManager.playClick();
    this.selectedInitial3Idx = idx;
    const label = document.getElementById('initial3Label');
    if (label) label.innerText = char;
    const workspace = document.getElementById('level2SubWorkspace');
    if (workspace) this.renderSyllable3Builder(workspace);
  }

  selectVowel3(idx, char) {
    soundManager.playClick();
    this.selectedVowel3Idx = idx;
    const label = document.getElementById('vowel3Label');
    if (label) label.innerText = char;
    const workspace = document.getElementById('level2SubWorkspace');
    if (workspace) this.renderSyllable3Builder(workspace);
  }

  selectFinal3(idx, char) {
    soundManager.playClick();
    this.selectedFinal3Idx = idx;
    const label = document.getElementById('final3Label');
    if (label) label.innerText = char;
    const workspace = document.getElementById('level2SubWorkspace');
    if (workspace) this.renderSyllable3Builder(workspace);
  }

  updateSyllable3Display() {
    const code = 0xAC00 + (this.selectedInitial3Idx * 588) + (this.selectedVowel3Idx * 28) + this.selectedFinal3Idx;
    const char = String.fromCharCode(code);
    const elem = document.getElementById('syllable3Output');
    if (elem) {
      elem.innerText = char;
      soundManager.playCorrect();
      ttsManager.speak(char);
    }
  }

  speakBuiltSyllable3() {
    const elem = document.getElementById('syllable3Output');
    if (elem) ttsManager.speak(elem.innerText);
  }

  /* --------------------------------------------------------------------------
     3. 낱말 만들기 (2글자 10개, 3글자 10개, 4글자 10개 - 단계별 30문제)
     -------------------------------------------------------------------------- */
  renderWordMaker(workspace) {
    let currentList = this.wordMakerData[`level${this.selectedWordLevel}`];
    if (this.currentWordIdx >= currentList.length) this.currentWordIdx = 0;

    const currentItem = currentList[this.currentWordIdx];
    const totalCount = currentList.length;

    const promptText = `그림을 보고 아래 글자 조각을 순서대로 눌러 ${currentItem.target.length}글자 낱말을 완성해 보세요!`;

    workspace.innerHTML = `
      <div class="activity-header">
        <div class="activity-header-text">
          <h2>🦋 두리두리 낱말 만들기 (2글자, 3글자, 4글자)</h2>
          <p>${promptText}</p>
        </div>
        <button class="speak-btn" onclick="ttsManager.speak('${currentItem.target}')"><i class="fa-solid fa-volume-high"></i></button>
      </div>

      <!-- Level Filter Tabs -->
      <div style="display:flex; gap:0.5rem; justify-content:center; flex-wrap:wrap; margin-bottom:1.5rem;">
        <button class="primary-btn ${this.selectedWordLevel===1?'pulse':''}" style="padding:0.6rem 1.2rem; font-size:1rem; background:${this.selectedWordLevel===1?'#38a169':'#64748b'};" onclick="level2Manager.switchWordLevel(1)">1단계: 2글자 낱말 (10개)</button>
        <button class="primary-btn ${this.selectedWordLevel===2?'pulse':''}" style="padding:0.6rem 1.2rem; font-size:1rem; background:${this.selectedWordLevel===2?'#3182ce':'#64748b'};" onclick="level2Manager.switchWordLevel(2)">2단계: 3글자 낱말 (10개)</button>
        <button class="primary-btn ${this.selectedWordLevel===3?'pulse':''}" style="padding:0.6rem 1.2rem; font-size:1rem; background:${this.selectedWordLevel===3?'#8b5cf6':'#64748b'};" onclick="level2Manager.switchWordLevel(3)">3단계: 4글자 낱말 (10개)</button>
      </div>

      <div style="max-width:700px; margin: 0 auto; text-align:center;">
        <!-- Status Bar -->
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.05); padding:0.75rem 1.25rem; border-radius:14px; margin-bottom:1rem; font-weight:700;">
          <div>📌 낱말 ${this.currentWordIdx + 1} / ${totalCount} (${this.selectedWordLevel * 1 + 1}글자)</div>
          <div>⭐ 점수: ${this.wordMakerScore}점</div>
        </div>

        <!-- Target Image & Syllable Input Box -->
        <div class="clip-theme-card" style="padding:2rem; background:#fffbe6; border:4px solid #f6ad55; margin-bottom:1.5rem; border-radius:20px;">
          <div style="font-size:5.5rem; margin-bottom:0.5rem;">${currentItem.emoji}</div>
          
          <div style="display:flex; justify-content:center; gap:0.75rem; margin-top:1rem;" id="wordSlotsContainer">
            ${Array.from({length: currentItem.target.length}).map((_, i) => `
              <div style="width:70px; height:70px; line-height:70px; font-size:2.2rem; font-weight:800; background:#fff; border:3px solid #cbd5e1; border-radius:14px; color:#2b6cb0;" id="slot_${i}">
                ${this.currentWordInput[i] || '?'}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Choice Syllable Chips -->
        <h4 style="margin-bottom:0.75rem; color:#4a5568; font-weight:800;">아래 글자 조각을 알맞은 순서대로 클릭하세요:</h4>
        <div style="display:flex; gap:0.75rem; justify-content:center; flex-wrap:wrap; margin-bottom:1.5rem;">
          ${currentItem.pieces.map((p, i) => `
            <button class="btn-choice" style="font-size:2rem; min-width:80px; height:80px; border-radius:16px; font-weight:800;" onclick="level2Manager.pickWordPiece('${p}')">${p}</button>
          `).join('')}
        </div>

        <!-- Clear / Retry & Navigation Buttons -->
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <button class="primary-btn" style="background:#e2e8f0; color:#475569;" onclick="level2Manager.resetCurrentWordInput()"><i class="fa-solid fa-rotate-left"></i> 지우기</button>
          <div style="display:flex; gap:0.5rem;">
            <button class="primary-btn" ${this.currentWordIdx === 0 ? 'disabled' : ''} onclick="level2Manager.prevWordItem()"><i class="fa-solid fa-arrow-left"></i> 이전</button>
            <button class="primary-btn" onclick="level2Manager.nextWordItem()">다음 <i class="fa-solid fa-arrow-right"></i></button>
          </div>
        </div>
      </div>
    `;

    ttsManager.speak(currentItem.target);
  }

  switchWordLevel(lvl) {
    soundManager.playClick();
    this.selectedWordLevel = lvl;
    this.currentWordIdx = 0;
    this.currentWordInput = "";
    const workspace = document.getElementById('level2SubWorkspace');
    if (workspace) this.renderWordMaker(workspace);
  }

  pickWordPiece(piece) {
    soundManager.playClick();
    let currentList = this.wordMakerData[`level${this.selectedWordLevel}`];
    const currentItem = currentList[this.currentWordIdx];

    if (this.currentWordInput.length < currentItem.target.length) {
      this.currentWordInput += piece;
      
      for (let i = 0; i < currentItem.target.length; i++) {
        const slot = document.getElementById(`slot_${i}`);
        if (slot) slot.innerText = this.currentWordInput[i] || '?';
      }

      if (this.currentWordInput.length === currentItem.target.length) {
        if (this.currentWordInput === currentItem.target) {
          soundManager.playCorrect();
          this.wordMakerScore += 10;
          appState.addStar(1);
          ttsManager.speak(`${currentItem.target}! 정답입니다! 별 1개를 획득했어요!`);
        } else {
          soundManager.playWrong();
          ttsManager.speak(`아쉬워요! 지우기 버튼을 누르고 다시 해보세요!`);
        }
      }
    }
  }

  resetCurrentWordInput() {
    soundManager.playClick();
    this.currentWordInput = "";
    let currentList = this.wordMakerData[`level${this.selectedWordLevel}`];
    const currentItem = currentList[this.currentWordIdx];

    for (let i = 0; i < currentItem.target.length; i++) {
      const slot = document.getElementById(`slot_${i}`);
      if (slot) slot.innerText = '?';
    }
  }

  nextWordItem() {
    soundManager.playClick();
    let currentList = this.wordMakerData[`level${this.selectedWordLevel}`];
    if (this.currentWordIdx < currentList.length - 1) {
      this.currentWordIdx++;
      this.currentWordInput = "";
      const workspace = document.getElementById('level2SubWorkspace');
      if (workspace) this.renderWordMaker(workspace);
    } else {
      appState.showCelebrationModal(`${this.selectedWordLevel + 1}글자 낱말 만들기 완성! 🎉`, `총 ${this.wordMakerScore}점을 획득하며 멋지게 정복했습니다! 🦋⭐`);
    }
  }

  prevWordItem() {
    soundManager.playClick();
    if (this.currentWordIdx > 0) {
      this.currentWordIdx--;
      this.currentWordInput = "";
      const workspace = document.getElementById('level2SubWorkspace');
      if (workspace) this.renderWordMaker(workspace);
    }
  }

  /* --------------------------------------------------------------------------
     4. 그림 보고 받침 글자 만들기 (총 30문제)
     -------------------------------------------------------------------------- */
  renderPictureFinalConsonant(workspace) {
    const currentItem = this.pictureFinalData[this.currentPictureFinalIdx];
    const totalCount = this.pictureFinalData.length;
    const hasChosen = this.selectedPictureFinalAnswers[this.currentPictureFinalIdx] !== undefined;
    const chosenIdx = this.selectedPictureFinalAnswers[this.currentPictureFinalIdx];

    const promptText = `그림을 보고 '${currentItem.base}' 자에 어울리는 올바른 받침을 찾아 낱말 '${currentItem.word}'을 완성을 해보세요!`;

    workspace.innerHTML = `
      <div class="activity-header">
        <div class="activity-header-text">
          <h2>🖼️ 그림 보고 받침 글자 만들기 (총 30문제)</h2>
          <p>${promptText}</p>
        </div>
        <button class="speak-btn" onclick="ttsManager.speak('${currentItem.word}')"><i class="fa-solid fa-volume-high"></i></button>
      </div>

      <div style="max-width:700px; margin: 0 auto; text-align:center;">
        <!-- Status Bar -->
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.05); padding:0.75rem 1.25rem; border-radius:14px; margin-bottom:1rem; font-weight:700;">
          <div>📌 그림 받침 문제 ${this.currentPictureFinalIdx + 1} / ${totalCount}</div>
          <div>⭐ 점수: ${this.pictureFinalScore}점</div>
        </div>

        <!-- Picture & Syllable Formula Card -->
        <div class="clip-theme-card" style="padding:2.2rem; background:#fffbe6; border:4px solid #3182ce; margin-bottom:1.5rem; border-radius:20px;">
          <div style="font-size:6rem; margin-bottom:0.5rem;">${currentItem.emoji}</div>
          
          <div style="display:flex; justify-content:center; align-items:center; gap:1rem; margin-top:1rem; font-size:2.2rem; font-weight:800;">
            <div style="background:#edf2f7; padding:0.5rem 1.2rem; border-radius:14px; color:#2b6cb0;">[ ${currentItem.base} ]</div>
            <div>+</div>
            <div style="background:#feebc8; padding:0.5rem 1.2rem; border-radius:14px; color:#c05621; border:2px dashed #dd6b20;">[ ? 받침 ]</div>
            <div>=</div>
            <div style="background:#c6f6d5; padding:0.5rem 1.2rem; border-radius:14px; color:#22543d;">
              ${hasChosen && chosenIdx === currentItem.answer ? currentItem.word : '❓'}
            </div>
          </div>
        </div>

        <!-- Choices Grid -->
        <h4 style="margin-bottom:0.75rem; color:#4a5568; font-weight:800;">알맞은 받침 글자를 고르세요:</h4>
        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:1rem; margin-bottom:1.5rem;">
          ${currentItem.choices.map((choiceText, idx) => {
            let extraClass = "";
            if (hasChosen) {
              if (idx === currentItem.answer) extraClass = "correct";
              else if (idx === chosenIdx) extraClass = "wrong";
            }
            return `
              <button class="btn-choice ${extraClass}" style="font-size:1.4rem; padding:1.2rem; border-radius:16px; font-weight:800;" ${hasChosen ? 'disabled' : ''} onclick="level2Manager.checkPictureFinal(${idx})">
                ${choiceText}
              </button>
            `;
          }).join('')}
        </div>

        <!-- Explanation Card -->
        ${hasChosen ? `
          <div class="clip-theme-card" style="padding:1.25rem; background:#f0fdf4; border-left:5px solid #22c55e; margin-bottom:1.5rem; text-align:left;">
            <h4 style="color:#15803d; margin-bottom:0.4rem;">💡 받침 한글 해설</h4>
            <p style="font-size:1.05rem; line-height:1.6;">${currentItem.exp}</p>
          </div>
        ` : ''}

        <!-- Navigation Buttons -->
        <div style="display:flex; justify-content:space-between;">
          <button class="primary-btn" ${this.currentPictureFinalIdx === 0 ? 'disabled' : ''} onclick="level2Manager.prevPictureFinalQ()"><i class="fa-solid fa-arrow-left"></i> 이전 문제</button>
          <button class="primary-btn" ${!hasChosen ? 'disabled' : ''} onclick="level2Manager.nextPictureFinalQ()">다음 문제 <i class="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>
    `;

    ttsManager.speak(currentItem.word);
  }

  checkPictureFinal(chosenIdx) {
    if (this.selectedPictureFinalAnswers[this.currentPictureFinalIdx] !== undefined) return;

    this.selectedPictureFinalAnswers[this.currentPictureFinalIdx] = chosenIdx;
    const currentItem = this.pictureFinalData[this.currentPictureFinalIdx];
    const isCorrect = (chosenIdx === currentItem.answer);

    if (isCorrect) {
      soundManager.playCorrect();
      this.pictureFinalScore += 10;
      appState.addStar(1);
      ttsManager.speak(`정답입니다! '${currentItem.base}'에 '${currentItem.finalChar}' 받침이 붙어 '${currentItem.word}'이 됩니다!`);
    } else {
      soundManager.playWrong();
      ttsManager.speak("아쉬워요! 아래 해설을 읽어보세요.");
    }

    const workspace = document.getElementById('level2SubWorkspace');
    if (workspace) this.renderPictureFinalConsonant(workspace);
  }

  nextPictureFinalQ() {
    soundManager.playClick();
    if (this.currentPictureFinalIdx < this.pictureFinalData.length - 1) {
      this.currentPictureFinalIdx++;
      const workspace = document.getElementById('level2SubWorkspace');
      if (workspace) this.renderPictureFinalConsonant(workspace);
    } else {
      appState.showCelebrationModal("그림 받침 글자 30문제 마스터! 🎉", `총 ${this.pictureFinalScore}점을 획득하며 받침 글자 만들기를 완벽하게 정복했습니다! 🖼️⭐`);
    }
  }

  prevPictureFinalQ() {
    soundManager.playClick();
    if (this.currentPictureFinalIdx > 0) {
      this.currentPictureFinalIdx--;
      const workspace = document.getElementById('level2SubWorkspace');
      if (workspace) this.renderPictureFinalConsonant(workspace);
    }
  }

  /* --------------------------------------------------------------------------
     5. 1~100 수세기 보드 (순수 발음/문자 제시 - 숫자 괄호 제거)
     -------------------------------------------------------------------------- */
  getSinoKoreanNumber(n) {
    const units = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
    if (n === 100) return '백';
    if (n < 10) return units[n];
    const tenDigit = Math.floor(n / 10);
    const oneDigit = n % 10;
    let result = (tenDigit === 1 ? '' : units[tenDigit]) + '십';
    if (oneDigit > 0) result += units[oneDigit];
    return result;
  }

  getNativeKoreanNumber(n) {
    const ones = ['', '하나', '둘', '셋', '넷', '다섯', '여섯', '일곱', '여덟', '아홉'];
    const tens = ['', '열', '스물', '서른', '마흔', '쉰', '예순', '일흔', '여든', '아흔'];
    if (n === 100) return '백';
    if (n < 10) return ones[n];
    const tenDigit = Math.floor(n / 10);
    const oneDigit = n % 10;
    return tens[tenDigit] + (oneDigit > 0 ? ' ' + ones[oneDigit] : '');
  }

  renderCount100(workspace) {
    let levelTitle = "";
    let promptText = "";
    let promptAudioText = "";

    if (this.count100Level === 1) {
      levelTitle = "1단계: 1부터 100까지 차례대로 세기";
      promptText = "1부터 100까지 숫자를 차례대로 터치하며 수를 세어보세요!";
      promptAudioText = "1부터 100까지 숫자를 차례대로 터치하세요!";
    } else if (this.count100Level === 2) {
      const sinoStr = this.getSinoKoreanNumber(this.quizTarget100);
      levelTitle = `2단계 한자어 수세기: '${sinoStr}' 퀴즈`;
      promptText = `다음 100 보드에서 한자어 수 <span style="color:#d69e2e; font-size:1.5rem; font-weight:800;">'${sinoStr}'</span>을 찾아 터치하세요!`;
      promptAudioText = `다음 중 '${sinoStr}'을 찾아 터치하세요!`;
    } else if (this.count100Level === 3) {
      const nativeStr = this.getNativeKoreanNumber(this.quizTarget100);
      levelTitle = `3단계 우리말 수세기: '${nativeStr}' 퀴즈`;
      promptText = `다음 100 보드에서 순우리말 수 <span style="color:#e53e3e; font-size:1.5rem; font-weight:800;">'${nativeStr}'</span>을 찾아 터치하세요!`;
      promptAudioText = `다음 중 '${nativeStr}'을 찾아 터치하세요!`;
    }

    workspace.innerHTML = `
      <div class="activity-header">
        <div class="activity-header-text">
          <h2>🔢 1~100 수세기 (3단계 레벨)</h2>
          <p>${levelTitle}</p>
        </div>
        <button class="speak-btn" onclick="ttsManager.speak('${promptAudioText}')"><i class="fa-solid fa-volume-high"></i></button>
      </div>

      <!-- Level Filter Tabs -->
      <div style="display:flex; gap:0.5rem; justify-content:center; flex-wrap:wrap; margin-bottom:1.25rem;">
        <button class="primary-btn ${this.count100Level===1?'pulse':''}" style="padding:0.6rem 1.1rem; font-size:0.95rem; background:${this.count100Level===1?'#38a169':'#64748b'};" onclick="level2Manager.switchCount100Level(1)">1단계: 1~100 차례대로 세기</button>
        <button class="primary-btn ${this.count100Level===2?'pulse':''}" style="padding:0.6rem 1.1rem; font-size:0.95rem; background:${this.count100Level===2?'#d69e2e':'#64748b'};" onclick="level2Manager.switchCount100Level(2)">2단계: '오' 한자어 맞추기</button>
        <button class="primary-btn ${this.count100Level===3?'pulse':''}" style="padding:0.6rem 1.1rem; font-size:0.95rem; background:${this.count100Level===3?'#e53e3e':'#64748b'};" onclick="level2Manager.switchCount100Level(3)">3단계: '다섯' 우리말 맞추기</button>
      </div>

      <div style="max-width:800px; margin: 0 auto;">
        <!-- Status Bar -->
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.05); padding:0.75rem 1.25rem; border-radius:14px; margin-bottom:1rem; font-weight:700;">
          ${this.count100Level === 1 ? `
            <div>📌 현재 카운트: <span id="countVal">${this.currentCount100}</span> / 100</div>
          ` : `
            <div>📌 퀴즈 수사 듣기 & 읽기 | ⭐ 점수: ${this.count100Score}점</div>
            <button class="primary-btn" style="padding:0.4rem 0.8rem; font-size:0.85rem;" onclick="level2Manager.nextCount100Quiz()">다음 퀴즈 <i class="fa-solid fa-rotate"></i></button>
          `}
        </div>

        <!-- Prompt Card for Level 2 & 3 -->
        ${this.count100Level > 1 ? `
          <div class="clip-theme-card" style="padding:1.25rem; background:#fffbe6; border:3px solid ${this.count100Level===2?'#d69e2e':'#e53e3e'}; margin-bottom:1.25rem; text-align:center;">
            <p style="font-size:1.3rem; line-height:1.6; margin:0;">${promptText}</p>
          </div>
        ` : ''}

        <!-- 100 Grid Board -->
        <div class="number-grid-100" id="numGrid100">
          ${Array.from({length: 100}, (_, i) => i + 1).map(n => `
            <button class="num-cell ${this.count100Level===1 && n<=this.currentCount100?'active-counted':''}" id="numCell_${n}" onclick="level2Manager.touchNumber100(${n})">${n}</button>
          `).join('')}
        </div>
      </div>
    `;

    ttsManager.speak(promptAudioText);
  }

  switchCount100Level(lvl) {
    soundManager.playClick();
    this.count100Level = lvl;
    this.currentCount100 = 0;
    this.count100Answered = false;

    if (lvl === 2 || lvl === 3) {
      this.quizTarget100 = Math.floor(Math.random() * 99) + 1;
    }

    const workspace = document.getElementById('level2SubWorkspace');
    if (workspace) this.renderCount100(workspace);
  }

  touchNumber100(num) {
    if (this.count100Level === 1) {
      if (num === this.currentCount100 + 1) {
        soundManager.playClick();
        this.currentCount100 = num;
        const cell = document.getElementById(`numCell_${num}`);
        if (cell) cell.classList.add('active-counted');

        const countVal = document.getElementById('countVal');
        if (countVal) countVal.innerText = this.currentCount100;

        if (num % 10 === 0) {
          soundManager.playCorrect();
          ttsManager.speak(`${num}! 참 잘하고 있어요!`);
          appState.addStar(1);
        } else {
          ttsManager.speak(`${num}`);
        }
      }
    } else {
      if (this.count100Answered) return;

      const cell = document.getElementById(`numCell_${num}`);

      if (num === this.quizTarget100) {
        soundManager.playCorrect();
        this.count100Answered = true;
        this.count100Score += 10;
        appState.addStar(1);
        if (cell) {
          cell.style.background = "#22c55e";
          cell.style.color = "#fff";
        }

        const nameStr = (this.count100Level === 2) 
          ? `'${this.getSinoKoreanNumber(num)}'` 
          : `'${this.getNativeKoreanNumber(num)}'`;

        ttsManager.speak(`정답입니다! ${nameStr}을 정확히 찾았어요! 별 1개를 획득했습니다!`);

        setTimeout(() => {
          this.nextCount100Quiz();
        }, 1500);
      } else {
        soundManager.playWrong();
        if (cell) {
          cell.style.background = "#ef4444";
          cell.style.color = "#fff";
          setTimeout(() => {
            cell.style.background = "";
            cell.style.color = "";
          }, 800);
        }
        const targetStr = (this.count100Level === 2)
          ? `'${this.getSinoKoreanNumber(this.quizTarget100)}'`
          : `'${this.getNativeKoreanNumber(this.quizTarget100)}'`;
        ttsManager.speak(`아쉬워요! ${targetStr}을 다시 찾아보세요!`);
      }
    }
  }

  nextCount100Quiz() {
    soundManager.playClick();
    this.quizTarget100 = Math.floor(Math.random() * 99) + 1;
    this.count100Answered = false;
    const workspace = document.getElementById('level2SubWorkspace');
    if (workspace) this.renderCount100(workspace);
  }

  /* --------------------------------------------------------------------------
     6. 사물 갯수 맞추기 50문제
     -------------------------------------------------------------------------- */
  renderObjectCountQuiz(workspace) {
    const currentList = this.objectCount50Data[`level${this.selectedObjectLevel}`];
    if (this.currentObjectQIdx >= currentList.length) this.currentObjectQIdx = 0;

    const currentItem = currentList[this.currentObjectQIdx];
    const totalCount = currentList.length;
    const itemKey = `lvl${this.selectedObjectLevel}_q${this.currentObjectQIdx}`;
    const hasAnswered = this.selectedObjectAnswers[itemKey] !== undefined;
    const chosenIdx = this.selectedObjectAnswers[itemKey];

    const levelDescs = {
      1: "1단계 (1~5개 쉬운 갯수 세기)",
      2: "2단계 (6~10개 한자리 갯수 세기)",
      3: "3단계 (11~15개 십단위 사물 갯수)",
      4: "4단계 (16~20개 많은 사물 갯수)",
      5: "5단계 (20~30개 묶음 사물 갯수)"
    };

    const promptText = `상자 안에 ${currentItem.name} ${currentItem.emoji} 가 몇 개 들어있는지 세어보고 올바른 숫자를 클릭하세요!`;

    const emojisHtml = Array.from({length: currentItem.count}).map(() => `
      <span style="font-size:3rem; display:inline-block; transition:transform 0.2s;" class="hover-bounce">${currentItem.emoji}</span>
    `).join(' ');

    workspace.innerHTML = `
      <div class="activity-header">
        <div class="activity-header-text">
          <h2>🍎 사물 갯수 맞추기 (50문제 마스터)</h2>
          <p>${levelDescs[this.selectedObjectLevel]}</p>
        </div>
        <button class="speak-btn" onclick="ttsManager.speak('${currentItem.name}가 몇 개 있는지 세어보세요!')"><i class="fa-solid fa-volume-high"></i></button>
      </div>

      <!-- Level Filter Tabs -->
      <div style="display:flex; gap:0.5rem; justify-content:center; flex-wrap:wrap; margin-bottom:1.25rem;">
        <button class="primary-btn ${this.selectedObjectLevel===1?'pulse':''}" style="padding:0.55rem 1rem; font-size:0.9rem; background:${this.selectedObjectLevel===1?'#38a169':'#64748b'};" onclick="level2Manager.switchObjectLevel(1)">1단계 (1~5개)</button>
        <button class="primary-btn ${this.selectedObjectLevel===2?'pulse':''}" style="padding:0.55rem 1rem; font-size:0.9rem; background:${this.selectedObjectLevel===2?'#3182ce':'#64748b'};" onclick="level2Manager.switchObjectLevel(2)">2단계 (6~10개)</button>
        <button class="primary-btn ${this.selectedObjectLevel===3?'pulse':''}" style="padding:0.55rem 1rem; font-size:0.9rem; background:${this.selectedObjectLevel===3?'#d69e2e':'#64748b'};" onclick="level2Manager.switchObjectLevel(3)">3단계 (11~15개)</button>
        <button class="primary-btn ${this.selectedObjectLevel===4?'pulse':''}" style="padding:0.55rem 1rem; font-size:0.9rem; background:${this.selectedObjectLevel===4?'#8b5cf6':'#64748b'};" onclick="level2Manager.switchObjectLevel(4)">4단계 (16~20개)</button>
        <button class="primary-btn ${this.selectedObjectLevel===5?'pulse':''}" style="padding:0.55rem 1rem; font-size:0.9rem; background:${this.selectedObjectLevel===5?'#e53e3e':'#64748b'};" onclick="level2Manager.switchObjectLevel(5)">5단계 (20~30개)</button>
      </div>

      <div style="max-width:700px; margin: 0 auto; text-align:center;">
        <!-- Status Bar -->
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.05); padding:0.75rem 1.25rem; border-radius:14px; margin-bottom:1rem; font-weight:700;">
          <div>📌 갯수 문제 ${this.currentObjectQIdx + 1} / ${totalCount}</div>
          <div>⭐ 총 점수: ${this.objectQuizScore}점</div>
        </div>

        <!-- Object Box Card -->
        <div class="clip-theme-card" style="padding:1.75rem; background:#fff5f5; border:4px dashed #feb2b2; margin-bottom:1.5rem; border-radius:20px;">
          <h3 style="margin-bottom:1rem; color:#c53030; font-size:1.4rem;">${currentItem.name} ${currentItem.emoji} 를 세어보세요!</h3>
          <div style="display:flex; flex-wrap:wrap; gap:0.75rem; justify-content:center; align-items:center; min-height:100px;">
            ${emojisHtml}
          </div>
        </div>

        <!-- Choices Grid -->
        <h4 style="margin-bottom:0.75rem; color:#4a5568; font-weight:800;">올바른 갯수의 숫자 버튼을 고르세요:</h4>
        <div style="display:flex; gap:1rem; justify-content:center; margin-bottom:1.5rem;">
          ${currentItem.choices.map((cVal, idx) => {
            let extraClass = "";
            if (hasAnswered) {
              if (idx === currentItem.answer) extraClass = "correct";
              else if (idx === chosenIdx) extraClass = "wrong";
            }
            return `
              <button class="btn-choice ${extraClass}" style="font-size:2rem; flex:1; padding:1.2rem; border-radius:18px; font-weight:800;" ${hasAnswered ? 'disabled' : ''} onclick="level2Manager.checkObjectCount(${idx})">
                ${cVal} 개
              </button>
            `;
          }).join('')}
        </div>

        <!-- Navigation Buttons -->
        <div style="display:flex; justify-content:space-between;">
          <button class="primary-btn" ${this.currentObjectQIdx === 0 ? 'disabled' : ''} onclick="level2Manager.prevObjectQ()"><i class="fa-solid fa-arrow-left"></i> 이전 문제</button>
          <button class="primary-btn" ${!hasAnswered ? 'disabled' : ''} onclick="level2Manager.nextObjectQ()">다음 문제 <i class="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>
    `;

    ttsManager.speak(`${currentItem.name}가 몇 개 있는지 세어보세요!`);
  }

  switchObjectLevel(lvl) {
    soundManager.playClick();
    this.selectedObjectLevel = lvl;
    this.currentObjectQIdx = 0;
    const workspace = document.getElementById('level2SubWorkspace');
    if (workspace) this.renderObjectCountQuiz(workspace);
  }

  checkObjectCount(chosenIdx) {
    const itemKey = `lvl${this.selectedObjectLevel}_q${this.currentObjectQIdx}`;
    if (this.selectedObjectAnswers[itemKey] !== undefined) return;

    this.selectedObjectAnswers[itemKey] = chosenIdx;
    const currentList = this.objectCount50Data[`level${this.selectedObjectLevel}`];
    const currentItem = currentList[this.currentObjectQIdx];
    const isCorrect = (chosenIdx === currentItem.answer);

    if (isCorrect) {
      soundManager.playCorrect();
      this.objectQuizScore += 10;
      appState.addStar(1);
      ttsManager.speak(`정답이에요! ${currentItem.name}가 모두 ${currentItem.count}개 있어요!`);
    } else {
      soundManager.playWrong();
      ttsManager.speak(`아쉬워요! ${currentItem.name}를 하나씩 천천히 다시 세어볼까요?`);
    }

    const workspace = document.getElementById('level2SubWorkspace');
    if (workspace) this.renderObjectCountQuiz(workspace);
  }

  nextObjectQ() {
    soundManager.playClick();
    const currentList = this.objectCount50Data[`level${this.selectedObjectLevel}`];
    if (this.currentObjectQIdx < currentList.length - 1) {
      this.currentObjectQIdx++;
      const workspace = document.getElementById('level2SubWorkspace');
      if (workspace) this.renderObjectCountQuiz(workspace);
    } else {
      appState.showCelebrationModal(`${this.selectedObjectLevel}단계 갯수 맞추기 정복! 🎉`, `총 ${this.objectQuizScore}점을 획득하며 멋지게 해결했습니다! 🍎⭐`);
    }
  }

  prevObjectQ() {
    soundManager.playClick();
    if (this.currentObjectQIdx > 0) {
      this.currentObjectQIdx--;
      const workspace = document.getElementById('level2SubWorkspace');
      if (workspace) this.renderObjectCountQuiz(workspace);
    }
  }

  /* --------------------------------------------------------------------------
     7. 십 단위 묶음수 (탐색판 / 30문제 묶음 퀴즈 / 묶음 상자 채우기 3모드)
     -------------------------------------------------------------------------- */
  renderTensGroup(workspace) {
    let modeTitle = "";
    if (this.tensMode === 1) modeTitle = "1모드: 10~100 십 단위 묶음수 탐색판";
    else if (this.tensMode === 2) modeTitle = "2모드: 다양한 사물 십 단위 묶음 퀴즈 (30문제)";
    else if (this.tensMode === 3) modeTitle = "3모드: 10개입 상자 채우기 게임";

    workspace.innerHTML = `
      <div class="activity-header">
        <div class="activity-header-text">
          <h2>📦 십 단위 묶음수 (10, 20, 30... 100)</h2>
          <p>${modeTitle}</p>
        </div>
        <button class="speak-btn" onclick="level2Manager.speakTensModeInfo()"><i class="fa-solid fa-volume-high"></i></button>
      </div>

      <!-- Mode Selector Tabs -->
      <div style="display:flex; gap:0.5rem; justify-content:center; flex-wrap:wrap; margin-bottom:1.25rem;">
        <button class="primary-btn ${this.tensMode===1?'pulse':''}" style="padding:0.6rem 1.1rem; font-size:0.95rem; background:${this.tensMode===1?'#38a169':'#64748b'};" onclick="level2Manager.switchTensMode(1)">1모드: 10~100 묶음 탐색</button>
        <button class="primary-btn ${this.tensMode===2?'pulse':''}" style="padding:0.6rem 1.1rem; font-size:0.95rem; background:${this.tensMode===2?'#3182ce':'#64748b'};" onclick="level2Manager.switchTensMode(2)">2모드: 묶음 퀴즈 (30문제)</button>
        <button class="primary-btn ${this.tensMode===3?'pulse':''}" style="padding:0.6rem 1.1rem; font-size:0.95rem; background:${this.tensMode===3?'#8b5cf6':'#64748b'};" onclick="level2Manager.switchTensMode(3)">3모드: 상자 채우기 게임</button>
      </div>

      <div id="tensModeWorkspace" style="max-width:800px; margin: 0 auto;"></div>
    `;

    const subWorkspace = document.getElementById('tensModeWorkspace');
    if (this.tensMode === 1) this.renderTensExplorer(subWorkspace);
    else if (this.tensMode === 2) this.renderTensQuiz30(subWorkspace);
    else if (this.tensMode === 3) this.renderTensBuildGame(subWorkspace);
  }

  switchTensMode(m) {
    soundManager.playClick();
    this.tensMode = m;
    const workspace = document.getElementById('level2SubWorkspace');
    if (workspace) this.renderTensGroup(workspace);
  }

  speakTensModeInfo() {
    if (this.tensMode === 1) ttsManager.speak("묶음 버튼을 눌러 10개씩 늘어나는 모습을 탐색해보세요!");
    else if (this.tensMode === 2) ttsManager.speak("10개씩 묶인 다양한 사물을 보고 모두 몇 개인지 맞춰보세요!");
    else if (this.tensMode === 3) ttsManager.speak("목표 수에 맞게 10개입 상자를 클릭해서 채워보세요!");
  }

  /* Mode 1: Interactive Tens Explorer */
  renderTensExplorer(workspace) {
    const bundleCount = this.selectedTensCount;
    const totalNum = bundleCount * 10;
    const sinoStr = this.getSinoKoreanNumber(totalNum);
    const nativeStr = this.getNativeKoreanNumber(totalNum);

    const boxesHtml = Array.from({length: bundleCount}).map((_, i) => `
      <div style="background:#fffbe6; border:3px solid #f6ad55; border-radius:14px; padding:0.75rem 1rem; text-align:center; box-shadow:var(--shadow-sm);">
        <div style="font-size:1.8rem; margin-bottom:0.2rem;">📦</div>
        <div style="font-weight:800; color:#c05621; font-size:0.95rem;">10개입</div>
        <div style="font-size:0.8rem; color:#718096; margin-top:0.25rem;">(${i*10+1}~${(i+1)*10})</div>
      </div>
    `).join('');

    workspace.innerHTML = `
      <div class="clip-theme-card" style="padding:1.5rem; text-align:center; background:#f7fafc; margin-bottom:1.25rem;">
        <h3 style="font-size:1.3rem; margin-bottom:1rem; color:#2b6cb0;">아래 묶음 수를 선택하여 10개씩 늘어나는 양을 확인하세요:</h3>
        <div style="display:flex; gap:0.5rem; justify-content:center; flex-wrap:wrap; margin-bottom:1.5rem;">
          ${Array.from({length: 10}, (_, i) => i + 1).map(n => `
            <button class="primary-btn ${n===bundleCount?'pulse':''}" style="font-size:1rem; padding:0.5rem 0.9rem; background:${n===bundleCount?'#3182ce':'#cbd5e1'};" onclick="level2Manager.selectTensExplorerCount(${n})">
              ${n}묶음 (${n*10})
            </button>
          `).join('')}
        </div>

        <div style="background:#fff; border:3px solid #cbd5e1; border-radius:20px; padding:1.5rem; margin-bottom:1.25rem;">
          <h2 style="font-size:2.4rem; color:#2b6cb0; font-family:var(--font-family-friendly); margin-bottom:0.75rem;">
            10개입 상자 ${bundleCount}묶음 = <span style="color:#e53e3e;">${totalNum}</span> 개
          </h2>
          <div style="font-size:1.3rem; font-weight:800; color:#4a5568; margin-bottom:1.25rem;">
            📌 한자어: <span style="color:#d69e2e;">${sinoStr}</span> | 📌 우리말: <span style="color:#e53e3e;">${nativeStr}</span>
          </div>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap:0.75rem; justify-content:center;">
            ${boxesHtml}
          </div>
        </div>

        <button class="primary-btn" style="font-size:1.1rem; padding:0.8rem 1.5rem;" onclick="ttsManager.speak('${bundleCount}묶음은 ${totalNum}! 한자어로 ${sinoStr}, 우리말로 ${nativeStr} 입니다!')">
          🔊 묶음 소리 듣기
        </button>
      </div>
    `;

    ttsManager.speak(`${bundleCount}묶음은 ${totalNum}!`);
  }

  selectTensExplorerCount(n) {
    soundManager.playClick();
    this.selectedTensCount = n;
    const workspace = document.getElementById('tensModeWorkspace');
    if (workspace) this.renderTensExplorer(workspace);
  }

  /* Mode 2: Tens Bundle Quiz 30 Questions */
  renderTensQuiz30(workspace) {
    const currentList = this.tensQuiz30Data[`level${this.selectedTensQuizLevel}`];
    if (this.currentTensQIdx >= currentList.length) this.currentTensQIdx = 0;

    const currentItem = currentList[this.currentTensQIdx];
    const totalCount = currentList.length;
    const itemKey = `tens_lvl${this.selectedTensQuizLevel}_q${this.currentTensQIdx}`;
    const hasChosen = this.selectedTensAnswers[itemKey] !== undefined;
    const chosenIdx = this.selectedTensAnswers[itemKey];

    const levelDescs = {
      1: "1단계 (10~40 묶음수 10문제)",
      2: "2단계 (50~70 묶음수 10문제)",
      3: "3단계 (80~100 묶음수 10문제)"
    };

    const boxesHtml = Array.from({length: currentItem.bundles}).map(() => `
      <div style="background:#fffbe6; border:3px solid #f6ad55; border-radius:14px; padding:0.6rem 0.8rem; text-align:center;">
        <div style="font-size:2rem; margin-bottom:0.1rem;">${currentItem.emoji}</div>
        <div style="font-weight:800; color:#c05621; font-size:0.85rem;">10개입</div>
      </div>
    `).join('');

    workspace.innerHTML = `
      <div style="display:flex; gap:0.5rem; justify-content:center; flex-wrap:wrap; margin-bottom:1.25rem;">
        <button class="primary-btn ${this.selectedTensQuizLevel===1?'pulse':''}" style="padding:0.55rem 1rem; font-size:0.9rem; background:${this.selectedTensQuizLevel===1?'#38a169':'#64748b'};" onclick="level2Manager.switchTensQuizLevel(1)">1단계 (10~40)</button>
        <button class="primary-btn ${this.selectedTensQuizLevel===2?'pulse':''}" style="padding:0.55rem 1rem; font-size:0.9rem; background:${this.selectedTensQuizLevel===2?'#3182ce':'#64748b'};" onclick="level2Manager.switchTensQuizLevel(2)">2단계 (50~70)</button>
        <button class="primary-btn ${this.selectedTensQuizLevel===3?'pulse':''}" style="padding:0.55rem 1rem; font-size:0.9rem; background:${this.selectedTensQuizLevel===3?'#e53e3e':'#64748b'};" onclick="level2Manager.switchTensQuizLevel(3)">3단계 (80~100)</button>
      </div>

      <div style="text-align:center;">
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.05); padding:0.75rem 1.25rem; border-radius:14px; margin-bottom:1rem; font-weight:700;">
          <div>📌 묶음 퀴즈 문제 ${this.currentTensQIdx + 1} / ${totalCount} (${levelDescs[this.selectedTensQuizLevel]})</div>
          <div>⭐ 총 점수: ${this.tensQuizScore}점</div>
        </div>

        <div class="clip-theme-card" style="padding:1.5rem; background:#fffbe6; border:4px solid #3182ce; margin-bottom:1.5rem; border-radius:20px;">
          <h3 style="font-size:1.35rem; color:#2b6cb0; margin-bottom:1rem;">10개씩 묶인 ${currentItem.name} ${currentItem.emoji} 이(가) <span style="color:#e53e3e; font-weight:800;">${currentItem.bundles}묶음</span> 있어요. 모두 몇 개일까요?</h3>
          
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(90px, 1fr)); gap:0.6rem; justify-content:center; max-width:650px; margin: 0 auto;">
            ${boxesHtml}
          </div>
        </div>

        <h4 style="margin-bottom:0.75rem; color:#4a5568; font-weight:800;">올바른 묶음의 수사 버튼을 고르세요:</h4>
        <div style="display:flex; gap:1rem; justify-content:center; margin-bottom:1.5rem;">
          ${currentItem.choices.map((cText, idx) => {
            let extraClass = "";
            if (hasChosen) {
              if (idx === currentItem.answer) extraClass = "correct";
              else if (idx === chosenIdx) extraClass = "wrong";
            }
            return `
              <button class="btn-choice ${extraClass}" style="font-size:1.25rem; flex:1; padding:1.1rem; border-radius:18px; font-weight:800;" ${hasChosen ? 'disabled' : ''} onclick="level2Manager.checkTensQuiz30(${idx})">
                ${cText}
              </button>
            `;
          }).join('')}
        </div>

        <div style="display:flex; justify-content:space-between;">
          <button class="primary-btn" ${this.currentTensQIdx === 0 ? 'disabled' : ''} onclick="level2Manager.prevTensQ30()"><i class="fa-solid fa-arrow-left"></i> 이전 문제</button>
          <button class="primary-btn" ${!hasChosen ? 'disabled' : ''} onclick="level2Manager.nextTensQ30()">다음 문제 <i class="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>
    `;

    ttsManager.speak(`10개씩 묶인 ${currentItem.name}가 ${currentItem.bundles}묶음 있어요. 모두 몇 개일까요?`);
  }

  switchTensQuizLevel(lvl) {
    soundManager.playClick();
    this.selectedTensQuizLevel = lvl;
    this.currentTensQIdx = 0;
    const workspace = document.getElementById('tensModeWorkspace');
    if (workspace) this.renderTensQuiz30(workspace);
  }

  checkTensQuiz30(chosenIdx) {
    const itemKey = `tens_lvl${this.selectedTensQuizLevel}_q${this.currentTensQIdx}`;
    if (this.selectedTensAnswers[itemKey] !== undefined) return;

    this.selectedTensAnswers[itemKey] = chosenIdx;
    const currentList = this.tensQuiz30Data[`level${this.selectedTensQuizLevel}`];
    const currentItem = currentList[this.currentTensQIdx];
    const isCorrect = (chosenIdx === currentItem.answer);

    if (isCorrect) {
      soundManager.playCorrect();
      this.tensQuizScore += 10;
      appState.addStar(1);
      ttsManager.speak(`정답입니다! ${currentItem.name} ${currentItem.bundles}묶음은 모두 ${currentItem.num}개, 한자어로 ${currentItem.sino}, 우리말로 ${currentItem.native}입니다!`);
    } else {
      soundManager.playWrong();
      ttsManager.speak(`아쉬워요! ${currentItem.name}를 10개씩 다시 세어볼까요?`);
    }

    const workspace = document.getElementById('tensModeWorkspace');
    if (workspace) this.renderTensQuiz30(workspace);
  }

  nextTensQ30() {
    soundManager.playClick();
    const currentList = this.tensQuiz30Data[`level${this.selectedTensQuizLevel}`];
    if (this.currentTensQIdx < currentList.length - 1) {
      this.currentTensQIdx++;
      const workspace = document.getElementById('tensModeWorkspace');
      if (workspace) this.renderTensQuiz30(workspace);
    } else {
      appState.showCelebrationModal(`${this.selectedTensQuizLevel}단계 십 단위 묶음수 퀴즈 완파! 🎉`, `총 ${this.tensQuizScore}점을 획득하며 다양한 사물 묶음 개념을 완벽히 정복했습니다! 📦⭐`);
    }
  }

  prevTensQ30() {
    soundManager.playClick();
    if (this.currentTensQIdx > 0) {
      this.currentTensQIdx--;
      const workspace = document.getElementById('tensModeWorkspace');
      if (workspace) this.renderTensQuiz30(workspace);
    }
  }

  /* Mode 3: Build Bundles Game */
  renderTensBuildGame(workspace) {
    const targetNum = this.gameTargetBundles * 10;
    const sinoStr = this.getSinoKoreanNumber(targetNum);
    const nativeStr = this.getNativeKoreanNumber(targetNum);

    const userNum = this.gameUserBundles * 10;
    const isSuccess = (this.gameUserBundles === this.gameTargetBundles);

    const boxesHtml = Array.from({length: this.gameUserBundles}).map(() => `
      <div style="background:#fffbe6; border:3px solid #f6ad55; border-radius:14px; padding:0.75rem 1rem; text-align:center; animation:popIn 0.3s ease;">
        <div style="font-size:2rem; margin-bottom:0.2rem;">📦</div>
        <div style="font-weight:800; color:#c05621; font-size:0.9rem;">10개입</div>
      </div>
    `).join('');

    workspace.innerHTML = `
      <div style="text-align:center;">
        <div class="clip-theme-card" style="padding:1.75rem; background:#fffbe6; border:4px solid #8b5cf6; margin-bottom:1.5rem; border-radius:20px;">
          <h3 style="font-size:1.5rem; color:#6b21a8; margin-bottom:0.5rem;">
            🎯 목표: <span style="font-size:2.2rem; font-weight:800; color:#e53e3e;">${targetNum}</span> 개 (${sinoStr} / ${nativeStr}) 만들기!
          </h3>
          <p style="color:#4a5568; margin:0;">아래 10개입 상자 📦 추가 버튼을 눌러 목표 수와 같아지도록 채워보세요!</p>
        </div>

        <div style="background:#fff; border:3px solid #cbd5e1; border-radius:20px; padding:1.5rem; margin-bottom:1.5rem;">
          <h3 style="font-size:2rem; color:#2b6cb0; margin-bottom:1rem;">
            현재 상자: <span style="color:#3182ce; font-weight:800;">${this.gameUserBundles}묶음</span> (${userNum}개)
          </h3>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(90px, 1fr)); gap:0.75rem; justify-content:center; min-height:100px; margin-bottom:1.5rem;">
            ${boxesHtml.length > 0 ? boxesHtml : '<div style="color:#a0aec0; grid-column:1/-1; padding:2rem;">[ 10개입 상자를 추가하세요 ]</div>'}
          </div>

          <div style="display:flex; gap:1rem; justify-content:center;">
            <button class="primary-btn" style="font-size:1.2rem; padding:0.8rem 1.5rem; background:#38a169;" ${isSuccess?'disabled':''} onclick="level2Manager.addGameBundle()">
              <i class="fa-solid fa-plus"></i> 10개입 상자 📦 추가 (+10)
            </button>
            <button class="primary-btn" style="font-size:1.2rem; padding:0.8rem 1.5rem; background:#e2e8f0; color:#475569;" onclick="level2Manager.resetGameBundle()">
              <i class="fa-solid fa-rotate-left"></i> 처음부터
            </button>
          </div>
        </div>

        ${isSuccess ? `
          <div class="clip-theme-card" style="padding:1.5rem; background:#f0fdf4; border:3px solid #22c55e; margin-bottom:1.5rem;">
            <h2 style="color:#15803d; margin-bottom:0.5rem;">🎉 축하합니다! 목표 ${targetNum}개 달성! ⭐</h2>
            <button class="primary-btn" style="font-size:1.1rem; padding:0.75rem 1.5rem; background:#8b5cf6;" onclick="level2Manager.nextBuildGameTarget()">
              다음 목표 도전! <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        ` : ''}
      </div>
    `;
  }

  addGameBundle() {
    soundManager.playClick();
    if (this.gameUserBundles < 10) {
      this.gameUserBundles++;
      const userNum = this.gameUserBundles * 10;
      const targetNum = this.gameTargetBundles * 10;

      if (this.gameUserBundles === this.gameTargetBundles) {
        soundManager.playCorrect();
        appState.addStar(1);
        ttsManager.speak(`축하합니다! 상자 ${this.gameUserBundles}묶음으로 ${targetNum}개를 딱 맞췄어요!`);
      } else if (this.gameUserBundles > this.gameTargetBundles) {
        soundManager.playWrong();
        ttsManager.speak(`목표 수 ${targetNum}개보다 많아졌어요! 처음부터 버튼을 눌러보세요.`);
      } else {
        ttsManager.speak(`${userNum}개!`);
      }

      const workspace = document.getElementById('tensModeWorkspace');
      if (workspace) this.renderTensBuildGame(workspace);
    }
  }

  resetGameBundle() {
    soundManager.playClick();
    this.gameUserBundles = 0;
    const workspace = document.getElementById('tensModeWorkspace');
    if (workspace) this.renderTensBuildGame(workspace);
  }

  nextBuildGameTarget() {
    soundManager.playClick();
    let nextB = Math.floor(Math.random() * 9) + 1;
    if (nextB === this.gameTargetBundles) nextB = (nextB % 9) + 1;
    this.gameTargetBundles = nextB;
    this.gameUserBundles = 0;

    const workspace = document.getElementById('tensModeWorkspace');
    if (workspace) this.renderTensBuildGame(workspace);
  }

  /* --------------------------------------------------------------------------
     8. 더해서 10 만들기 (10의 보수 3모드 / 30문제 확장) [REBUILT]
     -------------------------------------------------------------------------- */
  renderMakeTenComplement(workspace) {
    let modeTitle = "";
    if (this.makeTenMode === 1) modeTitle = "1모드: 10의 보수 쌍 (1+9 ~ 9+1) 탐색판";
    else if (this.makeTenMode === 2) modeTitle = "2모드: 10의 보수 빈칸 채우기 퀴즈 (15문제)";
    else if (this.makeTenMode === 3) modeTitle = "3모드: 10의 보수 짝 맞추기 카드 게임 (15문제)";

    workspace.innerHTML = `
      <div class="activity-header">
        <div class="activity-header-text">
          <h2>🧩 더해서 10 만들기 (10의 보수 마스터)</h2>
          <p>${modeTitle}</p>
        </div>
        <button class="speak-btn" onclick="level2Manager.speakMakeTenInfo()"><i class="fa-solid fa-volume-high"></i></button>
      </div>

      <!-- Mode Selector Tabs -->
      <div style="display:flex; gap:0.5rem; justify-content:center; flex-wrap:wrap; margin-bottom:1.25rem;">
        <button class="primary-btn ${this.makeTenMode===1?'pulse':''}" style="padding:0.6rem 1.1rem; font-size:0.95rem; background:${this.makeTenMode===1?'#38a169':'#64748b'};" onclick="level2Manager.switchMakeTenMode(1)">1모드: 10의 보수 탐색</button>
        <button class="primary-btn ${this.makeTenMode===2?'pulse':''}" style="padding:0.6rem 1.1rem; font-size:0.95rem; background:${this.makeTenMode===2?'#3182ce':'#64748b'};" onclick="level2Manager.switchMakeTenMode(2)">2모드: 빈칸 퀴즈 (15문제)</button>
        <button class="primary-btn ${this.makeTenMode===3?'pulse':''}" style="padding:0.6rem 1.1rem; font-size:0.95rem; background:${this.makeTenMode===3?'#8b5cf6':'#64748b'};" onclick="level2Manager.switchMakeTenMode(3)">3모드: 짝 맞추기 (15문제)</button>
      </div>

      <div id="makeTenModeWorkspace" style="max-width:800px; margin: 0 auto;"></div>
    `;

    const subWorkspace = document.getElementById('makeTenModeWorkspace');
    if (this.makeTenMode === 1) this.renderMakeTenExplorer(subWorkspace);
    else if (this.makeTenMode === 2) this.renderMakeTenQuiz(subWorkspace);
    else if (this.makeTenMode === 3) this.renderMakeTenGame(subWorkspace);
  }

  switchMakeTenMode(m) {
    soundManager.playClick();
    this.makeTenMode = m;
    const workspace = document.getElementById('level2SubWorkspace');
    if (workspace) this.renderMakeTenComplement(workspace);
  }

  speakMakeTenInfo() {
    if (this.makeTenMode === 1) ttsManager.speak("더해서 10이 되는 보수 짝궁 수들을 탐색해보세요!");
    else if (this.makeTenMode === 2) ttsManager.speak("빈칸 ⭐에 들어갈 알맞은 10의 보수 숫자를 맞춰보세요!");
    else if (this.makeTenMode === 3) ttsManager.speak("주어진 숫자와 합쳐서 10이 되는 짝궁 숫자를 고르세요!");
  }

  /* Mode 1: Make 10 Complement Explorer */
  renderMakeTenExplorer(workspace) {
    const p1 = this.selectedTenExplorerPair;
    const p2 = 10 - p1;

    const redDots = Array.from({length: p1}).map(() => `🔴`).join(' ');
    const blueDots = Array.from({length: p2}).map(() => `🔵`).join(' ');

    workspace.innerHTML = `
      <div class="clip-theme-card" style="padding:1.5rem; text-align:center; background:#f7fafc; margin-bottom:1.25rem;">
        <h3 style="font-size:1.3rem; margin-bottom:1rem; color:#2b6cb0;">더해서 10이 되는 짝궁 수를 선택해 보세요:</h3>
        
        <div style="display:flex; gap:0.5rem; justify-content:center; flex-wrap:wrap; margin-bottom:1.5rem;">
          ${Array.from({length: 9}, (_, i) => i + 1).map(n => `
            <button class="primary-btn ${n===p1?'pulse':''}" style="font-size:1.1rem; padding:0.5rem 1rem; background:${n===p1?'#8b5cf6':'#cbd5e1'};" onclick="level2Manager.selectMakeTenPair(${n})">
              ${n} + ${10-n} = 10
            </button>
          `).join('')}
        </div>

        <!-- Visual 10-Frame Card -->
        <div style="background:#fff; border:4px solid #f6ad55; border-radius:20px; padding:1.75rem; margin-bottom:1.25rem;">
          <h1 style="font-size:4rem; color:#2b6cb0; font-family:var(--font-family-friendly); margin-bottom:1rem;">
            <span style="color:#e53e3e;">${p1}</span> + <span style="color:#3182ce;">${p2}</span> = 10
          </h1>

          <div style="font-size:2.8rem; letter-spacing:8px; margin-bottom:1.25rem; background:#fffbe6; padding:1rem; border-radius:14px; border:2px dashed #ecc94b;">
            ${redDots} ${blueDots}
          </div>

          <p style="font-size:1.15rem; color:#4a5568; font-weight:700; margin:0;">
            💡 빨간 점 <span style="color:#e53e3e;">${p1}개</span>와 파란 점 <span style="color:#3182ce;">${p2}개</span>가 만나서 모여 10이 됩니다!
          </p>
        </div>

        <button class="primary-btn" style="font-size:1.1rem; padding:0.8rem 1.5rem; background:#3182ce;" onclick="ttsManager.speak('${p1} 더하기 ${p2}는 10! ${p1}의 짝궁은 ${p2}입니다!')">
          🔊 10의 보수 소리 듣기
        </button>
      </div>
    `;

    ttsManager.speak(`${p1} 더하기 ${p2}는 10!`);
  }

  selectMakeTenPair(n) {
    soundManager.playClick();
    this.selectedTenExplorerPair = n;
    const workspace = document.getElementById('makeTenModeWorkspace');
    if (workspace) this.renderMakeTenExplorer(workspace);
  }

  /* Mode 2: Fill-in-the-blank Quiz (15 Qs) */
  renderMakeTenQuiz(workspace) {
    const currentItem = this.makeTenQuizData[this.currentMakeTenQuizIdx];
    const totalCount = this.makeTenQuizData.length;
    const hasChosen = this.selectedMakeTenAnswers[this.currentMakeTenQuizIdx] !== undefined;
    const chosenIdx = this.selectedMakeTenAnswers[this.currentMakeTenQuizIdx];

    // Build formula text
    const str1 = currentItem.num1 !== null ? `<span style="color:#e53e3e;">${currentItem.num1}</span>` : `<span style="color:#d69e2e;">⭐</span>`;
    const str2 = currentItem.num2 !== null ? `<span style="color:#3182ce;">${currentItem.num2}</span>` : `<span style="color:#d69e2e;">⭐</span>`;

    // Calculate dot visualization
    const val1 = currentItem.num1 !== null ? currentItem.num1 : currentItem.answer;
    const val2 = currentItem.num2 !== null ? currentItem.num2 : currentItem.answer;

    const redDots = Array.from({length: val1}).map(() => `🔴`).join(' ');
    const blueDots = Array.from({length: val2}).map(() => `🔵`).join(' ');

    workspace.innerHTML = `
      <div style="text-align:center;">
        <!-- Status Bar -->
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.05); padding:0.75rem 1.25rem; border-radius:14px; margin-bottom:1rem; font-weight:700;">
          <div>📌 10 보수 빈칸 퀴즈 ${this.currentMakeTenQuizIdx + 1} / ${totalCount}</div>
          <div>⭐ 총 점수: ${this.makeTenQuizScore}점</div>
        </div>

        <!-- Formula Card -->
        <div class="clip-theme-card" style="padding:2rem; background:#fffbe6; border:4px solid #3182ce; margin-bottom:1.5rem; border-radius:20px;">
          <h1 style="font-size:4.2rem; font-family:var(--font-family-friendly); margin-bottom:1rem;">
            ${str1} + ${str2} = 10
          </h1>

          <div style="font-size:2.5rem; letter-spacing:6px; background:#fff; padding:0.8rem; border-radius:14px; border:2px dashed #cbd5e1; display:inline-block; margin-bottom:0.5rem;">
            ${redDots} ${blueDots}
          </div>
        </div>

        <!-- Choices Grid -->
        <h4 style="margin-bottom:0.75rem; color:#4a5568; font-weight:800;">⭐ 에 들어갈 알맞은 숫자를 고르세요:</h4>
        <div style="display:flex; gap:1rem; justify-content:center; margin-bottom:1.5rem;">
          ${currentItem.choices.map((val, idx) => {
            let extraClass = "";
            if (hasChosen) {
              if (val === currentItem.answer) extraClass = "correct";
              else if (idx === chosenIdx) extraClass = "wrong";
            }
            return `
              <button class="btn-choice ${extraClass}" style="font-size:2.2rem; flex:1; padding:1.2rem; border-radius:18px; font-weight:800;" ${hasChosen ? 'disabled' : ''} onclick="level2Manager.checkMakeTenQuiz(${idx}, ${val})">
                ${val}
              </button>
            `;
          }).join('')}
        </div>

        <!-- Explanation Card -->
        ${hasChosen ? `
          <div class="clip-theme-card" style="padding:1.25rem; background:#f0fdf4; border-left:5px solid #22c55e; margin-bottom:1.5rem; text-align:left;">
            <h4 style="color:#15803d; margin-bottom:0.4rem;">💡 10의 보수 해설</h4>
            <p style="font-size:1.05rem; line-height:1.6;">${currentItem.exp}</p>
          </div>
        ` : ''}

        <!-- Navigation Buttons -->
        <div style="display:flex; justify-content:space-between;">
          <button class="primary-btn" ${this.currentMakeTenQuizIdx === 0 ? 'disabled' : ''} onclick="level2Manager.prevMakeTenQ()"><i class="fa-solid fa-arrow-left"></i> 이전 문제</button>
          <button class="primary-btn" ${!hasChosen ? 'disabled' : ''} onclick="level2Manager.nextMakeTenQ()">다음 문제 <i class="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>
    `;

    ttsManager.speak("빈칸에 들어갈 10의 보수를 고르세요!");
  }

  checkMakeTenQuiz(chosenIdx, val) {
    if (this.selectedMakeTenAnswers[this.currentMakeTenQuizIdx] !== undefined) return;

    this.selectedMakeTenAnswers[this.currentMakeTenQuizIdx] = chosenIdx;
    const currentItem = this.makeTenQuizData[this.currentMakeTenQuizIdx];
    const isCorrect = (val === currentItem.answer);

    if (isCorrect) {
      soundManager.playCorrect();
      this.makeTenQuizScore += 10;
      appState.addStar(1);
      ttsManager.speak(`정답입니다! ${currentItem.exp}`);
    } else {
      soundManager.playWrong();
      ttsManager.speak("아쉬워요! 아래 해설을 확인해보세요.");
    }

    const workspace = document.getElementById('makeTenModeWorkspace');
    if (workspace) this.renderMakeTenQuiz(workspace);
  }

  nextMakeTenQ() {
    soundManager.playClick();
    if (this.currentMakeTenQuizIdx < this.makeTenQuizData.length - 1) {
      this.currentMakeTenQuizIdx++;
      const workspace = document.getElementById('makeTenModeWorkspace');
      if (workspace) this.renderMakeTenQuiz(workspace);
    } else {
      appState.showCelebrationModal("10의 보수 퀴즈 정복! 🎉", `총 ${this.makeTenQuizScore}점을 획득하며 더해서 10 만들기를 완벽하게 정복했습니다! 🧩⭐`);
    }
  }

  prevMakeTenQ() {
    soundManager.playClick();
    if (this.currentMakeTenQuizIdx > 0) {
      this.currentMakeTenQuizIdx--;
      const workspace = document.getElementById('makeTenModeWorkspace');
      if (workspace) this.renderMakeTenQuiz(workspace);
    }
  }

  /* Mode 3: Card Match Game (15 Qs) */
  renderMakeTenGame(workspace) {
    const currentItem = this.makeTenGameData[this.currentMakeTenGameIdx];
    const totalCount = this.makeTenGameData.length;
    const hasChosen = this.selectedMakeTenGameAnswers[this.currentMakeTenGameIdx] !== undefined;
    const chosenIdx = this.selectedMakeTenGameAnswers[this.currentMakeTenGameIdx];

    workspace.innerHTML = `
      <div style="text-align:center;">
        <!-- Status Bar -->
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.05); padding:0.75rem 1.25rem; border-radius:14px; margin-bottom:1rem; font-weight:700;">
          <div>📌 짝 맞추기 문제 ${this.currentMakeTenGameIdx + 1} / ${totalCount}</div>
          <div>⭐ 총 점수: ${this.makeTenGameScore}점</div>
        </div>

        <!-- Given Target Number Card -->
        <div class="clip-theme-card" style="padding:2rem; background:#fffbe6; border:4px solid #8b5cf6; margin-bottom:1.5rem; border-radius:20px;">
          <h3 style="font-size:1.3rem; color:#6b21a8; margin-bottom:0.75rem;">주어진 숫자 카드:</h3>
          <div style="font-size:5rem; font-family:var(--font-family-friendly); color:#e53e3e; font-weight:800; display:inline-block; background:#fff; width:120px; height:120px; line-height:120px; border-radius:20px; border:3px solid #f6ad55; box-shadow:var(--shadow-md);">
            ${currentItem.base}
          </div>
          <h4 style="margin-top:1rem; color:#4a5568;">선택한 숫자와 합쳐서 <span style="color:#8b5cf6; font-size:1.4rem;">10</span>이 되는 짝궁 카드를 고르세요!</h4>
        </div>

        <!-- Choices Grid -->
        <div style="display:flex; gap:1rem; justify-content:center; margin-bottom:1.5rem;">
          ${currentItem.choices.map((val, idx) => {
            let extraClass = "";
            if (hasChosen) {
              if (val === currentItem.answer) extraClass = "correct";
              else if (idx === chosenIdx) extraClass = "wrong";
            }
            return `
              <button class="btn-choice ${extraClass}" style="font-size:2.5rem; flex:1; padding:1.2rem; border-radius:20px; font-weight:800; min-height:100px;" ${hasChosen ? 'disabled' : ''} onclick="level2Manager.checkMakeTenGame(${idx}, ${val})">
                ${val}
              </button>
            `;
          }).join('')}
        </div>

        <!-- Explanation Card -->
        ${hasChosen ? `
          <div class="clip-theme-card" style="padding:1.25rem; background:#f0fdf4; border-left:5px solid #22c55e; margin-bottom:1.5rem; text-align:left;">
            <h4 style="color:#15803d; margin-bottom:0.4rem;">💡 짝궁 숫자 해설</h4>
            <p style="font-size:1.05rem; line-height:1.6;">${currentItem.exp}</p>
          </div>
        ` : ''}

        <!-- Navigation Buttons -->
        <div style="display:flex; justify-content:space-between;">
          <button class="primary-btn" ${this.currentMakeTenGameIdx === 0 ? 'disabled' : ''} onclick="level2Manager.prevMakeTenGameQ()"><i class="fa-solid fa-arrow-left"></i> 이전 문제</button>
          <button class="primary-btn" ${!hasChosen ? 'disabled' : ''} onclick="level2Manager.nextMakeTenGameQ()">다음 문제 <i class="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>
    `;

    ttsManager.speak(`숫자 ${currentItem.base}와 합쳐서 10이 되는 짝궁 카드를 고르세요!`);
  }

  checkMakeTenGame(chosenIdx, val) {
    if (this.selectedMakeTenGameAnswers[this.currentMakeTenGameIdx] !== undefined) return;

    this.selectedMakeTenGameAnswers[this.currentMakeTenGameIdx] = chosenIdx;
    const currentItem = this.makeTenGameData[this.currentMakeTenGameIdx];
    const isCorrect = (val === currentItem.answer);

    if (isCorrect) {
      soundManager.playCorrect();
      this.makeTenGameScore += 10;
      appState.addStar(1);
      ttsManager.speak(`정답입니다! ${currentItem.base}와 ${val}이 합쳐서 10이 됩니다!`);
    } else {
      soundManager.playWrong();
      ttsManager.speak("아쉬워요! 아래 해설을 읽어보세요.");
    }

    const workspace = document.getElementById('makeTenModeWorkspace');
    if (workspace) this.renderMakeTenGame(workspace);
  }

  nextMakeTenGameQ() {
    soundManager.playClick();
    if (this.currentMakeTenGameIdx < this.makeTenGameData.length - 1) {
      this.currentMakeTenGameIdx++;
      const workspace = document.getElementById('makeTenModeWorkspace');
      if (workspace) this.renderMakeTenGame(workspace);
    } else {
      appState.showCelebrationModal("10의 보수 짝 맞추기 정복! 🎉", `총 ${this.makeTenGameScore}점을 획득하며 짝궁 숫자를 완벽하게 Master 했습니다! 🧩⭐`);
    }
  }

  prevMakeTenGameQ() {
    soundManager.playClick();
    if (this.currentMakeTenGameIdx > 0) {
      this.currentMakeTenGameIdx--;
      const workspace = document.getElementById('makeTenModeWorkspace');
      if (workspace) this.renderMakeTenGame(workspace);
    }
  }
}

window.level2Manager = new Level2Manager();
