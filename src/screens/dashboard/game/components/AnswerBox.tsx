import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {match} from 'ts-pattern';
import Icon from 'react-native-vector-icons/AntDesign';
import colorConstant from '@/constant/color.constant';
import {AnswerType} from '@/types/quiz';
import {MotiPressable} from 'moti/interactions';

interface AnswerBoxProps {
  id: AnswerType;
  label: string;
  status?: 'correct' | 'incorrect' | 'idle' | 'skipped';
  onSelectId?: (id: AnswerType) => void;
}

const AnswerBox: React.FC<AnswerBoxProps> = ({id, label, status = 'idle', onSelectId}) => {
  const {iconName, textColor, borderColor, bgColor, shadowColor} = match(status)
    .with('correct', () => ({borderColor: '#22C55E', bgColor: '#22C55E', shadowColor: '#22C55E40', iconName: 'check', textColor: '#FFFFFF'}))
    .with('incorrect', () => ({borderColor: '#EF4444', bgColor: '#EF4444', shadowColor: '#EF444440', iconName: 'close', textColor: '#FFFFFF'}))
    .with('skipped', () => ({borderColor: '#FACC15', bgColor: '#FACC15', shadowColor: '#FACC1540', iconName: 'minus', textColor: '#FFFFFF'}))
    .with('idle', () => ({borderColor: colorConstant.greyish[100], bgColor: '#FFFFFF', shadowColor: '#00000010', iconName: null, textColor: '#000000'}))
    .exhaustive();

  return (
    <MotiPressable
      onPress={() => onSelectId?.(id)}
      style={{
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderWidth: 2,
        borderColor,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: bgColor,
        shadowColor,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
      }}
      animate={({pressed}) => {
        'worklet';
        return {
          scale: pressed ? 0.92 : 1, // shrink on press
        };
      }}
      transition={{
        type: 'spring',
        damping: 15,
        stiffness: 200,
      }}>
      {/* Left side: Option circle + label */}
      <View className="flex-row items-center gap-3">
        <View
          className="w-8 h-8 rounded-full items-center justify-center"
          style={{
            backgroundColor: status === 'idle' ? '#f3f4f6' : 'rgba(255, 255, 255, 0.2)',
            borderWidth: 1,
            borderColor: status === 'idle' ? '#d1d5db' : 'rgba(255, 255, 255, 0.3)',
          }}
        />

        <Text className="font-interBold flex-1" style={{color: textColor}}>
          {label}
        </Text>
      </View>

      {/* Right side: animated status icon */}
      {iconName && (
        <View
          className="border h-8 w-8 rounded-full items-center justify-center"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
            borderColor: 'rgba(255, 255, 255, 0.4)',
          }}>
          <Icon name={iconName} color="white" size={18} />
        </View>
      )}
    </MotiPressable>
  );
};

export default AnswerBox;
