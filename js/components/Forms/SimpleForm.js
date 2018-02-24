import React, { Component } from 'react';
//import Expo from 'expo';
import { View, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import { Container, Item, Input, Header, Body, Content, Title, Button, Text, Label, Form, Toast } from 'native-base';
import { Field, reduxForm, formValueSelector, getFormValues, isValid, SubmissionError } from 'redux-form';
import { connect } from "react-redux";
//import { signupApi } from './../../api/outh';
import Loader from './../Loader';

const validate = values => {
  const error = {};
  error.email = '';
  error.username = '';
  error.confirmPassword = '';
  let ema = values.email;
  let unm = values.username;
  let phn = values.phone;
  let pass = values.password;
  let conf = values.confirmPassword;

  if (values.email === undefined) {
    ema = '';
  }
  if (values.username === undefined) {
    unm = '';

  }
  if (values.phone === undefined) {
    phn = '';

  }
  if (values.password === undefined) {
    pass = '';

  }
  if (values.confirmPassword === undefined) {
    conf = '';

  }

  if (ema.length < 8 && ema !== '') {
    error.email = 'too short';
  }
  if (!ema.includes('@') && ema !== '') {
    error.email = '@ not included';
  }
  if (unm.length > 8) {
    error.username = 'max 8 characters';
  }
  if (phn != '') {

    if (!phonenumber(phn)) {
      error.phone = 'Invailid phone '
    }
  }
  if (pass.length < 6 && pass != '') {
    error.password = 'too short';
  }
  if (conf != '') {
    if (!passwordsMatch(pass, conf)) {
      error.confirmPassword = 'Password do not match';
    }
  }
  //return this.setState({error:error});
  return error;
};

const passwordsMatch = (password, confirmPassword) => {
  return password === confirmPassword;
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

  //console.log("inputtxt"+inputtxt)
  //console.log("result" ,inputtxt.match(phoneno));
  return inputtxt.match(phoneno) ? true : false;
  //

}
let navigate;
class SimpleForm extends Component {
  constructor(props) {
    super(props);
    navigate = props.navigate;
    this.state = {
      isReady: false,
      loading: false,
      error: {}
    };
    //this.handleSubmit = this.handleSubmit.bind(this)
    this.renderInput = this.renderInput.bind(this);
  }
  handleSubmit() {
  console.log(this.state);
    let submitError = {};

    if (this.signupData.username === undefined) {
      submitError.username = '* Required';

    }
    if (this.signupData.email === undefined) {
      // error.email = '* Required';
      submitError.email = '* Required';

    }
    if (this.signupData.phone === undefined) {
      submitError.phone = '* Required';

    }
    if (this.signupData.password === undefined) {
      submitError.password = '* Required';

    }
    if (this.signupData.confirmPassword === undefined) {
      submitError.confirmPassword = '* Required';

    }
    //return this.state.error;
    if (!Object.keys(submitError).length != 0) {
      throw new SubmissionError(submitError);
    }
    else {
        console.log("dsdas"+ this.isLoading)
      //this.state.isReady = true;
      //this.setState({ isReady: true });
     console.log(this.signupData);
      //signupApi(this.signupData,this.state);
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
              //this.props.navigation.navigate('Dashboard');
              
              navigate("Dashboard")

            }
            else {

              // alert(json.message);
              Toast.show({
                text: json.message,
                position: 'top',
                buttonText: 'Okay',
                type: 'danger'
              })
            }
          }
          else {

          }
          //let userInfo = json.responseData;
        })

        .catch(function (error) {
          console.log(error.message);
        })
    }
  }
  async componentWillMount() {
    /* 
    await Expo.Font.loadAsync({
       'Roboto': require('native-base/Fonts/Roboto.ttf'),
       'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
     });
     */
    this.setState({ isReady: true });
  }
  renderInput({ input, label, type, placeholder, password, parse, placeholderTextColor, meta: { touched, error, warning } }) {
    var hasError = false;

    if (error !== undefined) {
      hasError = true;
    }
    return (
      <Item error={hasError}>

        <Input {...input}
          value={input.value}
          placeholder={placeholder}
          secureTextEntry={password}
          parse={parse}
          placeholderTextColor={placeholderTextColor}
          style={{ color: '#fff' }}
        />
        {hasError ? <Text style={{ color: '#e74c3c' }}>{error}</Text> : <Text />}
      </Item>
    )
  }
  render() {
    const { handleSubmit, reset, onSubmit, pristine, submitting } = this.props;

    const content = <ActivityIndicator size="large" />;
    if (!this.state.isReady) {
      //return <Expo.AppLoading />;
    }
    return (

      <View>
        <Loader
          loading={this.state.loading} />
        <Form onsubmit={this.handleSubmit}>
        <Field name="username" component={this.renderInput} type="text" placeholder="User Name" password={false} placeholderTextColor="#fff" />
        <Field name="phone" component={this.renderInput} type="text" placeholder="Phone" format={phoneFormatter} parse={phoneParser} password={false} placeholderTextColor="#fff" />
        <Field name="email" component={this.renderInput} type="email" placeholder="Email" password={false} placeholderTextColor="#fff" />
        <Field name="password" component={this.renderInput} placeholder="Password" type="Password" password={true} placeholderTextColor="#fff" />
        <Field name="confirmPassword" component={this.renderInput} placeholder="Confirm Password" type="Password" password={true} placeholderTextColor="#fff" />
        <Field name="address" component={this.renderInput} placeholder="Address" type="text" placeholderTextColor="#fff" />
       
        <Button type="submit" block primary onPress={this.props.handleSubmit(this.handleSubmit.bind(onSubmit))} style={styles.btn}>
          <Text>Submit</Text>
        </Button>
        </Form>

        <Button transparent block style={{ margin: 15, }}
          onPress={() => this.props.navigate("Login")}
        >
          <Text style={{ color: '#fff' }}> Log In </Text>
        </Button>
      </View>

    )
  }
}


const selector = formValueSelector('Signup') // <-- same as form name
SimpleForm = connect(
  state => {
    // can select values individually
    this.signupData = selector(state, 'username', 'email', 'phone', 'password', 'confirmPassword', 'address');
   
   
    valid = isValid('Signup')(state);
    //console.log(valid);

    return {
      signupData,
     

    }
  }
)(SimpleForm)


export default reduxForm({
  form: 'Signup',
  validate,
  destroyOnUnmount: false
 
})(SimpleForm)

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

