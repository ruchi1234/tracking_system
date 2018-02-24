import React, { Component } from "react";

import { Image, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { userLogout } from "./../../globalAction"


import {
    Content,
    Text,
    List,
    ListItem,
    Icon,
    Container,
    Left,
    Right,
    Badge,
    Button,
    View,
    StyleProvider,
    getTheme,
    variables,
    Body
} from "native-base";


import styles from "./style";

const datas = [


    {
        name: "Dashboard",
        route: "Dashboard",
        icon: "home",
        bg: "#477EEA",
        uniqueid: "001",

    },
    {
        name: "Header",
        route: "Header",
        icon: "phone-portrait",
        bg: "#477EEA",
        types: "8",
        uniqueid: "002",
    },
    {
        name: "Tracking",
        route: "Tracking",
        icon: "globe",
        bg: "#477EEA",
        uniqueid: "003",

    },
    {
        name: "Logout",
        route: "logout",
        icon: "log-out",
        bg: "#477EEA",

    }
];
//let navigation;
class SideBar extends Component {
    constructor(props) {
        super(props);
        //navigation = this.props.navigate;
        this.state = {
            shadowOffsetWidth: 1,
            shadowRadius: 4,
            isLoginUser: false,
            isLoggedinUser: false
        };

    }

    handleLogOut() {
        /*
        AsyncStorage.removeItem('user_id');
        AsyncStorage.removeItem('user_info');
        AsyncStorage.removeItem('user_id');
        alert("log out success fully");
        this.setState({'isLoginUser' : false });
        this.props.navigation.navigate("Login")
        */
        //this.props.userLogout();
        //navigate("Login");



    }
    componentWillReceiveProps() {
        this.setState({'isLoggedinUser': this.props.logged_in_user_id});
      
    }
    componentWillMount() {


        this._loadinitialState();

    }
    _loadinitialState = async () => {
        var value = await AsyncStorage.getItem('user_id')
        //alert(value);
        if (value != null) {
            this.setState({ 'isLoginUser': true });
            //this.props.navigation.navigate("Dashboard");
        }
        else {
            this.setState({ 'isLoginUser': false });
        }

    }

    render() {
        const { signedIn } = this.props;
        // alert(JSON.stringify(this.props))
        return (
            <Container>
                <Content bounces={false} style={{ flex: 1, backgroundColor: "#fff", top: 25 }} >
                    <List>
                        <ListItem icon button noBorder onPress={() => this.props.navigation.navigate("Dashboard")}>
                            <Left>
                                <Icon name="home" style={{ color: "#777", fontSize: 26, width: 30 }} />
                            </Left>
                            <Body>
                                <Text style={styles.text} >
                                    Dashboard
                                </Text>
                            </Body>
                        </ListItem>
                        {/*
                        <ListItem icon button noBorder onPress={() => this.props.navigation.navigate("Tracking")}>
                            <Left>
                                <Icon name="globe" style={{ color: "#777", fontSize: 26, width: 30 }} />
                            </Left>
                            <Body>
                                <Text style={styles.text} >
                                    Tracking
                                </Text>
                            </Body>
                        </ListItem>
                       */}
                            <ListItem icon button noBorder onPress={() => { this.props.navigation.navigate('Logout') }}>
                                <Left>
                                    <Icon name="log-out" style={{ color: "#777", fontSize: 26, width: 30 }} />
                                </Left>
                                <Body>
                                    <Text style={styles.text} >
                                        Logout
                                </Text>
                                </Body>
                            </ListItem>
                      

                    </List>
                </Content>
            </Container>
        );
    }

}

const mapStateToProps = (state) => {
    //console.log(state);
    //signupReducer

    const { logged_in_user_id, logged_in_user_info } = state.globalReducer;

    //console.log("logged_in_user_id"+ logged_in_user_id);
    return {
        logged_in_user_id,
        logged_in_user_info
    }

};
export default connect(mapStateToProps,
    { userLogout }
)(SideBar)

//export default SideBar;