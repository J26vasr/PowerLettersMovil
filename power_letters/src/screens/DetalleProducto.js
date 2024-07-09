// DetalleLibroScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,Alert, TextInput, quantity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import fetchData from '../api/components';
import DetalleProductoCard from '../components/Libros/DetalleLibro';

const DetalleLibroScreen = ({ route }) => {
  const { libroId } = route.params || {};
  const [dataLibro, setDataLibro] = useState(null);
  const navigation = useNavigation();
  const [error, setError] = useState(null);
  const LIBROS_API = 'services/public/libros.php';
  const PEDIDO_API = 'services/public/pedido.php';

  const [quantity, setQuantity] = useState(1);
  
 
  const handleAddToCart = async (libroId) => {
    try {
        const cantidadSolicitada = 1; // Assuming a quantity of 1 for this example
        const updateForm = new FormData();
        updateForm.append('idLibro', libroId);
        updateForm.append('cantidad', quantity);

        if(quantity <=0){
          Alert.alert("La cantidad no puede ser igual o menor a 0");
          return;
        }

        const updateResponse = await fetchData(LIBROS_API, 'updateExistencias', updateForm);
        if (!updateResponse.status) {
            console.log(updateResponse.error);
            Alert.alert('Error', 'No se pudo actualizar las existencias');
            return;
        }

        const orderForm = new FormData();
        orderForm.append('idLibro', libroId);
        orderForm.append('cantidadLibro', quantity);

        const orderResponse = await fetchData(PEDIDO_API, 'createDetail', orderForm);
        if (orderResponse.status) {
            Alert.alert('Éxito', orderResponse.message, [
                { text: 'OK', onPress: () => navigation.navigate('ButtomTab', { screen: 'Carrito' }) },
            ]);
        } else if (orderResponse.session) {
            Alert.alert('Sesión', orderResponse.error);
        } else {
            Alert.alert('Error', orderResponse.error, [
                { text: 'OK', onPress: () => navigation.navigate('Home') },
            ]);
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
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
      
      <View style={styles.quantityContainer}>
          <Text>Cantidad a comprar:</Text>
          <TextInput style={styles.quantityInput}
          keyboardType="numeric"
          value= {String(quantity)}
          onChangeText={(text)=> setQuantity(Number(text))}
          />


        </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    padding: 42,
    backgroundColor: '#F8F9FA',
  },
  
  quantityContainer: {
    height:30,
    width:280,
    marginBottom: 15,
    backgroundColor: '#C9C9C9',
    marginTop: 90,
  },

  
});

export default DetalleLibroScreen;
