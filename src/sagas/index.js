import {
    actionChannel,
    all,
    put,
    race,
    take,
    takeEvery,
} from 'redux-saga/effects';

function wait(delay) {
    console.log('waiting... ', delay);
    return new Promise((resolve) => setTimeout(resolve, delay));
}

// This debounces until it's been 1s since the last FETCH_THING before doing the fetching. I want to add a version
// that throttles, but first, I should do something async to simulate an actual fetch and make sure that we can
// handle a batch that's sent while a previous batch is processing. Blast processing.
function* fetchThing() {
    console.log('fetchThing');
    const fetchChannel = yield actionChannel('FETCH_THING');

    while (true) {
        const firstAction = yield take(fetchChannel);

        console.log('starting fetch batch');

        let batched = [firstAction];

        while (true) {
            console.log('looping...');
            const {action} = yield race({
                delay: wait(1000),
                action: take(fetchChannel),
            });

            if (action) {
                console.log('adding fetch');
                batched.push(action);
            } else {
                break;
            }
        }

        console.log('doing fetch for batch');
        yield put({type: 'DO_FETCH_THING', batched});
    }
}

function* doFetch(action) {
    console.log('fetching batch of ' + action.batched.length + '...');
    yield wait(2000);

    console.log('fetched batch of ' + action.batched.length);
    yield put({type: 'FETCHED_THING', count: action.batched.length});
}

export function* rootSaga() {
    yield all([fetchThing(), takeEvery('DO_FETCH_THING', doFetch)]);
}
