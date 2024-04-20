import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native-web';
import axios from 'axios';

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

    const user_text = 'The second law of thermodynamics is a physical law based on universal empirical observation concerning heat and energy interconversions. A simple statement of the law is that heat always flows spontaneously from hotter to colder regions of matter (or \'downhill\' in terms of the temperature gradient). Another statement is: "Not all heat can be converted into work in a cyclic process."[1][2][3]\n' +
        '\n' +
        'The second law of thermodynamics establishes the concept of entropy as a physical property of a thermodynamic system. It predicts whether processes are forbidden despite obeying the requirement of conservation of energy as expressed in the first law of thermodynamics and provides necessary criteria for spontaneous processes. For example, the first law allows the process of a cup falling off a table and breaking on the floor, as well as allowing the reverse process of the cup fragments coming back together and \'jumping\' back onto the table, while the second law allows the former and denies the latter. The second law may be formulated by the observation that the entropy of isolated systems left to spontaneous evolution cannot decrease, as they always tend toward a state of thermodynamic equilibrium where the entropy is highest at the given internal energy.[4] An increase in the combined entropy of system and surroundings accounts for the irreversibility of natural processes, often referred to in the concept of the arrow of time.[5][6]\n' +
        '\n' +
        'Historically, the second law was an empirical finding that was accepted as an axiom of thermodynamic theory. Statistical mechanics provides a microscopic explanation of the law in terms of probability distributions of the states of large assemblies of atoms or molecules. The second law has been expressed in many ways. Its first formulation, which preceded the proper definition of entropy and was based on caloric theory, is Carnot\'s theorem, formulated by the French scientist Sadi Carnot, who in 1824 showed that the efficiency of conversion of heat to work in a heat engine has an upper limit.[7][8] The first rigorous definition of the second law based on the concept of entropy came from German scientist Rudolf Clausius in the 1850s and included his statement that heat can never pass from a colder to a warmer body without some other change, connected therewith, occurring at the same time.\n' +
        '\n' +
        'The second law of thermodynamics allows the definition of the concept of thermodynamic temperature, but this has been formally delegated to the zeroth law of thermodynamics.'

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
                        'Authorization': `Bearer sk-proj-Mq1OD4U3rpPZAa1IsxdIT3BlbkFJ4TmKVm9XQDiotqz3eRUx`,
                    },
                }
            );

            const completion = response.data.choices[0].message.content;

            navigation.navigate('InferenceScreen', { completion });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Let's start with the topic!</Text>

            <Textarea>
                <TextareaInput placeholder="Inserisci un testo"/>
            </Textarea>

            <Text>Select a file:</Text>

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
