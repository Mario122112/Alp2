import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Index from './index';  
import AuthBien from './auth_bien'; 
import AuthMal from './auth_mal'; 
import Listado from './listado';

type RootStackParamList = {
  Index: undefined;
  AuthBien: undefined;
  AuthMal: undefined;
  Listado: undefined;
  Inicio: undefined;  
};

const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index">
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="auth_bien" component={AuthBien} />
        <Stack.Screen name="auth_mal" component={AuthMal} />
        <Stack.Screen name="listado" component={Listado} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
