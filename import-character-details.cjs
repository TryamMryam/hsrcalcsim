const fs = require('node:fs');
const vm = require('node:vm');
const VERSION = '4.6.54';
function normalizeSkills(skills) {
  return Object.entries(skills || {}).map(([id, s]) => ({
    id, name: s.name, type: s.type_name || (s.type === 'MazeNormal' ? 'Overworld Attack' : 'Ability'),
    description: s.desc || s.simple_desc || '',
    targetType: s.tag ?? null,
    energyGain: s.sp_base ?? null,
    skillPointCost: s.bp_need === -1 ? 0 : (s.bp_need ?? null),
    skillPointGain: s.bp_add ?? null,
    toughnessReduction: s.show_stance_list ?? null,
    levels: Object.fromEntries(Object.entries(s.level || {}).map(([level, value]) => [level, value.param_list || []]))
  }));
}
function normalize(d) {
  const groups = [{name:'Основные способности', skills:normalizeSkills(d.skills)}];
  if (d.memosprite?.skills) groups.push({name:`Дух памяти: ${d.memosprite.name}`, skills:normalizeSkills(d.memosprite.skills)});
  for (const [version, enhanced] of Object.entries(d.enhanced || {})) {
    groups.push({name:`Усиленные способности · версия ${version}`, skills:normalizeSkills(enhanced.skills)});
    if (enhanced.memosprite?.skills) groups.push({name:`Усиленный дух памяти: ${enhanced.memosprite.name}`, skills:normalizeSkills(enhanced.memosprite.skills)});
  }
  return {description:d.desc || '',energy:d.sp_need ?? d.energy ?? null,groups:groups.filter(g=>g.skills.length)};
}
function save(data) {
  fs.writeFileSync('character-details.js', `// Source: https://hsr.nanoka.cc/character | data ${VERSION}\nconst CHARACTER_DETAILS = ${JSON.stringify(data,null,2)};\n`);
}
async function main() {
  const characters = vm.runInNewContext(fs.readFileSync('characters.js','utf8')+';CHARACTERS');
  const result = {}; let index = 0;
  async function worker() {
    while (index < characters.length) {
      const c = characters[index++]; let detail;
      for (let attempt=0; attempt<3; attempt++) {
        try {
          const response = await fetch(`https://static.nanoka.cc/hsr/${VERSION}/en/character/${c.id}.json`);
          if (!response.ok) throw Error(`${c.id}: ${response.status}`);
          detail = await response.json(); break;
        } catch(error) { if(attempt === 2) throw error; }
      }
      result[c.id] = normalize(detail);
    }
  }
  await Promise.all(Array.from({length:6},worker)); save(result);
  console.log(`Saved abilities for ${Object.keys(result).length} characters`);
}
if (require.main === module) main().catch(error=>{console.error(error);process.exitCode=1;});
module.exports = {normalize,save};
