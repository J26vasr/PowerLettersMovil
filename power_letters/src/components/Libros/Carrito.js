
import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons'; // Importamos el ícono
import * as Constantes from "../../utils/constantes";

//recibimos por props la imagen del producto, nombre, precio y otras propiedades de productos para mostrarlas en el componente de 
//productoCard


export default function CarritoCard({ item, onPress
}) {

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.grid}>
      {filteredProducts.map((product, index) => (
        <View key={index} style={styles.card}>
          
          
          <Text style={styles.text}>{item.id_detalle}</Text>
          <Text style={styles.cardTitle}>{product.nombre_producto}</Text>
          <Text style={styles.cardDescription}>{product.precio}</Text>
          <Text style={styles.cardDescription}>{product.cantidad}</Text>
         
            <Text style={styles.buttonText}>Comprar</Text>
         

        </View>
      ))}
    </View>
  </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#F8F9FB',
      paddingVertical: 60, // Reducido el espacio vertical
      paddingHorizontal: 15,
    },
    
    searchContainer: {
      marginTop: 3,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginBottom: 50,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 8,
    },
    searchIcon: {
      marginRight: 15,
    },
    searchInput: {
      flex: 1,
      height: 40,
      fontSize: 18,
      color: '#333',
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    card: {
      width: '100%',
      height: 200,
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
    cardImage: {
      marginRight: 230,
      width: 120,
      height: 160,
      borderRadius: 20,
      marginBottom: 15,
    },
    cardTitle: {
      marginTop:  -160,
      marginLeft: 90,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 8,
      color: '#333',
    },
    cardDescription: {
      fontSize: 16,
      marginLeft: 80,
      color: '#555',
      textAlign: 'center',
      marginBottom: 15,
    },
    cardCantidad:{
      marginLeft: 50,
      marginTop: -10,
      color: '#555',
  
    },
    button: {
      marginTop: 20,
      marginLeft: 60,
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
  