
import { StyleSheet, Text, TextInput, View, Image , Modal,TouchableOpacity, ToastAndroid} from 'react-native';
import logo from '../assets/SportGuru.webp'
import { Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
// import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";
// import {
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   signInWithCredential,
// } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { ActivityIndicator} from "react-native";
import {useEmailUser} from "../Component/ZustandEmail"
import { getFirestore, collection, getDocs, where, query, arrayContains } from 'firebase/firestore';
import { app } from '../firebaseConfig';
import Signup from './Signup';
import SignupForgo from './ForgotPin'
import SignupForgot from './ForgotPin';
import ForgotPin from './ForgotPin';


const marginTopPercent = 15;
const windowHeight = Dimensions.get('window').height;


export default function Login() {

    const setEmailInStore = useEmailUser((state) => state.setEmail);
    const [isSignupModalVisible, setSignupModalVisible] = useState(false);
    const [isSignupModalVisiblePin, setSignupModalVisiblePin] = useState(false);

  

    const [email,setEmail] = useState('')
    const [pin, setPin] = useState('')

    //const navigation = useNavigation();

    const navigateToSignup = () => {
        // navigation.navigate("Signup")
    }

    
      function showToast(text) {
        ToastAndroid.show(text, ToastAndroid.SHORT);
      }

      const toggleSignupModal = () => {
        setSignupModalVisible(!isSignupModalVisible);
      };

      const toggleSignupModalPin = () => {
        setSignupModalVisiblePin(!isSignupModalVisiblePin);
      };
      

      
    const clickedOnLogin = async () => {
        if (!email || !pin) {
            showToast("Enter All the fields");
            console.log("Error: Enter All the fields");
            return;
        }
    
        try {
            const db = getFirestore(app);
            const usersCollection = collection(db, 'User');
            const querySnapshot = await getDocs(query(usersCollection, where('email', '==', email)));
    
            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const user = userDoc.data();
    
                if (user.pin === parseInt(pin, 10)) {
                    setEmail(user.email);
                    setEmailInStore(user.email);
                    showToast("Login successful");
                    console.log("Login successful");
                    // navigateToHome();
                } else {
                    console.log("Error: Incorrect PIN");
                    showToast("Incorrect PIN, try again");
                    setPin("");
                    
                }
            } else {
                
                setEmail("");
                setPin("");
                console.error("Error: Email not found");
            }
        } catch (error) {
            console.error("Error: Server Side Error", error);
            
        }
    }
    

    
    // const [userInfo, setUserInfo] = React.useState();
    // const [loading, setLoading] = React.useState(false);
    // const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    //     androidClientId: "50490491314-9gvr45vr3km52bdftcgrpthgafpqbtiv.apps.googleusercontent.com",
    // });

    // React.useEffect(() => {
    //     if (response?.type === "success") {
    //       const { id_token } = response.params;
    //       const credential = GoogleAuthProvider.credential(id_token);
    //       signInWithCredential(auth, credential);
    //     }
    //   }, [response]);


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
            {/* <View style>
                <TouchableOpacity
                    style={styles.forgotPasswordButton}
                    onPress={() => {toggleSignupModalPin()}}
                    >
                    <Text style={styles.buttonText}>Forgot Password?</Text>
                </TouchableOpacity>
                <ForgotPin
                isVisible={isSignupModalVisiblePin}
                onClose={toggleSignupModalPin}
                />
            </View> */}

            
            <TouchableOpacity
                style={styles.loginButton}
                onPress={() => {clickedOnLogin()}}
                >
                <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
                style={styles.loginButtonGoogle}
                onPress={() => {promptAsync()}}
                >
                <Text style={styles.buttonText}>Login with Google</Text>
            </TouchableOpacity> */}
            <View style = {styles.dontAccount}>
                <TouchableOpacity
                    style={styles.forgotPasswordButton}
                    onPress={() => {toggleSignupModal()}}
                    >
                    <Text style={styles.buttonText}>Don't have an account? - Sign Up</Text>
                </TouchableOpacity>
                <Signup
                isVisible={isSignupModalVisible}
                onClose={toggleSignupModal}
                />
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
        width: "40%",
        height: 45,
        marginBottom: 20,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginButtonGoogle: {
        backgroundColor: '#6ab1f2',
        borderWidth: 1,
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        borderColor: 'black',
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
    },
    
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
      },
      modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
});
