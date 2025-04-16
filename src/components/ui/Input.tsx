import React from 'react';
import {View, TextInput, Text, NativeSyntheticEvent, TextInputKeyPressEventData} from 'react-native';
import {twMerge} from 'tailwind-merge';

export interface InputProps {
  label?: string;
  name?: string;
  maxLength?: number;
  max?: number;
  className?: string;
  placeholder?: string;
  style?: Record<any, string>;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'decimal-pad';

  ref?: React.Ref<TextInput>;
  value?: string;
  onChange?: (text: string) => void;
  onKeyPress?: (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
}

const Input = ({placeholder, label, className, style, onChange, ...props}: InputProps) => {
  return (
    <View>
      {label && <Text className="py-1 px-1 mb-1 text-theme">{label}</Text>}
      <TextInput
        className={twMerge('border border-greyish-100 p-3 placeholder:text-greyish-100 focus:border-theme', className)}
        style={{borderRadius: 5, ...style}}
        placeholder={placeholder || ''}
        onChangeText={onChange}
        caretHidden={false}
        {...props}
      />
    </View>
  );
};

export default Input;
