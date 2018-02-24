import React , { Component } from 'react';
import LoginFormTemplate from './LoginFormTemplate.js';





 export default class LoginForm extends Component{
    
  render(){
    
   
    return(
  
         <LoginFormTemplate navigate={this.props.navigate}/> 

    )
  }
}

