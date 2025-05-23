import { combineReducers, createStore, applyMiddleware, compose  } from 'redux';
import { listReducer } from './Reducer';

const rootReducer = combineReducers({ 
        gitHub : listReducer 
    });

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;