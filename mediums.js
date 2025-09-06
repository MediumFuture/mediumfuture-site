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
    // Линк за обаждания: използваме нашия Twilio номер.
    // Използваме tel: линк, за да отворим вграденото приложение за телефон
    call: 'tel:+15712978633',
    initial: 'А',
    // Път до изображението за аватара. Файловете са в основната директория на сайта,
    // за да няма нужда от създаване на поддиректории в GitHub. Ако промените местоположението,
    // коригирайте и тук съответно.
    image: 'ana.png',
    // Страница с пълен профил за този медиум
    profile: 'ana.html'
  },
  {
    name: 'Медиум Борис',
    description: 'Нумерология и руни – вашият личен водач.',
    price: 2.92,
    call: 'tel:+15712978633',
    initial: 'Б',
    // Използваме изображението на Борис (мъж нумеролог). Файлът е в корена на сайта
    image: 'boris.png',
    profile: 'boris.html'
  },
  {
    name: 'Медиум Силвия',
    description: 'Кафе на зърна и ясновидство – търсите ли отговор?',
    price: 2.92,
    call: 'tel:+15712978633',
    initial: 'С',
    // Използваме снимка на Силвия (зърна кафе). Файлът е в корена на сайта
    image: 'silvia.png',
    profile: 'silvia.html'
  },
  {
    name: 'Медиум Даниела',
    description: 'Карти таро и кристална топка – ново попълнение в нашия екип.',
    price: 2.92,
    call: 'tel:+15712978633',
    initial: 'Д',
    // Изображението на Даниела (кристална топка). Файлът е в корена на сайта
    image: 'daniela.png',
    profile: 'daniela.html'
  }
];

document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('medium-cards');
  if (!container) return;
  mediumsData.forEach(function (medium) {
    const card = document.createElement('div');
    card.className = 'card';

    // Ако е зададен профил, правим цялата карта кликаема
    if (medium.profile) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function () {
        window.location.href = medium.profile;
      });
    }

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
    // Ако е зададен линк за обаждания, използваме него; ако е tel: линк, не задаваме target
    if (medium.call) {
      callBtn.href = medium.call;
      // Добавяме target=_blank само ако линкът е http/https
      if (!medium.call.startsWith('tel:')) {
        callBtn.target = '_blank';
      }
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
    // Спираме събитието click да не се предава към картата
    callBtn.addEventListener('click', function (e) { e.stopPropagation(); });
    chatBtn.addEventListener('click', function (e) { e.stopPropagation(); });
    card.appendChild(buttons);

    container.appendChild(card);
  });
});