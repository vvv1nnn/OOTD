import React from 'react'
import { StyleSheet, View, Image } from 'react-native'

type Props = {
  image: string | null | undefined
}

const DisplayClothing = ({ image }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: image ?? undefined }} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 20,
  },
})

export default DisplayClothing
