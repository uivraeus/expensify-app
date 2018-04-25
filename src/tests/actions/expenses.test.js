import {addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup removeExpense object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  })
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

test('should setup addExpense object', () => {
  const expenseData = { 
    description: 'abc', 
    note: 'xyz',
    amount: 1000,
    createdAt: 2000
  }
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      ...expenseData
    }    
  });
});

test('should setup addExpense object with no data', () => {
  const action = addExpense();
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      description: '',
      note: '',
      amount: 0,
      createdAt: 0
    }    
  });
});