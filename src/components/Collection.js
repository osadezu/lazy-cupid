export default class Collection {
  constructor(firstItem) {
    this.items = firstItem ? [firstItem] : [];
    this.selector = 0;
  }

  get choice() {
    return this.items[this.selector];
  }

  next() {
    this.selector = (this.selector + 1) % this.items.length;
    console.log('selector:', this.selector, 'length: ', this.items.length);
  }

  prev() {
    this.selector =
      this.selector === 0 ? this.items.length - 1 : this.selector - 1;
    console.log('selector:', this.selector, 'length: ', this.items.length);
  }

  append(items) {
    this.items.push(...items);
  }
}
