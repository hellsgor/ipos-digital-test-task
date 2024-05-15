import { Dropdown } from '../Dropdown/Dropdown.js';
import { selectService } from './SelectService.js';

/**
 * Представляет собой компонент выбора элемента из списка или селект.
 * @class
 */
class Select {
  $select = null;
  $button = null;
  $text = null;
  $dropdown = null;

  dropdownInstance = null;

  classNames = {
    onLoad: {
      button: `${selectClassName}__button`,
      text: `${selectClassName}__text`,
      dropdown: `${selectClassName}__dropdown`,
    },

    itemText: 'dropdown__item-text',
  };

  modifiers = {
    opened: 'opened',
    selected: 'selected',
  };

  attrs = {
    selected: 'data-selected',
    value: 'data-value',
  };

  /**
   * Создает экземпляр класса Select.
   * @constructor
   * @param {HTMLElement} select - Элемент выбора.
   */
  constructor(select) {
    this.$select = select;

    this.getElements();
    this.initDropdown();
    this.addEvents();
  }

  /**
   * Получает элементы из DOM.
   */
  getElements() {
    Object.keys(this.classNames.onLoad).forEach((key) => {
      this[`$${key}`] = this.$select.querySelector(
        `.${this.classNames.onLoad[key]}`,
      );
    });
  }

  /**
   * Добавляет слушатели событий для кнопки селекта.
   */
  addEvents() {
    this.$button.addEventListener(
      'click',
      this.selectButtonClickHandler.bind(this),
    );
  }

  /**
   * Обрабатывает событие нажатия на кнопку выбора.
   */
  selectButtonClickHandler() {
    const isOpen = this.$select.classList.contains(
      `${selectClassName}_${this.modifiers.opened}`,
    );

    this.$select.classList[isOpen ? 'remove' : 'add'](
      `${selectClassName}_${this.modifiers.opened}`,
    );
    this.dropdownInstance.toggleDropdown(isOpen);
  }

  /**
   * Функция обратного вызова для скрытия выпадающего списка.
   * @param {HTMLElement | null} selected - Выбранный элемент списка.
   */
  hideDropdownCallback(selected = null) {
    this.$select.classList.remove(
      `${selectClassName}_${this.modifiers.opened}`,
    );
    selected && this.selectedHandler(selected);
  }

  /**
   * Обрабатывает выбор элемента из выпадающего списка.
   * @param {HTMLElement} selected - Выбранный элемент списка.
   */
  selectedHandler(selected) {
    this.dropdownInstance.clearSelected(this.attrs.selected);
    this.dropdownInstance.setSelected(this.attrs.selected, selected);

    this.selected = {
      element: selected,
      text: selected.querySelector(`.${this.classNames.itemText}`).textContent,
      value: selected.getAttribute(this.attrs.value),
    };

    this.$text.innerText = this.selected.text;
    this.$select.classList.add(`${selectClassName}_${this.modifiers.selected}`);

    selectService.methodDefinition({
      select: this.$select,
      selected: {
        text: this.selected.text,
        value: this.selected.value,
      },
    });
  }

  /**
   * Инициализирует компонент выпадающего списка.
   */
  initDropdown() {
    this.dropdownInstance = new Dropdown({
      dropdown: this.$dropdown,
      parent: this.$select,
      dropdownHideCallback: this.hideDropdownCallback.bind(this),
    });
  }
}

const selectClassName = 'select';

/**
 * Инициализирует все селекты на странице.
 */
export function initSelects() {
  document.querySelectorAll(`.${selectClassName}`).forEach((select) => {
    new Select(select);
  });
}
