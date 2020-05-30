import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Three from './src/Three'

export default function App() {
  return (
    <View style={styles.container}>
      <Three />
      <Text style={styles.text}>Welcome to Expo with Three.js</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  text: {
    marginTop: 64,
    fontSize: 22,
    fontWeight: '300',
    letterSpacing: 1.2
  }
})
