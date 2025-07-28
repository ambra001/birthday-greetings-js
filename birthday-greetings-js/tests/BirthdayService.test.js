// tests/BirthdayService.test.js

import { describe, it, expect, jest } from '@jest/globals';
import { BirthdayService } from '../src/domain/BirthdayService.js';
import { Employee } from '../src/domain/Employee.js';

describe('BirthdayService', () => {

  it('should send a greeting only to employees whose birthday is today', () => {
    // 1. ARRANGE
    const today = new Date('2024-10-08');
    const employeeRepository = { findEmployeesBornOn: jest.fn() };
    const emailService = { send: jest.fn() };

    const john = new Employee('Doe', 'John', new Date('1982-10-08'), 'john.doe@foobar.com');
    const mary = new Employee('Ann', 'Mary', new Date('1975-09-11'), 'mary.ann@foobar.com');

    employeeRepository.findEmployeesBornOn.mockReturnValue([john, mary]);

    const birthdayService = new BirthdayService(employeeRepository, emailService);
    
    // 2. ACT
    birthdayService.sendGreetings(today);

    // 3. ASSERT
    expect(employeeRepository.findEmployeesBornOn).toHaveBeenCalledWith(today);
    expect(emailService.send).toHaveBeenCalledTimes(1); 
    expect(emailService.send).toHaveBeenCalledWith({
      to: 'john.doe@foobar.com',
      subject: 'Happy birthday!',
      body: 'Happy birthday, dear John!',
    });
  });

  it('should send greetings on Feb 28th in non-leap years for people born on Feb 29th', () => {
    // 1. ARRANGE
    const today = new Date('2025-02-28'); // A non-leap year
    const employeeRepository = { findEmployeesBornOn: jest.fn() };
    const emailService = { send: jest.fn() };

    const leapYearPerson = new Employee('Leap', 'Lee', new Date('2000-02-29'), 'lee@foobar.com');
    employeeRepository.findEmployeesBornOn.mockReturnValue([leapYearPerson]);

    const birthdayService = new BirthdayService(employeeRepository, emailService);
    
    // 2. ACT
    birthdayService.sendGreetings(today);

    // 3. ASSERT
    expect(emailService.send).toHaveBeenCalledTimes(1);
    expect(emailService.send).toHaveBeenCalledWith(expect.objectContaining({ 
        body: 'Happy birthday, dear Lee!' 
    }));
  });

});