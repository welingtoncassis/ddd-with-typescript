import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";

describe("customerRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "City 1", "Zipcode 1");
    customer.setAddress(address);
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerModel).not.toBeNull();
    expect(customerModel?.toJSON()).toStrictEqual({
      id: "1",
      name: "Customer 1",
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      city: address.city,
      zipcode: address.zip,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "City 1", "Zipcode 1");
    customer.setAddress(address);

    await customerRepository.create(customer);
    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerModel).not.toBeNull();

    customer.changeName("Customer 2");
    customer.addRewardPoints(100);

    await customerRepository.update(customer);
    const updatedcustomerModel = await CustomerModel.findOne({
      where: { id: "1" },
    });

    expect(updatedcustomerModel).not.toBeNull();
    expect(updatedcustomerModel?.toJSON()).toStrictEqual({
      id: "1",
      name: "Customer 2",
      street: address.street,
      number: address.number,
      city: address.city,
      zipcode: address.zip,
      active: customer.isActive(),
      rewardPoints: 100,
    });
  });

  it("should find a customer by id", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "City 1", "Zipcode 1");
    customer.setAddress(address);

    await customerRepository.create(customer);
    const foundcustomer = await customerRepository.find("1");

    expect(foundcustomer).not.toBeNull();
    expect(foundcustomer?.id).toBe("1");
    expect(foundcustomer?.name).toBe("Customer 1");
  });

  it("should throw an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();

    await expect(customerRepository.find("1")).rejects.toThrow(
      "Customer not found"
    );
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("1", "Customer 1");
    const address1 = new Address("Street 1", 1, "City 1", "Zipcode 1");
    customer1.setAddress(address1);
    customer1.addRewardPoints(100);
    customer1.activate();

    const customer2 = new Customer("2", "Customer 2");
    const address2 = new Address("Street 2", 2, "City 2", "Zipcode 2");
    customer2.setAddress(address2);
    customer2.addRewardPoints(200);

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
    expect(customers[0]).toStrictEqual(customer1);
    expect(customers[1]).toStrictEqual(customer2);
  });
});
