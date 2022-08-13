import React, { useEffect, useState } from 'react';
import '../styles/AdBuilder.scss';

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import ImageDropZone from '../components/DropZone';

import Button from '@mui/material/Button';

const defaultSrc =
  'https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg';

function AdBuilder() {
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState(null);
  const [cropper, setCropper] = useState(null);
  const [cropperVisible, setCropperVisible] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    //console.log(images);
    images[0] && setImage(images[0].preview);
  }, [images]);

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

  // Upload cropped image to server if the browser supports `HTMLCanvasElement.toBlob`.
  // The default value for the second parameter of `toBlob` is 'image/png', change it if necessary.
  /*
  cropper.getCroppedCanvas().toBlob((blob) => {
    const formData = new FormData();

    // Pass the image file name as the third parameter if necessary.
    formData.append('croppedImage', blob, 'example.png');

    // Use `jQuery.ajax` method for example
    /*
    $.ajax('/path/to/upload', {
      method: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success() {
        console.log('Upload success');
      },
      error() {
        console.log('Upload error');
      },
    });
  }, 'image/png');
  */

  const Move = (e) => {
    e.preventDefault();
    console.log('move mode');
    cropper.setDragMode('move');
  };

  const Crop = (e) => {
    e.preventDefault();
    console.log('crop mode');
    cropper.setDragMode('crop');
  };

  const Rotate = (val) => {
    //e.preventDefault();
    console.log('rotate mode');
    console.log(val);
    cropper.rotate(val);
  };

  const getCropData = (e) => {
    e.preventDefault();
    console.log('cropped data');
    setImage(cropper.getCroppedCanvas().toDataURL());
    setCropData(null);
  };

  return (
    <div className="ad-builder">
      <h1>Create a Video Slate</h1>

      {!cropperVisible
        ? [
            <ImageDropZone
              key="step-1"
              setCropperVisible={setCropperVisible}
              images={images}
              setImages={setImages}
            />,
          ]
        : [
            <div className="image-cropper" key="step-2">
              <Cropper
                aspectRatio={16 / 9}
                style={{ height: 600, width: '100%' }}
                zoomTo={0.5}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={true}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                onInitialized={(instance) => {
                  setCropper(instance);
                }}
                guides={true}
              />
              <div className="button-container">
                <div className="left">
                  <Button className="btn btn-primary" onClick={Move}>
                    Move
                  </Button>
                  <Button className="btn btn-primary" onClick={Crop}>
                    Crop
                  </Button>
                  <Button
                    className="btn btn-primary"
                    onClick={() => Rotate(-90)}
                  >
                    Rotate Left
                  </Button>
                  <Button
                    className="btn btn-primary"
                    onClick={() => Rotate(90)}
                  >
                    Rotate Right
                  </Button>
                </div>
                <div className="right">
                  {cropData
                    ? [
                        <Button className="btn btn-primary" onClick={Crop}>
                          Edit
                        </Button>,
                      ]
                    : [
                        <Button
                          className="btn btn-primary"
                          onClick={getCropData}
                        >
                          Select
                        </Button>,
                      ]}
                </div>
              </div>
            </div>,
          ]}
    </div>
  );
}

export default AdBuilder;
