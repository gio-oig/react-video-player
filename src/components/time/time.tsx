import formatTime from "../../helpers/functions";

type TimeComponentProps = {
  time?: number;
};

const TimeComponent = ({ time }: TimeComponentProps) => {
  return <p className="time">{formatTime(time || 0)}</p>;
};

export default TimeComponent;
