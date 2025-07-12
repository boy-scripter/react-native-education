import {Text, View} from 'react-native';
import {InputProps} from './Input';
import {twMerge} from 'tailwind-merge';
import Button from '../../Button';
import React from 'react';

type RadioInputProps = {
  options: Options[];
  value?: string;
  onChange?: (val: string) => void;
  renderItem?: (
    item: Options,
    selected: boolean,
  ) => React.FC<{
    onPress: () => void;
    className?: string;
  }>;
  className?: string;
  itemClassName?: string;
  activeClassName?: string;
} & InputProps;

interface Options {
  value: string;
  label?: string;
  icon?: string;
}

export default function RadioInput({options, value, onChange, renderItem, label, className, itemClassName, activeClassName = 'bg-theme'}: RadioInputProps) {
  return (
    <View className="w-full">
      {label && <Text className="text-theme  font-semibold text-lg mb-2">{label}</Text>}

      <View className={twMerge('flex-row w-full gap-2', className)}>
        {options.map((item, index) => {
          const isSelected = item.value === value;

          const handleOnPress = (e: any) => {
            if (typeof onChange === 'function') {
              onChange(item.value);
            }
          };

          if (typeof renderItem == 'function') {
            const ItemComponent = renderItem(item, isSelected);

            const additionalProps = {
              onPress: () => handleOnPress(item),
              className: isSelected ? activeClassName : undefined,
            };

            return <ItemComponent key={item.value} {...additionalProps}></ItemComponent>;
          }

          // Default rendering fallback
          return <Button label={item.label} icon={item.icon} className={twMerge(`px-4 bg-theme/70 ${isSelected && activeClassName}`, itemClassName)} key={item.value} onPress={handleOnPress}></Button>;
        })}
      </View>
    </View>
  );
}
