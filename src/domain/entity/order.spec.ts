import Order from "./order";
import OrderItem from "./orderItem";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let order = new Order("", "123", []);
    }).toThrowError("Order must have an id");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      let order = new Order("1", "", []);
    }).toThrowError("Order must have an customerId");
  });

  it("should throw error when items are empty", () => {
    expect(() => {
      let order = new Order("1", "123", []);
    }).toThrowError("Order items cannot be empty");
  });

  it("should calculate total", () => {
    const items = [
      new OrderItem("1", "p1", "item1", 10, 2),
      new OrderItem("2", "p2", "item2", 20, 2),
    ];
    const order = new Order("1", "123", items);
    expect(order.total()).toEqual(60);
  });
});
