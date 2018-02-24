import React, { Component } from 'react';
import { Container, Header, Left, Right, Button, Icon, Title, Body } from 'native-base';

import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { isSignedIn } from "./../../outh/";
import CustomHeader from "./../../components/Header/customHeader";
export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            signedIn: false,
            checkedSignIn: false
        };

    }
    componentWillMount() {
        isSignedIn()
            .then(res => {
                this.setState({ signedIn: res, checkedSignIn: true });
                this.props.signedIn = res;
            })
            .catch(err => alert("An error occurred"));
        // alert(this.state.signedIn);
    }
    render() {
        const { checkedSignIn, signedIn } = this.props;

        // alert(JSON.stringify(this.props))

        return (
            <Container>
                <CustomHeader navigate={this.props.navigation.navigate} />
                <View style={styles.container}>

                    <View style={styles.row}>

                        <Button
                            style={[styles.box, { backgroundColor: '#F44336' }]}
                            onPress={() => this.props.navigation.navigate("Attendance")}
                        >
                            <View style={styles.boxText}>
                                <Text style={styles.menuText}>
                                    Attendance
                                    </Text>
                            </View>
                        </Button>


                    </View>


                    {/*
                        <View style={styles.row}>
                            
                            <Button 
                                style={[styles.box,{ backgroundColor: '#F44336' }]}
                                onPress={() => this.props.navigation.navigate("Attendance")} 
                            >
                                <View style={styles.boxText}>
                                    <Text style={styles.menuText}>
                                        Attendance
                                    </Text>
                                </View>
                            </Button>
                            
                           
                            <Button
                                style={[styles.box,{ backgroundColor: '#E91E63' }]}
                                
                            >
                                <View style={styles.boxText}>
                                    <Text style={styles.menuText}>
                                        Visit
                            </Text>
                                </View>
                            </Button>
                            
                        </View>
                        
                        <View style={styles.row}>
                            <Button style={[styles.box,{ backgroundColor: '#9C27B0' }]}>
                                <View style={styles.boxText}>
                                    <Text style={styles.menuText}>
                                        Reports
                                    </Text>
                                </View>
                            </Button>
                            <Button style={[styles.box,{ backgroundColor: '#3F51B5' }]}>
                                <View style={styles.boxText}>
                                    <Text style={styles.menuText}>
                                        Notfication
                                    </Text>
                                </View>
                            </Button>

                        </View>
                    */}
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        /*flexDirection: 'column',*/
        backgroundColor: '#ecf0f1',
        paddingTop: 20
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        /* justifyContent: 'space-between', */
        marginBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,

        height: 100


    },
    box: {
        flex: 1,
        height: 100,
        margin: 5

    },
    boxText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    menuText: {
        color: '#fff'
    }

})