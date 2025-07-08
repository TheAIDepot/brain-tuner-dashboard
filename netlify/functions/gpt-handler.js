exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      response: "✅ GPT function is connected and returning data!",
    }),
  };
};
