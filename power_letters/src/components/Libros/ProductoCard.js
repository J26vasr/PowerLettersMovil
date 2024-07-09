
import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons'; // Importamos el ícono
import * as Constantes from "../../utils/constantes";

//recibimos por props la imagen del producto, nombre, precio y otras propiedades de productos para mostrarlas en el componente de 
//productoCard


export default function ProductoCard({ item, onPress
}) {

  return (

    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `${Constantes.IP}/NewPowerLetters/api/images/libros/${item.imagen}` }}
          style={styles.image}
          resizeMode="contain" // Ajustar la imagen al contenedor
        />
      </View>
      <Text style={styles.text}>{item.id_libro}</Text>
      <Text style={styles.textTitle}>{item.titulo_libro}</Text>
      <Text style={styles.textTitle}>Precio: <Text style={styles.textDentro}>${item.precio}</Text></Text>
      <TouchableOpacity onPress={() => onPress(item.id_libro)} style={styles.buton}>
        <Text>Ver mas</Text>
      </TouchableOpacity>
    </View>

  );
}


const styles = StyleSheet.create({
  containerFlat: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  image: {
    width: 170,
    height: 260,
    borderRadius: 20,
    marginBottom: 15,
  },
  imageContainer: {
    alignItems: 'center', // Centrar imagen horizontalmente
  }, textDentro: {
    fontWeight: '400'
  },
  
  card: {
    width: '50%',
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
  buton: {
    marginTop: 20,
    backgroundColor: '#5981CF',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

