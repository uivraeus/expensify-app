import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

// Export for testing
export const ExpensesSummary = (props) => {
  const expenseStr = props.expenseCount === 1 ? 'expense' : 'expenses';
  const totalStr = numeral(props.expensesTotal/100).format('$0,0.00');
  return (
    props.expenseCount > 0 && (
      <div>
        <p>Viewing {props.expenseCount} {expenseStr} totalling {totalStr}</p>
      </div>
    )
  );
};

// the store's state -> props in ExpensesSummary
const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);
  return ({
    expenseCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses)
  });
};

export default connect(mapStateToProps)(ExpensesSummary);