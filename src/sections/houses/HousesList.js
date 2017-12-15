// Imports
import React, { Component } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { AsyncCalls, Colors } from 'react_native_app/src/commons'
import { Actions } from 'react-native-router-flux'

import HousesCell from 'react_native_app/src/sections/houses/HousesCell'

// Redux
import { connect } from 'react-redux'
import * as HousesActions from 'react_native_app/src/redux/actions/houses'

class HousesList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            list: [],
            selected: null,
        }
    }

    componentWillMount() {
        // Se invoca la función que obtendrá los datos
        this.props.fetchHouseList()
    }

    onSelect(house) {
        // Pretende actualizar que casa está marcada al pulsar
        this.props.updateSelected(house)
    }

    renderFooter() {
        // Siempre se devuelve indicador de carga que sólo se pinta si isFetching = TRUE
        return <ActivityIndicator
            animating={this.props.isFetching}
            size='large'
            color='#00FFFF'
            style={{ marginVertical: 20 }}
        />

        /* 
        ********************** 
        Este código no se ejecuta dado que el return anterior no permite que continue
        Se implementa el código para ver otra forma de como hacerlo
        ********************** 
        */
        // Otra forma de hacer lo mismo que la linea anterior
        if (this.props.isFetching) {
            return (
                <View>
                    <ActivityIndicator
                        animating={this.props.isFetching}
                        size='large'
                        color='#00FFFF'
                        style={{ marginVertical: 20 }}
                    />
                </View>
            )

        } else {
            return null
        }
    }

    renderItem(item, index) {

        // Se devuelve la celda pasando primero los datos del componente padre al hijo
        // Se recibe un valor (Por ejemplo, nameHouse) y se lo pasa el onSelect de HousesCell 
        // Con los datos recibidos se llama a la función onSelect del padre (HousesList)
        return (
            <HousesCell
                item={item}
                onSelect={(value) => this.onSelect(value)}
            />)
    }

    render() {
        console.log("this.props: ", this.props)
        return (

            <View style={styles.container}>

                <FlatList
                    data={this.props.list}
                    renderItem={({ item, index }) => this.renderItem(item, index)}
                    keyExtractor={(item, index) => item.id}
                    extraData={this.state}
                    numColumns={2}
                    ListFooterComponent={
                        () => this.renderFooter()
                    }

                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // Se guarda de forma global el listado que posee el estado de la aplicación
        list: state.houses.list,

        /*         
        // Se indica cual es la casa que se tiene seleccionada
        selected: state.houses.item, 
        */

        // Se recupera la propiedad isFetching del global
        isFetching: state.houses.isFetching,

    }
}


const mapDispatchToProps = (dispatch, props) => {
    return {
        // Se declara una función con un dispatch de la action de obtener datos
        fetchHouseList: () => {
            dispatch(HousesActions.fetchHouseList())
        },
        updateSelected: (house) => {
            dispatch(HousesActions.updateHouseSelected(house))
            // Se llama a la siguiente pantalla para el listado de personajes
            // Pone el nombre de House seleccionada como titulo de la pantalla
            Actions.CharactersList({ title: house.nombre })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HousesList)

// Si se desea poner el color en HEX #434344
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.containerBackground,
        paddingBottom: 20,
        paddingTop: 60,

    },
})
