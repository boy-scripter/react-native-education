// Form.tsx            9
import React from 'react';
import {Controller, Control, FieldValues, Path} from 'react-hook-form';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Props required for controlled input behavior:
type ControlledFieldProps = {
  value: any;
  onChange: (value: any) => void;
};

type FormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  errorMessage?: string;
};

export function withFormFieldWrapper<PWithoutControlled>(Component: React.ComponentType<PWithoutControlled & ControlledFieldProps>) {
  return function WrappedField<T extends FieldValues>({control, name, errorMessage, ...rest}: FormFieldProps<T> & PWithoutControlled) {
    return (
      <Controller
        control={control}
        name={name}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <>
            <Component {...(rest as PWithoutControlled)} value={value} onChange={onChange} />
            {error?.message && <TextError message={error.message} />}
          </>
        )}
      />
    );
  };
}

const TextError = ({message}: {message: string}) => {
  return (
    <View className="flex-row items-center">
      <Text className="text-red-600 text-sm">{message}</Text>
    </View>
  );
};
