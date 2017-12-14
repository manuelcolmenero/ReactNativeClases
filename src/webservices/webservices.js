import axios from 'axios'
import * as constants from './constants'

export function configureAxios() {
    axios.defaults.baseURL = constants.BASE_URL;
    //axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
}

export function fetch(url) {
    return new Promise(function(resolve, reject) {

        axios.get(url).then( response => {

            if(response.data)
                resolve( response.data )
            else 
                reject( response )

        }).catch( error => {
            reject( error )
        });
    })
}

export function fetchAlternativo(url) {
    return axios.get(url).then((response) => {

        return response.data

    }).catch((error) => {

        // if (error.response) {
        //     throw { code: error.response.status, msg: error.response.data, error: error }
        // } else {
        //     throw { code: 500, msg: error.message, error: error }
        // }

        throw error

    });
}

export function post(url, data) {
    return new Promise(function(resolve, reject) {

        axios.post(url, data).then( response => {

            if(response.data)
                resolve( response.data )
            else 
                reject( response )

        }).catch( error => {
            reject( error )
        });
    })
}

export function postAlternativo (url, data) {
    return axios.post(url, data).then( response => {
        return response.data
    }).catch( error => {
        throw error
    })
}