import React, { Component } from "react";
import { Image, View, StatusBar } from "react-native";

import { Container, Button, H3, Text, Header, Title, Body, Left, Right } from "native-base";

import styles from "./styles";


class Home extends Component {


    render() {

        return (
            <Container>
                <StatusBar barStyle="light-content" />
                 
                 <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                 <View style={{marginBottom: 80 }}>
                     <Button 
                        style={{ backgroundColor: "#6FAF98", alignSelf: "center"}}
                        onPress= {() => this.props.navigation.navigate("DrawerOpen")}
                     >
                        <Text> Lets Go!</Text>
                     </Button>
                </View>
                </View>
            </Container>
        );
    }
}

export default Home;



