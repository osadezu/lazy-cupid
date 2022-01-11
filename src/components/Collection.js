export default class Collection {
  constructor(items) {
    this.items = items;
    this.selector = 0;
  }

  get choice() {
    return this.items[this.selector];
  }
}
