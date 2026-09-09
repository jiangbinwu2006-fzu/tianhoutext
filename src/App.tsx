import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Intro from './components/Intro';
import Pray from './components/Pray';
import Jiaobei from './components/Jiaobei';
import Qiantong from './components/Qiantong';
import Interpretation from './components/Interpretation';
import SceneBackdrop from './components/SceneBackdrop';
import { Lot, getRandomLot } from './utils/lots';

type Step =
  | 'INTRO'
  | 'PRAY'
  | 'ASK_PERMISSION'
  | 'DRAW_LOT'
  | 'VERIFY_LOT'
  | 'INTERPRETATION';

function App() {
  const [step, setStep] = useState<Step>('INTRO');
  const [question, setQuestion] = useState('');
  const [drawnLot, setDrawnLot] = useState<Lot | null>(null);

  const handleStart = () => setStep('PRAY');

  const handlePraySubmit = (q: string) => {
    setQuestion(q);
    setStep('ASK_PERMISSION');
  };

  const handlePermissionGranted = () => setStep('DRAW_LOT');

  const handleLotDrawn = () => {
    setDrawnLot(getRandomLot());
    setStep('VERIFY_LOT');
  };

  const handleLotVerified = () => setStep('INTERPRETATION');

  const handleRestart = () => {
    setStep('INTRO');
    setQuestion('');
    setDrawnLot(null);
  };

  const handleReturnToPray = () => setStep('PRAY');

  const handleReturnToHome = () => {
    setStep('INTRO');
    setQuestion('');
    setDrawnLot(null);
  };

  const handleReturnToDrawLot = () => {
    setDrawnLot(null);
    setStep('DRAW_LOT');
  };

  return (
    <div className="scene-root text-[#f5ead2] selection:bg-[#b0332d]/35">
      <SceneBackdrop />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center px-6 py-8 sm:px-8">
        <AnimatePresence mode="wait">
          {step === 'INTRO' && <Intro key="intro" onStart={handleStart} />}
          {step === 'PRAY' && (
            <Pray key="pray" onSubmit={handlePraySubmit} initialQuestion={question} />
          )}
          {step === 'ASK_PERMISSION' && (
            <Jiaobei
              key="ask"
              purpose="ask"
              onSuccess={handlePermissionGranted}
              onReturnToPray={handleReturnToPray}
              onReturnToHome={handleReturnToHome}
              onReturnToDrawLot={handleReturnToDrawLot}
            />
          )}
          {step === 'DRAW_LOT' && <Qiantong key="draw" onDrawn={handleLotDrawn} />}
          {step === 'VERIFY_LOT' && (
            <Jiaobei
              key="verify"
              purpose="verify"
              lotNumber={drawnLot?.number}
              lotHexagram={drawnLot?.hexagram}
              onSuccess={handleLotVerified}
              onReturnToPray={handleReturnToPray}
              onReturnToHome={handleReturnToHome}
              onReturnToDrawLot={handleReturnToDrawLot}
            />
          )}
          {step === 'INTERPRETATION' && drawnLot && (
            <Interpretation
              key="interpret"
              question={question}
              lot={drawnLot}
              onRestart={handleRestart}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
