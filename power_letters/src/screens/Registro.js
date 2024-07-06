import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const SignUp = ({logueado, setLogueado}) => {
  const [name, setName] = useState('');
  const [lasname, setLastName] = useState('');
  const [dui, setDui] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [birth, setBirth] = useState('');
  const [img, setImagen] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
 
  const navigation = useNavigation();

  const handleRegister = () => {
    console.log('Nombre:', name);
    console.log('Apellido:', lasname);
    console.log('DUI:', dui);
    console.log('Correo:', email);
    console.log('Telefono:', phone);
    console.log('Direccion:', address);
    console.log('Nacimiento:', birth);
    console.log('Contraseña:', password);
    console.log('Imagen:', img);
  };

  const handleLoginRedirect = () => {
    setLogueado(!logueado);
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={require('../img/registro.jpg')} style={styles.logo} />
        <Text style={styles.title}>Registro</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        onChangeText={text => setName(text)}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        onChangeText={text => setLastName(text)}
        value={lasname}
      />
       <TextInput
        style={styles.input}
        placeholder="DUI"
        onChangeText={text => setDui(text)}
        value={dui}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        onChangeText={text => setPhone(text)}
        value={phone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Dirección"
        onChangeText={text => setAddress(text)}
        value={address}
        secureTextEntry={true}
      />
       <TextInput
        style={styles.input}
        placeholder="Fecha de nacimiento"
        onChangeText={text => setBirth(text)}
        value={birth}
        secureTextEntry={true}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Imagen"
        onChangeText={text => setImagen(text)}
        value={img}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Repetir contraseña"
        onChangeText={text => setPassword2(text)}
        value={password2}
        secureTextEntry={true}
      />
      
     
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLoginRedirect}>
        <Text style={styles.loginRedirectText}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 70,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 250,
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    backgroundColor: '#f0f0f0',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  addressContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  addressInput: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  registerButton: {
    backgroundColor: '#3046BC',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginRedirectText: {
    color: '#007bff',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default SignUp;
