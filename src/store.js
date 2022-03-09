import {applyMiddleware, combineReducers, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas';

export function configureStore() {
    const sagaMiddleware = createSagaMiddleware();

    const reducer = combineReducers({
        fetchCount,
        batchCount,
    });

    const store = createStore(
        reducer,
        applyMiddleware(sagaMiddleware),
    );

    sagaMiddleware.run(rootSaga);

    return store;
}

function fetchCount(state = 0, action) {
    switch(action.type) {
        case 'FETCHED_THING':
            console.log('FETCHED_THING', state, action.count, state + action.count);
            return state + action.count;

        default:
            return state;
    }
}

function batchCount(state = 0, action) {
    switch(action.type) {
        case 'FETCHED_THING':
            return state +1;
        
        default:
            return state;
    }
}