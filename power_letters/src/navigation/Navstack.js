// Utilidades de React Navigation
import { createStackNavigator } from '@react-navigation/stack';
// Pantalla de Inicio o Bienvenida

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/Login';
import SignUp from '../screens/Registro';
import DetallesProductoScreen from '../screens/DetalleProducto';

// Navegador Stack
const Stack = createStackNavigator();


const  NavStack = ({logueado, setLogueado, LibroId}) =>  {
  return(
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen
        name='Splash'
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name='Registro'
        options={{
          headerShown: false,
        }}
        >
        {props => <SignUp {...props} setLogueado={setLogueado} logueado={logueado} />}
        
      </Stack.Screen>

      <Stack.Screen
        name='Login'
        options={{
          headerShown: false,
        }}
        >
        {props => <LoginScreen {...props} setLogueado={setLogueado} logueado={logueado} />}
        
      </Stack.Screen>
      

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