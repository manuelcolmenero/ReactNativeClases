// Imports
import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { AsyncCalls, Colors } from 'react_native_app/src/commons'

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

       this.props.fetchHouseList()
    }

    onSelect(house) {
        
    }

    renderItem(item, index) {

        // Se devuelve la celda pasando primero los datos del componente padre al hijo
        // Se recibe un valor (Por ejemplo, nameHouse) y se lo pasa el onSelect de HousesCell 
        // Con los datos recibidos se llama a la función onSelect del padre (HousesList)
        return (
            <HousesCell
                item={item}
                onSelect={ (value) => this.onSelect(value)}
            />)
    }

    render() {
console.log("this.props: ", this.props)
        return (

            <View style={style.container}>

                <FlatList
                    data={this.props.list}
                    renderItem={({ item, index }) => this.renderItem(item, index)}
                    keyExtractor={(item, index) => item.id}
                    extraData={this.state}
                    numColumns={2}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("state.houses: ", state.houses)
    return {
        list: state.houses.list,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchHouseList: () => {
            dispatch(HousesActions.fetchHouseList())
        },
        updateSelected: () => {
            
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HousesList)

// Si se desea poner el color en HEX #434344
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(42,42,42)',
        paddingVertical: 20,
        
    },
})
