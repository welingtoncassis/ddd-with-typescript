import Address from "./address";
export default class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get Address(): Address {
    return this._address;
  }

  isActive(): boolean {
    return this._active;
  }

  validate() {
    if (!this._name) {
      throw new Error("Customer must have a name");
    }
    if (!this._id) {
      throw new Error("Customer must have an id");
    }
  }

  changeName(newName: string) {
    this._name = newName;
    this.validate();
  }

  setAddress(address: Address) {
    this._address = address;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to active");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    if (points < 0) {
      throw new Error("Points must be positive");
    }
    this._rewardPoints += points;
  }
}
