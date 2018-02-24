import React, { Component } from 'react';
//import Expo from 'expo';
import { View, StyleSheet } from 'react-native';
import { Container, Item, Input, Header, Body, Content, Title, Button, Text, Label, Form } from 'native-base';
import { Field, reduxForm, formValueSelector, getFormValues, isValid, SubmissionError } from 'redux-form';
import { connect } from "react-redux";
import Loader from './../Loader';
import { doLogin } from './actions';
import { loginApi } from './../../api/outh'

const validate = values => {
    const error = {};
    error.phone = '';
    error.password = '';
    let phn = values.phone;
    let pass = values.password;

    if (values.phone === undefined) {
        phn = '';
    }
    if (values.password === undefined) {
        pass = '';
    }

    if (phn != '') {

        if (!phonenumber(phn)) {
            error.phone = 'Invailid'
        }
    }
    //return this.setState({error:error});
    return error;
};

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

const phonenumber = (inputtxt) => {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return inputtxt.match(phoneno) ? true : false;
}
let navigate;
class LoginFormTemplate extends Component {
    constructor(props) {
        super(props);
       
        navigate = props.navigate;
       
        this.state = {
            isReady: false,
            error: {},

        };
        this.renderInput = this.renderInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
       
        //console.log(props);
    }
    handleSubmit() {
        
        let submitError = {};

        if (loginData.phone === undefined) {

            submitError.phone = '* Required';

        }
        if (loginData.password === undefined) {
            submitError.password = '* Required';

        }
        //return this.state.error;
        if (Object.keys(submitError).length != 0) {
            throw new SubmissionError(submitError);
        }
        else {
            this.props.doLogin(loginData,function(){
                navigate('Dashboard');
            });
          
            
            //loginApi(this.loginData, navigation);
        }
    }

    renderInput({ input, label, type, placeholder, password, parse, placeholderTextColor, meta: { touched, error, warning } }) {
        var hasError = false;

        if (error !== undefined) {
            hasError = true;
        }
        return (
            <Item error={hasError} 
            style={{marginLeft:0}}
            >

                <Input {...input}
                    value={input.value}
                    placeholder={placeholder}
                    secureTextEntry={password}
                    //parse={parse}
                    placeholderTextColor = {placeholderTextColor}
                    style = {{color:'#fff'}}

                />
                {hasError ? <Text style={{ color: '#ed2f2f' }}>{error}</Text> : <Text />}
            </Item>
        )
    }
    render() {
        const { handleSubmit, reset, onSubmit, pristine, submitting } = this.props;
       
        if (!this.state.isReady) {
            //return <Expo.AppLoading />;
        }
        return (


            <View>
                {
                    this.props.postLoadingIndicator &&
                    <Loader /> 
                
                }
             <Form>
                <Field name="phone" component={this.renderInput} type="text" placeholder="Phone"   password={false}  placeholderTextColor="#fff" />
                <Field name="password" component={this.renderInput} placeholder="Password" type="Password" password={true} placeholderTextColor="#fff" />
                <Button type="submit" block primary onPress={this.props.handleSubmit(this.handleSubmit.bind(onSubmit))} style={styles.btn}>
                    <Text>Sign In</Text>
                </Button>
                </Form>
                {/*
                <Button transparent block style={{ margin: 15, }}
                    onPress={() => this.props.navigate("SignUp")}
                >
                    <Text style={{color:'#fff'}}> Sign Up </Text>
                </Button>
                */}
            </View>

        )
    }
}


const selector = formValueSelector('Login') // <-- same as form name



// This is the state of global app and not state of your Component
const mapStateToProps = (state) => {
    //console.log(state);
    //signupReducer
    const { userinfo } = state.loginReducer;
    const { postLoadingIndicator, logged_in_user_id, logged_in_user_info } = state.globalReducer;
    this.loginData = selector(state, 'phone', 'password');
        

    return {
        loginData,
        postLoadingIndicator,
      
    }

};

LoginFormTemplate = connect(mapStateToProps,
    { doLogin }
)(LoginFormTemplate)



export default reduxForm({
    form: 'Login',
    validate
})(LoginFormTemplate)


const styles = StyleSheet.create({

    btn: {
        alignSelf: 'stretch',
        backgroundColor: '#e67e22',
        padding: 20,
        alignItems: 'center',
        marginTop: 20
    },
    textInput:
        {
            alignSelf: 'stretch',

        },
});
