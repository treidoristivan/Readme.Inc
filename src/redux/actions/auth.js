import { APP_URL, Post, Get, Patch } from '../../config/config';

export const login = (data) => {
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

export const logout = (jwt) => {
    return {
        type: 'LOGOUT',
        payload: Get(APP_URL.concat('/logout'), jwt)
    }
}

export const changePhoto = (photo) => {
    return {
        type: 'CHANGE_PHOTO',
        photo,
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