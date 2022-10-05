import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import FileUploader from '../../components/FileUploader';
import {
    render, fireEvent, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


jest.mock('axios');
// eslint-disable-next-line @typescript-eslint/no-empty-function
const uselessFn = (file: File) => { };

describe('FileUploader Component Testing', () => {
    it('FileUploader contains everything', async () => {
        const fileUploader = render(<FileUploader handleFileUpload={uselessFn} />);
        await waitFor(() => {
            const fileUploadButton = fileUploader.getByTestId('fileuploader-button');
            expect(fileUploadButton.textContent).toEqual('Upload a file');
            const fileUploadHiddenInput = fileUploader.getByTestId('fileuploader-field');
            expect(fileUploadHiddenInput.style.display).toEqual('none');
        });
    });
});
