import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Pray({
  onSubmit,
  initialQuestion = '',
}: {
  onSubmit: (q: string) => void;
  initialQuestion?: string;
}) {
  const [question, setQuestion] = useState(initialQuestion);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (question.trim()) onSubmit(question.trim());
  };

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(8px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(8px)' }}
      transition={{ duration: 0.7 }}
      className="w-full max-w-sm"
    >
      <form onSubmit={handleSubmit} className="flex flex-col items-stretch gap-8">
        <div className="text-center">
          <h2 className="text-2xl tracking-[0.3em] text-[#e1bd72]">禀明天后</h2>
          <p className="mt-3 text-sm leading-7 tracking-[0.08em] text-[#b9d2dc]/68">
            默念您的姓名、生辰与所求之事
          </p>
        </div>

        <textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="信士 / 信女，今有要事求问：……"
          className="h-44 w-full resize-none border-b border-[#d4a858]/30 bg-transparent p-4 text-center text-base leading-8 text-[#f5ead2] outline-none transition-colors duration-500 placeholder:text-[#f5ead2]/20 focus:border-[#d4a858]/85"
          autoFocus
        />

        <p className="text-center text-xs tracking-[0.28em] text-[#b9d2dc]/35">
          敬心正念 · 一愿一问
        </p>

        <button
          type="submit"
          disabled={!question.trim()}
          className="ritual-btn ritual-btn-primary self-center"
        >
          敬香请示
        </button>
      </form>
    </motion.div>
  );
}
