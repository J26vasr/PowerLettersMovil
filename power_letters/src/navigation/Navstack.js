// Utilidades de React Navigation
import { createStackNavigator } from '@react-navigation/stack';
// Pantalla de Inicio o Bienvenida
import SplashScreen from '../screens/SplashScreen';
import SignUp from '../screens/Registro';
import DetallesProductoScreen from '../screens/DetalleProducto';

// Navegador Stack
const Stack = createStackNavigator();


const  NavStack = () =>  {
  return(
    <Stack.Navigator>
      <Stack.Screen
        name='Splash'
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name='Registro'
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name='DetalleL'
        component={DetallesProductoScreen}
        options={{
          headerShown: false,
        }}
      />

    </Stack.Navigator>
  );
}


export default NavStack;