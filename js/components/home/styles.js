const React = require("react-native");

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;


export default {

    imageContainer: {
        flex: 1,
        widht: null,
        height: null
    },
    logoContainer: {
        flex: 1,
        marginTop: deviceHeight / 8,
        marginBottom: 30
    },
    text: {
        color: "#D8D8D8D8",
        bottom: 6,
        marginTop: 5
    }
};