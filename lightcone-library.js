function calculateLightConeStats(cone,level){
  if(!Number.isInteger(level)||level<1||level>80)throw new RangeError('Уровень конуса: 1–80.');
  const stage=cone.stats.filter(s=>level>=s.minLevel&&level<=s.maxLevel).at(-1);
  if(!stage)throw new RangeError('Нет данных для выбранного уровня.');
  return {hp:Math.round(stage.hp+(level-1)*stage.hpAdd),atk:Math.round(stage.atk+(level-1)*stage.atkAdd),def:Math.round(stage.def+(level-1)*stage.defAdd),promotion:stage.promotion};
}
if(typeof module!=='undefined')module.exports={calculateLightConeStats};
if(typeof document!=='undefined'){
  const list=document.querySelector('#lightcone-list'),detail=document.querySelector('#lightcone-detail');
  const search=document.querySelector('#lightcone-search'),path=document.querySelector('#lightcone-path'),rarity=document.querySelector('#lightcone-rarity');
  let selected=null;
  function node(tag,className,text){const el=document.createElement(tag);if(className)el.className=className;if(text!==undefined)el.textContent=text;return el;}
  function icon(cone,large=false){
    const img=node('img',large?'lightcone-art':'lightcone-icon');img.src=cone.icon;img.alt='';img.width=large?180:56;img.height=large?252:78;img.loading=large?'eager':'lazy';img.decoding='async';
    img.onerror=()=>{img.onerror=null;img.src='assets/lightcones/placeholder.svg';};return img;
  }
  [...new Set(LIGHT_CONES.map(c=>c.path))].sort().forEach(name=>{const option=node('option','',name);option.value=name;path.append(option);});
  function renderList(){
    list.replaceChildren();const query=search.value.trim().toLowerCase();
    const matches=LIGHT_CONES.filter(c=>`${c.name} ${c.id}`.toLowerCase().includes(query)&&(!path.value||c.path===path.value)&&(!rarity.value||c.rarity===Number(rarity.value)));
    document.querySelector('#lightcone-count').textContent=`Найдено: ${matches.length} из ${LIGHT_CONES.length}`;
    for(const c of matches){
      const button=node('button','character-card character-card-with-icon');button.type='button';button.setAttribute('aria-pressed',String(c.id===selected));button.setAttribute('aria-controls','lightcone-detail');
      button.append(icon(c),node('strong','',c.name),node('span','',`${c.rarity}★ · ${c.path}`));
      button.addEventListener('click',()=>{selected=c.id;for(const item of list.children)item.setAttribute('aria-pressed',String(item===button));renderDetail(c);});list.append(button);
    }
    if(!matches.length)list.append(node('p','description','Световые конусы не найдены. Измените поиск или фильтры.'));
  }
  function renderDetail(cone){
    detail.replaceChildren();const heading=node('h2','',cone.name);heading.id='lightcone-detail-heading';detail.append(heading,icon(cone,true),node('p','description',`${cone.rarity}★ · ${cone.path}`));
    if(cone.description)detail.append(node('p','character-description',cone.description));
    const controls=node('div','lightcone-filters'),levelLabel=node('label','library-search','Уровень'),levelInput=node('input');
    levelInput.type='number';levelInput.min='1';levelInput.max='80';levelInput.step='1';levelInput.value='80';levelInput.required=true;levelLabel.append(levelInput);
    const rankLabel=node('label','library-search','Наложение'),rankSelect=node('select');
    for(const rank of Object.keys(cone.effects)){const option=node('option','',`S${rank}`);option.value=rank;rankSelect.append(option);}rankSelect.value='1';rankLabel.append(rankSelect);controls.append(levelLabel,rankLabel);detail.append(controls);
    const error=node('p','profile-edit-error');error.setAttribute('role','alert');detail.append(error);
    const stats=node('dl','character-stat-grid'),promotion=node('p','description');detail.append(stats,promotion);
    detail.append(node('h3','',cone.effectName));const effect=node('p','skill-description');detail.append(effect);
    detail.append(node('p','description','Базовые HP, ATK и DEF зависят от уровня; эффект — от наложения. Выбрано максимальное возвышение для указанного уровня. Эффект конуса действует при совпадении пути с персонажем. Эта страница — справочник; экипировка конусов пока не подключена.'));
    const source=node('a','back','Карточка на Nanoka ↗');source.href=`https://hsr.nanoka.cc/lightcone/${cone.id}`;source.target='_blank';source.rel='noopener';detail.append(source);
    function update(){
      error.textContent='';
      try{const values=calculateLightConeStats(cone,Number(levelInput.value));stats.replaceChildren();
        for(const key of ['hp','atk','def']){const row=node('div');row.append(node('dt','',key.toUpperCase()),node('dd','',values[key].toLocaleString('ru-RU')));stats.append(row);}
        promotion.textContent=`Уровень ${levelInput.value} · Возвышение ${values.promotion}/6`;
      }catch(problem){stats.replaceChildren();promotion.textContent='';error.textContent=problem.message;}
      effect.textContent=cone.effects[rankSelect.value]||'Описание эффекта отсутствует.';
    }
    levelInput.addEventListener('input',update);rankSelect.addEventListener('change',update);update();
  }
  search.addEventListener('input',renderList);path.addEventListener('change',renderList);rarity.addEventListener('change',renderList);renderList();
}
