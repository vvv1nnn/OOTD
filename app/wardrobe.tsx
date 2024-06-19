import { View } from 'react-native'
import AddClothingItem from '../components/AddClothingItem'

export default function ClothingScreen({ userId }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <AddClothingItem userId={userId} />
    </View>
  )
}
