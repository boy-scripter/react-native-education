import React from 'react';
import {View} from 'react-native';
import Button, {ButtonProps} from './Button';
import Img, {ImgProps} from './Img';
import {InputProps} from './Input';
import {twMerge} from 'tailwind-merge';
import {launchImageLibrary} from 'react-native-image-picker';


type ImageInputProps = Pick<InputProps, 'onChange' | 'value' | 'className' | 'icon'> &
  Pick<ImgProps, 'fallbackUri'> &
  Pick<ButtonProps, 'textClassName' | 'label'> & {
    buttonClassName: string;
  };

const ImageInput: React.FC<ImageInputProps> = ({value, label, className, buttonClassName, textClassName, onChange, fallbackUri, icon}) => {
 
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
    <View className="relative w-24 h-24">
      <Img source={finalImage} className={twMerge('w-full h-full border-2 border-theme rounded-full', className)} />
      <View className="absolute inset-0 justify-center items-center bg-black/30 rounded-full">
        <Button className={buttonClassName} textClassName={textClassName} onPress={handleOnPress} icon={icon} label={label} />
      </View>
    </View>
  );
};

export default ImageInput;
