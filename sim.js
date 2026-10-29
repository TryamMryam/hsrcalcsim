const fighters = [document.querySelector('#white'), document.querySelector('#red')];
const names = ['Белый круг', 'Красный круг'];
const status = document.querySelector('.status');
let health;
let turn;
let timer;

function render() {
  fighters.forEach((fighter, index) => {
    fighter.querySelector('.health-fill').style.width = `${health[index]}%`;
    fighter.querySelector('.health-value').textContent = `${health[index]}/100`;
    fighter.querySelector('.health').setAttribute('aria-valuenow', health[index]);
  });
}

function attack() {
  const target = 1 - turn;
  fighters.forEach(fighter => fighter.classList.remove('attacking', 'hit'));
  health[target] = Math.max(0, health[target] - 1);
  fighters[turn].classList.add('attacking');
  fighters[target].classList.add('hit');
  render();
  if (health[target] === 0) {
    clearInterval(timer);
    status.textContent = `${names[turn]} победил! Бой окончен.`;
  } else {
    status.textContent = `${names[turn]} атакует. −1 HP. Следующим атакует ${names[target].toLowerCase()}.`;
    turn = target;
  }
}

function restart() {
  clearInterval(timer);
  health = [100, 100];
  turn = 0;
  fighters.forEach(fighter => fighter.classList.remove('attacking', 'hit'));
  render();
  status.textContent = 'Бой начинается. Первым атакует белый круг.';
  timer = setInterval(attack, 1000);
}

document.querySelector('#restart').addEventListener('click', restart);
restart();
