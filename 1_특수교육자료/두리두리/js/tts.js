/* ==========================================================================
   두리두리 (Duri-Duri) - Web Speech API Korean Text-To-Speech (TTS)
   ========================================================================== */

class TTSManager {
  constructor() {
    this.ttsEnabled = true;
    this.synth = window.speechSynthesis || null;
    this.koreanVoice = null;

    if (this.synth) {
      this.initVoice();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => this.initVoice();
      }
    }
  }

  initVoice() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    this.koreanVoice = voices.find(v => v.lang.includes('ko') || v.lang.includes('KO')) || voices[0] || null;
  }

  toggleTTS() {
    this.ttsEnabled = !this.ttsEnabled;
    if (!this.ttsEnabled && this.synth) {
      this.synth.cancel();
    }
    return this.ttsEnabled;
  }

  speak(text) {
    if (!this.ttsEnabled || !this.synth || !text) return;

    this.synth.cancel(); // Stop any previous speech

    // Clean emojis or special icons for speech
    const cleanText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ko-KR';
    utterance.rate = 0.9;  // Slightly relaxed rate for clarity
    utterance.pitch = 1.1; // Gentle friendly pitch

    if (this.koreanVoice) {
      utterance.voice = this.koreanVoice;
    }

    this.synth.speak(utterance);
  }
}

window.ttsManager = new TTSManager();
