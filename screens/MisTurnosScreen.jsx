import React from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';

const turnosMock = [
  {
    id: '1',
    fecha: '2025-06-15',
    hora: '09:00',
    odontologo: 'Dra. Ana Martínez',
    descripcion: 'Controles rutinarios',
  },
  {
    id: '2',
    fecha: '2025-06-22',
    hora: '11:30',
    odontologo: 'Dr. Luis Pérez',
    descripcion: 'Extracción molar',
  },
];

export default function MisTurnosScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.turnoCard}>
      <Text style={styles.fecha}>{item.fecha} - {item.hora}</Text>
      <Text style={styles.info}>Odontólogo: {item.odontologo}</Text>
      <Text style={styles.descripcion}>{item.descripcion}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.bodyContainer}>
        <View style={styles.card}>
          <FlatList
            data={turnosMock}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 30 }}
          />
        </View>
      </View>
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
  },
  turnoCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  fecha: { fontSize: 16, fontWeight: 'bold', color: '#004B8D' },
  info: { marginTop: 5, color: '#333' },
  descripcion: { marginTop: 5, fontStyle: 'italic', color: '#555' },
});
