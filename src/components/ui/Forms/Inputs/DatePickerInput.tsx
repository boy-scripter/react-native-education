import React from 'react';
import {Pressable, View} from 'react-native';
import {DateTime} from 'luxon';
import Input, {InputProps} from './Input';
import DatePicker from 'react-native-date-picker';
import Button from '@components/ui/Button';
import {ModalService} from '@/modals';

type DatePickerInputProps = {
  value?: string; // ISO or formatted string
  onChange?: (date: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
} & InputProps;

export default function DatePickerInput({value, label, onChange, placeholder = 'Select Date', className = '', ...props}: DatePickerInputProps) {
  let computedDate = value ? DateTime.fromISO(value).toJSDate() : DateTime.now().toJSDate();

  const handleOpen = () => {
    ModalService.show(
      () => (
        <View className="flex items-center">
          <DatePicker
            date={computedDate}
            mode="date"
            theme="auto"
            onDateChange={v => (computedDate = v)}
            onConfirm={() => {
              onChange?.(computedDate.toISOString());
            }}
          />
          <Button
            label="Confirm"
            icon="check"
            onPress={() => {
              onChange?.(computedDate.toISOString());
              ModalService.hide();
            }}
            className="mt-4 w-full"
          />
        </View>
      ),
      label || 'Select Date ',
    );
  };

  // Format display value for input
  const displayValue = value ? DateTime.fromISO(value).toFormat('yyyy-LL-dd') : undefined;

  return (
    <Pressable onPress={handleOpen} className={className}>
      <View pointerEvents="none">
        <Input icon="calendar-range" editable={false} placeholder={placeholder} value={displayValue} {...props} />
      </View>
    </Pressable>
  );
}
