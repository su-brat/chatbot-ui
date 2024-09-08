import { CHATBOT_API_URL } from "./constants";

const API = {
  GetChatbotResponse: async (message) => {
    try {
      if (message.trim().toLowerCase() == 'hi') {
        return "Hello! How can I help you?";
      }
      const response = await fetch(
        `${CHATBOT_API_URL}/ask?question="${message}"`
      );
      const conversation = await response.json();
      return conversation["answer"] ?? "Sorry, I didn't understand";
    } catch (err) {
      console.error(err);
      return "Sorry, I am currently unavailable";
    }
  },
};

export default API;
