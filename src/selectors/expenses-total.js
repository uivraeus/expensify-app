// My own attempt...
// const reducer = (accumulator, currentValue) => accumulator + currentValue;
// const mapper = (expense) => expense.amount;

// const selectExpensesTotal = (expenses) => {
//   const total = expenses.length == 0 ? 0 : expenses.map(mapper).reduce(reducer);
//   return total;
// };

// export default selectExpensesTotal;

// Andrew's...
export default (expenses) => {
  return expenses
    .map((expense) => expense.amount)
    .reduce((sum, value) => sum + value, 0);
};