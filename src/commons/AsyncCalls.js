import axios from 'axios'

export function fetchHousesList() {
    // Se obtiene el listado de casas de forma asincrona
    const URL = '/casas'
    return axios.get(URL)

}