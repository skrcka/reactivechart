import React, {
    useState, useEffect,
} from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

const API_URL = 'http://127.0.0.1/server';

function App() {
    const [
        data,
        setData,
    ] = useState('data');

    useEffect(() => {
        axios.get(API_URL).then( result => {
            setData(result.data);
        });
    }, []);

    return (
        <div className='App'>
            <header className='App-header'>
                <img
                    src={logo}
                    className='App-logo'
                    alt='logo'
                />
                <p>
                    {data}
                </p>
                <a
                    className='App-link'
                    href='https://reactjs.org'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
