// Imports
import React, { Component } from 'react';
import { Platform, View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

export default class CharactersCell extends Component {

    // Propiedades por defecto para prevenir errores y documentar el componente
    static defaultProps = {
        item: {},
        onSelect: () => { },
    }

    render() {
        // Declaración de variables 
        const { item, onSelect } = this.props

        // Se validan los datos a pintar
        const name = item.nombre ? item.nombre : ''
        const age = item.edad ? item.edad : ''
        const image = item.image_dir ? { uri: item.image_dir } : require('react_native_app/src/resources/placeholder.png')

        return (
            <TouchableOpacity onPress={() => onSelect(item)} >
                <Image source={image} style={styles.imageStyle} resizeMode={'cover'} />
                <View style={styles.containerStyle}>
                    <Text style={styles.nameStyle}> {name}</Text>
                    <Text style={styles.ageStyle}> {age} años</Text>
                </View>
            </TouchableOpacity>

        )
    }
}

const styles = StyleSheet.create({

    imageStyle: {
        width: '100%',
        height: 200,
    },

    containerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left:0,
        backgroundColor: 'rgba(255,255,255,0.2)',

        ...Platform.select({
            ios: {
                shadowColor: 'rgba(255,255,255,0.2)',
                shadowOpacity: 1,
                shadowOffset: { height: 4, width: 4 },
                shadowRadius: 2,
            },
            android: {
                elevation: 4,
            },
        })
    },
    nameStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    ageStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'transparent',
    },
}) 