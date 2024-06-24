import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import FindFriends from '@/components/Friends/findFriends'

const friends = () => {
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/* Add the Frinds icon in the top left corner? */}
        <FindFriends />
      </TouchableWithoutFeedback>
    </>
  )
}

export default friends
