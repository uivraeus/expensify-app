import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

// "export" for testing 
export const ExpenseList = (props) => (
  <div>
    {
      props.expenses.length === 0 ? (
        <p>No expenses</p>
      ) : (
        props.expenses.map( (expense) => (
          <ExpenseListItem key={expense.id} {...expense}/>
        ))
      )
    }
        
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

