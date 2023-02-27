export enum ContactPreference {
    SMS = 'sms',
    PHONE = 'phone',
    EMAIL = 'email'
  }

export interface User {
    userId: string;
    email: string;
    password: string;
    contactPreference: ContactPreference,
}