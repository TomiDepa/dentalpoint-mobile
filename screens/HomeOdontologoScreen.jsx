import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";

export default function HomeOdontologoScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTurno, setSelectedTurno] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  const formatDate = (date) => date.toISOString().split("T")[0];

  const changeDateBy = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const getTurnos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/turnos`);
      const data = await response.json();
      const user = JSON.parse(await AsyncStorage.getItem("usuario"));
      if (user) {
        const turnosOdontologo = data.filter(
          (t) => t.id_odontologo === user.id
        );
        setTurnos(turnosOdontologo);
      } else {
        setTurnos([]);
      }
    } catch (error) {
      setTurnos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTurnos();
  }, []);

  const formattedDate = formatDate(selectedDate);

  const turnosDelDia = turnos.filter((t) => t.fecha === formattedDate);

  const onRefresh = async () => {
    setRefreshing(true);
    await getTurnos();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        contentContainerStyle={styles.bodyContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.card}>
          <Text style={styles.welcomeText}>Bienvenido, Dr.</Text>

          <View style={styles.dateNavigation}>
            <TouchableOpacity
              style={styles.arrowButton}
              onPress={() => changeDateBy(-1)}
            >
              <Text style={styles.arrowText}>‹</Text>
            </TouchableOpacity>

            <Text style={styles.dateText}>{formattedDate}</Text>

            <TouchableOpacity
              style={styles.arrowButton}
              onPress={() => changeDateBy(1)}
            >
              <Text style={styles.arrowText}>›</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : turnosDelDia.length === 0 ? (
            <Text style={styles.noTurns}>No hay turnos para esta fecha.</Text>
          ) : (
            turnosDelDia.map((turno) => (
              <TouchableOpacity
                key={turno.id_turno}
                style={styles.option}
                onPress={() => setSelectedTurno(turno)}
              >
                <Text style={styles.optionText}>
                  {turno.hora} - {turno.paciente?.nombre}{" "}
                  {turno.paciente?.apellido}
                </Text>
                <Text style={styles.descripcionPreview}>
                  {turno.descripcion.length > 40
                    ? turno.descripcion.slice(0, 40) + "..."
                    : turno.descripcion}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      <Modal visible={!!selectedTurno} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Detalles del Turno</Text>
            <Text>
              <Text style={styles.bold}>Fecha:</Text> {selectedTurno?.fecha}
            </Text>
            <Text>
              <Text style={styles.bold}>Hora:</Text> {selectedTurno?.hora}
            </Text>
            <Text>
              <Text style={styles.bold}>Paciente:</Text>{" "}
              {selectedTurno?.paciente?.nombre}{" "}
              {selectedTurno?.paciente?.apellido}
            </Text>
            <Text>
              <Text style={styles.bold}>Descripción:</Text>{" "}
              {selectedTurno?.descripcion}
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                console.log("ID PACIENTE ENVIADO:", selectedTurno?.id_paciente);
                setSelectedTurno(null);
                navigation.navigate("HistoriaPaciente", {
                  id: selectedTurno?.id_paciente,
                });
              }}
            >
              <Text style={styles.buttonText}>Ver Historia Clínica</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => setSelectedTurno(null)}
            >
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0090D0" },
  bodyContainer: { paddingHorizontal: 16, paddingBottom: 30 },
  card: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderBottomEndRadius: 16,
    borderBottomStartRadius: 16,
    padding: 18,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#F4F4F4",
  },
  dateNavigation: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  arrowButton: {
    backgroundColor: "#007BB8",
    borderRadius: 24,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  arrowText: { color: "#fff", fontSize: 28, fontWeight: "bold" },
  dateText: { fontSize: 18, color: "#F4F4F4", fontWeight: "600" },
  option: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },
  optionText: { fontSize: 16, fontWeight: "600", color: "#004B8D" },
  descripcionPreview: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#555",
    marginTop: 6,
  },
  noTurns: {
    color: "#F4F4F4",
    fontStyle: "italic",
    marginTop: 10,
    textAlign: "center",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 16,
  },
  modalContainer: { backgroundColor: "#fff", padding: 20, borderRadius: 10 },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#004B8D",
    marginBottom: 10,
  },
  bold: { fontWeight: "bold" },
  button: {
    backgroundColor: "#007BB8",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
  },
  buttonClose: {
    backgroundColor: "#aaa",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
