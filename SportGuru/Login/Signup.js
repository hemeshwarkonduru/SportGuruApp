import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image , TouchableOpacity} from 'react-native';
import logo from '../assets/SportGuru.webp'
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const windowHeight = Dimensions.get('window').height;


export default function Signup() {

    const navigation = useNavigation();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [newPin, setNewPin] = useState('');
    const [reenterNewPin, setReenterNewPin] = useState('');

    const handleSignup = async () => {
        if (!firstName || !lastName || !email || !newPin || !reenterNewPin) {
            console.error("Error: Please Enter All the fields");
            return;
          }
      
        if(newPin != reenterNewPin){
            console.error("Pin Doesn't Match Enter Again");
            setNewPin('');
            setReenterNewPin('');
            return;
        }
        
        const data = {
          fields: {
            firstName: { stringValue: firstName },
            lastName: { stringValue: lastName },
            email: { stringValue: email },
            pin: { integerValue: newPin },
          }
        };

        try{
            const response = await fetch("https://firestore.googleapis.com/v1/projects/sportguru-f9f7f/databases/(default)/documents/Users/",
            {
                headers: {
                'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            });
            if(response.ok){
                navigation.navigate("Login")
            }
            else {
                console.error("Error: API Error");
            }
        } catch(error){
            console.error("Error: Server Side Error")
        }
    
    }


    
        
    return (
        <View style = {styles.root}>
            <Image source = {logo} style = {[styles.logo , {height: windowHeight * 0.3}]}/>
            <Text style={styles.loginTitleText}>Sign Up</Text>
            <View style={styles.loginInputStyle}>
                <TextInput placeholder='First Name' style={styles.loginInput}
                placeholderTextColor={'#c28837'} onChangeText={setFirstName}></TextInput>
            </View>
            <View style={styles.loginInputStyle}>
                <TextInput placeholder='Last Name' style={styles.loginInput}
                 placeholderTextColor={'#c28837'} onChangeText={setLastName}></TextInput>
            </View>
            <View style={styles.loginInputStyle}>
                <TextInput placeholder='Email' style={styles.loginInput} 
                placeholderTextColor={'#c28837'} onChangeText={setEmail}></TextInput>
            </View>
            <View style={styles.loginInputStyle}>
                <TextInput placeholder='New Pin' style={styles.loginInput}
                secureTextEntry={true} placeholderTextColor={'#c28837'} keyboardType='numeric'
                maxLength={6}
                onChangeText={setNewPin}></TextInput>
            </View>
            <View style={styles.loginInputStyle}>
                <TextInput placeholder='Re-enter New Pin' style={styles.loginInput}
                secureTextEntry={true} placeholderTextColor={'#c28837'} keyboardType='numeric'
                maxLength={6}
                onChangeText={setReenterNewPin}></TextInput>
            </View>
            <TouchableOpacity
                style={styles.loginButton}
                onPress={() => {handleSignup()}}
                >
                <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>

        </View>
    );
}



const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
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
    }
});
