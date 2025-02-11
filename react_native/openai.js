import axios from "axios";
import "react-native-dotenv";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const analyzeImage = async (fileUri) => {
  try {
    const file = {
      uri: fileUri,
      type: "image/jpeg", // Adjust based on file type
      name: "photo.jpg",
    };

    const formData = new FormData();
    formData.append("file", file);
    formData.append("purpose", "vision");

    const response = await axios.post("https://api.openai.com/v1/images/generate", formData, {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("OpenAI Vision API Error:", error);
    return { error: "Failed to analyze image." };
  }
};
