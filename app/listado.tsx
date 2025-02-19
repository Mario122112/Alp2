import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from "expo-router";
import React from 'react';


const list = () => {
  return (
    <View style={estilos.contenedor}>
      <Image source={require("../assets/images/fondo.png")} style={estilos.fondo} />

      <View style={[{ marginBottom: 20 }]}>
        <Text style={estilos.texto}>Bienvenido a clase</Text>
      </View>
      <View style={estilos.cajaBlanca}>
        <Image source={require("../assets/images/hombre_feliz.png")} style={estilos.foto_usuario} />
        <View style={estilos.contenedor_datos}>
          <View style={estilos.datos}>
            <Image source={require("../assets/images/usuario.png")} style={estilos.icono} />
            <Text style={[{fontWeight:"bold",fontSize:30}]}>Nombre Apellido1 Apellido2</Text>
          </View>
          <View style={estilos.datos}>
            <Image source={require("../assets/images/iden.png")} style={estilos.icono} />
            <Text style={[{fontWeight:"bold",fontSize:30}]}>1833050</Text>
          </View>
          <View style={estilos.datos}>
            <Image source={require("../assets/images/school.png")} style={estilos.icono} />
            <Text style={[{fontWeight:"bold",fontSize:30}]}>Desarrollo Aplicaciones Multiplataforma</Text>
          </View>
        </View>

      </View>
      <TouchableOpacity>
        <Link href={"/"} style={{color: '#f9f9f9'}}>Moverse entre páginas</Link>
      </TouchableOpacity>
    </View>
  )
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
  foto_usuario: {
    height: 200,
    width: 200,
    borderRadius: 15,
    marginRight:90,
    marginLeft:30,
  },
  texto: {
    color: 'white',
    fontSize: 75,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowRadius: 1,
    marginBottom:30,
    textShadowOffset: {
      width: 2,
      height: 2,
    },
  },
  datos:{
    flexDirection:"row",
    alignItems:"center",
    marginTop:12,
  },
  contenedor_datos:{
    flex:1,
    justifyContent:"center",
  },
  cajaBlanca: {
    flexDirection:"row",
    backgroundColor: '#F9F9F9',
    width: '80%',
    height: '45%',
    borderRadius: 20,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    padding:20,
  },
  icono: {
    width: 50,
    height: 50,
    marginRight:30,
  }
});

export default list 