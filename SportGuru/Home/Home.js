import { FlatList, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import SportEventCard from '../Component/SportEventCard';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
import { app } from '../firebaseConfig';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useEmailUser } from '../Component/ZustandEmail'; 
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export default function Home() {
    const emailUser = useEmailUser((state) => state.email);
    const [eventsData, setEventsData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const navigation = useNavigation();

    const handleCreatePost = () => {
        navigation.navigate("CreatePost");
    };

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
