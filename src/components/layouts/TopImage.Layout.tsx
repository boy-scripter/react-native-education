import {ReactNode} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {twMerge} from 'tailwind-merge';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';
import colorConstant from '@constant/color.constant';
import {goBack, canGoBack} from '@hooks/useNavigation.hook';
import { logout } from '@/store/auth/auth.slice';

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
    <View className="flex-1 bg-theme">
      {canGoBack() && (
        <View onTouchEnd={goBack} className="absolute z-10 top-5 left-5 rounded-full bg-white p-2">
          <Text>
            <Icon name="arrow-left" size={24} color={colorConstant.theme.DEFAULT} />
          </Text>
        </View>
      )}

      {/* Render Lottie or Image based on which prop is passed */}
      {lottie && (
        <View className="h-60 justify-end py-5 px-5 relative overflow-hidden">
          <LottieView source={lottie} autoPlay loop resizeMode="contain" style={{ borderWidth: 1, position: 'absolute', width: '100%', height: '100%'}} />
          {title && <Text className="font-interBold text-white text-3xl z-10">{title}</Text>}
          {description && <Text className="text-white font-inter text-sm z-10">{description}</Text>}
        </View>
      )}

      {image && (
        <ImageBackground source={{uri: image}} className="h-60 justify-end py-5 px-5" resizeMode="cover">
          <Text className="font-interBold text-white text-3xl">{title}</Text>
          {description && <Text className="text-white font-inter text-sm">{description}</Text>}
        </ImageBackground>
      )}

      <View className={twMerge('flex-1 bg-white rounded-t-3xl overflow-hidden px-5 pt-8', containerClassName)}>{children}</View>
    </View>
  );
};

export default TopImageLayout;
