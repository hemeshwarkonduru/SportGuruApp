import { FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import SportEventCard from '../Component/SportEventCard';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
import { app } from '../firebaseConfig';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {

    const [eventsData, setEventsData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const eventsDataFunc = async () => {
        try {
            const db = getFirestore(app);
            const sportEventCollection = collection(db, 'SportEvent');
            const querySnapshot = await getDocs(sportEventCollection);
            const sportEventsData = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;
                sportEventsData.push(data);
            });
            setEventsData(sportEventsData);
            setLoading(false);
        } catch (error) {
            console.error("Couldn't fetch data from API", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        eventsDataFunc();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
            ) : (
                <FlatList
                    style={{ width: '100%' }}
                    data={eventsData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <SportEventCard card={item} isFirstCard={index === 0} />
                    )}
                />

            )}
        </View>
    );

}

const styles = StyleSheet.create({
    loadingIndicator: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
