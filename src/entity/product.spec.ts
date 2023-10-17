import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Product 1", 100);
    }).toThrowError("Product must have an id");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("1", "", 100);
    }).toThrowError("Product must have a name");
  });

  it("should throw error when price is less than zero", () => {
    expect(() => {
      const product = new Product("1", "Product 1", -1);
    }).toThrowError("Product must have a valid price");
  });

  it("should change name", () => {
    const product = new Product("1", "Product 1", 10);
    product.changeName("Product 2");
    expect(product.name).toEqual("Product 2");
  });

  it("should change price", () => {
    const product = new Product("1", "Product 1", 10);
    product.changePrice(100);
    expect(product.price).toEqual(100);
  });
});
