import React, { Component } from 'react';
import { Left, Right, Button, Icon, Body, Title, Content, Text, Form, Item, Label, List, ListItem, Radio, Input } from "native-base";
import { View, StyleSheet, TextInput } from "react-native";

export default class Leave extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          leaveReason : '',
        };
    }

    render() {
        return( 

            <View>
                <Form>
                    <Item>
                    
                        
                        <TextInput 
                            multiline = {true}
                            numberOfLines = {4}
                            editable = {true}
                            placeholder="Reamarks"
                            style={styles.remark}
                            onChangeText={(leaveReason) => this.setState({leaveReason})}
                            value={this.state.leaveReason}
                        />
                    </Item>
                    <Button block style={{ margin: 15, margin: 20 }}>
                        <Text> Submit </Text>
                    </Button>
                </Form>
            </View>
        );
    }
}

const styles= StyleSheet.create({
    remark: {
            borderWidth: 1,
            height: 100,
            width: "100%",
            paddingLeft: 5
    }
   
})