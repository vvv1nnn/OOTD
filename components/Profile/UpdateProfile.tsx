import { View } from 'react-native'
import EditProfile from '@/components/Profile/EditProfile'

export default function UpdateProfile({ userId }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <EditProfile userId={userId} />
    </View>
  )
}
