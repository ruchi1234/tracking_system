import React, { Component } from "react";

//import FooterTabs from "./components/footer";
import { 
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    Left,
    Right,
    Body,
    Text
}
from "native-base";

import styles from "./styles";

class Header1 extends Component {
    
    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Left/>
                    <Body>
                        <Title> Header </Title>
                    </Body>
                </Header>

                <Content padder>
                    <Button onPress={() => this.props.navigation.goBack()}>
                        <Text> Back </Text>
                    </Button>
                </Content>
                {/* 
                <FooterTabs />
                */}
            </Container>
        );
    }
}

export default Header1;