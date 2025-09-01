import {Svg, Circle, Path} from 'react-native-svg';

const WiFiIcon = ({size = 24, color = '#10B981'}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 20h.01M8.21 16.89a5 5 0 0 1 7.58 0M4.93 12.81a10 10 0 0 1 14.14 0M1.65 8.73a15 15 0 0 1 20.7 0" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx={12} cy={20} r={1} fill={color} />
    </Svg>
  );
};

export { WiFiIcon }