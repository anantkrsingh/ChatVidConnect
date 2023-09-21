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
import { KeyboardAvoidingView, View } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Dimensions } from 'react-native';

import KeyboradAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { Logo } from '../components/Logo';
import axios from 'axios';



const Signup = () => {
    const height = Dimensions.get('window');
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const handleRegister = (cred, setSubmitting) => {
        handleMessage(null);
        const url = "http://192.168.1.3:4040/api/v2/auth/register"
        axios.post(url, cred).then((response) => {
            const data = response.data;
            const { message, status, user } = data
            console.log(data);
            if (status != 1) {
                handleMessage(message, status)
            } else {
                handleMessage(message)
            }
            setSubmitting(false)

        }).catch((error) => {
            if (error.response) {
                console.log(error.response.data.message);
                setSubmitting(false)
                // handleMessage(error.response.data.message)

            } else {
                setSubmitting(false)
                handleMessage("An Error Occurred. Check your internet Connection and try again")
            }

        })

    }
    const handleMessage = (message, type = 0) => {
        setMessage(message)
        setMessageType(type)

    }
    return (
        <StyledContainer style={{ minHeight: height }}>
            <StatusBar style='dark' />
            <InnerContainer>
                <Logo />
                <PageTitle>Welcome to ChatVid Connect!</PageTitle>
                <SubTitle>Please Signup</SubTitle>
                <Formik
                    initialValues={{ email: "", name: "", confirmPassword: "", password: "" }}
                    onSubmit={(values, { setSubmitting }) => {
                        if (values.email == '' || values.password == '' || values.name == '' || values.password == '' || values.password != values.confirmPassword) {
                            handleMessage("Validate All Fields")
                            setSubmitting(false)
                        } else {
                            handleRegister(values, setSubmitting)
                        }
                    }}
                >
                    {
                        ({ handleChange, handleBlur, handleSubmit, values }) => (
                            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>


                                <StyledFormArea>
                                    <MyTextInput label="Full Name"
                                        placeholder="Enter Full name"
                                        placeholderTextColor={Colors.black}
                                        onChangeText={handleChange('name')}
                                        onBlur={handleBlur('name')}
                                        keyboardType='email-address'
                                        value={values.name}
                                        icon="person" />
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
                                    <MyTextInput label="Confirm Password"
                                        placeholder="* * * * * *"
                                        placeholderTextColor={Colors.black}
                                        onChangeText={handleChange('confirmPassword')}
                                        onBlur={handleBlur('confirmPassword')}
                                        secureTextEntry={hidePassword}
                                        value={values.confirmPassword}
                                        isPassword={true}
                                        hidePassword={hidePassword}
                                        setHidePassword={setHidePassword}
                                        icon="lock" />
                                    <MsgBox>{message}</MsgBox>

                                    <StyledButton onPress={handleSubmit}>
                                        <ButtonText>
                                            Login
                                        </ButtonText>
                                    </StyledButton>
                                    <Line />

                                    <ExtraView>
                                        <ExtraText>Already Have an account? </ExtraText>
                                        <TextLinkContent>Login </TextLinkContent>
                                    </ExtraView>
                                </StyledFormArea>
                            </KeyboardAvoidingView>
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

export default Signup;
