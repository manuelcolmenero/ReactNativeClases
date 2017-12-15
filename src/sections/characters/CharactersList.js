// Imports
import React, { Component } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { AsyncCalls, Colors } from 'react_native_app/src/commons'

import CharactersCell from 'react_native_app/src/sections/characters/CharactersCell'

// Redux
import { connect } from 'react-redux'
import * as CharactersActions from 'react_native_app/src/redux/actions/characters'

class CharactersList extends Component {

    componentWillMount() {
        const houseId = this.props.house ? this.props.house.id : null
        // Se invoca la función que obtendrá los datos
        this.props.fetchCharactersList(houseId)
    }

    renderFooter() {
        // Siempre se devuelve indicador de carga que sólo se pinta si isFetching = TRUE
        return <ActivityIndicator
            animating={this.props.isFetching}
            size='large'
            color={Colors.white}
            style={{ marginVertical: 20 }}
        />
    }

    onSelect(character) {
        // Pretende actualizar que casa está marcada al pulsar
        this.props.updateSelected(character)
    }

    renderItem(item, index){
        return (
            <CharactersCell
                item={item}
                onSelect={(character) => this.onSelect(character)}
            />)
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data                = { this.props.list }
                    renderItem          = { ({ item, index }) => this.renderItem(item, index)}
                    keyExtractor        = { (item, index) => item.id}
                    extraData           = { this.state }
                    /*
                    numColumns          = { 2 }
                    ListFooterComponent = {
                        () => this.renderFooter()
                    }
                    */
                /> 
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // Se optiene por medio de props la casa (que es el item)
        house: state.houses.item,
        list: state.characters.list,

    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        // Se descarga el listado de personajes asociados a una casa
        fetchCharactersList: (houseId) => {
            dispatch(CharactersActions.fetchCharactersList(houseId))
        },
        updateSelected: (character) => {
            console.log("mapDispatchToProps updateSelected character: ", character)
        },
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