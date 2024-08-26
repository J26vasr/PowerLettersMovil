import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Alert, RefreshControl, TouchableOpacity } from 'react-native';
import * as Constantes from '../utils/constantes';
import { Ionicons } from '@expo/vector-icons';
import styles from '../components/Libros/StyleHistorial';
import CardHistorial from '../components/estilos/CardHistorial';


const HistorialScreen = ({ navigation }) => {
    const [historial, setHistorial] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const ip = Constantes.IP;

    // Función para obtener los productos comprados desde la API
    const fetchHistorial = useCallback(async () => {
        try {
            const response = await fetch(`${ip}/NewPowerLetters/api/services/public/pedido.php?action=readHistorial`);
            const data = await response.json();
            if (data.status) {
                setHistorial(data.dataset);
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al obtener los datos del historial');
            console.log(error);
        }
    }, [ip]);

    // Efecto para cargar el historial al cargar la pantalla
    useEffect(() => {
        fetchHistorial();
    }, [fetchHistorial]);

    // Función para manejar el evento de refrescar
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchHistorial().finally(() => {
            setRefreshing(false);
        });
    }, [fetchHistorial]);

    // Función para recargar manualmente los datos
    const handleReload = () => {
        setRefreshing(true);
        fetchHistorial().finally(() => {
            setRefreshing(false);
        });
    };

    // Función para renderizar cada elemento del historial
    const renderHistorialItem = ({ item }) => (
        <CardHistorial
            item={item}
            onPress={() => navigation.navigate('DetallesProducto', { libroId: item.id_pedido })}
        />
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.title}>Historial de pedidos</Text>

            <TouchableOpacity onPress={handleReload} style={styles.reloadButton}>
                <Text style={styles.reloadButtonText}>Recargar</Text>
            </TouchableOpacity>

            <FlatList
                data={historial}
                renderItem={renderHistorialItem}
                keyExtractor={item => item.id_pedido.toString()}
                contentContainerStyle={styles.listContainer}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </View>
    );
};

export default HistorialScreen;