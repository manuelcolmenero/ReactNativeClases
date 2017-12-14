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
        return AsyncCalls.fetchHousesList().then(response => {
            this.setState({ list: response })
        })

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
                    keyExtractor={(item, key) => item.id}
                    extraData={this.state}
                />
            </View>
        )
    }
}

