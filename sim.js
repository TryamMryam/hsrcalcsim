const fighters = [document.querySelector('#white'), document.querySelector('#red')];
const names = ['Белый круг', 'Красный круг'];
const status = document.querySelector('.status');
const nextButton = document.querySelector('#next');
const list = document.querySelector('#turns');
const formatAV = value => value.toLocaleString('ru-RU', {maximumFractionDigits: 2});
let health = [100, 100], schedule, position = 0, rows = [];

function renderHealth() {
  fighters.forEach((fighter, i) => {
    fighter.querySelector('.health-fill').style.width = `${health[i]}%`;
    fighter.querySelector('.health-value').textContent = `${health[i]}/100`;
    fighter.querySelector('.health').setAttribute('aria-valuenow', health[i]);
  });
}
function markNext() {
  rows.forEach(row => row.removeAttribute('aria-current'));
  if (rows[position] && !nextButton.disabled) rows[position].setAttribute('aria-current', 'step');
}
function renderSchedule() {
  list.replaceChildren();
  rows = [];
  schedule.cycles.forEach((cycle, i) => {
    const section = document.createElement('section');
    section.className = 'cycle';
    const heading = document.createElement('h3');
    heading.textContent = `Цикл ${i + 1} · ${cycle.end - cycle.start} AV · ${cycle.start}–${cycle.end} AV`;
    section.append(heading);
    const turns = document.createElement('ol');
    cycle.turns.forEach(turn => {
      const row = document.createElement('li');
      row.textContent = `${names[turn.actor]} · ${formatAV(turn.av)} AV`;
      turns.append(row);
      rows.push(row);
    });
    if (!cycle.turns.length) {
      const empty = document.createElement('p');
      empty.textContent = 'Нет ходов в этом цикле.';
      section.append(empty);
    } else section.append(turns);
    list.append(section);
  });
  markNext();
}
document.querySelector('#setup').addEventListener('submit', event => {
  event.preventDefault();
  const speeds = ['#white-spd', '#red-spd'].map(id => Number(document.querySelector(id).value));
  try {
    schedule = createSchedule(speeds, Number(document.querySelector('#cycles').value));
  } catch (error) {
    status.textContent = error.message;
    return;
  }
  health = [100, 100];
  position = 0;
  fighters.forEach((fighter, i) => {
    fighter.classList.remove('attacking', 'hit');
    fighter.querySelector('.fighter-stats').textContent = `SPD ${speeds[i]} · AV ${formatAV(schedule.intervals[i])}`;
  });
  renderHealth();
  nextButton.disabled = schedule.turns.length === 0;
  renderSchedule();
  status.textContent = nextButton.disabled ? 'Бой завершён: за выбранные циклы ни один персонаж не успевает сделать ход.' : 'Бой готов. Нажмите «Следующий ход».';
});
nextButton.addEventListener('click', () => {
  if (nextButton.disabled) return;
  const turn = schedule.turns[position], target = 1 - turn.actor;
  fighters.forEach(fighter => fighter.classList.remove('attacking', 'hit'));
  void fighters[turn.actor].offsetWidth;
  fighters[turn.actor].classList.add('attacking');
  fighters[target].classList.add('hit');
  health[target] = Math.max(0, health[target] - 1);
  renderHealth();
  rows[position].classList.add('completed');
  position++;
  status.textContent = `Цикл ${turn.cycle + 1} · ${formatAV(turn.av)} AV: ${names[turn.actor]} атакует. −1 HP.`;
  if (health[target] === 0) {
    nextButton.disabled = true;
    status.textContent += ` ${names[turn.actor]} победил!`;
    rows.slice(position).forEach(row => row.classList.add('cancelled'));
  } else if (position === schedule.turns.length) {
    nextButton.disabled = true;
    status.textContent += ' Все циклы завершены. Ничья.';
  }
  markNext();
});
