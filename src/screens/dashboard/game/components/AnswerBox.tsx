import {View, Text, Pressable} from 'react-native';
import {match} from 'ts-pattern';
import Icon from 'react-native-vector-icons/AntDesign';
import colorConstant from '@/constant/color.constant';

interface AnswerBoxProps {
  id: string;
  label: string;
  status?: 'correct' | 'incorrect' | 'idle' | 'skipped';
  selectedId?: string;
  onSelect?: (id: string) => void;
}

const AnswerBox: React.FC<AnswerBoxProps> = ({id, label, selectedId, status = 'idle', onSelect}) => {
  const isSelected = selectedId === id;

  // Map status → styles
  const {borderColor, bgColor, iconName, textColor} = match(status)
    .with('correct', () => ({
      borderColor: '#22C55E',
      bgColor: '#22C55E',
      iconName: 'check',
      textColor: '#FFFFFF', // White text for green background
    }))
    .with('incorrect', () => ({
      borderColor: '#EF4444',
      bgColor: '#EF4444',
      iconName: 'close',
      textColor: '#FFFFFF', // White text for red background
    }))
    .with('skipped', () => ({
      borderColor: '#FACC15',
      bgColor: '#FACC15',
      iconName: 'minus',
      textColor: '#FFFFFF', // White text for yellow background
    }))
    .with('idle', () => ({
      borderColor: colorConstant.greyish[200],
      bgColor: '#FFFFFF',
      iconName: null,
      textColor: '#000000', // Black text for white background
    }))
    .exhaustive();

  // Selected overrides
  const finalBgColor = isSelected ? colorConstant.greyish[100] : bgColor;
  const finalBorderColor = isSelected ? colorConstant.greyish[100] : borderColor;
  const finalTextColor = isSelected ? '#FFFFFF' : textColor;

  return (
    <Pressable
      className="p-4 pr-6 flex-row items-center justify-between border-2 rounded-xl"
      onPress={() => onSelect?.(id)}
      style={{
        borderColor: finalBorderColor,
        backgroundColor: finalBgColor,
      }}>
      {/* Option Text */}
      <Text className="font-interBold" style={{color: finalTextColor}}>
        {label}
      </Text>

      {/* Status Icon inside circle */}
      {iconName && (
        <View
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderColor: 'rgba(255, 255, 255, 0.3)',
          }}
          className="border h-7 aspect-square rounded-full items-center justify-center">
          <Icon name={iconName} color="white" size={19} />
        </View>
      )}
    </Pressable>
  );
};

export default AnswerBox;
