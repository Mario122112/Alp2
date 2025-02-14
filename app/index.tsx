  import { Text, View,StyleSheet, Pressable } from "react-native";
import { useEffect, useState} from "react";
import NfcManager, { NfcTech } from "react-native-nfc-manager";


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

    <View style={styles.contenedorCentro}>
      <Text>{tag}</Text>
      <Pressable style={styles.btn} onPress={readNFT}>
        <Text style={styles.btnText}>Escanear Tarjeta</Text>
      </Pressable>
      <Pressable style={styles.btn} onPress={() =>setTag("")}>
        <Text style={styles.btnText}>limpiar</Text>
      </Pressable>
    </View>
  );
}
  

const styles = StyleSheet.create({
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
  }

});