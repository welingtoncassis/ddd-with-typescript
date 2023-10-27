export default class OrderItem {
  private _id: string;
  private _productId: string;
  private _name: string;
  private _price: number;
  private _quantity: number;

  constructor(
    id: string,
    productId: string,
    name: string,
    price: number,
    quantity: number
  ) {
    this._id = id;
    this._productId = productId;
    this._name = name;
    this._price = price;
    this._quantity = quantity;
  }

  get id(): string {
    return this._id;
  }

  get productId(): string {
    return this._productId;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price * this._quantity;
  }

  get quantity(): number {
    return this._quantity;
  }

  validate() {
    if (this._id.length <= 0) {
      throw new Error("OrderItem must have an id");
    }

    if (this._productId.length <= 0) {
      throw new Error("OrderItem must have a productId");
    }

    if (this._name.length <= 0) {
      throw new Error("OrderItem must have a name");
    }

    if (this._price < 0) {
      throw new Error("OrderItem must have a valid price");
    }

    if (this._quantity <= 0) {
      throw new Error("OrderItem must have a valid quantity");
    }
    return true;
  }
}
