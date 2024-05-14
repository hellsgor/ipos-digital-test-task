class Select {
  select = null;
  label = null;
  button = null;
  text = null;
  dropdown = null;

  classNames = {
    label: `${selectClassName}__label`,
    button: `${selectClassName}__button`,
    text: `${selectClassName}__text`,
    dropdown: `${selectClassName}__dropdown`,
  };

  constructor(select) {
    this.select = select;

    this.getElements();
  }

  getElements() {
    Object.keys(this.classNames).forEach((key) => {
      this[key] = this.select.querySelector(`.${this.classNames[key]}`);
    });
  }
}

const selectClassName = 'select';

export function initSelects() {
  document.querySelectorAll(`.${selectClassName}`).forEach((select) => {
    new Select(select);
  });
}
