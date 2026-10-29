const selected = [], selectedMonsters = [];
const selectedMonsterLevels = [];
const status = document.querySelector('.status');
const nextButton = document.querySelector('#next');
const basicButton = document.querySelector('#basic-attack');
const list = document.querySelector('#turns');
const formatAV = value => value.toLocaleString('ru-RU', {maximumFractionDigits: 2});
function createMonsterIcon(monster,className='character-icon',lazy=true){
  const image=document.createElement('img');image.className=className;
  image.src=monster.icon||'assets/monsters/placeholder.svg';image.alt='';image.width=64;image.height=64;
  image.loading=lazy?'lazy':'eager';image.decoding='async';
  image.onerror=()=>{image.onerror=null;image.src='assets/monsters/placeholder.svg';};
  return image;
}
let combatants = [], fighters = [], schedule, position = 0, rows = [], battleActive = false;
let battleProfileData={profiles:[],inventory:[]},profileDataError='';
function refreshBattleProfiles(){
  try{battleProfileData=readPlayerData(localStorage,CHARACTERS,RELIC_SETS);profileDataError='';}
  catch(error){battleProfileData={profiles:[],inventory:[]};profileDataError='Не удалось прочитать профиль. Проверьте данные на странице «Профиль» или выберите общий список.';}
}
function getBattleCharacters(){
  if(document.querySelector('#character-source').value!=='profile')return CHARACTERS;
  return battleProfileData.profiles.map(p=>calculateEquippedCharacter(CHARACTERS.find(c=>c.id===p.characterId),p,battleProfileData.inventory,RELIC_SETS));
}
function renderPicker({selection, catalog, limit, count, summary, grid, search, enemies}) {
  document.querySelector(count).textContent = `${selection.length}/${limit}`;
  const chips = document.querySelector(summary); chips.replaceChildren();
  selection.forEach((id, i) => {
    const c = catalog.find(c => c.id === id), button = document.createElement('button');
    button.type = 'button'; button.className = 'team-chip';
    button.textContent = `${i + 1}. ${c.name} ×`;
    button.setAttribute('aria-label', `Убрать ${c.name}, позиция ${i + 1}`);
    button.prepend(enemies?createMonsterIcon(c,'team-icon'):createCharacterIcon(c,'team-icon'));
    button.onclick = () => { selection.splice(i, 1); if(enemies)selectedMonsterLevels.splice(i,1); renderSelection(); };
    if(enemies){
      const card=document.createElement('div');card.className='enemy-setup-card';
      const label=document.createElement('label');label.textContent='Уровень противника';
      const levelSelect=document.createElement('select');
      levelSelect.setAttribute('aria-label',`Уровень: ${c.name}, позиция ${i+1}`);
      getMonsterLevels(c).forEach(level=>{const option=document.createElement('option');option.value=String(level);option.textContent=String(level);levelSelect.append(option);});
      levelSelect.value=String(selectedMonsterLevels[i]??80);
      const stats=document.createElement('p');stats.className='fighter-stats';
      const update=()=>{const scaled=monsterAtLevel(c,Number(levelSelect.value));stats.textContent=`HP ${scaled.hp} · ATK ${scaled.atk} · DEF ${scaled.def} · SPD ${scaled.spd} · Стойкость ${formatAV(toToughnessUnits(scaled.toughness))}`;};
      levelSelect.addEventListener('change',()=>{try{update();selectedMonsterLevels[i]=Number(levelSelect.value);}catch(error){status.textContent=error.message;}});
      update();label.append(levelSelect);card.append(button,label,stats);chips.append(card);
    }else chips.append(button);
  });
  const container = document.querySelector(grid); container.replaceChildren();
  const query = document.querySelector(search).value.trim().toLowerCase();
  catalog.filter(c => `${c.name} ${c.id}`.toLowerCase().includes(query)).forEach(c => {
    const button = document.createElement('button'); button.type = 'button'; button.className = 'character-card';
    const active = selection.includes(c.id);
    const unsupported = !enemies && !getBasicAttackDamageSpec(CHARACTER_DETAILS[c.id]?.groups[0]?.skills.find(skill=>skill.type==='Basic ATK'));
    if (!enemies) button.setAttribute('aria-pressed', String(active));
    button.disabled = (unsupported && !active) || (selection.length >= limit && (enemies || !active));
    button.className += ' character-card-with-icon';
    button.append(enemies?createMonsterIcon(c):createCharacterIcon(c));
    const title = document.createElement('strong'); title.textContent = c.name;
    const type = document.createElement('span');
    type.textContent = enemies ? `${c.rank} · ID ${c.id} · в группе: ${selection.filter(id => id === c.id).length}` : `${c.rarity}★ · ${c.element} · ${c.path}${c.profileCharacter ? ` · Профиль · ${c.equippedCount}/6` : ''}`;
    if(unsupported)type.textContent+=' · Отдельная формула урона пока не поддерживается';
    const stats = document.createElement('span'); stats.textContent = `HP ${c.hp} · ATK ${c.atk} · DEF ${c.def} · SPD ${c.spd}`;
    const extra = document.createElement('span');
    extra.textContent = enemies ? `Уязвимости: ${c.weaknesses.join(', ') || 'нет'} · стойкость ${formatAV(toToughnessUnits(c.toughness))}` : `Крит. шанс ${formatAV(c.critRate * 100)}% · крит. урон ${formatAV(c.critDamage * 100)}% · агро ${c.aggro}`;
    button.append(title, type, stats, extra);
    button.onclick = () => {
      if (!enemies && active) selection.splice(selection.indexOf(c.id), 1);
      else if (selection.length < limit) {selection.push(c.id);if(enemies)selectedMonsterLevels.push(80);}
      renderSelection();
    };
    container.append(button);
  });
  if (!container.children.length) container.textContent = 'Ничего не найдено.';
}
function renderSelection() {
  renderPicker({selection:selected,catalog:getBattleCharacters(),limit:4,count:'#team-count',summary:'#selected-team',grid:'#characters',search:'#search',enemies:false});
  renderPicker({selection:selectedMonsters,catalog:MONSTERS,limit:5,count:'#enemy-count',summary:'#selected-enemies',grid:'#monsters',search:'#monster-search',enemies:true});
  document.querySelector('#start').disabled = !selected.length || !selectedMonsters.length;
  document.querySelector('#character-source-description').textContent=document.querySelector('#character-source').value==='profile'
    ? profileDataError || (battleProfileData.profiles.length?'Персонажи из профиля с экипировкой. Здоровье и скорость учитывают характеристики реликвий.':'Профиль пуст. Добавьте персонажей на странице «Профиль».')
    : 'Общий список: базовые характеристики без экипировки.';
}
function createFighter(c) {
  const el = document.createElement('div'); el.className = `fighter${c.side === 'enemy' ? ' enemy' : ''}`;
  el.innerHTML = '<div class="health" role="progressbar" aria-valuemin="0"><div class="health-fill"></div><span class="health-value"></span></div><div class="avatar"></div><strong class="fighter-name"></strong><p class="fighter-stats"></p>';
  if (c.side === 'enemy') {
    const toughness = document.createElement('div');
    toughness.className = 'toughness';
    toughness.setAttribute('role', 'progressbar');
    toughness.setAttribute('aria-label', `Стойкость: ${c.name}`);
    toughness.setAttribute('aria-valuemin', 0);
    toughness.setAttribute('aria-valuemax', c.toughness);
    toughness.innerHTML = '<div class="toughness-fill"></div><span class="toughness-value"></span>';
    el.prepend(toughness);
  }
  el.querySelector('.avatar').textContent = c.name.split(' ').map(s=>s[0]).slice(0,2).join('');
  if (c.side === 'ally') {
    el.querySelector('.avatar').textContent = '';
    el.querySelector('.avatar').append(createCharacterIcon(c, 'fighter-icon', false));
  }else{
    el.querySelector('.avatar').textContent='';
    el.querySelector('.avatar').append(createMonsterIcon(c,'fighter-icon',false));
  }
  el.querySelector('.fighter-name').textContent = c.name;
  el.querySelector('.fighter-stats').textContent = `${c.side==='enemy'?`Ур. ${c.level} · `:''}`+(c.spd === 0 ? `SPD 0 · нет самостоятельных ходов` : `SPD ${c.spd} · AV ${formatAV(10000 / c.spd)}`);
  const bar = el.querySelector('.health'); bar.setAttribute('aria-label', `Здоровье: ${c.name}`); bar.setAttribute('aria-valuemax', c.hp);
  return el;
}
function renderHealth() {
  combatants.forEach((c,i) => {
    fighters[i].querySelector('.health-fill').style.width = `${c.health / c.hp * 100}%`;
    fighters[i].querySelector('.health-value').textContent = `${c.health}/${c.hp}`;
    fighters[i].querySelector('.health').setAttribute('aria-valuenow',c.health);
    fighters[i].classList.toggle('defeated',c.health === 0);
    if (c.side === 'enemy') {
      fighters[i].querySelector('.toughness-fill').style.width = `${c.toughness > 0 ? c.remainingToughness / c.toughness * 100 : 0}%`;
      fighters[i].querySelector('.toughness-value').textContent = `${formatAV(c.remainingToughness)}/${formatAV(c.toughness)}`;
      fighters[i].querySelector('.toughness').setAttribute('aria-valuenow', c.remainingToughness);
    }
  });
}
function showDamage(fighter,damage,critical){
  let number=fighter.querySelector('.damage-number');
  if(!number){
    number=document.createElement('span');number.className='damage-number';
    number.setAttribute('aria-hidden','true');fighter.append(number);
  }
  if(fighter.damageTimer)clearTimeout(fighter.damageTimer);
  number.classList.remove('damage-visible','damage-critical');
  number.textContent=`−${damage.toLocaleString('ru-RU')}${critical?' КРИТ!':''}`;
  void number.offsetWidth;
  number.classList.toggle('damage-critical',critical);
  number.classList.add('damage-visible');
  fighter.damageTimer=setTimeout(()=>number.classList.remove('damage-visible'),1600);
}
function markNext() {
  rows.forEach(row => row.removeAttribute('aria-current'));
  if (rows[position] && battleActive) rows[position].setAttribute('aria-current', 'step');
}
function renderSchedule() {
  list.replaceChildren(); rows = [];
  schedule.cycles.forEach((cycle, i) => {
    const section = document.createElement('section'); section.className = 'cycle';
    const heading = document.createElement('h3'); heading.textContent = `Цикл ${i + 1} · ${cycle.end - cycle.start} AV · ${cycle.start}–${cycle.end} AV`; section.append(heading);
    const turns = document.createElement('ol');
    cycle.turns.forEach(turn => {
      const row = document.createElement('li'); row.textContent = `${combatants[turn.actor].name} · ${formatAV(turn.av)} AV`; turns.append(row); rows.push(row);
    });
    if (cycle.turns.length) section.append(turns);
    else { const empty = document.createElement('p'); empty.textContent = 'Нет ходов в этом цикле.'; section.append(empty); }
    list.append(section);
  }); markNext();
}
document.querySelector('#search').addEventListener('input',renderSelection);
document.querySelector('#monster-search').addEventListener('input',renderSelection);
function updateActions() {
  const actor = battleActive ? combatants[schedule.turns[position].actor] : null;
  nextButton.disabled = !actor || actor.side !== 'enemy';
  basicButton.disabled = !actor || actor.side !== 'ally' || !actor.basicDamageSpec;
  document.querySelector('#skill').disabled = true;
  document.querySelector('#ultimate').disabled = true;
  document.querySelector('#action-prompt').textContent = !actor ? 'Бой завершён.'
    : actor.side === 'enemy' ? `Ход: ${actor.name}. Нажмите «Ход противника».`
    : `Ход: ${actor.name}. Выберите атаку.${actor.basicDamageSpec ? '' : ' Эта атака использует отдельную формулу (например, урон Радости) и пока не поддерживается.'}`;
  if (actor?.side === 'ally' && actor.basicAttack) basicButton.title = actor.basicAttack.name;
  const preview=document.querySelector('#toughness-preview');
  const damagePreview=document.querySelector('#damage-preview');damagePreview.textContent='';
  preview.textContent='';
  if(actor?.side==='ally' && actor.basicAttack){
    const target=findTarget(combatants,schedule.turns[position].actor);
    if(target>=0){
      const defender=combatants[target],result=getAttackToughnessReduction(actor,defender),m=result.modifiers;
      preview.textContent=`Цель: ${defender.name}. `+(!result.weaknessMatched?'Нет совпадения с уязвимостью: снижение стойкости 0.'
        : `Стойкость: (${formatAV(result.base)} + ${formatAV(m.additive)}) × ${formatAV(1+m.increase)} × ${formatAV(1+m.breakEfficiency+m.vulnerability)} × ${formatAV(m.abilityMultiplier)} = ${formatAV(result.potential)}. Снимет ${formatAV(result.damage)} из оставшихся ${formatAV(defender.remainingToughness)}.`);
      if(actor.basicDamageSpec){
        const spec=actor.basicDamageSpec,ability={components:[spec.primary],type:'basic',element:actor.element};
        const normal=calculateSkillDamage(actor,defender,ability),critical=calculateSkillDamage(actor,defender,ability,{critical:true});
        damagePreview.textContent=`Базовая атака · уровень ${spec.level}: ${formatAV(spec.primary.multiplier*100)}% ${spec.primary.stat.toUpperCase()}. Урон по основной цели: ${normal.damage} без крита / ${critical.damage} с критом; шанс крита ${formatAV(Math.min(1,Math.max(0,actor.critRate))*100)}%. DEF ×${formatAV(normal.factors.defense)}, RES ×${formatAV(normal.factors.resistance)}, стойкость ×${formatAV(normal.factors.broken)}.`;
      }
    }
  }
}
document.querySelector('#setup').addEventListener('submit', event => {
  event.preventDefault();
  if (!selected.length || selected.length > 4 || !selectedMonsters.length || selectedMonsters.length > 5) return;
  refreshBattleProfiles();
  const catalog=getBattleCharacters();
  if(selected.some(id=>!catalog.some(c=>c.id===id))){
    const available=new Set(catalog.map(c=>c.id));
    for(let i=selected.length-1;i>=0;i--)if(!available.has(selected[i]))selected.splice(i,1);
    renderSelection();status.textContent=profileDataError || 'Состав профиля изменился. Выберите персонажей заново.';return;
  }
  let team;
  try{team = [
    ...selected.map((id,i)=>({...catalog.find(c=>c.id===id),side:'ally',slot:i+1,
      basicAttack:CHARACTER_DETAILS[id]?.groups[0]?.skills.find(skill=>skill.type === 'Basic ATK')})),
    ...selectedMonsters.map((id,i)=>{const monster=monsterAtLevel(MONSTERS.find(c=>c.id===id),selectedMonsterLevels[i]??80);
      return {...monster,toughness:toToughnessUnits(monster.toughness),side:'enemy',slot:i+1};})
  ];}catch(error){status.textContent=error.message;return;}
  try { schedule = createSchedule(team.map(c=>c.spd),Number(document.querySelector('#cycles').value)); }
  catch(error) { status.textContent=error.message; return; }
  combatants=team.map(c=>({...c,level:c.level??80,basicDamageSpec:c.side==='ally'?getBasicAttackDamageSpec(c.basicAttack):null,name:`${c.side==='enemy'?'Противник':'Персонаж'} ${c.slot}: ${c.name}`,health:c.hp,remainingToughness:c.toughness})); position=0;
  document.querySelector('#allies').replaceChildren(); document.querySelector('#enemies').replaceChildren();
  fighters=combatants.map(c=> { const el=createFighter(c); document.querySelector(c.side==='enemy'?'#enemies':'#allies').append(el); return el; });
  document.querySelector('.arena').hidden=false;
  document.querySelector('#battle-actions').hidden=false;
  battleActive=schedule.turns.length>0;
  renderHealth(); renderSchedule(); updateActions();
  status.textContent=!battleActive?'Бой завершён: нет ходов за выбранные циклы.':'Бой готов. Действия доступны для текущего участника.';
});
function executeAttack() {
  if(!battleActive) return;
  const turn=schedule.turns[position];
  const target=findTarget(combatants,turn.actor);
  fighters.forEach(el=>el.classList.remove('attacking','hit')); void fighters[turn.actor].offsetWidth;
  fighters[turn.actor].classList.add('attacking'); fighters[target].classList.add('hit');
  const attacker = combatants[turn.actor], defender = combatants[target];
  const targets=attacker.side==='ally'?getBasicAttackTargets(combatants,target,attacker.basicAttack):[{index:target,component:'primary',toughnessIndex:0}];
  const messages=[];
  for(const hit of targets){
    const victim=combatants[hit.index];
    const component=attacker.basicDamageSpec?.[hit.component];
    if(attacker.side==='ally'&&!component)continue;
    const critical=attacker.side==='ally'&&Math.random()<Math.min(1,Math.max(0,attacker.critRate??0));
    // Calculate HP damage against the pre-hit toughness state, then deplete the bar.
    const damage=attacker.side==='ally'?calculateSkillDamage(attacker,victim,{components:[component],type:'basic',element:attacker.element},{critical}).damage:1;
    const ability=attacker.basicAttack?{...attacker.basicAttack,toughnessReduction:[attacker.basicAttack.toughnessReduction[hit.toughnessIndex],0,0]}:undefined;
    const toughnessDamage=getAttackToughnessReduction(attacker,victim,ability).damage;
    const healthDamage=Math.min(victim.health,damage);
    victim.health=Math.max(0,victim.health-damage);
    if(toughnessDamage>0)victim.remainingToughness-=toughnessDamage;
    fighters[hit.index].classList.add('hit');
    showDamage(fighters[hit.index],healthDamage,critical);
    messages.push(`${victim.name}: −${healthDamage} HP${critical?' · КРИТ':''}${toughnessDamage>0?` · −${formatAV(toughnessDamage)} стойкости`:''}`);
  }
  renderHealth(); rows[position].classList.add('completed'); position++;
  status.textContent=`Цикл ${turn.cycle+1} · ${formatAV(turn.av)} AV: ${attacker.name}${attacker.side==='ally'?' · базовая атака':''}. ${messages.join('; ')}.`;
  while(position<schedule.turns.length && combatants[schedule.turns[position].actor].health===0) rows[position++].classList.add('cancelled');
  const winner=battleWinner(combatants);
  if(winner) {
    battleActive=false; status.textContent+=winner==='enemy'?' Поражение отряда.':' Победа отряда!'; rows.slice(position).forEach(row=>row.classList.add('cancelled'));
  } else if(position===schedule.turns.length) { battleActive=false; status.textContent+=' Все циклы завершены. Ничья.'; }
  markNext(); updateActions();
}
nextButton.addEventListener('click', () => {
  if(battleActive && !nextButton.disabled && combatants[schedule.turns[position].actor].side === 'enemy') executeAttack();
});
basicButton.addEventListener('click', () => {
  if(battleActive && !basicButton.disabled && combatants[schedule.turns[position].actor].side === 'ally') executeAttack();
});
document.querySelector('#character-source').addEventListener('change',()=>{
  refreshBattleProfiles();selected.splice(0,selected.length);renderSelection();
});
if(typeof window!=='undefined')window.addEventListener('storage',event=>{
  if([PLAYER_PROFILE_KEY,PLAYER_RELIC_KEY].includes(event.key)||event.key===null){
    refreshBattleProfiles();const ids=new Set(getBattleCharacters().map(c=>c.id));
    for(let i=selected.length-1;i>=0;i--)if(!ids.has(selected[i]))selected.splice(i,1);
    renderSelection();
  }
});
refreshBattleProfiles();
document.querySelector('#character-source').value=battleProfileData.profiles.length?'profile':'all';
renderSelection();
basicButton.disabled = true;
document.querySelector('#skill').disabled = true;
document.querySelector('#ultimate').disabled = true;
