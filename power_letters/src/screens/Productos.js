import React, { useState } from 'react';
import { View, Text, StyleSheet,Image, TextInput } from 'react-native';


const Productos = () => {
    
  const [searchText, setSearchText] = useState('');

    return (
        <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
        <Text style={styles.title}>
                Bienvenido usuario
        </Text>

        <View style={styles.containerCarrusel}>
        <Image
        source={{ uri: images[currentImageIndex] }}
        style={styles.banner}
      />
        </View>

        <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#000" style={styles.searchIcon} />
        <TextInput
          placeholder="Busca tus libros por titulo, autor, editorial..."
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
       
        </View>
        </ScrollView>



    );

    
    
}


export default Productos;


// Estilos para los componentes.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingHorizontal: 15
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 30,
        textTransform: 'uppercase',
    },
    searchIcon: {
        marginRight: 15,
      },
      searchInput: {
        marginTop: 50,
        flex: 1,
        height: 40,
        fontSize: 18,
        color: '#333',
      },

  
});

