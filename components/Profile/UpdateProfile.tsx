import { View } from 'react-native'
import EditProfile from '../../components/Profile/EditProfile'
import ProfileEdit from '../../components/Profile/ProfileEdit'

export default function UpdateProfile({ userId }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ProfileEdit userId={userId} />
    </View>
  )
}
