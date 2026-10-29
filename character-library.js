function cleanCharacterText(text) {
  return String(text || '')
    .replace(/<[^>]*>/g, '')
    .replace(/\\n/g, '\n')
    .replace(/\{NICKNAME\}/g, 'Trailblazer')
    .replace(/\{[FM]#([^}]+)\}/g, '$1')
    .replace(/\{RUBY_B#[^}]*\}|\{RUBY_E#\}/g, '');
}
function formatSkillDescription(description, params) {
  return cleanCharacterText(description).replace(/#(\d+)\[(i|f\d+)\](%?)/g, (token, index, format, percent) => {
    const value = params[Number(index) - 1];
    if (!Number.isFinite(value)) return '—' + percent;
    const digits = format === 'i' ? 0 : Number(format.slice(1));
    const amount = percent ? value * 100 : value;
    return amount.toLocaleString('en-US', {minimumFractionDigits:digits, maximumFractionDigits:digits}) + percent;
  });
}
if (typeof module !== 'undefined') module.exports = {cleanCharacterText,formatSkillDescription};
if (typeof document !== 'undefined') {
  const search = document.querySelector('#character-search');
  const list = document.querySelector('#character-list');
  const detail = document.querySelector('#character-detail');
  const number = value => value.toLocaleString('ru-RU', {maximumFractionDigits:2});
  let selectedId = null;
  const targetNames = {SingleAttack:'Одиночная цель',Defence:'Защита',AoEAttack:'Все цели',MazeAttack:'Атака вне боя',Enhance:'Усиление',Blast:'Взрывная атака',Impair:'Ослабление',Bounce:'Отскок',Support:'Поддержка',Restore:'Восстановление',Summon:'Призыв'};
  const typeNames = {'Basic ATK':'Базовая атака','Skill':'Навык','Ultimate':'Сверхспособность','Talent':'Талант','Technique':'Техника','Overworld Attack':'Атака вне боя','Memosprite Skill':'Навык духа памяти','Memosprite Talent':'Талант духа памяти','Elation Skill':'Навык Радости','Innate Trace':'Врождённый след','Assist Skill':'Навык поддержки','Ability':'Способность'};
  function element(tag, className, text) {
    const node = document.createElement(tag);
    if(className) node.className = className;
    if(text !== undefined) node.textContent = text;
    return node;
  }
  function renderList() {
    list.replaceChildren();
    const query = search.value.trim().toLowerCase();
    const matches = CHARACTERS.filter(c=>c.name.toLowerCase().includes(query));
    document.querySelector('#character-count').textContent = `Найдено: ${matches.length} из ${CHARACTERS.length}`;
    matches.forEach(c=> {
      const button = element('button','character-card'); button.type='button';
      button.setAttribute('aria-pressed', String(c.id === selectedId));
      button.setAttribute('aria-controls','character-detail');
      button.className += ' character-card-with-icon';
      button.append(createCharacterIcon(c));
      button.append(element('strong','',c.name),element('span','',`${c.rarity}★ · ${c.element} · ${c.path}`));
      button.addEventListener('click',()=> {
        selectedId=c.id;
        for (const item of list.children) item.setAttribute('aria-pressed', String(item === button));
        renderDetail(c);
      });
      list.append(button);
    });
    if(!matches.length) list.append(element('p','description','Персонажи не найдены. Попробуйте другое имя.'));
  }
  function skillCard(skill) {
    const card=element('article','skill-card');
    card.append(element('p','skill-type',typeNames[skill.type] || skill.type),element('h4','',cleanCharacterText(skill.name)));
    const characteristics=element('dl','skill-stat-grid');
    const statValue=value=>Number.isFinite(value)?number(value):'—';
    const stats=[
      ['Тип действия',targetNames[skill.targetType] || skill.targetType || '—'],
      ['Восстановление энергии',statValue(skill.energyGain)],
      ['Расход очков навыков',statValue(skill.skillPointCost)],
      ['Получение очков навыков',statValue(skill.skillPointGain)],
      ['Снижение стойкости · одиночная цель',statValue(toToughnessUnits(skill.toughnessReduction?.[0]))],
      ['Снижение стойкости · все цели',statValue(toToughnessUnits(skill.toughnessReduction?.[1]))],
      ['Снижение стойкости · соседние цели',statValue(toToughnessUnits(skill.toughnessReduction?.[2]))]
    ];
    stats.forEach(([name,value])=> {
      const entry=element('div');
      entry.append(element('dt','',name),element('dd','',value));
      characteristics.append(entry);
    });
    card.append(characteristics);
    const levels=Object.keys(skill.levels).map(Number).sort((a,b)=>a-b);
    const defaultLevel=skill.type==='Basic ATK'?6:10;
    const chosen=levels.includes(defaultLevel)?defaultLevel:(levels.at(-1) ?? 1);
    const description=element('p','skill-description');
    const missingValues=element('p','description','Часть числовых значений отсутствует в источнике и обозначена знаком «—».');
    function update(level) {
      description.textContent=formatSkillDescription(skill.description,skill.levels[level] || []);
      missingValues.hidden=!description.textContent.includes('—');
    }
    if(levels.length) {
      const label=element('label','skill-level','Уровень способности '), select=element('select');
      select.setAttribute('aria-label',`Уровень: ${cleanCharacterText(skill.name)}`);
      levels.forEach(level=> {const option=element('option','',String(level));option.value=String(level);select.append(option);});
      select.value=String(chosen);
      select.addEventListener('change',()=>update(select.value));
      label.append(select); card.append(label);
    }
    update(chosen); card.append(description,missingValues); return card;
  }
  function renderDetail(c) {
    detail.replaceChildren();
    const data=CHARACTER_DETAILS[c.id];
    const heading=element('h2','',c.name); heading.id='detail-heading'; detail.append(heading);
    detail.append(createCharacterIcon(c, 'character-detail-icon', false));
    detail.append(element('p','description',`${c.rarity}★ · ${c.element} · ${c.path}`));
    if(data?.description) detail.append(element('p','character-description',cleanCharacterText(data.description)));
    detail.append(element('h3','','Характеристики'),element('p','description','Уровень 80 · максимальное возвышение · без конуса, реликвий и бонусов следов.'));
    const stats=element('dl','character-stat-grid');
    const values=[['HP',number(c.hp)],['ATK',number(c.atk)],['DEF',number(c.def)],['SPD',number(c.spd)],['Крит. шанс',`${number(c.critRate*100)}%`],['Крит. урон',`${number(c.critDamage*100)}%`],['Агро',number(c.aggro)]];
    if(Number.isFinite(data?.energy)) values.push(['Энергия',number(data.energy)]);
    values.forEach(([name,value])=> {const entry=element('div');entry.append(element('dt','',name),element('dd','',value));stats.append(entry);});
    detail.append(stats,element('h3','','Способности'));
    detail.append(element('p','description','По умолчанию: базовая атака — уровень 6, остальные навыки — 10; для способностей с меньшим пределом выбран максимальный доступный уровень. Уровень каждой способности можно изменить.'));
    detail.append(element('p','description','Множители урона, лечения, щитов и длительность эффектов указаны в описании для выбранного уровня. Стойкость — в игровых единицах, как в бою симулятора (исходные значения Nanoka ÷ 3). Знак «—» означает, что источник не указывает значение.'));
    if(data?.groups.length) data.groups.forEach(group=> {
      const section=element('section','skill-group');section.append(element('h3','',group.name));
      group.skills.forEach(skill=>section.append(skillCard(skill)));detail.append(section);
    });
    else detail.append(element('p','description','Данные способностей пока отсутствуют.'));
    const source=element('a','back','Открыть карточку на Nanoka ↗');source.href=`https://hsr.nanoka.cc/character/${c.id}`;source.target='_blank';source.rel='noopener';detail.append(source);
  }
  search.addEventListener('input',renderList);
  renderList();
}
