import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  RefObject,
  SetStateAction,
  useState,
} from "react";

import Sound from "../sound/sound";
import TimeComponent from "../time/time";

import { SkipDirection, Zoom } from "../../App";

import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai";

import backWardsSvg from "../../assets/backward-5.svg";
import pasueSvg from "../../assets/pause.svg";
import playSvg from "../../assets/play.svg";
import ForwardSvg from "../../assets/forward-5.svg";

type Position = {
  x: number;
  y: number;
};

type VideoPlayerProps = {
  videoRef: RefObject<HTMLVideoElement>;
  handelStart: () => void;
  handelTimelineClick: (e: MouseEvent<HTMLDivElement>) => void;
  progressBar: number;
  handelZoom: (zoomType: Zoom) => void;
  zoom: number;
  skip: (direction: SkipDirection, amount?: number) => void;
  positions: Position;
  setPositions: Dispatch<SetStateAction<Position>>;
  lastPositions: Position;
  setLastPositions: Dispatch<SetStateAction<Position>>;
  handleSpeed: () => void;
  playbackRate: number;
  volume: number;
  onVolumeChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const VideoPlayer = ({
  videoRef,
  progressBar,
  handelStart,
  handelTimelineClick,
  handelZoom,
  zoom,
  skip,
  positions,
  setPositions,
  lastPositions,
  setLastPositions,
  handleSpeed,
  playbackRate,
  volume,
  onVolumeChange,
}: VideoPlayerProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const [clickPositions, setClickPositions] = useState({ x: 0, y: 0 });

  const handelMouseDown = (e: MouseEvent<HTMLVideoElement>) => {
    setClickPositions({
      x: e.pageX,
      y: e.pageY,
    });
    setIsClicked(true);
  };

  const handelMousemove = (e: MouseEvent<HTMLVideoElement>) => {
    if (!isClicked) return;
    const xMovement = e.pageX - clickPositions.x;
    const yMovement = e.pageY - clickPositions.y;

    setPositions({
      x: lastPositions.x + xMovement,
      y: lastPositions.y + yMovement,
    });
  };

  const handelMouseUp = () => {
    setIsClicked(false);
    setLastPositions(positions);
  };

  const videoTransform = `scale(${zoom}) translateX(${positions.x}px) translateY(${positions.y}px)`;

  return (
    <div className={`video-container ${isClicked ? "drag-mode" : ""} `}>
      <video
        ref={videoRef}
        style={{
          transform: videoTransform,
        }}
        onMouseDown={handelMouseDown}
        onMouseMove={handelMousemove}
        onMouseUp={handelMouseUp}
      >
        <source type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        className="video-center-controlls"
        style={{
          pointerEvents: isClicked ? "none" : "all",
        }}
      >
        <img
          className="center-controll_img"
          src={backWardsSvg}
          onClick={() => skip("backward")}
          alt=""
        />
        <img
          className="center-controll_img stop-icon"
          src={pasueSvg}
          alt=""
          onClick={handelStart}
        />
        <img
          className="center-controll_img play-icon"
          src={playSvg}
          onClick={handelStart}
          alt=""
        />
        <img
          className="center-controll_img"
          src={ForwardSvg}
          onClick={() => skip("forward")}
          alt=""
        />
      </div>
      <div className="video-footer-controlls">
        <div className="timeline-container" onClick={handelTimelineClick}>
          <div className="timeline" style={{ width: progressBar + "%" }} />
        </div>
        <div className="controlles-container">
          <div className="time-container">
            <TimeComponent time={videoRef.current?.currentTime} /> /
            <TimeComponent time={videoRef.current?.duration} />
          </div>
          <Sound value={volume} onChange={onVolumeChange} />

          <div className="zoom-icons">
            <AiOutlineZoomIn
              className="icon-button"
              onClick={() => handelZoom("in")}
            />
            <AiOutlineZoomOut
              className="icon-button"
              onClick={() => handelZoom("out")}
            />
          </div>
          <span className="playback-rate" onClick={handleSpeed}>
            {playbackRate}x
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
