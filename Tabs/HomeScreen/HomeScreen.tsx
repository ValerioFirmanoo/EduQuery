import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native-web';

export default function HomeScreen({ navigation }: any) {
    const [text, setText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleProcess = () => {
        navigation.navigate('InferenceScreen');
        console.log('Avvio elaborazione dei dati');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Let's start with the topic!</Text>
            <TextInput
                style={styles.input}
                placeholder="Input text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <View style={styles.fileUploadContainer}>
                <Text>Select a file:</Text>
                <input type="file" onChange={handleFileUpload} />
            </View>
            <Button title="Start elaboration" onPress={handleProcess} style={styles.button} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        width: '100%',
        maxWidth: 400,
    },
    fileUploadContainer: {
        marginBottom: 16,
        width: '100%',
        maxWidth: 400,
    },
    button: {
        width: '100%',
        maxWidth: 400,
    },
});
