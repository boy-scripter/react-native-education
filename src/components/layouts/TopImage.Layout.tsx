import {ReactNode} from 'react';
import {ImageBackground, View, Text} from 'react-native';
import { twMerge } from 'tailwind-merge';


interface TopImageLayoutProps {
  image: string;
  title: string;
  description: string;
  children: ReactNode;
  containerClassName?: string
}

const TopImageLayout = ({image, title, description, children , containerClassName}: TopImageLayoutProps) => {
  return (
    <View className="flex-1 bg-theme">
      <ImageBackground
        className="h-60 flex gap-3 justify-end py-5 px-5"
        source={{uri: image}} 
      >
        <Text className="font-interBold text-white text-3xl">{title}</Text>
        <Text className="text-white font-inter text-sm">{description}</Text>
      </ImageBackground>
      <View className={twMerge("flex-1 bg-white py-10 rounded-t-3xl overflow-hidden pt-5 p-3" , containerClassName)}>{children}</View>
    </View>
  );
};

export default TopImageLayout;
