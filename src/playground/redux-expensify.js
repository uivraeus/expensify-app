import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// Action generators...

//ADD_EXPENSE
const addExpense = ({description='', note='', amount=0, createdAt=0}={}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description: description,
    note: note,
    amount: amount,
    createdAt: createdAt
  }
});

//REMOVE_EXPENSE
const removeExpense = ({id}={}) => ({
  type: 'REMOVE_EXPENSE',
  id: id
});

//EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

//SET_TEXT_FILTER
const setTextFilter = ( (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text //text: text
}));

//SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE'
});

//SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
});

//SET_START_DATE
const setStartDate = (date = undefined) => ({
  type: 'SET_START_DATE',
  date
});

//SET_END_DATE
const setEndDate = (date = undefined) => ({
  type: 'SET_END_DATE',
  date
});



// Expenses reducer and default state
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
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

// Filters reducer and default state
const filterReducerDefaultState = {
  text: '',
  sortBy: 'date', //date or amount
  startDate: undefined,
  endDate: undefined
};
const filterReducer = (state= filterReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state, 
        text: action.text
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state, 
        sortBy: 'amount'
      };
    case 'SORT_BY_DATE':
      return {
        ...state, 
        sortBy: 'date'
      };
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.date
      };
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.date
      };
    default:
      return state;
  }
};

// Get visible expenses according to filter/sorting settings
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
  return expenses.filter( (expense) => {
    const startDateMatch = typeof startDate != 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate != 'number' || expense.createdAt <= endDate;
    const textMatch = text.length === 0 || expense.description.toLowerCase().includes(text.toLowerCase());
    //console.log('getVisibleExpenses', expense.createdAt, startDate, startDateMatch);
    //console.log('getVisibleExpenses', expense.createdAt, endDate, endDateMatch);
    //console.log('getVisibleExpenses', expense.description, text, textMatch);
    return startDateMatch && endDateMatch && textMatch;
  }).sort( (a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1: -1;
    } else if (sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1;
    }
  });
};

//Store creation using combineReducers()
//Actions will be despatched to all reducers but not necessasarily handled in all
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filterReducer
  })
);

store.subscribe( () => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const exp1 = store.dispatch(addExpense({description: 'rent', amount:1000, createdAt: 1000}));
const exp2 = store.dispatch(addExpense({description: 'coffee', amount:300, createdAt: 2000}));
// store.dispatch(removeExpense({id: exp1.expense.id}));
// store.dispatch(editExpense(exp2.expense.id, {amount: 5000}));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());
store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(999));

const demoState = {
  expenses: [{
    id: 'jejje',
    description: 'January rent',
    note: 'This was the final payment for that address',
    amount: 54500,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', //date or amount
    startDate: undefined,
    endDate: undefined
  }
};

