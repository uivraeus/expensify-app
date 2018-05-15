import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

// "export" for testing 
export const ExpenseList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Expenses</div>
      <div className="show-for-desktop">Expense</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    <div className="list-body">
      {
        props.expenses.length === 0 ? (
          <div className="list-item list-item__message">
            <span>No Expenses</span>
          </div>
        ) : (
          props.expenses.map( (expense) => (
            <ExpenseListItem key={expense.id} {...expense}/>
          ))
        )
      }
    </div>
        
  </div>
);


//the "state" arg is the store's state, i.e. what one gets when calling store.getState()
const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
}

//connect() returns a function which is used to create the HOC
export default connect(mapStateToProps)(ExpenseList);

