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
        this.textToAlert(selected.text);
        break;
      default:
        console.error('Метод для элемента не определён');
        break;
    }
  }

  valueToHeading(value) {
    console.log(value);
  }

  textToAlert(text) {
    console.log(text);
  }
}

export const selectService = new SelectService();
