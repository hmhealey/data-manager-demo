import {all, call, put, takeEvery} from 'redux-saga/effects';

import {batchThrottle} from './helpers';

const fetchCard = batchThrottle({
    incoming: 'FETCH_CARD',
    outgoing: 'DO_FETCH_CARD',
});

function* doFetchCard(action) {
    const identifiers = action.batched.map((a) => ({name: a.name}));
    console.log('fetching', identifiers);

    const response = yield call(async () => {
        const response = await fetch(
            'https://api.scryfall.com/cards/collection',
            {
                body: JSON.stringify({identifiers}),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            },
        );

        return response.json();
    });

    console.log('received cards', response.data);
    yield put({type: 'RECEIVED_CARDS', cards: response.data});
}

export default function* cardsSaga() {
    yield all([fetchCard(), takeEvery('DO_FETCH_CARD', doFetchCard)]);
}
