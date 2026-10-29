const fs=require('node:fs');
const {formatSkillDescription}=require('./character-library.js');
const VERSION='4.6.54';
const BASE=`https://static.nanoka.cc/hsr/${VERSION}`;
async function get(url) {
  for(let attempt=0;attempt<3;attempt++)try {
    const response=await fetch(url);if(!response.ok)throw Error(`${response.status}: ${url}`);return await response.json();
  }catch(error){if(attempt===2)throw error;}
}
async function main(){
  const catalog=await get(`${BASE}/relicset.json`),ids=Object.keys(catalog),sets=[];let index=0;
  async function worker(){while(index<ids.length){const id=ids[index++],d=await get(`${BASE}/en/relicset/${id}.json`);sets.push({id,name:d.name,icon:`assets/relics/sets/${id}.webp`,parts:Object.entries(d.parts).map(([partId,p])=>({id:partId,name:p.name,icon:`assets/relics/parts/${partId}.webp`,slot:Number(partId.at(-1))})),bonuses:Object.entries(d.require_num).map(([count,b])=>({count:Number(count),description:formatSkillDescription(b.desc,b.param_list)}))});}}
  await Promise.all(Array.from({length:6},worker));sets.sort((a,b)=>Number(a.id)-Number(b.id));
  fs.writeFileSync('relics.js',`// Source: https://hsr.nanoka.cc/relic/124 | data ${VERSION}\nconst RELIC_SETS = ${JSON.stringify(sets,null,2)};\n`);
  console.log(`Saved ${sets.length} sets and ${sets.reduce((sum,s)=>sum+s.parts.length,0)} parts`);
}
main().catch(error=>{console.error(error);process.exitCode=1;});
