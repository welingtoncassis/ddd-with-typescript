// Domain
// - Entity
//   -- customer.ts (regra de negócio)

// !=

// Infra
// - Model
//   -- customer.ts (banco de dados - get e set)

export default class Customer {
  _id: string;
  _name: string;
  _address!: Address;
  _active: boolean;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this._active = false;
    this.validate();
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
    if (this._address) {
      throw new Error("Address is mandatory to active");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }
}
