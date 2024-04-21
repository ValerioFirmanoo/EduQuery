import React, {useEffect, useState} from "react";
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

import axios from 'axios';
import {TextInput} from "react-native";

interface Props {
    user_text: string;
    question: string;
    answer: string;
    onInputChange: (text: string) => void;
    setShowModal: (value: boolean) => void;
    ref: React.RefObject<any>;
    onCompletionChange: (text: string) => void;
}

const Question = ({user_text, question, answer, onInputChange, setShowModal, ref, onCompletionChange}: Props): JSX.Element => {
    const [inputText, setInputText] = useState("");
    const [completion, setCompletion] = useState("");
    const [score, setScore] = useState(null);

    const handleInputChange = (text: string) => {
        setInputText(text);
        onInputChange(text);
    };

    const handleCompletionChange = (text: string) => {
        onCompletionChange(text);
    };

    useEffect(() => {
        handleCompletionChange(completion);
    }, [completion]);

    const system_prompt_feedback = 'You will have a text of study materials. You have this task To classify the answer of a student trying to learn this concepts, in two categories:\n' +
        '  Score between 0 and 100, in step of 1 depending on the correctdness and completeness of the answer.\n' +
        'Be accurate in your evaluation, since you are an expert teacher.I will give you some exammples:\n' +
        '\n' +
        '""What are the key parameters of a normal distirbution in the context of CLT?"\n' +
        '\n' +
        ' Answer 1:"Mean and Variance" : 60, correct but but not complete and no explanation.\n' +
        '\n' +
        '\n' +
        'Answer 2:"Mean": 30, it is partially incomplete, forgetting to mention variance, and it doesn\'t provide no explanation.\n' +
        '\n' +
        'Answer 3:"Sample Size": 5, Completely wrong but at least relevant and there is a minimal amount of effort.\n' +
        '\n' +
        'Answer 4:"Population of Italy": 0, Wrong and Irrelevant.\n' +
        '\n' +
        ' Answer 5:"I don\'t know": 0,,Extremely lazy.\n' +
        '\n' +
        ' Answer 6:"The key parameters of a normal distribution in the context of the Central Limit Theorem (CLT) are:\n' +
        '\n' +
        '- **Mean (μ)**: This is the average value of the data points in a distribution. In the context of CLT, the mean of the sampling distributions of the sample means will be equal to the mean of the population.\n' +
        '- **Standard Deviation (σ)**: This measures the amount of variation or dispersion from the mean. In the context of CLT, the standard deviation of the sampling distribution (known as the standard error) will be equal to the population standard deviation divided by the square root of the sample size ($$\\sigma/\\sqrt{n}$$).\n' +
        '\n' +
        'These parameters are crucial because, according to the CLT, no matter the shape of the underlying population distribution, the sampling distribution of the sample mean will tend to be normal or nearly normal, if the sample size is sufficiently large. " 100, Complete and correct\n' +
        '\n' +
        '\n' +
        '"Answer 7:"The key parameters are the mean and the standard deviation, where the mean of the sampling distribution equals the population mean and the standard deviation equals the population standard deviation divided by the square root of the sample size." 80, Correct, it could have provided more explanation.\n' +
        '\n' +
        '**Question:** "What is the significance of photosynthesis for the Earth\'s ecosystem?"\n' +
        '\n' +
        'Answer 1: "Photosynthesis produces oxygen." - 40. The answer is correct but very incomplete. It mentions only one product of photosynthesis without explaining its broader significance to Earth\'s ecosystem.\n' +
        '\n' +
        'Answer 2: "It involves plants." - 20. This statement is correct but extremely vague and lacks any specific details about the role or significance of photosynthesis.\n' +
        '\n' +
        'Answer 3: "Carbon dioxide conversion." - 35. The answer identifies a correct component of photosynthesis (the conversion of CO2) but fails to explain why this is significant for the Earth\'s ecosystem.\n' +
        '\n' +
        'Answer 4: "Photosynthesis helps plants grow." - 30. While true, this answer is incomplete as it only covers the benefit to plants and not the overall significance to Earth\'s ecosystem.\n' +
        '\n' +
        'Answer 5: "I have no idea." - 0. This response shows no attempt to answer the question.\n' +
        '\n' +
        'Answer 6: "Photosynthesis is crucial for the Earth\'s ecosystem because it is the primary process by which solar energy is captured to produce organic compounds and oxygen. Through photosynthesis, plants convert carbon dioxide and water into glucose and oxygen, using sunlight. This process not only supports the plant\'s growth and energy needs but also provides the base of the food chain and regulates atmospheric gases, crucial for sustaining life on Earth." - 100. This is a comprehensive and correct response, thoroughly explaining the process of photosynthesis and its significance to the Earth\'s ecosystem.\n' +
        '\n' +
        'Answer 7: "Photosynthesis converts sunlight into energy, creating oxygen and glucose." - 70. Correct, but lacks detail on how this process impacts the broader ecosystem beyond the immediate products. \n' +
        '**Original Question:** "How does the water cycle impact climate regulation on Earth?"\n' +
        '\n' +
        'Here\'s the reorganized evaluation with each score immediately following the corresponding answer:\n' +
        '\n' +
        '1. "The water cycle helps distribute heat across the globe through processes like evaporation and condensation. This is crucial for climate regulation but doesn\'t address all factors affecting climate."\n' +
        '   - **Score: 70** - Accurately identifies heat distribution via evaporation and condensation but lacks detail on other climate-regulating processes within the water cycle.\n' +
        '\n' +
        '2. "Water vapor, a major part of the water cycle, acts as a greenhouse gas that traps heat in the atmosphere. This contributes significantly to the Earth\'s climate system, though there are other important aspects not covered here."\n' +
        '   - **Score: 65** - Highlights water vapor\'s role as a greenhouse gas but misses integration with other climate-influencing elements.\n' +
        '\n' +
        '3. "The water cycle\'s influence on weather patterns is vital. By moving water from oceans to land, it affects precipitation and temperature, which are key elements of the climate system. However, the explanation lacks details on the interaction with other cycles like the carbon cycle."\n' +
        '   - **Score: 60** - Identifies the role in affecting weather patterns through moisture movement but lacks detail on synergy with other biogeochemical cycles.\n' +
        '\n' +
        '4. "Rainfall and snowfall, crucial components of the water cycle, affect soil moisture and groundwater levels. These factors are essential for climate regulation but the broader impacts on ocean currents and weather systems are not mentioned."\n' +
        '   - **Score: 55** - Recognizes the impact on soil moisture and groundwater levels but overlooks climate influencers like ocean currents and atmospheric conditions.\n' +
        '\n' +
        '5. "Evaporation cools the surface and increases atmospheric moisture, which is critical for cloud formation and precipitation. This cycle helps moderate temperatures but additional factors like human impact and solar radiation also play roles in climate regulation."\n' +
        '   - **Score: 65** - Discusses the cooling effect of evaporation and importance of atmospheric moisture but needs more depth on interactions with non-natural factors.\n' +
        '\n' +
        '6. "Through the process of transpiration, plants release water vapor into the air, which is part of the water cycle. This aspect helps maintain the climate balance but the overall explanation of how it integrates with global climate patterns could be expanded."\n' +
        '   - **Score: 50** - Identifies the role of transpiration but lacks a detailed discussion on its integration with the global climate system.\n' +
        '\n' +
        '7. "The water cycle is integral to climate regulation as it facilitates the global distribution of thermal energy and moisture levels through evaporation, condensation, and precipitation. These processes manage solar heat distribution, influencing weather patterns and climate zones. Furthermore, the water cycle contributes to the regulation of the Earth\'s temperature by facilitating cloud formation and ocean currents, both of which play critical roles in climate modulation."\n' +
        '   - **Score: 90** - Provides a comprehensive explanation of the water cycle\'s role in climate regulation, covering key processes and linking them to broader climate effects.\n' +
        '\n' +
        '8. "The water cycle impacts climate regulation by redistributing energy and moisture, essential for forming weather patterns and moderating global temperatures. Processes like evaporation and precipitation help to cool the Earth and influence various climatic conditions. This explanation, while comprehensive, could delve deeper into the effects of changing water cycles due to human activities."\n' +
        '   - **Score: 80** - Offers a solid overview but could be enhanced by addressing human-induced changes in the water cycle.\n' +
        '\n' +
        '9. "The water cycle involves a lot of water moving around, which probably affects the weather somehow." \n' +
        '   - **Score: 10** - Vague and lacks scientific detail, showing a misunderstanding of the topic.'

    const system_prompt_answer = 'You will have a text containing study material and a question about it. Provide a correct answer from the ground truth in the study material. Be concise and don\'t mention the text, (like saying:"The text says..." just provide the facts."'

    const handleFeedback = async () => {
        console.log('Richiesta di valutazione per la risposta:' + inputText + ' alla domanda:' + question);
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'system', content: system_prompt_feedback },
                        { role: 'user', content: 'Text provided by the user' + user_text + '\n' + 'Question provided to the user:' + question + '\n' + 'Answer by the user:' + inputText}],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer sk-proj-Mq1OD4U3rpPZAa1IsxdIT3BlbkFJ4TmKVm9XQDiotqz3eRUx`,
                    },
                }
            );

            const completion = response.data.choices[0].message.content;
            setCompletion(completion);
            setShowModal(true);

            const scoreRegex = /Score:\s*(\d+)/;
            const matchResult = completion.match(scoreRegex);

            if (matchResult && matchResult[1]) {
                const extractedScore = parseInt(matchResult[1], 10);
                setScore(extractedScore);
                console.log('Score:', extractedScore);
            }

            console.log('Completion:', completion);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAnswer = async () => {
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'system', content: system_prompt_answer },
                        { role: 'user', content: 'Text provided by the user' + user_text + '\n' + 'Question provided to the user:' + question + '\n' + 'Answer by the user:' + inputText}],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer sk-proj-Mq1OD4U3rpPZAa1IsxdIT3BlbkFJ4TmKVm9XQDiotqz3eRUx`,
                    },
                }
            );

            const completion = response.data.choices[0].message.content;
            setCompletion(completion);
            setShowModal(true);
            console.log('Completion:', completion);
        } catch (error) {
            console.error('Error:', error);
        }
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
                <TextInput
                    style={{
                        height: 40,
                        borderColor: 'gray',
                        borderWidth: 1,
                        paddingHorizontal: 10,
                        borderRadius: 8,
                    }}
                    value={inputText}
                    onChangeText={handleInputChange}
                    placeholder="Inserisci la tua risposta"
                />
                <HStack space="lg" justifyContent="space-between" height="100%">
                    <Text>{score !== null ? score : 'N/A'}100</Text>
                    <Button
                        size="md"
                        variant="solid"
                        action="secondary"
                        isDisabled={false}
                        isFocusVisible={false}
                        onPress={handleFeedback}
                        ref={ref}
                    >
                        <ButtonText>Valuta</ButtonText>
                    </Button>
                    <Button
                        size="md"
                        variant="solid"
                        action="primary"
                        isDisabled={false}
                        isFocusVisible={false}
                        onPress={handleAnswer}
                        ref={ref}
                    >
                        <ButtonText>Non la so</ButtonText>
                    </Button>
                </HStack>
            </VStack>
        </Card>
    );
};

export default Question;
