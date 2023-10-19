import Order from "../entity/order";
import OrderItem from "../entity/orderItem";
import OrderService from "./order.service";

describe("OrderService unit test", () => {
  it("should get total of all orders", () => {
    const item1 = new OrderItem("i1", "p1", "Item 1", 100, 1);
    const item2 = new OrderItem("i2", "p2", "Item 2", 200, 2);

    const order1 = new Order("o1", "c1", [item1]);
    const order2 = new Order("o2", "c2", [item2]);

    const total = OrderService.total([order1, order2]);

    expect(total).toBe(500);
  });
});
