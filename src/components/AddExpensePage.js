import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { addExpense } from '../actions/expenses';

//NOTE:
//mapDispatchToProps used below to avoid referencing addExpense() [actions/]
//directly from the AddExpensePage. This makes it easier to test AddExpensePage as
//the "props.addExpense" function can be handled by a spy

//NOTE II:
//Why a class based component when not state is managed?
//- have onSubmit as a member method instead of (re-)defining it everytime
//  the component is rendered

export class AddExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.addExpense(expense);
    this.props.history.push('/'); //goto dashboard
  };
  render() {
    return (
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

//The logic in this map-function will not be covered by the test of AddExpensePage
//i.e. it is replaced by a spy
const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(addExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage); //get access to dispatch()
