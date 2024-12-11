// import React from "react";
// import "./ToggleSwitch.css";

// const ToggleSwitch = () => {
//   const [currentTempUnit, handleToggleSwitchChange] = useState("C");

//   const handleChange = (e) => {
//     if (currentTempUnit === "C") handleToggleSwitchChange("F");
//     if (currentTempUnit === "F") handleToggleSwitchChange("C");
//   };

//   console.log(currentTempUnit);

//   return (
//     <label className="switch">
//       <input
//         className="switch__input"
//         type="checkbox"
//         onChange={handleChange}
//       />
//       <span></span>
//       <p>F</p>
//       <p>C</p>
//     </label>
//   );
// };

// export default ToggleSwitch;

import React, { useState } from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = () => {
  const [currentTempUnit, setTempUnit] = useState("C");

  const handleChange = () => {
    setTempUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  console.log("Current Temperature Unit:", currentTempUnit);

  return (
    <label className="switch">
      <input className="switch__box" type="checkbox" onChange={handleChange} />
      <span
        className={
          currentTempUnit === "F"
            ? "switch__slider switch__slider-F"
            : "switch__slider switch__slider-C"
        }
      ></span>
      <div className="switch__labels">
        <p
          className={`switch__temp-F ${
            currentTempUnit === "F" && "switch__active"
          }`}
        >
          F
        </p>
        <p
          className={`switch__temp-C ${
            currentTempUnit === "C" && "switch__active"
          }`}
        >
          C
        </p>
      </div>
    </label>
  );
};

export default ToggleSwitch;
