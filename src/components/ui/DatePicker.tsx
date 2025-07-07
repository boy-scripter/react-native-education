import React from 'react';
import { Pressable, Text } from 'react-native';
import { format } from 'date-fns';
import { useModal } from './ModalProvider';
import DatePickerModal from './DatePickerModal';
import Input from './Input';

interface Props {
  value?: string; // formatted date string
  onChange: (date: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export  function DatePickerInput({
  value,
  onChange,
  placeholder = 'Select Date',
  className = '',
}: Props) {
  const { open, close } = useModal();

  const handleOpen = () => {
    const id = open((props) => (
      <DatePickerModal
        {...props}
        initialDate={value ? new Date(value) : undefined}
        onSelect={(date) => onChange(format(date, 'yyyy-MM-dd'))}
        onClose={() => close(id)}
      />
    ), 'Select Date');
  };

  return (
    <Pressable onPress={handleOpen} className={className}>
      <Input
        placeholder={placeholder}
        value={value}
        editable={false}
        pointerEvents="none"
      />
    </Pressable>
  );
}



interface Props {
  initialDate?: Date;
  onSelect: (date: Date) => void;
  onClose: () => void;
}

export  function DatePickerModal({ initialDate, onSelect, onClose }: Props) {
  const [date, setDate] = useState<Date>(initialDate || new Date());

  const handleConfirm = () => {
    onSelect(date);
    onClose();
  };

  return (
    <View className="p-4 gap-4">
      <DatePicker
        date={date}
        mode="date"
        onDateChange={setDate}
        androidVariant="nativeAndroid"
      />
      <Button title="Confirm" onPress={handleConfirm} />
    </View>
  );
}