import React, { Component } from 'react';

import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Icon } from "native-base";
import { ScrollView, StyleSheet, KeyboardAvoidingView, View } from 'react-native';
import SignUpForm from './signupForm';

export default class SignUp extends Component {
    constructor(props)
    {
        super(props);
        
        this.state = {
            userName : '',
            email: '',
            phone: '',
            address: ''
        }
        //this.handleSubmit = this.handleSubmit.bind(this);
      //  alert( global.apiurl);
    }
    
   
    render() {
        const { navigate } = this.props.navigation;
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
               
               
                    <View style={styles.container}>
                    <View style={{alignItems:'center'}}>
                        <Text style={styles.header}> Sign up </Text>
                    </View>
                       
                      <SignUpForm navigate={navigate}/>
                    </View>
               
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
   
    wrapper:{
        flex: 2,
    },
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'stretch',
        backgroundColor: '#34495e',
        paddingLeft: 20,
        paddingRight: 20,
       
        
    },
    header:{
        fontSize: 24,
        marginBottom: 10,
        marginTop:20,
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
        backgroundColor: '#01c853',
        padding: 20,
    }
       
});