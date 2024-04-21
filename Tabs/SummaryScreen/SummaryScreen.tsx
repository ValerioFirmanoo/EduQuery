import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native-web';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

import {
    Box,
    Heading,
    HStack,
    Progress,
    ProgressFilledTrack,
    Text,
    Divider,
    Icon,
    StarIcon,
    ArrowLeftIcon,
    AvatarFallbackText,
    Avatar,
    Modal,
    ModalBackdrop,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    CloseIcon, ModalBody, Button, ModalFooter, ButtonText
} from '@gluestack-ui/themed';
import Markdown from 'react-native-markdown-display';

export default function SummaryScreen({ navigation }: any) {
    const route = useRoute();
    const { completion, user_text } = route.params;
    const [generatedText, setGeneratedText] = useState('');

    const handleExit = () => {
        navigation.navigate('Onboarding');
        console.log('Exit');
    };

    useEffect(() => {
        const fetchData = async () => {
            const system_prompt_answer = 'Given a text containing study material, some questions about it generate a summary of the text, following the structure of the questions (use the same numbers of the questions). The summary should not be too short. In the whole  summary highlight in bold the most important words.';

            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'system', content: system_prompt_answer },
                        { role: 'user', content: 'Text provided by the user' + user_text + '\n' + 'Question provided by the llm:' + completion}],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer sk-proj-Mq1OD4U3rpPZAa1IsxdIT3BlbkFJ4TmKVm9XQDiotqz3eRUx`,
                    },
                }
            );

            const completion = response.data.choices[0].message.content;
            setGeneratedText(completion);
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Heading>Ecco il riassunto!</Heading>
            <Divider my="$3"/>
            <ScrollView>
                <Markdown>{generatedText}</Markdown>
            </ScrollView>
            <Divider my="$3"/>
            <Button
                size="md"
                variant="solid"
                action="primary"
                isDisabled={false}
                isFocusVisible={false}
                onPress={handleExit}
            >
                <ButtonText>Exit</ButtonText>
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 16,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 40
    },
});
