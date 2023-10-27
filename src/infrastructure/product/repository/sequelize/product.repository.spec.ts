import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import Product from "../../../../domain/product/entity/product";
import ProductRepository from "./product.repository";

describe("ProductRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);
    const productModel = await ProductModel.findOne({ where: { id: "1" } });

    expect(productModel).not.toBeNull();
    expect(productModel?.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100,
    });
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);
    const productModel = await ProductModel.findOne({ where: { id: "1" } });

    expect(productModel).not.toBeNull();

    product.changeName("Product 2");
    product.changePrice(200);

    await productRepository.update(product);
    const updatedProductModel = await ProductModel.findOne({
      where: { id: "1" },
    });

    expect(updatedProductModel).not.toBeNull();
    expect(updatedProductModel?.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 2",
      price: 200,
    });
  });

  it("should find a product by id", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);
    const foundProduct = await productRepository.find("1");

    expect(foundProduct).not.toBeNull();
    expect(foundProduct?.id).toBe("1");
    expect(foundProduct?.name).toBe("Product 1");
  });
});
