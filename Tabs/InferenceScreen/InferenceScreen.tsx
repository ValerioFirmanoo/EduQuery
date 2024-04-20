import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native-web';
import Question from '../../components/Question';

// Importa il file JSON delle domande
import questionData from '../../assets/json/questions.json';
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

interface Question {
    number: string;
    question: string;
}

export default function InferenceScreen() {
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});

    const handleAnswerChange = (questionNumber: string, answer: string) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionNumber]: answer,
        }));
    };

    const handleFeedback = (questionNumber: string) => {
        console.log(`Richiesta di feedback per la domanda ${questionNumber}`);
        // Logica per richiedere il feedback dal large language model
    };

    const handleAnswer = (questionNumber: string) => {
        console.log(`Richiesta di risposta per la domanda ${questionNumber}`);
        // Logica per richiedere la risposta dal large language model
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
                <Avatar bgColor="$amber600" size="md" borderRadius="$full">
                    <AvatarFallbackText>Sandeep Srivastava</AvatarFallbackText>
                </Avatar>
            </HStack>
            <Progress value={40} w={300} size="md" my="$2">
                <ProgressFilledTrack />
            </Progress>
            <Divider my="$3"/>
            <ScrollView style={styles.questionsContainer}>
                {questionData.sections.map((section) => (
                    <View key={section.title} style={styles.sectionContainer}>
                        <Text size="2xl" mb="$2">{section.title}</Text>
                        <HStack space="md" reversed={false}>
                            {section.questions.map((question) => (
                                <Question question={question.question} answer="Answer"/>
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
