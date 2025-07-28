// src/main.js

import { BirthdayService } from './domain/BirthdayService.js';
import { FileEmployeeRepository } from './infrastructure/FileEmployeeRepository.js';
import { SmtpEmailService } from './infrastructure/SmtpEmailService.js';

// This is the Configuration Root or "Main" method.
// It is responsible for creating objects and injecting dependencies.
function main() {
  // 1. Create the infrastructure adapters
  const employeeRepository = new FileEmployeeRepository('../employees.txt');
  const emailService = new SmtpEmailService();

  // 2. Create the domain service and INJECT the dependencies
  const birthdayService = new BirthdayService(employeeRepository, emailService);

  // 3. Run the application's use case
  try {
    console.log('Birthday Greeting Service Started...');
    const today = new Date();
    birthdayService.sendGreetings(today);
    console.log('Birthday Greeting Service Finished.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Run the main function
main();