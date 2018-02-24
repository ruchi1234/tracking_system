import React from "react";
import { DrawerNavigator } from "react-navigation";
import Appstart from "./components/appStart/";
import Home from "./components/home/";
import Header from "./components/Header/";

import Login from "./components/login/";
import Logout from "./components/logout/"

import SignUp from "./components/signup";
import SideBar from "./components/sidebar/";
import Dashboard from "./components/dashboard";
import Attendance from "./components/attendance";
import Tracking from "./components/tracking";
//import Track from "./components/track";
import { isSignedIn } from "./outh/";


const DrawerExample = DrawerNavigator(
    {
       
        Appstart: { screen: Appstart },
        Header: { screen: Header },
        Home: { screen: Home },
        Login: { screen: Login },
        Logout: {screen: Logout},
        Dashboard:  { screen: Dashboard},
        Attendance: { screen: Attendance },
        Tracking: { screen: Tracking },
        SignUp: { screen: SignUp },
        

    },
    {
        initialRouteName: 'Appstart',
        contentOptions: {
            activeTintColor: "#e91e63"
    },
        contentComponent: props => <SideBar {...props} />
    }
);


export default DrawerExample;