import {Pressable, Text, View} from 'react-native';

type RadioInputProps = {
  options: any[];
  value: string;
  onChange: (val: string) => void;
  renderItem?: (item: any, selected: boolean, onPress: () => void) => React.ReactNode;
};

const RadioInput = ({options, value, onChange, renderItem}: RadioInputProps) => {
  return (
    <View className="flex-row justify-between">
      {options.map((item, index) => {
        const isSelected = item.value === value;
        const onPress = () => onChange(item.value);

        if (renderItem) {
          return (
            <View key={item.value} className={index === 0 ? 'mr-2' : 'ml-2'}>
              {renderItem(item, isSelected, onPress)}
            </View>
          );
        }

        // Default rendering fallback
        return (
          <Pressable key={item.value} onPress={onPress} className={`flex-1 ${index === 0 ? 'mr-2' : 'ml-2'} rounded-xl items-center p-4 ${isSelected ? 'bg-theme' : 'bg-theme/70'}`}>
            <Text className="text-white font-semibold">{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};
