import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image , TouchableOpacity, ToastAndroid,Modal} from 'react-native';
import logo from '../assets/SportGuru.webp'
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const windowHeight = Dimensions.get('window').height;


export default function Signup({ isVisible, onClose }) {

    //const navigation = useNavigation();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [newPin, setNewPin] = useState('');
    const [reenterNewPin, setReenterNewPin] = useState('');

    function showToast(text) {
        ToastAndroid.show(text, ToastAndroid.SHORT);
      }

    const handleSignup = async () => {
        if (!firstName || !lastName || !email || !newPin || !reenterNewPin) {
            console.log("Error: Please Enter All the fields");
            showToast("Please Enter All the fields");
            setNewPin('');
            return;
          }
      
        if(newPin != reenterNewPin){
            console.log("Pin Doesn't Match Enter Again");
            showToast("Pin Doesn't Match Enter Again")
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
            const response = await fetch("https://firestore.googleapis.com/v1/projects/sportguruapp/databases/(default)/documents/User/",
            {
                headers: {
                'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            });
            if(response.ok){
                showToast('Signup successful');
                onClose();
            }
            else {
                console.error("Error: API Error");
                showToast("Something went wrong try after some time");
            }
        } catch(error){
            console.error("Error: Server Side Error")
            showToast("Something went wrong try after some time");
        }
    
    }


    
        
    return (
        <Modal visible={isVisible} transparent animationType="slide">
            <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
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
            <TouchableOpacity
                style={styles.loginButton}
                onPress={() => {onClose()}}
                >
                <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>

            </View>
            </View>
        </Modal>
    );
}



const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
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
        width: "70%",
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
