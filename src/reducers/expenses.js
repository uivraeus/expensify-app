// Expenses reducer and default state
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  //console.log('expensesReducer: action=', action);
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense]; //"(array) spread operator"
    case 'REMOVE_EXPENSE':
      //return state.filter( (expense) => (expense.id !== action.id) );
      return state.filter( ({id}) => (id !== action.id) ); //descruction of expense.id
    case 'EDIT_EXPENSE':
      return state.map( (expense) => {
        if (expense.id === action.id) {
          return {...expense, ...action.updates}; //"(object) spread operator - not yet standardized"
        } else {
          return expense;
        }
      });
    default:
    return state;
  }
};

export default expensesReducer;
