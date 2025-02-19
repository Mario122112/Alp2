import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Link } from 'expo-router'

const Bien = () => {

  return (
    <ImageBackground
    source={require("../assets/images/fondo.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>LECTURA CORRECTA</Text>
        <Link href="/listado">
        <Image
          source={require('../assets/images/check.png')}
          style={styles.image}
          resizeMode="contain"
        />
        </Link>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',     
    padding: 20,
  },
  title: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 50,
  },
  image: {
    width: 300,
    height: 300,
  },
});

export default Bien;
