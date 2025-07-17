import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

export default function MisTurnosScreen() {
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTurnosConOdontologo = async () => {
    try {
      const userData = await AsyncStorage.getItem('usuario');
      const usuario = JSON.parse(userData);
      console.log("🟢 Usuario logueado:", usuario);

      const turnosRes = await fetch(`${API_URL}/api/turnos/turnos-paciente?id=${usuario.id}`);
      const turnosData = await turnosRes.json();

      const usuariosRes = await fetch(`${API_URL}/api/usuarios`);
      const usuariosData = await usuariosRes.json();

      // Armar objeto para búsqueda rápida
      const odontologosMap = {};
      usuariosData.forEach(u => odontologosMap[u.id] = `${u.nombre} ${u.apellido}`);

      const turnosConNombre = turnosData.map(t => ({
        ...t,
        nombreOdontologo: odontologosMap[t.id_odontologo] || 'Odontólogo desconocido'
      }));

      console.log("🟣 Turnos procesados:", turnosConNombre);
      setTurnos(turnosConNombre);
    } catch (error) {
      console.error('❌ Error cargando turnos o usuarios:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTurnosConOdontologo();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.turnoCard}>
      <Text style={styles.fecha}>{item.fecha} - {item.hora}</Text>
      <Text style={styles.info}>Odontólogo: {item.nombreOdontologo}</Text>
      <Text style={styles.descripcion}>{item.descripcion}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.bodyContainer}>
        <View style={styles.card}>
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : turnos.length === 0 ? (
            <Text style={{ color: '#fff' }}>No tenés turnos agendados</Text>
          ) : (
            <FlatList
              data={turnos}
              keyExtractor={(item) => item.id_turno?.toString() || item.id?.toString()}
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 30 }}
            />
          )}
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
