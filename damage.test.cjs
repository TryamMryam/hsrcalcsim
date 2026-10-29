const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {calculateSkillDamage,getBasicAttackDamageSpec,getBasicAttackTargets}=require('./damage.js');
const attacker={level:80,atk:1000,hp:4000,def:2000,element:'Fire',critDamage:0.5};
const defender={side:'enemy',def:1000,damageResistances:{Fire:0.2},remainingToughness:20};
const ability={components:[{stat:'atk',multiplier:1}],type:'basic',element:'Fire'};
assert.equal(calculateSkillDamage(attacker,defender,ability).damage,360);
assert.equal(calculateSkillDamage(attacker,defender,ability,{critical:true}).damage,540);
assert.equal(calculateSkillDamage({...attacker,elementalDamage:{fire:0.5}},defender,ability).damage,540);
assert.equal(calculateSkillDamage(attacker,{...defender,remainingToughness:0},ability).damage,400);
assert.equal(calculateSkillDamage(attacker,{...defender,damageResistances:{Fire:0}},ability).damage,450);
assert.equal(calculateSkillDamage({...attacker,resPenetration:0.2},defender,ability).damage,450);
assert.equal(calculateSkillDamage({...attacker,defIgnore:1},defender,ability).damage,720);
assert.equal(calculateSkillDamage(attacker,defender,{...ability,components:[{stat:'hp',multiplier:0.5}]}).damage,720);
assert.equal(calculateSkillDamage(attacker,defender,{...ability,components:[{stat:'def',multiplier:1}]}).damage,720);
assert.equal(calculateSkillDamage(attacker,{...defender,damageResistances:{Fire:1}},ability).damage,0);
const modifiers=calculateSkillDamage({...attacker,originalDamageMultiplier:2,weaken:0.5},{...defender,allDamageVulnerability:0.25,damageMitigations:[0.2,0.5]},ability);
assert.equal(modifiers.damage,180);
const details=vm.runInNewContext(fs.readFileSync('character-details.js','utf8')+';CHARACTER_DETAILS');
let supported=0;
for(const [id,c] of Object.entries(details)){
 const skill=c.groups[0].skills.find(s=>s.type==='Basic ATK'),spec=getBasicAttackDamageSpec(skill);
 if(id==='1511'){assert.equal(spec,null);continue;}
 assert.ok(spec,`Missing scaling: ${id}`);assert.equal(spec.level,6);assert.ok(spec.primary.multiplier>0);supported++;
}
assert.equal(supported,98);
assert.equal(getBasicAttackDamageSpec(details['1110'].groups[0].skills[0]).primary.stat,'hp');
assert.equal(getBasicAttackDamageSpec(details['1304'].groups[0].skills[0]).primary.stat,'def');
assert.equal(getBasicAttackDamageSpec(details['1305'].groups[0].skills[0]).primary.multiplier,1);
const formation=[{side:'ally',health:100},{side:'enemy',health:100},{side:'enemy',health:100},{side:'enemy',health:100}];
assert.deepEqual(getBasicAttackTargets(formation,2,{targetType:'Blast'}).map(t=>t.index),[2,1,3]);
assert.deepEqual(getBasicAttackTargets(formation,1,{targetType:'Blast'}).map(t=>t.index),[1,2]);
assert.deepEqual(getBasicAttackTargets(formation,1,{targetType:'SingleAttack'}).map(t=>t.index),[1]);
const monsters=vm.runInNewContext(fs.readFileSync('monsters.js','utf8')+';MONSTERS');
assert.equal(monsters[0].damageResistances.Ice,0.2);
monsters.forEach(m=>Object.values(m.damageResistances).forEach(v=>assert.ok(Number.isFinite(v))));
console.log('Passed: normal and critical damage, scaling ATK/HP/DEF, bonuses, resistance/penetration, mitigation, toughness state, all 98 normal basics, blast targets, monster resistances.');
