import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const ProfileName = () => {
  return (
    <View>
      <Text style={styles.username}>Username</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  username: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 20, // Adjust the marginTop value to move the text down
  },
})

export default ProfileName
