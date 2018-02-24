import React, { Component } from "react";

import { Platform } from "react-native";
import { Root } from "native-base";
import {connect} from 'react-redux';

import { StackNavigator } from "react-navigation";

import Drawer from "./Drawer";

//import Header from "./components/Header/";
//import Home from "./components/Header/1";
//import Login from "./components/login";
//import SignUp from "./components/signup";




const AppNavigator = StackNavigator(
    {
        Drawer: { screen: Drawer },
       // Header: { screen: Header },
        //Login: { screen: Login },
        //SignUp: { screen: SignUp }
    },
    {
        initialRouteName: "Drawer",
        headerMode: "none"
    }
);

class AppChild extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
           
                <AppNavigator />
           
        );
    }
}
const mapStateToProps = (state) => {

    //const { internetStatus } = state.globalReducer;
    return {
        //internetStatus
    }

}

export default connect(mapStateToProps, {  })(AppChild);