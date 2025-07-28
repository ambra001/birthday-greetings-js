// src/domain/ports/EmployeeRepository.js

// This is a "Port" in the Hexagonal Architecture.
// It defines a contract but doesn't implement it.
// Adapters will implement this contract.
export class EmployeeRepository {
  findEmployeesBornOn(date) {
    throw new Error('Method not implemented!');
  }
}