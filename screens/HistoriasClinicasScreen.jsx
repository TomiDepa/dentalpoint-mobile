import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Header from '../components/Header';

const historiasMock = [
  {
    id: '1',
    fecha: '2025-05-10',
    odontologo: 'Dra. Laura Fernández',
    descripcion: 'Control de rutina y limpieza.',
    tratamiento: 'Profilaxis, aplicación de flúor.',
    observaciones: 'Paciente en buen estado general.',
  },
  {
    id: '2',
    fecha: '2025-04-02',
    odontologo: 'Dr. Juan Pérez',
    descripcion: 'Consulta por dolor en muela.',
    tratamiento: 'Endodoncia en molar inferior derecho.',
    observaciones: 'Se recomienda seguimiento.',
  },
];

export default function HistoriasClinicasScreen() {
  const [selected, setSelected] = useState(null);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.historiaCard} onPress={() => setSelected(item)}>
      <Text style={styles.fecha}>{item.fecha}</Text>
      <Text style={styles.descripcion}>{item.descripcion}</Text>
      <Text style={styles.odontologo}>Odontólogo: {item.odontologo}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Historias Clínicas" />

      <View style={styles.bodyContainer}>
        <View style={styles.card}>
          <FlatList
            data={historiasMock}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 30 }}
          />
        </View>
      </View>

      {/* Modal de detalle */}
      <Modal visible={!!selected} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <ScrollView>
              <Text style={styles.modalTitle}>Detalle de la Historia</Text>

              <Text style={styles.modalLabel}>Fecha:</Text>
              <Text style={styles.modalText}>{selected?.fecha}</Text>

              <Text style={styles.modalLabel}>Odontólogo:</Text>
              <Text style={styles.modalText}>{selected?.odontologo}</Text>

              <Text style={styles.modalLabel}>Descripción:</Text>
              <Text style={styles.modalText}>{selected?.descripcion}</Text>

              <Text style={styles.modalLabel}>Tratamiento:</Text>
              <Text style={styles.modalText}>{selected?.tratamiento}</Text>

              <Text style={styles.modalLabel}>Observaciones:</Text>
              <Text style={styles.modalText}>{selected?.observaciones}</Text>

              <TouchableOpacity style={styles.closeButton} onPress={() => setSelected(null)}>
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
  container: {
    flex: 1,
    backgroundColor: '#0090D0',
  },
  bodyContainer: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderBottomEndRadius: 16,
    borderBottomStartRadius: 16,
    padding: 18,
  },
  historiaCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  fecha: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004B8D',
  },
  descripcion: {
    marginTop: 5,
    color: '#333',
  },
  odontologo: {
    marginTop: 5,
    fontStyle: 'italic',
    color: '#555',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    maxHeight: '85%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#004B8D',
  },
  modalLabel: {
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  modalText: {
    color: '#444',
    marginBottom: 5,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
