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


<Text style={styles.subtitulo}>
                PowerLetters
        </Text>
      <Text style={styles.description}>
                "Somos una librería comprometida a ofrecer la mejor
                        selección de libros a nuestros clientes. Nuestra misión es fomentar la lectura
                        y el acceso a la cultura. Con una visión de ser líderes en el mercado, nuestro
                        lema es "Donde los libros encuentran un hogar"
        </Text>
        </View>
        </View>
    );
}

const home =[
  {
    image: 'https://marketplace.canva.com/EAFutLMZJKs/1/0/1003w/canva-portada-libro-novela-suspenso-elegante-negro-wxuYB_sJtMw.jpg',
    
  },
]
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
        marginTop: 40,
        textTransform: 'uppercase',
    },
    subtitulo:{
      fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 30,
        textTransform: 'uppercase',
        marginTop: 40,
    },
    description:{
      fontSize: 16,
      color: 'black',
      textAlign: 'center',
      fontWeight:'semibold',  
    },
    negrita: {
        fontWeight: 'bold'
    },
    
  banner: {
    marginTop:  300,
    width: '95%',
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  containerCarrusel:{
    marginTop: 80,
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    height: 100,
  },
  
});
