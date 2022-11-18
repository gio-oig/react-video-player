import { ChangeEvent } from "react";
import { AiFillSound } from "react-icons/ai";
import { IoMdVolumeMute } from "react-icons/io";

import "./sound.css";

type SoundControllerProps = {
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Sound = ({ value, onChange }: SoundControllerProps) => {
  return (
    <div className="sound">
      {value ? <AiFillSound /> : <IoMdVolumeMute />}
      <input
        className="volume-slider"
        type="range"
        min="0"
        max="1"
        step="any"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Sound;
