import { Reducer, useReducer } from "react";
import { StateData, ActionType, GameType } from "../typesAndInterfaces";
import { initState } from "./states";

import * as LocalStorage from '../LocalStorage';


const reducer:Reducer<StateData, ActionType> = (state, action)  => {
    switch(action.type) {
        
    }

    return state;

}





export default function useData() {

    const [state, dispatch] = useReducer(reducer, initState);

    const loadData = (type:GameType, X: 'player1' | 'player2' | 'CPU') => {
        let O = '';

        if(X === 'player2' || X === 'CPU') {
            O = 'player1';
        }
        else if(type === 'vsCPU' ) {
            O = 'CPU';
        }
        else {
            O = 'player2';
        }
        

        const data = LocalStorage.loadData(type);

        
    }

}




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