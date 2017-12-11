// Imports
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Class Screen2
export default class Screen2 extends Component {

    render() {
        return (
            <View>
                <Text>Link Start!</Text>
                <Text>{ this.props.texto }</Text>
                
            </View>
        )
    }
}