import { FlatList, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, TextInput, ScrollView, ToastAndroid } from 'react-native';
import { useEffect, useState } from 'react';
import { useEmailUser } from './ZustandEmail';
import { addDoc, collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import {app} from "../firebaseConfig";
import { useNavigation } from '@react-navigation/native';



export default function CreatePost(){

    const emailUser = useEmailUser((state) => state.email);

    const [sport, setSport] = useState('');
    const [city, setCity] = useState('');
    const [location, setLocation] = useState('');
    const [roomNo, setRoomNo] = useState('');
    const [date, setDate] = useState('');
    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    const [description, setDescription] = useState('');
    const [maxPeople, setMaxPeople] = useState(1)
    

    function showToast(text) {
        ToastAndroid.show(text, ToastAndroid.SHORT);
      }

      const navigation = useNavigation();

    const handleCreatePost = async () => {
        try {
            const isValidDateFormat = (inputDate) => {
                const dateFormat = /^\d{4}\/\d{1,2}\/\d{1,2}$/;
                return inputDate.match(dateFormat);
            };
        
            const isValidTimeFormat = (inputTime) => {
                const timeFormat = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;
                return inputTime.match(timeFormat);
            };
        
            if (!isValidDateFormat(date)) {
                showToast('Invalid date format. Please use yyyy/mm/dd');
                return;
            }
        
            if (!isValidTimeFormat(timeStart) || !isValidTimeFormat(timeEnd)) {
                showToast('Invalid time format. Please use HH:MM AM/PM');
                return;
            }

            const db = getFirestore(app);
            const sportEventCollection = collection(db, 'SportEvent');
            
            const userCollection = collection(db, 'User');
            const userQuery = query(userCollection, where('email', '==', emailUser));
            const userQuerySnapshot = await getDocs(userQuery);
            
            if (userQuerySnapshot.size === 1) {
                const userData = userQuerySnapshot.docs[0].data();
                const organizer = `${userData.firstName} ${userData.lastName}`;
                const peopleAttending = []
                const newSportEvent = {
                    organizerEmail : emailUser,
                    organizer,
                    sport,
                    place: location,
                    roomNo,
                    date,
                    timeStart,
                    timeEnd,
                    description,
                    city,
                    peopleAttending,
                    maxPeople,
                    noAttending: 1
                };
    
                await addDoc(sportEventCollection, newSportEvent);
                showToast('Sport event created successfully');
                navigation.navigate("HomeWithBottomNav")
            } else {
                console.error('User data not found');
                showToast('User data not found');
                return
            }
        } catch (error) {
            console.error('Error While creating the sport event: ' + error);
            showToast('Error creating the sport event');
            return;
        }
    }

    

    return(
        <ScrollView contentContainerStyle={styles.container}>
            <View style = {styles.root}>
            <Text style={styles.loginTitleText}>Sport Creation Form</Text>
            <View style={styles.loginInputStyle}>
                <TextInput placeholder='Sport' style={styles.loginInput}
                placeholderTextColor={'#c28837'} onChangeText={setSport}
                multiline={true}  numberOfLines={2}></TextInput>
            </View>
            <View style={styles.loginInputStyle}>
                <TextInput placeholder='City' style={styles.loginInput}
                 placeholderTextColor={'#c28837'} onChangeText={setCity}></TextInput>
            </View>
            <View style={styles.loginInputStyle}>
                <TextInput placeholder='Location' style={styles.loginInput}
                 placeholderTextColor={'#c28837'} onChangeText={setLocation}></TextInput>
            </View>
            <View style={styles.loginInputStyle}>
                <TextInput placeholder='Room Number' style={styles.loginInput} 
                placeholderTextColor={'#c28837'} onChangeText={setRoomNo}></TextInput>
            </View>
            <View style={styles.loginInputStyle}>
                <TextInput placeholder='Max People' style={styles.loginInput} 
                placeholderTextColor={'#c28837'}  keyboardType='numeric'
                maxLength={6}
                onChangeText={setMaxPeople}></TextInput>
            </View>
            <View style={styles.loginInputStyle}>
                <TextInput placeholder='Date (yyyy/mm/dd)' style={styles.loginInput} 
                placeholderTextColor={'#c28837'} onChangeText={setDate}></TextInput>
            </View>
            <View style={styles.loginInputStyle}>
                <TextInput placeholder='Start Time(HH:MM AM/PM)' style={styles.loginInput} 
                placeholderTextColor={'#c28837'} onChangeText={setTimeStart}></TextInput>
            </View>
            <View style={styles.loginInputStyle}>
                <TextInput placeholder='End Time (HH:MM AM/PM)' style={styles.loginInput} 
                placeholderTextColor={'#c28837'} onChangeText={setTimeEnd}></TextInput>
            </View>
            <View style={styles.descriptionInputStyle}>
                <TextInput placeholder='Description' style={styles.loginInput} 
                placeholderTextColor={'#c28837'} onChangeText={setDescription}
                multiline={true}  numberOfLines={4}></TextInput>
            </View>
            <TouchableOpacity
                style={styles.loginButton}
                onPress={() => {handleCreatePost()}}
                >
                <Text style={styles.buttonText}>Create Sport Event</Text>
            </TouchableOpacity>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        padding: 16,
        flexGrow: 1,
      },
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
    descriptionInputStyle: {
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderRadius: 30,
        width: "70%",
        height: 100,
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
        width: "80%",
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