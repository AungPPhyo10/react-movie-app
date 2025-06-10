// uses Redux pattern, instead of setting state directly, dispatch action -> go to reducer function -> compute next stage
import {useReducer} from 'react';

function reducer(state, action) {       // takes the current state and action 'type'  
    switch (action.type) {
        case 'increment':
            return state+1;
        case 'decrement':
            return state-1;
        default:
            throw new Error();
    }
}

function Usereducer() {
    const [state, dispatch] = useReducer(reducer, 0);      
    // similar to useState, but second function is to dispatch an ACTION, 0 is initial state
    // when state changed, trigger reducer function

    return (
    <div>
        <u>useReducer hook</u>
        <br/>
        Count: {state}
        <br/>
        <button type="button" onClick={() => dispatch({type: 'decrement'})}> - </button>
        <button type="button" onClick={() => dispatch({type: 'increment'})}> + </button>
        {/*     dispatch function can take two arguments, type = string, payload (optional)      */}
    </div>
    )
}

export default Usereducer;