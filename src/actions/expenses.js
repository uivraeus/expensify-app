import uuid from 'uuid';
import database from '../firebase/firebase';

//ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

// returning a function (not an object). requires that redux-thunk is used
export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
      description = '',
      amount = 0,
      note = '',
      createdAt = 0
    } = expenseData;
    const expense = { description, note, amount, createdAt };
    //"return" will enable promise-chaining which we make use of for testing
    return database.ref('expenses').push(expense)
    .then((ref) => {
      dispatch(addExpense({ id: ref.key, ...expense }));
    })
  };
};

//REMOVE_EXPENSE
export const removeExpense = ({id}={}) => ({
  type: 'REMOVE_EXPENSE',
  id: id
});

//EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

//SET_EXPENSES
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

// returning a function (not an object). requires that redux-thunk is used
export const startSetExpenses = () => {
  return (dispatch) => {
    return database.ref(`expenses`).once('value').
    then((snapshot) => {
      const expenses = []
      snapshot.forEach((childSnapshot) => {
        expenses.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      })
      dispatch(setExpenses(expenses)); 
    });
  };

  // database.ref(`expenses`).once('value')
  // .then((snapshot) => {
  //   console.log(">>> startSetExpenses: database once() resolved");
  
  //   const dummyExpense = {
  //     id: 1000,
  //     description:'Dummy',
  //     note:'',
  //     amount: 1234,
  //     createdAt: 123456789
  //   };
  //   dispatch(setExpenses([dummyExpense])); //TBD: how to populate this? using "on" for each child?...  
  // });  
};
