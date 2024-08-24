import React, { useState } from "react";
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

//Constante para manejar el alto de la pantalla
const windowHeight = Dimensions.get("window").height;

const RegisterScreen = () => {
  //Url de la api
  const USER_API = 'services/public/usuario.php';
  //Constantes para el manejo de datos
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [dui, setDUI] = useState("");
  const [fechaNacimiento, setNacimiento] = useState(new Date());
  const [telefono, setTelefono] = useState("");
  const [clave, setClave] = useState("");
  const [image, setImage] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [url, setUrl] = useState('');

  //Constante de navegación entre pantallas
  const navigation = useNavigation();

  //Metodo para manejar el registro de usuarios
  const handleRegister = async () => {
    try {
      if (
        !nombre ||
        !apellido ||
        !correo ||
        !direccion ||
        !dui ||
        !telefono ||
        !fechaNacimiento ||
        !clave
      ) {
        return;
      } else {
        const formData = new FormData();
        formData.append("nombre_usuario", nombre);
        formData.append("apellido_usuario", apellido);
        formData.append("correo_usuario", correo);
        formData.append("direccion_usuario", direccion);
        formData.append("dui_usuario", dui);
        //Manejo de insertar fecha en la base de datos
        formData.append("nacimiento_usuario", fechaNacimiento.toISOString().split('T')[0]);
        formData.append("telefono_usuario", telefono);
        formData.append("clave_usuario", clave);
        //Manejo de insertar imagen en la base de datos
        if (image) {
          const uriParts = image.split('.');
          const fileType = uriParts[uriParts.length - 1];
          formData.append("imagen", {
            uri: image,
            name: `photo.${fileType}`,
            type: `image/${fileType}`,
          });
        }

        //Petición a la api para insertar un usuario
        const response = await fetchData(USER_API, "signUpMovil", formData);
        if (response.status) {
          Alert.alert(`${response.message}`);
          console.log(`${response.message}`);
          handleLogin();
        } else {
          Alert.alert(`${response.error} ${response.exception}`);
          console.log(`Error: ${response.error} ${response.exception}`);
        }
      }
    } catch (error) {
      Alert.alert(`Error: ${error.message}`);
      console.log(`Error: ${error.message}`);
    }
  };


  // Función para redirigir a la pantalla de registro
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  //Metodo para cambiar fecha
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setNacimiento(selectedDate);
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
    <PaperProvider>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.img}>
          <Text style={styles.textoLogin}>
            Bienvenido al registro
          </Text>
          <Image
            source={require('../img/imgRegistro.png')} // Asegúrate de que esta ruta sea correcta
            style={styles.logo}
          />

          <Card style={styles.profileCard}>
            <Text style={styles.textoCamera}>
              Selecciona una foto de perfil
            </Text>
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
            <Card.Content>
              <View style={styles.inputContainer}>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Nombres:</Text>
                  <View style={styles.rowContent}>
                    <AntDesign name="user" size={24} />
                    <TextInput
                      style={styles.infoText}
                      value={nombre}
                      onChangeText={setNombre}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Apellidos:</Text>
                  <View style={styles.rowContent}>
                    <AntDesign name="user" size={24} />
                    <TextInput
                      style={styles.infoText}
                      value={apellido}
                      onChangeText={setApellido}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Correo:</Text>
                  <View style={styles.rowContent}>
                    <AntDesign name="mail" size={24} />
                    <TextInput
                      style={styles.infoText}
                      value={correo}
                      onChangeText={setCorreo}
                      keyboardType="email-address"
                    />
                  </View>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Clave:</Text>
                  <View style={styles.rowContent}>
                    <Entypo name="lock" size={24} />
                    <TextInput
                      style={styles.infoText}
                      value={clave}
                      onChangeText={setClave}
                      secureTextEntry={true}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Dui:</Text>
                  <View style={styles.rowContent}>
                    <AntDesign name="idcard" size={24} />
                    <TextInput
                      style={styles.infoText}
                      value={dui}
                      onChangeText={setDUI}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.fila}>
                <View style={[styles.inputContainer, { flex: 1 }]}>
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Teléfono:</Text>
                    <View style={styles.rowContent}>
                      <AntDesign name="phone" size={24} />
                      <TextInput
                        style={styles.infoText}
                        value={telefono}
                        onChangeText={setTelefono}
                        keyboardType="phone-pad"
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.fila}>
                <View style={[styles.inputContainer, { flex: 1 }]}>
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Fecha de nacimiento:</Text>
                    <View style={styles.rowContent}>
                      <Entypo name="calendar" size={24} />
                      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                        <Text style={styles.infoText}>
                          {fechaNacimiento.toLocaleDateString()}
                        </Text>
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
                  </View>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Dirección:</Text>
                  <View style={styles.rowContent}>
                    <Entypo name="map" size={24} />
                    <TextInput
                      style={styles.infoText}
                      value={direccion}
                      onChangeText={setDireccion}
                    />
                  </View>
                </View>
              </View>

              <Button
                style={styles.button}
                mode="contained"
                onPress={handleRegister}
              ><Text style={styles.btnGuardar}>
                  Guardar
                </Text>
              </Button>
              <TouchableOpacity onPress={handleLogin}>
                <Text style={styles.loginText}>Regresar al inicio de sesión</Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </PaperProvider >
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  textoLogin: {
    color: "black",
    fontSize: 30,
  },
  textoCamera: {
    color: "black",
    fontSize: 15,
    marginLeft: 70,
  },

  img: {
    marginTop: 80,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: 10,

  },
  scrollViewContent: {
    flexGrow: 1,

    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: windowHeight * 0.15,
    paddingTop: 50,
  },
  profileCard: {
    width: 380,
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#889cf4",
    paddingTop: 20,
    paddingBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },

  infoRow: {
    padding: 12,
    margin: 2,
    borderRadius: 10,
    backgroundColor: "white",
    width: "100%",
    elevation: 2,
  },
  rowContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    backgroundColor: "transparent",
    height: 40,
    borderWidth: 0,
    flex: 1,
  },
  pickerText: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: "black",
    flex: 1,
  },
  fila: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    width: "100%",
    paddingVertical: 10,
    marginTop: 20,
    backgroundColor: "#2955e8",
  },
  loginText: {
    marginTop: 20,
    color: "black",
    fontSize:15,
    marginLeft:60,
  },
  btnGuardar: {
    marginTop: 20,
    color: "white",
  },
  avatarContainer: {
    width: 100, // Ajusta según sea necesario
    height: 100, // Ajusta según sea necesario
    marginLeft: 130,
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
});