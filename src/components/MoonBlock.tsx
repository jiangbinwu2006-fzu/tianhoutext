export default function MoonBlock({
  isFlat,
  flip = false,
  className = '',
}: {
  isFlat: boolean;
  flip?: boolean;
  className?: string;
}) {
  const fill = isFlat ? '#7e2a23' : '#a93a2d';
  const highlight = isFlat ? '#b85a43' : '#d56a4a';

  return (
    <svg
      viewBox="0 0 100 200"
      className={`drop-shadow-[0_10px_16px_rgba(0,0,0,0.34)] ${className}`}
      style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="moon-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={highlight} />
          <stop offset="48%" stopColor={fill} />
          <stop offset="100%" stopColor="#5b1c18" />
        </linearGradient>
      </defs>
      <path
        d="M 20,20 C 100,50 100,150 20,180 C 50,150 50,50 20,20 Z"
        fill="url(#moon-grad)"
        stroke="#3e110e"
        strokeWidth="2"
      />
      {isFlat && (
        <path
          d="M 25,30 C 90,55 90,145 25,170 C 50,145 50,55 25,30 Z"
          fill="none"
          stroke="#3e110e"
          strokeWidth="1"
          opacity="0.55"
        />
      )}
    </svg>
  );
}
