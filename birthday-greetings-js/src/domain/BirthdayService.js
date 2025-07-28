// src/domain/BirthdayService.js

export class BirthdayService {
  constructor(employeeRepository, emailService) {
    this.employeeRepository = employeeRepository;
    this.emailService = emailService;
  }

  sendGreetings(today) {
    // 1. Find all employees
    const allEmployees = this.employeeRepository.findEmployeesBornOn(today);

    // 2. Filter for those whose birthday is today
    const birthdayEmployees = allEmployees.filter(employee => employee.isBirthday(today));

    // 3. Send a greeting to each one
    birthdayEmployees.forEach(employee => {
      const email = {
        to: employee.email,
        subject: 'Happy birthday!',
        body: `Happy birthday, dear ${employee.firstName}!`,
      };
      this.emailService.send(email);
    });
  }
}