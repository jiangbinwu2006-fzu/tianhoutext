import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import MoonBlock from './MoonBlock';

type Result = '圣杯' | '笑杯' | '阴杯' | null;

export default function Jiaobei({
  purpose,
  lotNumber,
  lotHexagram,
  onSuccess,
  onReturnToPray,
  onReturnToHome,
  onReturnToDrawLot,
}: {
  purpose: 'ask' | 'verify';
  lotNumber?: number;
  lotHexagram?: string;
  onSuccess: () => void;
  onReturnToPray: () => void;
  onReturnToHome: () => void;
  onReturnToDrawLot: () => void;
}) {
  const [result, setResult] = useState<Result>(null);
  const [isThrowing, setIsThrowing] = useState(false);
  const [message, setMessage] = useState('');
  const [b1Flat, setB1Flat] = useState(false);
  const [b2Flat, setB2Flat] = useState(false);

  const controls1 = useAnimation();
  const controls2 = useAnimation();

  useEffect(() => {
    if (purpose === 'ask') {
      setMessage('请掷筊，叩问妈祖是否允准赐签。');
    } else {
      setMessage(
        lotHexagram
          ? `抽得第 ${lotNumber} 签（${lotHexagram}），请掷筊请示是否为该签。`
          : `抽得第 ${lotNumber} 签，请掷筊请示是否为该签。`,
      );
    }
    setResult(null);
  }, [lotHexagram, lotNumber, purpose]);

  const throwBlocks = async () => {
    if (isThrowing) return;
    setIsThrowing(true);
    setResult(null);
    setMessage('掷筊中……');

    const rand = Math.random();
    let newResult: Result;
    let newB1Flat = false;
    let newB2Flat = false;

    if (rand < 0.5) {
      newResult = '圣杯';
      newB1Flat = true;
      newB2Flat = false;
    } else if (rand < 0.75) {
      newResult = '笑杯';
      newB1Flat = true;
      newB2Flat = true;
    } else {
      newResult = '阴杯';
      newB1Flat = false;
      newB2Flat = false;
    }

    setB1Flat(newB1Flat);
    setB2Flat(newB2Flat);

    const targetRotateX1 = newB1Flat ? 1440 : 1620;
    const targetRotateX2 = newB2Flat ? 1440 : 1620;

    controls1.start({
      y: [0, -220, 0],
      rotateX: [0, 720, targetRotateX1],
      rotateZ: [0, 220, 360],
      transition: { duration: 1.4, ease: 'easeInOut' },
    });

    await controls2.start({
      y: [0, -220, 0],
      rotateX: [0, 720, targetRotateX2],
      rotateZ: [0, 220, 360],
      transition: { duration: 1.4, ease: 'easeInOut' },
    });

    controls1.set({ rotateX: newB1Flat ? 0 : 180, rotateZ: 0 });
    controls2.set({ rotateX: newB2Flat ? 0 : 180, rotateZ: 0 });

    setResult(newResult);
    setIsThrowing(false);

    if (newResult === '圣杯') {
      setMessage(
        purpose === 'ask'
          ? '圣杯（一平一凸）。妈祖允准，可上前抽签。'
          : '圣杯（一平一凸）。妈祖允准，此签确定。',
      );
      window.setTimeout(onSuccess, 1900);
    } else if (newResult === '笑杯') {
      setMessage(
        purpose === 'ask'
          ? '笑杯（两平）。天后微笑不语，所问未明，请静心后再请示。'
          : '笑杯（两平）。此签未定，请重新摇签。',
      );
    } else {
      setMessage(
        purpose === 'ask'
          ? '阴杯（两凸）。此刻或非问签之时，请稍候静心，再行请示。'
          : '阴杯（两凸）。此签不允，请重新摇签。',
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex w-full flex-col items-center justify-center"
    >
      <div className="flex min-h-14 items-start px-3 text-center">
        <p className="text-lg leading-relaxed tracking-[0.08em] text-[#e1bd72]">
          {message}
        </p>
      </div>

      <div className="relative flex h-40 items-center justify-center space-x-8 pt-6 [perspective:1000px]">
        <motion.div
          animate={controls1}
          className="relative h-32 w-20 cursor-pointer [transform-style:preserve-3d]"
          onClick={throwBlocks}
          role="button"
          aria-label="掷出第一副圣杯"
        >
          <div className="absolute inset-0 [backface-visibility:hidden]">
            <MoonBlock isFlat={true} className="h-full w-full" />
          </div>
          <div
            className="absolute inset-0 [backface-visibility:hidden]"
            style={{ transform: 'rotateX(180deg)' }}
          >
            <MoonBlock isFlat={false} className="h-full w-full" />
          </div>
        </motion.div>

        <motion.div
          animate={controls2}
          className="relative h-32 w-20 cursor-pointer [transform-style:preserve-3d]"
          onClick={throwBlocks}
          role="button"
          aria-label="掷出第二副圣杯"
        >
          <div className="absolute inset-0 [backface-visibility:hidden]">
            <MoonBlock isFlat={true} flip={true} className="h-full w-full" />
          </div>
          <div
            className="absolute inset-0 [backface-visibility:hidden]"
            style={{ transform: 'rotateX(180deg)' }}
          >
            <MoonBlock isFlat={false} flip={true} className="h-full w-full" />
          </div>
        </motion.div>
      </div>

      <div className="mt-12 flex w-full max-w-xs flex-col items-center gap-3">
        {!isThrowing && result === null && (
          <button
            type="button"
            onClick={throwBlocks}
            className="ritual-btn ritual-btn-primary"
          >
            掷筊
          </button>
        )}

        {!isThrowing && result === '笑杯' && purpose === 'ask' && (
          <>
            <button
              type="button"
              onClick={throwBlocks}
              className="ritual-btn ritual-btn-primary"
            >
              再掷一次圣杯
            </button>
            <button
              type="button"
              onClick={onReturnToPray}
              className="ritual-btn"
            >
              返回修改问题
            </button>
          </>
        )}

        {!isThrowing && result === '阴杯' && purpose === 'ask' && (
          <>
            <button type="button" onClick={onReturnToPray} className="ritual-btn ritual-btn-primary">
              重新问签
            </button>
            <button type="button" onClick={onReturnToHome} className="ritual-btn">
              返回首页
            </button>
          </>
        )}

        {!isThrowing && result === '笑杯' && purpose === 'verify' && (
          <>
            <button
              type="button"
              onClick={onReturnToDrawLot}
              className="ritual-btn ritual-btn-primary"
            >
              重新摇签
            </button>
            <button type="button" onClick={onReturnToPray} className="ritual-btn">
              返回问事
            </button>
          </>
        )}

        {!isThrowing && result === '阴杯' && purpose === 'verify' && (
          <>
            <button
              type="button"
              onClick={onReturnToDrawLot}
              className="ritual-btn ritual-btn-primary"
            >
              重新摇签
            </button>
            <button type="button" onClick={onReturnToPray} className="ritual-btn">
              重新问签
            </button>
            <button type="button" onClick={onReturnToHome} className="ritual-btn">
              返回首页
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}
