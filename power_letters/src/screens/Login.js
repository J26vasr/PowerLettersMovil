import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Easing, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importar Ionicons
import fetchData from '../api/components'; // Importar la función fetchData
import * as Constantes from '../utils/constantes'; // Importar constantes, asumiendo que tienes IP en un archivo de constantes

const LoginScreen = ({ navigation }) => {
  const ip = Constantes.IP; // Definir IP de la API
  const [username, setCorreo] = useState(''); // Estado para el nombre de usuario
  const [password, setClave] = useState(''); // Estado para la contraseña
  const [showPassword, setShowPassword] = useState(false); // Estado para alternar visibilidad de la contraseña
  const animatedValue = new Animated.Value(0); // Estado para la animación del logo

  useEffect(() => {
    // Configuración de la animación en bucle
    const animation = Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      })
    );

    // Iniciar la animación
    animation.start();

    // Limpiar la animación cuando el componente se desmonta
    return () => {
      animation.stop();
    };
  }, []);

  // Interpolación para la animación de traducción vertical del logo
  const translateY = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 20, 0],
  });
  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Por favor, complete los campos de usuario y contraseña');
      return;
    }
  
    const formData = new FormData();
    formData.append('correo_usuario', username);
    formData.append('clave_usuario', password);
  
    const url = `${ip}/NewPowerLetters/api/services/public/usuario.php?action=logIn`;
    console.log('URL solicitada:', url);
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
  
      if (data.status) {
        setCorreo('');
        setClave('');
        navigation.navigate('Home');
      } else {
        Alert.alert('Error de inicio de sesión', data.error);
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      Alert.alert('Error de inicio de sesión', 'Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo.');
    }
  };
  
  // Función para redirigir a la pantalla de registro
  const handleRegisterRedirect = () => {
    navigation.navigate('Register');
  };

  // Función para redirigir a la pantalla de recuperación de contraseña
  const handleForgotPasswordRedirect = () => {
    navigation.navigate('PasswordRecovery');
  };

  return (
    <View style={styles.container}>
      {/* Logo animado */}
      <Animated.Image
        source={require('../img/libroSS.png')} // Asegúrate de que esta ruta sea correcta
        style={[styles.logo, { transform: [{ translateY }] }]}
      />
      {/* Título de la pantalla */}
      <Text style={styles.title}>Inicio de sesión</Text>
      {/* Campo de entrada para el nombre de usuario */}
      <TextInput
        style={styles.input}
        placeholder="Correo de usuario"
        onChangeText={text => setCorreo(text)}
        value={username}
      />
      {/* Campo de entrada para la contraseña con alternar visibilidad */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={{ flex: 1 }}
          placeholder="Contraseña"
          onChangeText={text => setClave(text)}
          value={password}
          secureTextEntry={!showPassword} // Asegúrate de que la contraseña sea segura
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="gray" />
        </TouchableOpacity>
      </View>
      {/* Botón de inicio de sesión */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      {/* Enlace para redirigir a la pantalla de registro */}
      <TouchableOpacity onPress={handleRegisterRedirect}>
        <Text style={styles.registerLink}>¿No tienes cuenta? Crea una</Text>
      </TouchableOpacity>
      {/* Enlace para redirigir a la pantalla de recuperación de contraseña */}
      <TouchableOpacity onPress={handleForgotPasswordRedirect}>
        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  eyeIcon: {
    padding: 10,
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#6200ee',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  registerLink: {
    textAlign: 'center',
    marginTop: 10,
    color: '#6200ee',
  },
  forgotPasswordText: {
    textAlign: 'center',
    marginTop: 10,
    color: '#6200ee',
  },
  logo: {
    width: 250,
    height: 235,
    marginBottom: 20,
  },
});

export default LoginScreen;