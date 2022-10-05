import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import App from '../App';
import {
    render, fireEvent, waitFor,
} from '@testing-library/react';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('App Component Testing', () => {
    it('Cannot esttablish connection to server', async () => {
        mockedAxios.get.mockResolvedValue({ });
        const app = render(<App />);
        await waitFor(() => {
            const h2 = app.getByTestId('app-step-title');
            expect(h2.textContent).toContain('Cannot establish connection to server.');
        });
    });

    it('File not uploaded', async () => {
        mockedAxios.get.mockResolvedValue({ data: {
            'RData': {
                'Names': [],
                'Vectors': [],
            },
            'File': false,
            'Func': '',
        } });
        const app = render(<App />);
        await waitFor(() => {
            const h2 = app.getByTestId('app-step-title');
            expect(h2.textContent).toEqual('Upload a file');

            const fileUploadButton = app.getByTestId('fileuploader-button');
            expect(fileUploadButton.textContent).toEqual('Upload a file');
            const fileUploadHiddenInput = app.getByTestId('fileuploader-field');
            expect(fileUploadHiddenInput.style.display).toEqual('none');
        });
    });

    it('Function not chosen', async () => {
        mockedAxios.get.mockResolvedValue({ data: {
            'RData': {
                'Names': [],
                'Vectors': [],
            },
            'File': true,
            'Func': '',
        } });
        const app = render(<App />);
        await waitFor(() => {
            const h2 = app.getByTestId('app-step-title');
            expect(h2.textContent).toEqual('Choose a function');

            const functionHistButton = app.getByTestId('app-step-func-hist');
            expect(functionHistButton.textContent).toEqual('Histogram');
        });
    });

    it('Finished graph', async () => {
        mockedAxios.get.mockResolvedValue({ data: {
            'RData': {
                'Names': [
                    'breaks',
                    'counts',
                    'density',
                    'mids',
                    'xname',
                    'equidist',
                ],
                'Vectors': [
                    [
                        0,
                        20,
                        40,
                        60,
                        80,
                        100,
                        120,
                        140,
                        160,
                        180,
                        200,
                        220,
                        240,
                        260,
                    ],
                    [
                        5551,
                        19886,
                        23349,
                        20451,
                        5961,
                        7332,
                        10163,
                        30921,
                        2676,
                        592,
                        472,
                        243,
                        67,
                    ],
                    [
                        0.0021740662990349666,
                        0.007788413335004386,
                        0.009144707983456573,
                        0.008009697330492543,
                        0.00233464406567239,
                        0.0028716004511843587,
                        0.003980370347161298,
                        0.012110305176087228,
                        0.0010480636671262064,
                        0.00023185862890086478,
                        0.0001848602581777165,
                        9.517170071437524E-05,
                        2.6240756987091113E-05,
                    ],
                    [
                        10,
                        30,
                        50,
                        70,
                        90,
                        110,
                        130,
                        150,
                        170,
                        190,
                        210,
                        230,
                        250,
                    ],
                    [ 'grayScaled' ],
                    [ true ],
                ],
            },
            'File': true,
            'Func': 'histogram',
        } });
        const app = render(<App />);
        await waitFor(() => {
            const h2 = app.getByTestId('app-step-title');
            expect(h2.textContent).toEqual('Good');
        });
    });
});
