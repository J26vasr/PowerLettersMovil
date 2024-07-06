// Hooks de React
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
 
import  SplashScreen from './src/screens/SplashScreen'
import BottomTab from './src/navigation/ButtomTab';
import NavStack from './src/navigation/NavStack';
import fetchData from './src/api/components';

// Componente principal
export default function App() {
  const API = 'services/public/usuario.php';
  const [logueado, setLogueado] = useState(false);
  const [username, setUsername] = useState('');
  const [imagen, setImagen] = useState('');
  const [appIsReady, setAppIsReady] = useState(false);

  const verifyLogged = async () => {
    try {
      const data = await fetchData(API, 'getUser');
      if (data.session) {
        setUsername(data.username);
        setImagen(data.imagen);
        setLogueado(true);
        console.log(data.username);
      } else {
        setLogueado(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function inicia() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 4000));
        await verifyLogged();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    inicia();
  }, []);

  return (
    <NavigationContainer>
    {/* Utiliza SplashScreen importado */}
    {appIsReady ? (
      logueado ? (
        <BottomTab logueado={logueado} setLogueado={setLogueado} />
      ) : (
        <NavStack logueado={logueado} setLogueado={setLogueado} />
      )
    ) : (
      <SplashScreen />
    )}
  </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  splashText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});