import { motion } from 'framer-motion';

export default function Intro({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.9 }}
      className="flex flex-col items-center text-center"
    >
      <div className="flex flex-col items-center">
        <p className="mb-3 text-xs tracking-[0.42em] text-[#d7ad61]/75">
          圣德长存 · 海屿平安
        </p>
        <h1 className="text-6xl font-medium tracking-[0.18em] text-[#f2d492] drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)] sm:text-7xl">
          天后妈祖
        </h1>
        <p className="mt-5 text-sm tracking-[0.32em] text-[#d7ad61]/70">
          泉州天后宫 · 线上问事求签
        </p>
      </div>

      <div className="mazu-seal mt-10">
        <span>天上圣母</span>
      </div>

      <div className="my-8 h-20 w-px bg-gradient-to-b from-transparent via-[#d4a858]/55 to-transparent" />

      <p className="mb-9 text-xs tracking-[0.34em] text-[#bcd6df]/55">
        问事 · 掷杯 · 抽签 · 解签
      </p>

      <button
        type="button"
        onClick={onStart}
        className="ritual-btn ritual-btn-primary"
      >
        诚心求问
      </button>
    </motion.div>
  );
}
