import * as types from '../../constants/ActionTypes'
import ApiConstants from '../../api/ApiConstants'
import { put, takeLatest, call } from 'redux-saga/effects'
import API from '../../api'
import * as UserActions from './Users.Action'



function* requestGetUser(action) {
    const { onSuccess, onError } = action
    try {
        const response = yield call(API.get, ApiConstants.GET_GROUP(userId))        
        yield put(UserActions.setUserResponse(response))
        onSuccess(response)
    } catch (error) {
        onError(error)
    }
}

export function* watchUsers() {
    yield takeLatest(types.GET_GITHUB_USERS_REQUEST, requestGetUser)
}