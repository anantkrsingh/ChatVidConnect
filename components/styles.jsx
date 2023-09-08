import styled from 'styled-components';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;


//Colors 
export const Colors = {
    primary: "#FDC50C",
    secondary: "#0A68F8",
    black: "#000000",
    white: "#FFFFFFFF",
    grey: "#727583",
    red: "#FF0000",
    green: "#198754",
    buttonColor: "#6e00ef"
};

const { primary, secondary, black, white, grey, red, green, buttonColor } = Colors;

export const StyledContainer = styled.View`
    flex:1;
    padding:25px;
    padding-top: ${StatusBarHeight + 10}px;
    justify-content:center;
    align-items:center;
    display:flex; 
   
`

export const InnerContainer = styled.View`
    flex:1;
    width:100%;
    align-items:center; 
    justify-content:center;    

`

export const LogoBg = styled.View`
    align-items:center;
    justify-content:center;
    background:white;
    padding-horizontal:20px;
    padding-vertical:5px;
    border-radius:19px;
    
`

export const PageLogo = styled.Image`
    width:48px;
    height:48px;
    
`

export const PageTitle = styled.Text`
    font-size: 20px;
    text-align: center;
    color : ${black};
    padding: 20px;
`


export const SubTitle = styled.Text`
    font-size: 15px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${grey};
`

export const StyledFormArea = styled.View`
    width: 90%;
`

export const StyledTextInput = styled.TextInput`
    background-color: ${white};
    padding: 10px;
    padding-left: 55px;
    padding-right: 55px;
    border-radius: 10px;
    font-size: 16px;
    height: 50px;
    margin-vertical: 10px;
    color: ${black};
`

export const StyledInputLabel = styled.Text`
    color: ${secondary};
    font-size: 13px;
    text-align: left;

`
export const LeftIcon = styled.View`
    left: 15px;
    top: 40px;
    position: absolute;
    z-index: 1;
`

export const RightIcon = styled.TouchableOpacity`
    right: 15px;
    top: 40px;
    position: absolute;
    z-index: 1;
`

export const StyledButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${buttonColor};
    justify-content: center;
    border-radius:10px;
    align-items: center;
    margin-vertical: 5px;
    height: 45px;

    ${(props) => props.google == true && `
        flex-direction:row;
        height:50px;
        justify-content:center;
        align-items:center;        
    `}
`
export const ButtonText = styled.Text`
    color: ${white};
    font-size: 14px;

    ${(props) => props.google == true && `
    padding-left:25px;
    
`}

`

export const MsgBox = styled.Text`
    text-align:center;
    font-size:12px;
    font-weight:bold;
    color:${red};
`

export const Line = styled.View`
    height:1px;
    width:100%;
    background-color:${secondary};
    margin-vertical:10px;
`

export const ExtraView = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 10px;
`

export const ExtraText = styled.Text`
    justify-content:center;
    align-content:center;
    color: ${black};
    font-size: 15px;
`

export const TextLink = styled.TouchableOpacity`
    justify-content:center;
    align-items:center;
`

export const TextLinkContent = styled.Text`
    color: ${secondary};
    font-size: 15px;    
`

