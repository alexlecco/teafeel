import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const MOCK_TEAS = [
  { id: "1", name: "Lady Grey", icon: "🫐", color: "#4A90E2", empty: false },
  { id: "2", name: "Pomegranate", icon: "🌺", color: "#D9534F", empty: false },
  {
    id: "3",
    name: "Lemon & Ginger",
    icon: "🍋",
    color: "#FCD116",
    empty: false,
  },
  { id: "4", name: "Wild Berries", icon: "🍓", color: "#8E44AD", empty: false },
  { id: "5", name: "Chai", icon: "🍂", color: "#D35400", empty: false },
  {
    id: "6",
    name: "Irish Breakfast",
    icon: "☕",
    color: "#27AE60",
    empty: false,
  },
  { id: "7", name: "Nightly Calm", icon: "🌙", color: "#5DADE2", empty: false },
  { id: "8", name: "Green Tea", icon: "🍃", color: "#2ECC71", empty: false },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Tu Teabox</Text>
        <Text style={[styles.subtitle, { color: theme.icon }]}>
          Aquí tienes tu selección actual en la caja organizadora.
        </Text>
      </View>

      <View style={styles.boxWrapper}>
        <View style={styles.woodenBoxEdge}>
          <View style={styles.woodenBoxInner}>
            {MOCK_TEAS.map((tea, index) => (
              <View
                key={tea.id}
                style={[
                  styles.compartment,
                  // Add specific borders to mimic the wooden dividers based on position (2 columns)
                  index % 2 !== 1 && {
                    borderRightWidth: 4,
                    borderRightColor: "#B08D6A",
                  },
                  index < 6 && {
                    borderBottomWidth: 4,
                    borderBottomColor: "#B08D6A",
                  },
                ]}
              >
                <View
                  style={[styles.teaPacket, { backgroundColor: tea.color }]}
                >
                  <View style={styles.teaPacketInner}>
                    <Text style={styles.teaIcon}>{tea.icon}</Text>
                    <Text style={styles.teaName} numberOfLines={2}>
                      {tea.name}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
          {/* Drawer section simulation */}
          <View style={styles.drawerSection}>
            <View style={styles.drawerHandle} />
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.refeelButton, { backgroundColor: theme.tint }]}
      >
        <Text style={styles.refeelButtonText}>re-feel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: "#F8F9FA",
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  boxWrapper: {
    paddingHorizontal: 10,
    marginBottom: 50,
    alignItems: "center",
  },
  woodenBoxEdge: {
    width: width - 20,
    backgroundColor: "#C8A17A", // Outer wood color
    borderRadius: 8,
    borderWidth: 6,
    borderColor: "#A47D58", // Darker wood edge
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    overflow: "hidden",
  },
  woodenBoxInner: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#D1AB84", // Inner wood base
  },
  compartment: {
    width: "50%", // 2 columns
    aspectRatio: 1.1, // Slightly wider to fit nicely
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    // Base shadow to create depth for the compartment
  },
  teaPacket: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  teaPacketInner: {
    flex: 1,
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  teaIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  teaName: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
    textTransform: "uppercase",
  },
  drawerSection: {
    height: 30,
    width: "100%",
    backgroundColor: "#B5906A",
    borderTopWidth: 2,
    borderTopColor: "#937050",
    justifyContent: "center",
    alignItems: "center",
  },
  drawerHandle: {
    width: 60,
    height: 8,
    backgroundColor: "#866444",
    borderRadius: 4,
  },
  refeelButton: {
    marginHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 60,
    shadowColor: "#88A87E",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 6,
  },
  refeelButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
