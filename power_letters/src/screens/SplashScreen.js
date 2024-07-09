import React,{ useState, useEffect,useRef } from 'react';
//Objetos a utilizar de react
import { StyleSheet, Text, View, Image, Animated, Easing } from 'react-native';

export default function SplashScreen() {
   
    const [counter, setCounter] = useState(3);
    const rotateValue = useRef(new Animated.Value(0)).current;
   
    useEffect(() => {
      const timer = setInterval(() => {
        setCounter(prevCounter => prevCounter - 1);
      }, 1000);
   
      // Configura la animación de rotación
      Animated.loop(
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
   
      return () => clearInterval(timer);
    }, []);
   
    // Interpolación para convertir el valor de la animación en grados
    const rotate = rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
   
    return (
      <View  style={styles.container}>
        <Text style={styles.title}>
          Bienvenido a PowerLetters
        </Text>
         <Animated.Image
        source={require('../img/libroSS.png')}
        style={[styles.image, { transform: [{ rotate }] }]}
      />
      </View>
    );

  }
  
  const styles = StyleSheet.create({
    image: {
      marginTop:40,
      width: 200, // Adjust the width as needed
      height: 200, // Adjust the height as needed
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0B3954',
      padding: 8,
    },
    title: {
      margin: 24,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#FFF',
    },
    paragraph: {
      fontSize: 18,
      textAlign: 'center',
      color: '#FFF',
    },
  });

