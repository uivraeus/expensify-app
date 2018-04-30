import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('should render expenses summary (no expenses)', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={0} expensesTotal={0} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render 1 expense summary', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={12350} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render 2 expenses summary', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={2} expensesTotal={22350} />);
  expect(wrapper).toMatchSnapshot();
});