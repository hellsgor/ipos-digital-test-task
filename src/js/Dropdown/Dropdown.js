/**
 * Представляет собой компонент выпадающего списка.
 * @class
 */
export class Dropdown {
  $dropdown = null;
  items = null;
  $wrapper = null;

  transitionMs = 300;
  framesPerSecond = 30;
  heightPerFrame = null;

  classNames = {
    item: `${dropdownClassName}__item`,
    wrapper: `${dropdownClassName}__wrapper`,
  };

  $parent = null;
  hideCallback = null;
  documentClickHandler = this.hideByDocumentClick.bind(this);

  touched = false;

  /**
   * Создает экземпляр класса Dropdown.
   * @constructor
   * @param {Object} options - Параметры для выпадающего списка.
   * @param {HTMLElement} options.dropdown - Элемент выпадающего списка.
   * @param {HTMLElement} [options.parent=null] - Родительский элемент.
   * @param {Function} [options.dropdownHideCallback=null] - Функция обратного вызова при скрытии выпадающего списка.
   * @param {number} [options.transitionMs=300] - Продолжительность перехода в миллисекундах.
   * @param {number} [options.frames=30] - Количество кадров в секунду для анимации перехода.
   */
  constructor({
    dropdown,
    parent,
    dropdownHideCallback,
    transitionMs,
    frames,
  }) {
    this.$dropdown = dropdown;
    this.transitionMs = transitionMs || this.transitionMs;
    this.framesPerSecond = frames || this.framesPerSecond;
    this.$parent = parent || null;
    this.hideCallback = dropdownHideCallback || null;

    this.getElements();
    this.addEvents();
    this.getHeightPerFrame();
  }

  /**
   * Получает элементы из DOM.
   */
  getElements() {
    this.items = Array.from(
      this.$dropdown.querySelectorAll(`.${this.classNames.item}`),
    );
    this.$wrapper = this.$dropdown.querySelector(`.${this.classNames.wrapper}`);
  }

  /**
   * Рассчитывает высоту на каждый кадр для анимации выпадающего списка.
   * @returns {number} Высота на каждый кадр.
   */
  getHeightPerFrame() {
    if (this.heightPerFrame) {
      return this.heightPerFrame;
    }

    this.heightPerFrame = Math.ceil(
      this.$wrapper.offsetHeight / (this.transitionMs / this.framesPerSecond),
    );

    return this.heightPerFrame;
  }

  /**
   * Переключает видимость выпадающего списка.
   * @param {boolean} isOpen - Указывает, следует ли открыть или закрыть выпадающий список.
   */
  toggleDropdown(isOpen) {
    let counter = 0;
    let startHeight = isOpen ? this.$dropdown.offsetHeight : 0;

    const getCurrentHeight = () => {
      const currentHeight = isOpen
        ? startHeight - this.getHeightPerFrame()
        : startHeight + this.getHeightPerFrame();

      if (currentHeight > this.$wrapper.offsetHeight)
        return this.$wrapper.offsetHeight;
      if (currentHeight < 0) return 0;

      return currentHeight;
    };

    if (isOpen) {
      document.removeEventListener('click', this.documentClickHandler);
    } else {
      document.addEventListener('click', this.documentClickHandler);
    }

    const interval = setInterval(() => {
      if (counter >= this.transitionMs / this.framesPerSecond) {
        clearInterval(interval);
        return;
      }
      startHeight = getCurrentHeight();
      this.$dropdown.style.height = `${startHeight}px`;

      ++counter;
    }, this.transitionMs / this.framesPerSecond);
  }

  /**
   * Скрывает выпадающий список при клике вне родителя.
   * @param {Event} event - Событие клика.
   */
  hideByDocumentClick(event) {
    if (this.$parent && !this.$parent.contains(event.target)) {
      this.hideCallback && this.hideCallback();
      this.toggleDropdown(true);
    }
  }

  /**
   * Добавляет слушатели событий к элементам выпадающего списка.
   */
  addEvents() {
    this.items.forEach((item) => {
      item.addEventListener('click', this.select.bind(this));
    });
  }

  /**
   * Обрабатывает выбор элемента выпадающего списка.
   * @param {Event} event - Событие клика.
   */
  select({ currentTarget }) {
    this.touched = true;
    this.hideCallback && this.hideCallback(currentTarget);
    this.toggleDropdown(true);
  }

  /**
   * Удаляет выбранный атрибут из элементов выпадающего списка.
   * @param {string} attr - Атрибут для очистки.
   */
  clearSelected(attr) {
    if (!this.touched) return;

    const selected = this.items.find((item) => item.hasAttribute(attr));
    if (selected) {
      selected.removeAttribute(attr);
    }
  }

  /**
   * Устанавливает выбранный атрибут на элементе выпадающего списка.
   * @param {string} attr - Атрибут для установки.
   * @param {HTMLElement} item - Элемент выпадающего списка, на котором следует установить атрибут.
   */
  setSelected(attr, item) {
    item.setAttribute(attr, 'true');
  }
}

const dropdownClassName = 'dropdown';
