import {View, Text, Pressable} from 'react-native';
import {match} from 'ts-pattern';
import Icon from 'react-native-vector-icons/AntDesign';
import {MotiView} from 'moti';
import colorConstant from '@/constant/color.constant';
import {AnswerType} from '@/types/quiz';

interface AnswerBoxProps {
  id: AnswerType;
  label: string;
  status?: 'correct' | 'incorrect' | 'idle' | 'skipped';
  onSelectId?: (id: AnswerType) => void;
}

const AnswerBox: React.FC<AnswerBoxProps> = ({id, label, status = 'idle', onSelectId}) => {
  // Map status → styles
  const {iconName, textColor, borderColor} = match(status)
    .with('correct', () => ({borderColor: '#22C55E', bgColor: '#22C55E', iconName: 'check', textColor: '#FFFFFF'}))
    .with('incorrect', () => ({borderColor: '#EF4444', bgColor: '#EF4444', iconName: 'close', textColor: '#FFFFFF'}))
    .with('skipped', () => ({borderColor: '#FACC15', bgColor: '#FACC15', iconName: 'minus', textColor: '#FFFFFF'}))
    .with('idle', () => ({borderColor: colorConstant.greyish[100], bgColor: '#FFFFFF', iconName: null, textColor: '#000000'}))
    .exhaustive();

  return (
<Pressable 
  onPress={() => onSelectId?.(id)} 
  style={({pressed}) => ({
    borderColor: pressed ? '#facc15' : borderColor, // Yellow border when pressed
    backgroundColor: pressed ? 'rgba(250, 204, 21, 0.1)' : 'transparent' // Light yellow bg when pressed
  })} 
  className="p-4 pr-6 flex-row items-center justify-between border-2 rounded-xl"
>
  {({pressed}) => (
    <>
      <Text 
        className="font-interBold" 
        style={{color: pressed ? '#facc15' : textColor}}
      >
        {label}
      </Text>
       
      {iconName && (
        <View
          className="border h-7 aspect-square rounded-full items-center justify-center"
          style={{
            backgroundColor: pressed 
              ? 'rgba(250, 204, 21, 0.3)' 
              : 'rgba(255, 255, 255, 0.2)',
            borderColor: pressed 
              ? 'rgba(250, 204, 21, 0.5)' 
              : 'rgba(255, 255, 255, 0.3)',
          }}>
          <Icon 
            name={iconName} 
            color={pressed ? '#facc15' : 'white'} 
            size={19} 
          />
        </View>
      )}
    </>
  )}
</Pressable>
  );
};

export default AnswerBox;
