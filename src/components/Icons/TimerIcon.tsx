import {Svg, Circle, Path} from 'react-native-svg';

const TimerIcon = ({size = 24, color = '#3b82f6'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="13" r="9" stroke={color} strokeWidth="2" />
    <Path d="M12 7v6l4 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M16.51 3.51l1.414 1.414" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export { TimerIcon}