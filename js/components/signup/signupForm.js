import React , { Component } from 'react';
import SimpleForm from './SimpleForm.js';

 export default class SignUpForm extends Component{
  render(){
    return(
     
        <SimpleForm navigate={this.props.navigate} />
     
    )
  }
}