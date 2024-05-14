class Select {
  select = null;
  button = null;
  text = null;
  dropdown = null;

  classNames = {
    button: `${selectClassName}__button`,
    text: `${selectClassName}__text`,
    dropdown: `${selectClassName}__dropdown`,
  };

  constructor(select) {
    this.select = select;

    this.getElements();
    this.addEvents();
  }

  getElements() {
    Object.keys(this.classNames).forEach((key) => {
      this[key] = this.select.querySelector(`.${this.classNames[key]}`);
    });
  }

  addEvents() {
    this.button.addEventListener('click', this.selectButtonClickHandler);
  }

  selectButtonClickHandler() {
    console.log('click');
  }
}

const selectClassName = 'select';

export function initSelects() {
  document.querySelectorAll(`.${selectClassName}`).forEach((select) => {
    new Select(select);
  });
}
