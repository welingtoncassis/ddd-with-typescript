class Customer {
  _id: string;
  _name: string;
  _address: string;
  _active: boolean;

  constructor(id: string, name: string, address: string) {
    this._id = id;
    this._name = name;
    this._address = address;
    this._active = true;
  }

  changeName(newName: string) {
    this._name = newName;
  }

  activate() {
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }
}
