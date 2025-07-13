import React, {useState} from 'react';
import {View, TextInput, Text, TextInputProps, Pressable} from 'react-native';
import {twMerge} from 'tailwind-merge';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colorConstant from '@constant/color.constant';

export type InputProps = {
  icon?: string;
  label?: string;
  name?: string;
  className?: string;
  placeholder?: string;
  style?: Record<any, string>;
  value?: string;
  onChange?: (text: string) => any;
  secret?: boolean;
} & Pick<TextInputProps, 'keyboardType' | 'editable' | 'pointerEvents'>;

const Input = ({placeholder, label, className, style, secret, onChange, icon, ...props}: InputProps) => {
  const [hidden, setHidden] = useState(false);

  return (
    <View >
      {label && <Text className="py-1 px-1 text-theme">{label}</Text>}
      <View className="flex-row group ">
        {icon && (
          <View className="bg-greyish-100/20 border-[1.5px] border-greyish-100 border-r-0 px-2.5 items-center justify-center rounded-l-lg group-focus:border-theme">
            <Icon name={icon} className="" size={27} color={colorConstant.theme.DEFAULT} />
          </View>
        )}

        <TextInput
          className={twMerge('border-[1.5px] border-greyish-100 border-l-0 rounded-2xl rounded-l-none p-3 flex-1 placeholder:text-greyish-100 bg-white shadow-sm group-focus:border-theme', className)}
          style={[{borderRadius: 5}, style]}
          placeholder={placeholder || ''}
          onChangeText={onChange}
          caretHidden={false}
          secureTextEntry={secret && hidden}
          {...props}
        />
        {secret && (
          <Pressable onPress={() => setHidden(prev => !prev)} className="absolute right-3 top-0 bottom-0 justify-center">
            <Icon name={hidden ? 'eye' : 'eye-off'} size={24} color={colorConstant.greyish[100]} />
          </Pressable>
        )}
      </View>
    </View>
  );
};


export default Input;
