/* ==========================================================================
   두리두리 (Duri-Duri) - Level 1: 기초 인지 (Basic Cognition)
   ========================================================================== */

class Level1Manager {
  constructor() {
    this.currentSubIndex = 0;
    this.subActivities = [
      'colorMatch',
      'personClassify',
      'emotionCards',
      'shapeMatch',
      'animalPlantSort'
    ];

    // Rainbow Colors Dataset
    this.rainbowColors = [
      { id: 'red', name: '빨간색', emoji: '🔴', hex: '#ff4d4d', darkText: false },
      { id: 'orange', name: '주황색', emoji: '🟠', hex: '#ff944d', darkText: false },
      { id: 'yellow', name: '노란색', emoji: '🟡', hex: '#ffd633', darkText: true },
      { id: 'green', name: '초록색', emoji: '🟢', hex: '#4dcf67', darkText: false },
      { id: 'blue', name: '파란색', emoji: '🔵', hex: '#4d88ff', darkText: false },
      { id: 'indigo', name: '남색', emoji: '🌌', hex: '#333b8a', darkText: false },
      { id: 'purple', name: '보라색', emoji: '🟣', hex: '#9933ff', darkText: false }
    ];
    this.rainbowCurrentStage = 0;
    this.rainbowScore = 0;

    // Color Mixing Quiz Dataset
  this.colorMixingDataset = [
    {
      c1: "🔴 빨간색",
      c1Hex: "#ff4d4d",
      c2: "🟡 노란색",
      c2Hex: "#ffd633",
      result: "주황색 🟠",
      resultHex: "#ff944d",
      question: "🔴 빨간색 물감과 🟡 노란색 물감을 섞으면 어떤 색깔이 나올까요?",
      choices: [
        { name: "보라색 🟣", hex: "#9933ff", isCorrect: false },
        { name: "초록색 🟢", hex: "#4dcf67", isCorrect: false },
        { name: "주황색 🟠", hex: "#ff944d", isCorrect: true }
      ],
      explanation: "맞아요! 빨간색과 노란색을 섞으면 신나는 주황색이 됩니다!"
    },
    {
      c1: "🟡 노란색",
      c1Hex: "#ffd633",
      c2: "🔵 파란색",
      c2Hex: "#4d88ff",
      result: "초록색 🟢",
      resultHex: "#4dcf67",
      question: "🟡 노란색 물감과 🔵 파란색 물감을 섞으면 어떤 색깔이 나올까요?",
      choices: [
        { name: "주황색 🟠", hex: "#ff944d", isCorrect: false },
        { name: "초록색 🟢", hex: "#4dcf67", isCorrect: true },
        { name: "분홍색 🌸", hex: "#ff99c8", isCorrect: false }
      ],
      explanation: "정답이에요! 노란색과 파란색을 섞으면 싱그러운 초록색이 됩니다!"
    },
    {
      c1: "🔴 빨간색",
      c1Hex: "#ff4d4d",
      c2: "🔵 파란색",
      c2Hex: "#4d88ff",
      result: "보라색 🟣",
      resultHex: "#9933ff",
      question: "🔴 빨간색 물감과 🔵 파란색 물감을 섞으면 어떤 색깔이 나올까요?",
      choices: [
        { name: "초록색 🟢", hex: "#4dcf67", isCorrect: false },
        { name: "주황색 🟠", hex: "#ff944d", isCorrect: false },
        { name: "보라색 🟣", hex: "#9933ff", isCorrect: true }
      ],
      explanation: "딩동댕! 빨간색과 파란색을 섞으면 예쁜 보라색이 됩니다!"
    },
    {
      c1: "🔴 빨간색",
      c1Hex: "#ff4d4d",
      c2: "⚪ 하얀색",
      c2Hex: "#ffffff",
      result: "분홍색 🌸",
      resultHex: "#ff99c8",
      question: "🔴 빨간색 물감과 ⚪ 하얀색 물감을 섞으면 어떤 색깔이 나올까요?",
      choices: [
        { name: "분홍색 🌸", hex: "#ff99c8", isCorrect: true },
        { name: "보라색 🟣", hex: "#9933ff", isCorrect: false },
        { name: "노란색 🟡", hex: "#ffd633", isCorrect: false }
      ],
      explanation: "맞았습니다! 빨간색에 하얀색을 섞으면 부드러운 분홍색이 돼요!"
    },
    {
      c1: "🔵 파란색",
      c1Hex: "#4d88ff",
      c2: "⚪ 하얀색",
      c2Hex: "#ffffff",
      result: "하늘색 🩵",
      resultHex: "#89cff0",
      question: "🔵 파란색 물감과 ⚪ 하얀색 물감을 섞으면 어떤 색깔이 나올까요?",
      choices: [
        { name: "초록색 🟢", hex: "#4dcf67", isCorrect: false },
        { name: "보라색 🟣", hex: "#9933ff", isCorrect: false },
        { name: "하늘색 🩵", hex: "#89cff0", isCorrect: true }
      ],
      explanation: "정답입니다! 파란색에 하얀색을 섞으면 맑은 하늘색이 됩니다!"
    },
    {
      c1: "⬛ 검은색",
      c1Hex: "#2d3748",
      c2: "⚪ 하얀색",
      c2Hex: "#ffffff",
      result: "회색 🩶",
      resultHex: "#a0aec0",
      question: "⬛ 검은색 물감과 ⚪ 하얀색 물감을 섞으면 어떤 색깔이 나올까요?",
      choices: [
        { name: "갈색 🤎", hex: "#a0522d", isCorrect: false },
        { name: "회색 🩶", hex: "#a0aec0", isCorrect: true },
        { name: "남색 🌌", hex: "#333b8a", isCorrect: false }
      ],
      explanation: "맞았어요! 검은색과 하얀색을 섞으면 차분한 회색이 됩니다!"
    },
    {
      c1: "🔴 빨간색",
      c1Hex: "#ff4d4d",
      c2: "🟢 초록색",
      c2Hex: "#4dcf67",
      result: "갈색 🤎",
      resultHex: "#a0522d",
      question: "🔴 빨간색 물감과 🟢 초록색 물감을 섞으면 어떤 색깔이 나올까요?",
      choices: [
        { name: "분홍색 🌸", hex: "#ff99c8", isCorrect: false },
        { name: "하늘색 🩵", hex: "#89cff0", isCorrect: false },
        { name: "갈색 🤎", hex: "#a0522d", isCorrect: true }
      ],
      explanation: "정답이에요! 빨간색과 초록색을 섞으면 차분한 갈색이 됩니다!"
    }
  ];
    this.colorSubMode = 'sameColor'; // 'sameColor' or 'colorMixing'
    this.colorMixingIndex = 0;

    // Animal & Plant Sorting Dataset (40 items: 20 Animals, 20 Plants Interleaved)
    this.rawAnimalPlantDataset = [
      { name: "토끼", emoji: "🐰", type: "animal", category: "동물", desc: "깡충깡충 귀여운 토끼" },
      { name: "해바라기", emoji: "🌻", type: "plant", category: "식물", desc: "방긋 웃는 방글방글 해바라기" },
      { name: "사자", emoji: "🦁", type: "animal", category: "동물", desc: "어흥~ 듬직한 동물의 왕 사자" },
      { name: "장미", emoji: "🌹", type: "plant", category: "식물", desc: "향기롭고 예쁜 빨간 장미" },
      { name: "코끼리", emoji: "🐘", type: "animal", category: "동물", desc: "뿌우~ 긴 코를 가진 코끼리" },
      { name: "소나무", emoji: "🌲", type: "plant", category: "식물", desc: "사계절 푸른 소나무" },
      { name: "강아지", emoji: "🐶", type: "animal", category: "동물", desc: "멍멍! 다정한 강아지" },
      { name: "튤립", emoji: "🌷", type: "plant", category: "식물", desc: "알록달록 예쁜 튤립" },
      { name: "고양이", emoji: "🐱", type: "animal", category: "동물", desc: "야옹~ 야옹 고양이" },
      { name: "선인장", emoji: "🌵", type: "plant", category: "식물", desc: "가시가 뾰족뾰족 사막 선인장" },
      { name: "호랑이", emoji: "🐯", type: "animal", category: "동물", desc: "어흥! 용맹한 호랑이" },
      { name: "단풍나무", emoji: "🍁", type: "plant", category: "식물", desc: "붉게 물드는 예쁜 단풍나무" },
      { name: "원숭이", emoji: "🐒", type: "animal", category: "동물", desc: "우끼끼~ 바나나를 좋아하는 원숭이" },
      { name: "벚꽃", emoji: "🌸", type: "plant", category: "식물", desc: "봄바람에 흩날리는 분홍 벚꽃" },
      { name: "판다", emoji: "🐼", type: "animal", category: "동물", desc: "귀여운 둥글둥글 판다" },
      { name: "민들레", emoji: "🌼", type: "plant", category: "식물", desc: "후~ 불면 씨앗이 날아가는 민들레" },
      { name: "기린", emoji: "🦒", type: "animal", category: "동물", desc: "키가 무척 큰 기린" },
      { name: "사과나무", emoji: "🍎", type: "plant", category: "식물", desc: "탐스러운 사과가 달리는 사과나무" },
      { name: "얼룩말", emoji: "🦓", type: "animal", category: "동물", desc: "줄무늬 옷을 입은 얼룩말" },
      { name: "바나나나무", emoji: "🍌", type: "plant", category: "식물", desc: "달콤한 바나나가 열리는 바나나나무" },
      { name: "펭귄", emoji: "🐧", type: "animal", category: "동물", desc: "아장아장 펭귄" },
      { name: "네잎클로버", emoji: "🍀", type: "plant", category: "식물", desc: "행운을 가져다주는 네잎클로버" },
      { name: "돌고래", emoji: "🐬", type: "animal", category: "동물", desc: "바다 속을 헤엄치는 돌고래" },
      { name: "연꽃", emoji: "🪷", type: "plant", category: "식물", desc: "연못 위 피어나는 단아한 연꽃" },
      { name: "병아리", emoji: "🐥", type: "animal", category: "동물", desc: "삐약삐약 노란 병아리" },
      { name: "벼", emoji: "🌾", type: "plant", category: "식물", desc: "맛있는 쌀이 되는 황금빛 벼" },
      { name: "돼지", emoji: "🐷", type: "animal", category: "동물", desc: "꿀꿀! 분홍빛 돼지" },
      { name: "옥수수", emoji: "🌽", type: "plant", category: "식물", desc: "알알이 실한 옥수수 식물" },
      { name: "소", emoji: "🐮", type: "animal", category: "동물", desc: "음매~ 고마운 얼룩소" },
      { name: "야자수", emoji: "🌴", type: "plant", category: "식물", desc: "남쪽 섬의 시원한 야자수" },
      { name: "말", emoji: "🐴", type: "animal", category: "동물", desc: "히힝~ 씩씩하게 달리는 말" },
      { name: "수박", emoji: "🍉", type: "plant", category: "식물", desc: "달콤하고 시원한 수박 덩굴" },
      { name: "개구리", emoji: "🐸", type: "animal", category: "동물", desc: "개굴개굴 연못 속 개구리" },
      { name: "당근", emoji: "🥕", type: "plant", category: "식물", desc: "땅속에서 자라는 주황색 당근" },
      { name: "여우", emoji: "🦊", type: "animal", category: "동물", desc: "주황색 털을 가진 붉은여우" },
      { name: "버섯", emoji: "🍄", type: "plant", category: "식물", desc: "숲속 나무 아래 자라는 버섯" },
      { name: "곰", emoji: "🐻", type: "animal", category: "동물", desc: "꿀을 좋아하는 든든한 곰" },
      { name: "무궁화", emoji: "🌺", type: "plant", category: "식물", desc: "우리나라 꽃 무궁화" },
      { name: "다람쥐", emoji: "🐿️", type: "animal", category: "동물", desc: "도토리를 줍는 귀여운 다람쥐" },
      { name: "대나무", emoji: "🎋", type: "plant", category: "식물", desc: "쑥쑥 곧게 자라는 푸른 대나무" }
    ];
    this.animalPlantDataset = this.shuffle(this.rawAnimalPlantDataset);
    this.animalPlantIndex = 0;
    this.animalPlantScore = 0;
    this.animalSortMode = 'focus'; // 'focus' or 'grid'
    this.animalGridPage = 0;
  }

  shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  render(container) {
    const activityName = this.subActivities[this.currentSubIndex];
    let html = `
      <div class="sub-nav-bar">
        <button class="sub-nav-btn ${this.currentSubIndex===0?'active':''}" onclick="level1Manager.switchSub(0)"><i class="fa-solid fa-palette"></i> 1. 색깔 (같은 색 & 색 섞기)</button>
        <button class="sub-nav-btn ${this.currentSubIndex===1?'active':''}" onclick="level1Manager.switchSub(1)"><i class="fa-solid fa-users"></i> 2. 인물 구분 (할머니/할아버지)</button>
        <button class="sub-nav-btn ${this.currentSubIndex===2?'active':''}" onclick="level1Manager.switchSub(2)"><i class="fa-solid fa-face-smile"></i> 3. 감정 표현</button>
        <button class="sub-nav-btn ${this.currentSubIndex===3?'active':''}" onclick="level1Manager.switchSub(3)"><i class="fa-solid fa-shapes"></i> 4. 도형 인지</button>
        <button class="sub-nav-btn ${this.currentSubIndex===4?'active':''}" onclick="level1Manager.switchSub(4)"><i class="fa-solid fa-leaf"></i> 5. 동식물 구분</button>
      </div>
      <div id="level1SubWorkspace"></div>
    `;
    container.innerHTML = html;
    
    const workspace = document.getElementById('level1SubWorkspace');
    if (activityName === 'colorMatch') this.renderColorMatch(workspace);
    else if (activityName === 'personClassify') this.renderPersonClassify(workspace);
    else if (activityName === 'emotionCards') this.renderEmotionCards(workspace);
    else if (activityName === 'shapeMatch') this.renderShapeMatch(workspace);
    else if (activityName === 'animalPlantSort') this.renderAnimalPlantSort(workspace);
  }

  switchSub(index) {
    if (window.soundManager) soundManager.playClick();
    this.currentSubIndex = index;
    const container = document.getElementById('curriculumActivityArea');
    if (container) this.render(container);
  }

  /* --------------------------------------------------------------------------
     1. Color Cognitive: Rainbow Match & Color Mixing Quiz
     -------------------------------------------------------------------------- */
  renderColorMatch(workspace) {
    workspace.innerHTML = `
      <div style="display:flex; justify-content:center; gap:0.8rem; margin-bottom:1.5rem;">
        <button class="primary-btn ${this.colorSubMode === 'sameColor' ? 'active' : ''}" 
                style="padding: 0.6rem 1.2rem; font-size: 0.95rem; background: ${this.colorSubMode === 'sameColor' ? 'var(--primary-blue)' : '#cbd5e0'};"
                onclick="level1Manager.setColorSubMode('sameColor')">
          🌈 1. 무지개 같은 색깔 찾기
        </button>
        <button class="primary-btn ${this.colorSubMode === 'colorMixing' ? 'active' : ''}" 
                style="padding: 0.6rem 1.2rem; font-size: 0.95rem; background: ${this.colorSubMode === 'colorMixing' ? '#ed8936' : '#cbd5e0'};"
                onclick="level1Manager.setColorSubMode('colorMixing')">
          🎨 2. 두 가지 색깔 섞기 (혼합 퀴즈)
        </button>
      </div>
      <div id="colorSubContent"></div>
    `;

    const subContent = document.getElementById('colorSubContent');
    if (this.colorSubMode === 'sameColor') {
      this.renderRainbowMatchContent(subContent);
    } else {
      this.renderColorMixingContent(subContent);
    }
  }

  setColorSubMode(mode) {
    if (window.soundManager) soundManager.playClick();
    this.colorSubMode = mode;
    const workspace = document.getElementById('level1SubWorkspace');
    if (workspace) this.renderColorMatch(workspace);
  }

  renderRainbowMatchContent(container) {
    const targetColor = this.rainbowColors[this.rainbowCurrentStage % this.rainbowColors.length];
    
    // Generate 4 choices including the target color and 3 random distinct colors
    const otherColors = this.rainbowColors.filter(c => c.id !== targetColor.id);
    const shuffledOthers = this.shuffle(otherColors).slice(0, 3);
    const choices = this.shuffle([targetColor, ...shuffledOthers]);

    const promptText = `[단계 ${this.rainbowCurrentStage + 1}/7] 보기 중에서 ${targetColor.name}(${targetColor.emoji})과 똑같은 색깔을 찾아 눌러주세요!`;

    container.innerHTML = `
      <div class="activity-header">
        <div class="activity-header-text">
          <h2>🌈 무지개 같은 색깔 찾기</h2>
          <p>${promptText}</p>
        </div>
        <button class="speak-btn" onclick="ttsManager.speak('${promptText}')" title="음성 듣기">
          <i class="fa-solid fa-volume-high"></i>
        </button>
      </div>

      <!-- Target Color Display Box -->
      <div class="clip-theme-card rainbow-target-card" style="max-width: 520px; margin: 0 auto 1.5rem auto; padding: 2rem; text-align: center; background: ${targetColor.hex}; color: ${targetColor.darkText ? '#2d3748' : '#ffffff'}; box-shadow: 0 10px 25px rgba(0,0,0,0.15); transition: all 0.3s ease;">
        <span style="font-size: 1.1rem; font-weight: 600; opacity: 0.9; display: block; margin-bottom: 0.3rem;">찾아야 할 색깔</span>
        <h3 style="font-size: 2.4rem; font-weight: 800; margin: 0.3rem 0; letter-spacing: 1px;">
          ${targetColor.emoji} ${targetColor.name}
        </h3>
        <p style="font-size: 1rem; opacity: 0.95;">이 색깔과 똑같은 색을 아래에서 찾아보세요!</p>
      </div>

      <!-- Choices Grid -->
      <div class="grid-4" style="max-width: 800px; margin: 0 auto;">
        ${choices.map(c => `
          <button class="btn-choice rainbow-option-btn" 
                  style="background: ${c.hex}; color: ${c.darkText ? '#2d3748' : '#ffffff'}; padding: 1.8rem 1rem; border-radius: 20px; text-align: center; border: 4px solid transparent; cursor: pointer; transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);"
                  onclick="level1Manager.checkRainbowMatch('${c.id}', '${targetColor.id}', this, '${c.name}')">
            <div style="font-size: 3rem; margin-bottom: 0.4rem;">${c.emoji}</div>
            <div style="font-size: 1.4rem; font-weight: 800;">${c.name}</div>
          </button>
        `).join('')}
      </div>

      <!-- Rainbow Progress Bar -->
      <div style="max-width: 600px; margin: 2rem auto 0 auto; text-align: center;">
        <div style="font-weight: 700; color: var(--text-muted); margin-bottom: 0.5rem;">무지개 모으기 진행도 (${this.rainbowCurrentStage}/7)</div>
        <div style="display: flex; gap: 8px; justify-content: center; height: 16px;">
          ${this.rainbowColors.map((rc, idx) => `
            <div style="flex: 1; border-radius: 10px; background: ${idx < this.rainbowCurrentStage ? rc.hex : '#e2e8f0'}; transition: background 0.4s ease; box-shadow: ${idx < this.rainbowCurrentStage ? '0 2px 5px rgba(0,0,0,0.2)' : 'none'};"></div>
          `).join('')}
        </div>
      </div>
    `;

    ttsManager.speak(`${targetColor.name}과 똑같은 색깔을 찾아보세요!`);
  }

