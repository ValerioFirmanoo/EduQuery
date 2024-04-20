import React, { useState } from 'react';
import {View, Text, TextInput, Button, StyleSheet, SafeAreaView} from 'react-native';

export default function HomeScreen() {
    const [text, setText] = useState('');
    const [audioUri, setAudioUri] = useState('');
    const [videoUri, setVideoUri] = useState('');
    const [imageUri, setImageUri] = useState('');

    const handleProcess = () => {
        // Logica per avviare l'elaborazione dei dati
        console.log('Avvio elaborazione dei dati');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Uploads your data</Text>
            <TextInput
                style={styles.input}
                placeholder="Input text"
                value={text}
                onChangeText={setText}
            />
            {/* Aggiungi input per audio, video e immagini */}
            <Button title="Start elaboration" onPress={handleProcess} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});
