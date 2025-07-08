// File: /.netlify/functions/gpt-handler.js

const { Configuration, OpenAIApi } = require("openai");

exports.handler = async function (event, context) {
  const { prompt } = JSON.parse(event.body);

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a productivity-focused AI coach helping users improve mental clarity using sound frequencies, focus habits, and light neuroscience.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const message = completion.data.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ response: message }),
    };
  } catch (error) {
    console.error("GPT Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ response: "Something went wrong talking to GPT." }),
    };
  }
};
