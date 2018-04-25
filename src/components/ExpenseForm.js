import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
// assume that a parent has imported css for date-picker (see app.js)

//const now = moment();
//console.log(now.format('MMM Do, YYYY'));

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? (props.expense.amount/100).toString() : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      errorMessage: ''
    };
  }
 

  // NOTE! store e.target.value in local variable as it can not be referenced 
  // in the setState callback
  // (possible to solve by setting the event to "persist" via e.persist() )
  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState( () => ({ description }));
  };

  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState ( () => ({ note }));
  };

  onAmountChange = (e) => {
    // format validation (empty string OR only number with max 2 (optional) decimals)
    const amount = e.target.value;
    if (!amount || amount.match(/^\d+(\.\d{0,2})?$/)) {
      this.setState( () => ({ amount }));
    }
  };

  onDateChange = (createdAt) => {
    // actuallyu not needed for my (for some reason), but...
    // if field was cleared (DEL-key) then don't update
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };

  onFocusChange = ({focused}) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  onSubmit = (e) => {
    e.preventDefault(); //prevent page refresh

    //form validation (non-empty description and amount)
    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({errorMessage: 'Please provide description and amount'}));
    } else {
      this.setState(() => ({errorMessage: ''}));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
    }
  };

  render() {
    return (
      <div>
        <p>{this.state.errorMessage}</p>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Description"
            autoFocus
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input
            type="text"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker
            date = {this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false} //possible to select dates in the past
          />
          <textarea
            placeholder="Add a note for your expense (optional)"
            value={this.state.note}
            onChange={this.onNoteChange}
          >
          </textarea>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
