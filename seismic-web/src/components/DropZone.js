import React, { useCallback, useMemo, useState } from 'react';
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
  const setCropperVisible = props.setCropperVisible;
  const images = props.images;
  const setImages = props.setImages;

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        // console.log(binaryStr);
        setCropperVisible(true);
      };

      setImages([
        ...images,
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ]);

      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ onDrop, accept: { 'image/*': [] } });

  const style = useMemo(
    () => ({
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  //const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps({ style })} className="drag-n-drop">
      <input {...getInputProps()} />
      {isDragReject
        ? [<p key="error">Please select an image.</p>]
        : [
            <p key="default">
              Click to select or simply drag and drop an image
            </p>,
          ]}
    </div>
  );
}

export default ImageDropZone;
