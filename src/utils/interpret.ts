import { Lot } from './lots';

type Topic = {
  label: string;
  keys: RegExp;
  sign: string;
  advice: string;
};

const TOPICS: Topic[] = [
  {
    label: '行船远行',
    keys: /(出海|讨海|行舟|航行|船|远行|出差|旅行|旅游|移居|出外|水路)/,
    sign: '行舟',
    advice:
      '天后掌海上平安，此问宜把舵稳、看准风向再行。启程前多作准备，途中以缓进为上，遇事便知进退，自然一路清吉。',
  },
  {
    label: '事业前程',
    keys: /(事业|工作|求职|面试|跳槽|升职|升迁|创业|开店|生意|合作|项目|职场|官场)/,
    sign: '作事',
    advice:
      '此问重在守正与耐性。先把手边之事做扎实，机会自会在水到渠成处现形；与人合作时坦诚立约，莫贪捷径，前路自有舒展之时。',
  },
  {
    label: '学业功名',
    keys: /(学业|读书|考试|功名|升学|考研|考公|职称|录取|成绩|学校)/,
    sign: '功名',
    advice:
      '签意劝你收束心神、日积寸功。目前若觉进展缓慢，正应回头补足根基；考期临近更宜持静，答卷时心平手稳，自有水到之机。',
  },
  {
    label: '姻缘家事',
    keys: /(婚姻|姻缘|感情|恋爱|对象|结婚|伴侣|家庭|家人|夫妻|求子|子嗣)/,
    sign: '婚姻',
    advice:
      '天后以慈心看人间情缘。感情之事不可强求速成，先以真心相待、把话说开，缘熟时自然水到渠成；家中诸事亦以和顺为先。',
  },
  {
    label: '健康平安',
    keys: /(健康|身体|疾病|病|康健|康复|平安|不适|住院|检查)/,
    sign: '治病',
    advice:
      '健康之事宜信医、信己，也信静心调养。遵医嘱按时检查，同时放宽心怀、戒忧戒躁，身体自会慢慢回转。',
  },
  {
    label: '财利经营',
    keys: /(财运|求财|赚钱|收入|股票|基金|投资|借出|负债|钱财|金钱|生意)/,
    sign: '求财',
    advice:
      '签意不主暴利，而主细水长流。眼下宜量入为出、看准再动，不把希望押在一处；日常多积善缘，财路反而走得长远。',
  },
  {
    label: '官非口舌',
    keys: /(官司|诉讼|官非|口舌|是非|纠纷|投诉|仲裁|调解|得罪|冤屈)/,
    sign: '官事',
    advice:
      '此问宜以和为贵。证据与道理要放在明处，不必以硬碰硬；若能调解息争便早日收束，留些余地在后头。',
  },
  {
    label: '失物寻人',
    keys: /(失物|丢失|遗失|寻找|寻人|走失|下落|找回|宠物)/,
    sign: '失物',
    advice:
      '签意说此物并非无迹可寻。不妨回到最后出现之处仔细回想，也问问常来常往之人；心定下来，线索往往就在近旁。',
  },
];

function findTopic(question: string): Topic {
  return TOPICS.find((topic) => topic.keys.test(question)) ?? {
    label: '心中所愿',
    keys: /(.*)/,
    sign: '凡事',
    advice:
      '此问不必过分执着一时成败。签意劝你先把心放平、把眼前该做之事做好，再随缘而行；待到云开月朗，自有分明答案。',
  };
}

function findMeaningHint(lot: Lot, topic: Topic) {
  const lines = lot.meaning.split('\n');
  const direct = lines.find((line) => line.startsWith(`${topic.sign}：`));
  if (direct) return direct.slice(topic.sign.length + 1).replace(/[。；;]?$/, '。');

  const fallback = lines.find((line) => line.startsWith('凡事：'));
  return fallback ? fallback.slice(3).replace(/[。；;]?$/, '。') : '';
}

function localInterpretation(question: string, lot: Lot): string {
  const topic = findTopic(question);
  const hint = findMeaningHint(lot, topic);
  const general = lot.interpretation || lot.meaning.split('\n').slice(0, 8).join('。');
  const storyLine = lot.story ? `此签典故为「${lot.story}」。` : '';

  return [
    `**第 ${lot.number} 签 · ${lot.hexagram}签**`,
    '',
    `善信所问：「${question}」`,
    '',
    '此签大意：',
    general,
    '',
    `问${topic.label}：`,
    hint ? `签上写道：${hint}。` : '',
    topic.advice,
    '',
    storyLine,
    '妈祖庇佑，愿你心如明月、事随人意，所问皆有清吉回应。',
  ]
    .filter(Boolean)
    .join('\n');
}

const REMOTE_FALLBACK =
  '天后此刻正静观香火，未得明示。请稍后再试，或静心参悟签诗之意。妈祖庇佑，愿你平安顺遂。';

export async function interpretLot(question: string, lot: Lot): Promise<string> {
  try {
    const response = await fetch('/api/interpret', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, lot }),
    });

    if (!response.ok) throw new Error(`interpret api ${response.status}`);
    const data = (await response.json()) as { text?: string };
    return data?.text || localInterpretation(question, lot);
  } catch (error) {
    console.warn('Interpret API unavailable, using local interpretation.', error);
    return localInterpretation(question, lot);
  }
}

export { REMOTE_FALLBACK };
