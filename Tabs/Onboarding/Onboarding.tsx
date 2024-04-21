import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native-web';
import { StatusBar } from 'expo-status-bar';

export default function OnboardingPage({ navigation }: any) {
    const handleGetStarted = () => {
        navigation.navigate('HomeScreen');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to EdTech</Text>
            <Text style={styles.description}>
                Click the button below to get started.
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
