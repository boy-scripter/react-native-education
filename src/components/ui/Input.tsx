import React from 'react';
import {View, TextInput, Text} from 'react-native';

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
      {label && <Text style={{marginBottom: 5}}>{label}</Text>}
      <TextInput
        className={className}
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
