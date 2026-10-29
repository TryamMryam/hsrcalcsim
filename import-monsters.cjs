const fs = require('node:fs');
const VERSION = '4.6.54';
const BASE = `https://static.nanoka.cc/hsr/${VERSION}`;
async function get(url) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try { const r = await fetch(url); if (!r.ok) throw Error(`${r.status}: ${url}`); return await r.json(); }
    catch (e) { if (attempt === 2) throw e; }
  }
}
async function main() {
  const [catalog, levels, elites] = await Promise.all([get(`${BASE}/monster.json`),get(`${BASE}/HardLevelGroup.json`),get(`${BASE}/EliteGroup.json`)]);
  const entries = Object.entries(catalog), result = []; let index = 0;
  async function worker() {
    while (index < entries.length) {
      const [id, c] = entries[index++], d = await get(`${BASE}/en/monster/${id}.json`);
      const variant = d.child.find(v => String(v.id) === id) || d.child[0];
      if (!variant) { console.log(`Skipped entry without combat variant: ${id}`); continue; }
      const level = levels.find(l => l.HardLevelGroup === variant.hard_level_group && l.Level === 80);
      const elite = elites.find(e => e.EliteGroup === variant.elite_group);
      if (!level || !elite) throw Error(`Missing level/elite: ${id}`);
      const stat = (base, modify, ratio) => base * (modify ?? 1) * level[ratio] * elite[ratio];
      result.push({id,name:c.en,rank:c.rank,level:80,variant:String(variant.id),icon:`assets/monsters/${id}.webp`,
        scaling:{group:variant.hard_level_group,
          hp:d.hp_base*(variant.hp_modify_ratio??1)*elite.HPRatio,
          atk:d.attack_base*(variant.attack_modify_ratio??1)*elite.AttackRatio,
          def:d.defence_base*(variant.defence_modify_ratio??1)*elite.DefenceRatio,
          spd:d.speed_base*(variant.speed_modify_ratio??1)*elite.SpeedRatio,spdAdd:variant.speed_modify_value??0,
          toughness:d.stance_base*(variant.stance_modify_ratio??1)*elite.StanceRatio,toughnessAdd:variant.stance_modify_value??0},
        hp:Math.max(1,Math.round(stat(d.hp_base,variant.hp_modify_ratio,'HPRatio'))),
        atk:Math.round(stat(d.attack_base,variant.attack_modify_ratio,'AttackRatio')),
        def:Math.round(stat(d.defence_base,variant.defence_modify_ratio,'DefenceRatio')),
        spd:Math.round(stat(d.speed_base,variant.speed_modify_ratio,'SpeedRatio')+(variant.speed_modify_value??0)),
        toughness:Math.round(stat(d.stance_base,variant.stance_modify_ratio,'StanceRatio')+(variant.stance_modify_value??0)),
        weaknesses:variant.stance_weak_list.map(e=>e==='Thunder'?'Lightning':e),
        damageResistances:Object.fromEntries((variant.damage_type_resistance||[]).map(r=>[r.damage_type==='Thunder'?'Lightning':r.damage_type,r.value]))});
    }
  }
  await Promise.all(Array.from({length:8},worker)); result.sort((a,b)=>Number(a.id)-Number(b.id));
  fs.writeFileSync('monsters.js',`// Source: https://hsr.nanoka.cc/monster | data ${VERSION} | level 80, default variant\nconst MONSTERS = ${JSON.stringify(result,null,2)};\n`);
  const groups={};
  for(const row of levels){
    if(row.Level<1||row.Level>100)continue;
    (groups[row.HardLevelGroup]??={})[row.Level]={hp:row.HPRatio,atk:row.AttackRatio,def:row.DefenceRatio,spd:row.SpeedRatio,toughness:row.StanceRatio};
  }
  fs.writeFileSync('monster-levels.js',`// Nanoka ${VERSION}: HardLevelGroup.json, levels 1–100\nconst MONSTER_LEVELS = ${JSON.stringify(groups)};\n`);
  console.log(`Saved ${result.length} monsters`);
}
main().catch(e=>{console.error(e);process.exitCode=1;});
