import * as types from './ActionTypes'

export const requestGetUser = (onSuccess, onError) => ({
    type: types.GET_GITHUB_USERS_REQUEST,
    onSuccess,
    onError
})

export const setUserResponse = (data) => ({
    type: types.GET_GITHUB_USERS_RESPONSE,
    data
})

export const setBookmarkUserResponse = (data) => ({
    type: types.BOOKMARK_USERS,
    data
})