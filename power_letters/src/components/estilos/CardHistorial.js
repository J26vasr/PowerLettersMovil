// CardHistorial.js
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../../screens/HistorialScreen'; // Asegúrate de que la ruta sea correcta
import * as Constantes from '../../utils/constantes';

const ip = Constantes.IP;

const CardHistorial = ({ item, onPress }) => (
  <TouchableOpacity contentContainerStyle={styles.container}
    style={styles.ofertaCard}
    onPress={onPress}
  >
    <Image
      source={{ uri: `${ip}/NewPowerLetters/api/images/libros/${item.imagen}` }}
      style={styles.image}
      resizeMode="contain" // Ajustar la imagen al contenedor
    />
    <View style={styles.ofertaDetails}>
      <Text style={styles.ofertaTitle}>{item.nombre_libro}</Text>
      <Text style={styles.ofertaDescription}>Cantidad: {item.cantidad}</Text>
      <Text style={styles.fecha}>Fecha del pedido: {item.fecha_pedido}</Text>
      <Text style={styles.subTotal}>Subtotal: ${(item.cantidad * item.precio).toFixed(2)}</Text>
      <View style={styles.ofertaPriceContainer}>
      </View>
    </View>
  </TouchableOpacity>

  
);

export default CardHistorial;