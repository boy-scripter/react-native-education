import {Svg, Circle, Path} from 'react-native-svg';

const CellularIcon = ({size = 24, color = '#10B981'}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M2 20h3V10H2v10zm5 0h3V4H7v16zm5 0h3v-8h-3v8zm5 0h3V8h-3v12z" fill={color} />
    </Svg>
  );
};
export {CellularIcon};
