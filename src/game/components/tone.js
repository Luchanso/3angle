class Tone {
  constructor(game) {
    this.game = game;
    this.current = 0;
    this.isMute = true;
  }

  create() {
    this.tones = [];
    for (let i = 0; i < Tone.count; i++) {
      let sound = this.game.add.sound('sound-note' + i, 0.5);
      this.tones.push(sound);
    }
  }

  /**
   * Up and play next tone
   */
  up() {
    if (this.current > Tone.count - 1) {
      this.current = Tone.count - 1;
    }

    if (!this.isMute) this.tones[this.current].play();
    this.current++;
  }

  low() {
    if (this.current < 0) {
      this.current = 0;
    }

    if (!this.isMute) this.tones[this.current].play();
    this.current--;
  }

  /**
   * Reset tone
   */
  reset() {
    this.current = 0;
  }
}

Tone.count = 12;
Engine.Tone = Tone;
