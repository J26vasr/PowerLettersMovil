import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';


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


    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.subtitle}>Bienvenido</Text>
      <View style={styles.carouselContainer}>
        <Image
          source={{ uri: images[currentImageIndex] }}
          style={styles.banner}
        />
      </View>

      <View style={styles.container}>

        <View style={styles.card}>
          <Text style={styles.subtitle}>PowerLetters</Text>
          <Text style={styles.description}>
            "Somos una librería comprometida a ofrecer la mejor selección de libros a nuestros clientes. Nuestra misión es fomentar la lectura y el acceso a la cultura. Con una visión de ser líderes en el mercado, nuestro lema es "Donde los libros encuentran un hogar"
          </Text>
          <View style={styles.logoContainer}>
            <Image source={require('../img/libroSS.png')} style={styles.logo} />
          </View>
        </View>
      </View>
    </ScrollView>


  );
}

const home = [
  {
    image: 'https://marketplace.canva.com/EAFutLMZJKs/1/0/1003w/canva-portada-libro-novela-suspenso-elegante-negro-wxuYB_sJtMw.jpg',

  },
]
export default HomeScreen;


// Estilos para los componentes.
const styles = StyleSheet.create({

  logo: {
    marginTop: 30,
    width: 250,
    height: 200,
    marginBottom: 10,
  },
  scrollContainer: {
    backgroundColor: '#F8F9FB',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',

    paddingHorizontal: 15
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'semibold',
  },
  negrita: {
    fontWeight: 'bold'
  },

  banner: {
    marginTop:20,
    width: '100%',
    height: 500,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  containerCarrusel: {
    marginTop: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },

  card: {
    marginTop: -150,
    width: '100%',
    height: 400,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },

});
