import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Index from './index';  // Tu archivo principal
import AuthBien from './auth_bien';  // Pantalla de autenticación exitosa
import AuthMal from './auth_mal';  // Pantalla de autenticación fallida

type RootStackParamList = {
  Home: undefined;
  AuthBien: undefined;
  AuthMal: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Index} />
        <Stack.Screen name="AuthBien" component={AuthBien} />
        <Stack.Screen name="AuthMal" component={AuthMal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
