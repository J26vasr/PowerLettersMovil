import { StatusBar, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as Constantes from "../../utils/constantes";

export default function CarritoCard({ item, onIncrease, onDecrease, onDelete }) {
  return (
    <TouchableOpacity style={styles.card}>
      <Image
        source={{ uri: `${Constantes.IP}/NewPowerLetters/api/images/libros/${item.imagen}` }}
        style={styles.image}
        resizeMode="contain" // Ajustar la imagen al contenedor
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.textTitle}>{item.nombre_producto}</Text>
        <Text style={styles.textPrecio}>Precio: <Text style={styles.textDentro}>${item.precio}</Text></Text>
        <Text style={styles.textPrecio}>Cantidad: <Text style={styles.textDentro}>{item.cantidad}</Text></Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton} 
            onPress={() => onDecrease(item)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.cantidad}</Text>
          <TouchableOpacity 
            style={styles.quantityButton} 
            onPress={() => onIncrease(item)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => onDelete(item.id_detalle)} style={styles.deleteButton}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

// Estilos actualizados
const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    flexDirection: 'row', // Cambiado para alinear imagen y detalles horizontalmente
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  image: {
    width: 100, // Ajusta el tamaño de la imagen
    height: 150,
    borderRadius: 10,
    marginRight: 15, // Espacio entre la imagen y el texto
  },
  detailsContainer: {
    flex: 1, // Ocupa el espacio restante
  },
  textTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  textPrecio: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  quantityButton: {
    backgroundColor: '#5981CF',
    borderRadius: 15,
    padding: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    width:10,
  },
  quantity: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#FF3B30', // Color rojo para el botón de eliminar
    borderRadius: 15,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
    width:110,
  },
});