import { View, Text, TouchableOpacity,StyleSheet,Image} from 'react-native'
import {Link} from "expo-router";
import React from 'react'



const app = () => {
  return (
    <View style={estilos.contenedor}>
      <Image source={require("../assets/images/fondo.png")} style={estilos.fondo} />
      <View style={estilos.textoContainer}>
      <Text style={estilos.texto}>Bienvenido</Text>
      </View>
      <View style={estilos.cajaBlanca}>
        <TouchableOpacity>
          <Link href={"/"} style={estilos.textoCaja}>Acceder</Link>
        </TouchableOpacity>
      </View>
      <Link href={"/listado"} style={{color:"red"}}>Listado</Link>
    </View>
  )
}
const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cajaBlanca: {
    zIndex: 1,
    backgroundColor: '#F9F9F9',
    width: '25%', 
    height: '22%', 
    borderRadius:20,
    borderWidth:4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:90,
    top: '10%',
  },
  textoCaja: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  fondo: {
    position: 'absolute',
    width: '100%',
    height: '200%',
  },
  texto: {
    color: 'white',
    fontSize: 44,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowRadius: 1,
    textShadowOffset: { 
      width: 2,
      height: 2,
    },
  },
  textoContainer: {
    zIndex: 1, 
    marginBottom:20,
    textAlign: 'center',
  },
});


export default app