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

  constructor({ dropdown, parent, parentCloseCallback, transitionMs, frames }) {
    this.dropdown = dropdown;
    dropdownHideCallback,
    this.$dropdown = dropdown;
    this.transitionMs = transitionMs || this.transitionMs;
    this.framesPerSecond = frames || this.framesPerSecond;
    this.parent = parent || null;
    this.callback = parentCloseCallback || null;
    this.$parent = parent || null;
    this.hideCallback = dropdownHideCallback || null;

    this.getElements();
    this.addEvents();
    this.getHeightPerFrame();
  }

  getElements() {
    this.items = Array.from(
      this.$dropdown.querySelectorAll(`.${this.classNames.item}`),
    );
    this.$wrapper = this.$dropdown.querySelector(`.${this.classNames.wrapper}`);
  }

  getHeightPerFrame() {
    if (this.heightPerFrame) {
      return this.heightPerFrame;
    }

    this.heightPerFrame = Math.ceil(
      this.$wrapper.offsetHeight / (this.transitionMs / this.framesPerSecond),
    );

    return this.heightPerFrame;
  }

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

  select({ currentTarget }) {
    this.touched = true;
    this.hideCallback && this.hideCallback(currentTarget);
    this.toggleDropdown(true);
  }

  clearSelected(attr) {
    if (!this.touched) return;

    const selected = this.items.find((item) => item.hasAttribute(attr));
    if (selected) {
      selected.removeAttribute(attr);
    }
  }

  setSelected(attr, item) {
    item.setAttribute(attr, 'true');
  }
}

const dropdownClassName = 'dropdown';
