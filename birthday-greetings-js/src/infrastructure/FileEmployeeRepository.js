// src/infrastructure/FileEmployeeRepository.js

import fs from 'fs'; // Node.js File System module
import { Employee } from '../domain/Employee.js';
import { EmployeeRepository } from '../ports/EmployeeRepository.js';

// This is an "Adapter"
export class FileEmployeeRepository extends EmployeeRepository {
  constructor(filePath) {
    super();
    this.filePath = filePath;
  }

  // The concrete implementation of the port's contract
  findEmployeesBornOn(date) {
    const data = fs.readFileSync(this.filePath, 'utf8');
    const lines = data.split('\n').slice(1); // Skip header line

    const employees = lines
      .filter(line => line) // Filter out empty lines
      .map(line => {
        const [lastName, firstName, birthDateStr, email] = line.split(', ');
        // The file format is YYYY/MM/DD, which JavaScript's Date constructor handles correctly
        const birthDate = new Date(birthDateStr);
        return new Employee(lastName, firstName, birthDate, email);
      });
      
    return employees;
  }
}