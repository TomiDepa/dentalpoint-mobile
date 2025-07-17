import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import Header from "../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from '../config';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const cargarDatos = async () => {
      const userData = await AsyncStorage.getItem('usuario');
      if (userData) {
        const user = JSON.parse(userData);
        setNombre(user.nombre || "");
        setApellido(user.apellido || "");
        setDni(user.dni || "");
        setEmail(user.email || "");
      }
    };
    cargarDatos();
  }, []);

  const handleSave = async () => {
  try {
    const userDataString = await AsyncStorage.getItem('usuario');
    const token = await AsyncStorage.getItem('token');
    if (!userDataString || !token) {
      Alert.alert("Error", "No se pudo obtener la sesión");
      return;
    }

    const userData = JSON.parse(userDataString);
    const userId = userData.id;

    const response = await fetch(`${API_URL}/api/usuarios/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        nombre,
        apellido,
        dni,
        rol: userData.rol,
        localidad: userData.localidad,
        telefono: userData.telefono
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // actualizo AsyncStorage
      const updatedUser = { ...userData, nombre, apellido, dni, email };
      await AsyncStorage.setItem('usuario', JSON.stringify(updatedUser));
      Alert.alert("✅ Éxito", "Datos actualizados correctamente");
    } else {
      console.log(data);
      Alert.alert("Error", data.error || "No se pudo actualizar");
    }
  } catch (error) {
    console.log(error);
    Alert.alert("Error", "Error de red");
  }
};


  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
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

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0090D0" },
  bodyContainer: { flexGrow: 1, paddingHorizontal: 16, paddingBottom: 30 },
  card: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderBottomEndRadius: 16,
    borderBottomStartRadius: 16,
    padding: 18,
  },
  label: { color: "#f4f4f4", fontWeight: "600", marginBottom: 6, marginTop: 10 },
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
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  logoutButton: {
    backgroundColor: "#FF3B30",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  logoutButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
