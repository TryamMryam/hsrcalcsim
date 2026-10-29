function createSchedule(speeds, cycleCount) {
  if (speeds.length < 2 || speeds.length > 9 || speeds.some(s => !Number.isFinite(s) || s < 0 || s > 1000) || !Number.isInteger(cycleCount) || cycleCount < 1 || cycleCount > 100) {
    throw new RangeError('SPD: 0–1000; количество циклов: 1–100.');
  }
  const cycles = Array.from({length: cycleCount}, (_, i) => ({start: i === 0 ? 0 : 150 + (i - 1) * 100, end: 150 + i * 100, turns: []}));
  const intervals = speeds.map(s => s === 0 ? Infinity : 10000 / s);
  const counts = speeds.map(() => 1), turns = [];
  let cycle = 0;
  while (true) {
    const next = intervals.map((av, i) => av * counts[i]);
    const actor = next.reduce((best, av, i) => av < next[best] - 1e-8 ? i : best, 0);
    const av = next[actor];
    if (av > cycles.at(-1).end + 1e-8) break;
    while (av > cycles[cycle].end + 1e-8) cycle++;
    const turn = {actor, av, cycle};
    cycles[cycle].turns.push(turn);
    turns.push(turn);
    counts[actor]++;
  }
  return {cycles, turns, intervals};
}
function findTarget(combatants, actor) {
  return combatants.findIndex(c => c.side !== combatants[actor].side && c.health > 0);
}
function battleWinner(combatants) {
  if (!combatants.some(c => c.side === 'enemy' && c.health > 0)) return 'ally';
  if (!combatants.some(c => c.side === 'ally' && c.health > 0)) return 'enemy';
  return null;
}
if (typeof module !== 'undefined') module.exports = {createSchedule, findTarget, battleWinner};
