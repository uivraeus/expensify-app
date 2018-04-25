import React from 'react'; 
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

// Refactored with mapDispatchToProps and class-based component as done
// for AddExpensePage (see that one for futher details)

export class EditExpensePage extends React.Component {
  onClick = () => {
    this.props.removeExpense(this.props.expense.id)
    this.props.history.push('/'); //goto dashboard
  };
  onSubmit = (expense) => {
    this.props.editExpense(this.props.expense.id, expense);
    this.props.history.push('/'); //goto dashboard
  };
  render() {
    return (
      <div>
        <ExpenseForm
          expense={this.props.expense}
          onSubmit={this.onSubmit}
        />
        <button onClick = {this.onClick}>Remove</button>
      </div>
    );
  };
};

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((expense) =>  expense.id === props.match.params.id)
  };
};

const mapDispatchToProps = (dispatch) => ({
  editExpense: (id, expense) => dispatch(editExpense(id, expense)),
  removeExpense: (id) => dispatch(removeExpense({ id }))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);