  /* Color Mixing Quiz Renderer */
  renderColorMixingContent(container) {
    const currentQuiz = this.colorMixingDataset[this.colorMixingIndex % this.colorMixingDataset.length];
    // Randomly shuffle choices so the correct answer isn't always in the first position
    const shuffledChoices = this.shuffle(currentQuiz.choices);

    container.innerHTML = `
      <div class="activity-header">
        <div class="activity-header-text">
          <h2>🎨 두 가지 색깔 섞기 (색상 혼합 퀴즈)</h2>
          <p>두 물감 색깔을 섞으면 어떤 새로운 색깔이 만들어질까요?</p>
        </div>
        <button class="speak-btn" onclick="ttsManager.speak('${currentQuiz.question}')" title="음성 듣기">
          <i class="fa-solid fa-volume-high"></i>
        </button>
      </div>

      <!-- Mixing Recipe Card -->
      <div class="clip-theme-card" style="max-width: 650px; margin: 0 auto 1.8rem auto; padding: 2rem; text-align: center; background: white; border: 3px dashed #ed8936; box-shadow: var(--shadow-md);">
        <span style="font-size: 0.95rem; font-weight: 700; color: #c05621; background: #feebc8; padding: 0.3rem 0.9rem; border-radius: 20px; display: inline-block; margin-bottom: 1rem;">
          <i class="fa-solid fa-flask"></i> 물감 섞기 레시피 (${(this.colorMixingIndex % this.colorMixingDataset.length) + 1}/${this.colorMixingDataset.length})
        </span>

        <!-- Paint Drop Visual Assembly -->
        <div style="display: flex; align-items: center; justify-content: center; gap: 1.2rem; margin: 1rem 0;">
          <div style="background: ${currentQuiz.c1Hex}; color: ${currentQuiz.c1Hex==='#ffffff'?'#2d3748':'#ffffff'}; padding: 1.2rem 1.8rem; border-radius: 20px; font-weight: 800; font-size: 1.4rem; box-shadow: 0 4px 10px rgba(0,0,0,0.15); border: 2px solid rgba(0,0,0,0.1);">
            ${currentQuiz.c1}
          </div>
          <span style="font-size: 2.2rem; font-weight: 800; color: #718096;">+</span>
          <div style="background: ${currentQuiz.c2Hex}; color: ${currentQuiz.c2Hex==='#ffffff'?'#2d3748':'#ffffff'}; padding: 1.2rem 1.8rem; border-radius: 20px; font-weight: 800; font-size: 1.4rem; box-shadow: 0 4px 10px rgba(0,0,0,0.15); border: 2px solid rgba(0,0,0,0.1);">
            ${currentQuiz.c2}
          </div>
          <span style="font-size: 2.2rem; font-weight: 800; color: #718096;">=</span>
          <div style="background: #edf2f7; color: #4a5568; padding: 1.2rem 1.8rem; border-radius: 20px; font-weight: 800; font-size: 1.6rem; border: 3px dashed #a0aec0;">
            ❓ 무슨 색?
          </div>
        </div>

        <p style="font-size: 1.2rem; font-weight: 700; color: var(--text-main); margin-top: 1rem;">
          ${currentQuiz.question}
        </p>
      </div>

      <!-- Color Choices Grid (Randomly Shuffled) -->
      <div class="grid-3" style="max-width: 750px; margin: 0 auto; gap: 1.2rem;">
        ${shuffledChoices.map(c => `
          <button class="clip-theme-card btn-choice" 
                  style="min-height: 120px; background: ${c.hex}; color: ${c.hex==='#ffffff'||c.hex==='#ffd633'||c.hex==='#ff99c8'||c.hex==='#89cff0'?'#2d3748':'#ffffff'}; padding: 1.4rem; font-size: 1.4rem; font-weight: 800; text-align: center; border: 4px solid transparent; cursor: pointer; transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1); box-shadow: var(--shadow-md);"
                  onclick="level1Manager.checkColorMixingChoice(${c.isCorrect}, this, '${currentQuiz.explanation}')">
            ${c.name}
          </button>
        `).join('')}
      </div>
    `;

    ttsManager.speak(currentQuiz.question);
  }

  checkColorMixingChoice(isCorrect, btn, explanation) {
    if (isCorrect) {
      if (window.soundManager) soundManager.playCorrect();
      btn.style.transform = 'scale(1.08)';
      btn.style.borderColor = '#ffffff';
      btn.style.boxShadow = '0 0 22px rgba(255,255,255,0.9)';

      if (window.appState) appState.addStar(1);

      ttsManager.speak(explanation);
      this.colorMixingIndex++;

      setTimeout(() => {
        const workspace = document.getElementById('level1SubWorkspace');
        if (workspace && this.subActivities[this.currentSubIndex] === 'colorMatch') {
          this.renderColorMatch(workspace);
        }
      }, 2200);
    } else {
      if (window.soundManager) soundManager.playWrong();
      btn.style.transform = 'shake(5px)';
      btn.style.borderColor = '#e53e3e';
      ttsManager.speak("다시 두 색깔이 만났을 때 어떤 색이 될지 생각해보세요!");
    }
  }

  checkRainbowMatch(selectedId, targetId, btn, colorName) {
    if (selectedId === targetId) {
      if (window.soundManager) soundManager.playCorrect();
      btn.style.transform = 'scale(1.1)';
      btn.style.borderColor = '#ffffff';
      btn.style.boxShadow = '0 0 20px rgba(255,255,255,0.8)';
      
      if (window.appState) appState.addStar(1);
      
      this.rainbowCurrentStage++;
      
      if (this.rainbowCurrentStage >= 7) {
        ttsManager.speak(`축하합니다! 무지개의 7가지 색깔을 모두 똑같이 찾아 완성했어요!`);
        if (window.appState) {
          appState.showCelebrationModal(
            "🌈 무지개 완성!",
            "7가지 무지개 색깔(빨,주,노,초,파,남,보)을 모두 정확하게 매칭했어요! 대단해요! ⭐"
          );
        }
        this.rainbowCurrentStage = 0; // Reset after complete
      } else {
        ttsManager.speak(`맞았어요! ${colorName}과 똑같은 색깔이에요! 잘했어요!`);
      }

      setTimeout(() => {
        const workspace = document.getElementById('level1SubWorkspace');
        if (workspace && this.subActivities[this.currentSubIndex] === 'colorMatch') {
          this.renderColorMatch(workspace);
        }
      }, 1200);
    } else {
      if (window.soundManager) soundManager.playWrong();
      btn.style.transform = 'shake(5px)';
      btn.style.opacity = '0.5';
      ttsManager.speak(`다시 한번 찾아볼까요? ${colorName}이 아니라 다른 색이에요.`);
    }
  }

  /* --------------------------------------------------------------------------
     2. Person Identification (할머니, 할아버지, 아빠, 엄마, 아이 구분)
     -------------------------------------------------------------------------- */
  renderPersonClassify(workspace) {
    const targetPerson = this.peopleDataset[this.personQuizIndex % this.peopleDataset.length];
    const promptText = `${targetPerson.emoji} '${targetPerson.name}' 카드를 찾아 눌러보세요!`;

    workspace.innerHTML = `
      <div class="activity-header">
        <div class="activity-header-text">
          <h2>👨‍👩‍👧‍👦 인물 구분하기 (할머니 & 할아버지)</h2>
          <p>${promptText}</p>
        </div>
        <button class="speak-btn" onclick="ttsManager.speak('${promptText}')" title="음성 듣기">
          <i class="fa-solid fa-volume-high"></i>
        </button>
      </div>

      <!-- Sub Mode Switch -->
      <div style="display:flex; justify-content:center; gap:1rem; margin-bottom:1.5rem;">
        <button class="primary-btn ${this.personQuizMode === 'findSpecific' ? 'active' : ''}" 
                style="background: ${this.personQuizMode === 'findSpecific' ? 'var(--primary-blue)' : '#cbd5e0'}; padding: 0.6rem 1.2rem;"
                onclick="level1Manager.setPersonMode('findSpecific')">
          <i class="fa-solid fa-magnifying-glass"></i> 특정 인물 찾기 (할머니/할아버지)
        </button>
        <button class="primary-btn ${this.personQuizMode === 'classifyCategory' ? 'active' : ''}" 
                style="background: ${this.personQuizMode === 'classifyCategory' ? 'var(--primary-blue)' : '#cbd5e0'}; padding: 0.6rem 1.2rem;"
                onclick="level1Manager.setPersonMode('classifyCategory')">
          <i class="fa-solid fa-layer-group"></i> 세대별 분류 (어르신/어른/아이)
        </button>
      </div>

      <div id="personSubContent"></div>
    `;

    const subContent = document.getElementById('personSubContent');
    if (this.personQuizMode === 'findSpecific') {
      this.renderFindSpecificPerson(subContent, targetPerson);
    } else {
      this.renderClassifyCategoryPerson(subContent);
    }

    ttsManager.speak(promptText);
  }

  setPersonMode(mode) {
    if (window.soundManager) soundManager.playClick();
    this.personQuizMode = mode;
    const workspace = document.getElementById('level1SubWorkspace');
    if (workspace) this.renderPersonClassify(workspace);
  }

