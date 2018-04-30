import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';
import ExpensesSummary from './ExpensesSummary';

const ExpenceDashboardPage = () => (
  <div>
    <ExpenseListFilters />
    <ExpensesSummary />
    <ExpenseList />
  </div>
);

export default ExpenceDashboardPage;