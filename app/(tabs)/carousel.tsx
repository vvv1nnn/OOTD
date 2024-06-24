import React, { useState, useEffect, useRef } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native'
import ViewShot, { captureRef } from 'react-native-view-shot'
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage'
import {
  ref as databaseRef,
  push,
  set,
  serverTimestamp,
  get,
} from 'firebase/database'
import firebase from '@/firebaseConfig'
import DisplayClothing from '@/components/Carousel/DisplayClothing'

const App = () => {
  const username = 'vin' // Placeholder until auth is implemented

  // State for currently displayed image in each category
  const [currentHeadwear, setCurrentHeadwear] = useState<string | null>(null)
  const [currentTops, setCurrentTops] = useState<string | null>(null)
  const [currentOuterwear, setCurrentOuterwear] = useState<string | null>(null)
  const [currentBottoms, setCurrentBottoms] = useState<string | null>(null)
  const [currentFootwear, setCurrentFootwear] = useState<string | null>(null)
  const [currentAccessories, setCurrentAccessories] = useState<string | null>(
    null
  )

  // Image arrays for each category
  const [headwearImages, setHeadwearImages] = useState<string[]>([])
  const [topsImages, setTopsImages] = useState<string[]>([])
  const [outerwearImages, setOuterwearImages] = useState<string[]>([])
  const [bottomsImages, setBottomsImages] = useState<string[]>([])
  const [footwearImages, setFootwearImages] = useState<string[]>([])
  const [accessoriesImages, setAccessoriesImages] = useState<string[]>([])

  // Fetch images from the database
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const categories = [
          'headwear',
          'tops',
          'outerwear',
          'bottoms',
          'footwear',
          'accessories',
        ]

        const imagePromises = categories.map(async (category) => {
          const categoryRef = databaseRef(
            firebase.database,
            `users/${username}/clothing/${category}`
          )
          const snapshot = await get(categoryRef)
          if (snapshot.exists()) {
            const items = snapshot.val()
            return Object.values(items).map((item: any) => item.imageUrl)
          }
          return []
        })

        const [headwear, tops, outerwear, bottoms, footwear, accessories] =
          await Promise.all(imagePromises)

        setHeadwearImages(headwear)
        setTopsImages(tops)
        setOuterwearImages(outerwear)
        setBottomsImages(bottoms)
        setFootwearImages(footwear)
        setAccessoriesImages(accessories)

        // Set initial images
        setCurrentHeadwear(headwear[0] || null)
        setCurrentTops(tops[0] || null)
        setCurrentOuterwear(outerwear[0] || null)
        setCurrentBottoms(bottoms[0] || null)
        setCurrentFootwear(footwear[0] || null)
        setCurrentAccessories(accessories[0] || null)
      } catch (error) {
        console.error('Error fetching images from database:', error)
        Alert.alert('Error', 'Failed to load images. Please try again later.')
      }
    }

    fetchImages()
  }, [username])

  // Shuffle function to select a random image
  const getRandomImage = (images: string[]) => {
    if (images.length === 0) return null
    const randomIndex = Math.floor(Math.random() * images.length)
    return images[randomIndex]
  }

  // Shuffle handler
  const handleShuffle = () => {
    setCurrentHeadwear(getRandomImage(headwearImages))
    setCurrentTops(getRandomImage(topsImages))
    setCurrentOuterwear(getRandomImage(outerwearImages))
    setCurrentBottoms(getRandomImage(bottomsImages))
    setCurrentFootwear(getRandomImage(footwearImages))
    setCurrentAccessories(getRandomImage(accessoriesImages))
  }

  // Uploading a viewshot
  const viewShotRef = useRef<ViewShot>(null)
  const [uploading, setUploading] = useState(false)

  const captureAndUpload = async () => {
    if (!viewShotRef.current) return

    setUploading(true)

    try {
      // Capture the screenshot
      const uri = await captureRef(viewShotRef, {
        format: 'png',
        quality: 1,
      })

      const response = await fetch(uri)
      const blob = await response.blob()

      // Upload the screenshot to Firebase Storage
      const imageRef = storageRef(
        firebase.storage,
        `posts/${new Date().toISOString()}.png`
      )
      await uploadBytes(imageRef, blob)
      const downloadURL = await getDownloadURL(imageRef)

      // Save post data to Firebase Realtime Database
      const newPostRef = push(databaseRef(firebase.database, 'posts'))
      await set(newPostRef, {
        imageUrl: downloadURL,
        username,
        createdAt: serverTimestamp(),
        likes: 0,
      })

      Alert.alert('Success', 'Post uploaded successfully!')
    } catch (error) {
      console.error('Error capturing and uploading screenshot: ', error)
      Alert.alert('Error', 'Failed to post. Please try again later.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View>
          <Text style={styles.profile}> OUTFIT RANDOMISER </Text>
        </View>

        <ViewShot ref={viewShotRef}>
          {/* First row of components */}
          <View style={styles.row}>
            <View style={styles.component}>
              <Text style={styles.sectionHeader}>HEADWEAR</Text>
              <DisplayClothing image={currentHeadwear} />
            </View>
            <View style={styles.component}>
              <Text style={styles.sectionHeader}>ACCESSORIES</Text>
              <DisplayClothing image={currentAccessories} />
            </View>
          </View>

          {/* Second row of components */}
          <View style={styles.row}>
            <View style={styles.component}>
              <Text style={styles.sectionHeader}>OUTERWEAR</Text>
              <DisplayClothing image={currentOuterwear} />
            </View>
            <View style={styles.component}>
              <Text style={styles.sectionHeader}>TOPS</Text>
              <DisplayClothing image={currentTops} />
            </View>
          </View>

          {/* Third row of components */}
          <View style={styles.row}>
            <View style={styles.component}>
              <Text style={styles.sectionHeader}>BOTTOMS</Text>
              <DisplayClothing image={currentBottoms} />
            </View>
            <View style={styles.component}>
              <Text style={styles.sectionHeader}>FOOTWEAR</Text>
              <DisplayClothing image={currentFootwear} />
            </View>
          </View>

          {/* Buttons row */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleShuffle}>
              <Text style={styles.buttonText}>Shuffle</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={captureAndUpload}
              disabled={uploading}
            >
              <Text style={styles.buttonText}>
                {uploading ? 'Uploading...' : 'Post'}
              </Text>
            </TouchableOpacity>
          </View>
        </ViewShot>
      </ScrollView>
    </SafeAreaView>
  )
}

const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  profile: {
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  randomiser: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333', // Dark gray text
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  component: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 10,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 }, // Adjust the height to spread the shadow vertically
    elevation: 5, // Android shadow
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black', // Dark gray text
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    width: '40%',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white', // White text
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default App
