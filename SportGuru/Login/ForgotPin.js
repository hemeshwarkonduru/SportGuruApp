import { useState } from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";


export default function ForgotPin({ isVisible, onClose}){

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('')

    return (
        <Modal visible={isVisible} transparent animationType="slide">
            <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
            <Text style={styles.loginTitleText}>Forgot Pin</Text>
            <View style={styles.loginInputStyle}>
                <TextInput placeholder='Email' style={styles.loginInput} 
                placeholderTextColor={'#c28837'} onChangeText={setEmail}></TextInput>
            </View>
            <View style={styles.loginInputStyle}>
                <TextInput placeholder='OTP' style={styles.loginInput}
                secureTextEntry={true} placeholderTextColor={'#c28837'} keyboardType='numeric'
                maxLength={6}
                onChangeText={setOtp}></TextInput>
            </View>
            <TouchableOpacity
                style={styles.loginButton}
                onPress={() => {}}
                >
                <Text style={styles.buttonText}>Change Pin</Text>
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