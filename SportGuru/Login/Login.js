
import { StyleSheet, Text, TextInput, View, Image , TouchableOpacity} from 'react-native';
import logo from '../assets/SportGuru.webp'
import { Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator} from "react-native";


const marginTopPercent = 15;
const windowHeight = Dimensions.get('window').height;


export default function Login() {
    const [email,setEmail] = useState('')
    const [pin, setPin] = useState('')

    const navigation = useNavigation();

    const navigateToSignup = () => {
        navigation.navigate("Signup")
    }

    const navigateToHome = () => {
        navigation.navigate("HomeWithBottomNav")
    }

    const clickedOnLogin = async () => {
        if(!email || !pin){
            console.error("Error: Enter All the fields")
            return;
        }

        try{
            const response = await fetch("https://firestore.googleapis.com/v1/projects/sportguru-f9f7f/databases/(default)/documents/Users/",
            {
            method: "GET", 
            headers: {
                'Content-Type': 'application/json'
                }
            }
            );
            if(response.ok){
                const responseData = await response.json();
                const users = responseData.documents.map((document) => document.fields);

                const user = users.find((userData) => userData.email.stringValue === email);
                if(user) {
                    if(user.pin.integerValue == parseInt(pin, 10)) {
                        console.log("Login successful");
                        navigateToHome()
                    } else {
                        console.error("Error: Incorrect PIN");
                        setPin("")
                        return;
                    }
                } else {
                    console.error("Error: Email not found");
                    setEmail('')
                    setPin('')
                    return;
                }
            }
            else {
                console.error("Error: API Error");
            }
        } catch(error){
            console.error("Error: Server Side Error")
        }
    }

    
    const [userInfo, setUserInfo] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        androidClientId: "50490491314-9gvr45vr3km52bdftcgrpthgafpqbtiv.apps.googleusercontent.com",
    });

    React.useEffect(() => {
        if (response?.type === "success") {
          const { id_token } = response.params;
          const credential = GoogleAuthProvider.credential(id_token);
          signInWithCredential(auth, credential);
        }
      }, [response]);

    return (
        <View style = {styles.root}>
            <Image source = {logo} style = {[styles.logo , {height: windowHeight * 0.3}]}/>
            <Text style={styles.loginTitleText}>User Login</Text>
            <View style={styles.loginInputStyle}>
                <TextInput placeholder='Email' style={styles.loginInput}
                placeholderTextColor={'#c28837'} onChangeText={setEmail}></TextInput>
            </View>
            <View style={styles.loginInputStyle}>
                <TextInput placeholder='Pin' style={styles.loginInput}
                secureTextEntry={true} placeholderTextColor={'#c28837'}
                 onChangeText={setPin} keyboardType='numeric'
                 maxLength={6}></TextInput>
            </View>
            <TouchableOpacity
                style={styles.forgotPasswordButton}
                onPress={() => {}}
                >
                <Text style={styles.buttonText}>Forgot your Pin?</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.loginButton}
                onPress={() => {clickedOnLogin()}}
                >
                <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.loginButton}
                onPress={() => {promptAsync()}}
                >
                <Text style={styles.buttonText}>Login with Google</Text>
            </TouchableOpacity>
            <View style = {styles.dontAccount}>
                <TouchableOpacity
                    style={styles.forgotPasswordButton}
                    onPress={() => {navigateToSignup()}}
                    >
                    <Text style={styles.buttonText}>Don't have an account? - Sign Up</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}



const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        flex:1
    },
    
    logo: {
        width: '60%',
        maxWidth: 150,
        maxHeight: 100
    }
    ,
    loginTitleText: {
        fontSize: 22,
        color: '#0a0a0a',
        marginBottom: 20,
    },
    loginInputStyle: {
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        borderColor: '#020024'
    },
    loginInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    loginButton: {
        backgroundColor: '#fcb34a',
        borderWidth: 1,
        borderRadius: 30,
        width: "30%",
        height: 45,
        marginBottom: 20,
        borderColor: '#020024',
        alignItems: 'center',
        justifyContent: 'center'
    },
    forgotPasswordButton: {
        height: 30,
        marginBottom: 20
    },
    dontAccount : {
        height: 25,
        marginTop : 30
    }
});
