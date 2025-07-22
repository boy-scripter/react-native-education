import React from 'react';
import {View, Image, ImageResizeMode} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {twMerge} from 'tailwind-merge';

import {ImgProps} from '../../Img';
import {ButtonProps} from '../../Button';
import {InputProps} from './Input';
import Button from '../../Button'; // assuming you have a Button component
import {File} from '@/util/zod';
import {ensurePermission} from '@/utils/permission';

type ImageInputProps = Pick<InputProps, 'value' | 'className' | 'icon'> &
  Pick<ImgProps, 'fallbackUri'> &
  Pick<ButtonProps, 'textClassName' | 'label'> & {
    buttonClassName?: string;
    imageClassName?: string;
    onChange?: (arg1: File) => any;
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
  imageClassName,
  icon = 'camera',
  resizeMode = 'cover', // default resize mode
}) => {
  const handleOnPress = async () => {
    await ensurePermission('image');
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });

    if (result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      if (asset.uri && asset.fileName && asset.type && asset.fileSize && onChange) {
        const file = new File({
          uri: asset.uri,
          name: asset.fileName,
          type: asset.type,
          size: asset.fileSize,
        });
        onChange(file);
      } else {
        throw new Error('Image selection failed: Missing one or more required asset parameters.');
      }
    }
  };

  const finalImage = value || fallbackUri || '';

  return (
    <View className={twMerge('relative w-28 h-28', className)}>
      <Image source={{uri: finalImage}} resizeMode={resizeMode} className={twMerge('w-full h-full bg-greyish-100/30 border-2 rounded-3xl border-theme', imageClassName)} />

      <View className="absolute inset-0 justify-center items-center bg-greyish/30 rounded-3xl">
        <Button loadingMode={false} className={twMerge('p-1 px-2 bg-theme/70', buttonClassName)} textClassName={textClassName} onPress={handleOnPress} icon={icon} iconSize={16} label={label} />
      </View>
    </View>
  );
};

export default ImageInput;
