import myVideo from "../video/cableCar.mov";
import {Link} from "react-router-dom";
import { useEffect, useRef } from "react";

/**
 This component addresses a well-documented bug in React with adding the "muted" attribute to a video: https://github.com/facebook/react/issues/10389#issuecomment-605689475. I was able to come up with a solution that would pass the react-testing-library test by using (and modifying) the code example in this StackOverflow post: https://stackoverflow.com/questions/62732346/test-exception-unstable-flushdiscreteupdates
 */

function Video() {
  const videoRef = useRef(null);
  const source = myVideo;
  const type = "video/mp4";

  useEffect(() => {
    const { current: video } = videoRef;
    video && (video.muted = true);
  }, []);

  return (
    <div className="enter-div">
      <h2 className="enter"><Link to="/gallery">Enter Photo Gallery</Link></h2>
      <video
        id="background-video"
        ref={videoRef}
        src={source}
        type={type}
        autoPlay 
        controls 
        loop
      />
    </div>
  )
}

export default Video;