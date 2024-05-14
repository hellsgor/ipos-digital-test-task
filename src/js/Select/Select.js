import { Dropdown } from '../Dropdown.js';

class Select {
  select = null;
  button = null;
  text = null;
  dropdown = null;

  dropdownInstance = null;

  classNames = {
    button: `${selectClassName}__button`,
    text: `${selectClassName}__text`,
    dropdown: `${selectClassName}__dropdown`,
  };

  modifiers = {
    opened: 'opened',
  };

  constructor(select) {
    this.select = select;

    this.getElements();
    this.initDropdown();
    this.addEvents();
  }

  getElements() {
    Object.keys(this.classNames).forEach((key) => {
      this[key] = this.select.querySelector(`.${this.classNames[key]}`);
    });
  }

  addEvents() {
    this.button.addEventListener(
      'click',
      this.selectButtonClickHandler.bind(this),
    );
  }

  selectButtonClickHandler() {
    const isOpen = this.select.classList.contains(
      `${selectClassName}_${this.modifiers.opened}`,
    );

    this.select.classList[isOpen ? 'remove' : 'add'](
      `${selectClassName}_${this.modifiers.opened}`,
    );
    this.dropdownInstance.toggleDropdown(isOpen);
  }

  hideDropdownCallback() {
    this.select.classList.remove(`${selectClassName}_${this.modifiers.opened}`);
  }

  initDropdown() {
    this.dropdownInstance = new Dropdown({
      dropdown: this.dropdown,
      parent: this.select,
      parentCloseCallback: this.hideDropdownCallback.bind(this),
    });
  }
}

const selectClassName = 'select';

export function initSelects() {
  document.querySelectorAll(`.${selectClassName}`).forEach((select) => {
    new Select(select);
  });
}
