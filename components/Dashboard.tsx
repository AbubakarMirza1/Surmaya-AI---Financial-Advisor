
import React from 'react';
import { AppData, Transaction } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface DashboardProps {
  data: AppData;
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const totalIncome = data.transactions
    .filter(t => t.type === 'INCOME')
    .reduce((acc, t) => acc + t.amount, 0);
  
  const totalExpense = data.transactions
    .filter(t => t.type === 'EXPENSE')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const categoryTotals = data.transactions
    .filter(t => t.type === 'EXPENSE')
    .reduce((acc: any, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const chartData = Object.keys(categoryTotals).map(cat => ({
    name: cat,
    value: categoryTotals[cat]
  }));

  const COLORS = ['#059669', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0'];

  return (
    <div className="space-y-6">
      {/* Wallet Card */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-emerald-100 text-sm font-medium">Available Balance</p>
          <h2 className="text-4xl font-bold mt-1">Rs. {balance.toLocaleString()}</h2>
          <div className="mt-8 flex justify-between">
            <div>
              <p className="text-emerald-200 text-xs">Income</p>
              <p className="font-semibold">Rs. {totalIncome.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-emerald-200 text-xs">Expenses</p>
              <p className="font-semibold">Rs. {totalExpense.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      {/* Spending Chart */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Spending by Category</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `Rs. ${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <i className="fa-solid fa-piggy-bank text-emerald-500 mb-2"></i>
          <p className="text-xs text-slate-500">Savings Goal Progress</p>
          <p className="text-lg font-bold">25% Done</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <i className="fa-solid fa-clock-rotate-left text-blue-500 mb-2"></i>
          <p className="text-xs text-slate-500">Recent Transactions</p>
          <p className="text-lg font-bold">{data.transactions.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
