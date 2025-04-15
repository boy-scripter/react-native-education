import React from 'react';
import Input from '@components/ui/Input';
import {View} from 'react-native';

interface SplitInputProps {
  count: number;
}

const SplitInput: React.FC<SplitInputProps> = ({count}) => {
  return (
    <View className="flex-row gap-2">
      {Array.from({length: count}).map((_, index) => (
        <Input key={index} type="text" maxLength={1} className="border border-gray-300 p-2 px-4 rounded text-center" />
      ))}
    </View>
  );
};

export default SplitInput;
