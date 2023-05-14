import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import './App.css';

const videoConstraints = {
  width: 720,
  height: 360,
  facingMode: "user"
};

export const App = () => {
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const [url, setUrl] = useState<string | null>(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
    }
  }, [webcamRef]);

  return (
    <>
      <header>
        <h1 className="text-center">Camera app</h1>
      </header>
      {isCaptureEnable || (
        <button className="btn success" onClick={() => setCaptureEnable(true)}>start</button>
      )}
      {isCaptureEnable && (
        <>
          <div>
            <button className="btn danger" onClick={() => setCaptureEnable(false)}>end </button>
          </div>
          <div>
            <Webcam
              audio={false}
              width={540}
              height={360}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          </div>
          <button className="btn success" onClick={capture}>capture</button>
        </>
      )}
      {url && (
        <>
          <div>
            <button
              className="btn danger"
              onClick={() => {
                setUrl(null);
              }}
            >
              delete
            </button>
          </div>
          <div>
            <img src={url} alt="Screenshot" />
          </div>
        </>
      )}
    </>
  );
};

export default App;
