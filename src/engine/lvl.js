class Lvl {
  constructor(caller) {
    if (caller !== Lvl) {
      throw 'Its singleton class, try use Lvl.instance'
    }

    let rowData = window.localStorage.getItem('lvl');
    let data = null;

    if (rowData !== null) {
      data = JSON.parse(rowData);
    } else {
      data = {
        current: 1,
        opened: [1, 2, 3, 4],
        done: [],
      };

      window.localStorage.setItem('lvl', JSON.stringify(data));
    }

    this.current = data.current;
    this.opend = data.opened;
    this.done = data.done;
  }

  static get instance() {
    if (!Lvl._instance) {
      Lvl._instance = new Lvl(Lvl);
    }

    return Lvl._instance;
  }
}

Engine.Lvl = Lvl;
