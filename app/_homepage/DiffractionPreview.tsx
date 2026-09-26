"use client";
import { useState } from "react";
import {
  buildScreen,
  firstMinimumAngle,
} from "@/app/natural-science/physics/waves-optics/diffraction/model";
import styles from "./discovery.module.css";

export default function DiffractionPreview() {
  const [ratio, setRatio] = useState(3);
  const angle = firstMinimumAngle(1, ratio)!;
  const path = buildScreen(1, ratio)
    .map(
      ({ theta, intensity }, i) =>
        `${i ? "L" : "M"}${50 + (theta + 60) * 4},${180 - intensity * 130}`
    )
    .join(" ");
  return (
    <div className={styles.instrument}>
      <div className={styles.instrumentHeading}>
        <span>Single-slit diffraction</span>
        <span>Interactive preview</span>
      </div>
      <svg
        viewBox="0 0 580 230"
        role="img"
        aria-label={`Normalized intensity versus angle. First dark minima: plus and minus ${angle.toFixed(1)} degrees.`}
      >
        <text x="50" y="24" fill="#b6adcc" fontSize="13">
          Normalized intensity
        </text>
        {[0, 0.5, 1].map((value) => (
          <g key={value}>
            <line
              x1="50"
              x2="530"
              y1={180 - value * 130}
              y2={180 - value * 130}
              stroke="#ffffff18"
            />
            <text
              x="35"
              y={184 - value * 130}
              textAnchor="end"
              fill="#b6adcc"
              fontSize="12"
            >
              {value}
            </text>
          </g>
        ))}
        <path d={`${path} L530,180 L50,180 Z`} fill="#b7a0ff18" />
        <path d={path} fill="none" stroke="#c4b5fd" strokeWidth="2.5" />
        {[-60, -30, 0, 30, 60].map((theta) => (
          <text
            key={theta}
            x={50 + (theta + 60) * 4}
            y="203"
            textAnchor="middle"
            fill="#b6adcc"
            fontSize="12"
          >
            {theta}°
          </text>
        ))}
        <text x="290" y="225" textAnchor="middle" fill="#b6adcc" fontSize="12">
          Angle from the center
        </text>
      </svg>
      <label className={styles.sliderLabel} htmlFor="slit-ratio">
        <span>Opening width / wavelength</span>
        <output htmlFor="slit-ratio">{ratio.toFixed(1)}</output>
      </label>
      <input
        id="slit-ratio"
        type="range"
        min="1.5"
        max="6"
        step="0.1"
        value={ratio}
        onChange={(e) => setRatio(Number(e.target.value))}
        aria-describedby="slit-explanation"
      />
      <div className={styles.instrumentFooter}>
        <span>
          First dark minimum: <strong>{angle.toFixed(1)}°</strong>
        </span>
        <button type="button" onClick={() => setRatio(3)}>
          Reset
        </button>
      </div>
      <p id="slit-explanation">
        Narrower opening, broader central peak. Wavelength stays fixed.
      </p>
      <small>
        Ideal far-field model; brightness is normalized, not total transmitted
        power.
      </small>
    </div>
  );
}
