// FormInput.tsx
import React from 'react';
import {Controller, Control, FieldValues, Path} from 'react-hook-form';
import Input, {InputProps} from './Input';

type FormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  errorMessage?: string;
} & InputProps;

export const FormInput = <T extends FieldValues>({control, name, label, placeholder, keyboardType = 'default', secureTextEntry = false, errorMessage}: FormInputProps<T>) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({field: {onChange, value}}) => <Input label={label} placeholder={placeholder} keyboardType={keyboardType} secureTextEntry={secureTextEntry} value={value} onChangeText={onChange} />}
      />
      {errorMessage && <Input.TextError message={errorMessage} />}
    </>
  );
};
