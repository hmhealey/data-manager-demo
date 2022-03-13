import {all, call, put, takeEvery} from 'redux-saga/effects';

import {batchThrottle} from './helpers';

const fetchCard = batchThrottle({
    incoming: 'FETCH_CARD',
    outgoing: 'DO_FETCH_CARD',
});

function* doFetchCard(action) {
    let names = action.batched.map((a) => a.name);
    names = Array.from(new Set(names));

    const identifiers = names.map((name) => ({name}));

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
