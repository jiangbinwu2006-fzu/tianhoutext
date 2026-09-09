import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Lot } from '../utils/lots';
import { interpretLot } from '../utils/interpret';

const CHINESE_DIGITS = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];

const numberToChinese = (num: number) => {
  if (num === 100) return '一百';
  if (num <= 10) return num === 10 ? '十' : CHINESE_DIGITS[num];
  if (num < 20) return '十' + CHINESE_DIGITS[num % 10];
  return (
    CHINESE_DIGITS[Math.floor(num / 10)] +
    '十' +
    (num % 10 === 0 ? '' : CHINESE_DIGITS[num % 10])
  );
};

export default function Interpretation({
  question,
  lot,
  onRestart,
}: {
  question: string;
  lot: Lot;
  onRestart: () => void;
}) {
  const [interpretation, setInterpretation] = useState('');
  const [isInterpreting, setIsInterpreting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [serialNumber] = useState(() => Math.floor(Math.random() * 9000000 + 1000000));
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!hasStarted) return;

    let mounted = true;
    setIsInterpreting(true);
    setInterpretation('');

    const begin = async () => {
      const result = await interpretLot(question, lot);
      if (!mounted) return;

      let index = 0;
      intervalRef.current = window.setInterval(() => {
        index += 2;
        const next = result.slice(0, index);
        setInterpretation(next);
        if (next.length >= result.length) {
          if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsInterpreting(false);
        }
      }, 24);
    };

    void begin();

    return () => {
      mounted = false;
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [hasStarted, lot, question]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex h-full w-full flex-col overflow-hidden pb-2 pt-4"
    >
      <div className="flex-1 overflow-y-auto px-1 scrollbar-none">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ y: 42, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lot-paper relative mx-auto w-full max-w-[236px] shrink-0 bg-[#f2e6c4] px-3 pb-5 pt-6 text-[#1b1814] shadow-[0_16px_34px_rgba(1,10,18,0.4)]"
          >
            <div className="flex flex-col items-center">
              <div className="text-base tracking-[0.3em]">
                第{numberToChinese(lot.number)}签
              </div>
              <div className="mb-2 text-xs tracking-[0.6em]">存根</div>
              <div className="mb-3 w-full border-b border-dashed border-[#1b1814]/45" />
              <div className="mb-2 font-sans text-base tracking-[0.3em] text-[#a72f2a]">
                {serialNumber}
              </div>
              <div className="mb-1 text-sm tracking-[0.22em]">泉州天后宫</div>
              <div className="mb-4 text-base tracking-[0.55em]">签诗</div>
            </div>

            <div className="flex h-[318px] flex-row-reverse justify-between border border-[#1b1814]">
              <div className="flex w-1/5 flex-col items-center justify-between py-2">
                <div
                  className="text-sm tracking-[0.24em]"
                  style={{ writingMode: 'vertical-rl' }}
                >
                  第{numberToChinese(lot.number)} · {lot.hexagram}
                </div>
                <div
                  className="text-xs tracking-[0.22em] opacity-75"
                  style={{ writingMode: 'vertical-rl' }}
                >
                  {lot.omen}
                </div>
              </div>
              {lot.poem.map((line, index) => (
                <div
                  key={`${lot.number}-${index}`}
                  className="flex w-1/5 items-center justify-center py-3"
                >
                  <span
                    className="text-[0.92rem] tracking-[0.3em]"
                    style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}
                  >
                    {line}
                  </span>
                </div>
              ))}
            </div>

            {lot.story && (
              <div className="mt-3 border-t border-[#1b1814]/25 pt-2 text-center text-xs tracking-[0.12em] opacity-75">
                典故 · {lot.story}
              </div>
            )}
          </motion.div>

          {!hasStarted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-9 flex shrink-0 flex-col items-center gap-4"
            >
              <button
                type="button"
                onClick={() => setHasStarted(true)}
                className="ritual-btn ritual-btn-primary"
              >
                请天后解签
              </button>
              <p className="px-8 text-center text-xs leading-6 tracking-[0.16em] text-[#b9d2dc]/38">
                解签由天后签意生成，结合您所问之事
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 w-full shrink-0 rounded-sm border border-[#d4a858]/28 bg-[#071d35]/55 p-5 backdrop-blur-sm"
            >
              <h3 className="mb-5 text-center text-xl tracking-[0.3em] text-[#e4c17a]">
                天后解签
              </h3>
              <div className="markdown-body text-justify text-base leading-8 text-[#f5ead2]/88">
                <ReactMarkdown>{interpretation}</ReactMarkdown>
                {isInterpreting && (
                  <span className="ml-1 inline-block h-5 w-2 animate-pulse bg-[#e4c17a] align-middle" />
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {hasStarted && !isInterpreting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="shrink-0 pb-2 pt-7 text-center"
        >
          <button type="button" onClick={onRestart} className="ritual-btn">
            拜谢妈祖，再次求签
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
