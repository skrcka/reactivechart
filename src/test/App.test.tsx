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
    it('Learn more gets rendered', async () => {
        mockedAxios.get.mockResolvedValue({ data: { 'test': 'Mocked value' } });
        const app = render(<App />);
        const link = app.getByRole('link');
        expect(link.textContent).toEqual('Learn React');
        await waitFor(() => {
            const data = app.getByTestId('data');
            expect(data.textContent).toEqual('Mocked value');
        });
    });
});
