import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { PlayIcon } from "@heroicons/react/outline";

function VideoContainer({
  srcVideo,
  srcImage
}) {
  const [stateLocal, setStateLocal] = useState({
    playingVideo: false
  });

  const refVideo = useRef(null);

  const onPlayVideo = () => {
    if (refVideo.current) {
      setStateLocal({
        ...stateLocal,
        playingVideo: true
      });

      refVideo.current.play();
    }
  };

  return (
    <div
      className="BackgroundWave-Video_Container imageContainerVideo"
      onClick={onPlayVideo}
    >
      {
        !stateLocal.playingVideo && (
          <PlayIcon className="PlayIcon" />
        )
      }
      <video
        src={srcVideo}
        controls={stateLocal.playingVideo}
        className="BackgroundWave-Video"
        poster={srcImage}
        ref={refVideo}
      ></video>
    </div>
  );
}

VideoContainer.propTypes = {
  srcVideo: PropTypes.any,
  srcImage: PropTypes.any
};

export {
  VideoContainer
};
