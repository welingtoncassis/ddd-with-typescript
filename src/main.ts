import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";

let customer = new Customer("1", "John Doe");
const address = new Address("Rua dois", 2, "12345678", "São Paulo");
customer.setAddress(address);
customer.activate();
