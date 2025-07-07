import React, {useState} from 'react';
import {Pressable} from 'react-native';
import {DateTime} from 'luxon';
import Input from './Input';
import DatePicker from 'react-native-date-picker';
import {useModal} from '@/modals/modal.context';
import Button from './Button';

interface Props {
  value?: string; // ISO or formatted string
  onChange: (date: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export function DatePickerInput({value, label, onChange, placeholder = 'Select Date', className = ''}: Props) {
  const {open, close} = useModal();

  // Parse the incoming value to a DateTime
  const initialDate = value ? (DateTime.fromISO(value).isValid ? DateTime.fromISO(value).toJSDate() : new Date()) : new Date();

  const handleOpen = () => {
    let tempDate = initialDate;

    const modalId = open(
      () => (
        <>
          <DatePicker
            date={tempDate}
            mode="date"
            onDateChange={newDate => {
              tempDate = newDate;
            }}
            onConfirm={() => {
              const formatted = DateTime.fromJSDate(tempDate!).toISODate();
              onChange(formatted!);
              close(modalId);
            }}
            onCancel={() => close(modalId)}
          />
          <Button
            label="Confirm"
            icon="check"
            onPress={() => {
              const formatted = DateTime.fromJSDate(tempDate!).toISODate();
              onChange(formatted!);
              close(modalId);
            }}
            className="mt-4"
          />
        </>
      ),
      label || 'Select Date ',
    );
  };

  // Format display value for input
  const displayValue = value ? DateTime.fromISO(value).toFormat('yyyy-LL-dd') : '';

  return (
    <Pressable onPress={handleOpen} className={className}>
      <Input placeholder={placeholder} value={displayValue} editable={false} pointerEvents="none" />
    </Pressable>
  );
}
