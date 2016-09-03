class ColorSet {
  /**
   * Color Set
   * @param  {Array} gradition Array of colors
   */
  constructor(gradition) {
    this.gradition = gradition;
  }

  /**
   * Get random color from set
   * @return {[type]} [description]
   */
  getRandomColor() {
    return Engine.game.rnd.pick(this.gradition);
  }

  /**
   * Get color by number
   */
  getByNumber(number) {
    return this.gradition[number];
  }

  getLastColor() {
    return this.gradition[this.gradition.length - 1];
  }
}

ColorSet.GRADATIONS = [
  // indigo
  [
    0x3F51B5,
    0x3949AB,
    0x303F9F,
    0x283593,
  ],
  // blue
  [
    0x2196F3,
    0x1E88E5,
    0x1976D2,
    0x1565C0,
  ],
  // yellow
  [
    0xFFF176,
    0xFFEE58,
    0xFFEB3B,
    0xFDD835,
  ],
  // pink
  [
    0xE91E63,
    0xD81B60,
    0xC2185B,
    0xAD1457,
  ],
  // brown
  [
    0x795548,
    0x6D4C41,
    0x5D4037,
    0x4E342E,
  ],
  // // deeporange
  // [
  //   0xFF5722,
  //   0xF4511E,
  //   0xE64A19,
  //   0xD84315,
  // ],
  // grey
  [
    0x9E9E9E,
    0x757575,
    0x616161,
    0x424242,
  ],
  // // red
  // [
  //   0xF44336,
  //   0xE53935,
  //   0xD32F2F,
  //   0xC62828,
  // ],
];

Engine.ColorSet = ColorSet;
