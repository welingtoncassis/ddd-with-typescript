import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderItemModel from "./order-item.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import OrderModel from "./order.model";
import OrderRepository from "./order.repository";
import Address from "../../../../domain/customer/entity/address";
import Product from "../../../../domain/product/entity/product";
import OrderItem from "../../../../domain/checkout/entity/orderItem";
import Order from "../../../../domain/checkout/entity/order";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductRepository from "../../../product/repository/sequelize/product.repository";

describe("OrderRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      OrderModel,
      OrderItemModel,
      ProductModel,
      CustomerModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const itemQuantity = 2;

    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "City 1", "Zipcode 1");
    customer.setAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderRepository = new OrderRepository();
    const orderItem = new OrderItem(
      "1",
      product.id,
      product.name,
      product.price,
      itemQuantity
    );
    const order = new Order("123", customer.id, [orderItem]);
    await orderRepository.create(order);

    const orderModel = await OrderModel.findByPk(order.id, {
      include: [OrderItemModel],
    });

    expect(orderModel).not.toBeNull();
    expect(orderModel?.toJSON()).toStrictEqual({
      id: "123",
      customerId: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          orderId: order.id,
          productId: product.id,
          quantity: itemQuantity,
          name: product.name,
          price: product.price * itemQuantity,
        },
      ],
    });
  });
});
