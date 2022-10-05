import React, {
    useState, useEffect,
} from 'react';
import axios from 'axios';
import './App.css';
import FileUploader from './components/FileUploader';


const DEBUG = true;
const API_URL = DEBUG ? 'http://127.0.0.1:5337' : 'http://127.0.0.1/server';

const REFRESH_TIMEOUT = 5;

interface RData {
    names: Array<string>
    vectors: Array<Array<number | string | boolean>>
}
interface Data {
    RData: RData
    File: boolean
    Func: string
}

function App() {
    const [
        data,
        setData,
    ] = useState<Data | null>(null);

    const [
        refreshTimeout,
        setRefreshTimeout,
    ] = useState<number | null>(null);

    // Server not available
    useEffect(() => {
        // Exit if no refresh required
        if(refreshTimeout === null){
            return;
        }
        if (DEBUG) {
            console.log(`refresh ${refreshTimeout}`);
        }
        if(refreshTimeout == 0){
            setRefreshTimeout(null);
            fetchData();
            return;
        }
        setTimeout(() => setRefreshTimeout(refreshTimeout - 1), 1000);
    }, [ refreshTimeout ]);

    const getFunction = (func: string) => {
        if (DEBUG) {
            console.log('getFunction');
        }
        axios
            .get(`${API_URL}/${func}`)
            .then(() => {
                setTimeout(fetchData);
            })
            .catch(err => {
                console.error(err);
            });
    };

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
                setRefreshTimeout(REFRESH_TIMEOUT);
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
        if (DEBUG) {
            console.log('initial useEffect');
        }
        fetchData();
    }, []);

    return (
        <div className='App'>
            <header className='App-header'>
                {data &&
                    <>
                        {!data.File &&
                            <>
                                <h2>Upload file</h2>
                                <FileUploader handleFileUpload={uploadFile}></FileUploader>
                            </>
                        }
                        {data.File &&
                            <>
                                {!data.Func &&
                                    <>
                                        <h2>Choose function</h2>
                                        <button onClick={() => getFunction('histogram')}>Histogram</button>
                                    </>
                                }
                                {data.Func &&
                                    <>
                                        <h2>Good</h2>
                                    </>
                                }
                            </>
                        }
                    </>
                }
                {!data &&
                    <>
                        <h2>Cannot establish connection to server. {refreshTimeout !== null ? `Retrying in ${refreshTimeout}...` : ''}</h2>
                    </>
                }
            </header>
        </div>
    );
}

export default App;
