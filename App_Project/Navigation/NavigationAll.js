
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

const Stack = createStackNavigator();

const BottomTab = createBottomTabNavigator();

function BottomNavigator(){
  return(
    <BottomTab.Navigator>
      <BottomTab.Screen name ="Home" component = {Home}
      options = {{tabBarIcon: () => <Ionicons name="home" size={24} color="black" />, headerShown: false}}/>
      <BottomTab.Screen name ="My Schedule" component = {MySchedule}
      options = {{tabBarIcon: () => <MaterialIcons name="schedule" size={24} color="black" /> , headerShown: false}}/>
      <BottomTab.Screen name ="Settings" component = {Settings}
      options = {{tabBarIcon: () => <Ionicons name="settings-sharp" size={24} color="black" /> , headerShown: false}}/>
    </BottomTab.Navigator>
  );
}

export default function NavigationAll() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component = {Login} options = {{ headerShown: false}}/>
        <Stack.Screen name="Signup" component={Signup} options = {{ headerShown: false}}/>
        <Stack.Screen name="HomeWithBottomNav" component={BottomNavigator} 
        options = {{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


