import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator
} from 'react-native';
import Header from '../components/Header';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from '../config.js';

export default function NuevoTurnoScreen() {
  const [odontologos, setOdontologos] = useState([]);
  const [odontologo, setOdontologo] = useState('');
  const [disponibilidad, setDisponibilidad] = useState([]);
  const [fecha, setFecha] = useState(new Date());
  const [hora, setHora] = useState('');
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [descripcion, setDescripcion] = useState('');
  const [showFechaPicker, setShowFechaPicker] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [idPaciente, setIdPaciente] = useState(null);

  useEffect(() => {
    cargarDatosUsuario();
    cargarOdontologos();
  }, []);

  useEffect(() => {
    if (odontologo) {
      cargarDisponibilidad(odontologo);
    } else {
      setDisponibilidad([]);
      setHorariosDisponibles([]);
    }
  }, [odontologo, fecha]);

  const cargarDatosUsuario = async () => {
    const userData = await AsyncStorage.getItem('usuario');
    if (userData) {
      const user = JSON.parse(userData);
      setIdPaciente(user.id);
    }
  };

  const cargarOdontologos = async () => {
    try {
      const res = await fetch(`${API_URL}/api/usuarios`);
      const data = await res.json();
      const filtrados = data.filter(u => u.rol === 'admin');
      setOdontologos(filtrados);
    } catch (e) {
      setError('Error al cargar odontólogos.');
    }
  };

  const cargarDisponibilidad = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/disponibilidad/${id}`);
      const data = await res.json();
      setDisponibilidad(data);
      filtrarHorarios(data);
    } catch (e) {
      setDisponibilidad([]);
      setHorariosDisponibles([]);
    }
  };

  const filtrarHorarios = async (dispon) => {
    const fechaStr = fecha.toISOString().slice(0, 10);
    const disponibilidadDia = dispon.find(d => d.fecha === fechaStr);
    if (!disponibilidadDia) {
      setHorariosDisponibles([]);
      return;
    }

    const bloques = generarBloquesHorario(disponibilidadDia.hora_inicio, disponibilidadDia.hora_fin);

    const resTurnos = await fetch(`${API_URL}/api/turnos/turnos-odontologo?id=${odontologo}&fecha=${fechaStr}`);
    const turnos = await resTurnos.json();

    const ocupados = turnos.map(t => t.hora.slice(0, 5));
    const disponibles = bloques.filter(h => !ocupados.includes(h));
    setHorariosDisponibles(disponibles);
  };

  const generarBloquesHorario = (inicio, fin) => {
    const bloques = [];
    let [h, m] = inicio.split(':').map(Number);
    const [hFin, mFin] = fin.split(':').map(Number);

    while (h < hFin || (h === hFin && m < mFin)) {
      bloques.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
      m += 20;
      if (m >= 60) {
        m -= 60;
        h++;
      }
    }
    return bloques;
  };

  const solicitarTurno = async () => {
    setError('');
    setSuccess('');

    if (!odontologo || !hora || !descripcion) {
      setError('Completa todos los campos para agendar el turno.');
      return;
    }

    setLoading(true);

    try {
      const fechaStr = fecha.toISOString().slice(0, 10);

      const res = await fetch(`${API_URL}/api/turnos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fecha: fechaStr,
          hora,
          estado: 'Pendiente',
          id_paciente: idPaciente,
          id_odontologo: odontologo,
          descripcion,
          duracion: 20
        })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Error al crear turno.');

      setSuccess('¡Turno agendado con éxito!');

      // Limpiar campos:
      setOdontologo('');
      setHora('');
      setDescripcion('');
      setFecha(new Date());
      setHorariosDisponibles([]);
      setDisponibilidad([]);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Nuevo Turno" />
      <ScrollView contentContainerStyle={styles.bodyContainer}>
        <View style={styles.card}>
          <Picker selectedValue={odontologo} placeholderTextColor="#999" onValueChange={setOdontologo} style={styles.picker}>
            <Picker.Item label="Seleccione odontólogo" value="" />
            {odontologos.map(o => (
              <Picker.Item key={o.id} label={`${o.nombre} ${o.apellido}`} value={o.id} />
            ))}
          </Picker>

          <TouchableOpacity style={styles.input} onPress={() => setShowFechaPicker(true)}>
            <Text>{fecha.toDateString()}</Text>
          </TouchableOpacity>

          {showFechaPicker && (
            <DateTimePicker
              value={fecha}
              mode="date"
              onChange={(e, d) => {
                setShowFechaPicker(false);
                if (d) setFecha(d);
              }}
            />
          )}

          <Picker selectedValue={hora} onValueChange={setHora} placeholderTextColor="#999" style={styles.picker}>
            <Picker.Item label="Seleccione horario" value="" />
            {horariosDisponibles.map(h => (
              <Picker.Item key={h} label={h} value={h} />
            ))}
          </Picker>

          <Picker selectedValue={descripcion} onValueChange={setDescripcion} placeholderTextColor="#999" style={styles.picker}>
            <Picker.Item label="Motivo de consulta" value="" />
            {['Consulta General', 'Limpieza', 'Extracción', 'Ortodoncia'].map((t, i) => (
              <Picker.Item key={i} label={t} value={t} />
            ))}
          </Picker>

          {error ? <Text style={styles.error}>{error}</Text> : null}
          {success ? <Text style={styles.success}>{success}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={solicitarTurno} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Reservar Turno</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0090D0' },
  bodyContainer: { padding: 16 },
  card: { backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 16, padding: 18 },
  picker: { backgroundColor: '#f8f9fa', marginVertical: 8, color: 'black' }, // Color negro en el texto seleccionado
  input: { backgroundColor: '#f8f9fa', padding: 14, marginVertical: 8, borderRadius: 10 },
  button: { backgroundColor: '#2196F3', padding: 14, marginTop: 20, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  error: { color: 'red', textAlign: 'center', marginVertical: 8 },
  success: { color: 'limegreen', textAlign: 'center', marginVertical: 8 },
});
