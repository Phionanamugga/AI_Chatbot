import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import DocumentPicker from "react-native-document-picker";
import { analyzeImage } from "../api/openai";

const FileUpload = ({ onAnalysisComplete }) => {
  const [fileName, setFileName] = useState("");

  const selectFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      setFileName(result.name);

      // Analyze image
      const analysis = await analyzeImage(result.uri);
      onAnalysisComplete(analysis);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log("File selection cancelled");
      } else {
        console.error("Unknown error: ", error);
      }
    }
  };

  return (
    <View>
      <Button title="Upload Image" onPress={selectFile} />
      {fileName ? <Text>Selected: {fileName}</Text> : null}
    </View>
  );
};

export default FileUpload;