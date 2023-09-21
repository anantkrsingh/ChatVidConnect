import { Camera } from 'expo-camera'
import React, { useState, useEffect } from 'react'
import { Alert, View } from 'react-native'
import { Button } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { io } from 'socket.io-client'

export const Room = ({ route }) => {
    const [startCamera, setStartCamera] = useState(false)
    const [activeUsers, setActiveUsers] = useState()
    const startCameraStream = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()

        if (status === "granted") {
            setStartCamera(true)
        } else {
            Alert.alert("Camera Permission Denied")
        }
    }
    const joinRoom = () => {
        startCameraStream()
        socket.emit("join-room", { roomId: route.params[0], userName: route.params[1] })
    }

    useEffect(() => {
        const URL = "http://192.168.1.3:4040"
        socket = io(`${URL}`);
        joinRoom()
        socket.on("connection", (socket) => {
            console.log("Connected");
        })
        socket.on("all-users", users => {
            console.log("All Users");
            console.log(users);
            setActiveUsers(users)
        })

    }, [io])
    return (
        <SafeAreaView>
            {startCamera ? <>
                <SafeAreaView>
                    <Camera type={"front"}
                        style={{ width: "100%", height: 600 }}
                    >
                        

                    </Camera>
                </SafeAreaView>
            </> : <></>}
        </SafeAreaView>
    )
}
