import { all } from 'redux-saga/effects'
import { watchUsers } from './Saga'

function* rootSaga() {
    yield all([
        watchUsers()
    ])
}

export default rootSaga