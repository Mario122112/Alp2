  import { Text, View,StyleSheet, Pressable,TouchableOpacity,Image } from "react-native";
import { useEffect, useState} from "react";
import NfcManager, { NfcTech } from "react-native-nfc-manager";
import {Link} from "expo-router";


export default function Index() {
  const [tag, setTag] = useState("");

  const readNFT = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const data = await NfcManager.getTag();
      setTag(JSON.stringify(data, null, 2));

    }catch (ex) {
      console.warn("ERROR", ex)
    } finally {
      NfcManager.cancelTechnologyRequest();
    }

  }

  return (
    <View style={estilos.contenedor}>
      <Image source={require("../assets/images/fondo.png")} style={estilos.fondo} />

      <View style={estilos.textoContainer}>
        <Text style={estilos.texto}>Autentifiquese</Text>
      </View>
      
      <View style={estilos.cajaBlanca}>
        <Text style={estilos.textoCaja}>Acerque su tarjeta de estudiante al lector NFC</Text>
      </View>
      
      <TouchableOpacity>
        <Link href={"/auth_bien"} style={[{ color: '#2BD31B' }, { fontSize: 24 }]}>SALIDA CORRECTA</Link>
      </TouchableOpacity>
      <TouchableOpacity>
        <Link href={"/auth_mal"} style={[{ color: '#BF1313' }, { fontSize: 24 }]}>SALIDA INCORRECTA</Link>
      </TouchableOpacity>
      <Image source={require("../assets/images/lector.png")} style={estilos.lector} />
    </View>
  );
}
  

const estilos = StyleSheet.create({
  contenedorCentro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 50,
    backgroundColor:"indigo",
    marginVertical:10
  },
  btnText: {
    color: 'white',
    fontSize: 16,
  },
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
    marginBottom:20,
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
    borderRadius:20,
    borderWidth:4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:90,
  },
  textoCaja:{
    fontSize: 40,
    fontWeight: 'bold',
    padding:15,
    textAlign:'center',
  },
  lector:{
    position: 'absolute', 
    bottom: -20,            
    left: 40,               
    height: 150,      
    width: 250,            
  },
});
