import { IS_VALIDATING_LOGIN } from './actionTypes';
//import { ToastActionsCreators } from 'react-native-redux-toast';
import { AsyncStorage } from 'react-native';

export const validateIsLogin = (callback) => {
    return (dispatch) => {
        let validateLoginStatus = {
            isValidateLogin: true,
        };
        dispatch({ type: IS_VALIDATING_LOGIN, payload: validateLoginStatus });
        AsyncStorage.getItem('user_id')
            .then((value) => {
                if (value) {

                    validateLoginStatus = {
                        isValidateLogin: false,
                        logged_in_user_id: value,

                    };
                    dispatch({ type: IS_VALIDATING_LOGIN, payload: validateLoginStatus });
                    callback('Dashboard');
                }
                else {
                    dispatch({ type: IS_VALIDATING_LOGIN, payload: validateLoginStatus });
                    callback('Login');
                }

            })
            .catch((error) => {
                dispatch({ type: MODAL_VISSIBLE, payload: validateLoginStatus });
            })
    }
}
export const userLogout = (callback) => {
    return (dispatch) => {
        let validateLoginStatus = {
            isValidateLogin: true,

        };

        dispatch({ type: IS_VALIDATING_LOGIN, payload: validateLoginStatus });
        AsyncStorage.removeItem('user_id');
        AsyncStorage.removeItem('userInfo');
        dispatch({ type: IS_VALIDATING_LOGIN, payload: { isValidateLogin: false } });
        callback();
    }

}

