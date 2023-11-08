import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useEmailUser, useEmailUserActions } from '../Component/ZustandEmail';
import { app } from '../firebaseConfig';
import { getFirestore, doc, getDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';

export default function Settings() {
    const setEmailInStore = useEmailUser((state) => state.setEmail);
    const emailUser = useEmailUser((state) => state.email);

    const [userData, setUserData] = useState(null);

    const fetchUserData = async () => {
        try {
            const db = getFirestore(app);
            const UserCollection = collection(db, 'User');
            const q = query(UserCollection, where('email', '==', emailUser));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.docs.length > 0) {
                const userDoc = querySnapshot.docs[0];
                const userData = userDoc.data();
                setUserData(userData);
            } else {
                console.error('User not found');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useFocusEffect(() => {
        fetchUserData();
    });

    const handleLogout = () => {
        setEmailInStore('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>User Details</Text>
            {userData ? (
                <View>
                    <Text style={styles.text}>Email: {userData.email}</Text>
                    <Text style={styles.text}>First Name: {userData.firstName}</Text>
                    <Text style={styles.text}>Last Name: {userData.lastName}</Text>
                </View>
            ) : (
                <Text style={styles.loadingText}>Loading user data...</Text>
            )}
            <TouchableOpacity
                style={styles.loginButton}
                onPress={() => {handleLogout()}}
                >
                <Text style={styles.buttonText}>LOG OUT</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop: "15%",
      },
    text: {
        fontSize: 20,
        marginVertical: 10,
        fontWeight: 'bold',
        color: '#333',
    },
    loadingText: {
        fontSize: 20,
        marginVertical: 10,
        color: 'gray',
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
        justifyContent: 'center',
        marginTop:20,
    },
});
