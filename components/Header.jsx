import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header({ showIcon = true }) {
  const navigation = useNavigation();
  const [rol, setRol] = useState(null);

  useEffect(() => {
    const cargarRol = async () => {
      try {
        const userData = await AsyncStorage.getItem('usuario');
        if (userData) {
          const usuario = JSON.parse(userData);
          setRol(usuario.rol);
        }
      } catch (error) {
        console.error('❌ Error obteniendo rol:', error);
      }
    };
    cargarRol();
  }, []);

  const handleHome = () => {
    if (rol === 'admin') navigation.navigate('HomeOdontologo');
    else navigation.navigate('HomePaciente');
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.headerLeft} onPress={handleHome}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>Inicio</Text>
      </TouchableOpacity>

      {showIcon && (
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <FontAwesome5 name="user" size={24} color="#F4F4F4" style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 40,
    marginHorizontal: 16,
    padding: 14,
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    color: "#F4F4F4",
    fontWeight: "bold",
  },
  icon: {
    marginRight: 4,
  },
});
