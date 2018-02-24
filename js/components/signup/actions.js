import { DO_SIGNUP, POST_API_CALL, POST_API_CALL_SUCCESS, POST_API_CALL_ERROR } from './../../actionTypes';
import { ToastActionsCreators } from 'react-native-redux-toast';
import { AsyncStorage } from 'react-native';

export const doSignup = (signupData, callback) => {

    return (dispatch) => {

        dispatch({ type: 'POST_API_CALL' });


        fetch('http://innorade.in/seller/location/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                formData: this.signupData,
                store_id: '2'
            })
        })
            .then((response) => response.json())
            .then(function (json) {

                if (json.status == 200) {
                    if (Object.keys(json.responseData).length != 0) {
                        let user_id = json.responseData.admin_user_id;
                        let user_info = json.responseData;
                        AsyncStorage.setItem("user_id", user_id);
                        AsyncStorage.setItem("user_info", JSON.stringify(user_info));
                        dispatch({ type: 'POST_API_CALL_SUCCESS' });
                        callback();



                    }
                    else {

                        dispatch({ type: 'POST_API_CALL_ERROR' });
                        dispatch(ToastActionsCreators.displayError(json.message));
                    }
                }
                else {
                    dispatch({ type: 'POST_API_CALL_ERROR' });
                    dispatch(ToastActionsCreators.displayError(json.message));
                }

            })

            .catch(function (error) {
                console.log(error.messgae);
                dispatch({ type: 'POST_API_CALL_ERROR' });
                dispatch(ToastActionsCreators.displayError(error.message));
            })
    }


}
