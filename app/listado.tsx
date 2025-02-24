import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from "expo-router";
import React, { useEffect, useState } from 'react';
import { db } from '../FireBaseconfig'; 
import { collection, getDocs } from 'firebase/firestore';

const List: React.FC = () => {
  const [usuario, setUsuario] = useState<any>(null); // Estado para almacenar los datos

  useEffect(() => {
    // Función para obtener los datos de Firebase
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ALP")); // Accede a la colección de usuarios
        querySnapshot.forEach((doc) => {
          // Suponiendo que la colección tiene solo un documento
          setUsuario(doc.data()); // Almacena los datos del primer documento en el estado
        });
      } catch (error) {
        console.error("Error al obtener los documentos: ", error);
      }
    };

    fetchData();
  }, []); // Se ejecuta solo una vez cuando el componente se monta

  // Si los datos no están cargados aún, muestra un texto de carga
  if (!usuario) {
    return (
      <View style={estilos.contenedor}>
        <Text style={estilos.texto}>Cargando...</Text>
      </View>
    );
  }

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
            <Text style={[{ fontWeight: "bold", fontSize: 30 }]}>
              {usuario.nombre} {usuario.apellido1} {usuario.apellido2}
            </Text>
          </View>
          <View style={estilos.datos}>
            <Image source={require("../assets/images/iden.png")} style={estilos.icono} />
            <Text style={[{ fontWeight: "bold", fontSize: 30 }]}>
              {usuario.ID}
            </Text>
          </View>
          <View style={estilos.datos}>
            <Image source={require("../assets/images/school.png")} style={estilos.icono} />
            <Text style={[{ fontWeight: "bold", fontSize: 30 }]}>
              {usuario.curso}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity>
        <Link href={"/"} style={{ color: '#f9f9f9' }}>Volver</Link>
      </TouchableOpacity>
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
  foto_usuario: {
    height: 200,
    width: 200,
    borderRadius: 15,
    marginRight: 90,
    marginLeft: 30,
  },
  texto: {
    color: 'white',
    fontSize: 75,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowRadius: 1,
    marginBottom: 30,
    textShadowOffset: {
      width: 2,
      height: 2,
    },
  },
  datos: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  contenedor_datos: {
    flex: 1,
    justifyContent: "center",
  },
  cajaBlanca: {
    flexDirection: "row",
    backgroundColor: '#F9F9F9',
    width: '80%',
    height: '45%',
    borderRadius: 20,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    padding: 20,
  },
  icono: {
    width: 50,
    height: 50,
    marginRight: 30,
  }
});

export default List;
