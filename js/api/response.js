import React , { Component } from 'react';
import { AsyncStorage } from "react-native";
import { Toast } from "native-base";

//import { StackNavigator } from 'react-navigation';

export const attendanceApi = (formData, callback) =>
{
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
      .then((response) => response.json())
      .then(function(json){
          //console.log(response);
          if(json.status==200)
          {
               
             if(Object.keys(json.responseData).length !=0)
                {
                    let present_id = json.present_id;
                    let present_date = json.present_date;
                    let today_attendance = {
                        'present_id': present_id,
                        'present_date': present_date
                    }
                    AsyncStorage.setItem("today_attendance", JSON.stringify(today_attendance));
                   
                    Toast.show({
                        text: json.message,
                        position: 'bottom',
                        buttonText: 'Okay',
                        type: 'info'
                    });
                   
                    callback();
                }
                else{
                    Toast.show({
                        text: json.message,
                        position: 'bottom',
                        buttonText: 'Okay',
                        type: 'danger'
                    });
                    
                }
                
          }
          else{
            Toast.show({
                text: json.message,
                position: 'bottom',
                buttonText: 'Okay',
                type: 'danger'
            });

          }
          
      })
      
      .catch(function(error) {
        Toast.show({
            text: error.message,
            position: 'bottom',
            buttonText: 'Okay',
            type: 'danger'
        });
        //console.log(error.message);
      })
      
     // return 0;
}
