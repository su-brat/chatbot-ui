import { CHATBOT_API_URL } from "./constants";

const greetMessages = ["hi", "hello"];

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
      const endpoint = `${CHATBOT_API_URL}/ask?question=${message}&fallback=llm`;
      const response = await fetch(endpoint);
      const conversation = await response.json();
      return conversation["answer"] ?? "Sorry, I didn't understand";
    } catch (err) {
      console.error(err);
      return "Sorry, I am currently unavailable";
    }
  },
};

export default API;
