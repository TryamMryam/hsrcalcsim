const STORAGE_KEY='hsrsim.relics.v1';
const relicSearch=document.querySelector('#relic-search');
const setList=document.querySelector('#relic-set-list');
const relicStatus=document.querySelector('#relic-status');
const partSelect=document.querySelector('#relic-part');
const mainSelect=document.querySelector('#relic-main-stat');
let selectedSet=RELIC_SETS.find(s=>s.id==='124') || RELIC_SETS[0];
let inventory=[], storageReady=true;
const substatRows=[];
function node(tag,className,text){const el=document.createElement(tag);if(className)el.className=className;if(text!==undefined)el.textContent=text;return el;}
function statName(key){const stat=RELIC_STATS[key];return stat.name+(stat.percent?' (%)':'');}
function statText(key,value){return `${RELIC_STATS[key].name} +${value.toLocaleString('ru-RU',{maximumFractionDigits:3})}${RELIC_STATS[key].percent?'%':''}`;}
function option(value,text){const el=node('option','',text);el.value=String(value);return el;}
function relicIcon(item,className='relic-icon',lazy=true){
  const image=node('img',className);image.src=item.icon || 'assets/relics/placeholder.svg';
  image.alt='';image.width=64;image.height=64;image.loading=lazy?'lazy':'eager';image.decoding='async';
  image.onerror=()=>{image.onerror=null;image.src='assets/relics/placeholder.svg';};
  return image;
}
function renderSets(){
  setList.replaceChildren();
  const query=relicSearch.value.trim().toLowerCase();
  const matches=RELIC_SETS.filter(s=>`${s.name} ${s.id}`.toLowerCase().includes(query));
  document.querySelector('#relic-set-count').textContent=`Найдено: ${matches.length} из ${RELIC_SETS.length}`;
  matches.forEach(set=>{
    const button=node('button','character-card character-card-with-icon');button.type='button';
    button.setAttribute('aria-pressed',String(set.id===selectedSet.id));
    button.setAttribute('aria-controls','relic-form');
    button.append(relicIcon(set,'character-icon'),node('strong','',set.name),node('span','',set.parts.length===2?'Планарные украшения':'Пещерные реликвии'));
    button.addEventListener('click',()=>{
      selectedSet=set;
      for(const item of setList.children)item.setAttribute('aria-pressed',String(item===button));
      renderSet();
    });
    setList.append(button);
  });
  if(!matches.length)setList.append(node('p','description','Наборы не найдены.'));
}
function renderMainStats(){
  const part=selectedSet.parts.find(p=>p.id===partSelect.value);
  const preview=document.querySelector('#relic-part-preview');preview.replaceChildren();
  preview.append(relicIcon(part,'relic-preview-icon',false),node('span','',part.name));
  mainSelect.replaceChildren();
  for(const key of RELIC_MAIN_STATS[part.slot])mainSelect.append(option(key,statName(key)));
  mainSelect.value=RELIC_MAIN_STATS[part.slot][0];
  document.querySelector('#relic-main-value').value='';
  updateMainUnit();
}
function updateMainUnit(){
  document.querySelector('#relic-main-unit').textContent=RELIC_STATS[mainSelect.value].percent?'в %':'число';
  for(const row of substatRows){
    const old=row.select.value;row.select.replaceChildren();row.select.append(option('','Не выбрана'));
    RELIC_SUB_STATS.filter(key=>key!==mainSelect.value).forEach(key=>row.select.append(option(key,statName(key))));
    row.select.value=old!==mainSelect.value?old:'';
    if(old===mainSelect.value)row.input.value='';
  }
}
function renderSet(){
  document.querySelector('#relic-set-heading').textContent=selectedSet.name;
  const image=document.querySelector('#relic-set-image');image.replaceChildren();image.append(relicIcon(selectedSet,'relic-preview-icon',false));
  const bonuses=document.querySelector('#relic-bonuses');bonuses.replaceChildren();
  selectedSet.bonuses.forEach(b=>{
    const section=node('section','relic-bonus');section.append(node('h3','',`${b.count} предмета`),node('p','description',b.description));bonuses.append(section);
  });
  document.querySelector('#relic-source').href=`https://hsr.nanoka.cc/relic/${selectedSet.id}`;
  partSelect.replaceChildren();
  selectedSet.parts.forEach(p=>partSelect.append(option(p.id,`${RELIC_SLOTS[p.slot]} · ${p.name}`)));
  partSelect.value=selectedSet.parts[0].id;
  renderMainStats();
}
function renderInventory(){
  document.querySelector('#relic-count').textContent=String(inventory.length);
  const container=document.querySelector('#relic-inventory');container.replaceChildren();
  if(!inventory.length)container.append(node('p','description','Пока нет реликвий. Выберите набор и добавьте первый предмет.'));
  inventory.forEach(relic=>{
    const set=RELIC_SETS.find(s=>s.id===relic.setId),part=set.parts.find(p=>p.id===relic.partId);
    const card=node('article','saved-relic');
    card.append(relicIcon(part));
    card.append(node('p','eyebrow',`${relic.rarity}★ · +${relic.level} · ${RELIC_SLOTS[part.slot]}`),node('h3','',part.name),node('p','description',set.name));
    card.append(node('strong','',statText(relic.mainStat,relic.mainValue)));
    const stats=node('ul','relic-substat-list');
    relic.substats.forEach(s=>stats.append(node('li','',statText(s.stat,s.value))));card.append(stats);
    const remove=node('button','button','Удалить');remove.type='button';remove.setAttribute('aria-label',`Удалить ${part.name}`);
    remove.addEventListener('click',()=>{
      if(saveInventory(inventory.filter(r=>r.id!==relic.id)))relicStatus.textContent=`Удалено: ${part.name}.`;
    });card.append(remove);container.append(card);
  });
}
function saveInventory(next){
  if(!storageReady){relicStatus.textContent='Сохранение недоступно. Проверьте доступ браузера к локальному хранилищу и сохранённые данные.';return false;}
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify(next));}
  catch(error){relicStatus.textContent='Не удалось сохранить инвентарь. Проверьте доступ к хранилищу и свободное место в браузере.';return false;}
  inventory=next;renderInventory();return true;
}
for(let i=0;i<4;i++){
  const row=node('div','relic-form-row'),select=node('select'),input=node('input');
  select.setAttribute('aria-label',`Дополнительная характеристика ${i+1}`);select.value='';
  input.type='number';input.min='0.001';input.step='any';input.placeholder='Значение';input.value='';input.setAttribute('aria-label',`Значение дополнительной характеристики ${i+1}`);
  row.append(select,input);document.querySelector('#relic-substats').append(row);substatRows.push({select,input});
}
relicSearch.addEventListener('input',renderSets);
partSelect.addEventListener('change',renderMainStats);
mainSelect.addEventListener('change',()=>{document.querySelector('#relic-main-value').value='';updateMainUnit();});
document.querySelector('#relic-rarity').addEventListener('change',()=>{
  const input=document.querySelector('#relic-level'),max=Number(document.querySelector('#relic-rarity').value)*3;
  input.max=String(max);input.value=String(Math.min(Number(input.value),max));
});
document.querySelector('#relic-form').addEventListener('submit',event=>{
  event.preventDefault();
  try{
    const substats=substatRows.filter(r=>r.select.value||r.input.value!=='').map(r=>({stat:r.select.value,value:r.input.value}));
    const relic=validateRelic({setId:selectedSet.id,partId:partSelect.value,rarity:document.querySelector('#relic-rarity').value,level:document.querySelector('#relic-level').value,mainStat:mainSelect.value,mainValue:document.querySelector('#relic-main-value').value,substats},RELIC_SETS);
    relic.id=crypto.randomUUID();
    if(saveInventory([...inventory,relic]))relicStatus.textContent=`Добавлено: ${selectedSet.parts.find(p=>p.id===relic.partId).name}.`;
  }catch(error){relicStatus.textContent=error.message;}
});
try{
  const stored=localStorage.getItem(STORAGE_KEY);
  if(stored){
    const parsed=JSON.parse(stored);
    if(!Array.isArray(parsed))throw Error('Invalid inventory');
    const ids=new Set();
    inventory=parsed.map(r=>{
      if(typeof r.id!=='string'||!r.id||ids.has(r.id))throw Error('Invalid ID');
      ids.add(r.id);return {...validateRelic(r,RELIC_SETS),id:r.id};
    });
  }
}catch(error){storageReady=false;document.querySelector('#add-relic').disabled=true;relicStatus.textContent='Не удалось прочитать инвентарь. Проверьте сохранённые данные и доступ к локальному хранилищу. Существующие данные не перезаписаны.';}
renderSets();renderSet();renderInventory();
