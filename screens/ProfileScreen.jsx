import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Header from "../components/Header";

export default function ProfileScreen() {
  const [nombre, setNombre] = useState("Tomas");
  const [apellido, setApellido] = useState("De Paulo");
  const [dni, setDni] = useState("12345678");
  const [email, setEmail] = useState("tomas@ejemplo.com");

  const handleSave = () => {
    console.log({ nombre, apellido, dni, email });
  };

  return (
    <View style={styles.container}>
      <Header title="Mi Perfil" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.bodyContainer}>
          <View style={styles.card}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
              placeholder="Nombre"
              placeholderTextColor="#888"
            />

            <Text style={styles.label}>Apellido</Text>
            <TextInput
              style={styles.input}
              value={apellido}
              onChangeText={setApellido}
              placeholder="Apellido"
              placeholderTextColor="#888"
            />

            <Text style={styles.label}>DNI</Text>
            <TextInput
              style={styles.input}
              value={dni}
              onChangeText={setDni}
              placeholder="DNI"
              placeholderTextColor="#888"
              keyboardType="numeric"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor="#888"
              keyboardType="email-address"
            />

            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Guardar cambios</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0090D0", // Fondo sólido
  },
  bodyContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderBottomEndRadius: 16,
    borderBottomStartRadius: 16,
    padding: 18,
  },
  label: {
    color: "#f4f4f4",
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    color: "#000",
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
