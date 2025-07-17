import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity, Modal, ActivityIndicator
} from 'react-native';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

export default function HistoriasClinicasScreen() {
  const [historias, setHistorias] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistorias = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('usuario');
        if (!userDataString) return;
        const user = JSON.parse(userDataString);

        const response = await fetch(`${API_URL}/api/historiasclinicas/paciente/${user.id}`);
        const data = await response.json();
        setHistorias(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistorias();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.historiaCard} onPress={() => setSelected(item)}>
      <Text style={styles.fecha}>{item.fecha?.slice(0, 10)}</Text>
      <Text style={styles.descripcion}>{item.detalle}</Text>
      <Text style={styles.odontologo}>
        Odontólogo: {item.odontologo?.nombre} {item.odontologo?.apellido}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Historias Clínicas" />
      <View style={styles.bodyContainer}>
        <View style={styles.card}>
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <FlatList
              data={historias}
              keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 30 }}
            />
          )}
        </View>
      </View>

      <Modal visible={!!selected} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <ScrollView>
              <Text style={styles.modalTitle}>Detalle de la Historia</Text>

              <Text style={styles.modalLabel}>Fecha:</Text>
              <Text style={styles.modalText}>{selected?.fecha?.slice(0, 10)}</Text>

              <Text style={styles.modalLabel}>Odontólogo:</Text>
              <Text style={styles.modalText}>
                {selected?.odontologo?.nombre} {selected?.odontologo?.apellido}
              </Text>

              <Text style={styles.modalLabel}>Detalle:</Text>
              <Text style={styles.modalText}>{selected?.detalle}</Text>

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
