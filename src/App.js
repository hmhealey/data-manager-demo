import {useState} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import logo from './logo.svg';

import {configureStore} from './store';

import './App.css';

function App() {
    const [store] = useState(configureStore());
    return (
        <Provider store={store}>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
            <FetchButton />
        </Provider>
    );
}

function FetchButton() {
    const dispatch = useDispatch();
    const fetchCount = useSelector((state) => state.fetchCount);
    const batchCount = useSelector((state) => state.batchCount);

    console.log('FETCHBUTTON');
    return (
        <>
            <button
                onClick={() => {
                    console.log('clicky');
                    dispatch({type: 'FETCH_THING'});
                }}
            >
                {'Fetch thing'}
            </button>
            <p>{`You fetched ${fetchCount} things in ${batchCount} requests.`}</p>
        </>
    );
}

export default App;
