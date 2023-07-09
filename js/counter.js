const btnMinus = document.querySelector(`[data-action="minus"]`);
const btnPlus = document.querySelector(`[data-action="plus"]`);
const counter = document.querySelector(`[data-counter]`);

window.addEventListener(`click`, function (event) {

  // Объявляем переменную для счетчика 
  let counter;

  // Проверяем клик строго по кнопкам Плюс либо Минус
  if (event.target.dataset.action === `plus` || event.target.dataset.action === `minus`) {

    // Находим обертку счетчика
    const counterWrapper = event.target.closest(`.counter-wrapper`);
    // Находим див с числом счетчика
    counter = counterWrapper.querySelector(`[data-counter]`);
  }
  // Проверяем, является ли элемент, по которому был совершен клик, кнопкой Плюс
  if (event.target.dataset.action === `plus`) {

    counter.innerText = ++counter.innerText;
  }

  // Проверяем, является ли элемент, по которому был совершен клик, кнопкой Минус
  if (event.target.dataset.action === `minus`) {

    // Проверяем, чтобы счетчик был больше 1
    if (parseInt(counter.innerText) > 1) {
      // Изменяем текст в счетчике уменьшая его на 1
      counter.innerText = --counter.innerText;

      // Проверка на товар, который находится в корзине
    } else if (event.target.closest(`.cart-wrapper`) && parseInt(counter.innerText) === 1) {
      // Удаляем товар из корзины
      event.target.closest(`.cart-item`).remove();

      // Отображение статуса корзины Пустая / Полная
      toggleCartStatus();

      // Пересчет общей суммы товаров в корзине
      calcCartPriceAndDelivery();

    }
  }

  // Проверяем, что нажал на + или - внутри корзины
  if (event.target.hasAttribute(`data-action`) && event.target.closest(`.cart-wrapper`)) {
    // Пересчитываем общуюю стоимость в корзине
    calcCartPriceAndDelivery();
  };
})