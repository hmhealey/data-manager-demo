import {all, call, put, takeEvery} from 'redux-saga/effects';
import {batchDebounce, batchThrottle, wait} from './helpers';

// This debounces until it's been 1s since the last FETCH_THING before doing the fetching. I want to add a version
// that throttles, but first, I should do something async to simulate an actual fetch and make sure that we can
// handle a batch that's sent while a previous batch is processing. Blast processing.
const fetchThing = batchThrottle({
    incoming: 'FETCH_THING',
    outgoing: 'DO_FETCH_THING',
});

function* doFetch(action) {
    console.log('fetching batch of ' + action.batched.length + '...');
    yield wait(2000);

    console.log('fetched batch of ' + action.batched.length);
    yield put({type: 'FETCHED_THING', count: action.batched.length});
}

export function* rootSaga() {
    yield all([fetchThing(), takeEvery('DO_FETCH_THING', doFetch)]);
}
