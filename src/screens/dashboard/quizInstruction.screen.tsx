import React from 'react';
import {Text} from 'react-native';
import {navigate} from '@hooks/useNavigation.hook';
import Button from '@components/ui/Button';
import TopImageLayout from '@components/layouts/TopImage.Layout';

const QuizInstructionScreen = () => {
  return (
    <TopImageLayout
      containerClassName='p-5 pt-7'
      image={'@assets/images/quiz-instructions.png'} // Replace with the actual image path
      title="Quiz Instructions"
      description="Follow these instructions carefully before starting the quiz.">
      <Text className="text-greyish-100 mb-2">1. Read each question carefully.</Text>
      <Text className="text-greyish-100 mb-2">2. Select the best answer from the options provided.</Text>
      <Text className="text-greyish-100 mb-2">3. You can skip questions and return to them later.</Text>
      <Text className="text-greyish-100 mb-2">4. Submit your answers before the timer runs out.</Text>
      <Button label="Start Quiz" className="mt-4" onPress={() => navigate('quiz')} />
    </TopImageLayout>
  );
};

export default QuizInstructionScreen;
