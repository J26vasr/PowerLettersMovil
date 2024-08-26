import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { TextInput, Avatar } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import * as Constantes from '../utils/constantes';

const EditarPerfilScreen = () => {
  
  const [refreshing, setRefreshing] = useState(false);
  const USER_API = 'services/public/usuario.php';
  
  // Estado para los datos del perfil
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [dui, setDUI] = useState("");
  const [fechaNacimiento, setNacimiento] = useState(new Date());
  const [telefono, setTelefono] = useState("");
  const [image, setImage] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  // Efecto para cargar el perfil
  useEffect(() => {
    fetchProfile();
  }, []);

  // Función para obtener y mostrar el perfil del usuario
  const fetchProfile = async () => {
    setLoading(true);
    const ip = Constantes.IP;

    try {
      const response = await fetch(`${ip}/NewPowerLetters/api/services/public/usuario.php?action=readProfile`);
      const data = await response.json();

      if (data.status) {
        setNombre(data.dataset.nombre_usuario);
        setApellido(data.dataset.apellido_usuario);
        setCorreo(data.dataset.correo_usuario);
        setDireccion(data.dataset.direccion_usuario);
        setDUI(data.dataset.dui_usuario);
        setNacimiento(new Date(data.dataset.nacimiento_usuario));
        setTelefono(data.dataset.telefono_usuario);
        setImage(data.dataset.imagen);
      }
    } catch (error) {
      console.error('Fetch Profile Error:', error);
      Alert.alert('Error', 'Ocurrió un error al obtener el perfil');
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar la actualización de los datos del perfil
  const handleUpdate = async () => {
    if (!nombre || !apellido || !correo || !direccion || !dui || !telefono || !image) {
      Alert.alert('Error', 'Todos los campos deben ser llenados');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('nombre_usuario', nombre);
      formData.append('apellido_usuario', apellido);
      formData.append('correo_usuario', correo);
      formData.append('direccion_usuario', direccion);
      formData.append('dui_usuario', dui);
      formData.append("nacimiento_usuario", fechaNacimiento.toISOString().split('T')[0]);
      formData.append('telefono_usuario', telefono);

      if (image) {
        const uriParts = image.split('.');
        const fileType = uriParts[uriParts.length - 1];
        formData.append("imagen", {
          uri: image,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      const ip = Constantes.IP;
      const url = `${ip}/NewPowerLetters/api/services/public/usuario.php?action=editProfile`;

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      const responseJson = await response.json();

      if (responseJson.status === 1) {
        Alert.alert('Perfil actualizado', 'Los datos del perfil han sido actualizados exitosamente');
      } else {
        Alert.alert('Error', responseJson.error || 'No se pudo actualizar el perfil');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al actualizar el perfil');
      console.error('Error al actualizar el perfil:', error);
    }
  };

  // Función para manejar la cancelación y limpiar los campos
  const handleCancel = () => {
    fetchProfile(); // Vuelve a cargar los datos del perfil original
  };

  // Función para abrir la galería y seleccionar una imagen
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso requerido", "Se requieren permisos para acceder a la galería.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Función para manejar el cambio de fecha
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fechaNacimiento;
    setShowDatePicker(false);
    setNacimiento(currentDate);
  };
    // Función para recargar manualmente los datos
    const handleReload = () => {
      setRefreshing(true);
      fetchHistorial().finally(() => {
          setRefreshing(false);
      });
  };

  

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
      <TouchableOpacity onPress={handleReload} style={styles.reloadButton}>
                <Text style={styles.reloadButtonText}>Recargar</Text>
            </TouchableOpacity>
        <Text style={styles.title}>Datos Personales</Text>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.touchableContainer}>
            {image ? (
              <Image source={{ uri: image }} style={styles.avatarImage} />
            ) : (
              <Avatar.Image style={styles.avatarImage} />
            )}
            <Entypo name="camera" size={40} style={styles.icono} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            onChangeText={setNombre}
            value={nombre}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Apellido</Text>
          <TextInput
            style={styles.input}
            onChangeText={setApellido}
            value={apellido}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Correo</Text>
          <TextInput
            style={styles.input}
            onChangeText={setCorreo}
            value={correo}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Dirección</Text>
          <TextInput
            style={styles.input}
            onChangeText={setDireccion}
            value={direccion}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>DUI</Text>
          <TextInput
            style={styles.input}
            onChangeText={setDUI}
            value={dui}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nacimiento</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
            <Text>{fechaNacimiento.toDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={fechaNacimiento}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={styles.input}
            onChangeText={setTelefono}
            value={telefono}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.updateButton]} onPress={handleUpdate}>
            <Text style={[styles.buttonText, styles.updateButtonText]}>Actualizar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleCancel}>
            <Text style={[styles.buttonText, styles.deleteButtonText]}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    width: 100,
    height: 100,
    marginVertical: 10,
    borderRadius: 50,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  touchableContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  icono: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    color: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    width: '48%',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#283AE2',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  updateButton: {
    backgroundColor: '#1968f3',
  },
  deleteButton: {
    backgroundColor: '#ca0b0b',
  },
  updateButtonText: {
    color: '#fff',
  },
  deleteButtonText: {
    color: '#fff',
  },
});

export default EditarPerfilScreen;
