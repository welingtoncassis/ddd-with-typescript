import Customer from "./customer";
import Address from "./address";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let customer = new Customer("", "John");
    }).toThrowError("Customer must have an id");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer("123", "");
    }).toThrowError("Customer must have a name");
  });

  it("should change name", () => {
    const customer = new Customer("123", "John");
    customer.changeName("John Doe");
    expect(customer.name).toBe("John Doe");
  });

  it("should active customer", () => {
    const customer = new Customer("123", "John");
    const address = new Address("Rua dois", 2, "São Paulo", "1234567");
    customer.Address = address;

    expect(customer.isActive()).toBe(false);

    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it("should deactive customer", () => {
    const customer = new Customer("123", "John");
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });

  it("should throw error when active customer and address is undefined", () => {
    expect(() => {
      const customer = new Customer("123", "John");
      customer.activate();
    }).toThrowError("Address is mandatory to active");
  });

  it("should add reward points", () => {
    const customer = new Customer("123", "John");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
