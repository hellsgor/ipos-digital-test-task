export class Dropdown {
  dropdown = null;
  items = null;

  transitionMs = 300;
  framesPerSecond = 30;
  heightPerFrame = null;

  classNames = {
    list: `${dropdownClassName}__list`,
    item: `${dropdownClassName}__item`,
  };

  parent = null;
  callback = null;
  documentClickHandler = this.hideByDocumentClick.bind(this);

  touched = false;

  constructor({ dropdown, parent, parentCloseCallback, transitionMs, frames }) {
    this.dropdown = dropdown;
    this.transitionMs = transitionMs || this.transitionMs;
    this.framesPerSecond = frames || this.framesPerSecond;
    this.parent = parent || null;
    this.callback = parentCloseCallback || null;

    this.getElements();
    this.addEvent();
    this.getHeightPerFrame();
  }

  getElements() {
    this.items = this.dropdown.querySelectorAll(`.${this.classNames.item}`);
    this.list = this.dropdown.querySelector(`.${this.classNames.list}`);
  }

  getHeightPerFrame() {
    if (this.heightPerFrame) {
      return this.heightPerFrame;
    }

    this.heightPerFrame = Math.ceil(
      this.list.offsetHeight / (this.transitionMs / this.framesPerSecond),
    );

    return this.heightPerFrame;
  }

  toggleDropdown(isOpen) {
    let counter = 0;
    let startHeight = isOpen ? this.dropdown.offsetHeight : 0;

    const getCurrentHeight = () => {
      const currentHeight = isOpen
        ? startHeight - this.getHeightPerFrame()
        : startHeight + this.getHeightPerFrame();

      if (currentHeight > this.list.offsetHeight) return this.list.offsetHeight;
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
      this.dropdown.style.height = `${startHeight}px`;

      ++counter;
    }, this.transitionMs / this.framesPerSecond);
  }

  hideByDocumentClick(event) {
    if (this.parent && !this.parent.contains(event.target)) {
      this.callback && this.callback();
      this.toggleDropdown(true);
    }
  }

  addEvent() {
    this.items.forEach((item) => {
      item.addEventListener('click', this.select.bind(this));
    });
  }

  select({ currentTarget }) {
    this.touched = true;
    this.callback && this.callback(currentTarget);
    this.toggleDropdown(true);
  }
}

const dropdownClassName = 'dropdown';
