import React, { useRef, useState } from 'react';
import '../styles/AdBuilder.scss';

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

function AdBuilder() {
  const cropperRef = useRef < HTMLImageElement > null;

  const onCrop = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    console.log(cropper.getCroppedCanvas().toDataURL());
  };

  return (
    <div className="ad-builder">
      <h1>Create a Video Slate</h1>
      <div className="drag-n-drop"></div>
    </div>
  );
}

export default AdBuilder;
