import {ReactNode} from 'react';
import {ImageBackground, View, Text} from 'react-native';
import {twMerge} from 'tailwind-merge';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colorConstant from '@constant/color.constant';
import {goBack, canGoBack} from '@hooks/useNavigation.hook';

interface TopImageLayoutProps {
  image: string;
  title: string;
  children: ReactNode;
  description?: string;
  containerClassName?: string;
}

const TopImageLayout = ({image, title, description, children, containerClassName}: TopImageLayoutProps) => {
  return (
    <View className="flex-1 bg-theme">
      {canGoBack() && (
        <View onTouchEnd={() => goBack()} className="absolute z-10 top-5 left-5 rounded-full bg-white p-2">
          <Text>
            <Icon name="arrow-left" size={24} color={colorConstant.theme.DEFAULT} />
          </Text>
        </View>
      )}

      <ImageBackground className="h-60 flex gap-3 justify-end py-5 px-5" source={{uri: image}}>
        <Text className="font-interBold text-white text-3xl">{title}</Text>
        {description && <Text className="text-white font-inter text-sm">{description}</Text>}
      </ImageBackground>
      <View className={twMerge('flex-1 bg-white  rounded-t-3xl overflow-hidden px-5 pt-8', containerClassName)}>{children}</View>
    </View>
  );
};

export default TopImageLayout;
