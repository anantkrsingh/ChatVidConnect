import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { TabLayout } from '../components/TabLayout'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'


export const Dashboard = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={{ flex: 1, display: "flex", justifyContent: "center", alignContent: "center" }}>
          <TabLayout />
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}
