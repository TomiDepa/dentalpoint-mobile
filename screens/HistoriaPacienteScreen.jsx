import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Header from "../components/Header";
import { useRoute } from "@react-navigation/native";
import { API_URL } from "../config";

export default function HistoriaPacienteScreen() {
  const route = useRoute();
  const { id } = route.params;
  console.log("ID recibido:", id);

  const [historias, setHistorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const getHistorias = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/api/historiasclinicas/paciente/${id}`
      );
      const data = await response.json();
      setHistorias(data);
      console.log(data);
    } catch (error) {
      console.log("Error:", error);
      setHistorias([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHistorias();
  }, []);

  const formatFecha = (fechaStr) => {
    if (!fechaStr) return "";
    const fecha = new Date(fechaStr);
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };

  const renderItem = ({ item }) => {
    const fechaFormateada = formatFecha(item.fecha);

    return (
      <TouchableOpacity
        style={styles.historiaCard}
        onPress={() => setSelected(item)}
      >
        <Text style={styles.fecha}>{fechaFormateada}</Text>
        <Text style={styles.descripcion}>{item.descripcion}</Text>
        <Text style={styles.odontologo}>
          Odontólogo: {item.odontologo?.nombre} {item.odontologo?.apellido}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.bodyContainer}>
        <View style={styles.card}>
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <FlatList
              data={historias}
              keyExtractor={(item, index) =>
                item?.id ? item.id.toString() : index.toString()
              }
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 30 }}
              ListEmptyComponent={
                <Text style={styles.sinDatos}>
                  No hay historias clínicas disponibles.
                </Text>
              }
            />
          )}
        </View>
      </View>

      {/* Modal detalle */}
      <Modal visible={!!selected} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <ScrollView>
              <Text style={styles.modalTitle}>Detalle de la Historia</Text>

              <Text style={styles.modalLabel}>Fecha:</Text>
              <Text style={styles.modalText}>
                {selected?.fecha ? formatFecha(selected.fecha) : ""}
              </Text>

              <Text style={styles.modalLabel}>Odontólogo:</Text>
              <Text style={styles.modalText}>
                {selected?.odontologo?.nombre} {selected?.odontologo?.apellido}
              </Text>

              <Text style={styles.modalLabel}>Descripción:</Text>
              <Text style={styles.modalText}>{selected?.detalle}</Text>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelected(null)}
              >
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </ScrollView>
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
  historiaCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  fecha: { fontSize: 16, fontWeight: "bold", color: "#004B8D" },
  descripcion: { marginTop: 5, color: "#333" },
  odontologo: { marginTop: 5, fontStyle: "italic", color: "#555" },
  sinDatos: { color: "#fff", textAlign: "center", marginTop: 20 },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 16,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    maxHeight: "85%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#004B8D",
  },
  modalLabel: { fontWeight: "bold", marginTop: 10, color: "#333" },
  modalText: { color: "#444", marginBottom: 5 },
  closeButton: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  closeButtonText: { color: "#fff", fontWeight: "bold" },
});
