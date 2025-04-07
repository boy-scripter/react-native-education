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

const Input = ({type, placeholder, label, value, onChange, className, ...props}: InputProps) => {
  return (
    <View>
      {label && <Text className='py-1 px-1 text-xs text-slate-600' >{label}</Text>}
      <TextInput
        className={twMerge('border border-greyish p-2 px-3 text-sm text-greyish-200 focus:border-theme', className)}
        style={{borderRadius: 5}}
        placeholder={placeholder || ''}
        value={value}
        onChangeText={onChange ? text => onChange({target: {value: text}} as any) : undefined}
        {...props}
      />
    </View>
  );
};

export default Input;
