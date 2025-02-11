import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import VoiceInput from "./VoiceInput";

const ChatInput = ({ onSend }) => {
  const [text, setText] = useState("");
  const { t } = useTranslation();

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <View style={styles.container}>
      <VoiceInput onVoiceResult={(voiceText) => setText(voiceText)} />
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder={t("typeHere")}
      />
      <Button title={t("send")} onPress={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
});

export default ChatInput;