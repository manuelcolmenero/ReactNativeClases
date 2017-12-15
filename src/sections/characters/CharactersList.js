// Imports
import React, { Component } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { AsyncCalls, Colors } from 'react_native_app/src/commons'
import { connect } from 'react-redux';

class CharactersList extends Component {

    render() {
        return (
            <View style={styles.container}>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // Se optiene por medio de props la casa (que es el item)
        house: state.houses.item,

    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        // Se descarga el listado de personajes asociados a una casa
        fetchCharactersList: () => {

        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList)

// Si se desea poner el color en HEX #434344
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.containerBackground,

    },
})