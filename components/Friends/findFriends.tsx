import React, { useState } from 'react'
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native'

// Dummy data for friends (replace with actual data from your database)
const friendsData = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
  { id: '3', name: 'Charlie' },
  { id: '4', name: 'David' },
  { id: '5', name: 'Emma' },
  { id: '6', name: 'Frank' },
  { id: '7', name: 'Grace' },
  { id: '8', name: 'Hannah' },
  { id: '9', name: 'Isaac' },
  { id: '10', name: 'Jack' },
  { id: '11', name: 'Felix' },
  { id: '12', name: 'Adriana' },
  { id: '13', name: 'Val' },
  { id: '14', name: 'Bevan' },
  { id: '15', name: 'Vin' },
  // Add more friends as needed
]

const FindFriends = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredFriends, setFilteredFriends] = useState(friendsData)

  // Function to handle search input change
  const handleSearch = (text: string) => {
    setSearchQuery(text)
    const filteredData = friendsData.filter((friend) =>
      friend.name.toLowerCase().includes(text.toLowerCase())
    )
    setFilteredFriends(filteredData)
  }

  // Render each friend item
  const renderFriend = ({ item }: { item: { id: string; name: string } }) => (
    <View style={styles.friendItem}>
      <Text>{item.name}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search friends..."
        value={searchQuery}
        onChangeText={handleSearch}
        autoCorrect={false}
        autoFocus
      />
      <FlatList
        data={filteredFriends}
        renderItem={renderFriend}
        keyExtractor={(item) => item.id}
        style={styles.friendList}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  friendList: {
    flex: 1,
    width: '100%',
  },
  friendItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
})

export default FindFriends
