
import { AppData } from './types';

export const INITIAL_DATA: AppData = {
  profile: {
    name: "Ahmed Khan",
    monthlyIncome: 150000,
    currency: "PKR"
  },
  transactions: [
    { id: '1', amount: 150000, category: 'Salary', date: '2023-11-01', type: 'INCOME', description: 'Monthly Salary' },
    { id: '2', amount: 12000, category: 'Groceries', date: '2023-11-05', type: 'EXPENSE', description: 'Metro Cash & Carry' },
    { id: '3', amount: 5000, category: 'Dining', date: '2023-11-06', type: 'EXPENSE', description: 'Kolachi' },
    { id: '4', amount: 8000, category: 'Utilities', date: '2023-11-10', type: 'EXPENSE', description: 'Electricity Bill' },
    { id: '5', amount: 25000, category: 'Rent', date: '2023-11-01', type: 'EXPENSE', description: 'Apartment Rent' },
    { id: '6', amount: 15000, category: 'Shopping', date: '2023-11-12', type: 'EXPENSE', description: 'Gul Ahmed Sale' },
  ],
  goals: [
    { id: 'g1', name: 'MacBook Pro', targetAmount: 450000, currentAmount: 120000, deadline: '2024-06-01', category: 'LUXURY' },
    { id: 'g2', name: 'Emergency Fund', targetAmount: 500000, currentAmount: 200000, deadline: '2024-12-31', category: 'SAVINGS' },
  ],
  loans: [
    { id: 'l1', person: 'Babar', amount: 10000, type: 'GIVEN', dueDate: '2023-12-01', status: 'PENDING' },
    { id: 'l2', person: 'Bank Al Habib', amount: 1200000, type: 'TAKEN', dueDate: '2028-01-01', status: 'PENDING' },
  ]
};

export const CATEGORY_ICONS: Record<string, string> = {
  'Salary': 'fa-money-bill-wave',
  'Groceries': 'fa-shopping-basket',
  'Dining': 'fa-utensils',
  'Utilities': 'fa-bolt',
  'Rent': 'fa-home',
  'Shopping': 'fa-bag-shopping',
  'Health': 'fa-heart-pulse',
  'Transport': 'fa-car'
};
