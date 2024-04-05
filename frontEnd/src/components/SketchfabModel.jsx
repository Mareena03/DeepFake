/* eslint-disable react/prop-types */
import {useState } from "react";
import styled from "styled-components";
const Header = styled.div`
  position:relative;
  float:left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background: linear-gradient(to right, #007bff, #ff0000);
  color: white;
  padding: 20px;
  height: 80px; /* Adjust the height as needed */
`;

const SketchfabModel = ({children}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    // Once the iframe has loaded, set isLoaded to true
    setIsLoaded(true);
    // Use JavaScript setTimeout function to delay the rendering of the content inside by 2 seconds
    setTimeout(() => {
      setIsContentVisible(true);
    }, 3500); // 2000 milliseconds = 2 seconds
  };

  const [isContentVisible, setIsContentVisible] = useState(false);

  return (
    <div className="background-container" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      {/* Custom loading indicator */}
      {!isLoaded && (
        <div className="custom-loader">
          <p></p>
          {/* Add loading spinner or animation here */}
        </div>
      )}

      {/* Sketchfab Embed */}
      <div className="sketchfab-embed-wrapper" style={{ display: isLoaded ? 'block' : 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh' }}>
        <iframe
          style={{ width: '100%', height: '100%' }}
          allowFullScreen
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          src="https://sketchfab.com/models/47f2425f6a9b4509911d5686fb1227a8/embed?autostart=1&preload=1&ui_animations=0&ui_infos=0&ui_stop=0&ui_inspector=0&ui_watermark_link=0&ui_watermark=0&ui_hint=0&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0"
          onLoad={handleLoad}
        >
        </iframe>

      </div>
      
      {/* Other Components */}
      {isContentVisible && (
        <><Header><h1></h1></Header>
        <div className="content-overlay" style={{ position: 'relative', zIndex: 1 }}>
            {children}
        </div>
        </>
      )}
    </div>
  );
};

export default SketchfabModel;