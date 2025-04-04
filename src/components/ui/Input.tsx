import React from 'react';
import {View, TextInput, Text} from 'react-native';
import {twMerge} from 'tailwind-merge';

export interface InputProps {
  label?: string;
  name?: string;
  type: string;
  maxLength?: number;
  max?: number;
  className?: string;
  placeholder?: string;

  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
}

const UITextInput = ({type, placeholder, label, value, onChange, className, ...props}: InputProps) => {
  return (
    <View>
      {label && <Text style={{marginBottom: 5}}>{label}</Text>}
      <TextInput
        className={twMerge('border border-gray-300 p-2 px-3 text-sm text-gray-700 focus:outline-none  focus:ring-blue-500', className)}
        style={{borderRadius: 5}}
        placeholder={placeholder || ''}
        value={value}
        onChangeText={onChange ? text => onChange({target: {value: text}} as any) : undefined}
        {...props}
      />
    </View>
  );
};

export default UITextInput;
