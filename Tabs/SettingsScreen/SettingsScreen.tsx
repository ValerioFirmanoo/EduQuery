import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

// Dati di esempio per i file caricati
const uploadedFiles = [
    { id: '1', name: 'File 1', type: 'text' },
    { id: '2', name: 'File 2', type: 'audio' },
    { id: '3', name: 'File 3', type: 'video' },
    { id: '4', name: 'File 4', type: 'image' },
];

export default function SettingsScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSaveProfile = () => {
        // Logica per il salvataggio del profilo utente
        console.log('Salvataggio del profilo utente');
        console.log('Nome:', name);
        console.log('Email:', email);
    };

    const handleDeleteFile = (fileId: string) => {
        // Logica per l'eliminazione di un file caricato
        console.log(`Eliminazione del file con ID: ${fileId}`);
    };

    const renderFileItem = ({ item }: { item: any }) => (
        <View style={styles.fileItem}>
            <Text style={styles.fileName}>{item.name}</Text>
            <Text style={styles.fileType}>{item.type}</Text>
            <TouchableOpacity onPress={() => handleDeleteFile(item.id)}>
                <Text style={styles.deleteButton}>Elimina</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Impostazioni</Text>

            <View style={styles.profileSection}>
                <Text style={styles.sectionTitle}>Profilo utente</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
                    <Text style={styles.saveButtonText}>Salva profilo</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.filesSection}>
                <Text style={styles.sectionTitle}>File caricati</Text>
                <FlatList
                    data={uploadedFiles}
                    renderItem={renderFileItem}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </View>
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
    profileSection: {
        marginBottom: 24,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    saveButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    filesSection: {
        marginBottom: 24,
    },
    fileItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    fileName: {
        fontSize: 16,
    },
    fileType: {
        fontSize: 14,
        color: '#888',
    },
    deleteButton: {
        color: 'red',
        fontSize: 14,
    },
});
