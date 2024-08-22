import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PerfilScreen = () => {
  const navigation = useNavigation();

 // Navegacion entre laspantallas
  const handleMiPerfilPress = () => {
    navigation.navigate('MiPerfil');
  };

  const handleTerminosCondicionesPress = () => {
    navigation.navigate('TerminosyCondiciones');
  };

  return (
     //Estilo del perfil dviddido en distintas opciones
     <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.Fondo}>
      
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6073/6073873.png' }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Bakugo</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={handleMiPerfilPress}>
          <MenuItem title="Mi perfil" icon="person-outline" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleTerminosCondicionesPress}>
          <MenuItem title="Terminos y condiciones" icon="document-text-outline" />
        </TouchableOpacity>
      </View>

      
    </ScrollView>
    
  );
};

const MenuItem = ({ title, icon }) => (
  <View style={styles.menuItem}>
    <Ionicons name={icon} size={24} color="#000" />
    <Text style={styles.menuItemText}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#c733ff ',
    paddingVertical: 70,
    borderRadius:200,
  },
  Fondo: {
      marginTop: -450,
      display: 'flex',
      backgroundColor:'#9333ff',
      justifyContent: 'absolute',
      alignItems: 'center',
      height: 700,
      width:420,
      borderRadius:500,
  },
 
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
    elevation: 5,
    position: 'relative', // Para que el contenido se superponga al círculo
    zIndex: 1, // Asegura que esté por encima del círculo
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60, // Mitad del ancho/alto para hacer un círculo
    marginBottom: 10,
    marginTop: -260
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20
  },
  profileSubtitle: {
    fontSize: 14,
    color: '#777',
  },
  menuContainer: {
    marginHorizontal: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 10,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 15,
  },
  socialContainer: {
    marginTop: 30,
    backgroundColor: '#eef1f5',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 20,
    elevation: 5,
  },
  socialTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
});

export default PerfilScreen;
