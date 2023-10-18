import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Image , TouchableOpacity} from 'react-native';
import logo from '../assets/SportGuru.webp'
import { Dimensions } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const marginTopPercent = 15;
const windowHeight = Dimensions.get('window').height;
const marginTop = (windowHeight * marginTopPercent) / 100;


export default function Login() {
    

    return (
        <View style = {styles.root}>
            <Image source = {logo} style = {[styles.logo , {height: windowHeight * 0.3}]}/>
            <Text style={styles.loginTitleText}>User Login</Text>
            <View style={styles.loginInputStyle}>
                <TextInput placeholder='Email' style={styles.loginInput}
                placeholderTextColor={'#c28837'}></TextInput>
            </View>
            <View style={styles.loginInputStyle}>
                <TextInput placeholder='Pin' style={styles.loginInput}
                secureTextEntry={true} placeholderTextColor={'#c28837'}></TextInput>
            </View>
            <TouchableOpacity
                style={styles.forgotPasswordButton}
                onPress={() => {}}
                >
                <Text style={styles.buttonText}>Forgot your Pin?</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.loginButton}
                onPress={() => {}}
                >
                <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
            <View style = {styles.dontAccount}>
                <TouchableOpacity
                    style={styles.forgotPasswordButton}
                    onPress={() => {}}
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
        padding : 20,
        marginTop: marginTop,
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
