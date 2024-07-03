// Utilidades de React Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';


// Pantallas de navegación
import HomeScreen from '../screens/HomeScreen';
import ProductoScreen from '../screens/Productos';
import CarritoScreen from '../screens/CarritoScreen';
 
// Navegador Bottom Tabs Navigator
const Tab = createBottomTabNavigator();
 
export default function BottomTab() {
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
    </Tab.Navigator>
  );  
}
