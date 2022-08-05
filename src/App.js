import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import sunrise from "./img/sunrise.svg"
import sunset from "./img/sunset.svg"
import moon from "./img/moon-first-quarter.svg"
import clear from "./img/clear-day.svg"

const App = () => {
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [hours, setHours] = useState(0)
  const [day, setDay] = useState(0)
  const morning = useRef("")
  const [day_Value, setDay_Value] = useState(0)
  const [month, setMonth] = useState(0)
  const [year, setYear] = useState(0)
  const img = useRef()

  const days_Of_the_week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months_list = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  setInterval(() => {
    const currentTime = new Date();
    setHours(currentTime.getHours())
    setMinutes(currentTime.getMinutes())
    setSeconds(currentTime.getSeconds())
    setDay(currentTime.getDay())
    setYear(currentTime.getFullYear())
    setMonth(currentTime.getMonth())
    setDay_Value(currentTime.getDate())

    if (hours <= 6) {
      morning.current = "Early morning";
    } else if (hours <= 11) {
      morning.current = "Morning";
    } else if (hours === 12) {
      morning.current = "Mid day";
    } else if (hours <= 15) {
      morning.current = "Afternoon";
    } else if (hours <= 19) {
      morning.current = "Evening";
    } else if (hours <= 24) {
      morning.current = "Night";
    }
  }, 1000);

  useEffect(() => {
    let placeholder = "";
    switch (morning.current) {
      case "Morning":
        placeholder = sunrise;
        if (placeholder !== img.current) {
          img.current = placeholder;
        }
        break;
        case "Early morning":
        console.log({ placeholder, img })
        placeholder = moon;
        if (placeholder !== img.current) {
          img.current = placeholder;
        }
        break;
      case "Mid Day":
        placeholder = clear;
        console.log({ placeholder, img })
        if (placeholder !== img.current) {
          img.current = placeholder;
        }
        break;
      case "Afternoon":
        placeholder = clear;
        if (placeholder !== img.current) {
          img.current = placeholder;
        }
        break;
      case "Evening":
        placeholder = sunset;
        if (placeholder !== img.current) {
          img.current = placeholder;
        }
        break;
      case "Night":
        placeholder = moon;
        if (placeholder !== img.current) {
          img.current = placeholder;
        }
        break;
      default:
        break;
    }
  }, [morning.current])

  return (
    <div className="app">
      <div className="dark"></div>
      <div className="animate">
        <div className="night">
          <img src={`${img.current}`} alt="" />

        </div>
      </div>
      <div className="clock">
        <div className="day">It's {days_Of_the_week[day]}</div>
        <div className="time"><span className="hour">{hours > 9 ? `${hours}` : `0${hours}`}</span>:<span className="minutes">{minutes > 9 ? `${minutes}` : `0${minutes}`}</span>:<span className="seconds">{seconds > 9 ? `${seconds}` : `0${seconds}`}</span></div>
        <div className="text">
          <p>{morning.current}</p>
          <p>{months_list[month]} {day_Value}, {year}</p>
        </div>
      </div>
    </div>
  )
}

export default App;