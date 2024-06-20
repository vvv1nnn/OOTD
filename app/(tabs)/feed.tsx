import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native'

// Dummy data for the feed
const dummyData = [
  {
    id: '1',
    username: 'mintswagger42069',
    avatar: require('@/assets/images/looweegee.jpg'), // Use require for local images
    image: require('@/assets/images/SADCAT.png'),
    caption: 'erydey cri',
    likes: 10,
  },
  {
    id: '2',
    username: 'bananastick100',
    avatar: require('@/assets/images/SADCAT.png'), // Use require for local images
    image: require('@/assets/images/looweegee.jpg'),
    caption: 'i cry i cry',
    likes: 5,
  },
]

const Feed = () => {
  const [data, setData] = useState(dummyData)

  const handleLike = (postId) => {
    const newData = data.map((post) => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 }
      }
      return post
    })
    setData(newData)
  }

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <Image source={item.avatar} style={styles.avatar} />
        <Text style={styles.username}>{item.username}</Text>
      </View>
      <Image source={item.image} style={styles.postImage} />
      <Text style={styles.caption}>{item.caption}</Text>
      <Text style={styles.likes}>{item.likes} likes</Text>
      <TouchableOpacity
        onPress={() => handleLike(item.id)}
        style={styles.likeButton}
      >
        <Text style={styles.likeButtonText}>Like</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.feed}
    />
  )
}

const styles = StyleSheet.create({
  feed: {
    padding: 20,
  },
  postContainer: {
    marginBottom: 20,
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  caption: {
    fontSize: 14,
    marginBottom: 5,
  },
  likes: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  likeButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  likeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default Feed
