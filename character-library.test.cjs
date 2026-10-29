const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const {formatSkillDescription,cleanCharacterText}=require('./character-library.js');
assert.equal(formatSkillDescription('<color=#fff>#1[i]%</color> ATK + #2[f1]',[0.57,4.25]),'57% ATK + 4.3');
assert.equal(cleanCharacterText('Line 1\\n<unbreak>Line 2</unbreak>'),'Line 1\nLine 2');
assert.equal(formatSkillDescription('#5[i]%',[]),'—%');
class Element {
  constructor(tag='div') {this.tag=tag;this.children=[];this.attributes={};this.listeners={};this.value='';this.textContent='';}
  append(...items){this.children.push(...items);}
  replaceChildren(){this.children=[];}
  setAttribute(key,value){this.attributes[key]=value;}
  addEventListener(type,fn){this.listeners[type]=fn;}
}
const nodes=new Map();
const document={querySelector:s=>{if(!nodes.has(s))nodes.set(s,new Element());return nodes.get(s);},createElement:tag=>new Element(tag)};
const context=vm.createContext({document,console});
for(const file of ['characters.js','toughness.js','character-icon.js','character-details.js','character-library.js'])vm.runInContext(fs.readFileSync(file,'utf8'),context);
const characters=vm.runInContext('CHARACTERS',context), details=vm.runInContext('CHARACTER_DETAILS',context);
const list=document.querySelector('#character-list'), detail=document.querySelector('#character-detail'), search=document.querySelector('#character-search');
assert.equal(list.children.length,99);
assert.equal(Object.keys(details).length,characters.length);
function descendants(root){return root.children.flatMap(child=>[child,...descendants(child)]);}
for(let i=0;i<characters.length;i++) {
  const character=characters[i]; assert.ok(details[character.id].groups.length);
  list.children[i].listeners.click();
  assert.equal(detail.children[0].textContent,character.name);
  assert.equal(list.children.filter(c=>c.attributes['aria-pressed']==='true').length,1);
  const cards=descendants(detail).filter(n=>n.className==='skill-card');
  assert.equal(cards.length,details[character.id].groups.reduce((sum,g)=>sum+g.skills.length,0));
  for(const group of details[character.id].groups)for(const skill of group.skills)for(const params of Object.values(skill.levels)) {
    const description=formatSkillDescription(skill.description,params);
    assert.ok(!/<[^>]*>|#\d+\[|\\n/.test(description),`${character.name}: ${skill.id}`);
  }
}
list.children[0].listeners.click();
let firstSkill=descendants(detail).find(n=>n.className==='skill-card');
const select=descendants(firstSkill).find(n=>n.tag==='select');
const description=descendants(firstSkill).find(n=>n.className==='skill-description');
assert.equal(select.value,'6'); assert.ok(description.textContent.includes('100%'));
select.value='1'; select.listeners.change(); assert.ok(description.textContent.includes('50%'));
search.value='  kAfKa  ';search.listeners.input();
assert.equal(list.children.length,1); list.children[0].listeners.click();
assert.equal(detail.children[0].textContent,'Kafka');
search.value='no such character';search.listeners.input();
assert.ok(list.children[0].textContent.includes('не найдены'));
assert.equal(detail.children[0].textContent,'Kafka');
search.value='';search.listeners.input();assert.equal(list.children.length,99);
assert.equal(list.children.filter(c=>c.attributes['aria-pressed']==='true').length,1);
assert.ok(fs.readFileSync('index.html','utf8').includes('href="characters.html"'));
console.log('Passed: 99 character details, 807 abilities, all level descriptions, selection, search, empty results, skill level switching and menu link.');
// Ability characteristics are imported for every normal, enhanced and memosprite skill.
const {normalize}=require('./import-character-details.cjs');
const normalized=normalize({skills:{test:{name:'Test',bp_need:-1,bp_add:1,sp_base:0,show_stance_list:[0,0,0],level:{1:{param_list:[]}}}}});
assert.equal(normalized.groups[0].skills[0].energyGain,0);
assert.equal(normalized.groups[0].skills[0].skillPointCost,0);
assert.equal(normalized.groups[0].skills[0].skillPointGain,1);
for(const character of Object.values(details))for(const group of character.groups)for(const skill of group.skills) {
  assert.ok(['energyGain','skillPointCost','skillPointGain','targetType','toughnessReduction'].every(key=>Object.hasOwn(skill,key)));
  assert.equal(skill.toughnessReduction.length,3);
}
list.children[0].listeners.click();
const skillCards=descendants(detail).filter(n=>n.className==='skill-card');
function values(card) {
  const grid=descendants(card).find(n=>n.className==='skill-stat-grid');
  return Object.fromEntries(grid.children.map(row=>[row.children[0].textContent,row.children[1].textContent]));
}
const basic=values(skillCards[0]), shield=values(skillCards[1]), ultimate=values(skillCards[2]);
assert.equal(basic['Восстановление энергии'],'20');
assert.equal(basic['Расход очков навыков'],'0');
assert.equal(basic['Получение очков навыков'],'1');
assert.equal(basic['Снижение стойкости · одиночная цель'],'10');
assert.equal(shield['Расход очков навыков'],'1');
assert.equal(shield['Получение очков навыков'],'—');
assert.equal(shield['Снижение стойкости · одиночная цель'],'0');
assert.equal(ultimate['Снижение стойкости · все цели'],'20');
console.log('Passed: all 807 ability stat records, energy, SP costs and gains, three toughness targets, zero and missing values.');
