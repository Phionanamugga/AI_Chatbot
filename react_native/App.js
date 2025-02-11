import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { View, Button } from "react-native";
import ChatScreen from "./src/screens/ChatScreen";

i18next
  .use(HttpBackend)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    backend: { loadPath: "/locales/{{lng}}.json" },
  });

const Stack = createStackNavigator();

const App = () => {
  const changeLanguage = (lng) => i18next.changeLanguage(lng);

  return (
    <I18nextProvider i18n={i18next}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="AI Chat" component={ChatScreen} />
        </Stack.Navigator>
        <View style={{ flexDirection: "row", justifyContent: "center", padding: 10 }}>
          <Button title="🇬🇧 English" onPress={() => changeLanguage("en")} />
          <Button title="🇩🇪 Deutsch" onPress={() => changeLanguage("de")} />
          <Button title="🇫🇷 Français" onPress={() => changeLanguage("fr")} />
        </View>
      </NavigationContainer>
    </I18nextProvider>
  );
};

export default App;