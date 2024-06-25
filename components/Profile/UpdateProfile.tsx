import { View } from 'react-native'
import EditProfile from '../../components/Profile/EditProfile'
import ProfileEdit from '../../components/Profile/ProfileEdit'

export default function UpdateProfile({ userId }) {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ProfileEdit userId={userId} />
    </View>
  )
}
