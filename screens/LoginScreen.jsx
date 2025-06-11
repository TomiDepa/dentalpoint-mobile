import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DentalPoint</Text>
      <View style={styles.card}>
        <Text style={styles.titleForm}>Iniciar sesion</Text>
        {/* Inputs */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Botón de login */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Iniciar sesión con Google</Text>
        </TouchableOpacity>

        {/*Recuperacion de contrasena*/}
        <Text style={styles.rememberPass}>
          ¿Olvidaste tu contraseña?{' '} <Text style={styles.link}>Recuperala acá</Text>
        </Text>

        {/* Enlace a registro */}
        <Text style={styles.registerText}>
            ¿No tenés cuenta?
          </Text>
        <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate("Register")}>
            <Text style={styles.buttonText}>Registrate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0090D0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#F4F4F4",
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
    textAlign: 'center',
    display:'flex', 
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
  rememberPass: {
    textAlign: 'center',
  },
  link: {
    color: '#0d47a1',
    fontWeight: '600',
  },
  registerText: {
    marginTop: 35,
    marginBottom: 10, 
    textAlign: 'center',
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
