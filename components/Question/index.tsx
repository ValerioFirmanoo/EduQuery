import React, {useState} from "react";
import {
    Button,
    ButtonText,
    ButtonIcon,
    AddIcon,
    Text,
    Input,
    InputField,
    Box,
    HStack,
    VStack,
    Card
} from '@gluestack-ui/themed';

interface Props {
    question: string;
    answer: string;
    onPressFeedback: () => void;
    onPressAnswer: () => void;
    onInputChange: (text: string) => void;
}

const Question = ({question, answer, onPressFeedback, onPressAnswer, onInputChange}: Props): JSX.Element => {
    const [inputText, setInputText] = useState("");

    const handleInputChange = (text: string) => {
        setInputText(text);
        onInputChange(text);
    };

    return (
        <Card
            bg="#FAFAFA"
            p="$5"
            rounded="$md"
            // width={375}
            width="33%"
            size="md"
            variant="outline"
        >
            <VStack space="lg">
                <Text fontSize="$md">{question}</Text>
                <Input
                    variant="outline"
                    size="md"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                    value={inputText}
                    onChangeText={handleInputChange}
                >
                    <InputField placeholder="Inserisci la tua risposta" />
                </Input>
                <HStack space="lg" justifyContent="space-between" height="100%">
                    <Text>{}/100</Text>
                    <Button
                        size="md"
                        variant="solid"
                        action="secondary"
                        isDisabled={false}
                        isFocusVisible={false}
                        onPress={onPressFeedback}
                    >
                        <ButtonText>Valuta</ButtonText>
                    </Button>
                    <Button
                        size="md"
                        variant="solid"
                        action="primary"
                        isDisabled={false}
                        isFocusVisible={false}
                        onPress={onPressAnswer}
                    >
                        <ButtonText>Non la so</ButtonText>
                    </Button>
                </HStack>
            </VStack>
        </Card>
    );
};

export default Question;
