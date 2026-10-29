const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const BASE='https://static.nanoka.cc/assets/hsr/avataricon/avatar';
async function main() {
  const characters=vm.runInNewContext(fs.readFileSync('characters.js','utf8')+';CHARACTERS');
  fs.mkdirSync('assets/characters',{recursive:true});
  let index=0;
  async function worker() {
    while(index<characters.length) {
      const c=characters[index++];
      const url=`${BASE}/${c.id}.webp`;let buffer;
      for(let attempt=0;attempt<3;attempt++) {
        try {
          const response=await fetch(url);
          if(response.status===404) { console.log(`Avatar Icon unavailable: ${c.id} ${c.name}`); break; }
          if(!response.ok)throw Error(`${response.status}: ${url}`);
          buffer=Buffer.from(await response.arrayBuffer());
          if(buffer.toString('ascii',0,4)!=='RIFF'||buffer.toString('ascii',8,12)!=='WEBP')throw Error(`Invalid WebP: ${url}`);
          break;
        } catch(error) {if(attempt===2)throw error;}
      }
      if(!buffer) { c.icon='assets/characters/placeholder.svg'; continue; }
      c.icon=`assets/characters/${c.id}.webp`;
      fs.writeFileSync(path.resolve(c.icon),buffer);
    }
  }
  await Promise.all(Array.from({length:6},worker));
  fs.writeFileSync('characters.js',`// Source: https://hsr.nanoka.cc/character | data 4.6.54 | level 80, ascension 6, no equipment\n// Avatar Icon: ${BASE}/{id}.webp (saved locally)\nconst CHARACTERS = ${JSON.stringify(characters,null,2)};\n`);
  console.log(`Saved ${characters.length} Avatar Icons`);
}
main().catch(error=>{console.error(error);process.exitCode=1;});
