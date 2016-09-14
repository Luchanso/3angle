class Tone {
  constructor(game) {
    this.game = game;
    this.current = 0;
  }

  create() {

  }

  /**
   * Up and play next tone
   */
  up() {
    if (this.current > Tone.count) {
      this.current = Tone.count - 1;
    }

    this.tones[this.current].play();
    this.current++;
  }

  low() {
    if (this.current < 0) {
      this.current = 0;
    }

    this.tones[this.current].play();
    this.current--;
  }

  /**
   * Reset tone
   */
  reset() {
    this.current = 0;
  }
}

Tone.count = 10;
Engine.Tone = Tone;
