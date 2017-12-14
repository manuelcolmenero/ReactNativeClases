// Imports
import React, { Component } from 'react';
import { Platform, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

export default class HousesCell extends Component {

    // Propiedades por defecto para prevenir errores y documentar el componente
    static defaultProps = {
        onSelect: () => { },
        item: {},
    }

    render() {
        // Declaración de variables 
        const { item, onSelect } = this.props

        // Se valida que exista imagen, de no existir se devuelve error
        const image = item.image_dir ? { uri: item.image_dir } : null

        return (
            <TouchableOpacity style={style.containerStyle} onPress={() => onSelect(item)} >
                <Image source={image} style={style.imageStyle} resizeMode={'contain'} />
            </TouchableOpacity>

        )
    }
}

const style = StyleSheet.create({
    containerStyle: {
        margin: 10,
        width: Dimensions.get('window').width / 2 - 20, //857/600
        height: (Dimensions.get('window').width / 2 - 20) * (857 / 600),

        ...Platform.select({
            ios: {
                shadowColor: 'rgba(255,255,255,0.1)',
                shadowOpacity: 1,
                shadowOffset: { height: 4, width: 4 },
                shadowRadius: 2,
            },
            android: {
                elevation: 4,
            },
        })
    },

    imageStyle: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    }
})  