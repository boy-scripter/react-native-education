import React from 'react';
import { View, Image, ImageResizeMode } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { twMerge } from 'tailwind-merge';

import Img, { ImgProps } from './Img';
import { ButtonProps } from './Button';
import { InputProps } from './Input';
import Button from './Button'; // assuming you have a Button component

type ImageInputProps = Pick<InputProps, 'onChange' | 'value' | 'className' | 'icon'> &
  Pick<ImgProps, 'fallbackUri'> &
  Pick<ButtonProps, 'textClassName' | 'label'> & {
    buttonClassName?: string;
    imageClassName?: string;
    resizeMode?: ImageResizeMode;
  };

const ImageInput: React.FC<ImageInputProps> = ({
  value,
  label,
  className,
  buttonClassName,
  textClassName,
  onChange,
  fallbackUri,
  icon,
  imageClassName,
  resizeMode = 'cover', // default resize mode
}) => {
  const handleOnPress = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });

    if (result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      if (uri && onChange) {
        onChange(uri);
      } 
    }
  };

  const finalImage = value || fallbackUri || '';

  return (
    <View className={twMerge('relative w-28 h-28', className)}>
      <Image
        source={{ uri: finalImage }}
        resizeMode={resizeMode}
        className={twMerge('w-full h-full bg-greyish-100/30 border-2 rounded-3xl border-theme', imageClassName)}
      />

      <View className="absolute inset-0 justify-center items-center bg-greyish-100/30 rounded-3xl">
        <Button
          className={buttonClassName}
          textClassName={textClassName}
          onPress={handleOnPress}
          icon={icon}
          label={label}
        />
      </View>
    </View>
  );
};

export default ImageInput;
