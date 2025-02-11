import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TTSButton from "./TTSButton";

const ChatBubble = ({ sender, message }) => {
  return (
    <View style={[styles.bubble, sender === "bot" ? styles.botBubble : styles.userBubble]}>
      <Text style={styles.text}>{message}</Text>
      {sender === "bot" && <TTSButton text={message} />}
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: "80%",
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#007bff",
  },
  botBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#e3e3e3",
  },
  text: {
    color: "#000",
  },
});

export default ChatBubble;