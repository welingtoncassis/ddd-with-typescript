export default class Address {
  _street: string = "";
  _number: number = 0;
  _city: string = "";
  _zip: string = "";

  constructor(street: string, number: number, city: string, zip: string) {
    this._street = street;
    this._number = number;
    this._city = city;
    this._zip = zip;

    this.validate();
  }

  validate() {
    if (!this._street) {
      throw new Error("Address must have a street");
    }
    if (!this._number) {
      throw new Error("Address must have a number");
    }
    if (!this._city) {
      throw new Error("Address must have a city");
    }
    if (!this._zip) {
      throw new Error("Address must have a zip");
    }
  }

  toString() {
    return `${this._street}, ${this._number}, ${this._city}, ${this._zip}`;
  }
}
