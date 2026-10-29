// Normal ability damage: https://honkai-star-rail.fandom.com/wiki/Damage
// Percent modifiers use fractions (0.5 = 50%). Break / Super Break / Elation use separate formulas.
function getBasicAttackDamageSpec(skill,level=6){
  if(!skill)return null;
  const levels=Object.keys(skill.levels||{}).map(Number).sort((a,b)=>a-b);
  const chosen=levels.includes(level)?level:levels.at(-1);
  const params=skill.levels?.[chosen]||[];
  const description=String(skill.description||'').replace(/<[^>]*>/g,'');
  const terms=[...description.matchAll(/#(\d+)\[[^\]]+\]%[^#]*?\b(Max HP|ATK|DEF)\b/gi)].map(m=>({
    stat:m[2].toLowerCase()==='max hp'?'hp':m[2].toLowerCase(),multiplier:params[Number(m[1])-1]
  }));
  if(!terms.length||terms.some(t=>!Number.isFinite(t.multiplier)))return null;
  return {level:chosen,element:null,type:'basic',primary:terms[0],adjacent:skill.targetType==='Blast'?terms[1]??null:null};
}
function calculateSkillDamage(attacker,defender,ability,{critical=false}={}){
  const level=attacker.level??80;
  const components=ability.components||[];
  const baseDamage=components.reduce((sum,c)=>sum+(attacker[c.stat]??0)*(c.multiplier+(c.multiplierIncrease??0)),ability.extraDamage??0);
  const element=ability.element||attacker.element;
  const elementKey=element?.toLowerCase();
  const effectiveDefense=Math.max(0,(defender.def??0)*Math.max(0,1+(defender.defBonus??0)-(defender.defReduction??0)-(attacker.defIgnore??0)));
  const factors={
    original:attacker.originalDamageMultiplier??1,
    critical:critical?1+Math.max(0,attacker.critDamage??0):1,
    boost:Math.max(0,1+(attacker.typeDamageBoost?.[ability.type]??0)+(attacker.elementalDamage?.[elementKey]??0)+(attacker.allDamageBoost??0)),
    weaken:Math.max(0,1-(attacker.weaken??0)),
    defense:(200+10*level)/(effectiveDefense+200+10*level),
    resistance:Math.max(0,1-((defender.damageResistances?.[element]??0)-(attacker.resPenetration??0)-(attacker.elementalResPenetration?.[elementKey]??0))),
    vulnerability:Math.max(0,1+(defender.typeVulnerability?.[ability.type]??0)+(defender.elementalVulnerability?.[elementKey]??0)+(defender.allDamageVulnerability??0)),
    mitigation:(defender.damageMitigations??[]).reduce((total,value)=>total*Math.max(0,1-value),1),
    broken:defender.side==='enemy'&&defender.remainingToughness>0?0.9:1
  };
  const rawDamage=Math.max(0,baseDamage*Object.values(factors).reduce((total,value)=>total*value,1));
  return {baseDamage,factors,rawDamage,damage:Math.floor(rawDamage),critical,element};
}
function getBasicAttackTargets(combatants,target,skill){
  const results=[{index:target,component:'primary',toughnessIndex:0}];
  if(skill.targetType==='Blast'){
    const alive=combatants.map((c,index)=>({c,index})).filter(({c})=>c.side==='enemy'&&c.health>0);
    const position=alive.findIndex(c=>c.index===target);
    for(const offset of [-1,1])if(alive[position+offset])results.push({index:alive[position+offset].index,component:'adjacent',toughnessIndex:2});
  }
  return results;
}
if(typeof module!=='undefined')module.exports={getBasicAttackDamageSpec,calculateSkillDamage,getBasicAttackTargets};
