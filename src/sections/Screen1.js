
// Imports
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';


// Class Screen1
export default class Screen1 extends Component {

    _goScreen2() {
        Actions.screen2({ texto: 'Join to Aincrad' })

    }

    render() {
        return (
            <View>
                <Text>Welcome Sword Art Online</Text>
                <Button
                onPress={() => this._goScreen2() }
                title='Start'
                />
            </View>
        )
    }
}