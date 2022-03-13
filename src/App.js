import {useState} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';

import {CardLoader} from './card_loader';
import {configureStore} from './store';

import './App.css';

function App() {
    const [store] = useState(configureStore());
    return (
        <Provider store={store}>
            <div className="App">
                {/* <FetchButton /> */}
                <CardLoader />
            </div>
        </Provider>
    );
}

function FetchButton() {
    const dispatch = useDispatch();
    const fetchCount = useSelector((state) => state.fetchCount);
    const batchCount = useSelector((state) => state.batchCount);

    return (
        <>
            <button onClick={() => dispatch({type: 'FETCH_THING'})}>
                {'Fetch thing'}
            </button>
            <p>{`You fetched ${fetchCount} things in ${batchCount} requests.`}</p>
        </>
    );
}

export default App;
