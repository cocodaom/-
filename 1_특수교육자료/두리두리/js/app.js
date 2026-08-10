/* ==========================================================================
   두리두리 (Duri-Duri) - Main Application Controller & State Manager
   ========================================================================== */

class AppState {
  constructor() {
    this.totalStars = parseInt(localStorage.getItem('duri_stars') || '0', 10);
    this.activeTab = 'curriculum';
    this.activeLevel = 1;
    this.activeShapeTheme = 'shape-rectangle';
    this.activeColorTheme = 'theme-default';
  }

  init() {
    this.updateStarsDisplay();
    this.bindEvents();
    this.loadLevel(1);
  }

  updateStarsDisplay() {
    const elem = document.getElementById('totalStarsCount');
    if (elem) elem.innerText = this.totalStars;
    localStorage.setItem('duri_stars', this.totalStars.toString());
  }

  addStar(count = 1) {
    this.totalStars += count;
    this.updateStarsDisplay();
  }

  bindEvents() {
    // Navigation Tabs
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        soundManager.playClick();
        const tabName = tab.getAttribute('data-tab');
        this.switchTab(tabName);
      });
    });

    // Level Cards
    const levelCards = document.querySelectorAll('.level-card');
    levelCards.forEach(card => {
      card.addEventListener('click', (e) => {
        soundManager.playClick();
        const levelNum = parseInt(card.getAttribute('data-level'), 10);
        this.loadLevel(levelNum);
      });
    });

    // Geometric Shape Theme Switcher
    const shapeSelect = document.getElementById('shapeThemeSelect');
    if (shapeSelect) {
      shapeSelect.addEventListener('change', (e) => {
        soundManager.playClick();
        document.body.classList.remove('shape-rectangle', 'shape-triangle', 'shape-pentagon', 'shape-octagon');
        document.body.classList.add(e.target.value);
        this.activeShapeTheme = e.target.value;
      });
    }

    // Color Palette Theme Switcher
    const colorSelect = document.getElementById('colorThemeSelect');
    if (colorSelect) {
      colorSelect.addEventListener('change', (e) => {
        soundManager.playClick();
        document.body.classList.remove('theme-default', 'theme-warm', 'theme-mint', 'theme-dark');
        document.body.classList.add(e.target.value);
        this.activeColorTheme = e.target.value;
      });
    }

    // Sound & TTS Toggles
    const btnSound = document.getElementById('btnToggleSound');
    if (btnSound) {
      btnSound.addEventListener('click', () => {
        const enabled = soundManager.toggleSound();
        btnSound.classList.toggle('active', enabled);
        btnSound.innerHTML = enabled ? '<i class="fa-solid fa-volume-high"></i>' : '<i class="fa-solid fa-volume-xmark"></i>';
      });
    }

    const btnTTS = document.getElementById('btnToggleTTS');
    if (btnTTS) {
      btnTTS.addEventListener('click', () => {
        const enabled = ttsManager.toggleTTS();
        btnTTS.classList.toggle('active', enabled);
        btnTTS.innerHTML = enabled ? '<i class="fa-solid fa-comment-dots"></i>' : '<i class="fa-solid fa-comment-slash"></i>';
      });
    }

    // Celebration Modal Close
    const closeBtn = document.getElementById('modalCloseBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        soundManager.playClick();
        this.hideCelebrationModal();
      });
    }

    // Brand Logo Click -> Reset to Home
    const logo = document.getElementById('brandLogo');
    if (logo) {
      logo.addEventListener('click', () => {
        soundManager.playClick();
        this.switchTab('curriculum');
        this.loadLevel(1);
      });
    }
  }

  switchTab(tabName) {
    this.activeTab = tabName;

    // Update Nav Buttons UI
    document.querySelectorAll('.nav-tab').forEach(t => {
      t.classList.toggle('active', t.getAttribute('data-tab') === tabName);
    });

    // Update Tab Pages UI
    document.querySelectorAll('.tab-page').forEach(p => {
      p.classList.toggle('active', p.id === `tab-${tabName}`);
    });

    // Trigger sub-renderers
    if (tabName === 'curriculum') {
      this.loadLevel(this.activeLevel);
    } else if (tabName === 'self-management') {
      const container = document.getElementById('selfManagementArea');
      if (container && window.selfManagementManager) selfManagementManager.render(container);
    } else if (tabName === 'appendix') {
      const container = document.getElementById('appendixArea');
      if (container && window.appendixManager) appendixManager.render(container);
    } else if (tabName === 'ai-prompt') {
      const container = document.getElementById('aiPromptArea');
      if (container && window.aiPromptManager) aiPromptManager.render(container);
    }
  }

  loadLevel(levelNum) {
    this.activeLevel = levelNum;

    // Highlight Level Card
    document.querySelectorAll('.level-card').forEach(card => {
      const num = parseInt(card.getAttribute('data-level'), 10);
      card.classList.toggle('active', num === levelNum);
    });

    const container = document.getElementById('curriculumActivityArea');
    if (!container) return;

    if (levelNum === 1 && window.level1Manager) level1Manager.render(container);
    else if (levelNum === 2 && window.level2Manager) level2Manager.render(container);
    else if (levelNum === 3 && window.level3Manager) level3Manager.render(container);
    else if (levelNum === 4 && window.level4Manager) level4Manager.render(container);
    else if (levelNum === 5 && window.level5Manager) level5Manager.render(container);
    else if (levelNum === 6 && window.level6Manager) level6Manager.render(container);
  }

  showCelebrationModal(title, msg) {
    const modal = document.getElementById('celebrationModal');
    const titleElem = document.getElementById('modalTitle');
    const msgElem = document.getElementById('modalMsg');

    if (titleElem) titleElem.innerText = title || "참 잘했어요!";
    if (msgElem) msgElem.innerText = msg || "문제를 멋지게 해결했어요!";

    if (modal) modal.classList.remove('hidden');
  }

  hideCelebrationModal() {
    const modal = document.getElementById('celebrationModal');
    if (modal) modal.classList.add('hidden');
  }
}

// Initialize application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.appState = new AppState();
  window.appState.init();
});
