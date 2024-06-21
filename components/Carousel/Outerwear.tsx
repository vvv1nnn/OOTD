import React from 'react'
import { StyleSheet, View, Image } from 'react-native'

const images: string[] = [
  'https://media.tenor.com/images/3704f2b9b8b66a5747116f436a5e6aba/tenor.gif',
  'https://i.redd.it/6d162ye9pwkb1.jpg',
  'https://media.tenor.com/images/425213c8ada06900931c2d0213389ae4/tenor.gif',
]

const Outerwear = () => {
  // Assuming you want to display the first image statically
  const staticImage = images[0]

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: staticImage }} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
  },
  imageContainer: {
    justifyContent: 'flex-end',
    paddingBottom: 5,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 20,
  },
})

export default Outerwear
