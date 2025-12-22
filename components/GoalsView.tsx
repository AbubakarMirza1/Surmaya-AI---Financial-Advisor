
import React from 'react';
import { Goal } from '../types';

interface GoalsViewProps {
  goals: Goal[];
}

const GoalsView: React.FC<GoalsViewProps> = ({ goals }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-slate-800">Your Goals</h3>
      {goals.map((goal) => {
        const progress = (goal.currentAmount / goal.targetAmount) * 100;
        return (
          <div key={goal.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-bold text-slate-800">{goal.name}</h4>
                <p className="text-xs text-slate-500">Target: Rs. {goal.targetAmount.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                  {goal.category}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-600">Rs. {goal.currentAmount.toLocaleString()} saved</span>
                <span className="text-emerald-600">{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex items-center text-xs text-slate-400 gap-1">
              <i className="fa-regular fa-clock"></i>
              <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
            </div>
          </div>
        );
      })}
      
      <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 font-medium hover:border-emerald-300 hover:text-emerald-500 transition-colors">
        + Add New Goal
      </button>
    </div>
  );
};

export default GoalsView;
