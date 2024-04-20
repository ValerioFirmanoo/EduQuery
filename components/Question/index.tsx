import React from "react";
import { Text, Button, Input } from '@rneui/themed';
import { View, StyleSheet } from "react-native";

interface Props {
    question: string;
    answer: string;
    onPressFeedback: () => void;
    onPressAnswer: () => void;
    onChangeText: (text: string) => void;
}

const Question = ({
                      question,
                      answer,
                      onPressFeedback,
                      onPressAnswer,
                      onChangeText,
                  }: Props): JSX.Element => {
    return (
        <View key={question} style={styles.questionContainer}>
            <Text style={{fontWeight: 'bold'}}>{question}</Text>
            <Input
                placeholder="Inserisci la tua risposta"
                onChangeText={(text) => onChangeText(text)}
            />
            <View style={styles.buttonContainer}>
                <Button color="secondary"
                    title="Dammi un feedback"
                    onPress={onPressFeedback}
                />
                <Button
                    title="Dammi la tua risposta"
                    onPress={onPressAnswer}
                />
            </View>
        </View>
    );
};

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

export default Question;
