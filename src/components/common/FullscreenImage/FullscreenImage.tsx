import React, { SetStateAction, useEffect, useState } from 'react';
import {
  MdClose,
  MdExpandLess,
  MdExpandMore,
  MdZoomIn,
  MdZoomOut,
  MdZoomOutMap,
} from 'react-icons/md';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { Submissions } from '../../../api';
import { Loader } from '../Loader';

const FullscreenImage = (props: FullscreenImageProps): React.ReactElement => {
  const [showInfo, setShowInfo] = useState(true);

  const closeModal = () => {
    console.log('Close Modal');
    props.setIsVisible(false);
  };

  const toggleInfo = () => setShowInfo((cur) => !cur);

  const resizeHandler = () => {
    console.log('Image resized');

    document
      .getElementById(`fullscreen-image-${props.id}`)
      ?.style.setProperty('height', `${window.innerHeight}px`);
  };

  useEffect(() => {
    if (props.isVisible) window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, [props.isVisible]);

  return props.isVisible ? (
    <TransformWrapper
      options={{
        limitToBounds: false,
      }}
    >
      {({ zoomIn, zoomOut, resetTransform }: TransformProps) => (
        <div className="fullscreen-image" id={`fullscreen-image-${props.id}`}>
          <div className="close-button">
            <MdClose onClick={closeModal} />
          </div>
          <div className="img-wrapper">
            <TransformComponent>
              <img
                src={props.src}
                alt="Submission displayed fullscreen"
                className={`rotate-${props.rotation}`}
              />
            </TransformComponent>
            <div className={`info${showInfo ? '' : ' hidden'}`}>
              <div className="info-left">
                <h2>Prompt</h2>
                {props.prompt && (
                  <p className="prompt">&ldquo;{props.prompt}&rdquo;</p>
                )}
              </div>
              <div className="info-right">
                {props.codename && <p className="user">{props.codename}</p>}
                {props.score && (
                  <p className="score">
                    - <strong>{Math.round(props.score)}</strong> points -
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="controls">
            <div className="top-controls">
              <button
                onClick={toggleInfo}
                title={`${showInfo ? 'Hide' : 'Show'} Info`}
              >
                {showInfo ? <MdExpandMore /> : <MdExpandLess />}
              </button>
            </div>
            <div className="bottom-controls">
              <button onClick={zoomOut} title="Zoom Out">
                <MdZoomOut />
              </button>
              <button onClick={resetTransform} title="Reset Image">
                <MdZoomOutMap />
              </button>
              <button onClick={zoomIn} title="Zoom In">
                <MdZoomIn />
              </button>
            </div>
          </div>
        </div>
      )}
    </TransformWrapper>
  ) : (
    <>
      <Loader message={'Loading image'} />
    </>
  );
};

interface FullscreenImageProps extends Submissions.ISubItem {
  id: number;
  src: string;
  rotation: number;
  prompt: string;
  codename: string;
  isVisible: boolean;
  score: number;
  setIsVisible: React.Dispatch<SetStateAction<boolean>>;
}

interface TransformProps {
  zoomIn: () => void;
  zoomOut: () => void;
  resetTransform: () => void;
}

export default FullscreenImage;
