import React from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

const API_URL = 'HTTP://192.168.137.180:5337';

function App() {
    return (
        <div className='App'>
            <header className='App-header'>
                <img
                    src={logo}
                    className='App-logo'
                    alt='logo'
                />
                <p>
                    Helloo xd
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
