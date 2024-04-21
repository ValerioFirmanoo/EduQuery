import React, {useRef, useState} from 'react';
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
import {Pressable} from "react-native";

export default function InferenceScreen({ navigation }: any) {
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [questionText, setQuestionText] = useState("");
    const route = useRoute();
    const [showModal, setShowModal] = useState(false);
    const [completionText, setCompletionText] = useState("");
    const [scores, setScores] = useState<number[]>([]);
    const [averageScore, setAverageScore] = useState(0);
    const ref = useRef(null);
    const { completion, user_text } = route.params;
    const parsedCompletion = JSON.parse(completion);

    const handleEvaluate = (score: number) => {
        setScores((prevScores) => {
            const updatedScores = [...prevScores, score];
            const answeredQuestions = updatedScores.length;
            const totalScore = updatedScores.reduce((sum, s) => sum + s, 0);
            const maxPossibleScore = answeredQuestions * 100;
            const completionPercentage = (totalScore / maxPossibleScore) * 100;
            setAverageScore(completionPercentage);
            console.log('Completion percentage:', completionPercentage);
            return updatedScores;
        });
    };

    const handleQuestionInputChange = (text: string) => {
        setQuestionText(text);
    };

    const handleCompletionChange = (text: string) => {
        setCompletionText(text);
    };

    const handleAnswer = () => {
        console.log(`Richiesta di risposta per la domanda`);
    };

    const handleScoreChange = (score: number) => {
        setScores((prevScores) => [...prevScores, score]);
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
                    <Icon as={ArrowLeftIcon} m="$2" w="$8" h="$8" />
                </Pressable>
                <Heading>Ecco le tue domande!</Heading>
            </HStack>
            <Progress value={averageScore} w={300} size="md" my="$2">
                <ProgressFilledTrack />
            </Progress>
            <Divider my="$3"/>
            <ScrollView style={styles.questionsContainer}>
                {parsedCompletion.sections.map((section) => (
                    <View key={section.title} style={styles.sectionContainer}>
                        <Text size="2xl" mb="$2">{section.title}</Text>
                        <HStack space="md" reversed={false}>
                            {section.questions.map((question) => (
                                <Question user_text={user_text} question={question.question} answer="Answer" onInputChange={handleQuestionInputChange} setShowModal={setShowModal} ref={ref} onCompletionChange={handleCompletionChange} onScoreChange={handleScoreChange} onEvaluate={handleEvaluate}/>
                            ))}
                        </HStack>
                        <Divider my="$3"/>
                    </View>
                ))}
                <Modal
                    isOpen={showModal}
                    onClose={() => {
                        setShowModal(false)
                    }}
                    finalFocusRef={ref}
                >
                    <ModalBackdrop />
                    <ModalContent>
                        <ModalHeader>
                            <Heading size="lg">Model output</Heading>
                            <ModalCloseButton>
                                <Icon as={CloseIcon} />
                            </ModalCloseButton>
                        </ModalHeader>
                        <ModalBody>
                            <Text>
                                {completionText}
                            </Text>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                variant="outline"
                                size="sm"
                                action="secondary"
                                mr="$3"
                                onPress={() => {
                                    setShowModal(false)
                                }}
                            >
                                <ButtonText>Cancel</ButtonText>
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
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
