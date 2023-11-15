import { FlatList, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';
import { useEmailUser } from '../Component/ZustandEmail'; 
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { app } from '../firebaseConfig';
import SportEventCard from '../Component/SportEventCard';
import { getFirestore, collection, getDocs, where, query, arrayContains } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useTextDebounce } from '../Component/textDebounce';
import SearchableInput from '../Component/SearchInputText';

export default function MySchedule(){

    const emailUser = useEmailUser((state) => state.email);
    const [eventsData, setEventsData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const navigation = useNavigation();

    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

    useTextDebounce(
        () => {
            if (!searchTerm || searchTerm.trim().length > 3) setDebouncedSearch(searchTerm);
        },
        500,
        [searchTerm]
    );
    
    useEffect(() => {
        if (debouncedSearch) setEventsData(eventsData.filter((event) => {
            return event.sport.toLowerCase().includes(debouncedSearch.toLowerCase())
        }));
        else eventsDataFunc();
    }, [debouncedSearch]);

    const eventsDataFunc = async () => {
        try {
            setRefreshing(true)
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
            setRefreshing(false)
        } catch (error) {
            console.error("Couldn't fetch data from API", error);
            setLoading(false);
            setRefreshing(false)
        }
    }

    // useFocusEffect(() => {
    //     eventsDataFunc();
    // });

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
            ) : (
                <>
                <SearchableInput value={searchTerm} onChange={setSearchTerm}/>
                    <FlatList
                        style={{ width: '100%' }}
                        data={eventsData}
                        keyExtractor={(item) => item.id}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={eventsDataFunc} />}
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
