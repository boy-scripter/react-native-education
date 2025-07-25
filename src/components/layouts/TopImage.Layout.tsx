import {ReactNode} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {twMerge} from 'tailwind-merge';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';
import colorConstant from '@constant/color.constant';
import {goBack, canGoBack} from '@hooks/useNavigation.hook';

interface TopImageLayoutProps {
  image?: string; // For image background
  lottie?: any; // For lottie animation (e.g., require('./file.json'))
  title?: string;
  description?: string;
  children: ReactNode;
  containerClassName?: string;
}

const TopImageLayout = ({image, lottie, title, description, children, containerClassName}: TopImageLayoutProps) => {
  return (
    <View className="flex-1 border py-2 bg-theme">
      {canGoBack() && (
        <View onTouchEnd={goBack} className="absolute z-10 top-5 left-5 rounded-full bg-white p-2">
          <Text>
            <Icon name="arrow-left" size={24} color={colorConstant.theme.DEFAULT} />
          </Text>
        </View>
      )}

      {/* Render Lottie or Image based on which prop is passed */}
      {lottie && (
        <View className="h-56 px-5 justify-end  overflow-hidden">
          <LottieView source={lottie} autoPlay loop resizeMode="contain" style={{width: '100%', height: '100%'}} />
        </View>
      )}

      {title && <Text className="font-interBold px-5 text-white text-2xl py-2 z-10">{title}</Text>}

      {image && <ImageBackground source={{uri: image}} className="h-48 justify-end py-5 px-5" resizeMode="cover"></ImageBackground>}

      <View className={twMerge('flex-1 bg-white rounded-t-3xl overflow-hidden px-5 ', containerClassName)}>
        {description && <Text className=" text-theme font-interBold text-base py-3 z-10">{description}</Text>}
        {children}
      </View>
    </View>
  );
};

export default TopImageLayout;
