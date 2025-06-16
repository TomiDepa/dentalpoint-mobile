import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';

const turnosMock = [
  {
    id: '1',
    fecha: '2025-06-15',
    hora: '09:00',
    paciente: 'Juan Pérez',
    descripcion: 'Control general y revisión de caries en molares superiores.',
    id_paciente: '123',
  },
  {
    id: '2',
    fecha: '2025-06-15',
    hora: '11:00',
    paciente: 'Ana Gómez',
    descripcion: 'Extracción molar inferior derecho, control postoperatorio y recomendaciones.',
    id_paciente: '456',
  },
  {
    id: '3',
    fecha: '2025-06-16',
    hora: '10:00',
    paciente: 'Carlos López',
    descripcion: 'Limpieza dental y revisión periodontal.',
    id_paciente: '789',
  },
];

export default function HomeOdontologoScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTurno, setSelectedTurno] = useState(null);
  const navigation = useNavigation();

  // Función para formatear la fecha YYYY-MM-DD
  const formatDate = (date) => date.toISOString().split('T')[0];

  // Cambiar la fecha sumando o restando días
  const changeDateBy = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const formattedDate = formatDate(selectedDate);
  const turnosDelDia = turnosMock.filter((t) => t.fecha === formattedDate);

  const renderItem = ({ id, hora, paciente, descripcion }) => (
    <TouchableOpacity
      key={id}
      style={styles.option}
      onPress={() => setSelectedTurno({ id, hora, paciente, descripcion, fecha: formattedDate })}
    >
      <Text style={styles.optionText}>
        {hora} - {paciente}
      </Text>
      <Text style={styles.descripcionPreview}>
        {descripcion.length > 40 ? descripcion.slice(0, 40) + '...' : descripcion}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header/>
      <ScrollView contentContainerStyle={styles.bodyContainer}>
        <View style={styles.card}>
          <Text style={styles.welcomeText}>Bienvenido, Dr. Tomas</Text>

          <View style={styles.dateNavigation}>
            <TouchableOpacity
              style={styles.arrowButton}
              onPress={() => changeDateBy(-1)}
              accessibilityLabel="Fecha anterior"
            >
              <Text style={styles.arrowText}>‹</Text>
            </TouchableOpacity>

            <Text style={styles.dateText}>{formattedDate}</Text>

            <TouchableOpacity
              style={styles.arrowButton}
              onPress={() => changeDateBy(1)}
              accessibilityLabel="Fecha siguiente"
            >
              <Text style={styles.arrowText}>›</Text>
            </TouchableOpacity>
          </View>

          {turnosDelDia.length === 0 ? (
            <Text style={styles.noTurns}>No hay turnos para esta fecha.</Text>
          ) : (
            turnosDelDia.map(renderItem)
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
              <Text style={styles.bold}>Paciente:</Text> {selectedTurno?.paciente}
            </Text>
            <Text>
              <Text style={styles.bold}>Descripción:</Text> {selectedTurno?.descripcion}
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setSelectedTurno(null);
                navigation.navigate('HistoriaPaciente', { id: selectedTurno?.id_paciente });
              }}
            >
              <Text style={styles.buttonText}>Ver Historia Clínica</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonClose} onPress={() => setSelectedTurno(null)}>
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0090D0' },
  bodyContainer: { paddingHorizontal: 16, paddingBottom: 30 },
  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderBottomEndRadius: 16,
    borderBottomStartRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#F4F4F4',
  },
  dateNavigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  arrowButton: {
    backgroundColor: '#007BB8',
    borderRadius: 24,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 18,
    color: '#F4F4F4',
    fontWeight: '600',
  },
  option: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#004B8D',
  },
  descripcionPreview: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
    marginTop: 6,
  },
  noTurns: {
    color: '#F4F4F4',
    fontStyle: 'italic',
    marginTop: 10,
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 16,
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004B8D',
    marginBottom: 10,
  },
  bold: { fontWeight: 'bold' },
  button: {
    backgroundColor: '#007BB8',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  buttonClose: {
    backgroundColor: '#aaa',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
