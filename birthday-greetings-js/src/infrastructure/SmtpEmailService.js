// src/infrastructure/SmtpEmailService.js

import { EmailService } from '../ports/EmailService.js';

// This is an "Adapter"
export class SmtpEmailService extends EmailService {
  send(message) {
    // In a real application, this would connect to an SMTP server.
    // For this exercise, it just logs to the console.
    console.log('--- EMAIL SENT ---');
    console.log(`To: ${message.to}`);
    console.log(`Subject: ${message.subject}`);
    console.log(`Body: ${message.body}`);
    console.log('------------------');
  }
}