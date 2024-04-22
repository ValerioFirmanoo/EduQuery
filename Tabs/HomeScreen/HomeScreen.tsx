import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native-web';
import axios from 'axios';
import { OPENAI_API_KEY } from 'react-native-dotenv';
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
    const [inputText, setInputText] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const handleInputChange = (text: string) => {
        setInputText(text);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const user_text = inputText;

    const prompt_questions = '"Divide the text in sections, for each section write some questions in order to guide the student that is reading in his understanding. Mask the answer and only provide the questions. It is important that you number the questions correclty, like question 2 of section 3 must be numbered as 3.2. The output must be an appropriate json formatting, handling the nesting of questions belonging to same sections. Here is an example:"{\n' +
        '  "sections": [\n' +
        '    {\n' +
        '      "title": "Central Limit Theorem Explained",\n' +
        '      "questions": [\n' +
        '        {\n' +
        '          "number": "1.1",\n' +
        '          "question": "What is the central limit theorem and how does it relate to sample sizes in statistics?"\n' +
        '        },\n' +
        '        {\n' +
        '          "number": "1.2",\n' +
        '          "question": "Why is the central limit theorem considered important in the field of statistics?"\n' +
        '        }\n' +
        '      ]\n' +
        '    },\n' +
        '    {\n' +
        '      "title": "Distribution of the Variable in the Population",\n' +
        '      "questions": [\n' +
        '        {\n' +
        '          "number": "2.1",\n' +
        '          "question": "What does it mean when the central limit theorem states \'regardless of the variable’s distribution in the population\'?"\n' +
        '        },\n' +
        '        {\n' +
        '          "number": "2.2",\n' +
        '          "question": "Why is finite variance necessary for the central limit theorem to apply?"\n' +
        '        },\n' +
        '        {\n' +
        '          "number": "2.3",\n' +
        '          "question": "What are some characteristics of \'independent, identically distributed variables\' mentioned in relation to the central limit theorem?"\n' +
        '        }\n' +
        '      ]\n' +
        '    },\n' +
        '    {\n' +
        '      "title": "Sampling Distribution of the Mean",\n' +
        '      "questions": [\n' +
        '        {\n' +
        '          "number": "3.1",\n' +
        '          "question": "What is meant by \'sampling distribution of the mean\'?"\n' +
        '        },\n' +
        '        {\n' +
        '          "number": "3.2",\n' +
        '          "question": "How does the shape of the sampling distribution change with different sample sizes?"\n' +
        '        }\n' +
        '      ]\n' +
        '    },\n' +
        '    {\n' +
        '      "title": "Central Limit Theorem and a Sufficiently Large Sample Size",\n' +
        '      "questions": [\n' +
        '        {\n' +
        '          "number": "4.1",\n' +
        '          "question": "What effect does a sufficiently large sample size have on the sampling distribution of the mean?"\n' +
        '        },\n' +
        '        {\n' +
        '          "number": "4.2",\n' +
        '          "question": "How does the original distribution of the population affect the required sample size for the central limit theorem to hold?"\n' +
        '        }\n' +
        '      ]\n' +
        '    },\n' +
        '    {\n' +
        '      "title": "Central Limit Theorem and Approximating the Normal Distribution",\n' +
        '      "questions": [\n' +
        '        {\n' +
        '          "number": "5.1",\n' +
        '          "question": "How does the central limit theorem link the population distribution to the sampling distribution?"\n' +
        '        },\n' +
        '        {\n' +
        '          "number": "5.2",\n' +
        '          "question": "Why is it significant that non-normal population distributions can result in normally distributed sampling distributions?"\n' +
        '        }\n' +
        '      ]\n' +
        '    },\n' +
        '    {\n' +
        '      "title": "Properties of the Central Limit Theorem",\n' +
        '      "questions": [\n' +
        '        {\n' +
        '          "number": "6.1",\n' +
        '          "question": "What parameters define a normal distribution according to the central limit theorem?"\n' +
        '        },\n' +
        '        {\n' +
        '          "number": "6.2",\n' +
        '          "question": "How does the standard deviation of the sampling distribution change as sample size increases?"\n' +
        '        }\n' +
        '      ]\n' +
        '    },\n' +
        '    {\n' +
        '      "title": "Empirical Demonstration of the Central Limit Theorem",\n' +
        '      "questions": [\n' +
        '        {\n' +
        '          "number": "7.1",\n' +
        '          "question": "What role does statistical simulation software play in demonstrating the central limit theorem empirically?"\n' +
        '        },\n' +
        '        {\n' +
        '          "number": "7.2",\n' +
        '          "question": "How do different sample sizes influence the shape of the sampling distribution in empirical tests of the central limit theorem?"\n' +
        '        },\n' +
        '        {\n' +
        '          "number": "7.3",\n' +
        '          "question": "What does the empirical testing reveal about the effect of population skewness on the sampling distributions?"\n' +
        '        }\n' +
        '      ]\n' +
        '    },\n' +
        '    {\n' +
        '      "title": "Why is the Central Limit Theorem Important?",\n' +
        '      "questions": [\n' +
        '        {\n' +
        '          "number": "8.1",\n' +
        '          "question": "Why does the normality assumption matter in statistics and how does the central limit theorem support this assumption?"\n' +
        '        },\n' +
        '        {\n' +
        '          "number": "8.2",\n' +
        '          "question": "How does increasing the sample size lead to more precise estimates of the population mean?"\n' +
        '        }\n' +
        '      ]\n' +
        '    }\n' +
        '  ]\n' +
        '}"'

    const handleProcess = async () => {
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'system', content: prompt_questions },
                        { role: 'user', content: user_text }],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    },
                }
            );

            const completion = response.data.choices[0].message.content;

            navigation.navigate('InferenceScreen', { completion, user_text });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Heading>Let's start with the topic!</Heading>
            <Divider my="$3"/>

            <TextInput
                style={{
                    height: 200,
                    borderColor: 'gray',
                    borderWidth: 1,
                    paddingHorizontal: 10,
                    borderRadius: 8,
                    width: '90%',
                    textAlignVertical: 'top',
                    textAlign: 'left',
                }}
                value={inputText}
                onChangeText={handleInputChange}
                placeholder="Insert text..."
                multiline
            />
            <Divider my="$3"/>

            {/*
            <Text>Select a file:</Text>

            <input type="file" onChange={handleFileUpload} />
            */}
            <Button
                size="md"
                variant="solid"
                action="primary"
                isDisabled={false}
                isFocusVisible={false}
                onPress={handleProcess}
            >
                <ButtonText>Process the text</ButtonText>
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
