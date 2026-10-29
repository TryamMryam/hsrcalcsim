// Integration checks for selection, restarting, and full battles without a browser.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
class Element {
  constructor() {
    this.children=[]; this.attributes={}; this.style={}; this.listeners={}; this.value='';
    const classes=new Set();
    this.classList={add:(...s)=>s.forEach(c=>classes.add(c)),remove:(...s)=>s.forEach(c=>classes.delete(c)),toggle:(c,on)=>on?classes.add(c):classes.delete(c)};
  }
  append(...items) { this.children.push(...items); }
  prepend(...items) { this.children.unshift(...items); }
  replaceChildren() { this.children=[]; }
  setAttribute(k,v) { this.attributes[k]=String(v); }
  removeAttribute(k) { delete this.attributes[k]; }
  addEventListener(k,fn) { this.listeners[k]=fn; }
  querySelector(s) { return (this.parts??={})[s]??=((new Element())); }
  click() { if(!this.disabled) (this.onclick || this.listeners.click)?.(); }
}
const elements=new Map();
const document={querySelector:s=>{if(!elements.has(s))elements.set(s,new Element());return elements.get(s);},createElement:()=>new Element()};
const battleStorage=new Map();
const context=vm.createContext({document,console,setTimeout:()=>1,clearTimeout:()=>{},localStorage:{getItem:key=>battleStorage.get(key)??null,setItem:(key,value)=>battleStorage.set(key,value)}});
for(const file of ['characters.js','toughness.js','character-icon.js','monsters.js','monster-levels.js','monster-model.js','character-details.js','relics.js','relic-model.js','profile-model.js','battle.js','damage.js','sim.js']) vm.runInContext(fs.readFileSync(file,'utf8'),context);
vm.runInContext('Math.random=()=>0.99',context);
const get=s=>document.querySelector(s);
const isActive=()=>vm.runInContext('battleActive',context);
function takeTurn() {
  if(!get('#basic-attack').disabled) get('#basic-attack').click();
  else { assert.equal(get('#next').disabled,false);get('#next').click(); }
}
assert.equal(get('#start').disabled,true);
for(let i=0;i<4;i++)get('#characters').children[i].click();
assert.equal(get('#characters').children[4].disabled,true);
assert.equal(get('#start').disabled,true);
for(let i=0;i<5;i++)get('#monsters').children[0].click();
assert.equal(get('#enemy-count').textContent,'5/5');
assert.ok(get('#monsters').children.every(c=>c.disabled));
assert.equal(get('#start').disabled,false);
get('#cycles').value='2';
const start=()=>get('#setup').listeners.submit({preventDefault(){}});
start();
assert.equal(get('#allies').children.length,4);
assert.equal(get('#enemies').children.length,5);
takeTurn();
get('#selected-enemies').children[0].children[0].click();
assert.equal(get('#enemy-count').textContent,'4/5');
assert.equal(get('#enemies').children.length,5); // current battle remains unchanged
get('#monster-search').value='nonexistent monster';
get('#monster-search').listeners.input();
assert.equal(get('#monsters').children.length,0);
start();
assert.equal(get('#enemies').children.length,4);
vm.runInContext('combatants.filter(c=>c.side === "enemy").forEach(c=>c.health=1)',context);
let steps=0;
while(isActive() && steps++<100)takeTurn();
assert.ok(steps<100);
assert.ok(get('.status').textContent.includes('Победа отряда!'));
start();
vm.runInContext('combatants.filter(c=>c.side === "ally").forEach(c=>c.health=1)',context);
steps=0;
while(isActive() && steps++<100)takeTurn();
assert.ok(steps<100);
assert.ok(get('.status').textContent.includes('Поражение отряда.'));
console.log('Passed: 4 allies / 5 duplicate enemies, selection limits, search, independent setup, restart, victory and defeat.');
// Toughness is reduced only by matching allied elements, and resets on restart.
vm.runInContext('selected.splice(0,selected.length,"1001"); selectedMonsters.splice(0,selectedMonsters.length,MONSTERS[0].id,MONSTERS[0].id)',context);
get('#cycles').value='10';
start();
const read=code=>vm.runInContext(code,context);
const initialToughness=read('combatants[1].toughness');
const enemyCard=get('#enemies').children[0];
assert.equal(enemyCard.children[0].className,'toughness');
assert.equal(enemyCard.querySelector('.toughness-value').textContent,`${initialToughness}/${initialToughness}`);
assert.equal(enemyCard.querySelector('.toughness-fill').style.width,'100%');
function alliedAttack() {
  while(isActive() && read('combatants[schedule.turns[position].actor].side')!=='ally')takeTurn();
  assert.equal(get('#basic-attack').disabled,false);
  takeTurn();
}
const expectedFirstDamage=read('calculateSkillDamage(combatants[0],combatants[1],{components:[combatants[0].basicDamageSpec.primary],type:"basic",element:combatants[0].element}).damage');
alliedAttack(); // March 7th's Ice does not match Ice Edge's Fire / Lightning weaknesses.
assert.equal(read('combatants[1].remainingToughness'),initialToughness);
assert.equal(read('combatants[1].health'),read('combatants[1].hp')-expectedFirstDamage);
vm.runInContext('combatants[0].element="Lightning"',context);
alliedAttack();
assert.equal(read('combatants[1].remainingToughness'),initialToughness-10);
assert.equal(read('combatants[2].remainingToughness'),initialToughness);
assert.equal(enemyCard.querySelector('.toughness').attributes['aria-valuenow'],String(initialToughness-10));
assert.equal(enemyCard.querySelector('.toughness-value').textContent,`${initialToughness-10}/${initialToughness}`);
assert.ok(get('.status').textContent.includes('−10 стойкости.'));
vm.runInContext('combatants[1].remainingToughness=1',context);
alliedAttack(); alliedAttack();
assert.equal(read('combatants[1].remainingToughness'),0);
assert.equal(enemyCard.querySelector('.toughness-fill').style.width,'0%');
start();
assert.equal(read('combatants[1].remainingToughness'),initialToughness);
vm.runInContext('selectedMonsters.splice(0,selectedMonsters.length,MONSTERS.find(m=>m.toughness===0).id)',context);
start();
assert.equal(get('#enemies').children[0].querySelector('.toughness-value').textContent,'0/0');
assert.equal(get('#enemies').children[0].querySelector('.toughness-fill').style.width,'0%');
console.log('Passed: toughness bar, element matching, Lightning, independent enemies, zero floor, restart and zero initial toughness.');
// Formula and action gating: one click is one action; enemy and ally controls are exclusive.
const {calculateToughnessReduction,toToughnessUnits}=require('./toughness.js');
assert.equal(toToughnessUnits(30),10);
assert.equal(calculateToughnessReduction(10),10);
assert.ok(Math.abs(calculateToughnessReduction(10,{additive:2,increase:0.5,breakEfficiency:0.5,vulnerability:0.25,abilityMultiplier:0.8})-25.2)<1e-9);
assert.equal(calculateToughnessReduction(10,{abilityMultiplier:0}),0);
assert.equal(calculateToughnessReduction(0),0);
vm.runInContext('selectedMonsters.splice(0,selectedMonsters.length,MONSTERS[0].id)',context);
start();
assert.equal(read('combatants[1].toughness'),read('MONSTERS[0].toughness / 3'));
assert.equal(get('#basic-attack').disabled,true); // Ice Edge is faster than March.
assert.equal(get('#next').disabled,false);
let before=read('position');
get('#basic-attack').click();assert.equal(read('position'),before);
get('#next').click();
assert.equal(read('position'),before+1);
assert.equal(get('#basic-attack').disabled,false);
assert.equal(get('#next').disabled,true);
before=read('position');
get('#next').click();get('#skill').click();get('#ultimate').click();
assert.equal(read('position'),before);
assert.equal(get('#skill').disabled,true);
assert.equal(get('#ultimate').disabled,true);
vm.runInContext('combatants[0].element="Fire";combatants[0].weaknessBreakEfficiency=0.5',context);
const healthBefore=read('combatants[1].health');
const expectedBasicDamage=read('calculateSkillDamage(combatants[0],combatants[1],{components:[combatants[0].basicDamageSpec.primary],type:"basic",element:combatants[0].element}).damage');
get('#basic-attack').click();
assert.equal(read('combatants[1].health'),healthBefore-expectedBasicDamage);
assert.equal(read('combatants[1].remainingToughness'),5); // 20 - 10 × 1.5
assert.equal(read('position'),before+1);
start(); // restart clears modifiers and restores bars
assert.equal(read('combatants[0].weaknessBreakEfficiency'),undefined);
assert.equal(read('combatants[1].remainingToughness'),20);
get('#cycles').value='1';
start();
while(isActive())takeTurn();
assert.equal(get('#basic-attack').disabled,true);
assert.equal(get('#next').disabled,true);
const endedPosition=read('position');
get('#basic-attack').click();get('#next').click();assert.equal(read('position'),endedPosition);
console.log('Passed: formula modifiers, wiki unit conversion, action gating, calculated HP damage per basic attack, restart and end-of-battle controls.');
// Saved profile equipment is used by the battle and only refreshed on restart.
const profileEquipment=[
 {id:'profile-head',setId:'124',partId:'31241',rarity:5,level:15,mainStat:'hp',mainValue:100,substats:[]},
 {id:'profile-boots',setId:'124',partId:'31244',rarity:5,level:15,mainStat:'spd',mainValue:25,substats:[]}
];
battleStorage.set('hsrsim.relics.v1',JSON.stringify(profileEquipment));
battleStorage.set('hsrsim.profile.v1',JSON.stringify([{characterId:'1001',equipment:{1:'profile-head',4:'profile-boots'}}]));
get('#character-source').value='profile';get('#character-source').listeners.change();
assert.equal(get('#characters').children.length,1);
get('#characters').children[0].click();
get('#cycles').value='5';start();
assert.equal(read('combatants[0].hp'),1158);
assert.equal(read('combatants[0].spd'),126);
assert.equal(read('schedule.turns[0].actor'),0);
assert.equal(read('combatants[0].profileCharacter'),true);
assert.ok(Math.abs(read('schedule.intervals[0]')-10000/126)<1e-9);
profileEquipment[1].mainValue=40;battleStorage.set('hsrsim.relics.v1',JSON.stringify(profileEquipment));
assert.equal(read('combatants[0].spd'),126);start();assert.equal(read('combatants[0].spd'),141);
battleStorage.set('hsrsim.relics.v1',JSON.stringify(profileEquipment.slice(0,1)));start();
assert.equal(read('combatants[0].spd'),101);assert.equal(read('combatants[0].hp'),1158);
battleStorage.set('hsrsim.profile.v1','[]');start();
assert.equal(get('#start').disabled,true);assert.ok(get('.status').textContent.includes('Состав профиля изменился'));
get('#character-source').value='all';get('#character-source').listeners.change();assert.equal(get('#characters').children.length,99);
get('#characters').children[0].click();start();
assert.equal(read('combatants[0].hp'),1058);assert.equal(read('combatants[0].spd'),101);
console.log('Passed: battle profile selection, equipped HP/SPD and AV, snapshot isolation, gear refresh, deleted gear/profile, and base catalog fallback.');
const {getAttackToughnessReduction}=require('./toughness.js');
const attacker={side:'ally',element:'Fire',spd:130.6,atk:500,breakEffect:1,basicAttack:{toughnessReduction:[30,0,0]}};
const defender={side:'enemy',weaknesses:['Fire'],remainingToughness:50};
assert.equal(getAttackToughnessReduction(attacker,defender).damage,10);
assert.equal(getAttackToughnessReduction({...attacker,spd:200,atk:9999,breakEffect:5},defender).damage,10);
assert.equal(getAttackToughnessReduction({...attacker,weaknessBreakEfficiency:0.5},defender).damage,15);
assert.ok(Math.abs(getAttackToughnessReduction({...attacker,weaknessBreakEfficiency:0.06},defender).damage-10.6)<1e-9);
assert.equal(getAttackToughnessReduction(attacker,{...defender,remainingToughness:2.6}).damage,2.6);
assert.equal(getAttackToughnessReduction(attacker,{...defender,weaknesses:['Ice']}).damage,0);
assert.equal(getAttackToughnessReduction(attacker,{...defender,remainingToughness:0}).damage,0);
console.log('Passed: shared attack toughness calculation, SPD/ATK/Break Effect independence, efficiency, fractional damage, weakness matching and remaining toughness.');
// End-to-end damage uses saved equipment, rolled criticals, pre-hit toughness and blast scaling.
const damageGear=[{id:'damage-hands',setId:'124',partId:'31242',rarity:5,level:15,mainStat:'atk',mainValue:100,substats:[]}];
battleStorage.set('hsrsim.relics.v1',JSON.stringify(damageGear));
battleStorage.set('hsrsim.profile.v1',JSON.stringify([{characterId:'1001',equipment:{2:'damage-hands'}}]));
get('#character-source').value='profile';get('#character-source').listeners.change();get('#characters').children[0].click();start();
assert.equal(read('combatants[0].atk'),611);
const firstHp=read('combatants[1].health');alliedAttack();
assert.equal(read('combatants[1].health'),firstHp-219);
assert.ok(get('.status').textContent.includes('−219 HP'));
vm.runInContext('combatants[0].critRate=1',context);
const beforeCrit=read('combatants[1].health');alliedAttack();assert.equal(read('combatants[1].health'),beforeCrit-329);
assert.ok(get('.status').textContent.includes('КРИТ'));
vm.runInContext('combatants[0].critRate=0;combatants[1].weaknesses.push("Ice");combatants[1].remainingToughness=1',context);
let hpBeforeHit=read('combatants[1].health');alliedAttack();
assert.equal(read('combatants[1].health'),hpBeforeHit-219);assert.equal(read('combatants[1].remainingToughness'),0);
hpBeforeHit=read('combatants[1].health');alliedAttack();assert.equal(read('combatants[1].health'),hpBeforeHit-244);
get('#character-source').value='all';get('#character-source').listeners.change();
vm.runInContext('selected.splice(0,selected.length,"1314");selectedMonsters.splice(0,selectedMonsters.length,MONSTERS[0].id,MONSTERS[0].id,MONSTERS[0].id)',context);
start();vm.runInContext('combatants[0].critRate=0;combatants.filter(c=>c.side==="enemy").forEach(c=>c.weaknesses.push("Quantum"))',context);
alliedAttack();
assert.ok(read('combatants[1].health<combatants[1].hp'));
assert.ok(read('combatants[2].health<combatants[2].hp'));
assert.equal(read('combatants[3].health'),read('combatants[3].hp'));
assert.equal(read('combatants[1].remainingToughness'),10);assert.equal(read('combatants[2].remainingToughness'),15);
assert.ok(get('#damage-preview').textContent==='' || get('#damage-preview').textContent.includes('Урон по основной цели'));
console.log('Passed: battle damage from equipped ATK, random critical, toughness state before breaking hit, adjacent damage and toughness.');
// Each selected enemy has its own level, including duplicate monsters.
vm.runInContext('selectedMonsterLevels.splice(0,selectedMonsterLevels.length);renderSelection()',context);
let enemySetup=get('#selected-enemies').children;
let levelChoice=enemySetup[0].children[1].children[0];
levelChoice.value='30';levelChoice.listeners.change();
let secondChoice=enemySetup[1].children[1].children[0];secondChoice.value='95';secondChoice.listeners.change();
start();
assert.equal(read('combatants[1].level'),30);assert.equal(read('combatants[2].level'),95);assert.equal(read('combatants[3].level'),80);
assert.ok(read('combatants[1].hp<combatants[2].hp'));
assert.equal(read('combatants[1].def'),read('monsterAtLevel(MONSTERS[0],30).def'));
assert.equal(read('combatants[1].toughness'),read('monsterAtLevel(MONSTERS[0],30).toughness/3'));
levelChoice.value='40';levelChoice.listeners.change();assert.equal(read('combatants[1].level'),30);
start();assert.equal(read('combatants[1].level'),40);
enemySetup[0].children[0].click();assert.equal(read('selectedMonsterLevels[0]'),95);
start();assert.equal(read('combatants[1].level'),95);
vm.runInContext(`for(const m of MONSTERS){
 const original=monsterAtLevel(m,80);
 for(const key of ['hp','atk','def','spd','toughness'])if(original[key]!==m[key])throw Error(m.id+' '+key);
 for(const level of getMonsterLevels(m)){
  const scaled=monsterAtLevel(m,level);
  for(const key of ['hp','atk','def','spd','toughness'])if(!Number.isFinite(scaled[key])||scaled[key]<0)throw Error(m.id+' '+level+' '+key);
 }
}`,context);
assert.throws(()=>read('monsterAtLevel(MONSTERS[0],0)'));
assert.throws(()=>read('monsterAtLevel(MONSTERS[0],100.5)'));
console.log('Passed: independent enemy levels, scaled stats, battle snapshots, removal alignment and all 664 monsters across available levels.');
