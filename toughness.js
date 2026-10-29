// Nanoka stores toughness at 3 times the displayed in-game / wiki values.
function toToughnessUnits(value) { return value / 3; }
// https://honkai-star-rail.fandom.com/wiki/Toughness#Toughness_Reduction_Formula
// Percent modifiers are fractions: 0.5 means +50%. Ability multiplier defaults to 100%.
function calculateToughnessReduction(base, {
  additive = 0, increase = 0, breakEfficiency = 0, vulnerability = 0, abilityMultiplier = 1
} = {}) {
  return Math.max(0, (base + additive) * (1 + increase)
    * (1 + breakEfficiency + vulnerability) * abilityMultiplier);
}
function getAttackToughnessReduction(attacker,defender,ability=attacker.basicAttack){
  const base=toToughnessUnits(ability?.toughnessReduction?.[0] ?? 0);
  const modifiers={additive:attacker.additiveToughnessReduction ?? 0,
    increase:attacker.toughnessReductionIncrease ?? 0,
    breakEfficiency:attacker.weaknessBreakEfficiency ?? 0,
    vulnerability:defender.toughnessVulnerability ?? 0,
    abilityMultiplier:ability?.abilityMultiplier ?? 1};
  const weaknessMatched=attacker.side==='ally' && defender.side==='enemy' && Boolean(defender.weaknesses?.includes(attacker.element));
  // SPD determines action timing. Break Effect affects Break DMG, not toughness reduction.
  // Neither stat uses the character's SPD rounding rule in this calculation.
  const potential=weaknessMatched?calculateToughnessReduction(base,modifiers):0;
  return {base,modifiers,weaknessMatched,potential,damage:Math.min(potential,Math.max(0,defender.remainingToughness ?? 0))};
}
if (typeof module !== 'undefined') module.exports = {toToughnessUnits,calculateToughnessReduction,getAttackToughnessReduction};
