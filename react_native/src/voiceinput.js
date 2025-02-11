import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import Voice from "@react-native-voice/voice";
import { Mic, MicOff } from "lucide-react-native";

const VoiceInput = ({ onVoiceResult }) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);

  const startListening = async () => {
    try {
      setIsListening(true);
      setError(null);
      Voice.onSpeechResults = (event) => {
        onVoiceResult(event.value[0]); // Capture first result
        setIsListening(false);
      };
      Voice.onSpeechError = (event) => {
        setError(event.error.message);
        setIsListening(false);
      };
      await Voice.start("auto"); // Auto-detects the language
    } catch (err) {
      setError(err.message);
      setIsListening(false);
    }
  };

  const stopListening = async () => {
    await Voice.stop();
    setIsListening(false);
  };

  return (
    <TouchableOpacity onPress={isListening ? stopListening : startListening} style={styles.button}>
      {isListening ? <MicOff size={24} color="red" /> : <Mic size={24} color="green" />}
      {isListening && <ActivityIndicator size="small" color="red" />}
      {error && <Text style={styles.error}>{error}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: { padding: 10, alignItems: "center" },
  error: { color: "red", fontSize: 12, marginTop: 5 },
});

export default VoiceInput;