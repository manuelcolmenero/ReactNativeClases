import * as types from '../types/houses'
import { fetch, post } from 'react_native_app/src/webservices/webservices'

// Funcion que devuelve el action que actualiza
function updateHousesList(value) {
    return {
        type: types.HOUSES_UPDATE_LIST,
        value
    }
}

function setHousesFetching(value) {
    return {
        type: types.HOUSES_SET_FETCHING,
        value: value
    }
}

// Función para cargar el WS del listado
export function fetchHouseList() {
    return (dispatch, getState) => {

        dispatch(setHousesFetching(true))

        // Llamada al ws que descarga el listado de casas
        const fetchURL = '/casas'

        fetch(fetchURL).then(response => {
            dispatch(setHousesFetching(false))
            console.log("fetch response: ", response)
            const list = response.records

            // Segunda llamada al dispatch es para devolver los datos recuperados 
            // al reducer
            dispatch(updateHousesList(list))
        }).catch(error => {
            dispatch(setHousesFetching(false))
            console.log("error: ", error)
        })
    }
}

export function updateHouseSelected(value) {
    return {
        type: types.HOUSES_UPDATE_HOUSE,
        // Cuando se llaman igual el valor y la variable se puede poner sólo el nombre sin asignarlo
        value
    }
}