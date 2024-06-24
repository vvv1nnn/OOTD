import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

const ShuffleButton = ({
  title,
  onPress,
  style,
  textStyle,
  width,
  height,
  padding,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        style,
        {
          width: width || 'auto',
          height: height || 'auto',
          padding: padding || 20,
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}Shuffle</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default ShuffleButton
