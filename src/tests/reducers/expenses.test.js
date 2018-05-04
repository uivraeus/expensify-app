import expenses from '../fixtures/expenses';
import expensesReducer from '../../reducers/expenses';
import moment from 'moment';

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should add expense', () => {
  const expense = {
    id: 3,
    description:'New expense',
    note:'jeje',
    amount: 45000,
    createdAt:  moment(0).add(5,'days').valueOf()
  };
  const action = {
    type: 'ADD_EXPENSE',
    expense
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});

test('should edit an expense by id', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[1].id,
    updates: {
      note: 'add some information',
      amount: 1000000
    }
  };
  const expected = [...expenses];
  expected[1] = {...expected[1], ...action.updates}
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expected);
});

test('should not edit an expense if id not found', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates: {
      note: 'add some information',
      amount: 1000000
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should set expenses', () => {
  const expensesBefore = [expenses[0]];
  const expensesAfter = [expenses[1], expenses[2]];
  const action = {
    type: 'SET_EXPENSES',
    expenses: expensesAfter
  };
  const state = expensesReducer(expensesBefore, action);
  expect(state).toEqual(expensesAfter);  
});