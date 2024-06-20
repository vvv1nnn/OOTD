import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const ProfileBio = () => {
  return (
    <View>
      <Text style={style.bio}>
        this is my bio lolol {'\n'}
        i'm just so swag
      </Text>
    </View>
  )
}

const style = StyleSheet.create({
  bio: {
    textAlign: 'center',
    margin: 10,
  },
})

export default ProfileBio
