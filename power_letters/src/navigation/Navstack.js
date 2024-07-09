// Utilidades de React Navigation
import { createStackNavigator } from '@react-navigation/stack';
// Pantalla de Inicio o Bienvenida

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/Login';
import SignUp from '../screens/Registro';
import DetalleLibroScreen from '../screens/DetalleProducto';

// Navegador Stack
const Stack = createStackNavigator();


const  NavStack = ({logueado, setLogueado,libroId}) =>  {
  return(
    <Stack.Navigator>
      
      <Stack.Screen
        name='Login'
        options={{
          headerShown: false,
        }}
        >
        {props => <LoginScreen {...props} setLogueado={setLogueado} logueado={logueado} />}
        
      </Stack.Screen>
      
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
        name="DetalleL"
        options={{
          headerShown: false,
        }}
      >
        {props => <DetalleLibroScreen {...props} libroId={libroId} />}
      </Stack.Screen>
        

    </Stack.Navigator>
  );
}


export default NavStack;