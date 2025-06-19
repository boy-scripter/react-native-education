import {ActivityIndicator} from 'react-native';
import {ActivityIndicatorProps as Props} from 'react-native';
import colorConstant from '@constant/color.constant';

interface ActivityIndicatorProps extends Props {}

export default  function Loader({size = 'small'}: ActivityIndicatorProps) {
  return (
    <>
      <ActivityIndicator color={colorConstant.theme.DEFAULT} size={size}></ActivityIndicator>
    </>
  );
}
