const PLAYER_PROFILE_KEY='hsrsim.profile.v1';
const PLAYER_RELIC_KEY='hsrsim.relics.v1';
const profileRelicValidator=typeof module!=='undefined'?require('./relic-model.js').validateRelic:validateRelic;
function roundCharacterSpeed(value){
  return value >= Math.floor(value) + 0.6 ? Math.ceil(value) : value;
}
function readPlayerData(storage,characters,sets){
  const parse=key=>{const value=JSON.parse(storage.getItem(key)||'[]');if(!Array.isArray(value))throw Error('Неверный формат сохранённых данных.');return value;};
  const relicIds=new Set();
  const inventory=parse(PLAYER_RELIC_KEY).map(r=>{
    if(!r||typeof r.id!=='string'||!r.id||relicIds.has(r.id))throw Error('Некорректные данные инвентаря.');
    relicIds.add(r.id);return {...profileRelicValidator(r,sets),id:r.id};
  });
  const characterIds=new Set(),equippedIds=new Set();let missingEquipment=0;
  const profiles=parse(PLAYER_PROFILE_KEY).map(p=>{
    if(!p||!characters.some(c=>c.id===p.characterId)||characterIds.has(p.characterId)||!p.equipment||typeof p.equipment!=='object'||Array.isArray(p.equipment))throw Error('Некорректные данные профиля.');
    characterIds.add(p.characterId);const equipment={};
    for(const [slot,id] of Object.entries(p.equipment)){
      if(!['1','2','3','4','5','6'].includes(slot)||typeof id!=='string')throw Error('Некорректный слот экипировки.');
      const relic=inventory.find(r=>r.id===id);
      if(!relic){missingEquipment++;continue;}
      const part=sets.find(s=>s.id===relic.setId)?.parts.find(p=>p.id===relic.partId);
      if(String(part?.slot)!==slot||equippedIds.has(id))throw Error('Некорректная экипировка в профиле.');
      equippedIds.add(id);equipment[slot]=id;
    }
    return {characterId:p.characterId,equipment};
  });
  return {profiles,inventory,missingEquipment};
}
function equipProfileRelic(profiles,characterId,slot,relicId,inventory,sets){
  if(!profiles.some(p=>p.characterId===characterId))throw Error('Добавьте персонажа в профиль.');
  if(!['1','2','3','4','5','6'].includes(String(slot)))throw Error('Неизвестный слот экипировки.');
  if(relicId){
    const relic=inventory.find(r=>r.id===relicId),part=sets.find(s=>s.id===relic?.setId)?.parts.find(p=>p.id===relic?.partId);
    if(String(part?.slot)!==String(slot))throw Error('Реликвия не подходит для этого слота.');
    if(profiles.some(p=>p.characterId!==characterId&&Object.values(p.equipment).includes(relicId)))throw Error('Реликвия уже надета на другого персонажа. Сначала снимите её.');
  }
  return profiles.map(p=>{
    const equipment={...p.equipment};if(p.characterId===characterId){if(relicId)equipment[slot]=relicId;else delete equipment[slot];}
    return {...p,equipment};
  });
}
function calculateEquippedCharacter(base,profile,inventory,sets){
  const bonuses={},equipped=[],counts={};
  for(const id of Object.values(profile.equipment)){
    const relic=inventory.find(r=>r.id===id);if(!relic)continue;
    equipped.push(relic);counts[relic.setId]=(counts[relic.setId]||0)+1;
    for(const stat of [{stat:relic.mainStat,value:relic.mainValue},...relic.substats])bonuses[stat.stat]=(bonuses[stat.stat]||0)+stat.value;
  }
  const combined={...base,profileCharacter:true,equippedCount:equipped.length,
    hp:Math.floor(base.hp*(1+(bonuses.hpPercent||0)/100)+(bonuses.hp||0)),
    atk:Math.floor(base.atk*(1+(bonuses.atkPercent||0)/100)+(bonuses.atk||0)),
    def:Math.floor(base.def*(1+(bonuses.defPercent||0)/100)+(bonuses.def||0)),
    spd:roundCharacterSpeed(base.spd+(bonuses.spd||0)),
    critRate:base.critRate+(bonuses.critRate||0)/100,
    critDamage:base.critDamage+(bonuses.critDamage||0)/100,
    effectHit:(bonuses.effectHit||0)/100,effectRes:(bonuses.effectRes||0)/100,
    breakEffect:(bonuses.breakEffect||0)/100,healing:(bonuses.healing||0)/100,
    energyRegen:1+(bonuses.energy||0)/100,
    elementalDamage:Object.fromEntries(['physical','fire','ice','lightning','wind','quantum','imaginary'].map(e=>[e,(bonuses[e]||0)/100])),
    setBonuses:[]};
  for(const [id,count] of Object.entries(counts)){
    const set=sets.find(s=>s.id===id);if(!set)continue;
    for(const bonus of set.bonuses)if(count>=bonus.count)combined.setBonuses.push({setName:set.name,...bonus});
  }
  return combined;
}
if(typeof module!=='undefined')module.exports={PLAYER_PROFILE_KEY,PLAYER_RELIC_KEY,readPlayerData,equipProfileRelic,calculateEquippedCharacter,roundCharacterSpeed};
