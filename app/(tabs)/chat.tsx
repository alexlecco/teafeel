import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { IconSymbol } from "@/components/ui/icon-symbol";

type Message = {
  id: string;
  text: string;
  sender: "ai" | "user";
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    text: "¡Hola! Soy tu Diseñador de Té.\n¿Cómo te sientes hoy? ¿Buscas relajarte, energía, o tienes alguna molestia?",
    sender: "ai",
  },
];

export default function ChatScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: "user",
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Mock AI response
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Entiendo. Como buscas energía, te recomendaré agregar a tu próximo "Teabox" nuestro Matcha Energético. Lo guardaré en tu perfil.',
        sender: "ai",
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          Diseñador de Té
        </Text>
      </View>

      <ScrollView
        style={styles.chatArea}
        contentContainerStyle={styles.chatContent}
      >
        {messages.map((msg) => {
          const isAi = msg.sender === "ai";
          return (
            <View
              key={msg.id}
              style={[
                styles.messageBubble,
                isAi ? styles.aiBubble : styles.userBubble,
                {
                  backgroundColor: isAi
                    ? colorScheme === "dark"
                      ? "#2A4032"
                      : "#F1F5EB"
                    : theme.tint,
                },
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  { color: isAi ? theme.text : "#FFF" },
                ]}
              >
                {msg.text}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      <View
        style={[
          styles.inputContainer,
          {
            borderTopColor: colorScheme === "dark" ? "#333" : "#EEE",
            backgroundColor: theme.background,
          },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            {
              color: theme.text,
              backgroundColor: colorScheme === "dark" ? "#111" : "#F8F9FA",
            },
          ]}
          placeholder="Escribe cómo te sientes..."
          placeholderTextColor={theme.icon}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity
          style={[styles.sendButton, { backgroundColor: theme.tint }]}
          onPress={sendMessage}
        >
          <IconSymbol name="arrow.up.circle.fill" size={32} color="#FFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 80,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
  },
  chatArea: {
    flex: 1,
  },
  chatContent: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    gap: 16,
  },
  messageBubble: {
    padding: 16,
    borderRadius: 20,
    maxWidth: "85%",
  },
  aiBubble: {
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 16,
    paddingBottom: Platform.OS === "ios" ? 32 : 16,
    borderTopWidth: 1,
    alignItems: "center",
    gap: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  sendButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
