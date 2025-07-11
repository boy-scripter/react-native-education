import React, {useState} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {twMerge} from 'tailwind-merge';

export type ImgProps = {
  source: string | number ;
  fallbackUri?: string;
  className?: string;
  imageClassName?: string;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
  onPress?: () => void;
};

const Img: React.FC<ImgProps> = ({source, fallbackUri, className, imageClassName, onPress,resizeMode = 'cover'}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const isRemote = typeof source === 'string';
  const finalUri = error && fallbackUri ? fallbackUri : isRemote ? source : undefined;

  const imageSource = isRemote ? {uri: finalUri} : (source as number);

  return (
    <View onTouchEnd={onPress} className={twMerge('', className)}>
      {loading && <View className={twMerge('absolute inset-0 bg-gray-300 rounded')} />}
      <Image
      
        source={imageSource}
        resizeMode={resizeMode}
        onLoadEnd={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
        className={twMerge('w-full h-full', imageClassName)}
      />
    </View>
  );
};



export default Img;
