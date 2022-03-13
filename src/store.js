import {composeWithDevTools} from '@redux-devtools/extension';
import {applyMiddleware, combineReducers, createStore} from 'redux';

import createSagaMiddleware from 'redux-saga';
import {rootSaga} from './sagas';

export function configureStore() {
    const sagaMiddleware = createSagaMiddleware();

    const reducer = combineReducers({
        batchCount,
        cardsByName,
        fetchCount,
    });

    const store = createStore(
        reducer,
        composeWithDevTools({})(applyMiddleware(sagaMiddleware)),
    );

    sagaMiddleware.run(rootSaga);

    window.store = store;

    return store;
}

function fetchCount(state = 0, action) {
    switch (action.type) {
        case 'FETCHED_THING':
            console.log(
                'FETCHED_THING',
                state,
                action.count,
                state + action.count,
            );
            return state + action.count;

        default:
            return state;
    }
}

function batchCount(state = 0, action) {
    switch (action.type) {
        case 'FETCHED_THING':
            return state + 1;

        default:
            return state;
    }
}

function cardsByName(state = {}, action) {
    switch (action.type) {
        case 'RECEIVED_CARDS':
            console.log('received cards in store', action);
            return action.cards.reduce(
                (nextState, card) => ({
                    ...nextState,
                    [card.name]: card,
                }),
                state,
            );

        default:
            return state;
    }
}
