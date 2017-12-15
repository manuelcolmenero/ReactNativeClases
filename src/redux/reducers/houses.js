import * as types from '../types/houses'


const initialState = {
    isFetching: false,
    list: [],
    item: null,
}

// Se devuelve desde el action las propiedades (Type y Value) para ser tratados por el reducer
export default function reducer(state = initialState, action = {}) {

    switch (action.type) {

        // Se pregunta por el Type recibido del action
        case types.HOUSES_UPDATE_LIST:
            return {
                // Cuando coincide el Type hace una copia del estado actual
                // es decir, devuelve el state recibido
                ...state,
                // Se sustituye la propiedad list con el valor recibido del action
                // antes de devolverla al reducer
                list: action.value
            }
        case types.HOUSES_UPDATE_HOUSE:
            return {
                ...state,

                item: action.value
            }
        case types.HOUSES_SET_FETCHING:
            return {
                ...state,
                isFetching: action.value
            }
        default:
            return state;
    }
}