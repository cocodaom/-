/* ==========================================================================
   두리두리 (Duri-Duri) - AI Meta Prompt Generator & Quiz Simulator
   ========================================================================== */

class AiPromptManager {
  constructor() {
    this.topic = "공공장소 예절";
    this.difficulty = "초등 저학년 및 특수아동 수준";
  }

  render(container) {
    const promptText = "특수교육용 퀴즈 데이터셋을 자동 생성하기 위한 표준 AI 메타 프롬프트를 맞춤 설정하고 시뮬레이션해 보세요!";
    container.innerHTML = `
      <div class="activity-header">
        <div class="activity-header-text">
          <h2>🤖 AI 메타 프롬프트 생성기 & 퀴즈 시뮬레이터</h2>
          <p>${promptText}</p>
        </div>
        <button class="speak-btn" onclick="ttsManager.speak('${promptText}')"><i class="fa-solid fa-volume-high"></i></button>
      </div>

      <div class="grid-2" style="max-width:1050px; margin:0 auto;">
        <!-- Configurator Panel -->
        <div class="clip-theme-card" style="padding:1.5rem;">
          <h3 style="margin-bottom:1rem; font-size:1.3rem;"><i class="fa-solid fa-sliders"></i> 프롬프트 조건 설정</h3>
          
          <div style="margin-bottom:1rem;">
            <label style="font-weight:700; display:block; margin-bottom:0.3rem;">1. 학습 주제 선택:</label>
            <select id="promptTopicSelect" class="styled-select" style="width:100%;" onchange="aiPromptManager.updatePrompt()">
              <option value="공공장소 예절">공공장소 예절 (도서관, 버스, 식당)</option>
              <option value="학교생활 및 친구관계">학교생활 및 친구관계 (쉬는시간, 모둠활동)</option>
              <option value="교통안전 및 횡단보도">교통안전 및 횡단보도 건너기</option>
              <option value="감정 조절 및 화 해소">감정 조절 및 화 해소 방법</option>
            </select>
          </div>

          <div style="margin-bottom:1rem;">
            <label style="font-weight:700; display:block; margin-bottom:0.3rem;">2. 난이도 수준:</label>
            <select id="promptDiffSelect" class="styled-select" style="width:100%;" onchange="aiPromptManager.updatePrompt()">
              <option value="기초 인지 (그림 및 아주 쉬운 어휘)">기초 인지 (그림 및 아주 쉬운 어휘)</option>
              <option value="초등 저학년 및 특수아동 수준" selected>초등 저학년 및 특수아동 수준 (쉬운 어휘와 명확한 상황)</option>
              <option value="사회 자립 및 심화 단계">사회 자립 및 심화 단계</option>
            </select>
          </div>

          <div style="display:flex; gap:0.5rem; margin-top:1.5rem;">
            <button class="primary-btn" style="flex:1; justify-content:center;" onclick="aiPromptManager.copyToClipboard()">
              <i class="fa-solid fa-copy"></i> 프롬프트 복사
            </button>
            <button class="primary-btn pulse" style="flex:1; justify-content:center; background:#48bb78;" onclick="aiPromptManager.simulateAiGeneration()">
              <i class="fa-solid fa-wand-magic-sparkles"></i> AI 퀴즈 생성 시뮬레이션
            </button>
          </div>
        </div>

        <!-- Generated Prompt Template View -->
        <div class="clip-theme-card" style="padding:1.5rem; background:#1e293b; color:#f8fafc; font-family:monospace; position:relative;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem; border-bottom:1px solid #475569; padding-bottom:0.4rem;">
            <span style="color:#38bdf8; font-weight:700;">PROMPT_TEMPLATE.md</span>
            <span style="font-size:0.8rem; background:#334155; padding:0.2rem 0.5rem; border-radius:6px;">LLM 표준</span>
          </div>
          <pre id="promptPreviewBox" style="white-space:pre-wrap; font-size:0.88rem; line-height:1.5; color:#e2e8f0; height:320px; overflow-y:auto;"></pre>
        </div>
      </div>

      <!-- Live Simulated Quiz Output -->
      <div id="aiSimulatedQuizOutput" style="margin-top:2rem;"></div>
    `;

    this.updatePrompt();
    ttsManager.speak(promptText);
  }

  updatePrompt() {
    const topicElem = document.getElementById('promptTopicSelect');
    const diffElem = document.getElementById('promptDiffSelect');

    const topic = topicElem ? topicElem.value : "공공장소 예절";
    const diff = diffElem ? diffElem.value : "초등 저학년 및 특수아동 수준";

    const template = `[시스템 역할]
당신은 특수교육(발달장애, 인지치료) 전문가 및 아동 심리 교육 콘텐츠 크리에이터입니다.

[요청 사항]
특수아동의 인지 및 언어 발달을 돕기 위해 아래 조건에 맞는 3지선다형 상황 파악 퀴즈 데이터셋을 작성해 주세요.

1. 난이도: ${diff}
2. 주제: ${topic}
3. 출력 포맷 (JSON):
{
  "id": "quiz_01",
  "situation_text": "상황에 대한 짧고 쉬운 2-3문장 설명",
  "question": "아동에게 던질 명확한 질문",
  "options": [
    { "text": "정답 선택지 내용", "isCorrect": true, "feedback": "칭찬 메시지" },
    { "text": "오답 선택지 1", "isCorrect": false, "feedback": "부드러운 피드백" },
    { "text": "오답 선택지 2", "isCorrect": false, "feedback": "부드러운 피드백" }
  ]
}`;

    const box = document.getElementById('promptPreviewBox');
    if (box) box.innerText = template;
    this.currentPromptText = template;
  }

