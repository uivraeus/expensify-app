import { login, startLogin, logout, startLogout } from '../../actions/auth';

test('should generate a LOGIN action object', () => {
  const action = login('1234');
  expect(action).toEqual({
    type: 'LOGIN',
    uid: '1234'
  });
});

test('should generate a LOGOUT action object', () => {
  const action = logout();
  expect(action).toEqual({
    type: 'LOGOUT'
  });
});

// No tests for startLogin/startLogout... TBD?
