class Log {
  static init() {
    this.startTime = new Date();
  }

  static write(part, msg) {
    let time = (new Date() - this.startTime) / 1000;
    console.log(`[${time} sec] [${part}] ${msg}`);
  }
}

Engine.Log = Log;
