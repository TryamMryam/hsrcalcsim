const fs=require('node:fs');
const {formatSkillDescription}=require('./character-library.js');
const VERSION='4.6.54',BASE=`https://static.nanoka.cc/hsr/${VERSION}`;
const paths={Knight:'Preservation',Mage:'Erudition',Priest:'Abundance',Rogue:'Hunt',Shaman:'Harmony',Warlock:'Nihility',Warrior:'Destruction',Memory:'Remembrance'};
async function get(url,binary=false){
 for(let attempt=0;attempt<3;attempt++)try{
  const response=await fetch(url);if(binary&&response.status===404)return null;if(!response.ok)throw Error(`${response.status}: ${url}`);
  return binary?Buffer.from(await response.arrayBuffer()):await response.json();
 }catch(error){if(attempt===2)throw error;}
}
async function main(){
 const catalog=await get(`${BASE}/lightcone.json`),entries=Object.entries(catalog),result=[];let index=0,missing=0;
 fs.mkdirSync('assets/lightcones',{recursive:true});
 async function worker(){while(index<entries.length){
  const [id,c]=entries[index++],d=await get(`${BASE}/en/lightcone/${id}.json`);
  const bytes=await get(`https://static.nanoka.cc/assets/hsr/lightconemaxfigures/${id}.webp`,true);
  const icon=bytes?`assets/lightcones/${id}.webp`:'assets/lightcones/placeholder.svg';
  if(bytes){if(bytes.toString('ascii',0,4)!=='RIFF'||bytes.toString('ascii',8,12)!=='WEBP')throw Error(`Invalid WebP: ${id}`);fs.writeFileSync(icon,bytes);}else{missing++;console.log(`Missing artwork: ${id} ${c.en}`);}
  const stats=d.stats.map((s,i)=>({promotion:s.promotion??0,minLevel:i?d.stats[i-1].max_level:1,maxLevel:s.max_level,hp:s.base_hp,hpAdd:s.base_hp_add,atk:s.base_attack,atkAdd:s.base_attack_add,def:s.base_defence,defAdd:s.base_defence_add}));
  result.push({id,name:d.name,path:paths[d.base_type]||d.base_type,rarity:Number(c.rank.match(/\d+$/)[0]),icon,description:d.desc?formatSkillDescription(d.desc,[]):'',stats,
   effectName:d.refinements.name,effects:Object.fromEntries(Object.entries(d.refinements.level).map(([rank,v])=>[rank,formatSkillDescription(d.refinements.desc,v.param_list)]))});
 }}
 await Promise.all(Array.from({length:6},worker));result.sort((a,b)=>Number(a.id)-Number(b.id));
 fs.writeFileSync('lightcones.js',`// Source: https://hsr.nanoka.cc/lightcone | data ${VERSION}\nconst LIGHT_CONES = ${JSON.stringify(result,null,2)};\n`);
 console.log(`Saved ${result.length} light cones; missing artwork: ${missing}`);
}
main().catch(error=>{console.error(error);process.exitCode=1;});
