function createSchedule(speeds, cycleCount) {
  if (speeds.length !== 2 || speeds.some(s => !Number.isFinite(s) || s < 1 || s > 1000) || !Number.isInteger(cycleCount) || cycleCount < 1 || cycleCount > 100) {
    throw new RangeError('SPD: 1–1000; количество циклов: 1–100.');
  }
  const cycles = Array.from({length: cycleCount}, (_, i) => ({start: i === 0 ? 0 : 150 + (i - 1) * 100, end: 150 + i * 100, turns: []}));
  const intervals = speeds.map(s => 10000 / s);
  const counts = [1, 1], turns = [];
  let cycle = 0;
  while (true) {
    const next = intervals.map((av, i) => av * counts[i]);
    const actor = next[0] <= next[1] + 1e-8 ? 0 : 1;
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
if (typeof module !== 'undefined') module.exports = {createSchedule};
