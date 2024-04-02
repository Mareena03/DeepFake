/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
`;

const Header = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: left;
  // background: linear-gradient(to right, #007bff, #ff0000);
  color: #fff;
  padding: 20px;
  height: 80px;
`;

const ContentOverlay = styled.div`
  position: relative;
  z-index: 1;
`;

const SketchfabModel = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    setTimeout(() => {
      setIsContentVisible(true);
    }, 3500);
  };

  return (
    <Container>
      {!isLoaded && (
        <div className="custom-loader">
          <p>Loading...</p>
          {/* Add loading spinner or animation here */}
        </div>
      )}
      <div
        className="sketchfab-embed-wrapper"
        style={{
          display: isLoaded ? "block" : "none",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
        }}
      >
        <iframe
          style={{ width: "100%", height: "100%" }}
          allowFullScreen
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          src="https://sketchfab.com/models/47f2425f6a9b4509911d5686fb1227a8/embed?autostart=1&preload=1&ui_animations=0&ui_infos=0&ui_stop=0&ui_inspector=0&ui_watermark_link=0&ui_watermark=0&ui_hint=0&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0"
          onLoad={handleLoad}
        ></iframe>
      </div>
      {isContentVisible && (
        <>
          <Header>
            <h1 style={{fontSize:"7vh"}}>Deep Reality</h1>
          </Header>
          <ContentOverlay>{children}</ContentOverlay>
        </>
      )}
    </Container>
  );
};

export default SketchfabModel;
