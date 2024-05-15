const str = document.querySelector('h1').textContent;

export function createHeadingContent() {
  return function (value) {
    return `${str} ${value}`;
  };
}
