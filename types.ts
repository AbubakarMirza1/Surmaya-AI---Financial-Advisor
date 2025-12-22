
export enum Screen {
  DASHBOARD = 'DASHBOARD',
  TRANSACTIONS = 'TRANSACTIONS',
  GOALS = 'GOALS',
  LOANS = 'LOANS',
  SHOPPING = 'SHOPPING',
  ADVISOR = 'ADVISOR'
}

export type TransactionType = 'INCOME' | 'EXPENSE';

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  date: string;
  type: TransactionType;
  description: string;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: 'LUXURY' | 'NECESSITY' | 'SAVINGS';
}

export interface Loan {
  id: string;
  person: string;
  amount: number;
  type: 'GIVEN' | 'TAKEN';
  dueDate: string;
  status: 'PENDING' | 'REPAID';
}

export interface UserProfile {
  name: string;
  monthlyIncome: number;
  currency: string;
}

export interface AppData {
  profile: UserProfile;
  transactions: Transaction[];
  goals: Goal[];
  loans: Loan[];
}
