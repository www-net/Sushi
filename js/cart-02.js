//  div внутри корзины, в который мы добавляем товары
const cartWrapper = document.querySelector(`.cart-wrapper`);

// Отслеживаем клик на экране
window.addEventListener(`click`, function (event) {

  // Проверяем, что клик был совершен по кнопке "Добавить в корзину"
  if (event.target.hasAttribute(`data-cart`)) {
    // Находим карточку с товаром по которой был произведен клик
    const card = event.target.closest(`.card`);

    // Собираем данные с этого товара и записываем их в единый объект pductinfo
    const productInfo = {
      id: card.dataset.id,
      imgSrc: card.querySelector(`.product-img`).getAttribute(`src`),
      title: card.querySelector(`.item-title`).textContent,
      itemsInBox: card.querySelector(`[data-items-in-box]`).innerText,
      weight: card.querySelector(`.price__weight`).innerText,
      price: card.querySelector(`.price__currency`).innerText,
      count: card.querySelector(`[data-counter]`).innerText,
    }

    //  Создание элемента товара в корзине
    const createCartItem = (prodInfo) => {
      const { id, imgSrc, title, itemsInBox, weight, price, count } = prodInfo;
      // Собранные данные подставим в шаблон для товара в корзине
      const cartItemHTML = (`
      <div class="cart-item" data-id="${id}">
      <div class="cart-item__top">
              <div class="cart-item__img">
                <img src="${imgSrc}" alt="${imgSrc}">
              </div>
              <div class="cart-item__desc">
              <div class="cart-item__title">${title}</div>
                <div class="cart-item__weight">${itemsInBox}/ ${weight}</div>
          
                <!-- cart-item__details -->
                <div class="cart-item__details">
          
                  <div class="items items--small counter-wrapper">
                    <div class="items__control" data-action="minus">-</div>
                    <div class="items__current" data-counter="">${count}</div>
                    <div class="items__control" data-action="plus">+</div>
                  </div>
                  
                  <div class="price">
                    <div class="price__currency">${price}</div>
                  </div>
          
                </div>
                <!-- // cart-item__details -->
          
              </div>
            </div>
          </div>
          `);
      cartWrapper.insertAdjacentHTML("afterbegin", cartItemHTML);
    };

    // Проверим есть ли уже такой товар в корзине
    const itemIncart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);

    // Если товар есть в корзине, то обновим его значение колличества товара
    if (itemIncart) {
      const counterElement = itemIncart.querySelector(`[data-counter]`);
      counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.count);

    } else {
      // Если товара нет, то отобразим товар в корзине
      createCartItem(productInfo);
    }
    // Сбрасываем счетчик добавленного товара
    card.querySelector(`[data-counter]`).innerText = `1`;

    // Отображение статуса корзины Пустая / Полная
    toggleCartStatus();
  }
});
