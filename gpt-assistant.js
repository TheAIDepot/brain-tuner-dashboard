// File: gpt-assistant.js

const chatForm = document.getElementById("gpt-form");
const chatInput = document.getElementById("gpt-input");
const chatResponse = document.getElementById("gpt-response");

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userInput = chatInput.value.trim();
  if (!userInput) return;

  chatResponse.textContent = "Thinking...";

  try {
    const res = await fetch("/.netlify/functions/gpt-handler", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: userInput }),
    });

    const data = await res.json();
    chatResponse.textContent = data.response;
  } catch (err) {
    console.error(err);
    chatResponse.textContent = "Error: Something went wrong.";
  }
});

// Updated snippet to catch bad JSON or GPT errors
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userInput = chatInput.value.trim();
  if (!userInput) return;

  chatResponse.textContent = "Thinking...";

  try {
    const res = await fetch("/.netlify/functions/gpt-handler", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: userInput }),
    });

    const data = await res.json();

    if (data?.response) {
      chatResponse.textContent = data.response;
    } else {
      chatResponse.textContent = "🤔 No clear answer. Try asking again differently.";
    }
  } catch (err) {
    console.error("GPT fetch error:", err);
    chatResponse.textContent = "⚠️ Error: GPT may be down or misconfigured.";
  }
});