  /* Mode A: Find Specific Person (할머니, 할아버지 등 찾기) */
  renderFindSpecificPerson(container, targetPerson) {
    // Shuffle all 6 people for cards
    const shuffledPeople = this.shuffle(this.peopleDataset);

    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 1.5rem;">
        <div style="font-size: 1.3rem; font-weight: 700; color: var(--text-main); background: rgba(255,255,255,0.8); display: inline-block; padding: 0.8rem 1.8rem; border-radius: 30px; box-shadow: var(--shadow-sm);">
          찾아야 할 인물: <span style="color:#e53e3e; font-size:1.6rem; margin-left:0.3rem;">${targetPerson.emoji} ${targetPerson.name}</span>
        </div>
      </div>

      <div class="grid-3" style="max-width: 850px; margin: 0 auto; gap: 1.2rem;">
        ${shuffledPeople.map(p => `
          <button class="clip-theme-card btn-choice" 
                  style="min-height: 160px; display: flex; flex-direction: column; align-items: center; justify-content: center; background: white; border: 3px solid var(--border-color); cursor: pointer; transition: all 0.25s ease;"
                  onclick="level1Manager.checkSpecificPerson('${p.id}', '${targetPerson.id}', this, '${p.name}')">
            <div style="font-size: 3.8rem; line-height: 1;">${p.emoji}</div>
            <div style="font-size: 1.3rem; font-weight: 800; color: var(--text-main); margin-top: 0.6rem;">${p.name}</div>
            <span style="font-size: 0.85rem; color: var(--text-muted); background: #edf2f7; padding: 0.2rem 0.6rem; border-radius: 12px; margin-top: 0.4rem;">${p.categoryName}</span>
          </button>
        `).join('')}
      </div>
    `;
  }

  checkSpecificPerson(selectedId, targetId, btn, personName) {
    if (selectedId === targetId) {
      if (window.soundManager) soundManager.playCorrect();
      btn.style.borderColor = '#48bb78';
      btn.style.background = '#f0fff4';
      btn.style.transform = 'scale(1.08)';

      if (window.appState) appState.addStar(1);
      
      ttsManager.speak(`맞았습니다! ${personName} 카드를 잘 찾았어요!`);
      this.personQuizIndex++;

      setTimeout(() => {
        const workspace = document.getElementById('level1SubWorkspace');
        if (workspace && this.subActivities[this.currentSubIndex] === 'personClassify') {
          this.renderPersonClassify(workspace);
        }
      }, 1200);
    } else {
      if (window.soundManager) soundManager.playWrong();
      btn.style.borderColor = '#f56565';
      btn.style.background = '#fff5f5';
      ttsManager.speak(`이분은 ${personName}이에요. 다시 찾아볼까요?`);
    }
  }

  /* Mode B: Classify Category (어르신: 할머니/할아버지, 어른: 아빠/엄마, 아이: 남/여아) */
  renderClassifyCategoryPerson(container) {
    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 1rem;">
        <p style="font-size: 1.1rem; color: var(--text-muted);">각 인물 카드가 <strong>어르신(할머니/할아버지)</strong>, <strong>어른</strong>, <strong>아이</strong> 중 어디에 해당하는지 눌러주세요!</p>
      </div>

      <div class="grid-3" style="max-width: 900px; margin: 0 auto; gap: 1rem;">
        ${this.peopleDataset.map(p => `
          <div class="clip-theme-card" style="padding: 1.2rem; text-align: center; background: white; border: 2px solid var(--border-color);">
            <div style="font-size: 3.2rem;">${p.emoji}</div>
            <div style="font-size: 1.2rem; font-weight: 800; margin: 0.3rem 0;">${p.name}</div>
            <div style="display: flex; gap: 0.3rem; margin-top: 0.8rem;">
              <button class="primary-btn" style="padding: 0.4rem 0.2rem; font-size: 0.78rem; flex: 1; background: #ed8936;" 
                      onclick="level1Manager.checkCategoryPerson('${p.category}', 'senior', this)">
                👴👵 어르신
              </button>
              <button class="primary-btn" style="padding: 0.4rem 0.2rem; font-size: 0.78rem; flex: 1; background: #4299e1;" 
                      onclick="level1Manager.checkCategoryPerson('${p.category}', 'adult', this)">
                👨👩 어른
              </button>
              <button class="primary-btn" style="padding: 0.4rem 0.2rem; font-size: 0.78rem; flex: 1; background: #48bb78;" 
                      onclick="level1Manager.checkCategoryPerson('${p.category}', 'child', this)">
                👦👧 아이
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  checkCategoryPerson(actualCategory, chosenCategory, btn) {
    if (actualCategory === chosenCategory) {
      if (window.soundManager) soundManager.playCorrect();
      btn.style.outline = '3px solid #38a169';
      if (window.appState) appState.addStar(1);
      
      const categoryLabel = actualCategory === 'senior' ? '어르신(할머니/할아버지)' : actualCategory === 'adult' ? '어른' : '아이';
      ttsManager.speak(`맞았어요! ${categoryLabel} 카드가 맞습니다!`);
    } else {
      if (window.soundManager) soundManager.playWrong();
      btn.style.opacity = '0.5';
      ttsManager.speak(`다시 생각해보세요!`);
    }
  }

  /* --------------------------------------------------------------------------
     3. Situation-Based Emotion Identification (상황 맥락 감정 얼굴 찾기)
     -------------------------------------------------------------------------- */
  renderEmotionCards(workspace) {
    if (!this.emotionSituations) {
      this.emotionSituations = [
        // 기쁨 (Happy) 4가지 다양한 상황
        {
          story: "생일 선물을 짠! 받았습니다! 🎁✨",
          targetEmotion: "happy",
          targetEmotionName: "기쁨",
          targetEmoji: "😊",
          feedback: "맞아요! 생일 선물을 받아서 정말 기쁘고 행복해요!"
        },
        {
          story: "맛있는 아이스크림을 달콤하게 먹어요! 🍦💖",
          targetEmotion: "happy",
          targetEmotionName: "기쁨",
          targetEmoji: "😊",
          feedback: "맞아요! 달콤한 음식을 먹으면 마음이 참 기뻐요!"
        },
        {
          story: "놀이공원에서 신나게 미끄럼틀을 탔어요! 🎢✨",
          targetEmotion: "happy",
          targetEmotionName: "기쁨",
          targetEmoji: "😊",
          feedback: "맞아요! 재미있게 놀 때는 너무나 기쁘고 신나요!"
        },
        {
          story: "선생님께 칭찬 스티커를 받아서 뿌듯해요! ⭐👍",
          targetEmotion: "happy",
          targetEmotionName: "기쁨",
          targetEmoji: "😊",
          feedback: "정답이에요! 칭찬을 들으면 마음이 칭찬받아 기뻐요!"
        },

        // 화남 (Angry) 4가지 다양한 상황
        {
          story: "친구가 나를 속상하게 때렸어요! 💥",
          targetEmotion: "angry",
          targetEmotionName: "화남",
          targetEmoji: "😡",
          feedback: "맞았어요! 친구가 때리면 아프고 속상해서 화가 나요."
        },
        {
          story: "열심히 공들여 만든 블록 탑을 누군가 무너뜨렸어요! 🧱💥",
          targetEmotion: "angry",
          targetEmotionName: "화남",
          targetEmoji: "😡",
          feedback: "맞아요! 노력해서 만든 걸 무너뜨리면 매우 화가 나요."
        },
        {
          story: "내 순서인데 다른 사람이 얌체처럼 새치기했어요! 🧍‍♂️💢",
          targetEmotion: "angry",
          targetEmotionName: "화남",
          targetEmoji: "😡",
          feedback: "맞았어요. 차례를 지키지 않으면 화가 나는 것이 당연해요."
        },
        {
          story: "허락도 없이 내 소중한 장난감을 빼앗아갔어요! 🧸💢",
          targetEmotion: "angry",
          targetEmotionName: "화남",
          targetEmoji: "😡",
          feedback: "정답이에요! 남의 물건을 마음대로 가져가면 화가 나요."
        },

        // 슬픔 (Sad) 4가지 다양한 상황
        {
          story: "소중한 장난감을 잃어버렸어요... 🧸💧",
          targetEmotion: "sad",
          targetEmotionName: "슬픔",
          targetEmoji: "😢",
          feedback: "맞았어요. 아끼는 물건을 잃어버리면 마음이 슬퍼요."
        },
        {
          story: "놀이터에서 쿵 넘어져서 무릎이 너무 아파요... 🩹😢",
          targetEmotion: "sad",
          targetEmotionName: "슬픔",
          targetEmoji: "😢",
          feedback: "맞았어요. 다쳐서 아프면 슬프고 눈물이 나요."
        },
        {
          story: "비가 소나기처럼 와서 신나는 야외 소풍이 취소되었어요... ☔💧",
          targetEmotion: "sad",
          targetEmotionName: "슬픔",
          targetEmoji: "😢",
          feedback: "맞아요. 기대했던 일이 취소되면 속상하고 슬퍼요."
        },
        {
          story: "귀여운 아기 강아지가 아파서 병원에 갔어요... 🐶💧",
          targetEmotion: "sad",
          targetEmotionName: "슬픔",
          targetEmoji: "😢",
          feedback: "정답이에요. 아끼는 동물이 아프면 슬픈 마음이 들어요."
        },

        // 놀람 (Surprised) 4가지 다양한 상황
        {
          story: "갑자기 커다란 풍선이 팡! 하고 터졌어요! 🎈💥",
          targetEmotion: "surprised",
          targetEmotionName: "놀람",
          targetEmoji: "😲",
          feedback: "정답이에요! 갑작스러운 큰 소리에 깜짝 놀랐어요!"
        },
        {
          story: "어두운 마술 상자에서 짠! 하고 흰 토끼가 튀어나왔어요! 🐰✨",
          targetEmotion: "surprised",
          targetEmotionName: "놀람",
          targetEmoji: "😲",
          feedback: "맞았어요! 신기하고 우와! 하고 놀란 표정이에요!"
        },
        {
          story: "생일 파티에서 친구들이 팡파르 폭죽을 짠! 터뜨려주었어요! 🎉",
          targetEmotion: "surprised",
          targetEmotionName: "놀람",
          targetEmoji: "😲",
          feedback: "맞아요! 생각지도 못한 축하 이벤트에 깜짝 놀랐어요!"
        },
        {
          story: "창문 밖에서 번개가 치며 커다란 쿵! 소리가 났어요! ⚡",
          targetEmotion: "surprised",
          targetEmotionName: "놀람",
          targetEmoji: "😲",
          feedback: "정답이에요! 우르릉 쾅! 소리에 가슴이 쿵쾅 놀랐어요!"
        }
      ];
      // Randomly shuffle the situations so emotions are naturally mixed
      this.shuffleEmotions();
      this.emotionQuizIndex = 0;
      this.filterEmotion = 'all';
    }

    // Filter situations if user chose specific emotion filter
    const activeSituations = this.filterEmotion === 'all'
      ? this.emotionSituations 
      : this.emotionSituations.filter(s => s.targetEmotion === this.filterEmotion);

    const currentQuiz = activeSituations[this.emotionQuizIndex % activeSituations.length];
    const promptText = `상황 이야기: "${currentQuiz.story}" 이때 어떤 감정 얼굴이 어울릴까요?`;

    const emotionChoices = [
      { id: "happy", name: "기쁨", emoji: "😊", color: "#fefcbf" },
      { id: "sad", name: "슬픔", emoji: "😢", color: "#ebf8ff" },
      { id: "angry", name: "화남", emoji: "😡", color: "#fff5f5" },
      { id: "surprised", name: "놀람", emoji: "😲", color: "#faf5ff" }
    ];

    workspace.innerHTML = `
      <div class="activity-header">
        <div class="activity-header-text">
          <h2>😊 다양한 상황 속 감정 얼굴 찾기 (랜덤 섞어 풀기)</h2>
          <p>여러 가지 감정 상황이 무작위로 섞여서 출제됩니다! 이야기를 들은 후 어울리는 감정을 맞혀보세요.</p>
        </div>
        <button class="speak-btn" onclick="ttsManager.speak('${currentQuiz.story} 이때 어떤 감정이 들까요?')" title="이야기 다시 듣기">
          <i class="fa-solid fa-volume-high"></i>
        </button>
      </div>

      <!-- Emotion Filter & Shuffle Controls -->
      <div style="display:flex; justify-content:center; gap:0.5rem; flex-wrap:wrap; margin-bottom:1.2rem;">
        <button class="primary-btn ${this.filterEmotion === 'all' ? 'active' : ''}" 
                style="padding: 0.4rem 0.9rem; font-size: 0.9rem; background: ${this.filterEmotion === 'all' ? 'var(--primary-blue)' : '#e2e8f0'}; color: ${this.filterEmotion === 'all' ? '#fff' : '#4a5568'};"
                onclick="level1Manager.setEmotionFilter('all')">
          🔀 전체 감정 섞어서 풀기
        </button>
        <button class="primary-btn" 
                style="padding: 0.4rem 0.9rem; font-size: 0.9rem; background: #ed8936; color: #fff;"
                onclick="level1Manager.shuffleEmotions(true)">
          🎲 다시 섞기
        </button>
        <button class="primary-btn ${this.filterEmotion === 'happy' ? 'active' : ''}" 
                style="padding: 0.4rem 0.9rem; font-size: 0.9rem; background: ${this.filterEmotion === 'happy' ? '#d69e2e' : '#e2e8f0'}; color: ${this.filterEmotion === 'happy' ? '#fff' : '#4a5568'};"
                onclick="level1Manager.setEmotionFilter('happy')">
          😊 기쁨 퀴즈만
        </button>
        <button class="primary-btn ${this.filterEmotion === 'angry' ? 'active' : ''}" 
                style="padding: 0.4rem 0.9rem; font-size: 0.9rem; background: ${this.filterEmotion === 'angry' ? '#e53e3e' : '#e2e8f0'}; color: ${this.filterEmotion === 'angry' ? '#fff' : '#4a5568'};"
                onclick="level1Manager.setEmotionFilter('angry')">
          😡 화남 퀴즈만
        </button>
        <button class="primary-btn ${this.filterEmotion === 'sad' ? 'active' : ''}" 
                style="padding: 0.4rem 0.9rem; font-size: 0.9rem; background: ${this.filterEmotion === 'sad' ? '#3182ce' : '#e2e8f0'}; color: ${this.filterEmotion === 'sad' ? '#fff' : '#4a5568'};"
                onclick="level1Manager.setEmotionFilter('sad')">
          😢 슬픔 퀴즈만
        </button>
        <button class="primary-btn ${this.filterEmotion === 'surprised' ? 'active' : ''}" 
                style="padding: 0.4rem 0.9rem; font-size: 0.9rem; background: ${this.filterEmotion === 'surprised' ? '#805ad5' : '#e2e8f0'}; color: ${this.filterEmotion === 'surprised' ? '#fff' : '#4a5568'};"
                onclick="level1Manager.setEmotionFilter('surprised')">
          😲 놀람 퀴즈만
        </button>
      </div>

      <!-- Situation Story Card Box -->
      <div class="clip-theme-card" style="max-width: 680px; margin: 0 auto 1.8rem auto; padding: 2rem; text-align: center; background: white; border: 3px dashed var(--accent-peach); box-shadow: var(--shadow-md);">
        <span style="font-size: 0.95rem; font-weight: 700; color: #d69e2e; background: #fefcbf; padding: 0.3rem 0.9rem; border-radius: 20px; display: inline-block; margin-bottom: 0.8rem;">
          <i class="fa-solid fa-shuffle"></i> 섞여 나온 질문 (${(this.emotionQuizIndex % activeSituations.length) + 1}/${activeSituations.length})
        </span>
        <h3 style="font-size: 2.1rem; font-weight: 800; color: var(--text-main); line-height: 1.4;">
          "${currentQuiz.story}"
        </h3>
        <p style="font-size: 1.1rem; color: var(--text-muted); margin-top: 0.8rem;">
          이 상황일 때 나의 마음속 감정 얼굴은 무엇일까요?
        </p>
      </div>

      <!-- Emotion Choices Grid -->
      <div class="grid-4" style="max-width: 850px; margin: 0 auto; gap: 1.2rem;">
        ${emotionChoices.map(e => `
          <button class="clip-theme-card btn-choice emotion-quiz-btn" 
                  style="min-height: 170px; background: ${e.color}; border: 3px solid var(--border-color); text-align: center; cursor: pointer; transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1); display: flex; flex-direction: column; align-items: center; justify-content: center;"
                  onclick="level1Manager.checkEmotionMatch('${e.id}', '${currentQuiz.targetEmotion}', this, '${e.name}')">
            <div style="font-size: 4rem; line-height: 1; margin-bottom: 0.5rem;">${e.emoji}</div>
            <div style="font-size: 1.4rem; font-weight: 800; color: var(--text-main);">${e.name}</div>
          </button>
        `).join('')}
      </div>
    `;

    ttsManager.speak(`${currentQuiz.story} 이때 어떤 감정 얼굴이 맞을까요?`);
  }

  shuffleEmotions(userClicked = false) {
    if (userClicked && window.soundManager) soundManager.playClick();
    if (this.emotionSituations) {
      this.emotionSituations = this.shuffle(this.emotionSituations);
      this.emotionQuizIndex = 0;
    }
    if (userClicked) {
      const workspace = document.getElementById('level1SubWorkspace');
      if (workspace) this.renderEmotionCards(workspace);
      ttsManager.speak("감정 질문들을 무작위로 섞었습니다!");
    }
  }

  setEmotionFilter(filter) {
    if (window.soundManager) soundManager.playClick();
    this.filterEmotion = filter;
    this.emotionQuizIndex = 0;
    const workspace = document.getElementById('level1SubWorkspace');
    if (workspace) this.renderEmotionCards(workspace);
  }

  checkEmotionMatch(selectedEmotion, targetEmotion, btn, emotionName) {
    const activeSituations = this.filterEmotion === 'all'
      ? this.emotionSituations 
      : this.emotionSituations.filter(s => s.targetEmotion === this.filterEmotion);

    const currentQuiz = activeSituations[this.emotionQuizIndex % activeSituations.length];

    if (selectedEmotion === targetEmotion) {
      if (window.soundManager) soundManager.playCorrect();
      btn.style.transform = 'scale(1.1)';
      btn.style.borderColor = '#48bb78';
      btn.style.boxShadow = '0 0 20px rgba(72,187,120,0.5)';

      if (window.appState) appState.addStar(1);

      ttsManager.speak(currentQuiz.feedback);
      this.emotionQuizIndex++;

      setTimeout(() => {
        const workspace = document.getElementById('level1SubWorkspace');
        if (workspace && this.subActivities[this.currentSubIndex] === 'emotionCards') {
          this.renderEmotionCards(workspace);
        }
      }, 2000);
    } else {
      if (window.soundManager) soundManager.playWrong();
      btn.style.transform = 'shake(5px)';
      btn.style.borderColor = '#e53e3e';
      ttsManager.speak(`이 감정은 ${emotionName}이에요. 다시 이야기를 읽고 느껴보세요!`);
    }
  }

  /* --------------------------------------------------------------------------
     4. Shape Combination Creation Quiz (도형으로 사물 작품 만들기 0~3단계)
     -------------------------------------------------------------------------- */
  renderShapeMatch(workspace) {
    if (this.shapeCreationStage === undefined) {
      this.shapeCreationStage = 0; // Default to Stage 0 (Single shape search)
      this.shapeQuizIndex = { 0: 0, 1: 0, 2: 0, 3: 0 };
    }

    const shapeDataset = {
      0: [
        {
          title: "🔺 세모 모양 찾기",
          shapesCount: 1,
          components: ["세모 🔺 모양 사물"],
          question: "다음 중 '세모 🔺' 모양을 가진 사물은 어떤 것입니까?",
          correctChoice: "피자 조각 🍕",
          choices: [
            "피자 조각 🍕",
            "동그라미 시계 ⏰",
            "네모 칠판 📋"
          ],
          explanation: "맞아요! 피자 조각 🍕은 뾰족뾰족 3개의 변과 꼭짓점을 가진 세모 🔺 모양이에요!"
        },
        {
          title: "⚪ 동그라미 모양 찾기",
          shapesCount: 1,
          components: ["동그라미 ⚪ 모양 사물"],
          question: "다음 중 '동그라미 ⚪' 모양을 가진 사물은 어떤 것입니까?",
          correctChoice: "동그라미 시계 ⏰",
          choices: [
            "동그라미 시계 ⏰",
            "세모 삼각김밥 🍙",
            "네모 책 📖"
          ],
          explanation: "정답이에요! 째깍째깍 시계 ⏰는 모서리가 없이 둥근 동그라미 ⚪ 모양이에요!"
        },
        {
          title: "⬛ 네모 모양 찾기",
          shapesCount: 1,
          components: ["네모 ⬛ 모양 사물"],
          question: "다음 중 '네모 ⬛' 모양을 가진 사물은 어떤 것입니까?",
          correctChoice: "교실 칠판 📋",
          choices: [
            "교실 칠판 📋",
            "동그라미 축구공 ⚽",
            "세모 표지판 ⚠️"
          ],
          explanation: "딩동댕! 선생님이 글씨를 쓰시는 칠판 📋은 네 모서리가 반듯한 네모 ⬛ 모양이에요!"
        },
        {
          title: "🌟 별 모양 찾기",
          shapesCount: 1,
          components: ["별 🌟 모양 사물"],
          question: "다음 중 반짝이는 '별 🌟' 모양을 가진 사물은 어떤 것입니까?",
          correctChoice: "밤하늘 별 ⭐️",
          choices: [
            "밤하늘 별 ⭐️",
            "동그라미 사과 🍎",
            "네모 액자 🖼️"
          ],
          explanation: "맞았습니다! 밤하늘에 반짝반짝 빛나는 별 ⭐️은 다섯 개의 뾰족한 가지를 가진 별 🌟 모양이에요!"
        },
        {
          title: "🔷 마름모/연 모양 찾기",
          shapesCount: 1,
          components: ["마름모 🔷 모양 사물"],
          question: "다음 중 하늘로 바람을 타고 날아가는 '방패연 🪁'은 어떤 도형 모양입니까?",
          correctChoice: "마름모/다각형 🔷",
          choices: [
            "마름모/다각형 🔷",
            "동그라미 ⚪",
            "동그란 동전 🪙"
          ],
          explanation: "정답입니다! 방패연 🪁은 기울어진 뾰족 마름모 🔷 모양이에요!"
        }
      ],
      1: [
        {
          title: "달콤한 아이스크림 🍦",
          shapesCount: 2,
          components: ["세모 🔺 (콘)", "동그라미 ⚪ (스쿱)"],
          question: "아이스크림 🍦을 만들기 위해 필요한 도형 2개는 무엇일까요?",
          correctChoice: "세모 🔺 + 동그라미 ⚪",
          choices: [
            "세모 🔺 + 동그라미 ⚪",
            "네모 ⬛ + 동그라미 ⚪",
            "세모 🔺 + 네모 ⬛"
          ],
          explanation: "맞아요! 뾰족 세모 🔺 콘 위에 동그라미 ⚪ 아이스크림을 올리면 맛있는 아이스크림 완성!"
        },
        {
          title: "아늑한 집 🏠",
          shapesCount: 2,
          components: ["세모 🔺 (지붕)", "네모 ⬛ (집 몸통)"],
          question: "집 🏠을 만들기 위해 필요한 도형 2개는 무엇일까요?",
          correctChoice: "세모 🔺 + 네모 ⬛",
          choices: [
            "세모 🔺 + 네모 ⬛",
            "동그라미 ⚪ + 네모 ⬛",
            "세모 🔺 + 동그라미 ⚪"
          ],
          explanation: "맞았습니다! 네모 ⬛ 몸통 위에 세모 🔺 지붕을 올리면 예쁜 집이 완성이 돼요!"
        },
        {
          title: "달콤한 사탕 🍬",
          shapesCount: 2,
          components: ["동그라미 ⚪ (알사탕)", "세모 🔺 (포장지 매듭)"],
          question: "알사탕 🍬을 만들기 위해 필요한 도형 2개는 무엇일까요?",
          correctChoice: "동그라미 ⚪ + 세모 🔺",
          choices: [
            "동그라미 ⚪ + 세모 🔺",
            "네모 ⬛ + 네모 ⬛",
            "동그라미 ⚪ + 네모 ⬛"
          ],
          explanation: "정답이에요! 동그라미 ⚪ 알사탕에 세모 🔺 포장지 날개를 붙이면 사탕 완성!"
        },
        {
          title: "푸른 나무 🌲",
          shapesCount: 2,
          components: ["세모 🔺 (나뭇잎)", "긴 네모 ⬛ (나무 기둥)"],
          question: "나무 🌲를 만들기 위해 필요한 도형 2개는 무엇일까요?",
          correctChoice: "세모 🔺 + 네모 ⬛",
          choices: [
            "세모 🔺 + 네모 ⬛",
            "동그라미 ⚪ + 동그라미 ⚪",
            "네모 ⬛ + 네모 ⬛"
          ],
          explanation: "딩동댕! 길쭉한 네모 ⬛ 기둥에 뾰족 세모 🔺 나뭇잎을 올리면 소나무 완성!"
        },
        {
          title: "둥실둥실 풍선 🎈",
          shapesCount: 2,
          components: ["동그라미 ⚪ (풍선 몸통)", "작은 세모 🔺 (묶음 매듭)"],
          question: "풍선 🎈을 만들기 위해 필요한 도형 2개는 무엇일까요?",
          correctChoice: "동그라미 ⚪ + 세모 🔺",
          choices: [
            "동그라미 ⚪ + 세모 🔺",
            "네모 ⬛ + 세모 🔺",
            "동그라미 ⚪ + 네모 ⬛"
          ],
          explanation: "맞아요! 동그라미 ⚪ 몸통 아래에 작은 세모 🔺 매듭을 붙이면 풍선 완성!"
        }
      ],
      2: [
        {
          title: "도로 위의 신호등 🚦",
          shapesCount: 3,
          components: ["네모 ⬛ (신호등 틀)", "동그라미 🔴 (빨간불)", "동그라미 🟢 (초록불)"],
          question: "신호등 🚦을 만들기 위해 필요한 도형 3개는 무엇일까요?",
          correctChoice: "네모 1개 + 동그라미 2개",
          choices: [
            "네모 1개 + 동그라미 2개",
            "세모 2개 + 네모 1개",
            "동그라미 3개"
          ],
          explanation: "정답입니다! 긴 네모 ⬛ 틀 안에 빨강/초록 동그라미 ⚪ 2개를 넣으면 신호등 완성!"
        },
        {
          title: "귀여운 눈사람 ☃️",
          shapesCount: 3,
          components: ["동그라미 ⚪ (머리)", "동그라미 ⚪ (몸통)", "세모 🔺 (당근 코)"],
          question: "눈사람 ☃️을 만들기 위해 필요한 도형 3개는 무엇일까요?",
          correctChoice: "동그라미 2개 + 세모 1개",
          choices: [
            "동그라미 2개 + 세모 1개",
            "네모 2개 + 세모 1개",
            "동그라미 3개"
          ],
          explanation: "맞았어요! 동그라미 ⚪ 2개를 겹치고 주황 세모 🔺 당근 코를 붙이면 눈사람 완성!"
        },
        {
          title: "바다 위 돛단배 ⛵",
          shapesCount: 3,
          components: ["세모 🔺 (큰 돛)", "네모 ⬛ (배 몸통)", "세모 🔺 (작은 깃발)"],
          question: "돛단배 ⛵를 만들기 위해 필요한 도형 3개는 무엇일까요?",
          correctChoice: "세모 2개 + 네모 1개",
          choices: [
            "세모 2개 + 네모 1개",
            "동그라미 2개 + 네모 1개",
            "세모 3개"
          ],
          explanation: "딩동댕! 네모 ⬛ 배 위에 세모 🔺 돛 2개를 달면 파도를 가르는 돛단배 완성!"
        },
        {
          title: "알록달록 버섯 🍄",
          shapesCount: 3,
          components: ["세모 🔺 (버섯 갓)", "네모 ⬛ (버섯 기둥)", "동그라미 ⚪ (무늬)"],
          question: "버섯 🍄을 만들기 위해 필요한 도형 3개는 무엇일까요?",
          correctChoice: "세모 1개 + 네모 1개 + 동그라미 1개",
          choices: [
            "세모 1개 + 네모 1개 + 동그라미 1개",
            "네모 2개 + 동그라미 1개",
            "세모 3개"
          ],
          explanation: "맞았어요! 세모 🔺 갓, 네모 ⬛ 기둥, 동그라미 ⚪ 무늬가 합쳐져 예쁜 버섯 완성!"
        },
        {
          title: "헤엄치는 물고기 🐟",
          shapesCount: 3,
          components: ["세모 🔺 (몸통)", "세모 🔺 (꼬리 지느러미)", "세모 🔺 (등 지느러미)"],
          question: "물고기 🐟를 만들기 위해 필요한 도형 3개는 무엇일까요?",
          correctChoice: "세모 3개",
          choices: [
            "세모 3개",
            "동그라미 2개 + 네모 1개",
            "세모 1개 + 네모 2개"
          ],
          explanation: "정답입니다! 크고 작은 세모 🔺 3개가 모여 바닷속을 헤엄치는 물고기 완성!"
        }
      ],
      3: [
        {
          title: "씩씩한 로봇 🤖",
          shapesCount: 4,
          components: ["네모 ⬛ (머리)", "네모 ⬛ (몸통)", "동그라미 ⚪ (왼쪽 눈)", "동그라미 ⚪ (오른쪽 눈)"],
          question: "로봇 🤖을 만들기 위해 필요한 도형 4개는 무엇일까요?",
          correctChoice: "네모 2개 + 동그라미 2개",
          choices: [
            "네모 2개 + 동그라미 2개",
            "세모 2개 + 네모 2개",
            "동그라미 4개"
          ],
          explanation: "딩동댕! 네모 ⬛ 머리/몸통과 동그라미 ⚪ 눈 2개로 로봇을 멋지게 완성했어요!"
        },
        {
          title: "칙칙폭폭 기차 🚂",
          shapesCount: 4,
          components: ["네모 ⬛ (기차 몸체)", "네모 ⬛ (운전석)", "동그라미 ⚪ (앞 바퀴)", "동그라미 ⚪ (뒷 바퀴)"],
          question: "기차 🚂를 만들기 위해 필요한 도형 4개는 무엇일까요?",
          correctChoice: "네모 2개 + 동그라미 2개",
          choices: [
            "네모 2개 + 동그라미 2개",
            "세모 2개 + 동그라미 2개",
            "네모 4개"
          ],
          explanation: "정답이에요! 네모 ⬛ 2개와 쌩쌩 굴러가는 동그라미 ⚪ 바퀴 2개로 기차 완성!"
        },
        {
          title: "예쁜 방사형 꽃 🌻",
          shapesCount: 4,
          components: ["동그라미 🟡 (꽃술)", "세모 🔺 (왼쪽 꽃잎)", "세모 🔺 (오른쪽 꽃잎)", "긴 네모 🟩 (줄기)"],
          question: "꽃 🌻을 만들기 위해 필요한 도형 4개는 무엇일까요?",
          correctChoice: "동그라미 1개 + 세모 2개 + 네모 1개",
          choices: [
            "동그라미 1개 + 세모 2개 + 네모 1개",
            "세모 4개",
            "동그라미 2개 + 네모 2개"
          ],
          explanation: "맞았어요! 노란 동그라미 ⚪ 중심과 세모 🔺 꽃잎, 네모 ⬛ 줄기가 만나서 꽃 완성!"
        },
        {
          title: "우주로 날아가는 로켓 🚀",
          shapesCount: 4,
          components: ["세모 🔺 (뾰족 머리)", "긴 네모 ⬛ (로켓 몸통)", "세모 🔺 (왼쪽 날개)", "세모 🔺 (오른쪽 날개)"],
          question: "로켓 🚀을 만들기 위해 필요한 도형 4개는 무엇일까요?",
          correctChoice: "세모 3개 + 네모 1개",
          choices: [
            "세모 3개 + 네모 1개",
            "네모 3개 + 세모 1개",
            "동그라미 2개 + 세모 2개"
          ],
          explanation: "우와! 뾰족 세모 🔺 3개와 긴 네모 ⬛ 몸통이 합쳐져 우주 로켓이 되었어요!"
        },
        {
          title: "알록달록 나비 🦋",
          shapesCount: 4,
          components: ["긴 네모 ⬛ (나비 몸통)", "세모 🔺 (왼쪽 날개)", "세모 🔺 (오른쪽 날개)", "동그라미 ⚪ (날개 무늬)"],
          question: "나비 🦋를 만들기 위해 필요한 도형 4개는 무엇일까요?",
          correctChoice: "네모 1개 + 세모 2개 + 동그라미 1개",
          choices: [
            "네모 1개 + 세모 2개 + 동그라미 1개",
            "동그라미 4개",
            "세모 4개"
          ],
          explanation: "딩동댕! 길쭉한 네모 ⬛ 몸통에 세모 🔺 날개와 동그라미 ⚪ 무늬가 모여 나비 완성!"
        }
      ]
    };

    const currentStageList = shapeDataset[this.shapeCreationStage];
    if (!this.shapeQuizIndex) this.shapeQuizIndex = { 0: 0, 1: 0, 2: 0, 3: 0 };
    const currentIndex = (this.shapeQuizIndex[this.shapeCreationStage] || 0) % currentStageList.length;
    const currentQuiz = currentStageList[currentIndex];

    workspace.innerHTML = `
      <div class="activity-header">
        <div class="activity-header-text">
          <h2>🎨 도형 찾기 & 사물 작품 만들기 (0~3단계)</h2>
          <p>한 가지 도형 찾기(0단계)부터 2~4개 도형을 조합해 작품을 만드는 1~3단계 퀴즈입니다!</p>
        </div>
        <button class="speak-btn" onclick="ttsManager.speak('${currentQuiz.question}')" title="질문 음성 듣기">
          <i class="fa-solid fa-volume-high"></i>
        </button>
      </div>

      <!-- Stage Selector Tabs (0, 1, 2, 3) -->
      <div style="display:flex; justify-content:center; gap:0.6rem; flex-wrap:wrap; margin-bottom:1.5rem;">
        <button class="primary-btn ${this.shapeCreationStage === 0 ? 'active' : ''}" 
                style="padding: 0.5rem 1.1rem; font-size: 0.9rem; background: ${this.shapeCreationStage === 0 ? '#48bb78' : '#cbd5e0'};"
                onclick="level1Manager.setShapeStage(0)">
          🌱 0단계 (1가지 도형 찾기)
        </button>
        <button class="primary-btn ${this.shapeCreationStage === 1 ? 'active' : ''}" 
                style="padding: 0.5rem 1.1rem; font-size: 0.9rem; background: ${this.shapeCreationStage === 1 ? '#4299e1' : '#cbd5e0'};"
                onclick="level1Manager.setShapeStage(1)">
          🔹 1단계 (도형 2개 조합)
        </button>
        <button class="primary-btn ${this.shapeCreationStage === 2 ? 'active' : ''}" 
                style="padding: 0.5rem 1.1rem; font-size: 0.9rem; background: ${this.shapeCreationStage === 2 ? '#ed8936' : '#cbd5e0'};"
                onclick="level1Manager.setShapeStage(2)">
          🔸 2단계 (도형 3개 조합)
        </button>
        <button class="primary-btn ${this.shapeCreationStage === 3 ? 'active' : ''}" 
                style="padding: 0.5rem 1.1rem; font-size: 0.9rem; background: ${this.shapeCreationStage === 3 ? '#9f7aea' : '#cbd5e0'};"
                onclick="level1Manager.setShapeStage(3)">
          ⭐ 3단계 (도형 4개 조합)
        </button>
      </div>

      <!-- Creation Preview Card -->
      <div class="clip-theme-card" style="max-width: 680px; margin: 0 auto 1.5rem auto; padding: 2rem; text-align: center; background: white; border: 3px solid var(--primary-mint); box-shadow: var(--shadow-md);">
        <span style="font-size: 0.95rem; font-weight: 700; color: #2b6cb0; background: #ebf8ff; padding: 0.3rem 0.9rem; border-radius: 20px; display: inline-block; margin-bottom: 0.8rem;">
          ${this.shapeCreationStage}단계 (${this.shapeCreationStage === 0 ? '기본 1가지 도형 찾기' : '도형 ' + currentQuiz.shapesCount + '개 조합'}) - 문제 ${currentIndex + 1}/5
        </span>
        <h3 style="font-size: 2.3rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">
          ${currentQuiz.title}
        </h3>
        
        <!-- Shape Assembly Diagram -->
        <div style="background: #f7fafc; padding: 1rem; border-radius: 16px; margin: 1rem 0; border: 1px dashed #cbd5e0; display: flex; justify-content: center; gap: 0.8rem; flex-wrap: wrap;">
          ${currentQuiz.components.map(comp => `
            <span style="background: white; padding: 0.5rem 1rem; border-radius: 12px; font-weight: 700; font-size: 1.1rem; box-shadow: var(--shadow-sm); border: 1px solid var(--border-color);">
              ${comp}
            </span>
          `).join(' <span style="font-size:1.4rem; font-weight:800; color:#a0aec0;">+</span> ')}
        </div>

        <p style="font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin-top: 0.5rem;">
          ${currentQuiz.question}
        </p>
      </div>

      <!-- Choice Options Buttons Grid -->
      <div class="grid-3" style="max-width: 800px; margin: 0 auto; gap: 1rem;">
        ${this.shuffle(currentQuiz.choices).map(choice => `
          <button class="clip-theme-card btn-choice" 
                  style="min-height: 110px; background: white; border: 3px solid var(--border-color); padding: 1.2rem; font-size: 1.25rem; font-weight: 800; color: var(--text-main); cursor: pointer; transition: all 0.25s ease; display: flex; align-items: center; justify-content: center; text-align: center;"
                  onclick="level1Manager.checkShapeCreationChoice('${choice}', '${currentQuiz.correctChoice}', this, '${currentQuiz.explanation}')">
            ${choice}
          </button>
        `).join('')}
      </div>
    `;

    ttsManager.speak(currentQuiz.question);
  }

  setShapeStage(stage) {
    if (window.soundManager) soundManager.playClick();
    this.shapeCreationStage = stage;
    const workspace = document.getElementById('level1SubWorkspace');
    if (workspace) this.renderShapeMatch(workspace);
  }

  checkShapeCreationChoice(selected, correct, btn, explanation) {
    if (selected === correct) {
      if (window.soundManager) soundManager.playCorrect();
      btn.style.borderColor = '#48bb78';
      btn.style.background = '#f0fff4';
      btn.style.transform = 'scale(1.06)';

      if (window.appState) appState.addStar(1);

      ttsManager.speak(explanation);
      this.shapeQuizIndex[this.shapeCreationStage]++;

      setTimeout(() => {
        const workspace = document.getElementById('level1SubWorkspace');
        if (workspace && this.subActivities[this.currentSubIndex] === 'shapeMatch') {
          this.renderShapeMatch(workspace);
        }
      }, 2200);
    } else {
      if (window.soundManager) soundManager.playWrong();
      btn.style.borderColor = '#e53e3e';
      btn.style.background = '#fff5f5';
      btn.style.transform = 'shake(5px)';
      ttsManager.speak("다시 필요한 도형 개수와 종류를 관찰해 보세요!");
    }
  }

  /* --------------------------------------------------------------------------
     5. Animal & Plant Sorting (40 Problems)
     -------------------------------------------------------------------------- */
  setAnimalSortMode(mode) {
    if (window.soundManager) soundManager.playClick();
    this.animalSortMode = mode;
    const workspace = document.getElementById('level1SubWorkspace');
    if (workspace) this.renderAnimalPlantSort(workspace);
  }

  shuffleAnimalPlantDataset() {
    if (window.soundManager) soundManager.playClick();
    this.animalPlantDataset = this.shuffle(this.rawAnimalPlantDataset);
    this.animalPlantIndex = 0;
    const workspace = document.getElementById('level1SubWorkspace');
    if (workspace) this.renderAnimalPlantSort(workspace);
    ttsManager.speak("동식물 카드 40문제를 무작위로 다시 섞었습니다!");
  }

  nextAnimalPlantCard() {
    this.animalPlantIndex = (this.animalPlantIndex + 1) % this.animalPlantDataset.length;
    const workspace = document.getElementById('level1SubWorkspace');
    if (workspace) this.renderAnimalPlantSort(workspace);
  }

  prevAnimalPlantCard() {
    this.animalPlantIndex = (this.animalPlantIndex - 1 + this.animalPlantDataset.length) % this.animalPlantDataset.length;
    const workspace = document.getElementById('level1SubWorkspace');
    if (workspace) this.renderAnimalPlantSort(workspace);
  }

  renderAnimalPlantSort(workspace) {
    const total = this.animalPlantDataset.length;
    const currentItem = this.animalPlantDataset[this.animalPlantIndex % total];
    const promptText = `[문제 ${this.animalPlantIndex + 1}/${total}] ${currentItem.emoji} '${currentItem.name}'은(는) 동물일까요, 식물일까요? 알맞은 바구니에 담아보세요!`;

    workspace.innerHTML = `
      <div class="activity-header">
        <div class="activity-header-text">
          <h2>🐰🌿 동식물 구분하기 (${total}문제 카드 분류)</h2>
          <p>움직이는 동물과 땅에서 자라는 식물을 구분하여 알맞은 바구니에 담아주세요!</p>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <button class="speak-btn" onclick="ttsManager.speak('${promptText}')" title="음성 듣기">
            <i class="fa-solid fa-volume-high"></i>
          </button>
          <button class="primary-btn" style="background:#ed8936; padding:0.5rem 1rem; font-size:0.9rem;" onclick="level1Manager.shuffleAnimalPlantDataset()">
            <i class="fa-solid fa-shuffle"></i> 다시 섞기
          </button>
        </div>
      </div>

      <!-- Mode Switch Buttons -->
      <div style="display: flex; justify-content: center; gap: 0.8rem; margin-bottom: 1.5rem;">
        <button class="primary-btn ${this.animalSortMode === 'focus' ? 'active' : ''}" 
                style="padding: 0.5rem 1.2rem; font-size: 0.95rem; background: ${this.animalSortMode === 'focus' ? '#4299e1' : '#cbd5e0'};"
                onclick="level1Manager.setAnimalSortMode('focus')">
          🎯 1문제씩 집중 카드 퀴즈
        </button>
        <button class="primary-btn ${this.animalSortMode === 'grid' ? 'active' : ''}" 
                style="padding: 0.5rem 1.2rem; font-size: 0.95rem; background: ${this.animalSortMode === 'grid' ? '#38b2ac' : '#cbd5e0'};"
                onclick="level1Manager.setAnimalSortMode('grid')">
          🧺 6개씩 바구니 모아 분류
        </button>
      </div>

      ${this.animalSortMode === 'focus' ? this.renderAnimalFocusView(currentItem, total) : this.renderAnimalGridView(total)}
    `;

    ttsManager.speak(promptText);
  }

  renderAnimalFocusView(currentItem, total) {
    return `
      <!-- Single Item Focus Card -->
      <div class="clip-theme-card" style="max-width: 600px; margin: 0 auto; padding: 2.2rem; text-align: center; background: white; border: 3px solid #cbd5e0; box-shadow: var(--shadow-lg); position: relative;">
        <!-- Progress badge -->
        <span style="font-size: 0.95rem; font-weight: 700; color: #2b6cb0; background: #ebf8ff; padding: 0.3rem 0.9rem; border-radius: 20px; display: inline-block; margin-bottom: 1rem;">
          <i class="fa-solid fa-list-check"></i> 카드 진행도 (${this.animalPlantIndex + 1} / ${total})
        </span>

        <!-- Emoji Display -->
        <div style="font-size: 6rem; line-height: 1; margin: 0.8rem 0; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1)); transition: transform 0.3s ease;">
          ${currentItem.emoji}
        </div>

        <!-- Name & Description -->
        <h3 style="font-size: 2.5rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.3rem;">
          ${currentItem.name}
        </h3>
        <p style="font-size: 1.15rem; color: #718096; margin-bottom: 1.8rem; font-weight: 600;">
          "${currentItem.desc}"
        </p>

        <!-- Touch Buttons -->
        <div style="display: flex; gap: 1.2rem; justify-content: center; margin-top: 1rem;">
          <button class="clip-theme-card btn-choice" 
                  style="flex: 1; min-height: 100px; background: #ebf8ff; border: 3px solid #3182ce; color: #2b6cb0; padding: 1rem; font-size: 1.35rem; font-weight: 800; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.2s;"
                  onclick="level1Manager.checkSortCard('${currentItem.type}', 'animal', this, '${currentItem.name}')">
            <span style="font-size: 2rem; margin-bottom: 0.2rem;">🐾 🧺</span>
            동물 바구니
          </button>
          
          <button class="clip-theme-card btn-choice" 
                  style="flex: 1; min-height: 100px; background: #f0fff4; border: 3px solid #38a169; color: #276749; padding: 1rem; font-size: 1.35rem; font-weight: 800; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.2s;"
                  onclick="level1Manager.checkSortCard('${currentItem.type}', 'plant', this, '${currentItem.name}')">
            <span style="font-size: 2rem; margin-bottom: 0.2rem;">🌱 🪴</span>
            식물 바구니
          </button>
        </div>

        <!-- Navigation buttons -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.8rem; padding-top: 1rem; border-top: 1px dashed #e2e8f0;">
          <button class="secondary-btn" onclick="level1Manager.prevAnimalPlantCard()" style="padding: 0.4rem 1rem; font-size: 0.9rem;">
            ◀ 이전 카드
          </button>
          <span style="font-weight: 700; color: #4a5568;">⭐ 획득 점수: ${this.animalPlantScore}점</span>
          <button class="secondary-btn" onclick="level1Manager.nextAnimalPlantCard()" style="padding: 0.4rem 1rem; font-size: 0.9rem;">
            다음 카드 ▶
          </button>
        </div>
      </div>
    `;
  }

  renderAnimalGridView(total) {
    const pageSize = 6;
    const start = (this.animalGridPage * pageSize) % total;
    const pageItems = this.animalPlantDataset.slice(start, start + pageSize);

    return `
      <div style="max-width: 900px; margin: 0 auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <span style="font-weight: 700; color: var(--text-muted);">
            페이지 (${this.animalGridPage + 1} / ${Math.ceil(total / pageSize)}) - 총 ${total}개 중 ${start + 1}~${Math.min(start + pageSize, total)}번 항목
          </span>
          <div style="display: flex; gap: 0.5rem;">
            <button class="secondary-btn" onclick="level1Manager.changeGridPage(-1)">◀ 이전</button>
            <button class="secondary-btn" onclick="level1Manager.changeGridPage(1)">다음 ▶</button>
          </div>
        </div>

        <div class="grid-3" style="gap: 1.2rem;">
          ${pageItems.map(item => `
            <div class="clip-theme-card btn-choice" style="min-height: 170px; display: flex; flex-direction: column; align-items: center; justify-content: space-between; background: white; padding: 1.2rem; border: 2px solid var(--border-color);">
              <div style="font-size: 3.2rem; line-height: 1;">${item.emoji}</div>
              <div style="font-size: 1.3rem; font-weight: 800; color: var(--text-main); margin: 0.3rem 0;">${item.name}</div>
              <div style="font-size: 0.85rem; color: #718096; margin-bottom: 0.6rem;">${item.desc}</div>
              <div style="display: flex; gap: 0.4rem; width: 100%;">
                <button class="primary-btn" style="padding: 0.4rem; font-size: 0.8rem; flex: 1; background: #3182ce;" 
                        onclick="level1Manager.checkSortCard('${item.type}', 'animal', this, '${item.name}')">
                  🐾 동물
                </button>
                <button class="primary-btn" style="padding: 0.4rem; font-size: 0.8rem; flex: 1; background: #38a169;" 
                        onclick="level1Manager.checkSortCard('${item.type}', 'plant', this, '${item.name}')">
                  🌱 식물
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  changeGridPage(delta) {
    if (window.soundManager) soundManager.playClick();
    const totalPages = Math.ceil(this.animalPlantDataset.length / 6);
    this.animalGridPage = (this.animalGridPage + delta + totalPages) % totalPages;
    const workspace = document.getElementById('level1SubWorkspace');
    if (workspace) this.renderAnimalPlantSort(workspace);
  }

  checkSortCard(actual, chosen, btn, itemName) {
    if (actual === chosen) {
      if (window.soundManager) soundManager.playCorrect();
      btn.style.transform = 'scale(1.08)';
      btn.style.borderColor = '#38a169';
      btn.style.boxShadow = '0 0 15px rgba(56, 161, 105, 0.6)';

      this.animalPlantScore++;
      if (window.appState) appState.addStar(1);

      const label = actual === 'animal' ? '동물' : '식물';
      ttsManager.speak(`맞았습니다! ${itemName}은(는) ${label}입니다!`);

      if (this.animalSortMode === 'focus') {
        setTimeout(() => {
          this.nextAnimalPlantCard();
        }, 1600);
      }
    } else {
      if (window.soundManager) soundManager.playWrong();
      btn.style.transform = 'shake(5px)';
      btn.style.borderColor = '#e53e3e';
      const actualLabel = actual === 'animal' ? '동물' : '식물';
      ttsManager.speak(`다시 생각해보세요! ${itemName}은(는) ${actualLabel} 바구니로 들어가야 해요.`);
    }
  }
}

window.level1Manager = new Level1Manager();

