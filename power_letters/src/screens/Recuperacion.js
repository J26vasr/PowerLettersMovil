import { StyleSheet, Text, View, TextInput, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import * as Constantes from '../utils/constantes';
import Constants from 'expo-constants';

export default function RecuperarContrasena({ navigation }) {
    const ip = Constantes.IP;

    const [correo, setCorreo] = useState('');
    const [token, setToken] = useState('');
    const [nuevaClave, setNuevaClave] = useState('');

    const handleResetPassword = async () => {
        // Validaciones de entrada
        if (!correo.trim()) {
            Alert.alert("Debes ingresar un correo electrónico");
            return;
        }

        if (!token.trim() || !nuevaClave.trim()) {
            Alert.alert("Debes llenar todos los campos");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('correo', correo);
            formData.append('token', token);
            formData.append('clave', nuevaClave);

            const response = await fetch(`${ip}/NewPowerLetters/api/services/public/usuario.php?action=recovery`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data', // Asegúrate de que el tipo de contenido sea correcto
                },
            });

            const data = await response.json();
            if (data.status) {
                Alert.alert(
                    'Contraseña actualizada correctamente',
                    '',
                    [
                        {
                            text: 'OK',
                            onPress: () => navigation.navigate('Sesion'),
                        },
                    ]
                );
            } else {
                Alert.alert('Error', data.error || 'Error desconocido'); // Manejo de errores
            }
        } catch (error) {
            Alert.alert('Ocurrió un error al intentar actualizar la contraseña');
            console.error('Error al actualizar la contraseña:', error); // Log para depuración
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                <Text style={styles.texto}>Recuperar Contraseña</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Correo de usuario"
                    value={correo}
                    onChangeText={setCorreo}
                />

                <TextInput
                    style={styles.input}
                    placeholder='Ingrese el Token'
                    value={token}
                    onChangeText={setToken}
                />

                <TextInput
                    style={styles.input}
                    placeholder='Nueva Contraseña'
                    value={nuevaClave}
                    onChangeText={setNuevaClave}
                    secureTextEntry={true} // para que el texto se muestre como puntos
                />

                <TouchableOpacity style={styles.addButton} onPress={handleResetPassword}>
                    <Text style={styles.addButtonText}>Generar</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        padding: 12,
        margin: 2,
        borderRadius: 10,
        backgroundColor: "white",
        width: "100%",
        elevation: 2,
    },
    addButton: {
        marginTop: 30,
        backgroundColor: 'black',
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
    container: {
        flex: 1,
        backgroundColor: '#778DA9',
        paddingTop: Constants.statusBarHeight + 5,
    },
    scrollViewStyle: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    texto: {
        color: '#322C2B',
        fontWeight: '900',
        fontSize: 20,
        marginBottom: 20
    },
});