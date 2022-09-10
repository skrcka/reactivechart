import React, {
    useState, useEffect,
} from 'react';
import axios from 'axios';
import './App.css';
import FileUploader from './components/FileUploader';

const DEBUG = true;
const API_URL = DEBUG ? 'http://127.0.0.1:5337' : 'http://127.0.0.1/server';

interface Data {
    test: string
    file: boolean
}

function App() {
    const [
        data,
        setData,
    ] = useState<Data>();

    const fetchData = () => {
        if (DEBUG) {
            console.log('fetchData');
        }
        axios
            .get<Data | null>(API_URL)
            .then(res => {
                if(res.data) {
                    setData(res.data);
                }
            })
            .catch(err => {
                console.error(err);
            });
    };

    const uploadFile = (file: File) => {
        if (DEBUG) {
            console.log('uploadFile');
        }
        const formData = new FormData();
        formData.append('file', file);
        const headers = { 'Content-Type': 'multipart/form-data' };
        axios
            .post(`${API_URL}/upload`, formData, { headers })
            .then(() => {
                fetchData();
            })
            .catch(err => {
                console.error(err);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='App'>
            <header className='App-header'>
                {data &&
                    <>
                        {!data.file &&
                            <FileUploader handleFileUpload={uploadFile}></FileUploader>
                        }
                        <p>
                            {data.test}
                        </p>
                        <a
                            className='App-link'
                            href='https://reactjs.org'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            Learn React
                        </a>
                    </>
                }
            </header>
        </div>
    );
}

export default App;
