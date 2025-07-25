import React, {useRef} from 'react';
import {View, TextInput, TextInputKeyPressEventData, NativeSyntheticEvent} from 'react-native';
import {twMerge} from 'tailwind-merge';

interface SplitInputProps {
  onSplitChange: (value: string) => void;
  count: number;
  className?: string;
  inputClassName?: string;
}

const SplitInput: React.FC<SplitInputProps> = ({count, className, inputClassName, onSplitChange}) => {
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const values = useRef<string[]>(Array(count).fill(''));

  const handleChange = (text: string, index: number) => {

    const chars = text.split('').slice(0,6);
    for (let i = 0; i < chars.length && index + i < count; i++) {
      values.current[index + i] = chars[i];
      const ref = inputRefs.current[index + i];
      ref?.setNativeProps({text: chars[i]});
    }

    onSplitChange(values.current.join(''));

    const nextIndex = index + chars.length;
    if (nextIndex < count) {
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (values.current[index]) {
        values.current[index] = '';
        onSplitChange(values.current.join(''));
        return;
      }
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <View className={twMerge('flex-row mb-2 gap-2', className)}>
      {Array.from({length: count}).map((_, index) => (
        <TextInput
          key={index}
          ref={ref => (inputRefs.current[index] = ref)}
          keyboardType="numeric"
          maxLength={count} // to support paste of multiple digits
          onChangeText={text => handleChange(text, index)}
          onKeyPress={e => handleKeyPress(e, index)}
          placeholder="-"
          style={{
            borderColor: '#e0e0e0',
            borderWidth: 1,
            paddingVertical: 8,
            paddingHorizontal: 16,
            width: 48,
            aspectRatio: 1,
            borderRadius: 6,
            textAlign: 'center',
            fontWeight: 'bold',
          }}
          className={twMerge(inputClassName)}
        />
      ))}
    </View>
  );
};

export default SplitInput;
