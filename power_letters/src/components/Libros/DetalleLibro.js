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
            <View style={styles.cardinfo}>
                <Text style={styles.text}>{item.id_libro}</Text>
                <Text style={styles.title}>{item.titulo_libro}</Text>
                <Text style={styles.description}>{item.descripcion_libro}</Text>
                <Text style={styles.detailsLabel}>Precio: <Text style={styles.textDentro}>${item.precio}</Text></Text>
                <Text style={styles.detailsLabel}>Autor: <Text style={styles.textDentro}>{item.nombre_autor}</Text></Text>
                <Text style={styles.detailsLabel}>Clasificación: <Text style={styles.textDentro}>{item.nombre_clasificacion}</Text></Text>
                <Text style={styles.detailsLabel}>Editorial: <Text style={styles.textDentro}>{item.nombre_editorial}</Text></Text>
                <Text style={styles.detailsLabel}>Género: <Text style={styles.textDentro}>{item.nombre_genero}</Text></Text>
                <Text style={styles.detailsLabel}>Existencias: <Text style={styles.textDentro}>{item.existencias}</Text></Text>
                <TouchableOpacity onPress={() => onPress(item.id_libro)} style={styles.buton}>
                    <Text>Añadir al carrito</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    cardinfo: {
        width: '100%',
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
    container: {
        flexGrow: 1,
        padding: 42,
        backgroundColor: '#F8F9FA',
    },
    image: {
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
    sizeText: {
        fontSize: 16,
        color: '#333',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#333',
    },
    detailsValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    addButton: {
        backgroundColor: '#3046BC',
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

