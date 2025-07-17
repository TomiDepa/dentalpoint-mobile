import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { API_URL } from "../config";

export default function RegisterScreen({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
  if (!nombre || !apellido || !email || !dni || !password || !confirmPassword) {
    return Alert.alert("Error", "Completá todos los campos");
  }

  if (password.length < 6) {
    return Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres");
  }

  if (password !== confirmPassword) {
    return Alert.alert("Error", "Las contraseñas no coinciden");
  }

  setLoading(true);

  const newUser = {
    nombre,
    apellido,
    email,
    contrasena: password,
    dni,
    rol: "usuario",
    categoria: "general",
    localidad: "",
  };

  console.log("🟣 Enviando registro:", newUser);

  try {
    const response = await fetch(`${API_URL}/api/usuarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    console.log("🟡 Status de respuesta:", response.status);

    if (!response.ok) {
      const { error } = await response.json();
      console.log("🔴 Error del backend:", error);
      throw new Error(error || "Error al registrar");
    }

    const data = await response.json();
    console.log("🟢 Registro exitoso:", data);

    Alert.alert("¡Éxito!", "Usuario registrado correctamente");
    navigation.navigate("Login");
  } catch (error) {
    console.error("❌ Error en registro:", error.message);
    Alert.alert("Error", error.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>DentalPoint</Text>
      <View style={styles.card}>
        <Text style={styles.titleForm}>Registrate</Text>

        <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
        <TextInput style={styles.input} placeholder="Apellido" value={apellido} onChangeText={setApellido} />
        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="DNI" keyboardType="numeric" value={dni} onChangeText={setDni} />
        <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry value={password} onChangeText={setPassword} />
        <TextInput style={styles.input} placeholder="Confirmar contraseña" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />

        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Registrando..." : "Registrarse"}</Text>
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
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  titleForm: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2592C5',
    textAlign: 'center',
    marginBottom: 20,
    paddingTop:10,
    paddingBottom:10,
    textShadowColor: '#cce6f5',
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
    shadowColor: "#000033",
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
});
