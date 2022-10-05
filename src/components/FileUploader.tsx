import React from 'react';

interface Props {
    handleFileUpload: (file: File) => void
}

const FileUploader = ({ handleFileUpload }: Props) => {
    const hiddenFileInput = React.useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if(hiddenFileInput.current) {
            hiddenFileInput.current.click();
        }
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files) {
            const fileUploaded = event.target.files[0];
            handleFileUpload(fileUploaded);
        }
    };

    return (
        <>
            <button
                data-testid='fileuploader-button'
                onClick={handleClick}
            >
                Upload a file
            </button>
            <input
                type="file"
                data-testid='fileuploader-field'
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: 'none' }}
            />
        </>
    );
};
export default FileUploader;
