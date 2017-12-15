// Imports
import React, { Component } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';
import {Colors} from 'react_native_app/src/commons'

/* ****************************************** */
// Componentes propios
import HousesList from 'react_native_app/src/sections/houses/HousesList'
import CharactersList from 'react_native_app/src/sections/characters/CharactersList'
/* ****************************************** */

import * as webservices from 'react_native_app/src/webservices/webservices'

/* ****************************************** */
// Imports de Redux
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'
import * as reducers from './redux/reducers' // Nuestros reducers

const reducer = combineReducers(reducers) // Combinamos nuestros reducers
const store = createStore( // Creamos el store con:
    reducer, // Nuestros reducer
    applyMiddleware(thunk) // Nuestro middleware
)
/* ****************************************** */


// Class Main
export default class App extends Component {

    componentWillMount() {
        webservices.configureAxios()
        StatusBar.setBarStyle('light-content')

    }

    render() {

        // Se elimina la caja de texto de alertas del emulador
        console.disableYellowBox = true;

        return (
            <Provider store={store} >
                <Router>
                    <Scene key="root">
                        <Scene
                            key={'HousesList'}
                            component={HousesList}
                            hideNavBar
                        />

                        <Scene
                            key={'CharactersList'}
                            component={CharactersList}
                            navigationBarStyle={styles.navBar}
                            navBarButtonColor={Colors.white}
                        />
                    </Scene>
                </Router>
            </Provider>
        );
    }
}

// Constantes de estilo
const styles = StyleSheet.create({
    navBar: {
        backgroundColor: Colors.navBarbackground,
    },
});