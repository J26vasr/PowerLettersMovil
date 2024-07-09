import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as Constantes from "../../utils/constantes";

export default function DetalleProductoCard({ item, onPress }) {

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `${Constantes.IP}/NewPowerLetters/api/images/libros/${item.imagen}` }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.title}>{item.titulo_libro}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.description}>{item.descripcion_libro}</Text>
        <Text style={styles.detailsLabel}>Precio: <Text style={styles.detailsValue}>${item.precio}</Text></Text>
        <Text style={styles.detailsLabel}>Autor: <Text style={styles.detailsValue}>{item.nombre_autor}</Text></Text>
        <Text style={styles.detailsLabel}>Clasificación: <Text style={styles.detailsValue}>{item.nombre_clasificacion}</Text></Text>
        <Text style={styles.detailsLabel}>Editorial: <Text style={styles.detailsValue}>{item.nombre_editorial}</Text></Text>
        <Text style={styles.detailsLabel}>Género: <Text style={styles.detailsValue}>{item.nombre_genero}</Text></Text>
        <Text style={styles.detailsLabel}>Existencias: <Text style={styles.detailsValue}>{item.existencias}</Text></Text>

      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => onPress(item.id_libro)}>
        <Text style={styles.addButtonText}>Añadir al carrito</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}


const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    padding: 5,
    backgroundColor: '#F8F9FA',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  image: {
    marginTop: 80,
    width: '100%',
    height: 300,
    borderRadius: 20,
    marginBottom: 20,
    resizeMode: 'cover',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    width: 320,
    height: 250,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailsLabel: {
    fontSize: 16,
    color: '#666',
  },
  detailsValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  addButton: {
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

