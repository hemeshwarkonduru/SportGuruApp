import { FlatList, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';
import SportEventCard from '../Component/SportEventCard';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
import { app } from '../firebaseConfig';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useEmailUser } from '../Component/ZustandEmail';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTextDebounce } from '../Component/textDebounce';
import SearchableInput from '../Component/SearchInputText';

export default function Home() {
    const emailUser = useEmailUser((state) => state.email);
    const [eventsData, setEventsData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

    useTextDebounce(
        () => {
            if (!searchTerm || searchTerm.trim().length > 3) setDebouncedSearch(searchTerm);
        },
        500,
        [searchTerm]
    );



    const navigation = useNavigation();

    const handleCreatePost = () => {
        navigation.navigate("CreatePost");
    };

    const eventsDataFunc = async () => {
        try {
            setRefreshing(true)
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


    useEffect(() => {
        if (debouncedSearch) setEventsData(eventsData.filter((event) => {
            return event.sport.toLowerCase().includes(debouncedSearch.toLowerCase())
        }));
        else eventsDataFunc();
    }, [debouncedSearch]);

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
                    <TouchableOpacity
                        onPress={handleCreatePost}
                        style={styles.createPostButton}
                    >
                        <Ionicons name="add-circle" size={64} color="#8d5eaf" />
                        <Text>Create Event</Text>
                    </TouchableOpacity>
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
