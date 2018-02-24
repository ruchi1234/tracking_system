import React, { Component } from "react";
import { Container, Header, Left, Right, Button, Icon, Body, Title, Content, Text, Form, Item, Label, List, ListItem, Radio, Input } from "native-base";

import { ScrollView, View, StyleSheet, AsyncStorage } from "react-native";

import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import FooterTabs from "./../../components/footer";
import Present from "./../../components/present";
import Leave from "./../../components/Leave";
import CustomHeader from "./../../components/Header/customHeader";
import { attendanceAction } from './actions';
import { connect } from "react-redux";

var radio_props = [
    { label: 'param1', value: 0 },
    { label: 'param2', value: 1 }
];



class Attendance extends Component {


    constructor(props) {
        super(props);
        this.state = {
            presentView: 'false',
            leaveView: 'false',
        };
       // props.attendanceAction();
        console.log(props.navigation.dispatch);
    }
    componentWillMount() {


        this._loadupdatedState();
        
    }
    _loadupdatedState = async () => {
        var value = await AsyncStorage.getItem('today_attendance')
        let localUnixTimeStamp = Math.round((new Date()).getTime() / 1000);
       
        
        if (value != null) {
            value = JSON.parse(value);
           
            let serverDate = this.timeConverter(value.present_date);
            let localDate = this.timeConverter(localUnixTimeStamp);
            
            if(serverDate==localDate)
            {
                this.setState({ isDisable : false });
                this.props.navigation.navigate("Tracking");
            }
            else
            {
                this.setState({ isDisable : false });
            }
            //
            
        }
        else {
            this.setState({ isDisable : false });
            //this.props.navigation.navigate("Login");
        }

    }
    timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        //var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        var time =  month + '-' + date + '-'  + year;
        return time;
    }

    render() {
        const { navigate } = this.props.navigation;
        return (

            <Container>
                <CustomHeader navigate={this.props.navigation.navigate} />
                <ScrollView style={styles.container}>

                    <View style={styles.row}>
                        <View style={styles.box}>
                            <Button style={{ backgroundColor: '#34495e', flex: 1 }} onPress={() => this.setState({ presentView: true, leaveView: false })} disabled={this.state.isDisable} >
                                <Text> Present </Text>
                            </Button>
                        </View>

                        <View style={styles.box}>
                            <Button style={{ backgroundColor: '#34495e', flex: 1 }} onPress={() => this.setState({ leaveView: true, presentView: false })} disabled={this.state.isDisable} >
                                <Text> Leave </Text>
                            </Button>
                        </View>
                    </View>


                    {
                        this.state.presentView == true ? <Present navigate={navigate} /> : null


                    }

                    {
                        this.state.leaveView == true ? <Leave navigate={navigate} /> : null


                    }





                </ScrollView>
                <FooterTabs />
            </Container>
        )
    }
}
// This is the state of global app and not state of your Component
const mapStateToProps = (state) => {
   
   
    const { postLoadingIndicator, logged_in_user_id, logged_in_user_info } = state.globalReducer;
    
    return {
       // attendanceData,
        postLoadingIndicator,
      
    }

};

export default connect(mapStateToProps,
    {attendanceAction}
)(Attendance)



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        padding: 20
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    box: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20

    },

})