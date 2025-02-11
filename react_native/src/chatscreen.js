import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";
import FileUpload from "../components/FileUpload";
import axios from "axios";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (text) => {
    const newMessages = [...messages, { sender: "user", message: text }];
    setMessages(newMessages);

    try {
      let response;
      if (text.startsWith("search:")) {
        const query = text.replace("search:", "").trim();
        response = await axios.post("http://localhost:5000/search", { query });
        setMessages([...newMessages, { sender: "bot", message: response.data.results[0].title }]);
      } else if (text.startsWith("scrape:")) {
        const url = text.replace("scrape:", "").trim();
        response = await axios.post("http://localhost:5000/scrape", { url });
        setMessages([...newMessages, { sender: "bot", message: response.data.content }]);
      } else {
        response = await axios.post("http://localhost:5000/chat", { message: text });
        setMessages([...newMessages, { sender: "bot", message: response.data.reply }]);
      }
    } catch (error) {
      setMessages([...newMessages, { sender: "bot", message: "Error: " + error.message }]);
    }
  };

  const handleImageAnalysis = (analysis) => {
    setMessages([...messages, { sender: "bot", message: analysis.description || "No details found." }]);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.chatContainer}>
        {messages.map((msg, index) => (
          <ChatBubble key={index} sender={msg.sender} message={msg.message} />
        ))}
      </ScrollView>
      <FileUpload onAnalysisComplete={handleImageAnalysis} />
      <ChatInput onSend={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4" },
  chatContainer: { padding: 10 },
});

export default ChatScreen;