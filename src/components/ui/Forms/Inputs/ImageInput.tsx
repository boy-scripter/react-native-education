import React from 'react';
import {View, Image, ImageResizeMode} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {twMerge} from 'tailwind-merge';
import {ImgProps} from '../../Img';
import {ButtonProps} from '../../Button';
import {InputProps} from './Input';
import Button from '../../Button'; // assuming you have a Button component
import {ensurePermission} from '@/util/permission';
import {imageOverloading} from '@/util/imageHelper';
import {File} from '@/util/zod';

type ImageInputProps = Pick<InputProps, 'className' | 'icon'> &
  Pick<ImgProps, 'fallbackUri'> &
  Pick<ButtonProps, 'textClassName' | 'label'> & {
    buttonClassName?: string;
    imageClassName?: string;
    onChange?: (arg1: File) => any;
    resizeMode?: ImageResizeMode;
    value?: File | string | number;
    selectionLimit?: number;
    mediaCode: 'PROFILE_IMAGE';
  };

const ImageInput: React.FC<ImageInputProps> = ({
  value,
  label,
  mediaCode,
  className,
  buttonClassName,
  textClassName,
  onChange,
  imageClassName,
  fallbackUri,
  selectionLimit = 1,
  icon = 'camera',
  resizeMode = 'cover', // default resize mode
}) => {
  const handleOnPress = async () => {
    await ensurePermission('image');
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit,
    });

    if (result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      if (asset.uri && asset.fileName && asset.type && asset.fileSize && onChange) {
        const file = new File({
          uri: asset.uri,
          name: asset.fileName,
          type: asset.type,
          size: asset.fileSize,
          mediaCode: mediaCode,
        });
        onChange(file);
      } else {
        throw new Error('Image selection failed: Missing one or more required asset parameters.');
      }
    }
  };

  // If finalSource is a valid URL string → wrap with { uri }, else pass directly
  const finalImage = imageOverloading(value) || fallbackUri;

  return (
    <View className={twMerge('relative w-28 h-28', className)}>
      <Image source={finalImage} resizeMode={resizeMode} className={twMerge('w-full h-full bg-greyish-100/30 border-2 rounded-3xl border-theme', imageClassName)} />

      <View className="absolute inset-0 justify-center items-center bg-greyish/30 rounded-3xl">
        <Button loadingMode={false} className={twMerge('p-1 px-2 bg-theme/70', buttonClassName)} textClassName={textClassName} onPress={handleOnPress} icon={icon} iconSize={16} label={label} />
      </View>
    </View>
  );
};

export default ImageInput;
