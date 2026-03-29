import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React, { useState, useRef } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Image,
} from "react-native";

const { width } = Dimensions.get("window");

const MOCK_TEAS = [
  { id: "1", name: "Lady Grey", icon: "🫐", color: "#4A90E2", empty: false, ingredients: ["Té Negro", "Piel de Naranja", "Piel de Limón", "Bergamota"], prepMode: "Infundir 3 mins en agua a 100°C", emojis: "🫖🍋✨", origin: "Reino Unido", images: ["https://images.unsplash.com/photo-1576092762791-dd9e2220abd4?w=400&q=80", "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?w=400&q=80", "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80"] },
  { id: "2", name: "Pomegranate", icon: "🌺", color: "#D9534F", empty: false, ingredients: ["Té Blanco", "Granada", "Rosa", "Hibisco"], prepMode: "Infundir 4 mins en agua a 80°C", emojis: "🌺💧🩸", origin: "especialidad", images: ["https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80", "https://images.unsplash.com/photo-1576092762791-dd9e2220abd4?w=400&q=80", "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&q=80"] },
  { id: "3", name: "Lemon & Ginger", icon: "🍋", color: "#FCD116", empty: false, ingredients: ["Jengibre", "Limón", "Manzana", "Zarzamora"], prepMode: "Infundir 5 mins en agua a 100°C", emojis: "🍋✨🌿", origin: "Asia / especialidad", images: ["https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80", "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?w=400&q=80", "https://images.unsplash.com/photo-1576092762791-dd9e2220abd4?w=400&q=80"] },
  { id: "4", name: "Wild Berries", icon: "🍓", color: "#8E44AD", empty: false, ingredients: ["Frambuesa", "Fresa", "Cereza", "Hibisco"], prepMode: "Infundir 5 mins en agua a 100°C", emojis: "🍓🫐🍒", origin: "especialidad", images: ["https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?w=400&q=80", "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80", "https://images.unsplash.com/photo-1576092762791-dd9e2220abd4?w=400&q=80"] },
  { id: "5", name: "Chai", icon: "🍂", color: "#D35400", empty: false, ingredients: ["Té Negro", "Canela", "Cardamomo", "Clavo"], prepMode: "Infundir 5 mins en agua a 100°C (con leche opcional)", emojis: "☕🍂🔥", origin: "India", images: ["https://images.unsplash.com/photo-1576092762791-dd9e2220abd4?w=400&q=80", "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80", "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80"] },
  { id: "6", name: "Irish Breakfast", icon: "☕", color: "#27AE60", empty: false, ingredients: ["Mezcla de Tés Negros Assam y Ceylan"], prepMode: "Infundir 4 mins en agua a 100°C", emojis: "☀️☕💪", origin: "Irlanda / especialidad", images: ["https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80", "https://images.unsplash.com/photo-1576092762791-dd9e2220abd4?w=400&q=80", "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?w=400&q=80"] },
  { id: "7", name: "Nightly Calm", icon: "🌙", color: "#5DADE2", empty: false, ingredients: ["Manzanilla", "Hierbabuena", "Azahar"], prepMode: "Infundir 5 mins en agua a 100°C", emojis: "🌙💤🌿", origin: "especialidad", images: ["https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?w=400&q=80", "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80", "https://images.unsplash.com/photo-1576092762791-dd9e2220abd4?w=400&q=80"] },
  { id: "8", name: "Green Tea", icon: "🍃", color: "#2ECC71", empty: false, ingredients: ["100% Té Verde puro"], prepMode: "Infundir 2 mins en agua a 80°C", emojis: "🍵🍃🧘", origin: "China", images: ["https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80", "https://images.unsplash.com/photo-1576092762791-dd9e2220abd4?w=400&q=80", "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&q=80"] },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const [isBoxOpen, setIsBoxOpen] = useState(true);
  
  const [selectedTea, setSelectedTea] = useState<typeof MOCK_TEAS[0] | null>(null);
  const expandAnim = useRef(new Animated.Value(0)).current;

  // Default slogan para la demostración
  const slogan = "El arte del bienestar, en cada sorbo";

  const openTeaDetails = (tea: typeof MOCK_TEAS[0]) => {
    setSelectedTea(tea);
    Animated.timing(expandAnim, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  const closeTeaDetails = () => {
    // Vuelve sin animación como solicitado
    setSelectedTea(null);
    expandAnim.setValue(0);
  };

  return (
    <View style={{ flex: 1 }}>
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Tu Teabox</Text>
        <Text style={[styles.subtitle, { color: theme.icon }]}>
          Aquí tienes tu selección actual en la caja organizadora o teabox ☕.
        </Text>
      </View>

      <View style={styles.boxWrapper}>
        <View style={styles.woodenBoxEdge}>
          {isBoxOpen ? (
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
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => openTeaDetails(tea)}
                    style={[styles.teaPacket, { backgroundColor: tea.color }]}
                  >
                    <View style={styles.teaPacketInner}>
                      <Text style={styles.teaIcon}>{tea.icon}</Text>
                      <Text style={styles.teaName} numberOfLines={2}>
                        {tea.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.woodenLid}>
              {/* Engraved Logo Simulation */}
              <View style={styles.engravedLogo}>
                <Text style={styles.engravedTeafeel}>teafeel</Text>
                <Text style={styles.engravedSlogan}>"{slogan}"</Text>
              </View>
            </View>
          )}

          {/* Drawer section simulation - Now clickable */}
          <TouchableOpacity 
            style={styles.drawerSection} 
            activeOpacity={0.7}
            onPress={() => setIsBoxOpen(!isBoxOpen)}
          >
            <View style={styles.drawerHandle} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.refeelButton, { backgroundColor: theme.tint }]}
      >
        <Text style={styles.refeelButtonText}>re-feel</Text>
      </TouchableOpacity>
      </ScrollView>

      {/* Tea Detail Modal Overlay */}
      {selectedTea && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: selectedTea.color,
              zIndex: 999,
              opacity: expandAnim,
            },
          ]}
        >
          {/* Main expanded content */}
          <ScrollView contentContainerStyle={styles.detailContainer}>
            <TouchableOpacity onPress={closeTeaDetails} style={styles.backButton}>
              <Text style={styles.backButtonText}>← Volver</Text>
            </TouchableOpacity>

            <View style={styles.detailHeader}>
              <Text style={styles.detailTitle}>{selectedTea.name}</Text>
              <Text style={styles.detailEmojis}>{selectedTea.emojis}</Text>
            </View>

            <ScrollView 
              horizontal 
              pagingEnabled 
              showsHorizontalScrollIndicator={false}
              style={styles.imageCarousel}
            >
              {selectedTea.images.map((img, i) => (
                <Image key={i} source={{ uri: img }} style={styles.carouselImage} />
              ))}
            </ScrollView>

            <View style={styles.infoCard}>
              <Text style={styles.infoSectionTitle}>Orígen</Text>
              <Text style={styles.infoText}>{selectedTea.origin}</Text>

              <Text style={styles.infoSectionTitle}>Modo de preparación</Text>
              <Text style={styles.infoText}>⏱ {selectedTea.prepMode}</Text>

              <Text style={styles.infoSectionTitle}>Ingredientes</Text>
              {selectedTea.ingredients.map((ing, i) => (
                <Text key={i} style={styles.infoIngredient}>• {ing}</Text>
              ))}
            </View>
          </ScrollView>
        </Animated.View>
      )}
    </View>
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
  woodenLid: {
    width: "100%",
    aspectRatio: 0.55, // Approximately the same height as the 4x2 grid
    backgroundColor: "#C39A73", // Smooth wood lid
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  engravedLogo: {
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.8, // Make it look carved/engraved
  },
  engravedTeafeel: {
    fontSize: 42,
    fontWeight: "900",
    color: "#6D4C3D", // Very dark wood color
    letterSpacing: -1,
    marginBottom: 10,
    textShadowColor: 'rgba(255, 255, 255, 0.2)', // Fake highlight
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  engravedSlogan: {
    fontSize: 16,
    color: "#7E5C49",
    fontWeight: "600",
    fontStyle: "italic",
    textAlign: "center",
    paddingHorizontal: 30,
    textShadowColor: 'rgba(255, 255, 255, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
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
  detailContainer: {
    padding: 24,
    paddingTop: 80,
    paddingBottom: 60,
  },
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(0,0,0,0.15)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "700",
  },
  detailHeader: {
    alignItems: "center",
    marginBottom: 30,
  },
  detailTitle: {
    fontSize: 48,
    fontWeight: "900",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 8,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  detailEmojis: {
    fontSize: 32,
  },
  imageCarousel: {
    marginBottom: 30,
  },
  carouselImage: {
    width: width - 80,
    height: 250,
    borderRadius: 20,
    marginRight: 16,
  },
  infoCard: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  infoSectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#333",
    marginTop: 16,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },
  infoIngredient: {
    fontSize: 16,
    color: "#444",
    marginTop: 2,
    marginLeft: 8,
  },
});
