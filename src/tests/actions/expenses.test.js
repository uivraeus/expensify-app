import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
  addExpense, 
  startAddExpense, 
  editExpense,
  startEditExpense,
  removeExpense,
  startRemoveExpense,
  setExpenses, 
  startSetExpenses
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'thisismytestuid';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt }
  });
  database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

test('should setup removeExpense object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  })
});

test('should remove expense from database and from store', (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startRemoveExpense({ id: expenses[1].id })).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id: expenses[1].id
    });

    // Check that item not in database anymore
    return database.ref(`users/${uid}/expenses/${actions[0].id}`).once('value')
  })
  .then((snapshot) => {
    expect(snapshot.val()).toBe(null)
    done();
  });
});


test('should setup editExpense object', () => {
  const action = editExpense('123', { description: 'abc', note: 'xyz' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123',
    updates: {
      description: 'abc',
      note: 'xyz'
    } 
  })
});

test('should edit expense from firebase', (done) => {
  const updates1 = { amount: expenses[1].amount * 2 };
  const id1 = expenses[1].id

  const store = createMockStore(defaultAuthState);
  return store.dispatch(startEditExpense(id1, updates1))
  .then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id: id1,
      updates: updates1
    });

    return database.ref(`users/${uid}/expenses/${id1}`).once('value');
  })
  .then((snapshot) => {
    expect(snapshot.val()).toEqual({
      amount: updates1.amount,
      description: expenses[1].description,
      note: expenses[1].note,
      createdAt: expenses[1].createdAt
    });
    done();
  });
});

test('should setup addExpense object', () => {
  const action = addExpense(expenses[0]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[0]    
  });
});

//"done" can be used in asynchronous test cases to indicate when all checks are done
test('should add expense to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  };

  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });

    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
  })
  .then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);

    done();
  });
});

test('should add expense with default to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const expDefault = {
      description: '',
      note: '',
      amount: 0,
      createdAt: 0
  };

  store.dispatch(startAddExpense()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expDefault
      }
    });

    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
  })
  .then((snapshot) => {
    expect(snapshot.val()).toEqual(expDefault);

    done();
  });
});

test('should setup a set expense action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

//"done" can be used in asynchronous test cases to indicate when all checks are done
test('should set expenses in store based on database content', (done) => {
  const store = createMockStore(defaultAuthState);
  
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    //database loaded with "expenses" before each TC
    
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });

    done();
  });  
});