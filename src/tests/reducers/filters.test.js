import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('should setup default values', () => {
  const state = filtersReducer(undefined, {type: '@@INIT'});
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});


test('should set sort by amount', () => {
  const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'});
  expect(state.sortBy).toBe('amount');
});

test('should set sort by date', () => {
  const currentState = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  };
  const action = {type: 'SORT_BY_DATE'};
  const state = filtersReducer(currentState, action);
  expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
  const action = {
    type: 'SET_TEXT_FILTER',
    text: 'test'
  };
  const state = filtersReducer(undefined, action);
  expect(state.text).toBe('test');
});


test('should set start date filter', () => {
  const action = {
    type: 'SET_START_DATE',
    date: moment(12345)
  };
  const state = filtersReducer(undefined, action);
  expect(state.startDate).toEqual(moment(12345));
});

test('should set start date filter', () => {
  const action = {
    type: 'SET_END_DATE',
    date: moment(12345)
  };
  const state = filtersReducer(undefined, action);
  expect(state.endDate).toEqual(moment(12345));
});