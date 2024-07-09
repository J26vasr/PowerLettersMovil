// DetalleLibroScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import fetchData from '../api/components';
import DetalleProductoCard from '../components/Libros/DetalleLibro';

const DetalleLibroScreen = ({ route }) => {
  const { libroId } = route.params || {};
  const [dataLibro, setDataLibro] = useState(null);
  const navigation = useNavigation();
  const [error, setError] = useState(null);
  const LIBROS_API = 'services/public/libros.php';

  const handleAddToCart = (libroId) => {
    if (!libroId) {
      alert('No se pudo agregar al carrito');
      return;
    }
    navigation.navigate('ButtomTab', { screen: 'Carrito' });
  };

  useEffect(() => {
    const fillProduct = async () => {
      try {
        const form = new FormData();
        form.append('idLibro', libroId);
        const data = await fetchData(LIBROS_API, 'readOne', form);
        if (data.status) {
          setDataLibro(data.dataset);
        } else {
          setDataLibro(null);
        }
      } catch (error) {
        setError(error);
      }
    };
    fillProduct();
  }, [libroId]);

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  if (!dataLibro) {
    return (
      <View style={styles.container}>
        <Text>No se encontró el libro</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <DetalleProductoCard item={dataLibro} onPress={handleAddToCart} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 42,
    backgroundColor: '#F8F9FA',
  },
});

export default DetalleLibroScreen;
