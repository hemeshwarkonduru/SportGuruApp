
import React from 'react';
import { View, Text } from 'react-native';

export default function EventDetailsScreen({route}) {
  console.log( route.params)
  const {organizer, sport, date,timeStart, timeEnd} = route.params.card
  return (
    <View>
      <Text>Organizer: {organizer}</Text>
      <Text>Sport: {sport}</Text>
      <Text>Date: {date}</Text>
      <Text>Timings: {timeStart} - {timeEnd}</Text>
    </View>
  );
}
