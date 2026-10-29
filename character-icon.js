function createCharacterIcon(character, className = 'character-icon', lazy = true) {
  const image = document.createElement('img');
  image.className = className;
  image.src = character.icon || 'assets/characters/placeholder.svg';
  image.alt = '';
  image.width = 64;
  image.height = 64;
  image.loading = lazy ? 'lazy' : 'eager';
  image.decoding = 'async';
  if (image.src.endsWith('placeholder.svg')) image.title = 'Avatar Icon пока отсутствует на Nanoka';
  image.onerror = () => {
    image.onerror = null;
    image.src = 'assets/characters/placeholder.svg';
    image.title = 'Avatar Icon недоступен';
  };
  return image;
}
