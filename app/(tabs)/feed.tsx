import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native'
import { ref, onValue, query, orderByChild, update } from 'firebase/database'

import firebase from '@/firebaseConfig'

// Define the type for a Post
interface Post {
  id: string
  createdAt: number
  imageUrl: string
  likes: number
  username: string
  avatar?: string
  caption?: string
}

const Feed: React.FC = () => {
  const [data, setData] = useState<Post[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const postsRef = query(
        ref(firebase.database, 'posts'),
        orderByChild('createdAt')
      )
      onValue(postsRef, (snapshot) => {
        if (snapshot.exists()) {
          const fetchedData: Post[] = []
          snapshot.forEach((childSnapshot) => {
            fetchedData.push({ id: childSnapshot.key!, ...childSnapshot.val() })
          })
          // Reverse the array to get the latest posts first
          setData(fetchedData.reverse())
        }
      })
    }

    fetchPosts()
  }, [])

  const handleLike = (postId: string) => {
    // Update the likes in the local state
    const newData = data.map((post) => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 }
      }
      return post
    })
    setData(newData)

    // Update the likes in the database
    const postToUpdate = newData.find((post) => post.id === postId)
    if (postToUpdate) {
      const postRef = ref(firebase.database, `posts/${postId}`)
      update(postRef, { likes: postToUpdate.likes })
    }
  }

  const renderItem: ListRenderItem<Post> = ({ item }) => (
    <PostItem item={item} onLike={handleLike} />
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

interface PostItemProps {
  item: Post
  onLike: (postId: string) => void
}

const PostItem: React.FC<PostItemProps> = ({ item, onLike }) => (
  <View style={styles.postContainer}>
    <View style={styles.header}>
      {item.avatar && (
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
      )}
      <Text style={styles.username}>{item.username}</Text>
    </View>
    <View style={styles.postImageContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
    </View>
    <View>
      {item.caption && <Text style={styles.caption}>{item.caption}</Text>}
      <Text style={styles.likes}>{item.likes} likes</Text>
    </View>
    <TouchableOpacity onPress={() => onLike(item.id)} style={styles.likeButton}>
      <Text style={styles.likeButtonText}>Like</Text>
    </TouchableOpacity>
    <View style={styles.separator} />
  </View>
)

const styles = StyleSheet.create({
  feed: {
    padding: 20,
    backgroundColor: 'white',
  },
  separator: {
    height: 1.5,
    backgroundColor: 'black',
    width: '100%',
    marginTop: 30,
  },
  postContainer: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    textAlign: 'center',
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
    textAlign: 'center',
  },
  postImageContainer: {
    width: '100%',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    overflow: 'hidden',
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.8, // Shadow opacity
    shadowRadius: 5, // Shadow radius
    elevation: 5, // Elevation for Android
    marginBottom: 10, // Add some margin to ensure shadow doesn't affect spacing with other elements
    backgroundColor: 'white', // Background color for better shadow visibility
  },
  postImage: {
    width: '100%',
    aspectRatio: 1 / 1.6,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  caption: {
    fontSize: 14,
    marginBottom: 5,
  },
  likes: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  likeButton: {
    backgroundColor: 'black',
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
