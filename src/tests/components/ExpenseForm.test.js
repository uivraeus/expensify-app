import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('should render ExpenseForm', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with expense data', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[2]}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  // Simulate submit event. Provide event object with preventDefault-method
  // which will be called by the event-handler under test 
  wrapper.find('form').simulate('submit', { 
    preventDefault: () => { }
  });
  expect(wrapper.state('errorMessage').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
  const value = 'New description';
  const wrapper = shallow(<ExpenseForm />);
  // several inputs, we are interested in the first (index 0) here
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('description')).toBe(value);
});

test('should set note on textarea change', () => {
  const value = 'New note';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('textarea').simulate('change', {
    target: { value }
  });
  expect(wrapper.state('note')).toBe(value);
});

test('should set amount if valid input', () => {
  const value = '23.50';
  const wrapper = shallow(<ExpenseForm />);
  // several inputs, we are interested in the second (index 1) here
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount if invalid input', () => {
  const value = '12.122';
  const wrapper = shallow(<ExpenseForm />);
  // several inputs, we are interested in the second (index 1) here
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('amount')).toBe(''); //default is ''
});

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
  wrapper.find('form').simulate('submit', { 
    preventDefault: () => { }
  });
  expect(wrapper.state('errorMessage')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({  //"id" not included -> need to create explicit
    description: expenses[0].description,
    amount: expenses[0].amount,
    createdAt: expenses[0].createdAt,
    note: expenses[0].note
  });
});

test('should set new date on date change', () => {
  const newTime = moment(1234567);
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('SingleDatePicker').prop('onDateChange')(newTime);
  expect(wrapper.state('createdAt')).toEqual(newTime);
});

test('should set calendar focus on change', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper.state('calendarFocused')).toBe(false); // default
  wrapper.find('SingleDatePicker').prop('onFocusChange')( {focused: true });
  expect(wrapper.state('calendarFocused')).toBe(true);
});
