import react, { useState } from 'react'
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
import { View, ActivityIndicator } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import KeyboradAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import axios from 'axios';



const Login = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true)
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const handleLogin = (cred, setSubmitting) => {
        handleMessage(null);
        const url = "http://64.227.148.23:4040/api/signin"
        axios.post(url, cred).then((response) => {
            const data = response.data;
            const { message, status, user } = data
            console.log(data);
            if (status != 1) {
                handleMessage(message, status)
            } else {
                navigation.navigate("Signup", { ...user[0] })
            }
            setSubmitting(false)

        }).catch(error => {
            if (error.response) {
                console.log(error.response.data);
                setSubmitting(false)
                handleMessage(error.response.data.message)

            } else handleMessage("An Error Occurred. Check your internet Connection and try again")

        })

    }

    const handleMessage = (message, type = 0) => {
        setMessage(message)
        setMessageType(type)

    }

    const handleGoogleLogin = () => {

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
                                    <ActivityIndicator size="large" color={Colors.secodary} />
                                </StyledButton>}
                                <Line />
                                <StyledButton google={true} onPress={handleSubmit}>
                                    <Fontisto name='google' color={Colors.white} size={18} />
                                    <ButtonText google={true}>
                                        Sign In Using Google
                                    </ButtonText>
                                </StyledButton>
                                <ExtraView>
                                    <ExtraText>Don't Have an account? </ExtraText>
                                    <TextLinkContent>Signup </TextLinkContent>
                                </ExtraView>
                            </StyledFormArea>
                        )
                    }
                </Formik>
            </InnerContainer>
        </StyledContainer>
    )
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
