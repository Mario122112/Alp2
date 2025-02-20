import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';

export default function Index() {
  const [mensaje, setMensaje] = useState('');

  // ID específica que deseas verificar
  const idEspecifica = 'BB3EC95F';

  const readNFT = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const data = await NfcManager.getTag();
      console.log('Datos de la etiqueta NFC:', data);

      // Asegúrate de que 'data.id' existe y es una cadena
      if (data && typeof data.id === 'string') {
        if (data.id === idEspecifica) {
          setMensaje('Autenticación exitosa');
        } else {
          setMensaje('ID no reconocida');
        }
      } else {
        setMensaje('No se pudo leer la ID de la etiqueta');
      }
    } catch (ex) {
      console.warn('ERROR', ex);
      setMensaje('Error al leer la etiqueta NFC');
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
}

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
