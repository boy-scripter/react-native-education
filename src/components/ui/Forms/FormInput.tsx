// FormInput.tsx
import React from 'react';
import {Controller, Control, FieldValues, Path} from 'react-hook-form';
import Input, {InputProps} from './Input';

type FormInputProps<T extends FieldValues> = {
  
  control: Control<T>;
  name: Path<T>;
  errorMessage?: string;
} & InputProps;

export const FormInput = <T extends FieldValues>({control, name, label, placeholder, keyboardType = 'default' ,...rest}: FormInputProps<T>) => {

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({field: {onChange, value} , fieldState : {error }}) => (
          <>
           <Input label={label} placeholder={placeholder} keyboardType={keyboardType} value={value} onChangeText={onChange} {...rest}/>
           {error?.message && <Input.TextError message={error.message} />}
          </>
        )}
      />
    </>
  ); 
};
