"use client";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "./Timer.module.css";
import { useEffect, useState } from "react";
function Timer() {
  const [time, setTime] = useState(30);
  const [isRunning, setisRunning] = useState(false);
  const [displayTime, setDisplayTime] = useState("");
  const [showTimerInput, setTimerInputState] = useState(false);
  const [userTime, setUserTime] = useState("");
  const [lastUserTime, setLastUserTime] = useState("");

  console.log("init", time);
  function handleReset() {
    setisRunning(false);
    setTime(lastUserTime ? lastUserTime : 0);
  }
  function handleTimerState() {
    if (isRunning) {
      setisRunning(false);
    } else {
      setisRunning(true);
      setTimerInputState(false);
    }
  }
  function handleTimerInputVisiblity() {
    setTimerInputState(true);
  }

  function handleUserInputTime(e) {
    setUserTime(e.target.value);
    let inputValue = e.target.value;
    let padded = inputValue.padStart(6, "0");
    console.log(padded);

    let temptime = 0;
    temptime += +padded[5];
    temptime += +padded[4] * 10;
    temptime += +padded[3] * 60;
    temptime += +padded[2] * 60 * 10;
    temptime += +padded[1] * 3600;
    temptime += +padded[0] * 3600 * 10;

    setTime(temptime);
    secondsToHms(temptime);
    setLastUserTime(temptime);
  }

  function secondsToHms(timeValue) {
    var d = timeValue ? timeValue : time;
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h : "00";
    var mDisplay = m > 0 ? m : "00";
    var sDisplay = s > 0 ? s : "00";
    // 00:02:00
    return `${hDisplay}:${mDisplay}:${sDisplay}`;
  }

  useEffect(() => {
    let timer;
    console.log("time", time);
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);
  return (
    <div className={styles.timerWrapper}>
      <div className={styles.timerInput}>
        {showTimerInput ? (
          <TextField
            id="standard-basic"
            variant="standard"
            placeholder="00:00:00"
            // value={userTime}
            onChange={handleUserInputTime}
            className={styles.timerInputField}
          />
        ) : (
          <div onClick={handleTimerInputVisiblity}>{secondsToHms(time)}</div>
        )}
      </div>
      <div className={styles.buttonWrapper}>
        <Button
          className={styles.button}
          variant="contained"
          onClick={handleTimerState}
        >
          {isRunning ? "Pause" : "Start"}
        </Button>

        <Button
          className={styles.button}
          variant="contained"
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

export default Timer;
