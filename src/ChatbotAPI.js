import { CHATBOT_API_URL, RESPONSE_CONFIDENCE_THRESHOLD } from "./constants";

const greetMessages = ["hi", "hello"];

const parseAPIResponse = async (response) => {
  const data = await response.json();
  if (response.ok) {
    const answers = data["answers"];
    const validAnswers = answers.filter((answer) => answer["answer"].trim() !== "");
    console.log(validAnswers);
    if (validAnswers.length > 0 && validAnswers[0]["score"] > RESPONSE_CONFIDENCE_THRESHOLD) {
      return validAnswers[0]["answer"];
    } else {
      return "Sorry, I either did not understand or cannot answer that";
    }
  } else {
    console.error(data);
    return "Sorry, I am currently unavailable";
  }
}

const API = {
  GetChatbotResponse: async (message) => {
    try {
      if (
        greetMessages
          .map((value) => value.toLowerCase())
          .includes(message.trim().toLowerCase())
      ) {
        return "Hello! How can I help you?";
      }
      const endpoint = `${CHATBOT_API_URL}/query`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: message,
          params: {},
          debug: false,
        }),
      });
      return parseAPIResponse(response);
    } catch (err) {
      console.error(err);
      return "Sorry, I am currently unavailable";
    }
  },
};

export default API;
