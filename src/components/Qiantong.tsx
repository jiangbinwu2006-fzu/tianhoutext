import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function Qiantong({ onDrawn }: { onDrawn: () => void }) {
  const [isShaking, setIsShaking] = useState(false);
  const controls = useAnimation();
  const stickControls = useAnimation();

  const handleShake = async () => {
    if (isShaking) return;
    setIsShaking(true);

    await controls.start({
      rotateZ: [0, -11, 11, -11, 11, -6, 6, 0],
      y: [0, -6, 6, -6, 6, 0],
      transition: { duration: 1.5, ease: 'easeInOut', repeat: 2 },
    });

    await stickControls.start({
      y: [0, -160],
      rotateZ: [0, 22],
      opacity: [1, 1, 0],
      transition: { duration: 1, ease: 'easeOut' },
    });

    window.setTimeout(onDrawn, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.08 }}
      className="flex flex-col items-center justify-center"
    >
      <div className="mb-10 flex min-h-8 items-center justify-center text-center">
        <p className="text-lg tracking-[0.18em] text-[#e1bd72]">
          {isShaking ? '诚心摇签……' : '点击签筒，求一支天后灵签'}
        </p>
      </div>

      <motion.button
        type="button"
        animate={controls}
        onClick={handleShake}
        disabled={isShaking}
        className="relative h-64 w-32 cursor-pointer outline-none"
        aria-label="摇动天后灵签签筒"
      >
        <motion.div
          animate={stickControls}
          className="absolute left-1/2 top-5 z-0 h-44 w-3 origin-bottom -translate-x-1/2 rounded-t-sm shadow-lg"
          style={{ background: 'linear-gradient(to bottom, #e8c274, #a8792e)' }}
        >
          <div className="mt-2 h-4 w-full bg-[#a52f2a]" />
        </motion.div>

        <div className="absolute bottom-0 z-10 h-52 w-full overflow-hidden rounded-b-2xl rounded-t-sm border-t-4 border-[#9b762d] shadow-2xl"
          style={{
            background:
              'linear-gradient(90deg, #10283e, #234a66 45%, #10283e)',
            boxShadow:
              'inset 0 0 22px rgba(0,0,0,0.62), 0 14px 34px rgba(0,0,0,0.48)',
          }}
        >
          <div className="absolute left-0 top-9 h-5 w-full border-y border-[#6f211d] bg-[#a52f2a]/90" />
          <div className="absolute bottom-9 left-0 h-5 w-full border-y border-[#6f211d] bg-[#a52f2a]/90" />
          <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center">
            <div className="border border-[#d4a858]/55 bg-[#0b1f31]/80 px-2 py-3">
              <span
                className="block text-lg font-medium tracking-[0.36em] text-[#e5c076]"
                style={{ writingMode: 'vertical-rl', textShadow: '0 1px 2px rgba(0,0,0,0.7)' }}
              >
                天后灵签
              </span>
            </div>
          </div>
        </div>
      </motion.button>

      {!isShaking && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-14"
        >
          <button type="button" onClick={handleShake} className="ritual-btn ritual-btn-primary">
            诚心摇签
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
