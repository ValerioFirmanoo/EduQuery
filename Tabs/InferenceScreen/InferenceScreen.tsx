import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native-web';

interface Question {
    id: number;
    text: string;
}

export default function InferenceScreen() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});

    // Simula le domande ottenute dal large language model
    const mockQuestions: Question[] = [
        { id: 1, text: 'Qual è la capitale dell\'Italia?' },
        { id: 2, text: 'Chi ha dipinto la Gioconda?' },
        { id: 3, text: 'Quando è iniziata la Seconda Guerra Mondiale?' },
        { id: 4, text: 'Quando è iniziata la Seconda Guerra Mondiale?' },
    ];

    useEffect(() => {
        // Simula il caricamento delle domande dal large language model
        setQuestions(mockQuestions);
    }, []);

    const handleAnswerChange = (questionId: number, answer: string) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    const handleFeedback = (questionId: number) => {
        console.log(`Richiesta di feedback per la domanda ${questionId}`);
        // Logica per richiedere il feedback dal large language model
    };

    const handleAnswer = (questionId: number) => {
        console.log(`Richiesta di risposta per la domanda ${questionId}`);
        // Logica per richiedere la risposta dal large language model
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ecco le tue domande!</Text>
            <ScrollView style={styles.questionsContainer}>
                {questions.map((question) => (
                    <View key={question.id} style={styles.questionContainer}>
                        <Text style={styles.questionText}>{question.text}</Text>
                        <TextInput
                            style={styles.answerInput}
                            placeholder="Inserisci la tua risposta"
                            value={answers[question.id] || ''}
                            onChangeText={(text) => handleAnswerChange(question.id, text)}
                        />
                        <View style={styles.buttonContainer}>
                            <Button
                                title="Dammi un feedback"
                                onPress={() => handleFeedback(question.id)}
                            />
                            <Button
                                title="Dammi la tua risposta"
                                onPress={() => handleAnswer(question.id)}
                            />
                        </View>
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
