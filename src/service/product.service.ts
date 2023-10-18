import Product from "../entity/product";

export default class ProductService {
  static increasePrice(products: Product[], percentage: number): Product[] {
    return products.map((p) => {
      p.changePrice(p.price * (1 + percentage / 100));
      return p;
    });
  }
}
