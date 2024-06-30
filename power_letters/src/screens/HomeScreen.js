import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';


const HomeScreen = () => {
const [currentImageIndex, setCurrentImageIndex] = useState(0);

useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const images = [
    'https://www.comunidadbaratz.com/wp-content/uploads/Leer-es-un-modo-de-entretenimiento-y-conocimiento-que-desde-hace-tiempo-convive-y-compite-contra-otras-formas-de-ocio-e-informacion.jpg',
    'https://www.infobae.com/new-resizer/VLE6sfJ5jnGW7QYUZmfO9OWjLN8=/arc-anglerfish-arc2-prod-infobae/public/R2LUP7YUCRDYVLET2PFPMHVV5U.jpg',
    'https://docentes.algareditorial.com/img/posts/72/previo.jpg',
    'https://static.guiainfantil.com/uploads/educacion/ninoslectores-pe.jpg',
  ];
    return (
        <View style={styles.container}>
        <Text style={styles.title}>
                Bienvenido usuario
        </Text>

        <View style={styles.containerCarrusel}>
        <Image
        source={{ uri: images[currentImageIndex] }}
        style={styles.banner}
      />
        </View>
       
        </View>
        

        
     

    );
}

export default HomeScreen;


// Estilos para los componentes.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingHorizontal: 15
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 30,
        textTransform: 'uppercase',
    },
    negrita: {
        fontWeight: 'bold'
    },
    
  banner: {
    width: '90%',
    height: 150,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  containerCarrusel:{
    marginTop: 70,
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    height: 100,
  },
  
});
