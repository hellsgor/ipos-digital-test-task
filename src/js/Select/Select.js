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

  hideDropdownCallback(selected) {
    this.select.classList.remove(`${selectClassName}_${this.modifiers.opened}`);
    selected && this.selectedHandler(selected);
  }

  selectedHandler(selected) {
    this.dropdownInstance.clearSelected(this.attrs.selected);
    this.dropdownInstance.setSelected(this.attrs.selected, selected);

    this.selected = {
      element: selected,
      text: selected.querySelector(`.${this.classNames.itemText}`).textContent,
      value: selected.getAttribute(this.attrs.value),
    };

    this.text.innerText = this.selected.text;
    this.select.classList.add(`${selectClassName}_${this.modifiers.selected}`);
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
