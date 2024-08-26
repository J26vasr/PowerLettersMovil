import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ImageBackground,
  Image,
  Alert,
  Animated
} from "react-native";
import {
  TextInput,
  Button,
  PaperProvider,
  Card,
  Avatar,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";
import fetchData from '../../src/api/components';

const EditarPerfilScreen = () => {//Url de la api
  const USER_API = 'services/public/usuario.php';
  //Constantes para el manejo de datos
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [dui, setDUI] = useState("");
  const [fechaNacimiento, setNacimiento] = useState(new Date());
  const [telefono, setTelefono] = useState("");
  const [image, setImage] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [url, setUrl] = useState('');


  const nombreRef = useRef(null);
  const apellidoRef = useRef(null);
  const correoRef = useRef(null);
  const direccionRef = useRef(null);
  const duiRef = useRef(null);
  const fechaNacimientoRef = useRef(null);
  const telefonoRef = useRef(null);
  const imageRef = useRef(null);

  // Función para obtener y mostrar el perfil del usuario
  const fetchProfile = async () => {
    try {
      const response = await fetch(`${ip}/NewPowerLetters/api/services/public/usuario.php?action=readProfile`);
      const data = await response.json();

      console.log('Perfil Data:', data);

      if (data.status) {
        setNombre(data.dataset.nombre);
        setApellido(data.dataset.apellido);
        setCorreo(data.dataset.correo);
        setDireccion(data.dataset.direccion);
        setDUI(data.dataset.dui);
        setNacimiento(data.dataset.fechaNacimiento);
        setTelefono(data.dataset.telefono);
        setImage(data.dataset.image);

        // Utiliza Nominatim para obtener las coordenadas reales de la dirección
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(data.dataset.direccion_cliente)}`;
        const geoResponse = await fetch(url);
        const geoData = await geoResponse.json();

        console.log('Geocode Data:', geoData);

        if (geoData.length > 0) {
          const { lat, lon } = geoData[0];
          const newRegion = {
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
          setRegion(newRegion);
          console.log('New Region:', newRegion);
        } else {
          setRegion({
            latitude: 13.6929,
            longitude: -89.2182,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          });
          console.log('Default Region:', region);
          Alert.alert('Error', 'No se encontró la ubicación');
        }
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      console.error('Fetch Profile Error:', error);
      Alert.alert('Error', 'Ocurrió un error al obtener el perfil');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };


  // Función para manejar la actualización de los datos del perfil
  const handleUpdate = async () => {
    // Validación de campos vacíos
    if (!nombre || !apellido || !correo || !direccion || !dui ||!fechaNacimiento||!telefono ||!image) {
      Alert.alert('Error', 'Todos los campos deben ser llenados');
      return;
    }

    try {
      // Crea un objeto con los datos del perfil
      const formData = new FormData();
      formData.append('nombre_usuario', nombre);
      formData.append('apellido_usuario', apellido);
      formData.append('correo_usuario', correo);
      formData.append('direccion_usuario', direccion);
      formData.append('dui_usuario', dui);
      formData.append('nacimiento_usuario', fechaNacimiento);
      formData.append('telefono_usuario', telefono);
      formData.append('imagen', image);

      // URL de la API para actualizar el perfil
      const url = `${ip}/NewPowerLetters/api/services/public/usuario.php?action=editProfile`;

      // Realiza la solicitud POST para actualizar el perfil
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      const responseJson = await response.json();
      console.log('API Response:', responseJson); // Imprime la respuesta JSON

      // Manejo de la respuesta
      if (responseJson.status === 1) {
        Alert.alert('Perfil actualizado', 'Los datos del perfil han sido actualizados exitosamente');
        setEditando(false); // Desactiva el modo de edición
      } else {
        // Muestra un mensaje de error si el perfil no se pudo actualizar
        Alert.alert('Error', responseJson.error || 'No se pudo actualizar el perfil');
      }
    } catch (error) {
      // Muestra un mensaje de error en caso de que ocurra un problema
      Alert.alert('Error', 'Ocurrió un error al actualizar el perfil');
      console.error('Error al actualizar el perfil:', error);
    }
  };

  // Función para manejar la cancelación y limpiar los campos
  const handleDelete = () => {
    // Limpiar los valores de los campos directamente mediante el estado
    setNombre('');
    setApellido('');
    setCorreo('');
    setDireccion('');
    setDUI('');
    setNacimiento('');
    setTelefono('');
    setImage(''); // Limpia el estado del teléfono
  
    // Limpiar el valor de los campos de entrada usando las referencias no es necesario
    setEditando(false);
    fetchProfile(); // Actualiza los datos del perfil al cancelar
  };

  // Función para obtener la dirección basada en las coordenadas
  const reverseGeocode = async (lat, lon) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
      const response = await fetch(url);
      const data = await response.json();

      console.log('Reverse Geocode Data:', data);

      if (data && data.address) {
        const address = `${data.address.road || ''}, ${data.address.city || ''}, ${data.address.country || ''}`;
        setDireccion(address);
      } else {
        Alert.alert('Error', 'No se encontró la dirección para esta ubicación');
      }
    } catch (error) {
      console.error('Reverse Geocode Error:', error);
      Alert.alert('Error', 'Ocurrió un error al obtener la dirección');
    }
  };


  
  
  //Metodo para abrir la galeria y seleccionar la imagen
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Se requieren permisos para acceder a la galería.");
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

  
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <View style={styles.container}>
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
          ref={nombreRef}
          style={styles.input}
          onChangeText={setNombre}
          value={nombre}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Apellido</Text>
        <TextInput
          ref={apellidoRef}
          style={styles.input}
          onChangeText={setApellido}
          value={apellido}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Correo</Text>
        <TextInput
          ref={correoRef}
          style={styles.input}
          onChangeText={setCorreo}
          value={correo}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Dirección</Text>
        <TextInput
          ref={direccionRef}
          style={styles.input}
          onChangeText={setDireccion}
          value={direccion}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Dui</Text>
        <TextInput
          ref={duiRef}
          style={styles.input}
          onChangeText={setDUI}
          value={dui}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nacimiento</Text>
        <TextInput
          ref={fechaNacimientoRef}
          style={styles.input}
          onChangeText={setNacimiento}
          value={fechaNacimiento}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Telefono</Text>
        <TextInput
          ref={telefonoRef}
          style={styles.input}
          onChangeText={setTelefono}
          value={telefono}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.updateButton]} onPress={handleUpdate}>
          <Text style={[styles.buttonText, styles.updateButtonText]}>Actualizar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
          <Text style={[styles.buttonText, styles.deleteButtonText]}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    width: 100, // Ajusta según sea necesario
    height: 100, // Ajusta según sea necesario
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 10, // Para hacer un contenedor circular
    overflow: 'hidden', // Para que el contenido no sobresalga del contenedor
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative', // Necesario para posicionar el icono
  },
  touchableContainer: {

    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative', // Para que el icono se posicione relativo a este contenedor

  },
  avatarImage: {

    backgroundColor: "#3c64e9",
    width: '100%',
    height: '100%',
  },
  icono: {
    position: 'absolute', // Para posicionar el icono sobre la imagen
    bottom: 10, // Ajusta la posición vertical
    right: 10, // Ajusta la posición horizontal
    marginRight: 15,
    top: 20,
    borderRadius: 12, // Bordes redondeados para el fondo del icono
    padding: 5, // Espaciado alrededor del icono
    color: "white",
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
  profileImageContainer: {
    position: 'relative',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ddd',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
    backgroundColor: '#283AE2', // Color base para los botones
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  updateButton: {
    backgroundColor: '#1968f3', // Color verde para botón "Actualizar"
  },
  deleteButton: {
    backgroundColor: '#ca0b0b', // Color rojo para botón "Cancelar"
  },
  updateButtonText: {
    color: '#fff',
  },
  deleteButtonText: {
    color: '#fff',
  },
});

export default EditarPerfilScreen;
