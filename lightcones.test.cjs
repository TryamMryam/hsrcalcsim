const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {calculateLightConeStats}=require('./lightcone-library.js');
const cones=vm.runInNewContext(fs.readFileSync('lightcones.js','utf8')+';LIGHT_CONES');
assert.equal(cones.length,172);
for(const c of cones){
 for(let level=1;level<=80;level++){const s=calculateLightConeStats(c,level);assert.ok([s.hp,s.atk,s.def].every(v=>Number.isFinite(v)&&v>0));}
 assert.equal(Object.keys(c.effects).length,5);
 for(const text of Object.values(c.effects))assert.ok(!/<[^>]+>|#\d+\[/.test(text),c.name);
 const image=fs.readFileSync(c.icon);assert.equal(image.toString('ascii',8,12),'WEBP');
}
assert.deepEqual(calculateLightConeStats(cones[0],80),{hp:847,atk:318,def:265,promotion:6});
assert.deepEqual(calculateLightConeStats(cones[0],1),{hp:38,atk:14,def:12,promotion:0});
assert.equal(calculateLightConeStats(cones[0],20).promotion,1);
assert.throws(()=>calculateLightConeStats(cones[0],81));assert.throws(()=>calculateLightConeStats(cones[0],1.5));
class Element{
 constructor(tag='div'){this.tag=tag;this.value='';this.children=[];this.listeners={};this.attributes={};this.textContent='';}
 append(...items){this.children.push(...items);}replaceChildren(){this.children=[];}setAttribute(k,v){this.attributes[k]=v;}addEventListener(k,fn){this.listeners[k]=fn;}click(){this.listeners.click?.();}
}
const nodes=new Map(),document={querySelector:s=>{if(!nodes.has(s))nodes.set(s,new Element());return nodes.get(s);},createElement:tag=>new Element(tag)};
const get=s=>document.querySelector(s),context=vm.createContext({document,console});
for(const file of ['lightcones.js','lightcone-library.js'])vm.runInContext(fs.readFileSync(file,'utf8'),context);
assert.equal(get('#lightcone-list').children.length,172);
get('#lightcone-list').children[0].click();
const detail=get('#lightcone-detail'),descendants=e=>e.children.flatMap(c=>[c,...descendants(c)]);
assert.equal(detail.children[0].textContent,'Arrows');
const level=descendants(detail).find(n=>n.tag==='input'),rank=descendants(detail).find(n=>n.tag==='select');
let effect=descendants(detail).find(n=>n.className==='skill-description');assert.ok(effect.textContent.includes('12%'));
rank.value='5';rank.listeners.change();assert.ok(effect.textContent.includes('24%'));
level.value='1';level.listeners.input();const stats=descendants(detail).find(n=>n.className==='character-stat-grid');assert.equal(stats.children[0].children[1].textContent,'38');
level.value='81';level.listeners.input();assert.equal(stats.children.length,0);assert.ok(descendants(detail).find(n=>n.className==='profile-edit-error').textContent.includes('1–80'));
get('#lightcone-search').value='aRrOwS';get('#lightcone-search').listeners.input();assert.ok(get('#lightcone-list').children.length>=1);
get('#lightcone-search').value='not a cone';get('#lightcone-search').listeners.input();assert.ok(get('#lightcone-list').children[0].textContent.includes('не найдены'));
get('#lightcone-search').value='';get('#lightcone-path').value='Hunt';get('#lightcone-path').listeners.change();get('#lightcone-rarity').value='3';get('#lightcone-rarity').listeners.change();
assert.ok(get('#lightcone-list').children.every(c=>c.children.at(-1).textContent==='3★ · Hunt'));
for(const file of ['index.html','profile.html','characters.html','relics.html','sim.html','lightcones.html']){
 const html=fs.readFileSync(file,'utf8');assert.equal((html.match(/aria-current="page"/g)||[]).length,1);assert.ok(html.includes('href="lightcones.html"'));
}
console.log('Passed: 172 cones, artwork, levels 1–80, promotion boundaries, S1–S5 effects, search, filters, invalid levels and navigation on all six pages.');
