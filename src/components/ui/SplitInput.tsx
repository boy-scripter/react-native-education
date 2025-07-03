import React, {useRef} from 'react';
import {View, TextInput} from 'react-native';
import {twMerge} from 'tailwind-merge';
import Input from './Input';

interface SplitInputProps {
  onSplitChange: (value: string) => void;
  count: number;
  className?: string;
  size?: string;
  inputClassName?: string;
}

const SplitInput: React.FC<SplitInputProps> = ({count, className, inputClassName, onSplitChange}) => {
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const values = useRef<string[]>(Array(count).fill(''));

  const handlePaste = () => {
    
  };

  const handleChange = (text: string, index: number) => {
    values.current[index] = text;
    onSplitChange(values.current.join(''));
    // Auto-focus next input if current has text
    if (text && index < count - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !values.current[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View className={twMerge('flex-row gap-2', className)}>
      {Array.from({length: count}).map((_, index) => (
        <Input
          key={index}
          ref={el => {
            inputRefs.current[index] = el;
          }}
          keyboardType="numeric"
          onChange={text => handleChange(text, index)}
          onKeyPress={e => handleKeyPress(e, index)}
          maxLength={1}
          max={9}
          placeholder="0"
          className={twMerge('border border-greyish-100 font-interBold p-2 px-4 w-12 aspect-square rounded text-center', inputClassName)}
        />
      ))}
    </View>
  );
};

export default SplitInput;
