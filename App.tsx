import * as React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Onboarding from './Tabs/Onboarding/Onboarding'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

export default function App() {
  const [initialRouteName, setInitialRouteName] = React.useState<string>("Onboarding");

  const routeName = 'Onboarding';

  return (
      <NavigationContainer>
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={initialRouteName}
        >
          <Stack.Screen name="Onboarding" component={Onboarding} />

        </Stack.Navigator>
      </NavigationContainer>
  );
}
