
import { DO_SIGNUP, DO_SIGNUP_ERROR } from '../actionTypes';

const INITIAL_STATE = {
   
    userInfo: null,
    signuperror: null
};


const signupReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DO_SIGNUP:
            return { ...state, userInfo: action.payload };
        case DO_SIGNUP_ERROR:
            return { ...state, signuperror: action.payload }
        default:
            return state;
    }
}

export default signupReducer;