import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';

import HomePacienteScreen from '../screens/HomePacienteScreen';
import MisTurnosScreen from '../screens/MisTurnosScreen';
import NuevoTurnoScreen from '../screens/NuevoTurnoScreen';

import HomeOdontologoScreen from '../screens/HomeOdontologoScreen';
import TurnosAsignadosScreen from '../screens/TurnosAsignadosScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      {/* Comunes */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      {/*<Stack.Screen name="Profile" component={ProfileScreen} />

       Paciente 
      <Stack.Screen name="HomePaciente" component={HomePacienteScreen} />
      <Stack.Screen name="MisTurnos" component={MisTurnosScreen} />
      <Stack.Screen name="NuevoTurno" component={NuevoTurnoScreen} />

       Odontólogo 
      <Stack.Screen name="HomeOdontologo" component={HomeOdontologoScreen} />
      <Stack.Screen name="TurnosAsignados" component={TurnosAsignadosScreen} />*/}
    </Stack.Navigator>
  );
}
