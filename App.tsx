
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import GoalsView from './components/GoalsView';
import AdvisorChat from './components/AdvisorChat';
import AIAdvisorOverlay from './components/AIAdvisorOverlay';
import { Screen, AppData } from './types';
import { INITIAL_DATA } from './constants';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.DASHBOARD);
  const [appData, setAppData] = useState<AppData>(INITIAL_DATA);

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.DASHBOARD:
        return <Dashboard data={appData} />;
      case Screen.TRANSACTIONS:
        return <TransactionList transactions={appData.transactions} />;
      case Screen.GOALS:
        return <GoalsView goals={appData.goals} />;
      case Screen.ADVISOR:
        return <AdvisorChat data={appData} />;
      case Screen.LOANS:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-800">Loans Tracker</h3>
            {appData.loans.map(loan => (
              <div key={loan.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${loan.type === 'GIVEN' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'}`}>
                  <i className={`fa-solid ${loan.type === 'GIVEN' ? 'fa-hand-holding-heart' : 'fa-hand-holding-dollar'} text-xl`}></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-800">{loan.person}</h4>
                  <p className="text-xs text-slate-500">{loan.type === 'GIVEN' ? 'Lent to' : 'Owed to'} • Due: {loan.dueDate}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-800">Rs. {loan.amount.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return <Dashboard data={appData} />;
    }
  };

  return (
    <Layout currentScreen={currentScreen} setScreen={setCurrentScreen}>
      {renderScreen()}
      <AIAdvisorOverlay 
        currentScreen={currentScreen} 
        data={appData} 
        onChatClick={() => setCurrentScreen(Screen.ADVISOR)}
      />
    </Layout>
  );
};

export default App;
