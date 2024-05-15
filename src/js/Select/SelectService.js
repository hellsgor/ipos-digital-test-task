import { createHeadingContent } from '../helpers/create-heading-content.js';

/**
 * Представляет сервис для обработки выбора элементов.
 * @class
 */
class SelectService {
  attrs = {
    methodName: 'data-select-service-method',
  };

  /**
   * Определяет метод для обработки выбора элемента в зависимости от атрибута `data-select-service-method`.
   * @param {Object} options - Параметры метода.
   * @param {HTMLElement} options.select - Элемент выбора.
   * @param {Object} options.selected - Объект выбранного элемента списка.
   * @property {string} selected.text - Текст выбранного элемента.
   * @property {string} selected.value - Значение выбранного элемента.
   */
  methodDefinition({ select, selected }) {
    switch (select.getAttribute(this.attrs.methodName)) {
      case 'heading':
        this.valueToHeading(selected.value);
        break;
      case 'alert':
        this.textToAlert({ text: selected.text, timeout: 500 });
        break;
      default:
        console.error('Метод для элемента не определён');
        break;
    }
  }

  /**
   * Преобразует значение выбранного элемента в заголовок и устанавливает его в качестве текста заголовка.
   * @param {string} value - Значение выбранного элемента.
   */
  valueToHeading(value) {
    const getBasicHeadingContent = createHeadingContent();
    document.querySelector('h1').innerText = getBasicHeadingContent(value);
  }

  /**
   * Отображает текст выбранного элемента в виде всплывающего сообщения (alert).
   * @param {Object} options - Параметры для отображения сообщения.
   * @param {string} options.text - Текст сообщения.
   * @param {number} options.timeout - Время задержки перед отображением сообщения в миллисекундах.
   */
  textToAlert({ text, timeout }) {
    setTimeout(() => {
      // eslint-disable-next-line no-alert
      alert(text);
    }, timeout);
  }
}

export const selectService = new SelectService();
