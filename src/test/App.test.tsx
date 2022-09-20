import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import App from '../App';
import {
    render, fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


describe('App Component Testing', () => {
    it('Learn more gets rendered', () => {
        const app = render(<App />);
        const link = app.getByRole('link');
        expect(link.textContent).toEqual('Learn React');
    });
});
