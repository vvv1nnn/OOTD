import { View, Text } from 'react-native'
import React from 'react'
import FindFriends from '@/components/Friends/findFriends'

const friends = () => {
  return (
    <>
      {/* Add the Frinds icon in the top left corner */}
      <FindFriends />
    </>
  )
}

export default friends
