import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Onboarding from './Tabs/Onboarding/Onboarding';
import HomeScreen from './Tabs/HomeScreen/HomeScreen';
import SettingsScreen from './Tabs/SettingsScreen/SettingsScreen';
import InferenceScreen from './Tabs/InferenceScreen/InferenceScreen';

import { GluestackUIProvider, Text } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config"

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
    <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
);

export default function App() {
    return (
        <GluestackUIProvider config={config}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="HomeScreen">
                    <Stack.Screen
                        name="Onboarding"
                        component={Onboarding}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="HomeScreen"
                        component={HomeScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="SettingsScreen"
                        component={SettingsScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="InferenceScreen"
                        component={InferenceScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Tabs"
                        component={TabNavigator}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </GluestackUIProvider>
    );
}
