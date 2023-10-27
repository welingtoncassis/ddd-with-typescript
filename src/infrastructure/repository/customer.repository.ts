import Address from "../../domain/customer/entity/address";
import Customer from "../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../domain/customer/repository/customer.repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
  findByName(name: string): Promise<Customer> {
    throw new Error("Method not implemented.");
  }

  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.Address.street,
      number: entity.Address.number,
      city: entity.Address.city,
      zipcode: entity.Address.zip,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
    });
  }
  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.Address.street,
        number: entity.Address.number,
        city: entity.Address.city,
        zipcode: entity.Address.zip,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
      },
      { where: { id: entity.id } }
    );
  }
  async find(id: string): Promise<Customer | null> {
    const customerModel = await CustomerModel.findOne({ where: { id } });

    if (!customerModel) {
      throw new Error("Customer not found");
    }

    const customer = new Customer(customerModel.id, customerModel.name);
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.city,
      customerModel.zipcode
    );
    customer.setAddress(address);
    customerModel.active ? customer.activate() : customer.deactivate();
    customer.addRewardPoints(customerModel.rewardPoints);

    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();

    const customers = customerModels.map((customerModel) => {
      const customer = new Customer(customerModel.id, customerModel.name);
      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.city,
        customerModel.zipcode
      );
      customer.setAddress(address);
      customerModel.active ? customer.activate() : customer.deactivate();
      customer.addRewardPoints(customerModel.rewardPoints);

      return customer;
    });

    return customers;
  }
}
