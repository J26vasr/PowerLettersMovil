import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, RefreshControl, ScrollView, Image } from 'react-native';
import * as Constantes from '../utils/constantes';
import styles from '../components/estilos/CarritoScreenStyles';
import { useIsFocused } from '@react-navigation/native';
import LibroItem from '../components/Libros/CarritoCard';

const CarritoScreen = ({ navigation }) => {
  const [carrito, setCarrito] = useState([]); // Estado para almacenar los productos en el carrito
  const [loading, setLoading] = useState(true); // Estado para manejar el indicador de carga
  const [refreshing, setRefreshing] = useState(false); // Estado para manejar el indicador de refresh
  const [subtotal, setSubtotal] = useState(0); // Estado para almacenar el subtotal del carrito

  const ip = Constantes.IP;
  const isFocused = useIsFocused();

  const fetchCarrito = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${ip}/NewPowerLetters/api/services/public/pedido.php?action=readDetail`);
      const data = await response.json();
      if (data.status) {
        setCarrito(data.dataset);
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al obtener los datos del carrito');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [ip]);

  useEffect(() => {
    if (isFocused) {
      fetchCarrito();
    }
  }, [isFocused, fetchCarrito]);

  const calcularSubtotal = (carrito) => {
    let total = 0;

    carrito.forEach(item => {
      const subtotalProducto = item.precio * item.cantidad;
      total += subtotalProducto; // Sumar solo el subtotal del producto
    });

    setSubtotal(total); // Actualizar el subtotal sin descuentos
  };

  const handleQuantityChange = async (item, type) => {
    let newCantidad = item.cantidad;

    if (type === 'increase') {
      newCantidad++;
    } else if (type === 'decrease') {
      newCantidad--;
    }

    if (newCantidad < 1) return;

    try {
      const formData = new FormData();
      formData.append('idDetalle', item.id_detalle.toString());
      formData.append('cantidadLibro', newCantidad.toString());

      const response = await fetch(`${ip}/NewPowerLetters/api/services/public/pedido.php?action=updateDetail`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.status === 1) {
        setCarrito(prevCarrito => {
          const updatedCarrito = prevCarrito.map(libro =>
            libro.id_detalle === item.id_detalle ? { ...libro, cantidad: newCantidad } : libro
          );
          calcularSubtotal(updatedCarrito); // Recalcular el subtotal
          return updatedCarrito;
        });
        Alert.alert('Éxito', data.message);
      } else {
        Alert.alert('Error', data.error || 'Ocurrió un problema al actualizar la cantidad del producto');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al actualizar la cantidad del producto');
      console.error(error);
    }
  };

  const handleDelete = async (idDetalle) => {
    try {
      const formData = new FormData();
      formData.append('idDetalle', idDetalle);

      const response = await fetch(`${ip}/NewPowerLetters/api/services/public/pedido.php?action=deleteDetail`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.status === 1) {
        const updatedCarrito = carrito.filter(libro => libro.id_detalle !== idDetalle);
        setCarrito(updatedCarrito);
        calcularSubtotal(updatedCarrito); // Recalcular el subtotal después de eliminar
        Alert.alert('Éxito', data.message);
      } else {
        Alert.alert('Error', data.error || 'Ocurrió un problema al eliminar el producto');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al eliminar el producto del carrito');
      console.error(error);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCarrito();
  }, [fetchCarrito]);

  useEffect(() => {
    fetchCarrito();
  }, [fetchCarrito]);

  useEffect(() => {
    calcularSubtotal(carrito); // Calcular subtotal al cargar el carrito
  }, [carrito]);

  const finalizarCompra = async () => {
    if (carrito.length === 0) {
      Alert.alert('Carrito Vacío', 'No hay productos seleccionados en el carrito.');
      return;
    }

    try {
      const response = await fetch(`${ip}/NewPowerLetters/api/services/public/pedido.php?action=finishOrder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.status === 1) {
        Alert.alert('Compra Finalizada', '¡Gracias por tu compra!');
        setCarrito([]);
      } else {
        Alert.alert('Error', data.error || 'Ocurrió un problema al finalizar el pedido');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al finalizar la compra');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Carrito</Text>
      <FlatList
        data={carrito}
        renderItem={({ item }) => (
          <LibroItem
            item={item}
            onIncrease={(item) => handleQuantityChange(item, 'increase')}
            onDecrease={(item) => handleQuantityChange(item, 'decrease')}
            onDelete={(idDetalle) => handleDelete(idDetalle)}
          />
        )}
        keyExtractor={(item) => item.id_detalle.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#0000ff']}
            tintColor="#0000ff"
          />
        }
      />
      {carrito.length === 0 && (
        <View style={styles.emptyCarritoContainer}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/8146/8146003.png' }}
            style={styles.emptyCartImage}
          />
          <Text style={styles.emptyCarritoText}>No hay productos en el carrito.</Text>
        </View>
      )}
      <View style={styles.subtotalContainer}>
        <Text style={styles.subtotalText}>Subtotal: ${subtotal.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={[styles.finalizarCompraButton, { backgroundColor: '#000' }]} onPress={finalizarCompra}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Finalizar compra</Text>
      </TouchableOpacity>
      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

export default CarritoScreen;