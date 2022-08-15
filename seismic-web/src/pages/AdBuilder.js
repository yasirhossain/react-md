import React, { useEffect, useState } from 'react';
import '../styles/AdBuilder.scss';

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import ImageDropZone from '../components/DropZone';

import Button from '@mui/material/Button';

function AdBuilder() {
  const [image, setImage] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [cropData, setCropData] = useState(null);
  const [cropper, setCropper] = useState(null);
  const [cropperVisible, setCropperVisible] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);
  const [images, setImages] = useState([]);
  const [bgImage, setBgImage] = useState(null);
  const [logo, setLogo] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    //console.log(images);
    images[0] &&
      setImage(images[0].preview) &&
      setOriginalImage(images[0].preview);
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

  const steps = [
    {
      label: 'Step 1: Customize Background',
      dragMessage: 'Click or simply drag and drop a background image',
      aspectRatio: 16 / 9,
    },
    {
      label: 'Step 2: Select a Logo',
      dragMessage: 'Click or simply drag and drop a logo',
      aspectRatio: 1 / 1,
    },
    {
      label: 'Step 3: Submit for Review',
    },
    {
      label: 'Step 4: Review and Submit Approval',
    },
  ];

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
    defineStep(cropper.getCroppedCanvas().toDataURL());
    setCropData(null);
  };

  const defineStep = (image) => {
    console.log(image);
    if (currentStep === 0) {
      setBgImage(image);
      setCropperVisible(false);
    } else if (currentStep === 1) {
      setLogo(image);
      setCropperVisible(false);
    }
    setCurrentStep(currentStep++);
  };

  return (
    <div className="ad-builder">
      <h1>Create a Video Slate</h1>
      <h2>{steps[currentStep].label}</h2>
      {!cropperVisible
        ? [
            <ImageDropZone
              key="step-1"
              setCropperVisible={setCropperVisible}
              images={images}
              setImages={setImages}
            />,
          ]
        : null}
      {[
        <div className="image-cropper" key="step-2">
          <Cropper
            aspectRatio={steps[currentStep].aspectRatio}
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
              <Button className="btn btn-primary" onClick={() => Rotate(-90)}>
                Rotate Left
              </Button>
              <Button className="btn btn-primary" onClick={() => Rotate(90)}>
                Rotate Right
              </Button>
            </div>
            <div className="right">
              {imageSelected
                ? [
                    <Button className="btn btn-primary" onClick={Crop}>
                      Edit
                    </Button>,
                  ]
                : [
                    <Button className="btn btn-primary" onClick={getCropData}>
                      Select
                    </Button>,
                  ]}
            </div>
          </div>
        </div>,
      ]}
      {currentStep == 1 ? (
        <img src={bgImage} className="bg-image" alt="background image" />
      ) : null}
    </div>
  );
}

export default AdBuilder;
