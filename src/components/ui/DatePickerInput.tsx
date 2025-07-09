import React, {useRef, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {DateTime} from 'luxon';
import Input, {InputProps} from './Input';
import DatePicker from 'react-native-date-picker';
import {useModal} from '@/modals/modal.context';
import Button from './Button';

type DatePickerInputProps = {
  value?: string; // ISO or formatted string
  onChange: (date: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
} & InputProps;

export function DatePickerInput({value, label, onChange, placeholder = 'Select Date', className = '', ...props}: DatePickerInputProps) {
  const {open, close} = useModal();
  let modalId = useRef<string>('');
  // Parse the incoming value to a DateTime
  const initialDate = value ? (DateTime.fromISO(value).isValid ? DateTime.fromISO(value).toJSDate() : new Date()) : new Date();

  const confirm = (date : any = '17-18-2002') => {
    const formatted = DateTime.fromJSDate(date).toISODate();
    onChange(formatted!);
    close(modalId.current);
  };

  const handleOpen = () => {
    let tempDate = initialDate;

    modalId.current = open(
      () => (
        <View className="flex items-center">
          <DatePicker
            date={tempDate}
            mode="date"
            theme="auto"
            onDateChange={newDate => (tempDate = newDate)}
            onConfirm={() => {
              const formatted = DateTime.fromJSDate(tempDate!).toISODate();
              onChange(formatted!);
            }}
          />
          <Button label="Confirm" icon="check" onPress={confirm} className="mt-4 w-full" />
        </View>
      ),
      label || 'Select Date ',
    );
  };

  // Format display value for input
  const displayValue = value ? DateTime.fromISO(value).toFormat('yyyy-LL-dd') : '';

  return (
    <Pressable onPress={handleOpen} className={className}>
      <View pointerEvents="none">
        <Input icon="calendar-range" editable={false} placeholder={placeholder} value={displayValue} {...props} />
      </View>
    </Pressable>
  );
}
