import {createStore } from 'redux';

// Action generators
// Syntax explanation:
// 1. "destruct" first argument (object), which has a default of empty-object
// 2. default-assign the destructed variable to 1 (if not part of object to destruct)
// 3. Finally, assigning an object item with same name as variable assigning from -> only write it once
const incrementCount = ({ incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy
  });

const decrementCount = ({ decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const setCount = ({ count }) => ({
    type: 'SET',
    count
});

const resetCount = () => ({
    type: 'RESET'
});

// Reducers
const countReducer = (state = {count: 0} , action ) => {
  switch (action.type) {
    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy
      };
    case 'INCREMENT':
     return {
        count: state.count + action.incrementBy
      };
    case 'RESET':
      return {
        count: 0
      };
    case 'SET':
      return {
        count: action.count
      }
    default:
      return state;
  }
}


const store = createStore(countReducer);

const unsubscribe = store.subscribe( () => {
  console.log(store.getState());
});

// I'd like to increment the count
// store.dispatch({
//   type: 'INCREMENT', // CAPITAL letter; redux convention
//   incrementBy: 5
// });
store.dispatch(incrementCount({ incrementBy:5 }));

//unsubscribe()

store.dispatch(incrementCount());

// I'd like to reset the count
store.dispatch(resetCount());


// I'd like to decrement the count
store.dispatch(decrementCount());

// I'd like to decrement the count
store.dispatch(decrementCount({ decrementBy:10 }));


store.dispatch(setCount({count: 101}));