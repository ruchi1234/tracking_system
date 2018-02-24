import React , { Component } from 'react';
import { AsyncStorage } from "react-native";

export const isLogin = () =>
{
   var validate =  AsyncStorage.getItem("user_id").then((value) => {
        if(value)
        {
            global.isLogin = true;
        }
        else{
            global.isLogin = false;
        }
        console.log('value fetch'+ global.isLogin);
        //this.props.navigation.navigate("Dashboard");
        
    });
}

function getUserId() {
    var user_id;
   
    return new Promise(function(resolve, reject) {
        AsyncStorage.getItem("user_id").then((value) => {
            user_id = value;
            resolve(user_id);
            return value;
        });
      
    });
  }