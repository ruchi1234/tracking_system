
import { DO_LOGIN, DO_LOGIN_ERROR } from '../actionTypes';

const INITIAL_STATE = {
   
    userInfo: null,
    signuperror: null
};


const loginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DO_LOGIN:
            return { ...state, userInfo: action.payload };
        case DO_LOGIN_ERROR:
            return { ...state, signuperror: action.payload }
        default:
            return state;
    }
}

export default loginReducer;