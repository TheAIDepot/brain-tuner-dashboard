const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const { prompt } = JSON.parse(event.body || "{}");

    if (!prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ response: "No prompt provided." }),
      };
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://brain-tuner-dashboard.netlify.app", // required
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct:free",
        messages: [
          { role: "system", content: "You are a brain frequency expert and personalized focus coach." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 200
      })
    });

    const data = await response.json();

    if (data.error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ response: `❌ OpenRouter Error: ${data.error.message}` }),
      };
    }

    const reply = data.choices?.[0]?.message?.content || "⚠️ No reply from model.";

    return {
      statusCode: 200,
      body: JSON.stringify({ response: reply }),
    };
  } catch (err) {
    console.error("GPT handler error:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ response: "❌ Server error: " + err.message }),
    };
  }
};

