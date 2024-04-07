import { useEffect, useState } from "react";
import { hours, minutes, timeZone } from "../static/timeData";

interface TimerProps {
  selectedDate:Date
  setSelectedTime: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const Timer = ({selectedDate,setSelectedTime }: TimerProps) => {
  const [hour, setHour] = useState("12")
  const [minute, setMinute] = useState("00")
  const [timeZoneAM, setTimeZoneAM] = useState("AM")

  useEffect(() => {
    // Combine selected date and time
    const selectedDateTime = new Date(selectedDate);
    let selectedHour = parseInt(hour);
    if (timeZoneAM === "PM" && selectedHour !== 12) {
      selectedHour += 12;
    }
    if (timeZoneAM === "PM" && selectedHour === 12) {
      selectedHour = 12;
    }
    if (timeZoneAM === "AM" && selectedHour === 12) {
      selectedHour = 0;
    }
    selectedDateTime.setHours(selectedHour);
    selectedDateTime.setMinutes(parseInt(minute));
    selectedDateTime.setSeconds(0);
    selectedDateTime.setMilliseconds(0);

    // Store selected date and time
    setSelectedTime(selectedDateTime);
  }, [selectedDate, hour, minute, timeZoneAM, setSelectedTime]);
  

  return (
    <div className="flex items-center">
      <select
        className="p-2 text-white rounded-lg font-semibold"
        value={hour}
        onChange={(e) => {
          setHour(e.target.value)
        }}
      >
        {hours.map((hour) => {
          return (
            <option value={hour} key={hour}>
              {hour}
            </option>
          );
        })}
      </select>{" "}
      :
      <select className="p-2 text-white rounded-lg font-semibold" value={minute} onChange={(e) => {setMinute(e.target.value)}}>
        {minutes.map((minute) => {
          return (
            <option value={minute} key={minute}>
              {minute.padStart(2, "0")}
            </option>
          );
        })}
      </select>{" "}
      :
      <select  className="p-2 rounded-lg font-semibold text-white" value={timeZoneAM} onChange={(e) => {setTimeZoneAM(e.target.value)}}>
        {timeZone.map((time) => {
          return (
            <option value={time} key={time}>
              {time}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Timer;