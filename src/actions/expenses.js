import uuid from 'uuid';
import database from '../firebase/firebase';

//ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

// returning a function (not an object). requires that redux-thunk is used
export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      description = '',
      amount = 0,
      note = '',
      createdAt = 0
    } = expenseData;
    const expense = { description, note, amount, createdAt };
    //"return" will enable promise-chaining which we make use of for testing
    return database.ref(`users/${uid}/expenses`).push(expense)
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

// returning a function (not an object). requires that redux-thunk is used
export const startRemoveExpense = ({id}={}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses/${id}`).remove()
    .then(() => {
      dispatch(removeExpense({id}))
    })
    .catch((e) => {
      colsole.log('startRemoveExpense: remove() failed! : ', e);
    });
  };
};

//EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

// returning a function (not an object). requires that redux-thunk is used
export const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    //"return" will enable promise-chaining which we make use of for testing
    return database.ref(`users/${uid}/expenses/${id}`).update(updates)
    .then((ref) => {
      dispatch(editExpense(id, updates));
    })
  };
};

//SET_EXPENSES
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

// returning a function (not an object). requires that redux-thunk is used
export const startSetExpenses = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses`).once('value')
    .then((snapshot) => {
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
};
