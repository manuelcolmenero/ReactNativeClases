// Imports
import React, { Component } from 'react'
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native'
import { connect } from  'react-redux'

import { Button } from 'react_native_app/src/widgets'
import { Colors } from 'react_native_app/src/commons'
import * as CharactersActions from 'react_native_app/src/redux/actions/characters'

class CharacterView extends Component {
    // Propiedades por defecto para prevenir errores y documentar el componente
    static defaultProps = {
        character: {},
    }

    onSubmit() {

    }

    onDelete(character){
        this.props.deleteCharacter(character)

    }

    render() {
        const { character } = this.props
        const nombre = character ? character.nombre : ''
        const edad   = character ? character.edad : ''
        const image  = character && character.image_dir ? { uri: character.image_dir } : require('react_native_app/src/resources/placeholder.png')

        return (
            <View style={styles.container}>

                <Image source={image} style={styles.image} resizeMode={'cover'} /> 
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{ nombre }</Text>
                    <Text style={styles.edad}>{ 'Edad: ' + edad }</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <Button label={'Eliminar'} onPress={ () => this.onSubmit(character) } isFetching={this.props.isFetching} />
                </View>

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        character: state.characters.item,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        // Se descarga el listado de personajes asociados a una casa
        deleteCharacter: (character) => {

            // Si existe character realiza el dispatch
            character && dispatch(CharactersActions.deleteCharacter(character))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterView)

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: Colors.containerBackground,
    },

    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },

    name: {
        flex: 1,
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
    },

    edad: {
        fontSize: 16,
        color: 'white',
    },

    image: {
        width: '100%',
        height: 200,
    },

    buttonContainer: {
        margin: 20,
    },
});