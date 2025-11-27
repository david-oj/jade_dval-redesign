import { useState, useEffect, useMemo, useCallback } from "react";
import CircularProgressBar from "./CircularProgressBar";
const CountDown = () => {
  const EVENT_DATE_ISO = "2026-01-10T00:00:00";

  const useCountdown = (targetMs: number) => {
    // calculate ms remaining,clamp ≥0
    // Memorize calcDiff so it only changes when targetMs changes
    const calcDiff = useCallback(
      () => Math.max(targetMs - Date.now(), 0),
      [targetMs]
    );
    // diff in ms
    const [diffMs, setDiffMs] = useState<number>(calcDiff());

    useEffect(() => {
      const tick = () => setDiffMs(calcDiff());
      const id = setInterval(tick, 1000);
      return () => clearInterval(id);
    }, [targetMs, calcDiff]);

    // break down into units
    const totalSeconds = Math.floor(diffMs / 1000);
    return {
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
      totalMs: diffMs,
    };
  };

  const eventTimeMs = useMemo(() => new Date(EVENT_DATE_ISO).getTime(), []);
  const { days, hours, minutes, totalMs } = useCountdown(eventTimeMs);
  const fmt = (n: number) => n.toString().padStart(2, "0");

  // Check if countdown is complete
  const isComplete = totalMs <= 0;

  // REVISED progress calculations for counter-clockwise motion with auto-resets
  const daysProgress = isComplete ? 0 : ((days % 30) / 30) * 100;
  const hoursProgress = isComplete ? 0 : ((hours % 24) / 24) * 100;
  const minutesProgress = isComplete ? 0 : ((minutes % 60) / 60) * 100;
  // const secondsProgress = isComplete ? 0 : ((seconds % 60) / 60) * 100;

  // const countDown: { title: string; value: string; color: string }[] = [
  //   {
  //     title: "Days",
  //     value: fmt(days),
  //     color: "border-teal-400",
  //   },
  //   {
  //     title: "Hours",
  //     value: fmt(hours),
  //     color: "border-yellow-400",
  //   },
  //   {
  //     title: "Minutes",
  //     value: fmt(minutes),
  //     color: "border-red-400",
  //   },
  //   {
  //     title: "Seconds",
  //     value: fmt(seconds),
  //     color: "border-purple-400",
  //   },
  // ];

  return (
    <div className="w-fit mx-auto z-20 fixed sm:top-1 -top-1.5 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1  max-md:scale-[0.7]">
      <div className="flex gap-2 ">
        <CircularProgressBar
          progress={daysProgress}
          circleColor="text-primary"
          textColor="text-primary"
          strokeWidth={3}
          size={50}
        >
          <div className="flex flex-col items-center">
            <span>{fmt(days)}</span>
            <span className="text-[9px] -mt-0.5">Days</span>
          </div>
        </CircularProgressBar>
        <CircularProgressBar
          progress={hoursProgress}
          circleColor="text-secondary"
          textColor="text-secondary"
          strokeWidth={3}
          size={50}
        >
          <div className="flex flex-col items-center">
            <span>{fmt(hours)}</span>
            <span className="text-[9px] -mt-0.5">hours</span>
          </div>
        </CircularProgressBar>
        <CircularProgressBar
          progress={minutesProgress}
          circleColor="text-[#4FA093]"
          textColor="text-[#4FA093]"
          strokeWidth={3}
          size={50}
        >
          <div className="flex flex-col items-center">
            <span>{fmt(minutes)}</span>
            <span className="text-[8px] -mt-0.5 text-gray-00">minutes</span>
          </div>
        </CircularProgressBar>
      </div>

      <p className="text-gray-400">days left </p>
    </div>
  );
};

export default CountDown;
