export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items; // Default to an empty array if items is undefined
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item); // Ensure _renderer is defined
    });
  }

  addItem(element) {
    this._container.prepend(element); // Add the new element to the container
  }
}
