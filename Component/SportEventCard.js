import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SportEventCard({ card, isFirstCard, email }) {
  const navigation = useNavigation();
  const isOrganizer = card.organizerEmail === email;

  const handleCardPress = () => {
    navigation.navigate('EventDetailsScreen', { card, email });
  };

  return (
    <View style={[styles.cardContainer, { marginTop: isFirstCard ? 10 : 10 }]}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.sportContainer}>
            <Text style={styles.labelText}>
              Organizer: 
            </Text>
            <Text style={styles.name}>{card.organizer}</Text>
          </View>
          {isOrganizer && (
            <Text style={styles.organizerIndicator}>Host</Text>
          )}
        </View>
        <View style={styles.sportContainer}>
          <Text style={styles.labelText}>Sport: </Text>
          <Text style={styles.sportText}>{card.sport}</Text>
        </View>
        <View style={styles.sportContainer}>
          <Text style={styles.labelText}>City: </Text>
          <Text style={styles.time}>{card.city}</Text>
        </View>
        <View style={styles.sportContainer}>
          <Text style={styles.labelText}>Date: </Text>
          <Text style={styles.date}>{card.date}</Text>
        </View>
        <View style={styles.sportContainer}>
          <Text style={styles.labelText}>Timings: </Text>
          <Text style={styles.time}>{`${card.timeStart} - ${card.timeEnd}`}</Text>
        </View>
        <Pressable style={styles.viewDetailsButton} onPress={handleCardPress}>
          <Text style={styles.viewDetailsButtonText}>View Details</Text>
        </Pressable>
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    color: '#fa6c07',
  },
  date: {
    fontSize: 16,
    color: 'gray',
  },
  time: {
    fontSize: 16,
  },
  viewDetailsButton: {
    backgroundColor: '#31b4ee',
    padding: 10,
    borderRadius: 4,
    marginTop: 10,
  },
  viewDetailsButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  organizerIndicator: {
    backgroundColor: '#fa6c07',
    color: 'white',
    borderRadius: 4,
    padding: 4,
    fontSize: 12,
  },
});
