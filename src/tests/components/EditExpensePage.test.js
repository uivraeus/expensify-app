import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

//common for each test case
let expense, startEditExpense, startRemoveExpense, history, wrapper;
beforeEach( () => {
  expense = expenses[1];
  startEditExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(<EditExpensePage 
                      expense={expense} 
                      startEditExpense={startEditExpense} 
                      startRemoveExpense={startRemoveExpense} 
                      history={history}
                    />);
});

test('should test render EditExpensePage', () =>{
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expense);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startEditExpense).toHaveBeenLastCalledWith(expense.id, expense);
});

test('should handle onClick, i.e. remove expense', () => {
  //wrapper.find('button').prop('onClick')();
  wrapper.find('button').simulate('click');
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startRemoveExpense).toHaveBeenLastCalledWith(expense.id);
});