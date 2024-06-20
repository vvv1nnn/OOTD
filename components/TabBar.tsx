import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import ClothingScreen from '@/app/wardrobe'

const TabBar = ({ state, descriptors, navigation }) => {
  // const icons = {
  //   index: (props) => (
  //     <AntDesign name="Login" size={26} color={'#aaa'} {...props} />
  //   ),
  //   Feed: (props) => (
  //     <MaterialIcons name="post-add" size={26} color={'#aaa'} {...props} />
  //   ),
  //   ClothingScreen: (props) => (
  //     <MaterialCommunityIcons
  //       name="dresser-outline"
  //       size={26}
  //       color={'#aaa'}
  //       {...props}
  //     />
  //   ),
  // }
  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        if (['_sitemap', '+not-found'].includes(route.name)) return null

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        return (
          <TouchableOpacity
            key={route.name}
            style={styles.tabbarItem}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            {/* {icons[route.name]({
              color: isFocused ? '#000' : '#aaa',
            })} */}
            <Text style={{ color: isFocused ? '#000' : '#aaa' }}>{label}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    bottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    borderCurve: 'continuous',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  tabbarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
})
export default TabBar
