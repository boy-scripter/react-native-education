import React from 'react';
import {Text, Pressable} from 'react-native';
import {MotiView, MotiText} from 'moti';
import colorConstant from '@/constant/color.constant';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type CheckBoxProps = {
  value: boolean;
  onChecked?: (value: boolean) => void;
  label?: string;
};

const CheckBox: React.FC<CheckBoxProps> = ({value = false, onChecked, label}) => {
  return (
    <Pressable className="flex-row items-center" onPress={() => onChecked?.(!value)}>
      <MotiView
        className="p-1  text-2xl rounded-lg justify-center items-center mr-2"
        style={{borderWidth: 1}}
        from={{
          backgroundColor: 'white',
          borderColor: colorConstant.greyish[200],
        }}
        animate={{
          backgroundColor: value ? colorConstant.theme.DEFAULT : 'white',
          borderColor: value ? 'white' : colorConstant.greyish[200],
        }}
        transition={{
          type: 'timing',
          duration: 200,
        }}>
        <MotiText from={{opacity: 0}} animate={{opacity: value ? 1 : 0}} transition={{type: 'timing', duration: 150}} style={{fontSize: 8, color: 'white'}}>
           <Icon name="check" size={12} color="white" />
        </MotiText>
      </MotiView>

      {label && <Text>{label}</Text>}
    </Pressable>
  );
};

export default CheckBox;
