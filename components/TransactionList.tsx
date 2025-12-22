
import React from 'react';
import { Transaction } from '../types';
import { CATEGORY_ICONS } from '../constants';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-slate-800">History</h3>
        <button className="text-emerald-600 text-sm font-medium">Filter</button>
      </div>
      {transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((t) => (
        <div key={t.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-600">
            <i className={`fa-solid ${CATEGORY_ICONS[t.category] || 'fa-receipt'} text-xl`}></i>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-slate-800">{t.description}</h4>
            <p className="text-xs text-slate-500">{t.category} • {t.date}</p>
          </div>
          <div className={`text-right ${t.type === 'INCOME' ? 'text-emerald-600' : 'text-rose-500'}`}>
            <p className="font-bold">{t.type === 'INCOME' ? '+' : '-'} Rs. {t.amount.toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
