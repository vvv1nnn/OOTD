import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { RotateInDownLeft } from 'react-native-reanimated'

const logo = require('@/assets/images/SADCAT.png')

const ProfileWardrobe = () => {
  return (
    <View>
      <Text style={styles.wardrobe}>Wardrobe</Text>
      <Text style={styles.text}>HEADWEAR</Text>
      <View style={styles.container}>
        {/* Headwear */}
        <Image source={logo} style={styles.img} />
        <Image source={logo} style={styles.img} />
        <Image source={logo} style={styles.img} />
      </View>
      <Text style={styles.text}>JEWELERY</Text>
      <View style={styles.container}>
        {/* Jewelery */}
        <Image source={logo} style={styles.img} />
        <Image source={logo} style={styles.img} />
        <Image source={logo} style={styles.img} />
      </View>
      <Text style={styles.text}>OUTERWEAR</Text>
      <View style={styles.container}>
        {/* Outerwear */}
        <Image source={logo} style={styles.img} />
        <Image source={logo} style={styles.img} />
        <Image source={logo} style={styles.img} />
      </View>
      <Text style={styles.text}>TOPS</Text>
      <View style={styles.container}>
        {/* Tops */}
        <Image source={logo} style={styles.img} />
        <Image source={logo} style={styles.img} />
        <Image source={logo} style={styles.img} />
      </View>
      <Text style={styles.text}>BOTTOMS</Text>
      <View style={styles.container}>
        {/* Bottoms */}
        <Image source={logo} style={styles.img} />
        <Image source={logo} style={styles.img} />
        <Image source={logo} style={styles.img} />
      </View>
      <Text style={styles.text}>FOOTWEAR</Text>
      <View style={styles.container}>
        {/* Footwear */}
        <Image source={logo} style={styles.img} />
        <Image source={logo} style={styles.img} />
        <Image source={logo} style={styles.img} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flexDirection: 'row',
  },
  text: {
    textAlign: 'center',
    paddingTop: 20,
    fontWeight: 'bold',
  },
  img: {
    width: 100,
    height: 100,
  },
  wardrobe: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '20px',
  },
})

export default ProfileWardrobe
