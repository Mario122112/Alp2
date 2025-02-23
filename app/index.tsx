import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; // Necesario para la navegación
import { db } from '../FireBaseconfig'; // Importar tu configuración de Firebase
import { collection, getDocs } from 'firebase/firestore'; // Importar las funciones de Firestore

// Tipado de rutas
type RootStackParamList = {
  Index: undefined;   // Pantalla de inicio (Home)
  auth_bien: undefined;  // Pantalla de autenticación exitosa
  auth_mal: undefined;  // Pantalla de autenticación fallida
};

const Index: React.FC = () => {
  const [mensaje, setMensaje] = useState<string>(''); // Mantén el estado de mensaje
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>(); // Tipamos la navegación con el tipo definido
  const idEspecifica = 'BB3EC95F';  // El ID específico con el que compararemos

  const readNFT = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef); // Solicitar la tecnología NFC
      const data = await NfcManager.getTag(); // Obtener los datos de la etiqueta NFC
      console.log('Datos de la etiqueta NFC:', data);

      if (data && typeof data.id === 'string') {
        // Comparar el ID de la etiqueta NFC con el ID de la base de datos Firestore
        const idLeido = data.id;

        // Consultar Firestore para obtener los datos de la colección
        const querySnapshot = await getDocs(collection(db, 'ALP')); 
        let idValido = false;

        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          const idFirestore = docData.ID; 

          if (idLeido === idFirestore) {
            idValido = true;
          }
        });

        if (idValido) {
          navigation.navigate('auth_bien'); // Si el ID coincide, navega a auth_bien
        } else {
          navigation.navigate('auth_mal'); // Si no coincide, navega a auth_mal
        }
      } else {
        navigation.navigate('auth_mal'); // Navegar a la pantalla de autenticación fallida si no hay datos en la etiqueta NFC
      }
    } catch (ex) {
      console.warn('ERROR', ex);
      navigation.navigate('auth_mal'); // Navegar a la pantalla de autenticación fallida en caso de error
    } finally {
      NfcManager.cancelTechnologyRequest(); // Cancelar solicitud de tecnología NFC
    }
  };

  return (
    <View style={estilos.contenedor}>
      <Image source={require('../assets/images/fondo.png')} style={estilos.fondo} />
      <View style={estilos.textoContainer}>
        <Text style={estilos.texto}>Inicio</Text>
      </View>

      <TouchableOpacity style={estilos.cajaBlanca} onPress={readNFT}>
        <View>
          <Text style={estilos.textoCaja}>Pulse aqui para leer su tarjeta</Text>
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
    width: '50%',
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
