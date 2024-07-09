import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import fetchData from '../api/components';

// Componente de pantalla de inicio de sesión
const LoginScreen = ({ logueado, setLogueado }) => {

  // Estados para los campos de alias y clave
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // URL de la API para el usuario
  const  USER_API = 'services/public/usuario.php';

  // Manejo de inicio de sesión
  const handleLogin = async () => {
    // Creación del formulario para la petición
    const formData = new FormData();
    formData.append('correo_usuario', email);
    formData.append('clave_usuario', password);

    try {
      // Realización de la petición de inicio de sesión
      const data = await fetchData(USER_API, 'logIn', formData);
      if (data.status) {
        setLogueado(!logueado);
      } else {
        console.log(data);
        Alert.alert('Error sesion', data.error);
      }
    } catch (error) {
      console.log(data.error);
      Alert.alert('Error sesion', data.error);
    }
  };

      // Estilo de los elementos del login
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      <Animated.Image
        source={require('../img/login.jpg')}
        style={[styles.logo, { transform: [{ translateY }] }]}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Iniciar Sesión
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  
  logo: {
    width: 250,
    height: 235,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#6200ee',
  },
});

export default LoginScreen;
