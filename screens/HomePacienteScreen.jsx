import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import Header from "../components/Header";

export default function HomeScreen({ navigation }) {
  return (
      <View style={styles.container}>
        <Header title="Inicio" />

        <ScrollView contentContainerStyle={styles.bodyContainer}>
          <View style={styles.card}>
            <Image
              source={require("../assets/consul.jpg")}
              style={{ width: "100%", height: 200 }}
              resizeMode="cover"
            />
            <Text style={styles.welcomeText}>Bienvenido, Tomas</Text>
            <Text style={styles.subtitle}>
              Brindando sonrisas saludables con la mejor atención profesional.
            </Text>

            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("NuevoTurno")}>
              <FontAwesome5
                name="calendar-alt"
                size={24}
                color="#004B8D"
                style={styles.icon}
              />
              <Text style={styles.optionText}>Agendar turno</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("MisTurnos")}>
              <FontAwesome5
                name="calendar-alt"
                size={24}
                color="#004B8D"
                style={styles.icon}
              />
              <Text style={styles.optionText}>Mis turno</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("HistoriasClinicas")}>
              <FontAwesome5
                name="file-medical"
                size={24}
                color="#004B8D"
                style={styles.icon}
              />
              <Text style={styles.optionText}>Historia clínica</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("Profile")}>
              <FontAwesome5
                name="user"
                size={24}
                color="#004B8D"
                style={styles.icon}
              />
              <Text style={styles.optionText}>Perfil</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0090D0", // fondo igual al login
  },
  bodyContainer: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderBottomEndRadius: 16,
    borderBottomStartRadius: 16,
    padding: 18, // menos padding que en login
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#F4F4F4",
  },
  subtitle: {
    fontSize: 14,
    color: "#F4F4F4",
    marginBottom: 20,
  },
  option: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  icon: {
    marginRight: 14,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#004B8D",
  },
});
