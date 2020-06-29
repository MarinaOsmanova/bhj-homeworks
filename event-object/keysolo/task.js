class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.countdown = container.querySelector('.countdown');

    this.reset();

    this.registerEvents();
  }

  reset() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  registerEvents() {
    let game = this;
    document.addEventListener('keypress', function(event){
      let currentSymbol = game.currentSymbol.textContent;
      if (event.key.toLowerCase() == currentSymbol.toLowerCase()) {
        game.success();
      } else {
        game.fail();
      }
    });
  }

  tickTimer(game) {
    game.restSeconds--;
    game.showCountdown();
    if (game.restSeconds < 1) {
      game.fail();
    }
  }

  showCountdown() {
    this.countdown.textContent = this.restSeconds;
  }

  success() {
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;
    if (this.currentSymbol !== null) {
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    }
    this.setNewWord();
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    }
    this.setNewWord();
  }

  setNewWord() {
    const word = this.getWord();

    this.renderWord(word);
    this.restSeconds = word.length;
    this.showCountdown();
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(this.tickTimer, 1000, this);
  }

  getWord() {
    const words = [
        'bob',
        'awesome',
        'netology',
        'hello',
        'kitty',
        'rock',
        'youtube',
        'popcorn',
        'cinema',
        'love',
        'javascript'
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game'))

