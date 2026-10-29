const RELIC_STATS = {
  hp:{name:'HP',percent:false},atk:{name:'ATK',percent:false},def:{name:'DEF',percent:false},
  hpPercent:{name:'HP',percent:true},atkPercent:{name:'ATK',percent:true},defPercent:{name:'DEF',percent:true},
  spd:{name:'SPD',percent:false},critRate:{name:'Крит. шанс',percent:true},critDamage:{name:'Крит. урон',percent:true},
  effectHit:{name:'Шанс попадания эффектов',percent:true},effectRes:{name:'Сопротивление эффектам',percent:true},
  breakEffect:{name:'Эффект пробития',percent:true},healing:{name:'Бонус лечения',percent:true},energy:{name:'Восстановление энергии',percent:true},
  physical:{name:'Physical DMG',percent:true},fire:{name:'Fire DMG',percent:true},ice:{name:'Ice DMG',percent:true},
  lightning:{name:'Lightning DMG',percent:true},wind:{name:'Wind DMG',percent:true},quantum:{name:'Quantum DMG',percent:true},imaginary:{name:'Imaginary DMG',percent:true}
};
const RELIC_SLOTS={1:'Голова',2:'Руки',3:'Тело',4:'Ноги',5:'Планарная сфера',6:'Соединительная верёвка'};
const RELIC_MAIN_STATS={
  1:['hp'],2:['atk'],3:['hpPercent','atkPercent','defPercent','critRate','critDamage','effectHit','healing'],
  4:['hpPercent','atkPercent','defPercent','spd'],
  5:['hpPercent','atkPercent','defPercent','physical','fire','ice','lightning','wind','quantum','imaginary'],
  6:['hpPercent','atkPercent','defPercent','breakEffect','energy']
};
const RELIC_SUB_STATS=['hp','atk','def','hpPercent','atkPercent','defPercent','spd','critRate','critDamage','effectHit','effectRes','breakEffect'];
function validateRelic(input,sets) {
  const set=sets.find(s=>s.id===input.setId),part=set?.parts.find(p=>p.id===input.partId);
  if(!set||!part)throw Error('Выберите набор и часть реликвии.');
  const rarity=Number(input.rarity),level=Number(input.level);
  if(![3,4,5].includes(rarity)||!Number.isInteger(level)||level<0||level>rarity*3)throw Error('Уровень: 0–9 для 3★, 0–12 для 4★, 0–15 для 5★.');
  if(!RELIC_MAIN_STATS[part.slot]?.includes(input.mainStat))throw Error('Основная характеристика недоступна для этой части.');
  const mainValue=Number(input.mainValue);
  if(!Number.isFinite(mainValue)||mainValue<=0)throw Error('Введите положительное значение основной характеристики.');
  if(!Array.isArray(input.substats)||input.substats.length>4)throw Error('Можно добавить не более четырёх дополнительных характеристик.');
  const used=new Set([input.mainStat]);
  const substats=input.substats.map(s=> {
    const value=Number(s.value);
    if(!RELIC_SUB_STATS.includes(s.stat)||!Number.isFinite(value)||value<=0)throw Error('Выберите дополнительную характеристику и введите положительное значение.');
    if(used.has(s.stat))throw Error('Характеристики не должны повторяться или совпадать с основной.');
    used.add(s.stat);return {stat:s.stat,value};
  });
  return {setId:set.id,partId:part.id,rarity,level,mainStat:input.mainStat,mainValue,substats};
}
if(typeof module!=='undefined')module.exports={RELIC_STATS,RELIC_SLOTS,RELIC_MAIN_STATS,RELIC_SUB_STATS,validateRelic};
