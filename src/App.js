// Imports
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';

import HousesList from 'react_native_app/src/sections/houses/HousesList'

// Class Main
export default class App extends Component {

  render() {
    return (
      <Router>
        <Scene key="root">

          <Scene
            key={ 'HousesList' }
            component={ HousesList }
          />
          </Scene>
      </Router>
    );
  }
}

// Constantes de estilo
const styles = StyleSheet.create({

});
