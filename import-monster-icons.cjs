const fs=require('node:fs'),vm=require('node:vm');
async function main(){
  const response=await fetch('https://static.nanoka.cc/hsr/4.6.54/monster.json');
  if(!response.ok)throw Error(`Catalog: ${response.status}`);
  const catalog=await response.json(),monsters=vm.runInNewContext(fs.readFileSync('monsters.js','utf8')+';MONSTERS');
  fs.mkdirSync('assets/monsters',{recursive:true});
  const cache=new Map();let index=0,missing=0;
  async function download(url){
    for(let attempt=0;attempt<3;attempt++)try{
      const r=await fetch(url);if(r.status===404)return null;if(!r.ok)throw Error(`${r.status}: ${url}`);
      const bytes=Buffer.from(await r.arrayBuffer());
      if(bytes.toString('ascii',0,4)!=='RIFF'||bytes.toString('ascii',8,12)!=='WEBP')throw Error(`Invalid image: ${url}`);
      return bytes;
    }catch(e){if(attempt===2)throw e;}
  }
  async function worker(){while(index<monsters.length){
    const monster=monsters[index++],parts=String(catalog[monster.id]?.icon||'').split('/');
    const folder=parts.at(-2)?.toLowerCase(),filename=parts.at(-1)?.replace(/\.png$/i,'.webp');
    const url=filename&&folder?`https://static.nanoka.cc/assets/hsr/${folder}/${filename}`:null;
    if(url&&!cache.has(url))cache.set(url,download(url));
    const bytes=url?await cache.get(url):null;
    monster.icon=bytes?`assets/monsters/${monster.id}.webp`:'assets/monsters/placeholder.svg';
    if(bytes)fs.writeFileSync(monster.icon,bytes);else{missing++;console.log(`Missing icon: ${monster.id} ${monster.name}`);}
  }}
  await Promise.all(Array.from({length:8},worker));
  fs.writeFileSync('monsters.js',`// Source: https://hsr.nanoka.cc/monster | data 4.6.54 | level 80, default variant | icons saved locally\nconst MONSTERS = ${JSON.stringify(monsters,null,2)};\n`);
  console.log(`Saved ${monsters.length-missing} icons; missing: ${missing}`);
}
main().catch(e=>{console.error(e);process.exitCode=1;});
