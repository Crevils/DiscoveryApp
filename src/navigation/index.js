import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RecipeDetailScreen from '../screens/DataDetailScreen';
import MapViewScreen from '../screens/MapViewScreen';
import All_buisnessDataScreen from '../screens/All_buisnessDataScreen'; //
import NotificationScreen from '../screens/NotificationScreen';
// import SearchScreen from '../screens/SearchScreen';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="RecipeDetail" options={{ presentation: 'fullScreenModal' }} component={RecipeDetailScreen} />
        <Stack.Screen name="MapViewScreen" component={MapViewScreen} />
        <Stack.Screen name="All_buisnessDataScreen" component={All_buisnessDataScreen} />
        <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
        {/* <Stack.Screen name="Search" component={SearchScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
