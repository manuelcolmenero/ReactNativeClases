import axios from 'axios'

export function fetchHousesList() {
    
    return new Promise(function(resolve, reject) {
        // Se obtiene el listado de casas de forma asincrona
        const fetchUrl = '/casas'
        axios.get(fetchUrl)        
        .then((response) => {
            console.log("axios get response: ", response);
            // Si existen datos deja pasar, pero si no hay datos devuelve array vacio
            const nuestraLista = response.data && response.data.records ? response.data.records : []
            resolve(nuestraLista)
        })
        .catch((error) => {
            console.log("axios get error: ", error);
            reject(error)
        });
    })
}