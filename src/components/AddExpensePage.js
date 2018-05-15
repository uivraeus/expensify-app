import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startAddExpense } from '../actions/expenses';

//NOTE:
//mapDispatchToProps used below to avoid referencing startAddExpense() [actions/]
//directly from the AddExpensePage. This makes it easier to test AddExpensePage as
//the "props.startAddExpense" function can be handled by a spy

//NOTE II:
//Why a class based component when no state is managed?
//- have onSubmit as a member method instead of (re-)defining it everytime
//  the component is rendered

export class AddExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.startAddExpense(expense);
    this.props.history.push('/'); // /dashboard... or, route to / and rely on re-routing when loged in?
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    );
  }
}

//The logic in this map-function will not be covered by the test of AddExpensePage
//i.e. it is replaced by a spy
const mapDispatchToProps = (dispatch) => ({
  startAddExpense: (expense) => dispatch(startAddExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage); //get access to dispatch()