  copyToClipboard() {
    soundManager.playClick();
    if (navigator.clipboard && this.currentPromptText) {
      navigator.clipboard.writeText(this.currentPromptText);
      ttsManager.speak("프롬프트가 클립보드에 복사되었습니다!");
      alert("📋 AI 메타 프롬프트가 클립보드에 복사되었습니다! ChatGPT나 Gemini에 붙여넣어 활용하세요.");
    }
  }

  simulateAiGeneration() {
    soundManager.playCelebration();
    const topicElem = document.getElementById('promptTopicSelect');
    const topic = topicElem ? topicElem.value : "공공장소 예절";

    let sampleQuiz = {
      situation_text: "도서관에서 재미있는 그림책을 읽고 있어요. 그런데 배가 조금 고프고 음료수가 마시고 싶어졌어요.",
      question: "도서관 안에서 조용하게 지키는 올바른 행동은 무엇일까요?",
      options: [
        { text: "열람실 밖 휴게실이나 지정된 곳으로 나가서 음료수를 마신다.", isCorrect: true, feedback: "참 잘했어요! 도서관 책이 젖지 않도록 지정된 장소에서 먹어야 해요." },
        { text: "책상 위에서과자를 먹으며 가루를 흘린다.", isCorrect: false, feedback: "책이 더러워지면 다른 친구들이 읽을 수 없어요!" },
        { text: "음료수를 흘리며 쿵쿵 뛴다.", isCorrect: false, feedback: "도서관은 조용히 해야 하는 장소예요!" }
      ]
    };

    if (topic.includes("교통안전")) {
      sampleQuiz = {
        situation_text: "신호등이 있는 횡단보도 앞에 섰어요. 초록불이 켜지고 차들이 완전히 멈췄어요.",
        question: "길을 건널 때 가장 안전한 자세는 무엇일까요?",
        options: [
          { text: "손을 높이 들고 좌우를 살피며 천천히 건넌다.", isCorrect: true, feedback: "아주 훌륭해요! 운전자 아저씨가 나를 볼 수 있게 손을 들어야 해요." },
          { text: "핸드폰 게임을 보면서 그냥 뛴다.", isCorrect: false, feedback: "위험해요! 횡단보도에서는 차를 꼭 살펴야 해요." },
          { text: "장난감을 던지며 뛰어가서 줍는다.", isCorrect: false, feedback: "차도 근처에서 장난치면 위험해요!" }
        ]
      };
    }

    const output = document.getElementById('aiSimulatedQuizOutput');
    if (output) {
      output.innerHTML = `
        <div class="clip-theme-card" style="padding:2rem; background:#f0fdf4; border:3px solid #22c55e;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
            <h3 style="color:#15803d;"><i class="fa-solid fa-sparkles"></i> AI 자동 생성된 맞춤 퀴즈</h3>
            <span style="background:#dcfce7; color:#166534; padding:0.3rem 0.8rem; border-radius:12px; font-weight:700; font-size:0.85rem;">JSON 시뮬레이션 완료</span>
          </div>

          <div style="background:white; padding:1.25rem; border-radius:16px; margin-bottom:1.25rem; border:2px solid #bbf7d0;">
            <p style="font-size:1.15rem; font-weight:600; color:#1e293b;">"${sampleQuiz.situation_text}"</p>
            <h4 style="font-size:1.2rem; color:#0f172a; margin-top:0.75rem;">Q. ${sampleQuiz.question}</h4>
          </div>

          <div style="display:flex; flex-direction:column; gap:0.75rem;">
            ${sampleQuiz.options.map(opt => `
              <button class="btn-choice" style="text-align:left; padding:1rem;" onclick="aiPromptManager.testSimulatedAnswer(${opt.isCorrect}, '${opt.feedback}', this)">
                ${opt.isCorrect ? '⭕' : '❌'} ${opt.text}
              </button>
            `).join('')}
          </div>
        </div>
      `;
      ttsManager.speak(`AI가 생성한 새로운 퀴즈입니다! ${sampleQuiz.question}`);
    }
  }

  testSimulatedAnswer(isCorrect, feedback, btn) {
    if (isCorrect) {
      soundManager.playCorrect();
      btn.classList.add('correct');
      appState.addStar(1);
      ttsManager.speak(feedback);
    } else {
      soundManager.playWrong();
      btn.classList.add('wrong');
      ttsManager.speak(feedback);
    }
  }
}

window.aiPromptManager = new AiPromptManager();
