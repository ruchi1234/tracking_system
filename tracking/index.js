import React, { Component } from 'react';
import { Alert } from 'react-native';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';

export default class BgTracking extends Component {
  
  
   

  static myfunction()
  {
      //alert('hello');
      BackgroundGeolocation.start();
  }
}

