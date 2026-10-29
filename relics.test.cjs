const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {validateRelic,RELIC_MAIN_STATS}=require('./relic-model.js');
const sets=vm.runInNewContext(fs.readFileSync('relics.js','utf8')+';RELIC_SETS');
assert.equal(sets.length,64);assert.equal(sets.reduce((sum,s)=>sum+s.parts.length,0),196);
for(const set of sets){for(const part of set.parts)assert.ok(RELIC_MAIN_STATS[part.slot]);for(const b of set.bonuses)assert.ok(!/<[^>]+>|#\d+\[/.test(b.description));}
const base={setId:'124',partId:'31241',rarity:5,level:15,mainStat:'hp',mainValue:705,substats:[{stat:'spd',value:4},{stat:'critRate',value:5.8}]};
assert.equal(validateRelic(base,sets).substats.length,2);
for(const change of [
 {level:16},{rarity:4,level:15},{mainStat:'critRate'},{mainValue:0},{mainValue:NaN},
 {substats:[{stat:'hp',value:5}]},{substats:[{stat:'spd',value:4},{stat:'spd',value:2}]},
 {substats:[{stat:'energy',value:3}]},{partId:'bad'}, {substats:Array(5).fill({stat:'spd',value:2})}
])assert.throws(()=>validateRelic({...base,...change},sets));
class Element {
 constructor(tag='div'){this.tag=tag;this.children=[];this.listeners={};this.attributes={};this.value='';this.textContent='';}
 append(...els){this.children.push(...els);}
 replaceChildren(){this.children=[];}
 setAttribute(k,v){this.attributes[k]=v;}
 addEventListener(k,fn){this.listeners[k]=fn;}
 click(){if(!this.disabled)this.listeners.click?.();}
}
const backing=new Map();let failWrite=false;
const storage={getItem:key=>backing.get(key)??null,setItem:(key,value)=>{if(failWrite)throw Error('Full');backing.set(key,value);}};
function createPage(){
 const nodes=new Map(),document={querySelector:s=>{if(!nodes.has(s))nodes.set(s,new Element());return nodes.get(s);},createElement:tag=>new Element(tag)};
 const get=s=>document.querySelector(s);get('#relic-rarity').value='5';get('#relic-level').value='15';
 let id=0;
 const context=vm.createContext({document,console,localStorage:storage,crypto:{randomUUID:()=>`test-${Date.now()}-${++id}`}});
 for(const file of ['relics.js','relic-model.js','relic-library.js'])vm.runInContext(fs.readFileSync(file,'utf8'),context);
 return {get,context,submit:()=>get('#relic-form').listeners.submit({preventDefault(){}})};
}
let {get,context,submit}=createPage();
assert.equal(get('#relic-set-heading').textContent,'Poet of Mourning Collapse');
assert.equal(get('#relic-set-list').children.length,64);
assert.equal(get('#relic-main-stat').value,'hp');
get('#relic-main-value').value='705';
vm.runInContext('substatRows[0].select.value="spd";substatRows[0].input.value="4"',context);
submit();assert.equal(get('#relic-count').textContent,'1');
assert.equal(JSON.parse(backing.get('hsrsim.relics.v1'))[0].mainValue,705);
let reloaded=createPage();assert.equal(reloaded.get('#relic-count').textContent,'1');
submit();assert.equal(get('#relic-count').textContent,'2');
get('#relic-inventory').children[0].children.at(-1).click();assert.equal(get('#relic-count').textContent,'1');
get('#relic-part').value='31243';get('#relic-part').listeners.change();
assert.equal(get('#relic-main-stat').children.length,7);
get('#relic-main-stat').value='critRate';get('#relic-main-stat').listeners.change();get('#relic-main-value').value='32.4';
vm.runInContext('substatRows[0].select.value="critRate";substatRows[0].input.value="5.8"',context);
submit();assert.equal(get('#relic-count').textContent,'1');assert.ok(get('#relic-status').textContent.includes('повторяться'));
vm.runInContext('substatRows[0].select.value="spd";substatRows[0].input.value="4"',context);
failWrite=true;submit();assert.equal(get('#relic-count').textContent,'1');assert.ok(get('#relic-status').textContent.includes('Не удалось сохранить'));failWrite=false;
get('#relic-rarity').value='3';get('#relic-rarity').listeners.change();assert.equal(get('#relic-level').value,'9');
get('#relic-search').value='124';get('#relic-search').listeners.input();assert.equal(get('#relic-set-list').children.length,1);
get('#relic-search').value='no such set';get('#relic-search').listeners.input();assert.ok(get('#relic-set-list').children[0].textContent.includes('не найдены'));
backing.set('hsrsim.relics.v1','broken json');reloaded=createPage();assert.equal(reloaded.get('#add-relic').disabled,true);assert.equal(backing.get('hsrsim.relics.v1'),'broken json');
assert.ok(fs.readFileSync('index.html','utf8').includes('href="relics.html"'));
console.log('Passed: 64 sets / 196 parts, validation, selection, adding, persistence, removal, duplicates, storage failures, level limits and search.');
assert.equal(validateRelic({...base,substats:[{stat:'spd',value:3.6}]},sets).substats[0].value,3.6);
