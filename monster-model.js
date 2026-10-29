function getMonsterLevels(monster){
  return Object.keys(MONSTER_LEVELS[monster.scaling.group]||{}).map(Number).sort((a,b)=>a-b);
}
function monsterAtLevel(monster,level){
  const scaling=monster.scaling,ratios=MONSTER_LEVELS[scaling.group]?.[level];
  if(!Number.isInteger(level)||!ratios)throw new RangeError('Выберите доступный уровень противника.');
  return {...monster,level,
    hp:Math.max(1,Math.round(scaling.hp*ratios.hp)),atk:Math.round(scaling.atk*ratios.atk),def:Math.round(scaling.def*ratios.def),
    spd:Math.round(scaling.spd*ratios.spd+scaling.spdAdd),toughness:Math.round(scaling.toughness*ratios.toughness+scaling.toughnessAdd)};
}
