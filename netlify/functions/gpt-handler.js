const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.handler = async (event) => {
  try {
    const { prompt } = JSON.parse(event.body || "{}");

    if (!prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ response: "No prompt provided." }),
      };
    }

    const chat = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an expert brainwave frequency guide and focus coach." },
        { role: "user", content: prompt },
      ],
    });

    const reply = chat.choices?.[0]?.message?.content || "⚠️ GPT returned no reply.";

    return {
      statusCode: 200,
      body: JSON.stringify({ response: reply }),
    };
  } catch (err) {
    console.error("GPT function error:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ response: "❌ Server error: " + err.message }),
    };
  }
};
