import { FlatList, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useEmailUser } from '../Component/ZustandEmail'; 
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { app } from '../firebaseConfig';
import SportEventCard from '../Component/SportEventCard';
import { getFirestore, collection, getDocs, where, query, arrayContains } from 'firebase/firestore';
import { useState, useEffect } from 'react';

export default function MySchedule(){

    const emailUser = useEmailUser((state) => state.email);
    const [eventsData, setEventsData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const navigation = useNavigation();

    const eventsDataFunc = async () => {
        try {
            const db = getFirestore(app);
            const sportEventCollection = collection(db, 'SportEvent');
            const hostingQuery = query(sportEventCollection, where('organizerEmail', '==', emailUser));
            const attendingQuery = query(sportEventCollection, where('peopleAttending', 'array-contains', emailUser));

            const [hostingSnapshot, attendingSnapshot] = await Promise.all([
                getDocs(hostingQuery),
                getDocs(attendingQuery),
            ]);

            const hostingEvents = [];
            const attendingEvents = [];

            hostingSnapshot.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;
                hostingEvents.push(data);
            });

            attendingSnapshot.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;
                attendingEvents.push(data);
            });

            const combinedEvents = [...hostingEvents, ...attendingEvents];
            setEventsData(combinedEvents);
            setLoading(false);
        } catch (error) {
            console.error("Couldn't fetch data from API", error);
            setLoading(false);
        }
    }

    useFocusEffect(() => {
        eventsDataFunc();
    });

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
            ) : (
                <>
                    <FlatList
                        style={{ width: '100%' }}
                        data={eventsData}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => (
                            <SportEventCard card={item} isFirstCard={index === 0} email={emailUser} />
                        )}
                    />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    loadingIndicator: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    createPostButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        alignItems: "center",
    },
});
