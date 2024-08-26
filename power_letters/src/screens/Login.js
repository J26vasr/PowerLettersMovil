import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Easing, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importar Ionicons
import fetchData from '../api/components'; // Importar la función fetchData
import * as Constantes from '../utils/constantes'; // Importar constantes, asumiendo que tienes IP en un archivo de constantes

const LoginScreen = ({ navigation, setLogueado, logueado }) => {
  
  //Url de la api
  const USER_API =  'services/public/usuario.php';
  const ip = Constantes.IP; // Definir IP de la API
  const [correo, setCorreo] = useState(''); // Estado para el nombre de usuario
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

  // Manejo de inicio de sesión
  const handleLogin = async () => {
    // Verifica que los campos no estén vacíos
    if (!correo || !password) {
      Alert.alert(`Campos requeridos, Por favor, complete todos los campos.`);
      return;
    } else {
      // Creación del formulario para la petición
      const formData = new FormData();
      formData.append('correo_usuario', correo);
      formData.append('clave_usuario', password);
      try {
        // Realización de la petición de inicio de sesión
        const data = await fetchData(USER_API, 'logIn', formData);
        if (data.status) {
          Alert.alert(`${data.message}`);
          setLogueado(!logueado);
        } else {
          Alert.alert(`${data.error} ${data.exception}`);
          console.log(data.error);
        }
      } catch (error) {
        Alert.alert(`${error}`);
        console.log('Error: ', error);
      }
    }
  };
  // Función para redirigir a la pantalla de registro
  const handleRegister = () => {
    navigation.navigate('Registro');
  };

  // Función para redirigir a la pantalla de recuperación de contraseña
  const handleResetPassword = () => {
    navigation.navigate('handleResetPassword');
  };

  return (
    <View style={styles.container}>
      {/* Logo animado */}
      <Animated.Image  
        source={require('../img/imgLogin.png')} // Asegúrate de que esta ruta sea correcta
        style={[styles.logo, { transform: [{ translateY }] }]}
      />
      {/* Título de la pantalla */}
      <Text style={styles.title}>Inicio de sesión</Text>
      {/* Campo de entrada para el nombre de usuario */}
      <TextInput  style={styles.input}
      
        placeholder="Correo de usuario"
        onChangeText={text => setCorreo(text)}
        value={correo}
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
      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.registerLink}>¿No tienes cuenta? Crea una</Text>
      </TouchableOpacity>
      {/* Enlace para redirigir a la pantalla de recuperación de contraseña */}
      <TouchableOpacity onPress={handleResetPassword}>
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
    backgroundColor: 'white',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
    marginTop:30,
  },
  
  input: {
    padding: 12,
    margin: 2,
    borderRadius: 10,
    backgroundColor: "white",
    width: "100%",
    elevation: 2,
  },
  passwordContainer: {
    marginTop:10,
    padding: 12,
    margin: 2,
    borderRadius: 10,
    backgroundColor: "white",
    width: "100%",
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  eyeIcon: {
    padding: 10,
  },
  button: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#2955e8',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize:15,
    
  },
  registerLink: {
    textAlign: 'center',
    marginTop: 15,
    color: 'black',
    fontSize:15,
  },
  forgotPasswordText: {
    textAlign: 'center',
    marginTop: 15,
    color: 'black',
    fontSize:15,
  },
  logo: {
    width: 250,
    height: 235,
    marginBottom: 20,
    marginLeft:60,
    
  },
});

export default LoginScreen;