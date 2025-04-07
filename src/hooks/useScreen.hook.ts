import {Dimensions} from 'react-native';

const useScreenDimensions = () => {
  // Get the screen dimensions
  const {width, height} = Dimensions.get('window');

  return {
    screenWidth: width,
    screenHeight: height,
  };
};

export default useScreenDimensions;
