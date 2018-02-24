import React, { Component } from 'react';
import { View, StyleSheet, ScrollView , AsyncStorage} from 'react-native';
import { Text, Header, Button, Icon, Right, Left, Body, Title } from 'native-base';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import { Container } from 'native-base';
import CustomHeader from "./../../components/Header/customHeader";
import FooterTabs from "./../../components/footer";
import { connect } from 'react-redux';

class Tracking extends Component {


  constructor(props) {
    super(props);
    this.state = {

      isDisableStartTracking: false,
      isDisableStopTracking: false,
      'locationTrackerText': "Current Location Tracking Working",
      'isDisableStartColor' : '',
      'isDisableStopColor' :  '',

    }



  }
  componentWillMount() {


    this._loadupdatedState();



  }
  _loadupdatedState = async () => {
    var value = await AsyncStorage.getItem('today_attendance')
    let hasMarkedTracking  = await AsyncStorage.getItem('hasMarkedTracking');
    
    let localUnixTimeStamp = Math.round((new Date()).getTime() / 1000);


    if (value != null) {
      value = JSON.parse(value);

      let serverDate = this.timeConverter(value.present_date);
      let localDate = this.timeConverter(localUnixTimeStamp);

      if (serverDate == localDate) {
        
        if(hasMarkedTracking != null)
        {
          this.setState({ isDisableStartTracking: true,isDisableStopTracking: false, 'isDisableStartColor' : {backgroundColor : '#95a5a6'} , 'isDisableStopColor' : {backgroundColor : '#34495e'} });
        }
        else
        {
          this.setState({ isDisableStartTracking: false , isDisableStopTracking: true,  'isDisableStartColor' : {backgroundColor : '#34495e'} , 'isDisableStopColor' : {backgroundColor : '#95a5a6'} });
        }
        
        //this.setState({ isDisableStartTracking: true, 'isDisableStartColor' : {backgroundColor : '#95a5a6'} });
        //this.props.navigation.navigate("Tracking");
      }
      else {
        this.props.navigation.navigate("Attendance");
        //this.setState({ isDisableStopTracking: true });
      }
      //

    }
    else {
      this.setState({ isDisable: false });
      //this.props.navigation.navigate("Login");
    }

  }
  timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    //var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    var time = month + '-' + date + '-' + year;
    return time;
  }

  //componentDidMount() {
  startTracking() {


    BackgroundGeolocation.configure({
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 20,
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      debug: true,
      startOnBoot: false,
      stopOnTerminate: false,
      locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
      interval: 1000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      stopOnStillActivity: false,
      url: 'http://innorade.in/seller/location/?admin_user_id='+ this.props.logged_in_user_id,
      httpHeaders: {
        "Accept": 'application/json',
        "Content-Type": "application/json"
      },
      postTemplate: {
        lat: '@latitude',
        lon: '@longitude',
        admin_user_id: this.props.logged_in_user_id // you can also add your own properties
      }
    });

    this.setState({ isDisableStartTracking: true, isDisableStopTracking: false , isDisableStartColor : {backgroundColor : '#95a5a6'}, isDisableStopColor :  { backgroundColor : '#34495e'} });
    AsyncStorage.setItem("hasMarkedTracking", "1");
    
    

    BackgroundGeolocation.on('location', (location) => {
      console.log(location , this.props.logged_in_user_id);
      
      // handle your locations here
      // to perform long running operation on iOS
      // you need to create background task
      BackgroundGeolocation.startTask(taskKey => {
        // execute long running task
        // eg. ajax post location
        // IMPORTANT: task has to be ended by endTask
        BackgroundGeolocation.endTask(taskKey);
      });
    });

    BackgroundGeolocation.on('stationary', (stationaryLocation) => {
      // handle stationary locations here
      Actions.sendLocation(stationaryLocation);
    });

    BackgroundGeolocation.on('error', (error) => {
      console.log('[ERROR] BackgroundGeolocation error:', error);
    });

    BackgroundGeolocation.on('start', () => {
      console.log('[INFO] BackgroundGeolocation service has been started');
    });

    BackgroundGeolocation.on('stop', () => {
      console.log('[INFO] BackgroundGeolocation service has been stopped');
    });

    BackgroundGeolocation.on('authorization', (status) => {
      console.log('[INFO] BackgroundGeolocation authorization status: ' + status);
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        Alert.alert('Location services are disabled', 'Would you like to open location settings?', [
          { text: 'Yes', onPress: () => BackgroundGeolocation.showLocationSettings() },
          { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' }
        ]);
      }
    });

    BackgroundGeolocation.on('background', () => {
      console.log('[INFO] App is in background');
    });

    BackgroundGeolocation.on('foreground', () => {
      console.log('[INFO] App is in foreground');
    });

    BackgroundGeolocation.checkStatus(status => {
      console.log('[INFO] BackgroundGeolocation service is running', status.isRunning);
      console.log('[INFO] BackgroundGeolocation service has permissions', status.hasPermissions);
      console.log('[INFO] BackgroundGeolocation auth status: ' + status.authorization);

      // you don't need to check status before start (this is just the example)
     console.log("check status"+ status.isRunning);
      if (!status.isRunning) {
        BackgroundGeolocation.start(); //triggers start on start event
      }
    });

    // you can also just start without checking for status
    // BackgroundGeolocation.start();
    // }
  }
  stopTracking() {
    this.setState({ isDisableStartTracking: false, isDisableStopTracking: true,  isDisableStartColor : {backgroundColor : '#34495e'}, isDisableStopColor :  { backgroundColor : '#95a5a6'} });
    AsyncStorage.removeItem("hasMarkedTracking");
    BackgroundGeolocation.events.forEach(event => BackgroundGeolocation.removeAllListeners(event));
  }
  /*
  componentWillUnmount() {
    // unregister all event listeners
   
  }
  */
  sendOnServer() {
    fetch('http://innorade.in/seller/location/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue',
      })
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.message);
      })
  }

  render() {
    return (
      <Container>

        <CustomHeader navigate={this.props.navigation.navigate} />
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.container_body}>
              { /* <Text style={{ textAlign: 'center' }}> GPS LOCATION </Text> */}
              <View style={{ flexDirection: 'row' }}>
                <Button onPress={this.startTracking.bind(this)} style={[styles.tracking_btn,this.state.isDisableStartColor]} disabled={this.state.isDisableStartTracking}>
                  <Text>Start Tracking</Text>
                </Button>

                <Button onPress={this.stopTracking.bind(this)} style={[styles.tracking_btn,,this.state.isDisableStopColor]} disabled={this.state.isDisableStopTracking}>
                  <Text>Stop Tracking</Text>
                </Button>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text>{this.state.locationTrackerText}</Text>
              </View>
            </View>
          </View>
        </View>
        {/*
        <FooterTabs />
        */}
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
      logged_in_user_id,
      logged_in_user_info
    
  }

};

export default connect(mapStateToProps,
  {   }
)(Tracking)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 20,
    /* justifyContent: 'center', */

  },
  container_body: {
    flex: 1,
    /*justifyContent: 'center',*/
    /*alignItems: 'center'*/
  },
  tracking_btn: {
    backgroundColor: '#34495e',
    margin: 3
  }
})