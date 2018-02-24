import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, KeyboardAvoidingView, TextInput, TouchableOpacity } from "react-native";
import { Container, Header, Content, View, Form, Input, Label, Text, Button, Item, Right, Left, Icon, Body, Title } from "native-base";
import LoginForm from './loginForm';
import { loginApi } from './../../api/outh';

const phoneFormatter = (number) => {
    if (!number) return '';
    // NNN-NNN-NNNN
    const splitter = /.{1,3}/g;
    number = number.substring(0, 10);
    return number.substring(0, 7).match(splitter).join('-') + number.substring(7);
};
/**
 * Remove dashes added by the formatter. We want to store phones as plain numbers
 */
const phoneParser = (number) => number ? number.replace(/-/g, '') : '';

export default class Login extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            phone: "",
            password: "",
            hasPhoneErr: "not"
        };
       
    }
   
    handleLogin()
    {   
        console.log("Login "+ this.state);
        if(this.state.phone === '')
        {
            this.setState({hasPhoneErr : 'Phone number require'});
            console.log(this.state.hasPhoneErr);
        }
        

    }
    componentWillMount() {
        /* 
        await Expo.Font.loadAsync({
           'Roboto': require('native-base/Fonts/Roboto.ttf'),
           'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
         });
         */
        this.setState({ isReady: true });
        this._loadinitialState();
    }
    _loadinitialState = async () => {
        var value = await AsyncStorage.getItem('user_id')
        //alert(value);
        if(value != null)
        {
            //this.props.navigation.navigate("Dashboard");
        }

    }
    
   
    render() {
        const { navigate } = this.props.navigation;
        
        return (

            <View behavior="padding" style={styles.wrapper}>
                    <View style={styles.container}>
                        <View style={{alignItems:'center'}}>
                        <Text style={styles.header}> Login </Text>
                        </View>
                        <LoginForm style={{alignSelf : 'stretch','flex-flow': 'row'}} navigate = {navigate}/>
                    </View>
            </View>
           
            
           
            
        );
    }
}

const styles = StyleSheet.create({
    wrapper:{
        flex: 2,
    },
    container: {
        flex: 2,
        justifyContent:'center',
        alignItems:'stretch',
        backgroundColor: '#34495e',
        paddingLeft: 20,
        paddingRight: 20
        
    },
    header:{
        fontSize: 24,
        marginBottom: 40,
        color: '#fff',
        alignItems: 'center',
    },
    textInput:
    {
        alignSelf: 'stretch',
        padding : 16,
        marginBottom: 20,
        backgroundColor: '#fff'
    },
    loginForm: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    btn: {
        alignSelf: 'stretch',
        backgroundColor: '#e67e22',
        padding: 20,
        alignItems: 'center'
    }
});