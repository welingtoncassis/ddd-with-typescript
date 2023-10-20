import OrderItem from "./orderItem";

export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();
    this.validate();
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Order must have an id");
    }
    if (this._customerId.length === 0) {
      throw new Error("Order must have an customerId");
    }
    if (this._items.length <= 0) {
      throw new Error("Order items cannot be empty");
    }
  }

  total(): number {
    return this._items.reduce((total, item) => {
      return total + item.price;
    }, 0);
  }
}
