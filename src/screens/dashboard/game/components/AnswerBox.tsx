import {View, Text} from 'react-native';
import {match} from 'ts-pattern';
import Icon from 'react-native-vector-icons/AntDesign';
import colorConstant from '@/constant/color.constant';

// Utility to calculate text color based on background
const getContrastTextColor = (bgColor: string) => {
  // Convert hex to RGB
  const hex = bgColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#FFFFFF'; // light bg → black text, dark bg → white text
};

interface AnswerBoxProps {
  id: string; // Unique identifier for the option
  label: string; // Display text for the option
  status?: 'correct' | 'incorrect' | 'idle' | 'skipped'; // Optional, defaults to 'idle'
  selectedId?: string; // Currently selected option id
  onSelect?: (id: string) => void; // Callback when the option is selected
}

const AnswerBox: React.FC<AnswerBoxProps> = ({id, label, selectedId, status = 'idle', onSelect}) => {
  const isSelected = selectedId === id;

  // ts-pattern maps status → border color, background color, icon
  const {borderColor, bgColor, iconName} = match(status)
    .with('correct', () => ({borderColor: '#22C55E', bgColor: '#22C55E', iconName: 'check'}))
    .with('incorrect', () => ({borderColor: '#EF4444', bgColor: '#EF4444', iconName: 'close'}))
    .with('skipped', () => ({borderColor: '#FACC15', bgColor: '#FACC15', iconName: 'minus'}))
    .with('idle', () => ({borderColor: colorConstant.greyish[100], bgColor: '#FFFFFF', iconName: null}))
    .exhaustive();

  const textColor = isSelected ? getContrastTextColor(bgColor) : '#00000005';

  return (
    <View style={{borderColor, backgroundColor: bgColor}} className="p-3 pr-6 flex-row items-center justify-between border-2 rounded-xl">
      {/* Option Text */}
      <Text className="font-interBold" style={{color: textColor}} onPress={() => onSelect && onSelect(id)}>
        {label}
      </Text>

      {/* Status Icon */}
      <View style={{borderColor, backgroundColor: bgColor}} className="border h-7 aspect-square rounded-full items-center justify-center overflow-hidden">
        {iconName && <Icon name={iconName} color="white" size={19} />}
      </View>
    </View>
  );
};

export default AnswerBox;
