import { Tabs } from 'expo-router'

export default () => {
  return (
    <Tabs>
      <Tabs.Screen name="feed" />
      <Tabs.Screen name="carousel" />
      <Tabs.Screen name="profile" />
    </Tabs>
  )
}