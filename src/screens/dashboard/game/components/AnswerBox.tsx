import {View, Text} from 'react-native';
import {match} from 'ts-pattern';
import Icon from 'react-native-vector-icons/AntDesign';
import colorConstant from '@/constant/color.constant';
import {AnswerType} from '@/types/quiz';
import {MotiPressable} from 'moti/interactions';
import {useMemo} from 'react';

interface AnswerBoxProps {
  id: AnswerType;
  label: string;
  status?: 'correct' | 'incorrect' | 'idle' | 'skipped';
  onSelectId?: (id: AnswerType) => void;
}

const AnswerBox: React.FC<AnswerBoxProps> = ({id, label, status = 'idle', onSelectId}) => {
  const {iconName, textColor, borderColor, bgColor} = match(status)
    .with('correct', () => ({
      borderColor: '#22C55E',
      bgColor: '#22C55E',
      iconName: 'check',
      textColor: '#FFFFFF',
    }))
    .with('incorrect', () => ({
      borderColor: '#EF4444',
      bgColor: '#EF4444',
      iconName: 'close',
      textColor: '#FFFFFF',
    }))
    .with('skipped', () => ({
      borderColor: '#FACC15',
      bgColor: '#FACC15',
      iconName: 'minus',
      textColor: '#FFFFFF',
    }))
    .with('idle', () => ({
      borderColor: colorConstant.greyish[100],
      bgColor: '#FFFFFF',
      iconName: null,
      textColor: '#000000',
    }))
    .exhaustive();

  return (
    <MotiPressable
      onPress={() => onSelectId?.(id)}
      style={{
        padding: 16,
        paddingRight: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderRadius: 12,
        borderColor,
        backgroundColor: bgColor,
      }}
      transition={useMemo(
        () =>
          ({hovered, pressed}) => {
            'worklet';
            return {
              delay: hovered || pressed ? 0 : 5,
            };
          },
        [],
      )}
      animate={useMemo(
        () =>
          ({hovered, pressed}) => {
            'worklet';
            return {
              opacity: hovered || pressed ? 0.5 : 1,
              scale: hovered || pressed ? 0.95 : 1,
              borderColor: hovered || pressed ? colorConstant.theme.DEFAULT : borderColor,
              backgroundColor: hovered || pressed ? `${colorConstant.theme.DEFAULT}2d` : bgColor,
            };
          },
        [],
      )}>
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
    </MotiPressable>
  );
};

export default AnswerBox