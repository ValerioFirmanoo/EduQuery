import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native-web';

// Importa il file JSON delle domande
import questionData from '../../assets/json/questions.json';

interface Question {
    number: string;
    question: string;
}

interface Section {
    title: string;
    questions: Question[];
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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ecco le tue domande!</Text>
            <ScrollView style={styles.questionsContainer}>
                {questionData.sections.map((section) => (
                    <View key={section.title} style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        {section.questions.map((question) => (
                            <View key={question.number} style={styles.questionContainer}>
                                <Text style={styles.questionText}>{question.question}</Text>
                                <TextInput
                                    style={styles.answerInput}
                                    placeholder="Inserisci la tua risposta"
                                    value={answers[question.number] || ''}
                                    onChangeText={(text) => handleAnswerChange(question.number, text)}
                                />
                                <View style={styles.buttonContainer}>
                                    <Button
                                        title="Dammi un feedback"
                                        onPress={() => handleFeedback(question.number)}
                                    />
                                    <Button
                                        title="Dammi la tua risposta"
                                        onPress={() => handleAnswer(question.number)}
                                    />
                                </View>
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
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
    },
    questionsContainer: {
        width: '100%',
    },
    questionContainer: {
        marginBottom: 24,
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
