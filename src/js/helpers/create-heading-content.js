const str = document.querySelector('h1').textContent;

/**
 * Возвращает функцию для создания содержимого заголовка.
 * @function
 * @returns {Function} Функция для создания содержимого заголовка.
 * @param {string} value - Значение, которое будет добавлено к содержимому заголовка.
 */
export function createHeadingContent() {
  return function (value) {
    return `${str} ${value}`;
  };
}
