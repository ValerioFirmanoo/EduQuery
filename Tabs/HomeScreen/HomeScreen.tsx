import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native-web';

import {
    Box,
    Heading,
    HStack,
    Progress,
    ProgressFilledTrack,
    Text,
    Button,
    Divider,
    Icon,
    StarIcon,
    ArrowLeftIcon, AvatarFallbackText, Avatar, InputField, Input, ButtonText, TextareaInput, Textarea
} from '@gluestack-ui/themed';

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
            <Text>Let's start with the topic!</Text>

            <Textarea>
                <TextareaInput placeholder="Inserisci un testo"/>
            </Textarea>
            {/*<Input*/}
            {/*    variant="outline"*/}
            {/*    size="md"*/}
            {/*    isDisabled={false}*/}
            {/*    isInvalid={false}*/}
            {/*    isReadOnly={false}*/}
            {/*>*/}
            {/*    <InputField placeholder="Inserisci un testo" value={text}/>*/}
            {/*</Input>*/}

            <Text>Select a file:</Text>
            {/*<FileInput onChange={handleFileUpload}>*/}
            {/*    <Button colorScheme="primary">Select File</Button>*/}
            {/*</FileInput>*/}

            <input type="file" onChange={handleFileUpload} />
            <Button
                size="md"
                variant="solid"
                action="primary"
                isDisabled={false}
                isFocusVisible={false}
                onPress={handleProcess}
            >
                <ButtonText>Elabora</ButtonText>
            </Button>
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
