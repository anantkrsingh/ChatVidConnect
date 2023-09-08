import React from 'react'
import { PageLogo, LogoBg } from './styles'
import { View } from 'react-native'

export const Logo = () => {
    return (
        <View style={{padding:2}}>
            <LogoBg style={{ elevation: 20, shadowColor: "#000000", shadowOffset: 0, shadowOpacity: .5, shadowRadius: 3 }}>
                <PageLogo resizeMode="cover" source={require('../assets/images/logo.png')} />
            </LogoBg>
        </View>
    )
}
