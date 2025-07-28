// src/domain/Employee.js

export class Employee {
  constructor(lastName, firstName, birthDate, email) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.birthDate = birthDate;
    this.email = email;
  }

  /**
   * Checks if the employee's birthday matches the given date,
   * including the special rule for leap year birthdays.
   * @param {Date} today - The date to check against.
   * @returns {boolean}
   */
  isBirthday(today) {
    // Check for a normal birthday match first
    if (this.birthDate.getMonth() === today.getMonth() &&
        this.birthDate.getDate() === today.getDate()) {
      return true;
    }

    // Now, handle the special leap year case
    const isLeapBaby = this.birthDate.getMonth() === 1 && this.birthDate.getDate() === 29;
    const isCheckDateFeb28 = today.getMonth() === 1 && today.getDate() === 28;

    // A helper function to check if a year is a leap year
    const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

    // The condition:
    // 1. Is the person born on Feb 29th? (isLeapBaby)
    // 2. Is today Feb 28th? (isCheckDateFeb28)
    // 3. Is today's year NOT a leap year? (!isLeapYear)
    if (isLeapBaby && isCheckDateFeb28 && !isLeapYear(today.getFullYear())) {
      return true;
    }

    // If none of the above conditions are met, it's not their birthday.
    return false;
  }
}