import { StatusBar } from 'expo-status-bar'
import React, { useRef, useCallback, useState, useContext, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View, UIManager, LayoutAnimation, Platform } from 'react-native'

import { ActivityIndicator, Text } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { io } from 'socket.io-client';
import { BottomSheetModal, BottomSheetTextInput } from '@gorhom/bottom-sheet'
import { Formik } from 'formik'
import { ButtonText, Colors, StyledButton } from '../components/styles'
import { Ionicons } from "@expo/vector-icons"
import { Post } from '../API'
import { LoginContext } from '../components/LoginContext'


let socket;

export const Homescreen = ({navigation}) => {

    const bottomSheetRef = useRef(null);
    const snapPoints = ["38%"];
    const [name, setName] = useState("")
    const [isSubmitting, setSubmitting] = useState(false);
    const { storedLogin } = useContext(LoginContext)

    
    const handleSubmit = async () => {
        if (name == "") return
        // setSubmitting(true)
        navigation.navigate("Room",["null",name])
        try {
            const response = await Post("/api/v2/room/create", null, storedLogin)
            console.log(response);
        } catch (e) {

        }

    }
    function handleMeetingDialog() {
        bottomSheetRef.
            current
            ?.present()
    }


    return (

        <>
            <View className="flex items-center h-full justify-center">
                <StatusBar style='dark' />
                <TouchableOpacity onPress={handleMeetingDialog} className="bg-green-100 flex-row rounded-xl w-3/5 flex  p-5 justify-center items-center">
                    <MaterialCommunityIcons name="plus" size={25} />
                    <Text className="text-green-900 font-bold ml-2">Start an instant meeting</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-green-100 mt-2 flex-row rounded-xl w-3/5 flex  p-5 justify-center items-center">
                    <MaterialCommunityIcons name="chat" size={25} />
                    <Text className="text-green-900 font-bold ml-2">Create an instant ChatRoom</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-red-100 border-red-300 border-2 mt-2 flex-row rounded-xl w-3/5 flex  p-5 justify-center items-center">
                    <Ionicons name='caret-forward-outline' />
                    <Text className="text-red-900 font-bold ml-2">Join ChatRoom/Meeting</Text>
                </TouchableOpacity>
            </View>
            <BottomSheetModal
                ref={bottomSheetRef}
                index={0}

                snapPoints={snapPoints}
                keyboardBlurBehavior='restore'
                android_keyboardInputMode='adjustResize'
            >


                <View className="p-4 ">
                    <Text className="text-center">
                        Create New Meeting
                    </Text>
                    <BottomSheetTextInput onChangeText={(e) => setName(e)} value={name} className="" cursorColor={"white"} style={styles.textInput} placeholder='Enter your name please !' placeholderTextColor={"white"} />
                    <StyledButton style={styles.joinButton} onPress={handleSubmit}>
                        {isSubmitting ? <ActivityIndicator color='white' /> : <ButtonText style={{ fontWeight: "bold" }} onPress={handleSubmit}>
                            Create & Join
                        </ButtonText>}
                    </StyledButton>

                </View>
            </BottomSheetModal >
        </>


    )
}

const styles = StyleSheet.create({

    textInput: {
        alignSelf: "stretch",
        marginHorizontal: 12,
        marginBottom: 12,
        marginVertical: 20,
        padding: 12,
        borderRadius: 12,
        backgroundColor: Colors.grey,
        color: "white",

    },

    joinButton: {
        width: 350,
        marginTop: 20,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0470DC",
        borderRadius: 15

    }

});
