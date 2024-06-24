import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import FindFriends from '@/components/Friends/findFriends'

const Friends = () => {
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <FindFriends />
      </TouchableWithoutFeedback>
    </>
  )
}

export default Friends
