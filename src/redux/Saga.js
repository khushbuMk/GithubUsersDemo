import * as types from './ActionTypes'
import { put, takeLatest, call } from 'redux-saga/effects'
import API from '../redux'


function* requestGetUser(action) {
    const { onSuccess, onError } = action
    try {
    //     const user = yield call(Api.fetchUser, action.payload.userId);
    //    yield put({type: "USER_FETCH_SUCCEEDED", user: user});
        const api = 'https://docs.github.com/en/rest/reference/users#list-users'
        const response = yield call(API.get, api)        
        // yield put(UserActions.setUserResponse(response))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

export function* watchUsers() {
    yield takeLatest(types.GET_GITHUB_USERS_REQUEST, requestGetUser)
}