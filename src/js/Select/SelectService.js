class SelectService {
  attrs = {
    methodName: 'data-select-service-method',
  };

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

  valueToHeading(value) {
    console.log(value);
  }

  textToAlert({ text, timeout }) {
    setTimeout(() => {
      // eslint-disable-next-line no-alert
      alert(text);
    }, timeout);
  }
}

export const selectService = new SelectService();
