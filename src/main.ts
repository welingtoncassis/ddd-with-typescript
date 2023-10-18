import Address from "./entity/address";
import Customer from "./entity/customer";

let customer = new Customer("1", "John Doe");
const address = new Address("Rua dois", 2, "12345678", "São Paulo");
customer.Address = address;
customer.activate();
