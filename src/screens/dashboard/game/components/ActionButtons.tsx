import React from 'react';
import {View, Text} from 'react-native';
import Button from '@components/ui/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ButtonConfig {
  label: string;
  icon: string;
  action: () => void;
  color: string;
}

const ActionButtons: React.FC<{buttons: ButtonConfig[]}> = ({buttons}) => (
  <View className="w-full">
    <View className="mb-4">
      <Text className="text-center text-lg font-interBold text-gray-800 my-2">What's Next?</Text>
      <View className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mx-auto" />
    </View>

    {chunk(buttons, 2).map((pair, idx) => (
      <View key={idx} className="flex-row justify-between mb-3">
        {pair.map((btn, i) => (
          <View
            key={i}
            className="w-[48%]"
            style={{
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 3},
              shadowOpacity: 0.12,
              shadowRadius: 6,
            }}>
            <Button label={btn.label} onPress={btn.action} className={`${btn.color} border-[0]`}>
              <Icon name={btn.icon} size={18} color="white" />
            </Button>
          </View>
        ))}
      </View>
    ))}
  </View>
);

const chunk = (arr: any[], size: number) => arr.reduce((acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]), []);

export default ActionButtons;
