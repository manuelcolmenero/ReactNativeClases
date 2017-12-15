import * as types from '../types/houses'
import { fetch, post } from 'react_native_app/src/webservices/webservices'

// Funcion que devuelve el action que actualiza
function updateHousesList(value) {
    return {
        type: types.HOUSES_UPDATE_LIST,
        value
    }
}

// Función para cargar el WS del listado
export function fetchHouseList() { 
    return (dispatch, getState) => {

        // Llamada al ws que descarga el listado de casas
        const fetchURL = '/casas'

        fetch(fetchURL).then(response => {
            console.log("fetch response: ", response)
            const list = response.records

            // Segunda llamada al dispatch es para devolver los datos recuperados 
            // al reducer
            dispatch(updateHousesList(list))
        }).catch(error => {
            console.log("error: ", error)
        })

        
    }
}