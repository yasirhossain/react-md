import React, { useRef, useState } from 'react';
import '../styles/AdBuilder.scss';

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import ImageDropZone from '../components/DropZone';

const defaultSrc =
  'https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg';

function AdBuilder() {
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState('#');
  const [cropper, setCropper] = useState(null);
  const [cropperVisible, setCropperVisible] = useState(false);

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <div className="ad-builder">
      <h1>Create a Video Slate</h1>

      {!cropperVisible
        ? [<ImageDropZone key="step-1" />]
        : [
            <Cropper
              style={{ height: 400, width: '100%' }}
              zoomTo={0.5}
              initialAspectRatio={1}
              preview=".img-preview"
              src={image}
              viewMode={1}
              key="step-2"
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              onInitialized={(instance) => {
                setCropper(instance);
              }}
              guides={true}
            />,
          ]}
    </div>
  );
}

export default AdBuilder;
