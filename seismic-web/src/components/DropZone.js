import React, { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

const focusedStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

function ImageDropZone(props) {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ accept: { 'image/*': [] } });

  const style = useMemo(
    () => ({
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const onDragEnter = () => {
    console.log('on drag enter');
  };

  const onDragLeave = () => {
    console.log('on drag leave');
  };

  const onDragOver = () => {
    console.log('on drag over');
  };

  // const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps({ style })} className="drag-n-drop">
      <input {...getInputProps()} />
      <p>Drag 'n' drop or click to select an image</p>
    </div>
  );
}

export default ImageDropZone;
