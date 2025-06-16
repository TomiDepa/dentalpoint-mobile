import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import Header from '../components/Header';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

export default function NuevoTurnoScreen() {
  const [fecha, setFecha] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [showFecha, setShowFecha] = useState(false);
  const [showHora, setShowHora] = useState(false);
  const [odontologo, setOdontologo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const odontologosDisponibles = ['Dra. Ana Martínez', 'Dr. Luis Pérez', 'Dra. Camila Gómez'];
  const tratamientos = ['Limpieza dental', 'Extracción', 'Ortodoncia', 'Endodoncia'];

  return (
    <View style={styles.container}>
      <Header title="Nuevo Turno" />
      <ScrollView contentContainerStyle={styles.bodyContainer}>
        <View style={styles.card}>
          {/* Fecha */}
          <TouchableOpacity style={styles.input} onPress={() => setShowFecha(true)}>
            <Text>{fecha.toDateString()}</Text>
          </TouchableOpacity>
          {showFecha && (
            <DateTimePicker
              value={fecha}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setShowFecha(false);
                if (selectedDate) setFecha(selectedDate);
              }}
            />
          )}

          {/* Hora */}
          <TouchableOpacity style={styles.input} onPress={() => setShowHora(true)}>
            <Text>{hora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          </TouchableOpacity>
          {showHora && (
            <DateTimePicker
              value={hora}
              mode="time"
              is24Hour={true}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedTime) => {
                setShowHora(false);
                if (selectedTime) setHora(selectedTime);
              }}
            />
          )}

          {/* Odontólogo */}
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={odontologo}
              onValueChange={(itemValue) => setOdontologo(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Seleccione un odontólogo" value="" />
              {odontologosDisponibles.map((o, index) => (
                <Picker.Item key={index} label={o} value={o} />
              ))}
            </Picker>
          </View>

          {/* Descripción / Tratamiento */}
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={descripcion}
              onValueChange={(itemValue) => setDescripcion(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Seleccione tratamiento" value="" />
              {tratamientos.map((t, index) => (
                <Picker.Item key={index} label={t} value={t} />
              ))}
            </Picker>
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Solicitar Turno</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 15,
    height: 50,
    justifyContent: 'center',
  },
  pickerContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    height: 50,
    justifyContent: 'center',
    ...Platform.select({
      android: {
        paddingVertical: 0,
      },
    }),
  },
  picker: {
    color: '#000',
    height: 50,
    width: '100%',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
