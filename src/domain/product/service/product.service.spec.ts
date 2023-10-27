import Product from "../entity/product";
import ProductService from "./product.service";

describe("ProductService", () => {
  it("should change the prices of all prodcuts", () => {
    const product1 = new Product("1", "Product 1", 100);
    const product2 = new Product("2", "Product 2", 200);
    const product3 = new Product("3", "Product 3", 300);
    const products = [product1, product2, product3];

    ProductService.increasePrice(products, 100);

    expect(product1.price).toEqual(200);
    expect(product2.price).toEqual(400);
    expect(product3.price).toEqual(600);
  });
});
