export default function SceneBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-80"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 430 860"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
      >
        <defs>
          <linearGradient id="mazu-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#06182b" />
            <stop offset="0.55" stopColor="#0b2f50" />
            <stop offset="1" stopColor="#0d4a72" />
          </linearGradient>
          <linearGradient id="mazu-roof" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0e3557" />
            <stop offset="1" stopColor="#071d35" />
          </linearGradient>
        </defs>

        <rect width="430" height="860" fill="url(#mazu-sky)" />

        <g transform="translate(0 34)">
          <path
            d="M0 96 L30 58 L56 78 L92 26 L128 72 L164 22 L202 72 L240 16 L278 72 L322 38 L356 76 L392 50 L430 82 L430 170 L0 170 Z"
            fill="#071d35"
            opacity="0.62"
          />
          <path
            d="M0 170 L34 142 L66 164 L108 132 L150 166 L196 130 L242 166 L288 134 L330 166 L366 144 L402 162 L430 146 L430 186 L0 186 Z"
            fill="url(#mazu-roof)"
            opacity="0.92"
          />
          <path
            d="M204 108 V-16 M204 -16 L216 -4 M204 -16 L192 -4"
            stroke="#d2a759"
            strokeWidth="2"
            opacity="0.55"
          />
          <path
            d="M205 100 H112 M205 100 H318"
            stroke="#b0332d"
            strokeWidth="2"
            opacity="0.7"
          />
        </g>

        <g transform="translate(48 640)">
          <path
            d="M18 4 C52 -8 96 -8 128 4 L104 30 H42 Z"
            fill="#0b2a47"
            stroke="#173c5e"
            strokeWidth="1"
          />
          <path
            d="M72 2 V-32"
            stroke="#d2a759"
            strokeWidth="1.5"
            opacity="0.9"
          />
          <path
            d="M72 -32 L85 -14 M72 -32 L59 -14"
            stroke="#e6c477"
            strokeWidth="1"
            opacity="0.72"
          />
          <path
            d="M72 -30 V-8"
            stroke="#b0332d"
            strokeWidth="1.2"
            opacity="0.8"
          />
        </g>

        <g className="scene-wave">
          <path d="M0 726 C36 716 66 736 104 726 C146 715 176 736 216 726 C258 715 290 736 330 726 C370 716 402 734 430 724" />
          <path d="M0 756 C42 744 76 766 116 756 C158 745 190 766 232 756 C274 745 306 766 346 756 C380 747 408 760 430 752" />
        </g>
        <g className="scene-wave wave-front">
          <path d="M0 790 C38 780 68 800 108 790 C152 779 184 800 226 790 C268 779 300 800 340 790 C374 781 408 796 430 788" />
          <path d="M0 822 C42 812 74 832 116 822 C158 811 192 832 234 822 C276 811 310 832 350 822 C382 813 414 828 430 820" />
        </g>
      </svg>
    </div>
  );
}
