import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; // Necesario para tipar la navegación

// Importa el tipo de rutas
type RootStackParamList = {
  Home: undefined;
  AuthBien: undefined;
  AuthMal: undefined;
};

const Index: React.FC = () => {
  const [mensaje, setMensaje] = useState<string>('');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>(); // Tipamos la navegación

  const idEspecifica = 'BB3EC95F';

  const readNFT = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const data = await NfcManager.getTag();
      console.log('Datos de la etiqueta NFC:', data);

      if (data && typeof data.id === 'string') {
        if (data.id === idEspecifica) {
          setMensaje('Autenticación exitosa');
          navigation.navigate('AuthBien');  // Navegar a la pantalla de autenticación exitosa
        } else {
          setMensaje('ID no reconocida');
          navigation.navigate('AuthMal');  // Navegar a la pantalla de autenticación fallida
        }
      } else {
        setMensaje('No se pudo leer la ID de la etiqueta');
        navigation.navigate('AuthMal');  // Navegar a la pantalla de autenticación fallida
      }
    } catch (ex) {
      console.warn('ERROR', ex);
      setMensaje('Error al leer la etiqueta NFC');
      navigation.navigate('AuthMal');  // Navegar a la pantalla de autenticación fallida
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  return (
    <View style={estilos.contenedor}>
      <Image source={require('../assets/images/fondo.png')} style={estilos.fondo} />

      <View style={estilos.textoContainer}>
        <Text style={estilos.texto}>Autentifiquese</Text>
      </View>

      <TouchableOpacity onPress={readNFT}>
        <View style={estilos.cajaBlanca}>
          <Text style={estilos.textoCaja}>Acerque su tarjeta de estudiante al lector NFC</Text>
        </View>
      </TouchableOpacity>

      {mensaje ? (
        <View style={estilos.mensajeContainer}>
          <Text style={estilos.mensajeTexto}>{mensaje}</Text>
        </View>
      ) : null}

      <Image source={require('../assets/images/lector.png')} style={estilos.lector} />
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fondo: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  textoContainer: {
    zIndex: 1,
    marginBottom: 20,
  },
  texto: {
    color: 'white',
    fontSize: 64,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowRadius: 1,
    textShadowOffset: {
      width: 2,
      height: 2,
    },
  },
  cajaBlanca: {
    zIndex: 1,
    backgroundColor: '#F9F9F9',
    width: '55%',
    height: '35%',
    borderRadius: 20,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 90,
  },
  textoCaja: {
    fontSize: 40,
    fontWeight: 'bold',
    padding: 15,
    textAlign: 'center',
  },
  mensajeContainer: {
    zIndex: 1,
    backgroundColor: '#F9F9F9',
    width: '80%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  mensajeTexto: {
    fontSize: 16,
    textAlign: 'center',
  },
  lector: {
    position: 'absolute',
    bottom: -20,
    left: 40,
    height: 150,
    width: 250,
  },
});

export default Index;
