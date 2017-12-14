// Imports
import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { AsyncCalls, Colors } from 'react_native_app/src/commons'
import { fetch } from 'react_native_app/src/webservices/webservices'
import HousesCell from 'react_native_app/src/sections/houses/HousesCell'

export default class HousesList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            list: [],
            selected: null,
        }
    }

    componentWillMount() {
        fetch('/casas').then(response => {
            console.log("fetch response: ", response)
            this.setState({ list: response.records })
        }).catch(error => {
            console.log("error: ", error)
        })
    }

    onSelect(house) {
        // Pone en la variable de estado el nombre recibido
        this.setState({ selected: house })
    }

    renderItem(item, index) {

        // Se devuelve la celda pasando primero los datos del componente padre al hijo
        // Se recibe un valor (Por ejemplo, nameHouse) y se lo pasa el onSelect de HousesCell 
        // Con los datos recibidos se llama a la función onSelect del padre (HousesList)
        return (
            <HousesCell
                item={item}
                // Se elimina el llamador y se informan datos por defecto en la celda para 
                // evitar que genere errores
                // onSelect={(nameHouse) => this.onSelect(nameHouse)}
            />)
    }

    render() {

        return (

            <View style={style.container}>

                <FlatList
                    data={this.state.list}
                    renderItem={({ item, index }) => this.renderItem(item, index)}
                    keyExtractor={(item, index) => item.id}
                    extraData={this.state}
                    numColumns={2}
                />
            </View>
        )
    }
}
// Si se desea poner el color en HEX #434344
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(42,42,42)',
        paddingVertical: 20,
        
    },
})
