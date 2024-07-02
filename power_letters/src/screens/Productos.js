import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ProductoScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');

  const products = [
    {
      title: 'Yo antes de ti',
      precio: '$14.99',
      image: 'https://marketplace.canva.com/EAFutLMZJKs/1/0/1003w/canva-portada-libro-novela-suspenso-elegante-negro-wxuYB_sJtMw.jpg',
    },
    {
      title: 'Una gota gorda',
      precio: '$14.99',
      image: 'https://edit.org/img/blog/yrm-1024-plantillas-ebook-gratis-editables-online.webp',
    },
    {
      title: 'Juana de arco',
      precio: '$14.99',
      image: 'https://www.letraminuscula.com/wp-content/uploads/Portada-55x85-EL-CAMINO-DE-LA-GUERRERA-663x1024.jpg',
    },
    {
      title: 'Marianela',
      precio: '$14.99',
      image: 'https://template.canva.com/EADwi4xAG6I/1/0/256w-JBWCAd5q564.jpg',
    },
  ];

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleVerMas = (producto) => {
    navigation.navigate('DetallesProducto', { producto });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#000" style={styles.searchIcon} />
        <TextInput
          placeholder="Busca tus libros por editorial, titulo..."
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.grid}>
        {filteredProducts.map((product, index) => (
          <View key={index} style={styles.card}>
            <Image source={{ uri: product.image }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{product.title}</Text>
            <Text style={styles.cardDescription}>{product.precio}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('DetallesProducto', { producto: product })}
            >
              <Text style={styles.buttonText}>Ver más</Text>
            </TouchableOpacity>

          </View>
        ))}
      </View>
    </ScrollView>
  );
};

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
    width: '48%',
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
    width: 170,
    height: 260,
    borderRadius: 20,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  cardDescription: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 15,
  },
  button: {
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

export default ProductoScreen;
