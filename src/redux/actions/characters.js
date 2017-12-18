import * as types from '../types/characters'
import { fetch, post, remove } from 'react_native_app/src/webservices/webservices'
import { Actions } from 'react-native-router-flux';

// Funcion que devuelve el action que actualiza
function updateCharactersList(value) {
    return {
        type: types.CHARACTERS_UPDATE_LIST,
        value: value
    }
}

function setCharactersFetching(value) {
    return {
        type: types.CHARACTERS_SET_FETCHING,
        value: value
    }
}

export function updateCharactersSelected(character) {
    return {
        type: types.CHARACTERS_UPDATE_CHARACTER,
        character: character
    }
}

export function fetchCharactersList(houseId) {
    return (dispatch, getState) => {

        // Se obtiene la casa seleccionada
        // Versión 1
        //const state = getState()
        //houseId = state.houses.item ? state.houses.item.id : null

        // Versión 2
        // Se recoge por parametros el valor de houseId

        dispatch(setCharactersFetching(true))

        // Se vacia el listado antes de entrar de nuevo para evitar mostrar errores
        dispatch(updateCharactersList([]))

        // Llamada al ws que descarga el listado de personajes a raiz de una casa
        const fetchURL = '/personajes?casa=' + houseId

        fetch(fetchURL)
            .then(response => {
                dispatch(setCharactersFetching(false))
                console.log("fetchCharactersList response: ", response)
                const list = response.records

                // Segunda llamada al dispatch es para devolver los datos recuperados 
                // al reducer
                dispatch(updateCharactersList(list))
            })
            .catch(error => {
                dispatch(setCharactersFetching(false))
                console.log("fetchCharactersList error: ", error)
            })
    }
}

export function deleteCharacter(character){
    return(dispatch, getState) => {

        dispatch(setCharactersFetching(true))

        const fetchURL = '/personajes/' + character.id

        const state = getState()
        const house = state.houses.item
        
        remove( fetchURL)
        .then(response => {

            dispatch(setCharactersFetching(false))
            console.log("fetchCharactersList response: ", response)

            if (response.status && response.status == 'ok') {

                // Se recarga el listado de personajes de la casa
                dispatch(fetchCharactersList(house.id))

                // Se elimina el personaje selecionado
                dispatch(updateCharactersSelected(null))

                // Se vuelve a la anterior lista
                Actions.pop()
            }
        })
        .catch(error => {
            dispatch(setCharactersFetching(false))
            console.log("fetchCharactersList error: ", error)
        })
    } 
}