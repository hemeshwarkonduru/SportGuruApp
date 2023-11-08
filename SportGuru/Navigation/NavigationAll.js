
import { StyleSheet, Text, View } from 'react-native';
import Login from "../Login/Login"
import Signup from "../Login/Signup"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "../Home/Home";
import MySchedule from "../Home/MySchedule";
import Settings from "../Home/Settings";
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import EventDetailsScreen from "../Component/EventDetailsScreen"
import { useState } from 'react';
import CreatePost from '../Component/CreatePost';

const Stack = createStackNavigator();

const BottomTab = createBottomTabNavigator();

function BottomNavigator(){
  return(
    <BottomTab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconTag;
        if (route.name === "Home") {
          iconTag = focused ? "home" : "home-outline";
        } else if (route.name === "My Schedule") {
          iconTag = focused ? "calendar" : "calendar-outline";
        } else if (route.name === "Settings") {
          iconTag = focused ? "settings" : "settings-outline";
        }
        return <Ionicons name={iconTag} size={size} color={color} />;
      }
    })}>
      <BottomTab.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      <BottomTab.Screen name ="My Schedule" component = {MySchedule}
      options = {{headerShown: false}}/>
      <BottomTab.Screen name ="Settings" component = {Settings}
      options = {{ headerShown: false}}/>
    </BottomTab.Navigator>
  );
}

export default function NavigationAll() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeWithBottomNav">
        {/* <Stack.Screen name="Login" component = {Login} options = {{ headerShown: false}}/> */}
        <Stack.Screen name="Signup" component={Signup} options = {{ headerShown: false}}/>
        <Stack.Screen
            name="HomeWithBottomNav"
            component={BottomNavigator}
            options= {{
              headerShown: false,
            }}
            />

        <Stack.Screen name="EventDetailsScreen" component = {EventDetailsScreen} options = {{ headerShown: false}}/>
        <Stack.Screen name="CreatePost" component = {CreatePost} options = {{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


