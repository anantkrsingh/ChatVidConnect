import React from 'react'
//React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//Screens 
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import { Dashboard } from '../screens/Dashboard';

import { LoginContext } from '../components/LoginContext';
import { Room } from '../screens/Room';
const Stack = createNativeStackNavigator();


const RootStack = () => {
    return (
        <LoginContext.Consumer>
            {({ storedLogin }) => (
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: 'transparent'
                            },
                            headerTransparent: true,
                            headerTitle: "",

                            headerLeftContainerStyle: {
                                paddingLeft: 20
                            }
                        }}
                        initialRouteName="Dashboard"
                    >
                        {storedLogin ? <>
                            <Stack.Screen name="Dashboard" component={Dashboard} />
                            <Stack.Screen name="Room" component={Room} />
                        </>
                            : <>
                                <Stack.Screen name="Login" component={Login} />
                                <Stack.Screen name="Signup" component={Signup} />
                            </>}
                        {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
                    </Stack.Navigator>
                </NavigationContainer>
            )}
        </LoginContext.Consumer>

    )
}

export default RootStack;