const fs=require('node:fs'),vm=require('node:vm');
async function main(){
  const response=await fetch('https://static.nanoka.cc/hsr/4.6.54/relicset.json');
  if(!response.ok)throw Error(`Catalog: ${response.status}`);
  const catalog=await response.json();
  const sets=vm.runInNewContext(fs.readFileSync('relics.js','utf8')+';RELIC_SETS');
  fs.mkdirSync('assets/relics/sets',{recursive:true});fs.mkdirSync('assets/relics/parts',{recursive:true});
  const jobs=[];
  for(const set of sets){
    set.icon=`assets/relics/sets/${set.id}.webp`;
    const filename=catalog[set.id].icon.split('/').at(-1).replace('.png','.webp');
    jobs.push({target:set,url:`https://static.nanoka.cc/assets/hsr/itemfigures/${filename}`});
    for(const part of set.parts){
      part.icon=`assets/relics/parts/${part.id}.webp`;
      jobs.push({target:part,url:`https://static.nanoka.cc/assets/hsr/relicfigures/IconRelic_${set.id}_${part.slot}.webp`});
    }
  }
  let index=0,missing=0;
  async function worker(){while(index<jobs.length){const job=jobs[index++];let bytes;
    for(let attempt=0;attempt<3;attempt++)try{
      const r=await fetch(job.url);
      if(r.status===404){console.log(`Missing: ${job.url}`);missing++;job.target.icon='assets/relics/placeholder.svg';break;}
      if(!r.ok)throw Error(`${r.status}: ${job.url}`);
      bytes=Buffer.from(await r.arrayBuffer());
      if(bytes.toString('ascii',0,4)!=='RIFF'||bytes.toString('ascii',8,12)!=='WEBP')throw Error(`Invalid WebP: ${job.url}`);
      break;
    }catch(e){if(attempt===2)throw e;}
    if(bytes)fs.writeFileSync(job.target.icon,bytes);
  }}
  await Promise.all(Array.from({length:6},worker));
  fs.writeFileSync('relics.js',`// Source: https://hsr.nanoka.cc/relic/124 | data 4.6.54 | icons saved locally from Nanoka\nconst RELIC_SETS = ${JSON.stringify(sets,null,2)};\n`);
  console.log(`Saved ${jobs.length-missing} icons; placeholders: ${missing}`);
}
main().catch(e=>{console.error(e);process.exitCode=1;});
