// import TabBar from '@/components/TabBar'
// import { Tabs } from 'expo-router'
// import React from 'react'

// export default function RootLayout() {
//   return (
//     <Tabs tabBar={(props) => <TabBar {...props} />}>
//       <Tabs.Screen
//         name="feed"
//         options={{
//           title: 'Feed',
//         }}
//       />
//       <Tabs.Screen
//         name="wardrobe"
//         options={{
//           title: 'Wardrobe',
//         }}
//       />
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Index',
//         }}
//       />
//       {/* Down here we will need to add one here for the profile once we ahve the profile branch. */}
//     </Tabs>
//     // <Stack>
//     //   <Stack.Screen name="index" />
//     //   <Stack.Screen name="editprofile" />
//     //   <Stack.Screen name="wardrobe" />
//     // </Stack>
//   )
// }

import { Stack } from 'expo-router'

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="feed" />
      <Stack.Screen name="profile" />
    </Stack>
  )
}
