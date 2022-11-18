import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import VideoPlayer from "./components/videoPlayer/videoPlayer";
import VideoSource from "./components/videoSource/videoSource";

import "./App.css";

export type Zoom = "in" | "out";
export type SkipDirection = "forward" | "backward";

const initPosition = {
  x: 0,
  y: 0,
};

function App() {
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressBar, setProgressBar] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [positions, setPositions] = useState(initPosition);
  const [lastPositions, setLastPositions] = useState(initPosition);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);

  const handelStart = () => {
    if (isPlaying) {
      updateVideoRefs((videoRef) => {
        videoRef.current?.pause();
      });
      setIsPlaying(false);
    } else {
      updateVideoRefs((videoRef) => {
        videoRef.current?.play();
      });
      setIsPlaying(true);
    }
  };

  const updateVideoRefs = (func: (ref: any) => void) => {
    if (!videoRef1.current || !videoRef2.current) return;

    func(videoRef1);
    func(videoRef2);
  };

  const skip = (direction: SkipDirection, amount: number = 5) => {
    const skipTime = direction === "forward" ? amount : -amount;

    updateVideoRefs((videoRef) => {
      videoRef.current.currentTime += skipTime;
    });
  };

  const handelTimeChange = (e: Event) => {
    const targetEl = e.target as HTMLVideoElement;
    if (!videoRef1.current) return;

    setProgressBar((targetEl.currentTime / videoRef1.current.duration) * 100);
  };

  const handelTimelineClick = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pixelsFromLeft = rect.x - e.clientX;
    const percent = pixelsFromLeft / rect.width;

    updateVideoRefs((videoRef) => {
      videoRef.current.currentTime = percent * videoRef.current.duration * -1;
    });
  };

  const handelZoom = (zoomType: Zoom) => {
    const ZOOMSTEP = 0.25;
    const isZoomIn = zoomType === "in";

    if ((zoom === 2 && isZoomIn) || (zoom === 1 && !isZoomIn)) {
      return;
    }

    setZoom((prevZoom) =>
      isZoomIn ? prevZoom + ZOOMSTEP : prevZoom - ZOOMSTEP
    );
  };

  const changePlaybackSpeed = () => {
    if (!videoRef1.current) return;

    let newPaybackRate = videoRef1.current?.playbackRate + 0.25;

    if (videoRef1.current?.playbackRate >= 2) {
      newPaybackRate = 0.25;
    }

    updateVideoRefs((videoRef) => {
      videoRef.current.playbackRate = newPaybackRate;
    });
    setPlaybackRate(newPaybackRate);
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVolume = +e.target.value;
    updateVideoRefs((videoRef) => {
      videoRef.current.volume = newVolume;
    });
    setVolume(newVolume);
  };

  const handleNewVideoUrl = (videoUrl: string) => {
    setProgressBar(0);
    updateVideoRefs((videoref) => {
      videoref.current.src = videoUrl;
    });
  };

  useEffect(() => {
    if (!videoRef1.current || !videoRef2.current) return;
    const ref1 = videoRef1.current;
    const ref2 = videoRef2.current;

    ref1.addEventListener("timeupdate", handelTimeChange);
    ref2.addEventListener("timeupdate", handelTimeChange);

    return () => {
      ref1.removeEventListener("timeupdate", handelTimeChange);
      ref2.removeEventListener("timeupdate", handelTimeChange);
    };
  }, []);

  return (
    <div className={`App ${isPlaying ? "" : "stoped"}`}>
      <VideoSource handleNewVideoUrl={handleNewVideoUrl} />
      <section className="videos-container">
        <VideoPlayer
          videoRef={videoRef1}
          handelStart={handelStart}
          handelTimelineClick={handelTimelineClick}
          progressBar={progressBar}
          handelZoom={handelZoom}
          zoom={zoom}
          skip={skip}
          positions={positions}
          setPositions={setPositions}
          lastPositions={lastPositions}
          setLastPositions={setLastPositions}
          handleSpeed={changePlaybackSpeed}
          playbackRate={playbackRate}
          volume={volume}
          onVolumeChange={handleVolumeChange}
        />
        <VideoPlayer
          videoRef={videoRef2}
          handelStart={handelStart}
          handelTimelineClick={handelTimelineClick}
          progressBar={progressBar}
          handelZoom={handelZoom}
          zoom={zoom}
          skip={skip}
          positions={positions}
          setPositions={setPositions}
          lastPositions={lastPositions}
          setLastPositions={setLastPositions}
          handleSpeed={changePlaybackSpeed}
          playbackRate={playbackRate}
          volume={volume}
          onVolumeChange={handleVolumeChange}
        />
      </section>
      <div>
        <a
          href="https://gist.github.com/jsturgis/3b19447b304616f18657"
          target="_blank"
          rel="noreferrer"
        >
          copy video links from here
        </a>
      </div>
    </div>
  );
}

export default App;
