"use client"

import React from "react";
import { useState, useEffect } from "react";

type ProgressBarProps = {
  value: number
  maxValue?: number
}

//Important: width and height of this component are fully determined by the dimensions of the surrounding div. It will take 100% of the width and height of its parent container.

const ProgressBar:React.FC<ProgressBarProps> =({ value, maxValue =100}) =>{
  const [valueDefault, setValueDefault] = useState(value)


  useEffect(()=>{
    if(value){
      setValueDefault(value)
    }
  },[value])
  

return (
  <progress
    className={`w-full appearance-none h-full
    [&::-webkit-progress-bar]:bg-[#D9D9D9] [&::-webkit-progress-bar]:rounded-full 
    [&::-webkit-progress-value]:bg-DarkGreen [&::-webkit-progress-value]:rounded-full 
    [&::-moz-progress-bar]:bg-DarkGreen [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:h-full [&::-webkit-progress-value]:transition-all [&::-webkit-progress-value]:duration-500`}
    value={valueDefault ?? 0}
    max={maxValue }
  />
);
}

export default ProgressBar