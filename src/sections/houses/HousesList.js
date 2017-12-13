// Imports
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Button } from 'react-native';
import { AsyncCalls, Colors } from 'react_native_app/src/commons'

export default class HousesList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            list: [],
            selected: null,
        }
    }

    componentWillMount() {
        AsyncCalls.fetchHousesList()
        .then((response) => {
            console.log("Axios get response: ", response);

            // Si existen datos deja pasar, pero si no hay datos devuelve array vacio
            const listData = response.data && response.data.records ? response.data.records : []
            this.setState({ list: listData })

            // Forma corta de mover los datos
            // this.setState({
            //     list: response.data && response.data.records ? response.data.records : []
            // })
        })
        .catch((error) => {
            console.log("Axios get error: ", error);
        });

    }

    checkIsSelected(item) {
        if (this.state.selected && (this.state.selected.id == item.id)) {
            return true
        } else {
            return false

        }
    }

    renderItem(item, index) {
        const isSelected = this.checkIsSelected(item) 

        const cellStyle = isSelected ? { backgroundColor: 'gold' } : { backgroundColor: Colors.white }
        const titleStyle = isSelected ? { color: 'red' } : { color: 'black' }
        const colorStyle = isSelected ? 'grey' : 'black'
        return (
            
            <View style={[style.cell, cellStyle]}>
                <Image
                    style={{ width: 50, height: 50 }}
                    source={{ uri: item.image_dir }}
                />
                <Text style={[style.textCell, titleStyle]}>Name: {item.nombre} </Text>
                <Text style={[style.textCell, titleStyle]}>Words: {item.lema} </Text>

                <Button
                    title={'Selecciona casa'}
                    onPress={() => this.setState({ selected: item })}
                    color={colorStyle}
                />
            </View>
        )
    }

    render() {
        const nombre = this.state.selected ? this.state.selected.nombre : ''
        return (

            <View>
                <Text style={style.title}> {nombre}</Text>

                <FlatList
                    data={this.state.list}
                    renderItem={({ item, index }) => this.renderItem(item, index)}
                    keyExtractor={(item,key)=> item.id}
                    extraData={ this.state}
                />
            </View>
        )
    }
}

const style = StyleSheet.create({
    cell: {
        // height: 100, 
        // marginVertical: 10
        height: 150,
        backgroundColor: Colors.white,
        margin: 5,
        padding: 15,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    title: {
        fontSize: 20, 
        textAlign: 'center', 
        marginVertical: 20,
    },
    textCell: {
        fontSize: 14, 
        textAlign: 'center', 
    }
})