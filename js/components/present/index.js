import React, { Component } from 'react';
import { Left, Right, Button, Icon, Body, Title, Content, Text, Form, Item, Label, List, ListItem, Radio, Input } from "native-base";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { attendanceApi } from './../../api/response';
import { connect } from "react-redux";
import { markPresent } from './action';
import Loader from './../Loader';
let navigation;
 class Present extends Component {

    constructor(props) {
        super(props);
        navigation = props.navigate;
       
        this.state = {
            present: true,
            remarks: '',
            fieldWork: true,
            officeWork: false,
            cityArea: true,
            tourArea: false,
            publicTransport: true,
            privateTransport: false
        }
    }

    markAttendance() {
       // console.log("save  current state", this.state);
        //console.log(this.state);
      
        let presentInfo  = {
            user_id: this.state.user_id,
            present: this.state.present,
            fieldWork: this.state.fieldWork,
            officeWork: this.state.officeWork,
            cityArea: this.state.cityArea,
            tourArea: this.state.tourArea,
            publicTransport: this.state.publicTransport,
            privateTransport: this.state.privateTransport,

        }
        /*
        attendanceApi(presentInfo, function(){
            navigation('Tracking');
        });
        */
       this.props.markPresent(presentInfo,function(){
         navigation('Tracking');
       });
       
      
    }
    componentWillMount() {
        
        
        this._loadinitialState();
        console.log("after value");
    }
    _loadinitialState = async () => {
        var value = await AsyncStorage.getItem('user_id')
       
        if(value != null)
        {
            //this.props.navigation.navigate("Dashboard");
            this.setState({ user_id: value });
        }
        else
        {
            this.props.navigation.navigate("Login");
        }

    }


    render() {
        return (

            <View style={styles.presentForm}>
            {
                this.props.postLoadingIndicator &&
                <Loader
             />}
                    <Item style={styles.fieldHeader}>
                        <Label style={styles.fieldLabel}>
                            What you will be doing today?
                         </Label>
                    </Item>
                    <List>
                        <ListItem
                            onPress={() => this.setState({ fieldWork: true, officeWork: false })}
                        >
                            <Left>
                                <Text>Field Work</Text>
                            </Left>
                            <Right>
                                <Radio
                                    selected={this.state.fieldWork}
                                    onPress={() => this.setState({ fieldWork: true, officeWork: false })}
                                />
                            </Right>
                        </ListItem>
                        <ListItem
                            onPress={() => this.setState({ fieldWork: false, officeWork: true })}
                        >
                            <Left>
                                <Text>Office Sitting</Text>
                            </Left>
                            <Right>
                                <Radio
                                    selected={this.state.officeWork}
                                    onPress={() => this.setState({ fieldWork: false, officeWork: true })}
                                />
                            </Right>
                        </ListItem>
                    </List>
                    <Item style={styles.fieldHeader}>
                        <Label style={styles.fieldLabel}>
                            Working Area
                                        </Label>
                    </Item>
                    <List>
                        <ListItem
                            onPress={() => this.setState({ cityArea: true, tourArea: false })}
                        >
                            <Left>
                                <Text>Home City</Text>
                            </Left>
                            <Right>
                                <Radio
                                    selected={this.state.cityArea}
                                    onPress={() => this.setState({ cityArea: true, tourArea: false })}
                                />
                            </Right>
                        </ListItem>
                        <ListItem
                            onPress={() => this.setState({ cityArea: false, tourArea: true })}
                        >
                            <Left>
                                <Text>Tour</Text>
                            </Left>
                            <Right>
                                <Radio
                                    selected={this.state.tourArea}
                                    onPress={() => this.setState({ cityArea: false, tourArea: true })}
                                />
                            </Right>
                        </ListItem>
                    </List>
                    <Item style={styles.fieldHeader}>
                        <Label style={styles.fieldLabel}>
                            Travelling Mode
                                        </Label>
                    </Item>
                    <List>
                        <ListItem
                            onPress={() => this.setState({ privateTransport: true, publicTransport: false })}
                        >
                            <Left>
                                <Text>Private</Text>
                            </Left>
                            <Right>
                                <Radio
                                    selected={this.state.privateTransport}
                                    onPress={() => this.setState({ privateTransport: true, publicTransport: false })}
                                />
                            </Right>
                        </ListItem>
                        <ListItem
                            onPress={() => this.setState({ privateTransport: false, publicTransport: true })}
                        >
                            <Left>
                                <Text>Public</Text>
                            </Left>
                            <Right>
                                <Radio
                                    selected={this.state.publicTransport}
                                    onPress={() => this.setState({ privateTransport: fasle, publicTransport: true })}
                                />
                            </Right>
                        </ListItem>
                    </List>
                    <Item style={styles.fieldHeader}>
                        <Input
                            placeholder="Reamarks"
                            value={this.state.remarks}
                            onChangeText={(remarks) => this.setState({ remarks })}
                            style={{ borderBottomWidth: 0.5, borderColor:'#c9c9c9'}}
                        />
                    </Item>
                    <Button block style={{ margin: 15, margin: 20,backgroundColor: '#34495e' }} onPress={this.markAttendance.bind(this)}>
                        <Text> Submit </Text>
                    </Button>
               
            </View>
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
    {  markPresent }
)(Present)

const styles = StyleSheet.create({
    presentForm :{
        marginTop: 10,
        backgroundColor: '#fff',
        borderColor:'#bdc3c7',
        borderWidth: 0.5
    },
    fieldHeader:
    {
        marginTop: 10,
        borderBottomWidth: 0,
        marginLeft: 18,
        
    },
    fieldLabel: { 
        fontSize: 15,
        fontWeight: 'bold'
    }
})