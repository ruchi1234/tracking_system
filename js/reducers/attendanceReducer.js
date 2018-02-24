import { MARK_ATTENDANCE } from '../actionTypes';

const INITIAL_STATE = {
   
  
};


const attendanceReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MARK_ATTENDANCE:
            return { ...state};
        default:
            return state;
    }
}

export default attendanceReducer;