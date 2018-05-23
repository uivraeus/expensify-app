import React from 'react'; 
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import DeleteModal from './DeleteModal';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

// Refactored with mapDispatchToProps and class-based component as done
// for AddExpensePage (see that one for futher details)

export class EditExpensePage extends React.Component {
  state = {
    queryDelete: false
  };

  onClick = () => {
    this.setState(() => ({queryDelete: true}))  
  };

  onDeleteConfirm = () => {
    this.setState(() => ({queryDelete: false}))
    
    this.props.startRemoveExpense(this.props.expense.id)
    this.props.history.push('/'); //goto dashboard
  }

  onDeleteAbort = () => {
    this.setState(() => ({queryDelete: false}))
  }

  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push('/'); // /dashboard... or, route to / and rely on re-routing when loged in?
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
            expense={this.props.expense}
            onSubmit={this.onSubmit}
          />
          <button className="button button--secondary" onClick = {this.onClick}>Remove Expense</button>
        </div>
        <DeleteModal queryConfirm={this.state.queryDelete} onYes={this.onDeleteConfirm} onNo={this.onDeleteAbort}/>
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
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: (id) => dispatch(startRemoveExpense({ id }))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);