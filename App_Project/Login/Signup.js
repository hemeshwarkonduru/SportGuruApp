import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Image , TouchableOpacity} from 'react-native';
import logo from '../assets/SportGuru.webp'
import { Dimensions } from 'react-native';

const marginTopPercent = 15;
const windowHeight = Dimensions.get('window').height;
const marginTop = (windowHeight * marginTopPercent) / 100;


export default function Signup() {
    return (
        <View style = {styles.root}>
            <Image source = {logo} style = {[styles.logo , {height: windowHeight * 0.3}]}/>
            <Text style={styles.loginTitleText}>Sign Up</Text>
            <View style={styles.loginInputStyle}>
                <TextInput placeholder='First Name' style={styles.loginInput}
                placeholderTextColor={'#c28837'}></TextInput>
            </View>
            <View style={styles.loginInputStyle}>
                <TextInput placeholder='Last Name' style={styles.loginInput}
                 placeholderTextColor={'#c28837'}></TextInput>
            </View>
            <View style={styles.loginInputStyle}>
                <TextInput placeholder='Email' style={styles.loginInput} placeholderTextColor={'#c28837'}></TextInput>
            </View>
            <View style={styles.loginInputStyle}>
                <TextInput placeholder='New Pin' style={styles.loginInput}
                secureTextEntry={true} placeholderTextColor={'#c28837'}></TextInput>
            </View>
            <View style={styles.loginInputStyle}>
                <TextInput placeholder='Re-enter New Pin' style={styles.loginInput}
                secureTextEntry={true} placeholderTextColor={'#c28837'}></TextInput>
            </View>
            <TouchableOpacity
                style={styles.loginButton}
                onPress={() => {}}
                >
                <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>

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
