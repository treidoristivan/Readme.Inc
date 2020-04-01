import axios from 'axios'

//This is For Online Server AWS

// export const APP_URL = "http://54.235.235.145:1000"
// export const APP_ICON_URL = "http://54.235.235.145:1000/icons/"
// export const APP_IMAGE_URL = "http://54.235.235.145:1000/images/"


//This is usage For Localhost Running with your IP Address

export const APP_URL = "http://10.10.10.4:1000"
export const APP_ICON_URL = "http://10.10.10.4:1000/icons/"
export const APP_IMAGE_URL = "http://10.10.10.4:1000/images/"

export const Get = (url, token = null, contentType = 'application/json') => {
    return new Promise((resolve, reject) => {
        axios.defaults.headers.Authorization = `Bearer ${token}`
        axios({
            method: 'get',
            baseURL: APP_URL,
            url: url,
            headers: {
                Accept: 'application/json',
                common: {
                    'Content-Type': contentType
                },
                Authorization: `Bearer ${token}`
            },
            responseType: 'json'
        })
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export const Post = (url, token = null, body, contentType = 'application/json') => {
    return new Promise((resolve, reject) => {
        axios.defaults.headers.Authorization = `Bearer ${token}`
        axios({
            method: 'post',
            baseURL: APP_URL,
            url: url,
            headers: {
                Accept: 'application/json',
                common: {
                    'Content-Type': contentType
                },
                Authorization: `Bearer ${token}`
            },
            data: body
        })
            .then(result => {
                console.log(result)
                resolve(result)
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
    })
}

export const Patch = (url, token = null, body, contentType = 'application/json') => {
    return new Promise((resolve, reject) => {
        axios.defaults.headers.Authorization = `Bearer ${token}`
        axios({
            method: 'patch',
            baseURL: APP_URL,
            url: url,
            headers: {
                Accept: 'application/json',
                common: {
                    'Content-Type': contentType
                },
                Authorization: `Bearer ${token}`
            },
            data: body
        })
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export const Delete = (url, token = null, body, contentType = 'application/json') => {
    return new Promise((resolve, reject) => {
        axios.defaults.headers.Authorization = `Bearer ${token}`
        axios({
            method: 'delete',
            baseURL: APP_URL,
            url: url,
            headers: {
                Accept: 'application/json',
                common: {
                    'Content-Type': contentType
                },
                Authorization: `Bearer ${token}`
            },
            data: body
        })
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(error)
            })
    })
}