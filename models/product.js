const prod = [];

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  saveProduct() {
    prod.push(this);
  }

  static fetchAll() {
    return prod;
  }
};
