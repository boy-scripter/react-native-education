import {View, Text, Pressable} from 'react-native';
import {match} from 'ts-pattern';
import Icon from 'react-native-vector-icons/AntDesign';
import {MotiView} from 'moti';
import colorConstant from '@/constant/color.constant';
import {AnswerType} from '@/graphql/generated';

interface AnswerBoxProps {
  id: AnswerType;
  label: string;
  status?: 'correct' | 'incorrect' | 'idle' | 'skipped';
  onSelectId?: (id: AnswerType) => void;
}

const AnswerBox: React.FC<AnswerBoxProps> = ({id, label, status = 'idle', onSelectId}) => {
  // Map status → styles
  const {iconName, textColor} = match(status)
    .with('correct', () => ({borderColor: '#22C55E', bgColor: '#22C55E', iconName: 'check', textColor: '#FFFFFF'}))
    .with('incorrect', () => ({borderColor: '#EF4444', bgColor: '#EF4444', iconName: 'close', textColor: '#FFFFFF'}))
    .with('skipped', () => ({borderColor: '#FACC15', bgColor: '#FACC15', iconName: 'minus', textColor: '#FFFFFF'}))
    .with('idle', () => ({borderColor: colorConstant.greyish[200], bgColor: '#FFFFFF', iconName: null, textColor: '#000000'}))
    .exhaustive();

  return (
    <MotiView from={{scale: 1}} transition={{type: 'timing', duration: 200}}>
      <Pressable className="p-4 pr-6 flex-row items-center justify-between border-2 rounded-xl" onPress={() => onSelectId?.(id)}>
        <Text className="font-interBold" style={{color: textColor}}>
          {label}
        </Text>

        {iconName && (
          <View
            className="border h-7 aspect-square rounded-full items-center justify-center"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderColor: 'rgba(255, 255, 255, 0.3)',
            }}>
            <Icon name={iconName} color="white" size={19} />
          </View>
        )}
      </Pressable>
    </MotiView>
  );
};

export default AnswerBox;
