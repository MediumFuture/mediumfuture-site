/*
 * Скрипт за динамично зареждане на картите на медиумите
 * Използваме статичен масив от данни, за да избегнем ограниченията
 * при зареждане на JSON файлове в локална среда (file://). Когато
 * сайтът се хоства на сървър, тези данни могат да бъдат заредени
 * чрез fetch("mediums.json").
 */
const mediumsData = [
  {
    name: 'Медиум Ана',
    description: 'Специалист в таро и астрология.',
    // Цена на минута в долари
    price: 2.92,
    // Линк към Clarity профила за обаждания
    call: 'https://clarity.fm/mediumfuture',
    initial: 'А',
    // Път до изображението за аватара. Ако е зададено, вместо инициал ще се показва картинка.
    image: 'images/avatars/ana.png'
  },
  {
    name: 'Медиум Борис',
    description: 'Нумерология и руни – вашият личен водач.',
    price: 2.92,
    call: 'https://clarity.fm/mediumfuture',
    initial: 'Б',
    image: 'images/avatars/boris.png'
  },
  {
    name: 'Медиум Силвия',
    description: 'Кафе на зърна и ясновидство – търсите ли отговор?',
    price: 2.92,
    call: 'https://clarity.fm/mediumfuture',
    initial: 'С',
    image: 'images/avatars/silvia.png'
  },
  {
    name: 'Медиум Даниела',
    description: 'Карти таро и кристална топка – ново попълнение в нашия екип.',
    price: 2.92,
    call: 'https://clarity.fm/mediumfuture',
    initial: 'Д',
    image: 'images/avatars/daniela.png'
  }
];

document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('medium-cards');
  if (!container) return;
  mediumsData.forEach(function (medium) {
    const card = document.createElement('div');
    card.className = 'card';

    // Създаваме контейнер за аватар
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    // Ако има изображение, добавяме <img> вместо текстови инициал
    if (medium.image) {
      const img = document.createElement('img');
      img.className = 'avatar-img';
      img.src = medium.image;
      img.alt = medium.name;
      avatar.appendChild(img);
    } else {
      // Ако няма изображение, показваме първата буква от името
      avatar.textContent = medium.initial || (medium.name && medium.name[0]) || '?';
    }
    card.appendChild(avatar);

    const nameEl = document.createElement('h3');
    nameEl.textContent = medium.name;
    card.appendChild(nameEl);

    const descEl = document.createElement('p');
    descEl.textContent = medium.description;
    card.appendChild(descEl);

    const priceEl = document.createElement('p');
    priceEl.textContent = medium.price + ' $ / минута';
    card.appendChild(priceEl);

    const buttons = document.createElement('div');
    buttons.className = 'buttons';
    const callBtn = document.createElement('a');
    // Ако е зададен линк за обаждания (Clarity), използваме него, иначе тел номера
    if (medium.call) {
      callBtn.href = medium.call;
      callBtn.target = '_blank';
    } else {
      callBtn.href = 'tel:' + medium.phone;
    }
    callBtn.className = 'call-button';
    callBtn.textContent = 'Обади се';
    buttons.appendChild(callBtn);
    const chatBtn = document.createElement('a');
    chatBtn.href = 'chat.html?medium=' + encodeURIComponent(medium.name);
    chatBtn.className = 'chat-button';
    chatBtn.textContent = 'Чат';
    buttons.appendChild(chatBtn);
    card.appendChild(buttons);

    container.appendChild(card);
  });
});