class Dobbelsteen {
    constructor() {
      this._aantalOgen = 1;
    }
    get aantalOgen() {
      return this._aantalOgen;
    }
    rol() {
      this._aantalOgen = Math.floor(Math.random() * 6) + 1;
    }
  }
  
  class Speler {
    constructor(naam) {
      this._naam = naam;
      this._score = 0;
      this._dobbelstenen = [];
      for (let index = 0; index < 5; index++) {
        this.dobbelstenen.push(new Dobbelsteen());
      }
    }
    get score() {
      return this._score;
    }
    get naam() {
      return this._naam;
    }
    get dobbelstenen() {
      return this._dobbelstenen;
    }
    speel() {
      for (const dobbelsteen of this._dobbelstenen) {
        dobbelsteen.rol();
        if (dobbelsteen.aantalOgen === 1) this._score += 100;
        else if (dobbelsteen.aantalOgen === 5) this._score += 50;
      }
    }
  }
  
  class Spel {
    constructor(spelers) {
      this._spelers = spelers;
      this._spelerAanZet = spelers[0];
    }
    get aantalSpelers() {
      return this._spelers.length;
    }
    get spelerAanZet() {
      return this._spelerAanZet;
    }
    get heeftWinnaar() {
      for (const speler of this._spelers) {
        if (speler.score >= 1000) return true;
      }
      return false;
    }
    get scoreOverzicht() {
      let resultaat = '';
      for (const speler of this._spelers) {
        resultaat += `${speler.naam}: ${speler.score}\n`;
      }
      return resultaat;
    }
    speel() {
      if (!this.heeftWinnaar) this._spelerAanZet.speel();
    }
    bepaalVolgendeSpeler() {
      if (!this.heeftWinnaar) {
        this._spelerAanZet = this._spelers[
          (this._spelers.indexOf(this._spelerAanZet) + 1) % this.aantalSpelers
        ];
      }
    }
  }
  
  function toHtml(spel) {
    document.getElementById('speler').innerHTML = `Speler aan zet: ${
      spel.spelerAanZet.naam
    }`;
    document.getElementById('score').innerHTML = `Score = ${
      spel.spelerAanZet.score
    }`;
    for (let index = 0; index < spel.spelerAanZet.dobbelstenen.length; index++) {
      document.getElementById(index + 1).src = `images/Dice${
        spel.spelerAanZet.dobbelstenen[index].aantalOgen
      }.png`;
    }
    if (spel.heeftWinnaar) {
      alert(
        `De winnaar is ${spel.spelerAanZet.naam}. Proficiat!\n${
          spel.scoreOverzicht
        }`
      );
    } else {
      if (document.getElementById('play').value === 'Rol dobbelstenen') {
        document.getElementById('play').value = 'Volgende speler';
        document.getElementById('play').onclick = function() {
          spel.bepaalVolgendeSpeler();
          toHtml(spel);
        };
      } else {
        document.getElementById('play').value = 'Rol dobbelstenen';
        document.getElementById('play').onclick = function() {
          spel.speel();
          toHtml(spel);
        };
      }
    }
  }
  
  function init() {
    const aantalSpelers = prompt('Met hoeveel spelers gaan we spelen?');
    const spelers = [];
    for (let index = 0; index < aantalSpelers; index++) {
      spelers.push(new Speler(prompt(`Geef naam van speler ${index + 1}`)));
    }
    const spel = new Spel(spelers);
    toHtml(spel);
    document.getElementById('play').onclick = function() {
      spel.speel();
      toHtml(spel);
    };
    document.getElementById('scorebord').onclick = function() {
      alert(spel.scoreOverzicht);
    };
  }
  
  window.onload = init;