import react, { useState, useContext } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'
import { Formik } from 'formik';
import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent,
    LogoBg
} from '../components/styles';
import { View, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import KeyboradAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import axios from 'axios';

import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import { makeRedirectUri } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginContext } from '../components/LoginContext';



WebBrowser.maybeCompleteAuthSession()
//ios 670526577063-613p399gn0scte3omuvdkgjmm9rp80jc.apps.googleusercontent.com

//android 670526577063-6hic1b1rukntchi42h02s69gr4fbb7ch.apps.googleusercontent.com






const Login = ({ navigation }) => {
    try {
        const [request, response, promptAsync] = Google.useAuthRequest({
            androidClientId: "670526577063-toq93hlji2d3unaqu0tvjmqrbobcuscq.apps.googleusercontent.com",
            iosClientId: "670526577063-613p399gn0scte3omuvdkgjmm9rp80jc.apps.googleusercontent.com",
            webClientId: "670526577063-ofv10fai1es26vg32oc1kdau3v0mpo0n.apps.googleusercontent.com",
            expoClientId: "670526577063-ofv10fai1es26vg32oc1kdau3v0mpo0n.apps.googleusercontent.com",
        })


        const [hidePassword, setHidePassword] = useState(true)
        const [message, setMessage] = useState();
        const [messageType, setMessageType] = useState();
        const { storedLogin, setStoredLogin } = useContext(LoginContext)



        const handleLogin = (cred, setSubmitting) => {
            handleMessage(null);
            const url = "http://192.168.1.3:4040/api/v2/auth/login"
            axios.post(url, cred).then((response) => {
                const data = response.data;
                const { message, status, token } = data
                console.log(data);
                if (status != 1) {
                    handleMessage(message, status)
                } else {
                    // navigation.navigate("Signup", { ...user[0] })
                    saveUser(token)
                }
                setSubmitting(false)

            }).catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                    setSubmitting(false)
                    handleMessage(error.response.data.message)

                } else {
                    setSubmitting(false)
                    console.warn(error)
                    handleMessage("An Error Occurred. Check your internet Connection and try again")
                }

            })

        }

        const handleMessage = (message, type = 0) => {
            setMessage(message)
            setMessageType(type)

        }

        const handleGoogleLogin = () => {

        }
        const saveUser = (user) => {
            AsyncStorage.setItem("CHATVIDUSER", user)
                .then(() => {
                    setStoredLogin(user)
                }).catch((e) => {
                    console.warn(e)
                    handleMessage("Login Failed")
                })
        }

        return (

            <StyledContainer style={{}}>
                <StatusBar style='dark' />
                <InnerContainer>
                    <LogoBg style={{ elevation: 20, shadowColor: "#000000", shadowOffset: 0, shadowOpacity: .5, shadowRadius: 3 }}>
                        <PageLogo resizeMode="cover" source={require('../assets/images/logo.png')} />
                    </LogoBg>
                    <PageTitle>Welcome to ChatVid Connect!</PageTitle>
                    <SubTitle>Please Login</SubTitle>

                    <Formik
                        initialValues={{ email: "", password: "" }}
                        onSubmit={(values, { setSubmitting }) => {
                            if (values.email == '' || values.password == '') {
                                handleMessage("Validate All Fields")
                                setSubmitting(false)
                            } else {
                                handleLogin(values, setSubmitting)
                            }
                        }}
                    >
                        {
                            ({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                                <StyledFormArea>
                                    <MyTextInput label="Email Address"
                                        placeholder="Enter Registered Email"
                                        placeholderTextColor={Colors.black}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        keyboardType='email-address'
                                        value={values.email}
                                        icon="mail" />
                                    <MyTextInput label="Password"
                                        placeholder="* * * * * *"
                                        placeholderTextColor={Colors.black}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        secureTextEntry={hidePassword}
                                        value={values.password}
                                        isPassword={true}
                                        hidePassword={hidePassword}
                                        setHidePassword={setHidePassword}
                                        icon="lock" />
                                    <MsgBox type={messageType}>{message}</MsgBox>

                                    {!isSubmitting && <StyledButton onPress={handleSubmit}>
                                        <ButtonText>
                                            Login
                                        </ButtonText>
                                    </StyledButton>}
                                    {isSubmitting && <StyledButton disabled >
                                        <ActivityIndicator size="small" color={Colors.secodary} />
                                    </StyledButton>}
                                    <Line />
                                    <StyledButton google={true} onPress={() => promptAsync({ useProxy: true, showInRecents: true })}>
                                        <Fontisto name='google' color={Colors.white} size={18} />
                                        <ButtonText google={true}>
                                            Sign In Using Google
                                        </ButtonText>
                                    </StyledButton>
                                    <ExtraView >
                                        <ExtraText>Don't Have an account? </ExtraText>
                                        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                                            <TextLinkContent>Signup </TextLinkContent>
                                        </TouchableOpacity>
                                    </ExtraView>



                                </StyledFormArea>
                            )
                        }
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        )
    } catch (e) {
        console.log("Eror", e);
    }
}

const MyTextInput = ({ label, icon, hidePassword, setHidePassword, isPassword, ...props }) => {
    return (
        <View >
            <LeftIcon>
                <Octicons name={icon} size={20} color={Colors.black} />
            </LeftIcon>
            <StyledInputLabel>
                {label}
            </StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => { setHidePassword(!hidePassword), console.log(hidePassword) }}>
                    <Ionicons size={20} color={Colors.black} name={hidePassword ? 'md-eye-off' : 'md-eye'} />
                </RightIcon>
            )}
        </View>
    )
}

export default Login;
