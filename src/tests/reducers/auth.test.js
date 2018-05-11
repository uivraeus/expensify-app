import authReducer from '../../reducers/auth';

test('should set default state', () => {
  const state = authReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({});
});

test('should add a uid at login', () => {
  const state = authReducer({}, { type: 'LOGIN', uid: '1234' });
  expect(state).toEqual({uid: '1234'});
});

test('should remove a uid at logout', () => {
  const state = authReducer({uid: '1234'}, { type: 'LOGOUT' });
  expect(state).toEqual({});
});