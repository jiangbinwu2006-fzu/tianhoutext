type Env = {
  DEEPSEEK_API_KEY?: string;
  DEEPSEEK_MODEL?: string;
};

type Context = {
  request: Request;
  env: Env;
};

type LotData = {
  number?: number;
  hexagram?: string;
  poem?: string[];
  meaning?: string;
  interpretation?: string;
  story?: string;
};

const FALLBACK =
  "天后此刻正静观香火，未得明示。请稍后再试，或静心参悟签诗之意。妈祖庇佑，愿你平安顺遂。";

function buildPrompt(question: string, lot: LotData): string {
  return `
你是泉州天后宫中一位深谙签理、慈悲温厚的解签师，熟悉妈祖天后灵签的典故与民俗。
一位香客带着诚心来求签，他/她的问题是：“${question}”
神明赐下第${lot.number}签，签名为${lot.hexagram || ''}，签诗为：
${(lot.poem || []).join("，")}。
传统签意摘录：${lot.meaning || ''}
签诗释义：${lot.interpretation || ''}
${lot.story ? `此签的典故是：${lot.story}` : ""}

请你作为天后庙中的解签师，用温和、抚慰、有传统文化温度的语气，为这位香客解签。
要求：
1. 称呼对方为“善信”或“香客”，语气像一位和善的长者。
2. 结合他/她问的具体事项，将签文意象与海上平安、进退有时等天后文化联系起来。
3. 给出具体、可执行且充满善意的建议。
4. 结尾给予祝福，如“妈祖庇佑，愿你顺风顺水，所求皆得清吉”。
5. 篇幅适中，分段清晰，不要过度冗长。
`;
}

function json(obj: unknown, status = 200): Response {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function onRequestPost({ request, env }: Context): Promise<Response> {
  const key = env.DEEPSEEK_API_KEY;
  const model = env.DEEPSEEK_MODEL || "deepseek-chat";

  if (!key) {
    return json({ text: FALLBACK, error: "DEEPSEEK_API_KEY not configured" }, 500);
  }

  let body: { question?: string; lot?: LotData };
  try {
    body = (await request.json()) as { question?: string; lot?: LotData };
  } catch {
    return json({ text: FALLBACK, error: "invalid json" }, 400);
  }

  const prompt = buildPrompt(body.question || "", body.lot || {});

  try {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: prompt }],
        max_tokens: 2200,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return json({ text: FALLBACK, error: errorText.slice(0, 500) }, 502);
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text: string = data?.choices?.[0]?.message?.content || FALLBACK;
    return json({ text });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return json({ text: FALLBACK, error: message }, 500);
  }
}
