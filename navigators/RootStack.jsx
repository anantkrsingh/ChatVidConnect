import React from 'react'
//React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//Screens 
import Login from '../screens/Login';
import Signup from '../screens/Signup';


const Stack = createNativeStackNavigator();


const RootStack = () =>{
    return(
        <NavigationContainer>
            <Stack.Navigator 
                screenOptions={{
                    headerStyle:{
                        backgroundColor:'transparent'
                    },
                    headerTransparent:true,
                    headerTitle:"",
                    
                    headerLeftContainerStyle :{
                        paddingLeft:20
                    }
                }}
                initialRouteName="Login"
            >
                <Stack.Screen name="Login" component={Login}/> 
                <Stack.Screen name="Signup" component={Signup}/> 

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack;