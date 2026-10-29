const profileStatus=document.querySelector('#profile-status');
let playerData={profiles:[],inventory:[]},selectedProfileId=null,profileStorageReady=true;
function profileNode(tag,className,text){const el=document.createElement(tag);if(className)el.className=className;if(text!==undefined)el.textContent=text;return el;}
const profileNumber=n=>n.toLocaleString('ru-RU',{maximumFractionDigits:2});
function loadProfile(){
  try{
    playerData=readPlayerData(localStorage,CHARACTERS,RELIC_SETS);profileStorageReady=true;
    if(playerData.missingEquipment)profileStatus.textContent='Некоторые реликвии удалены из инвентаря. Их слоты теперь свободны.';
  }catch(error){profileStorageReady=false;profileStatus.textContent=`Не удалось прочитать профиль или инвентарь: ${error.message} Сохранённые данные не перезаписаны.`;}
  if(!playerData.profiles.some(p=>p.characterId===selectedProfileId))selectedProfileId=playerData.profiles[0]?.characterId??null;
}
function saveProfiles(next){
  if(!profileStorageReady)return false;
  try{localStorage.setItem(PLAYER_PROFILE_KEY,JSON.stringify(next));}
  catch(error){profileStatus.textContent='Не удалось сохранить профиль. Проверьте доступ и свободное место в хранилище браузера.';return false;}
  playerData={...playerData,profiles:next};return true;
}
function renderProfileCatalog(){
  const list=document.querySelector('#profile-catalog');list.replaceChildren();
  const query=document.querySelector('#profile-search').value.trim().toLowerCase();
  const matches=CHARACTERS.filter(c=>c.name.toLowerCase().includes(query));
  for(const c of matches){
    const added=playerData.profiles.some(p=>p.characterId===c.id);
    const button=profileNode('button','character-card character-card-with-icon');button.type='button';button.disabled=added||!profileStorageReady;
    button.append(createCharacterIcon(c),profileNode('strong','',c.name),profileNode('span','',added?'Уже в профиле':`${c.element} · ${c.path} · Добавить +`));
    button.addEventListener('click',()=>{
      if(playerData.profiles.some(p=>p.characterId===c.id))return;
      if(saveProfiles([...playerData.profiles,{characterId:c.id,equipment:{}}])){selectedProfileId=c.id;profileStatus.textContent=`Добавлено: ${c.name}.`;renderProfile();}
    });list.append(button);
  }
  if(!matches.length)list.append(profileNode('p','description','Персонажи не найдены.'));
}
function renderProfile(){
  renderProfileCatalog();
  document.querySelector('#profile-count').textContent=String(playerData.profiles.length);
  const list=document.querySelector('#profile-list');list.replaceChildren();
  for(const p of playerData.profiles){
    const c=CHARACTERS.find(c=>c.id===p.characterId),button=profileNode('button','team-chip',c.name);button.type='button';button.prepend(createCharacterIcon(c,'team-icon'));
    button.setAttribute('aria-pressed',String(p.characterId===selectedProfileId));
    button.addEventListener('click',()=>{selectedProfileId=p.characterId;renderProfile();});list.append(button);
  }
  renderProfileDetail();
}
function createProfileRelicEditor(relic,part,characterId,slot,cancel){
  const form=profileNode('form','profile-relic-editor');
  const statLabel=key=>`${RELIC_STATS[key].name}${RELIC_STATS[key].percent?' (%)':''}`;
  const makeOption=(value,text)=>{const option=profileNode('option','',text);option.value=value;return option;};
  const mainSelect=profileNode('select','profile-edit-main-stat');
  RELIC_MAIN_STATS[part.slot].forEach(key=>mainSelect.append(makeOption(key,statLabel(key))));
  mainSelect.value=relic.mainStat;
  const mainValue=profileNode('input','profile-edit-main-value');
  mainValue.type='number';mainValue.min='0.001';mainValue.step='any';mainValue.required=true;mainValue.value=String(relic.mainValue);
  const mainField=profileNode('label','','Основная характеристика');mainField.append(mainSelect);
  const valueField=profileNode('label','','Значение');valueField.append(mainValue);
  const mainRow=profileNode('div','relic-form-row');mainRow.append(mainField,valueField);form.append(mainRow);
  form.append(profileNode('p','profile-relic-meta','Проценты вводите числом: 32,4 означает 32,4%.'));
  const substats=profileNode('fieldset','relic-substats');substats.append(profileNode('legend','','Дополнительные характеристики · до 4'));
  const rows=[];
  for(let i=0;i<4;i++){
    const row=profileNode('div','relic-form-row'),select=profileNode('select'),input=profileNode('input');
    select.append(makeOption('','Не выбрана'));
    RELIC_SUB_STATS.forEach(key=>select.append(makeOption(key,statLabel(key))));
    select.value=relic.substats[i]?.stat||'';
    select.setAttribute('aria-label',`Дополнительная характеристика ${i+1}`);
    input.type='number';input.min='0.001';input.step='any';input.value=relic.substats[i]?String(relic.substats[i].value):'';input.placeholder='Значение';
    input.setAttribute('aria-label',`Значение дополнительной характеристики ${i+1}`);
    row.append(select,input);substats.append(row);rows.push({select,input});
  }
  form.append(substats);
  const error=profileNode('p','profile-edit-error');error.setAttribute('role','alert');form.append(error);
  const actions=profileNode('div','profile-edit-actions');
  const save=profileNode('button','button button-small','Сохранить');save.type='submit';
  const discard=profileNode('button','button button-small','Отмена');discard.type='button';discard.addEventListener('click',cancel);
  actions.append(save,discard);form.append(actions);
  form.addEventListener('submit',event=>{
    event.preventDefault();error.textContent='';
    try{
      const latest=readPlayerData(localStorage,CHARACTERS,RELIC_SETS);
      const current=latest.inventory.find(r=>r.id===relic.id);
      const owner=latest.profiles.find(p=>p.characterId===characterId);
      if(!current||owner?.equipment[slot]!==relic.id)throw Error('Экипировка изменилась. Закройте редактор и выберите реликвию заново.');
      const next={...validateRelic({...current,mainStat:mainSelect.value,mainValue:mainValue.value,
        substats:rows.filter(r=>r.select.value||r.input.value!=='').map(r=>({stat:r.select.value,value:r.input.value}))},RELIC_SETS),id:current.id};
      const inventory=latest.inventory.map(r=>r.id===next.id?next:r);
      try{localStorage.setItem(PLAYER_RELIC_KEY,JSON.stringify(inventory));}
      catch(storageError){throw Error('Не удалось сохранить изменения. Проверьте доступ и свободное место в хранилище браузера.');}
      playerData={...latest,inventory};profileStatus.textContent=`Характеристики сохранены: ${part.name}.`;renderProfile();
    }catch(problem){error.textContent=problem.message;}
  });
  return form;
}
function renderProfileDetail(){
  const detail=document.querySelector('#profile-detail');detail.replaceChildren();
  const profile=playerData.profiles.find(p=>p.characterId===selectedProfileId);
  if(!profile){detail.append(profileNode('p','description','Добавьте первого персонажа из списка.'));return;}
  const base=CHARACTERS.find(c=>c.id===profile.characterId),c=calculateEquippedCharacter(base,profile,playerData.inventory,RELIC_SETS);
  detail.append(createCharacterIcon(c,'character-detail-icon',false),profileNode('h3','',c.name),profileNode('p','description',`${c.element} · ${c.path} · Уровень 80 · Экипировано ${c.equippedCount}/6`));
  const stats=profileNode('dl','character-stat-grid');
  const values=[['HP',c.hp],['ATK',c.atk],['DEF',c.def],['SPD',c.spd],['Крит. шанс',`${profileNumber(c.critRate*100)}%`],['Крит. урон',`${profileNumber(c.critDamage*100)}%`],['Попадание эффектов',`${profileNumber(c.effectHit*100)}%`],['Сопротивление эффектам',`${profileNumber(c.effectRes*100)}%`],['Эффект пробития',`${profileNumber(c.breakEffect*100)}%`],['Бонус лечения',`${profileNumber(c.healing*100)}%`],['Восстановление энергии',`${profileNumber(c.energyRegen*100)}%`]];
  for(const [element,value] of Object.entries(c.elementalDamage))if(value)values.push([`${element} DMG`,`${profileNumber(value*100)}%`]);
  values.forEach(([name,value])=>{const row=profileNode('div');row.append(profileNode('dt','',name),profileNode('dd','',typeof value==='number'?profileNumber(value):value));stats.append(row);});detail.append(stats);
  detail.append(profileNode('h3','','Экипировка'),profileNode('p','description','Основные и дополнительные характеристики реликвий включены в показатели выше. В бою HP и SPD влияют на здоровье и очередь ходов; ATK, HP или DEF, критические и стихийные бонусы определяют урон базовой атаки.'));
  const equipment=profileNode('div','profile-equipment');
  for(const [slot,label] of Object.entries(RELIC_SLOTS)){
    const row=profileNode('div','profile-equipment-slot'),select=profileNode('select');select.setAttribute('aria-label',`Экипировка: ${label}`);select.disabled=!profileStorageReady;
    const empty=profileNode('option','','Не экипировано');empty.value='';select.append(empty);
    const candidates=playerData.inventory.filter(r=>RELIC_SETS.find(s=>s.id===r.setId)?.parts.find(p=>p.id===r.partId)?.slot===Number(slot));
    for(const relic of candidates){
      const set=RELIC_SETS.find(s=>s.id===relic.setId),part=set.parts.find(p=>p.id===relic.partId);
      const owner=playerData.profiles.find(p=>p.characterId!==profile.characterId&&Object.values(p.equipment).includes(relic.id));
      const stat=RELIC_STATS[relic.mainStat];
      const option=profileNode('option','',`${part.name} · ${relic.rarity}★ +${relic.level} · ${stat.name} ${profileNumber(relic.mainValue)}${stat.percent?'%':''}${owner?' · занято':''}`);
      option.value=relic.id;option.disabled=Boolean(owner);select.append(option);
    }
    select.value=profile.equipment[slot]||'';
    const current=playerData.inventory.find(r=>r.id===select.value);
    const part=current&&RELIC_SETS.find(s=>s.id===current.setId)?.parts.find(p=>p.id===current.partId);
    const image=profileNode('img','relic-icon');image.src=part?.icon||'assets/relics/placeholder.svg';image.alt='';image.width=64;image.height=64;
    image.onerror=()=>{image.onerror=null;image.src='assets/relics/placeholder.svg';};
    const content=profileNode('div','profile-relic-content');
    const field=profileNode('label','',label);field.append(select);content.append(field);
    if(current){
      const set=RELIC_SETS.find(s=>s.id===current.setId);
      content.append(profileNode('p','profile-relic-meta',`${set.name} · ${current.rarity}★ · +${current.level}`));
      const main=RELIC_STATS[current.mainStat];
      content.append(profileNode('p','profile-relic-main',`Основная: ${main.name} +${profileNumber(current.mainValue)}${main.percent?'%':''}`));
      const substats=profileNode('ul','profile-relic-substats');
      for(const sub of current.substats){
        const stat=RELIC_STATS[sub.stat];
        substats.append(profileNode('li','',`${stat.name} +${profileNumber(sub.value)}${stat.percent?'%':''}`));
      }
      if(current.substats.length)content.append(substats);
      else content.append(profileNode('p','profile-relic-meta','Дополнительных характеристик нет.'));
      const edit=profileNode('button','button button-small profile-edit-relic','✎ Редактировать');edit.type='button';edit.disabled=!profileStorageReady;
      edit.setAttribute('aria-label',`Редактировать характеристики: ${part.name}`);edit.setAttribute('aria-expanded','false');
      const editor=profileNode('div');editor.hidden=true;
      const close=()=>{editor.replaceChildren();editor.hidden=true;edit.setAttribute('aria-expanded','false');};
      edit.addEventListener('click',()=>{
        if(!editor.hidden){close();return;}
        editor.replaceChildren();editor.append(createProfileRelicEditor(current,part,profile.characterId,slot,close));
        editor.hidden=false;edit.setAttribute('aria-expanded','true');
      });content.append(edit,editor);
    }else content.append(profileNode('p','profile-relic-meta','В этом слоте нет реликвии.'));
    row.append(image,content);equipment.append(row);
    select.addEventListener('change',()=>{
      try{
        // Re-read shared storage so an item equipped in another tab cannot be reused.
        const latest=readPlayerData(localStorage,CHARACTERS,RELIC_SETS);
        const next=equipProfileRelic(latest.profiles,profile.characterId,slot,select.value,latest.inventory,RELIC_SETS);
        if(saveProfiles(next)){playerData={...latest,profiles:next};profileStatus.textContent=`Экипировка сохранена: ${label}.`;}
      }catch(error){profileStatus.textContent=error.message;}
      renderProfile();
    });
  }
  detail.append(equipment);
  if(!playerData.inventory.length)detail.append(profileNode('p','description','Инвентарь пуст. Сначала добавьте реликвии на странице «Реликвии».'));
  detail.append(profileNode('h3','','Бонусы комплектов'),profileNode('p','description','Количество предметов отслеживается, но эффекты комплектов пока не применяются к характеристикам и бою.'));
  if(c.setBonuses.length)c.setBonuses.forEach(b=>detail.append(profileNode('p','description',`${b.setName} · ${b.count} предмета: ${b.description}`)));
  else detail.append(profileNode('p','description','Комплекты пока не собраны.'));
  const remove=profileNode('button','button','Убрать персонажа из профиля');remove.type='button';remove.disabled=!profileStorageReady;
  remove.addEventListener('click',()=>{
    if(saveProfiles(playerData.profiles.filter(p=>p.characterId!==profile.characterId))){selectedProfileId=playerData.profiles[0]?.characterId??null;profileStatus.textContent=`${base.name} убран из профиля. Реликвии остались в инвентаре.`;renderProfile();}
  });detail.append(remove);
}
document.querySelector('#profile-search').addEventListener('input',renderProfileCatalog);
if(typeof window!=='undefined')window.addEventListener('storage',event=>{if([PLAYER_PROFILE_KEY,PLAYER_RELIC_KEY].includes(event.key)||event.key===null){loadProfile();renderProfile();}});
loadProfile();renderProfile();
