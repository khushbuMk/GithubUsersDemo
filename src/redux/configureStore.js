import { combineReducers, createStore, applyMiddleware, compose  } from 'redux';
import { listReducer } from './Reducer';
import rootSaga from './rootSaga';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { createNetworkMiddleware } from 'react-native-offline'

const rootReducer = combineReducers({ 
        gitHub : listReducer 
    });

const mainRootReducer = (state, action) => {
    return rootReducer(state, action);
}

// const configureStore = (rootReducer, rootsaga) =>{
//     /* --------------Redux Configuration ---------------- */
//     const middleware = []
//     const enhancers = []

//     /* --------------Network Middleware -------------------*/
//     const networkMiddleware = createNetworkMiddleware({
//         queueReleaseThrottle: 200,
//     })
//     middleware.push(networkMiddleware)

//     /* --------------Saga Middleware----------------*/
//     const sagaMiddleware = createSagaMiddleware()
//     middleware.push(sagaMiddleware)

//     /* --------------Logger Middleware---------------- */
//     if (__DEV__){
//         middleware.push(createLogger())
//     }

//     /* --------------Assemble Middleware--------------- */
//     enhancers.push(applyMiddleware(...middleware))

//     /* --------------- AutoRehydrate Enhancer -------------- */
//     const initialState = {};
//     const store = createStore(rootReducer, initialState, compose(...enhancers))
//     sagaMiddleware.run(rootsaga)

//     return store
// }

// const createReduxStore = () => {
//     return configureStore(mainRootReducer,rootSaga)
// }

// const store = createReduxStore()

// export default store


const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;