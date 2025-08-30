import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {SinglePlayerGameResult} from '../logic';
import {formatTime} from '@/util/format';
import {Answer, Question} from '@myTypes/quiz';
import { TimerIcon } from '@/components/Icons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Sheet({data}: {data: SinglePlayerGameResult}) {
  return (
    <>
      <StatsSummary correct={data.totalCorrect} incorrect={data.totalIncorrect} skipped={data.totalSkipped} time={data.totalTimeTaken} />
      <View className="flex-1">
        <FlatList
          data={data.questions}
          keyExtractor={(item, index) => item._id || index.toString()}
          renderItem={({item, index}) => <QuestionCard question={item} answer={data.answers[index]} index={index} />}
          contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 24}}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
}

// HELPERS
const AnswerSummary = ({userAnswer, correctAnswer, timeTaken, timeAvailable}: {userAnswer: string; correctAnswer: string; timeTaken: number; timeAvailable: number}) => (
  <View className="bg-gray-50 rounded-lg p-3 gap-1">
    <Text className="text-xs text-gray-600">Your Answer: {userAnswer}</Text>
    <Text className="text-xs text-gray-600">Correct Answer: {correctAnswer}</Text>
    <Text className="text-xs text-gray-600">
      Time: {formatTime(timeTaken)} / ({formatTime(timeAvailable)})
    </Text>
  </View>
);

const StatsSummary = ({correct, incorrect, skipped, time }: {correct: number; incorrect: number; skipped: number; time: number}) => (
  <View className="flex-row justify-around py-4 bg-white mb-4">
    <View className="items-center gap-1">
      <AntDesign name="checkcircle" size={20} color="#10B981" />
      <Text className="text-base font-semibold text-gray-900">{correct}</Text>
    </View>
    <View className="items-center gap-1">
      <AntDesign name="closecircle" size={20} color="#EF4444" />
      <Text className="text-base font-semibold text-gray-900">{incorrect}</Text>
    </View>
    <View className="items-center gap-1">
      <AntDesign name="minuscircle" size={20} color="#eeeb15" />
      <Text className="text-base font-semibold text-gray-900">{skipped}</Text>
    </View>
    <View className="items-center gap-1">
      <TimerIcon size={18} color="#3B82F6" />
      <Text className="text-base font-semibold text-gray-900">{formatTime(time)}</Text>
    </View>
  </View>
);

const OptionItem = ({option, optionIndex, isCorrect, isSelected}: {option: string; optionIndex: number; isCorrect: boolean; isSelected: boolean}) => (
  <View
    className={`flex-row items-center py-2 px-3 rounded-lg gap-3 ${isCorrect ? 'bg-green-50 border border-green-500' : isSelected && !isCorrect ? 'bg-red-50 border border-red-500' : 'bg-gray-100'}`}>
    <View className="w-6 h-6 rounded-full bg-white justify-center items-center">
      <Text className={`text-sm font-semibold ${isCorrect ? 'text-green-600' : isSelected && !isCorrect ? 'text-red-600' : 'text-gray-600'}`}>{String.fromCharCode(65 + optionIndex)}</Text>
    </View>
    <Text className={`flex-1 text-sm ${isCorrect ? 'text-green-900' : isSelected && !isCorrect ? 'text-red-900' : 'text-gray-700'}`}>{option}</Text>
    {isSelected && <AntDesign name="user" size={16} color={isCorrect ? '#10B981' : '#EF4444'} />}
    {isCorrect && <AntDesign name="check" size={16} color="#10B981" />}
  </View>
);

const StatusIcon = ({status, size = 24}: {status: string; size?: number}) => {
  switch (status) {
    case 'CORRECT':
      return <AntDesign name="checkcircle" size={size} color="#10B981" />;
    case 'INCORRECT':
      return <AntDesign name="closecircle" size={size} color="#EF4444" />;
    case 'SKIPPED':
      return <AntDesign name="minuscircle" size={size} color="#6B7280" />;
    default:
      return <AntDesign name="clock-circle" size={size} color="#6B7280" />;
  }
};

const QuestionCard = ({question, answer, index}: {question: Question; answer: Answer; index: number}) => {
  const selectedOptionIndex = answer.selectedOption ? parseInt(answer.selectedOption.split('_')[1])  : null;

  return (
    <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-base font-bold text-blue-600">Q{index + 1}</Text>
        <StatusIcon status={answer.status} />
      </View>

      {/* Question */}
      <Text className="text-base font-medium text-gray-900 mb-4 leading-6">{question.questionText}</Text>

      {/* Options */}
      <View className="gap-2 mb-4">
        {question.options.map((option, optionIndex) => (
          <OptionItem key={optionIndex} option={option} optionIndex={optionIndex} isCorrect={optionIndex === question.answer} isSelected={selectedOptionIndex === optionIndex} />
        ))}
      </View>

      {/* Summary */}
      <AnswerSummary
        userAnswer={selectedOptionIndex !== null ? `Option ${String.fromCharCode(65 + selectedOptionIndex)}` : 'Not Answered'}
        correctAnswer={String.fromCharCode(65 + (question.answer || 5))}
        timeTaken={answer.timeTaken}
        timeAvailable={answer.timeAvailable}
      />
    </View>
  );
};
