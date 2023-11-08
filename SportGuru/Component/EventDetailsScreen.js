import { React, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, doc, updateDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { app } from '../firebaseConfig';

export default function EventDetailsScreen({ route }) {
    const id = route.params.card.id;
    const emailUser = route.params.email;

    const navigation = useNavigation();

    const goBackToHome = () => {
        navigation.goBack();
    }

    function showToast(text) {
        ToastAndroid.show(text, ToastAndroid.SHORT);
    }

    const [singleEventData, setSingleEventData] = useState({})
    const [isLoading, setLoading] = useState(true);
    const [isRegistered, setRegistered] = useState(false);
    const [isHost, setIsHost] = useState(false);

    const getEventData = async () => {
        try {
            const db = getFirestore(app);
            const documentRef = doc(db, 'SportEvent', id);
            const documentSnapshot = await getDoc(documentRef);
            if (documentSnapshot.exists()) {
                const data = documentSnapshot.data();
                data.id = id;
                setSingleEventData(data);
                setRegistered(data.peopleAttending && data.peopleAttending.includes(emailUser));
                setIsHost(data.organizerEmail === emailUser);
            }
            setLoading(false);
        } catch (error) {
            console.error("Couldn't fetch data from API", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getEventData();
    }, []);

    const handleRegister = async () => {
        try {
            const db = getFirestore(app);
            const sportEventCollection = collection(db, 'SportEvent');
            if (db && id) {
                const sportEventDoc = doc(sportEventCollection, id);
                const sportEventSnapshot = await getDoc(sportEventDoc);

                if (sportEventSnapshot.exists()) {
                    const currentData = sportEventSnapshot.data();
                    const currentPeopleAttending = currentData.peopleAttending || [];
                    const maxPeople = currentData.maxPeople;

                    if (!currentPeopleAttending.includes(emailUser)) {
                        // Check if the event is not full.
                        if (currentData.noAttending < maxPeople) {
                            // Add the email to the peopleAttending array.
                            currentPeopleAttending.unshift(emailUser);

                            const updatedNoAttending = currentData.noAttending + 1;

                            const updateData = {
                                peopleAttending: currentPeopleAttending,
                                noAttending: updatedNoAttending
                            };

                            await updateDoc(sportEventDoc, updateData);
                            setRegistered(true);
                            showToast("Registered for the event");
                            navigation.goBack()
                        } else {
                            showToast("Event is already full.");
                        }
                    } else {
                        showToast("You are already registered for this event.");
                    }
                } else {
                    console.error("Document not found");
                    showToast("Server Error");
                }
            } else {
                console.error("Some Error Occurred with ID or Connection");
                showToast("Server Error");
            }
        } catch (error) {
            console.error("Error While updating the fields: " + error);
        }
    }

    const handleUnregister = async () => {
        try {
            const db = getFirestore(app);
            const sportEventCollection = collection(db, 'SportEvent');
            if (db && id) {
                const sportEventDoc = doc(sportEventCollection, id);
                const sportEventSnapshot = await getDoc(sportEventDoc);

                if (sportEventSnapshot.exists()) {
                    const currentData = sportEventSnapshot.data();
                    const currentPeopleAttending = currentData.peopleAttending || [];

                    if (currentPeopleAttending.includes(emailUser)) {
                        // Remove the email from the peopleAttending array.
                        const updatedPeopleAttending = currentPeopleAttending.filter(email => email !== emailUser);
                        const updatedNoAttending = currentData.noAttending - 1;

                        const updateData = {
                            peopleAttending: updatedPeopleAttending,
                            noAttending: updatedNoAttending
                        };

                        await updateDoc(sportEventDoc, updateData);
                        setRegistered(false);
                        showToast("Unregistered from the event");
                        navigation.goBack();
                    } else {
                        showToast("You are not registered for this event.");
                    }
                } else {
                    console.error("Document not found");
                    showToast("Server Error");
                }
            } else {
                console.error("Some Error Occurred with ID or Connection");
                showToast("Server Error");
            }
        } catch (error) {
            console.error("Error While updating the fields: " + error);
        }
    }

    const handleDeleteEvent = async () => {
      if (isHost) {
          try {
              const db = getFirestore(app);
              const sportEventCollection = collection(db, 'SportEvent');
              if (db && id) {
                  const sportEventDoc = doc(sportEventCollection, id);
                  await deleteDoc(sportEventDoc);
                  showToast("Event deleted successfully");
                  navigation.goBack();
              } else {
                  console.error("Some Error Occurred with ID or Connection");
                  showToast("Server Error");
              }
          } catch (error) {
              console.error("Error while deleting the event: " + error);
          }
      }
  }

    return (
        <View style={{ flex: 1 }}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
            ) : (
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.header}>Event Details</Text>
                    <View style={styles.details}>
                        <Text style={styles.label}>Organizer Name:  </Text>
                        <Text style={styles.value}>{singleEventData.organizer}</Text>
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.label}>Organizer Email:  </Text>
                        <Text style={styles.value}>{singleEventData.organizerEmail}</Text>
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.label}>Sport:  </Text>
                        <Text style={styles.sportValue}>{singleEventData.sport}</Text>
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.label}>Date:  </Text>
                        <Text style={styles.value}>{singleEventData.date}</Text>
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.label}>Timings:  </Text>
                        <Text style={styles.value}>{singleEventData.timeStart} - {singleEventData.timeEnd}</Text>
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.label}>Description:  </Text>
                        <Text style={styles.value}>{singleEventData.description}</Text>
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.label}>City:  </Text>
                        <Text style={styles.value}>{singleEventData.city}</Text>
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.label}>Max People:  </Text>
                        <Text style={styles.value}>{singleEventData.maxPeople}</Text>
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.label}>Number Attending:  </Text>
                        <Text style={styles.value}>{singleEventData.noAttending}</Text>
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.label}>Room Number:  </Text>
                        <Text style={styles.value}>{singleEventData.roomNo}</Text>
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.label}>Location:  </Text>
                        <Text style={styles.value}>{singleEventData.place}</Text>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        {isHost ? (
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={handleDeleteEvent}
                            >
                                <Text style={styles.buttonText}>Delete Event</Text>
                            </TouchableOpacity>
                        ) : (
                            <>
                                {isRegistered ? (
                                    <TouchableOpacity
                                        style={styles.unregisterButton}
                                        onPress={handleUnregister}
                                    >
                                        <Text style={styles.buttonText}>Unregister</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        style={styles.registerButton}
                                        onPress={handleRegister}
                                    >
                                        <Text style={styles.buttonText}>Register</Text>
                                    </TouchableOpacity>
                                )}
                            </>
                        )}
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={goBackToHome}
                        >
                            <Text style={styles.buttonText}>Go Back</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            )}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        padding: 16,
        flexGrow: 1,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop: "15%",
    },
    details: {
        flexDirection: 'row',
        marginBottom: 8,
        marginRight: "25%"
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 16,
    },
    sportValue: {
        fontSize: 16,
        color: '#fa6c07',
    },
    backButton: {
        backgroundColor: '#fcb34a',
        borderWidth: 1,
        borderRadius: 30,
        width: "100%",
        height: 45,
        marginTop: 20,
        marginBottom: 20,
        borderColor: '#020024',
        alignItems: 'center',
        justifyContent: 'center'
    },
    registerButton: {
        backgroundColor: '#4caf50',
        borderWidth: 1,
        borderRadius: 30,
        width: "100%",
        height: 45,
        marginTop: 10,
        marginBottom: 10,
        borderColor: '#020024',
        alignItems: 'center',
        justifyContent: 'center'
    },
    unregisterButton: {
        backgroundColor: '#e91e63',
        borderWidth: 1,
        borderRadius: 30,
        width: "100%",
        height: 45,
        marginTop: 10,
        marginBottom: 10,
        borderColor: '#020024',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
    },
    loadingIndicator: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButton: {
      backgroundColor: '#e91e63',
      borderWidth: 1,
      borderRadius: 30,
      width: "100%",
      height: 45,
      marginTop: 10,
      marginBottom: 10,
      borderColor: '#020024',
      alignItems: 'center',
      justifyContent: 'center'
  },
});
