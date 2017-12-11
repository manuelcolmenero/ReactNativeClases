/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {

  // Primera llamada del ciclo de vida
  constructor(props) {
    super(props)

    this.state = {
      title: 'Welcome Sword Art Online',
      texto: 'Cargando...'
    }

  }

  /*
  Segunda llamada del ciclo de vida
  Se ejecuta antes de invocar a render (Aun no existen los componentes)
  */
  componentWillMount() {

  }

  // Se ejecuta antes de actualizar las propiedades o el estado del componente
  componentWillUpdate(nextProps, nextState) {

  }

  // Se ejecuta despues de actualizar las propiedades o el estado del componente
  componentDidUpdate(prevProps, prevState) {

  }

  // Se ejecuta al destruir un componente
  componentWillUnmount() {

  }

  // Tercera llamada del ciclo de vida y obligatorio que exista
  render() {

    console.log('Render this.state: ', this.state)

    return (

      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.state.title}
        </Text>
      </View>
    );
  }

  /*
Cuarta llamada del ciclo de vida que se ejecuta despues tener mapeados
los diferentes objetos
*/
  componentDidMount() {
    setTimeout(() => {
      this.setState({ title: 'Link Start!', texto: 'Cargado.' })
    }, 2000)
  }
}



// Constantes de aplicación
const ColorAppWhite = '#F7F7F7';


// Constantes de estilo
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorAppWhite,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
