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
    price: 3,
    phone: '+35970000001',
    initial: 'А'
  },
  {
    name: 'Медиум Борис',
    description: 'Нумерология и руни – вашият личен водач.',
    price: 3,
    phone: '+35970000002',
    initial: 'Б'
  },
  {
    name: 'Медиум Силвия',
    description: 'Кафе на зърна и ясновидство – търсите ли отговор?',
    price: 3,
    phone: '+35970000003',
    initial: 'С'
  },
  {
    name: 'Медиум Даниела',
    description: 'Карти таро и кристална топка – ново попълнение в нашия екип.',
    price: 3,
    phone: '+35970000004',
    initial: 'Д'
  }
];

document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('medium-cards');
  if (!container) return;
  mediumsData.forEach(function (medium) {
    const card = document.createElement('div');
    card.className = 'card';

    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.textContent = medium.initial || (medium.name && medium.name[0]) || '?';
    card.appendChild(avatar);

    const nameEl = document.createElement('h3');
    nameEl.textContent = medium.name;
    card.appendChild(nameEl);

    const descEl = document.createElement('p');
    descEl.textContent = medium.description;
    card.appendChild(descEl);

    const priceEl = document.createElement('p');
    priceEl.textContent = medium.price + ' € / минута';
    card.appendChild(priceEl);

    const buttons = document.createElement('div');
    buttons.className = 'buttons';
    const callBtn = document.createElement('a');
    callBtn.href = 'tel:' + medium.phone;
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