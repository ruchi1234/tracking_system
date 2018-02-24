import { DO_LOGIN, POST_API_CALL, POST_API_CALL_SUCCESS, POST_API_CALL_ERROR } from './../../actionTypes';
import { ToastActionsCreators } from 'react-native-redux-toast';
import { AsyncStorage } from 'react-native';

export const doLogin = (loginData,callback) => {
   
    return (dispatch) => {
        
       dispatch({ type: POST_API_CALL });

        fetch('http://innorade.in/seller/location/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                formData: loginData,
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
                        //this.props.navigation.navigate('Dashboard');
                        //navigation("Dashboard")
                        dispatch({ type: POST_API_CALL_SUCCESS });
                      
                        callback();

                    }
                    else {

                        dispatch({ type: POST_API_CALL_ERROR });
                        dispatch(ToastActionsCreators.displayError(json.message));


                    }
                }
                else {
                    dispatch({ type: POST_API_CALL_ERROR });
                    dispatch(ToastActionsCreators.displayError(json.message));
                }
                //let userInfo = json.responseData;
            })
            .catch(function (error) {
                dispatch({ type: POST_API_CALL_ERROR });
                dispatch(ToastActionsCreators.displayError(error.message));
                //console.log(error.message);
            })
    }
   
 
}
