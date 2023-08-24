class Customer {
  _id: string;
  _name: string;
  _address: string;
  _active: boolean;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this._address = "";
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

  addAddress(address: string) {
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
