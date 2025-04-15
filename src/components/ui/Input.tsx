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
  style: Record<any, string>;

  value?: string;
  onChange?: (text: string) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
}

const Input = ({type, placeholder, label, value, onChange, className, style, ...props}: InputProps) => {
  return (
    <View>
      {label && <Text className="py-1 px-1 mb-1 text-theme-900">{label}</Text>}
      <TextInput
        className={twMerge('border border-greyish p-3 text-greyish-200 focus:border-theme', className)}
        style={{borderRadius: 5, ...style}}
        placeholder={placeholder || ''}
        value={value}
        onChangeText={onChange ? text => onChange(text) : undefined}
        {...props}
      />
    </View>
  );
};

export default Input;
