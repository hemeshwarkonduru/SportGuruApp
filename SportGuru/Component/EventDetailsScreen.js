import {React,useState,useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, doc, updateDoc ,getDoc} from 'firebase/firestore';
import { app } from '../firebaseConfig';



export default function EventDetailsScreen({route}) {
  const id = route.params.card.id;

  const navigation = useNavigation();

  const goBackToHome = () => {
    navigation.goBack()
  }

  const [singleEventData , setSingleEventData] = useState({})
  const [isLoading, setLoading] = useState(true);
  
  const getEventData = async () => {
    try {
      const db = getFirestore(app);
      const documentRef = doc(db, 'SportEvent', id);
      const documentSnapshot = await getDoc(documentRef);
      if (documentSnapshot.exists()) {
        const data = documentSnapshot.data();
        data.id = id
        setSingleEventData(data);
        
      }
      setLoading(false)
    } catch (error) {
        console.error("Couldn't fetch data from API", error);
        setLoading(false);
    }
  } 

  useEffect(() => {
    getEventData();
  }, []);

  const regsiterTheUser = async () => {
    try{
        const db = getFirestore(app);
        const sportEventCollection = collection(db, 'SportEvent');
        if(db && id){
          const sportEventDoc = doc(sportEventCollection, id);
          const updatedNoAttending = singleEventData.noAttending + 1;
          const updateData = {
            noAttending: updatedNoAttending
          };
          await updateDoc(sportEventDoc, updateData);
          navigation.goBack()
        }
        else{
          console.error("Some Error Occured with Id or Connection");
        }
        

    }
    catch(error){
      console.error("Error While updating the fields" + error);
    }
  }

  return (
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
        <Text style={styles.label}>Place:  </Text>
        <Text style={styles.value}>{singleEventData.place}</Text>
      </View>
      <View style = {{marginTop: "10px"}}>
        <TouchableOpacity
            style={styles.backButton}
            onPress={() => {regsiterTheUser()}}
            >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {goBackToHome()}}
            >
            <Text style={styles.buttonText}>Go Back</Text>
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
    width: "50%",
    height: 45,
    marginBottom: 20,
    borderColor: '#020024',
    alignItems: 'center',
    justifyContent: 'center'
},
});
