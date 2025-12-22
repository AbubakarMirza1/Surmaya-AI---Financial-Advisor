
import React from 'react';
import { Screen } from '../types';

interface LayoutProps {
  currentScreen: Screen;
  setScreen: (screen: Screen) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentScreen, setScreen, children }) => {
  const navItems = [
    { screen: Screen.DASHBOARD, icon: 'fa-chart-pie', label: 'Home' },
    { screen: Screen.TRANSACTIONS, icon: 'fa-list-ul', label: 'History' },
    { screen: Screen.GOALS, icon: 'fa-bullseye', label: 'Goals' },
    { screen: Screen.LOANS, icon: 'fa-hand-holding-dollar', label: 'Loans' },
    { screen: Screen.ADVISOR, icon: 'fa-robot', label: 'Advisor' },
  ];

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-white shadow-xl relative">
      {/* Header */}
      <header className="bg-emerald-700 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Sarmaya AI</h1>
            <p className="text-emerald-100 text-sm">Your Pakistani Financial Partner</p>
          </div>
          <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
            <i className="fa-solid fa-user"></i>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 mb-20 pb-24">
        {children}
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-100 px-2 py-3 flex justify-around items-center z-50">
        {navItems.map((item) => (
          <button
            key={item.screen}
            onClick={() => setScreen(item.screen)}
            className={`flex flex-col items-center transition-colors ${
              currentScreen === item.screen ? 'text-emerald-600' : 'text-slate-400 hover:text-emerald-400'
            }`}
          >
            <i className={`fa-solid ${item.icon} text-xl mb-1`}></i>
            <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
