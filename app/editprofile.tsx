import { StyleSheet, Text, View, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { getDatabase, ref, set } from 'firebase/database'
import ClothingScreen from './wardrobe'
import NavBar from '../components/TabBar'
import UpdateProfile from '../components/Profile/UpdateProfile'

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Text style={styles.profile}> EDIT PROFILE </Text>
        <UpdateProfile userId={'vin'} />
      </View>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
    marginTop: 10,
  },
  image: {
    width: 320,
    height: 200,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  profile: {
    textAlign: 'center',
  },
})
