class Lvl {
  constructor(caller) {
    if (caller !== Lvl) {
      throw 'Its singleton class, try use Lvl.instance'
    }
  }

  static get instance() {
    if (!Lvl._instance) {
      Lvl._instance = new Lvl(Lvl);
    }

    return Lvl._instance;
  }
}

Engine.Lvl = Lvl;
