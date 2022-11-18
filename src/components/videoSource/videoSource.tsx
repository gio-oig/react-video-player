import { ChangeEvent } from "react";

type VideoSourceProps = {
  handleNewVideoUrl: (videoUrl: string) => void;
};

const VideoSource = ({ handleNewVideoUrl }: VideoSourceProps) => {
  const onVideoSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const fileURL = URL.createObjectURL(e.target.files[0]);

    handleNewVideoUrl(fileURL);
  };

  const handelVideoUrlInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    handleNewVideoUrl(inputValue);
  };

  return (
    <div className="source-container">
      <input
        type="text"
        onChange={handelVideoUrlInputChange}
        placeholder="Enter a video URL"
      />
      <p>OR</p>
      <input type="file" accept="video/*" onChange={onVideoSelect} />
    </div>
  );
};

export default VideoSource;
