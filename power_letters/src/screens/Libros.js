import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, FlatList, RefreshControl } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import fetchData from '../api/components';
import LibroItem from '../components/Libros/ProductoCard';

const ProductoScreen = () => {
  // Estados para manejar los datos de los libros, el texto de búsqueda, la cantidad de productos y los errores
  const [dataLibros, setDataLibros] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [quantityProducts, setQuantityProducts] = useState('');
  const [error, setError] = useState(null);

  // Constante de navegación entre pantallas
  const navigation = useNavigation();

  // URL de la API para obtener los libros
  const LIBROS_API = 'services/public/libros.php';

  // Función asincrónica para llenar la lista de productos desde la API
  const fillProducts = async () => {
    try {
      const data = await fetchData(LIBROS_API, 'readAll');
      if (data.status) {
        setDataLibros(data.dataset);
        setQuantityProducts(data.message);
      } else {
        setDataLibros([]);
        setQuantityProducts('Existen 0 coincidencias');
      }
    } catch (error) {
      setError(error);
    }
  };

  // Maneja la navegación al presionar un libro
  const handleLibrosPress = (libroId) => {
    console.log("ID: ", libroId);
    if (!libroId) {
      alert('No se pudieron cargar los libros');
      return;
    }
    navigation.navigate('NavStack', { screen: 'DetalleL', params: { libroId } });
  };

  // Hook de efecto para llenar los productos cuando el componente se monta
  useEffect(() => {
    fillProducts();
  }, []);

  // Función para renderizar cada item de la lista de libros
  const renderLibrosItem = ({ item }) => (
    <LibroItem item={item} onPress={handleLibrosPress} />
  );

  // Cuerpo de las card
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
      <FlatList
        data={dataLibros}
        renderItem={renderLibrosItem}
        keyExtractor={(item) => item.id_libro}
        numColumns={2}
      />
      <View style={styles.grid}>
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
