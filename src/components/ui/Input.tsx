import React, {useState} from 'react';
import {View, TextInput, Text, TextInputProps, Pressable} from 'react-native';
import {twMerge} from 'tailwind-merge';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colorConstant from '@constant/color.constant';

export type InputProps = {
  label?: string;
  name?: string;
  className?: string;
  placeholder?: string;
  style?: Record<any, string>;
  value?: string;
  onChange?: (text: string) => any;
  secret?: boolean;
} & Pick<TextInputProps, 'keyboardType'>;

const Input = ({placeholder, label, className, style, secret, onChange, ...props}: InputProps) => {
  const [hidden, setHidden] = useState(false);

  return (
    <View>
      {label && <Text className="py-1 px-1 mb-1 text-theme">{label}</Text>}
      <View>
        <TextInput
          className={twMerge('border-2 border-greyish-100 p-3 placeholder:text-greyish-100 bg-white rounded-xl shadow-sm focus:border-theme', className)}
          style={[{borderRadius: 5}, style]}
          placeholder={placeholder || ''}
          onChangeText={onChange}
          caretHidden={false}
          secureTextEntry={secret && hidden}
          {...props}
        />
        {secret && (
          <Pressable onPress={() => setHidden(prev => !prev)} className="absolute right-3 top-0  bottom-0 justify-center">
            <Icon name={hidden ? 'eye' : 'eye-off'} size={24} color={colorConstant.greyish[100]} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

Input.TextError = ({message}: {message: string}) => {
  return (
    <View className="flex-row items-center">
      <Icon name="circle" size={8} color="red" style={{marginRight: 6}} />
      <Text className="text-red-600 text-sm">{message}</Text>
    </View>
  );
};

export default Input;
