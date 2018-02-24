import { IS_VALIDATING_LOGIN, POST_API_CALL, POST_API_CALL_SUCCESS, POST_API_CALL_ERROR, GET_API_CALL, GET_API_CALL_SUCCESS, GET_API_CALL_ERROR, MODAL_VISSIBLE, MODAL_HIDDEN } from '../actionTypes';
const INITIAL_STATE = {
    isModalVisible: false,
    postLoadingIndicator: false,
    getLoadingIndicator: false,
    isValidateLogin: false,
    logged_in_user_id: null,
    logged_in_user_info: null

};


const globalReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case IS_VALIDATING_LOGIN:
            return { ...state, isValidateLogin: action.payload.isValidateLogin, logged_in_user_id: action.payload.logged_in_user_id }
        case POST_API_CALL:
            return { ...state, postLoadingIndicator: true }
        case POST_API_CALL_SUCCESS:
            return { ...state, postLoadingIndicator: false }
        case POST_API_CALL_ERROR:
            return { ...state, postLoadingIndicator: false }
        case GET_API_CALL:
            return { ...state, getLoadingIndicator: true }
        case GET_API_CALL_SUCCESS:
            return { ...state, getLoadingIndicator: false }
        case GET_API_CALL_ERROR:
            return { ...state, getLoadingIndicator: false }


        case MODAL_VISSIBLE:
            return { ...state, isModalVisible: true }
        case MODAL_HIDDEN:
            return { ...state, isModalVisible: false }

        default:
            return state;
    }
}

export default globalReducer;