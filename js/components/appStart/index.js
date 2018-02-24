import React, { Component } from "react";
import { Image, View, StatusBar, ActivityIndicator } from "react-native";
import { Container, Button, H3, Text, Header, Title, Body, Left, Right } from "native-base";
import styles from "./styles";
import { validateIsLogin } from './../../globalAction';
import { connect } from 'react-redux';


class StartApp extends Component {
	// eslint-disable-line
    constructor(props)
    {
        super(props);

       props.validateIsLogin(function(response){
          props.navigation.navigate(response);
        })
        
    }
    componentDidMount(){
        
    }
	render() {
		return (
			<Container style={styles.container}>
				<StatusBar barStyle="light-content" />
				<View style={styles.imageContainer}>
					<View style={styles.logoContainer}>
                            {this.props.isValidateLogin &&
                            <ActivityIndicator animating size="large" />
                            }
					</View>
				</View>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
    
    const { internetStatus, isValidateLogin ,logged_in_user_id } = state.globalReducer;
    return {
       
        internetStatus,
        isValidateLogin,
        logged_in_user_id
      }

}
export default  connect(mapStateToProps,{validateIsLogin})(StartApp);

