// Utilidades de React Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';


// Pantallas de navegación
import HomeScreen from '../screens/HomeScreen';
import ProductoScreen from '../screens/Productos';
import CarritoScreen from '../screens/CarritoScreen';
import PerfilScreen from '../screens/PerfilScreen';
import HistorialScreen from '../screens/HistorialScreen';
import NavStack from '../navigation/NavStack';
 
const Stack = createStackNavigator();
// Navegador Bottom Tabs Navigator
const Tab = createBottomTabNavigator();


export default function BottomTab({logueado, setlogueado, LibroId}) {

  return (
    
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'PowerLetters',
          tabBarActiveTintColor: '#2CC8FF', // Color activo de la pestaña
          headerStyle: {
            backgroundColor: '#FFFFFF', // Color del header
          },
          headerTintColor: '#5561CD', // Color del texto en el header
          tabBarIcon: ({ color }) => ( // Función que define el ícono de la pestaña
            <Ionicons name="home" color={color} size={24} /> // `color` proviene de React Navigation
          ),
        }}
      />
      <Tab.Screen
       name="Libros"
       component={ProductoScreen}
       options={{
         title: 'Libros',
         tabBarActiveTintColor: '#2CC8FF', // Color activo de la pestaña
         headerStyle: {
           backgroundColor: '#FFFFFF', // Color del header
         },
         headerTintColor: '#5561CD', // Color del texto en el header
         tabBarIcon: ({ color }) => ( // Función que define el ícono de la pestaña
           <Ionicons name="book" color={color} size={24} /> // `color` proviene de React Navigation
         ),
        }}
      />

        <Tab.Screen
        name="Carrito"
        component={CarritoScreen}
        options={{
          title: 'Carrito',
          tabBarActiveTintColor: '#2CC8FF', // Color activo de la pestaña
          headerStyle: {
            backgroundColor: '#FFFFFF', // Color del header
          },
          headerTintColor: '#5561CD', // Color del texto en el header
          tabBarIcon: ({ color }) => ( // Función que define el ícono de la pestaña
            <Ionicons name="bag" color={color} size={24} /> // `color` proviene de React Navigation
          ),
        }}

      />

       <Tab.Screen
        name="Mi Perfil"
        component={PerfilScreen}
        options={{
          title: 'Mi perfil',
          tabBarActiveTintColor: '#2CC8FF', // Color activo de la pestaña
          headerStyle: {
            backgroundColor: '#FFFFFF', // Color del header
          },
          headerTintColor: '#5561CD', // Color del texto en el header
          tabBarIcon: ({ color }) => ( // Función que define el ícono de la pestaña
            <Ionicons name="person" color={color} size={24} /> // `color` proviene de React Navigation
          ),
        }}
      />
       <Tab.Screen
        name="Historial"
        component={HistorialScreen}
        options={{
          title: 'Historial',
          tabBarActiveTintColor: '#2CC8FF', // Color activo de la pestaña
          headerStyle: {
            backgroundColor: '#FFFFFF', // Color del header
          },
          headerTintColor: '#5561CD', // Color del texto en el header
          tabBarIcon: ({ color }) => ( // Función que define el ícono de la pestaña
            <Ionicons name="albums" color={color} size={24} /> // `color` proviene de React Navigation
          ),
        }}
      />

      <Tab.Screen
        name="NavStack"
        component={NavStack}
        //Escondemos la opcion para que no aparezca en el BottomTab
        options={({ route }) => ({
          tabBarButton: () => null,
          headerShown: false
        })}

      />
     
    </Tab.Navigator>



  ); 
}
