import { firebase, googleAuthProvider } from '../firebase/firebase';

//NOTE: the startLogin/out actions do not dispatch the corresponding
//actions to the store (in their respective ".then()"). 
//Instead, that step is managed by the general callback in app.js
//where any auth-state-toggling is managed. This is so because
//when the app is loaded, while already being logged in, the
//startLogin action will never run

export const login = (uid) => ({
  type: 'LOGIN',
  uid
});

export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const logout = (uid) => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};