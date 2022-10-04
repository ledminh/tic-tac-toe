// import { useReducer } from "react";

// const initState = {};

// function reducers(state, action) {

// }




// export default function useData() {

//     const [state, dispatch] = useReducer(reducers, initState);
// }




// function init(initialCount) {  return {count: initialCount};}
// function reducer(state, action) {
//   switch (action.type) {
//     case 'increment':
//       return {count: state.count + 1};
//     case 'decrement':
//       return {count: state.count - 1};
//     case 'reset':      return init(action.payload);    default:
//       throw new Error();
//   }
// }

// const [state, dispatch] = useReducer(reducer, initialCount, init);

// () => dispatch({type: 'reset', payload: initialCount})