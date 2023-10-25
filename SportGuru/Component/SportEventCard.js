import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SportEventCard({ card , isFirstCard }) {
  const name = "Hemeshwar Konduru";
  const sport = "Badminton";
  const date = "10/24/2023";
  const startTime = "6 PM";
  const endTime = "8 PM";
  isFirstCard = true;

  return (
    <View style={[styles.cardContainer, { marginTop: isFirstCard ? 60 : 20 }]}>
      <View style={styles.card}>
        <View style={styles.sportContainer}>
            <Text style = {styles.labelText}>Organizer: </Text>
            <Text style={styles.name}>{name}</Text>
        </View>
        <View style={styles.sportContainer}>
          <Text style={styles.labelText}>Sport: </Text>
          <Text style={styles.sportText}>{sport}</Text>
        </View>
        <View style={styles.sportContainer}>
          <Text style={styles.labelText}>Date: </Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <View style={styles.sportContainer}>
          <Text style={styles.labelText}>Timings: </Text>
          <Text style={styles.time}>{`${startTime} - ${endTime}`}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#ffffff',
  },
  card: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  labelText: {
    fontSize: 16,
    color: 'black',
  },
  sportContainer: {
    flexDirection: 'row',
  },
  sportText: {
    fontSize: 16,
    color: '#fcb34a', 
  },
  date: {
    fontSize: 16,
    color: 'gray',
  },
  time: {
    fontSize: 16,
  },
});
