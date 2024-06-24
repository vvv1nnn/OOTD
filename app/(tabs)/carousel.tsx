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
        <ViewShot ref={viewShotRef}>
          {/* First row of components */}
          <View style={styles.row}>
            <View style={styles.component}>
              <Text style={styles.sectionHeader}>Headwear</Text>
              <DisplayClothing image={currentHeadwear} />
            </View>
            <View style={styles.component}>
              <Text style={styles.sectionHeader}>Accessories</Text>
              <DisplayClothing image={currentAccessories} />
            </View>
          </View>

          {/* Second row of components */}
          <View style={styles.row}>
            <View style={styles.component}>
              <Text style={styles.sectionHeader}>Outerwear</Text>
              <DisplayClothing image={currentOuterwear} />
            </View>
            <View style={styles.component}>
              <Text style={styles.sectionHeader}>Tops</Text>
              <DisplayClothing image={currentTops} />
            </View>
          </View>

          {/* Third row of components */}
          <View style={styles.row}>
            <View style={styles.component}>
              <Text style={styles.sectionHeader}>Bottoms</Text>
              <DisplayClothing image={currentBottoms} />
            </View>
            <View style={styles.component}>
              <Text style={styles.sectionHeader}>Footwear</Text>
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
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 20,
  },
  text: {
    fontFamily: 'TYPOGRAPH-PRO-Semi-Bold',
    fontSize: 50,
    padding: 5,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  component: {
    flex: 1,
    minWidth: '40%', // Adjust as needed based on your design
    alignItems: 'center',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center', // Ensure text is centered horizontally
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
    marginBottom: 40,
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
})

export default App
