import myVideo from "../video/cable-car.mov";
import {Link} from "react-router-dom";

function Video() {
  return (
    <div className="enter-div">
      <h2 className="enter"><Link to="/gallery">Enter Photo Gallery</Link></h2>
      <video id="background-video" autoPlay loop muted >
        <source src={myVideo} type="video/mp4"></source>
      </video>
    </div>
  )
}

export default Video;