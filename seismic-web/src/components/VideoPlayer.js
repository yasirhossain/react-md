import React, { useRef, useState, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export const VideoPlayer = (props) => {
  const videoPlayerRef = useRef(null); // Instead of ID
  const videoSrc = props.video;
  const setCurrentTime = props.setCurrentTime;
  const videoJSOptions = {
    autoplay: 'muted',
    controls: true,
    userActions: { hotkeys: true },
    playbackRates: [0.5, 1, 1.5, 2],
  };

  useEffect(() => {
    if (videoPlayerRef) {
      const player = videojs(videoPlayerRef.current, videoJSOptions, () => {
        player.src(videoSrc);
        player.on('ended', () => {
          console.log('ended');
        });
        player.on('timeupdate', () => {
          setCurrentTime(player.currentTime());
        });
        console.log('Player Ready');
      });
    }

    return () => {};
  }, []);

  return (
    <div className="video-player">
      <video
        style={{ width: '100%' }}
        ref={videoPlayerRef}
        className="video-js vjs-16-9"
      />
      {/* 
        <GlobalStyle /> 
        <span>Current Time: {currentTime}</span>
      */}
    </div>
  );
};
