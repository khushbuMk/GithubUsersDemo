import * as types from '../redux/ActionTypes'

export const requestGetUser = (onSuccess, onError) => ({
    type: types.GET_GITHUB_USERS_REQUEST,
    onSuccess,
    onError
})

export const setUserResponse = (data) => ({
    type: types.GET_GITHUB_USERS_RESPONSE,
    data
})