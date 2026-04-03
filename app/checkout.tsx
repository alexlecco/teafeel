import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CheckoutScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const router = useRouter();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Checkout</Text>
      </View>

      <View
        style={[
          styles.card,
          { backgroundColor: colorScheme === "dark" ? "#1A251C" : "#FFF" },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Resumen del re-feel
        </Text>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.text }]}>
            Teabox Mensual (8 unidades)
          </Text>
          <Text style={[styles.value, { color: theme.text }]}>$24.00</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.text }]}>
            Envío estándar
          </Text>
          <Text style={[styles.value, { color: theme.text }]}>$4.50</Text>
        </View>
        <View
          style={[
            styles.divider,
            { backgroundColor: theme.tint, opacity: 0.2 },
          ]}
        />
        <View style={styles.row}>
          <Text style={[styles.totalLabel, { color: theme.text }]}>Total</Text>
          <Text style={[styles.totalValue, { color: theme.text }]}>$28.50</Text>
        </View>
      </View>

      <View
        style={[
          styles.card,
          { backgroundColor: colorScheme === "dark" ? "#1A251C" : "#FFF" },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Método de Pago
        </Text>
        <TouchableOpacity
          style={[styles.paymentMethod, { borderColor: theme.tint }]}
        >
          <Text style={[styles.paymentMethodText, { color: theme.text }]}>
            💳 Tarjeta de Crédito (terminada en 4242)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paymentMethod, { borderColor: "#E2E8F0" }]}
        >
          <Text style={[styles.paymentMethodText, { color: theme.icon }]}>
            + Añadir nuevo método
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.payButton, { backgroundColor: theme.tint }]}
      >
        <Text style={styles.payButtonText}>Confirmar y Pagar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 60,
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    padding: 10,
    marginRight: 10,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
  },
  card: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: "800",
  },
  totalValue: {
    fontSize: 24,
    fontWeight: "900",
  },
  paymentMethod: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
  },
  paymentMethodText: {
    fontSize: 16,
    fontWeight: "600",
  },
  payButton: {
    width: "100%",
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 60,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 6,
  },
  payButtonText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "800",
  },
});
