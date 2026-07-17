import type { SVGProps } from "react";

/**
 * A soft pink butterfly with gold accents. The two wing groups carry the
 * `butterfly__wing` classes so CSS can flap them (scaleX toward the body),
 * and the whole thing gently glows — it's the cover's "tap to open" charm.
 */
export function Butterfly({ className, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 92"
      className={`butterfly ${className ?? ""}`.trim()}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <defs>
        <radialGradient id="bflyWing" cx="50%" cy="38%" r="70%">
          <stop offset="0%" stopColor="#ffe6ec" />
          <stop offset="55%" stopColor="#f9c6d2" />
          <stop offset="100%" stopColor="#eba7bb" />
        </radialGradient>
      </defs>

      {/* Left wings */}
      <g className="butterfly__wing butterfly__wing--left">
        <path
          className="butterfly__wing-shape"
          d="M49 33 C 36 16 20 8 11 17 C 4 24 6 38 18 43 C 30 47 44 45 49 40 Z"
        />
        <path
          className="butterfly__wing-shape"
          d="M49 44 C 38 46 24 52 22 63 C 21 71 29 74 37 70 C 44 66 48 54 49 48 Z"
        />
        <circle className="butterfly__spot" cx="22" cy="25" r="3.6" />
        <circle className="butterfly__spot" cx="33" cy="60" r="2.8" />
      </g>

      {/* Right wings */}
      <g className="butterfly__wing butterfly__wing--right">
        <path
          className="butterfly__wing-shape"
          d="M51 33 C 64 16 80 8 89 17 C 96 24 94 38 82 43 C 70 47 56 45 51 40 Z"
        />
        <path
          className="butterfly__wing-shape"
          d="M51 44 C 62 46 76 52 78 63 C 79 71 71 74 63 70 C 56 66 52 54 51 48 Z"
        />
        <circle className="butterfly__spot" cx="78" cy="25" r="3.6" />
        <circle className="butterfly__spot" cx="67" cy="60" r="2.8" />
      </g>

      {/* Body + head */}
      <ellipse className="butterfly__body" cx="50" cy="48" rx="2.8" ry="19" />
      <circle className="butterfly__body" cx="50" cy="28" r="3.3" />
      {/* Antennae */}
      <path className="butterfly__antenna" d="M50 26 C 46 17 42 14 38.5 12.5" />
      <path className="butterfly__antenna" d="M50 26 C 54 17 58 14 61.5 12.5" />
      <circle className="butterfly__body" cx="38.5" cy="12.5" r="1.5" />
      <circle className="butterfly__body" cx="61.5" cy="12.5" r="1.5" />
    </svg>
  );
}

export default Butterfly;
