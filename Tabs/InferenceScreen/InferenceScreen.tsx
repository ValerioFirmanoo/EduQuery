import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native-web';
import Question from '../../components/Question';
import { useRoute } from '@react-navigation/native';

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
    ArrowLeftIcon, AvatarFallbackText, Avatar
} from '@gluestack-ui/themed';
import {Pressable} from "react-native";

import axios from 'axios';

export default function InferenceScreen({ navigation }: any) {
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [questionText, setQuestionText] = useState("");
    const route = useRoute();
    const { completion } = route.params;
    const parsedCompletion = JSON.parse(completion);

    const handleQuestionInputChange = (text: string) => {
        setQuestionText(text);
    };

    const system_prompt = 'You must support in critical reasoning about the text, should not replace the user\'s work. Be concise, you must not provide the correct answer! That\'s critical that you do not provide correct answer. Reply in maximum 30 words just stating where the error is and not expanding on it.'

    const handleFeedback = async () => {
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'system', content: system_prompt },
                        { role: 'user', content: questionText }],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer sk-proj-Mq1OD4U3rpPZAa1IsxdIT3BlbkFJ4TmKVm9XQDiotqz3eRUx`,
                    },
                }
            );

            const completion = response.data.choices[0].message.content;

            console.log('Completion:', completion);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAnswer = () => {
        console.log(`Richiesta di risposta per la domanda`);
    };

    const goBack = () => {
        navigation.navigate('HomeScreen');
        console.log('Avvio elaborazione dei dati');
    };

    return (
        <View style={styles.container}>
            <HStack space="xs" justifyContent="space-between" reversed={false}>
                <Pressable
                    onPress={goBack}
                >
                    <Icon as={ArrowLeftIcon} m="$2" w="$4" h="$4" />
                </Pressable>
                <Heading>Ecco le tue domande!</Heading>
                <Icon as={StarIcon} mx="$2" h="auto" />
            </HStack>
            <Progress value={40} w={300} size="md" my="$2">
                <ProgressFilledTrack />
            </Progress>
            <Divider my="$3"/>
            <ScrollView style={styles.questionsContainer}>
                {parsedCompletion.sections.map((section) => (
                    <View key={section.title} style={styles.sectionContainer}>
                        <Text size="2xl" mb="$2">{section.title}</Text>
                        <HStack space="md" reversed={false}>
                            {section.questions.map((question) => (
                                <Question question={question.question} answer="Answer" onInputChange={handleQuestionInputChange} onPressFeedback={handleFeedback}/>
                            ))}
                        </HStack>
                        <Divider my="$3"/>
                    </View>
                ))}
            </ScrollView>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    questionsContainer: {
        width: '100%',
    },
    questionContainer: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        margin: 8,
    },
    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    answerInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
