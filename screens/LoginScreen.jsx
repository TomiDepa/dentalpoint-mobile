import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setError("");
    try {
      const response = await fetch(`${API_URL}/api/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contrasena }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Email o contraseña incorrectos");

      const { token, usuario } = data;
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("usuario", JSON.stringify(usuario));

      if (usuario.rol === "usuario") {
        navigation.navigate("HomePaciente");
      } else if (usuario.rol === "admin") {
        navigation.navigate("HomeOdontologo");
      } else {
        setError("Rol desconocido");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DentalPoint</Text>
      <View style={styles.card}>
        <Text style={styles.titleForm}>Iniciar sesión</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0, color: 'black' }]} // Color negro en la contraseña
            placeholder="Contraseña"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            value={contrasena}
            onChangeText={setContrasena}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#555"
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>

        {error !== "" && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>

        <Text style={styles.registerText}>¿No tenés cuenta?</Text>
        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.buttonText}>Registrate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0090D0",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#F4F4F4",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
    alignItems: "center",
  },
  titleForm: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2592C5",
    marginBottom: 20,
    paddingTop: 10,
    paddingBottom: 10,
    textShadowColor: "#cce6f5",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#f4ffff",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    borderColor: "#a9d0ee",
    borderWidth: 2,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#0077b6",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  registerText: {
    marginTop: 35,
    marginBottom: 10,
    textAlign: "center",
    color: "#000",
    fontSize: 14,
  },
  buttonRegister: {
    width: "70%",
    height: 40,
    backgroundColor: "#0077b6",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
