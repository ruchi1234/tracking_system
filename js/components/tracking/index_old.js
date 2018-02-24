import React, { Component } from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { Button } from 'native-base';
import BackgroundGeolocation from "react-native-background-geolocation";
import { Container } from 'native-base';
import CustomHeader from "./../../components/Header/customHeader";
let currentLocation = 'fgfgfg';
export default class Tracking extends Component {


  constructor(props){
    super(props);
    this.state = {
      currentLocation: 'my default location'
    }
    

  }
 
 
  componentWillMount() {
    ////
    // 1.  Wire up event-listeners
    //

    // This handler fires whenever bgGeo receives a location update.
    BackgroundGeolocation.on('location', this.onLocation, this.onError);

    // This handler fires when movement states changes (stationary->moving; moving->stationary)
    BackgroundGeolocation.on('motionchange', this.onMotionChange);

    // This event fires when a change in motion activity is detected
    BackgroundGeolocation.on('activitychange', this.onActivityChange);

    // This event fires when the user toggles location-services authorization
    BackgroundGeolocation.on('providerchange', this.onProviderChange);

    ////
    // 2.  #configure the plugin (just once for life-time of app)
    //
    console.log(BackgroundGeolocation);
    BackgroundGeolocation.configure({
      // Geolocation Config
      desiredAccuracy: 0,
      //distanceFilter: 10,
      locationUpdateInterval: 100,
      // Activity Recognition
      stopTimeout: 1,
      // Application config
      debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
      // HTTP / SQLite config
      url: 'http://innorade.in/seller/location/',
      batchSync: false,       // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
      autoSync: true,         // <-- [Default: true] Set true to sync each location to server as it arrives.
      headers: {              // <-- Optional HTTP headers
        "Accept": 'application/json',
        "Content-Type": "application/json"
      },
      params: {               // <-- Optional HTTP params
        "auth_token": "hello"
      }
    }, (state) => {
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);

      if (!state.enabled) {
        ////
        // 3. Start tracking!
        //
        BackgroundGeolocation.start(function() {
          console.log("- Start success");
        });
      }
    });
  }

  // You must remove listeners when your component unmounts
  
  componentWillUnmount() {
    // Remove BackgroundGeolocation listeners
    BackgroundGeolocation.un('location', this.onLocation);
    BackgroundGeolocation.un('motionchange', this.onMotionChange);
    BackgroundGeolocation.un('activitychange', this.onActivityChange);
    BackgroundGeolocation.un('providerchange', this.onProviderChange);

    // Or just remove them all-at-once
    BackgroundGeolocation.removeListeners();
  }
  
  onLocation(location) {
    
    //this.setUserLocation(location)
    //alert("location is fired" + location );
    console.log('- [event] location: ', location);
   
  }
  onError(error) {
    console.warn('- [event] location error ', error);
  }
  onActivityChange(activity) {
    console.log('- [event] activitychange: ', activity);  // eg: 'on_foot', 'still', 'in_vehicle'
  }
  onProviderChange(provider) {
    console.log('- [event] providerchange: ', provider);    
  }
  onMotionChange(location) {
   
    
   //currentLocation = "testing"+ location.isMoving;
    
    console.log('- [event] motionchange: ', location.isMoving, location);
  }
  
  classApi()
  {
    

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
    .then(function(response){
      console.log(response);
    })
    .catch(function(error) {
      console.log(error.message);
    })
  }
  
  render() {
      return (
          <Container>
              <CustomHeader />
             
              <Text> GPS LOCATION : { this.location }</Text>
             <Button onPress = { this.classApi.bind(this)} full>
                  <Text>Click me</Text>
             </Button>
          </Container>
         
      )
  }
}