import {actionChannel, put, race, take} from 'redux-saga/effects';

export function wait(delay) {
    console.log('waiting... ', delay);
    return new Promise((resolve) => setTimeout(resolve, delay));
}

export function batchDebounce({incoming, outgoing, delay = 1000}) {
    return function* () {
        const incomingChannel = yield actionChannel(incoming);

        while (true) {
            const firstAction = yield take(incomingChannel);
            console.log('starting first batch');

            let batched = [firstAction];

            while (true) {
                const {action} = yield race({
                    delay: wait(delay),
                    action: take(incomingChannel),
                });

                if (action) {
                    console.log('adding fetch');
                    batched.push(action);
                } else {
                    break;
                }
            }

            console.log('doing fetch for batch');
            yield put({type: outgoing, batched});
        }
    };
}

export function batchThrottle({incoming, outgoing, delay = 1000}) {
    return function* () {
        console.log('fetchThing', incoming, outgoing);
        const incomingChannel = yield actionChannel(incoming);

        while (true) {
            const firstAction = yield take(incomingChannel);
            console.log('starting first batch');

            const timeout = wait(delay);

            let batched = [firstAction];

            while (true) {
                const {action} = yield race({
                    delay: timeout,
                    action: take(incomingChannel),
                });

                if (action) {
                    console.log('adding fetch');
                    batched.push(action);
                } else {
                    break;
                }
            }

            console.log('doing fetch for batch');
            yield put({type: outgoing, batched});
        }
    };
}
