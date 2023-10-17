// Domain
// - Entity
//   -- customer.ts (regra de negócio)
// !=
// Infra
// - Model
//   -- customer.ts (banco de dados - get e set)

import Address from "./address";
export default class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  get name(): string {
    return this._name;
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

  set Address(address: Address) {
    this._address = address;
  }

  changeName(newName: string) {
    this._name = newName;
    this.validate();
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
}
