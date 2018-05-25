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

test('should handle onRemoveClick, i.e. launch modal query', () => {
  wrapper.find('button').simulate('click');
  expect(wrapper.find('DeleteModal').prop('queryConfirm')).toBe(true);
  //expect(history.push).toHaveBeenLastCalledWith('/');
  //expect(startRemoveExpense).toHaveBeenLastCalledWith(expense.id);
});

test('should handle delete abort, i.e. remove the modal query w/o any deletion', () => {
  // Enable the modal 
  wrapper.find('button').simulate('click');
  expect(wrapper.find('DeleteModal').prop('queryConfirm')).toBe(true);

  // Now remove it
  wrapper.find('DeleteModal').prop('onNo')();
  wrapper.update();
  expect(wrapper.find('DeleteModal').prop('queryConfirm')).toBe(false);

  // Negative testing
  expect(startRemoveExpense).not.toHaveBeenLastCalledWith(expense.id);
});

test('should handle delete confirm, i.e. remove the modal query and initate delete', () => {
  // Enable the modal 
  wrapper.find('button').simulate('click');
  expect(wrapper.find('DeleteModal').prop('queryConfirm')).toBe(true);

  // Now remove it
  wrapper.find('DeleteModal').prop('onYes')();
  wrapper.update();
  expect(wrapper.find('DeleteModal').prop('queryConfirm')).toBe(false);

  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startRemoveExpense).toHaveBeenLastCalledWith(expense.id);
});
