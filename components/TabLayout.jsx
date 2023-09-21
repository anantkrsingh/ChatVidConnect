import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Homescreen } from '../screens/Homescreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Tab = createBottomTabNavigator();


export const TabLayout = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'transparent'
                },
                headerTransparent: true,
                headerTitle: "",
            }}
        >
            <Tab.Screen name="Home" component={Homescreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name='home' size={size} color={color} />
                )
            }} />
            <Tab.Screen name="Chat" component={Homescreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name='chat' size={size} color={color} />
                )
            }} />
            <Tab.Screen name="Profile" component={Homescreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name='account' size={size} color={color} />
                )
            }} />
        </Tab.Navigator>
    )
}
