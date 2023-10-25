import Order from "../../domain/entity/order";
import OrderRepositoryInterface from "../../domain/repository/order.repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customerId: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => {
          return {
            id: item.id,
            productId: item.productId,
            quantity: item.quantity,
            name: item.name,
            price: item.price,
          };
        }),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  update(entity: Order): Promise<void> {
    throw new Error("Method not implemented.");
  }
  find(id: string): Promise<Order | null> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
  findByName(name: string): Promise<Order> {
    throw new Error("Method not implemented.");
  }
}
