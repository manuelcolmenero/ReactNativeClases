// Imports
import React, { Component } from 'react';
import { View, Text, FlatList, Image, Button } from 'react-native';
import axios from 'axios'

export default class HousesList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            list: [],
            selected: null,
        }
    }

    componentWillMount() {

        // Se obtiene el listado de casas de forma asincrona
        axios.get('http://146.185.137.85/got/web/casas')
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

    renderItem(item) {
        return (
            <View style={{
                height: 150,
                backgroundColor: '#F7F7F7',
                margin: 5,
                padding: 15,
                shadowColor: '#000000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 1,
            }}>
                <Image
                    style={{ width: 50, height: 50 }}
                    source={{ uri: item.image_dir }}
                />
                <Text>Name: {item.nombre} </Text>
                <Text>Words: {item.lema} </Text>

                <Button
                    title={'Selecciona casa'}
                    onPress={() => this.setState({ selected: item })}
                />
            </View>
        )
    }

    render() {
        const nombre = this.state.selected ? this.state.selected.nombre : ''
        return (

            <View>
                <Text style={{fontSize:20, textAlign: 'center', marginVertical: 20}}> { nombre }</Text>

                <FlatList
                    data={this.state.list}
                    renderItem={({ item }) => this.renderItem(item)}
                />
            </View>
        )
    }
}