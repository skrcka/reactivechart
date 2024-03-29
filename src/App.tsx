import React, {
    useState, useEffect,
} from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';

import { Data } from './Data';
import FileUploader from './components/FileUploader';
import Histogram from './components/Histogram';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const DEBUG = true;
const API_URL = DEBUG ? 'http://127.0.0.1:5337' : 'http://127.0.0.1/server';

const REFRESH_TIMEOUT = 5;


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

    const reset = () => {
        if (DEBUG) {
            console.log('reset');
        }
        axios
            .get(`${API_URL}/reset`)
            .then(() => {
                setTimeout(fetchData);
            })
            .catch(err => {
                console.error(err);
            });
    };

    const resetfn = () => {
        if (DEBUG) {
            console.log('resetfn');
        }
        axios
            .get(`${API_URL}/resetfn`)
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
                    console.log(res.data);
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
                <div className='container-lg'>
                    {data &&
                    <>
                        {!data.File &&
                            <>
                                <h2 data-testid='app-step-title'>Upload a file</h2>
                                <FileUploader
                                    handleFileUpload={uploadFile}
                                    targetResizeHeight={480}
                                ></FileUploader>
                            </>
                        }
                        {data.File &&
                            <>
                                {!data.Func &&
                                    <>
                                        <h2 data-testid='app-step-title'>Choose a function</h2>
                                        <Button
                                            data-testid='app-step-func-hist'
                                            onClick={() => getFunction('histogram')}
                                            color="primary"
                                            className='m-1'
                                        >
                                            Histogram
                                        </Button>
                                        <Button
                                            data-testid='app-step-func-reset'
                                            onClick={() => reset()}
                                            color="danger"
                                            className='m-1'
                                        >
                                            Reset
                                        </Button>
                                    </>
                                }
                                {data.Func &&
                                    <>
                                        <h2 data-testid='app-step-title'>Function: {data.Func}</h2>
                                        {data.Func === 'histogram' &&
                                            <Histogram data={data.RData} />
                                        }
                                        <Button
                                            data-testid='app-step-func-back'
                                            onClick={() => resetfn()}
                                            color="warning"
                                            className='m-1'
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            data-testid='app-step-func-reset'
                                            onClick={() => reset()}
                                            color="danger"
                                            className='m-1'
                                        >
                                            Reset
                                        </Button>
                                    </>
                                }
                            </>
                        }
                    </>
                    }
                    {!data &&
                    <>
                        <h2 data-testid='app-step-title'>
                            Cannot establish connection to server. {refreshTimeout !== null ? `Retrying in ${refreshTimeout}...` : ''}
                        </h2>
                    </>
                    }
                </div>
            </header>
        </div>
    );
}

export default App;
