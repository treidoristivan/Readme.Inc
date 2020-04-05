import { APP_URL, Post, Get, Patch } from '../../config/config';

export const login = (data) => {
    console.log(data)
    console.log(APP_URL)
    return {
        type: 'LOGIN',
        payload: Post(APP_URL.concat('/auth/login'), null, data)
    }
}

export const verify = (data) => {
    console.log('verify', data)
    return {
        type: 'VERIFY',
        payload: Post(APP_URL.concat('/auth/verify'), null, data)
    }
}

export const register = (data) => {
    return {
        type: 'REGISTER',
        payload: Post(APP_URL.concat('/auth/register'), null, data)
    }
}

export const forgotPasswordRequest = (data) => {
    return {
        type: 'FORGOT_PASSWORD_REQUEST',
        payload: Post(APP_URL.concat('/auth/forgot-password'), null, data)
    }
}

export const forgotPasswordSuccess = (data) => {
    return {
        type: 'FORGOT_PASSWORD_SUCCESS',
        payload: Post(APP_URL.concat('/auth/forgot-password/success'), null, data)
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT',
    }
}

export const changePhoto = (jwt, formData) => {
    console.log('jwt', jwt)
    console.log('FORMdATA', formData)
    return {
        type: 'CHANGE_PHOTO',
        payload: Patch(APP_URL.concat('/users'), jwt, formData)
    }
}

export const getProfile = (jwt) => {
    return {
        type: 'GET_PROFILE',
        payload: Get(APP_URL.concat('/profile'), jwt)
    }
}

export const patchUser = (jwt, data) => {
    return {
        type: 'PATCH_USER',
        payload: Patch(APP_URL.concat('/password/reset'), jwt, data)
    }
}