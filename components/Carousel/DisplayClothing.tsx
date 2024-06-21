import React, { FunctionComponent, useRef, useState, useEffect } from 'react'
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native'
import { ref, onValue, off } from 'firebase/database'

import firebase from '@/firebaseConfig'

const { width } = Dimensions.get('screen')

type Props = {
  clothingType: string
}

export default function DisplayClothes({ clothingType }: Props) {
  const animatedValue = useRef(new Animated.Value(0)).current
  const [outerwearImages, setOuterwearImages] = useState<string[]>([])

  useEffect(() => {
    const outerwearRef = ref(
      firebase.database,
      `users/vin/clothing/${clothingType}`
    )
    onValue(outerwearRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const imagesArray = Object.values(data).map(
          (item: any) => item.imageUrl
        )
        setOuterwearImages(imagesArray)
      } else {
        setOuterwearImages([])
      }
    })

    return () => {
      off(outerwearRef, 'value') // Clean up listener on component unmount
    }
  }, [])

  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={{ uri: item }} />
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Animated.FlatList
          data={outerwearImages}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: animatedValue } } }],
            { useNativeDriver: false }
          )}
          pagingEnabled={true}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
      <View style={styles.bottomContainer}>
        <FlatList
          horizontal
          data={outerwearImages}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ index }) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ]
            const colorOutputRange = ['#000', 'cyan', '#000']
            const scaleOutputRange = [1, 2, 1]
            const dotScale = animatedValue.interpolate({
              inputRange,
              outputRange: scaleOutputRange,
              extrapolate: 'clamp',
            })
            const color = animatedValue.interpolate({
              inputRange,
              outputRange: colorOutputRange,
              extrapolate: 'clamp',
            })
            return (
              <View style={styles.dotContainer}>
                <PagingDot color={color} scale={dotScale} />
              </View>
            )
          }}
        />
      </View>
    </View>
  )
}

const PagingDot: FunctionComponent<{ scale; color }> = ({ scale, color }) => {
  return (
    <Animated.View
      style={[
        styles.pagingDot,
        { backgroundColor: color, transform: [{ scale }] },
      ]}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
  },
  topContainer: {
    flex: 2,
  },
  bottomContainer: {
    flex: 1,
    width,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageContainer: {
    justifyContent: 'flex-end',
    paddingBottom: 5,
    alignItems: 'center',
    width,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  pagingDot: {
    width: 5,
    height: 5,
    backgroundColor: 'black',
  },
  dotContainer: {
    width: 15,
    padding: 7,
  },
})
