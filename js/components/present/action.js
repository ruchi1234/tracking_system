import { MARK_ATTENDANCE, POST_API_CALL, POST_API_CALL_SUCCESS, POST_API_CALL_ERROR } from './../../actionTypes';
import { ToastActionsCreators } from 'react-native-redux-toast';
import { AsyncStorage } from 'react-native';

export const markPresent = (formData, callback) => {

    return (dispatch) => {

        dispatch({ type: POST_API_CALL });

        fetch('http://innorade.in/seller/location/markAttendance', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                formData: formData,
                store_id: '2'
            })
        })
          /*  
            .then(function(response) {
              console.log(response);
            })
          */

            .then((response) => response.json())
            .then(function (json) {
                //console.log(response);
                if (json.status == 200) {

                    if (Object.keys(json.responseData).length != 0) {
                        let present_id = json.present_id;
                        let present_date = json.present_date;
                        let today_attendance = {
                            'present_id': present_id,
                            'present_date': present_date
                        }
                        AsyncStorage.setItem("today_attendance", JSON.stringify(today_attendance));
                        dispatch({ type: POST_API_CALL_SUCCESS });
                        callback();
                    }
                    else {
                        
                        dispatch(ToastActionsCreators.displayError(json.message));
                        dispatch({ type: POST_API_CALL_ERROR });
                    }

                }
                else {
                    dispatch(ToastActionsCreators.displayError(json.message));
                    dispatch({ type: POST_API_CALL_ERROR });
                }

            })
            
            .catch(function (error) {
                console.log(error.message);
                dispatch({ type: POST_API_CALL_ERROR });
                dispatch(ToastActionsCreators.displayError(error.message));
            })

    }


}
