import {
    actionChannel,
    all,
    put,
    race,
    take,
    takeEvery,
    takeLatest,
} from 'redux-saga/effects';

function wait(delay) {
    console.log('waiting... ', delay);
    return new Promise(resolve => setTimeout(resolve, delay));
}

// This debounces until it's been 1s since the last FETCH_THING before doing the fetching. I want to add a version
// that throttles, but first, I should do something async to simulate an actual fetch and make sure that we can
// handle a batch that's sent while a previous batch is processing. Blast processing.
function* fetchThing() {
    console.log('fetchThing');
    const fetchChannel = yield actionChannel('FETCH_THING');

    while (true) {
        yield take(fetchChannel);

        console.log('starting fetch batch');

        let concurrentFetches = 1;

        while (true) {
            
            console.log('looping...');
            const {anotherFetch} = yield race({
                delay: wait(1000),
                anotherFetch: take(fetchChannel),
            });

            if (anotherFetch) {
                console.log('adding fetch');
                concurrentFetches += 1;
            } else {
                break;
            }
        }

        console.log('fetched batch');
        yield put({type: 'FETCHED_THING', count: concurrentFetches});
    }
}

export function* rootSaga() {
    yield all([
        fetchThing(),
    ]);
}