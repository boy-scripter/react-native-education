import {imageOverloading} from '@/util/imageHelper';
import {File} from '@/util/zod';
import React, {useState} from 'react';
import {Image, View} from 'react-native';
import {twMerge} from 'tailwind-merge';

export type ImgProps = {
  source?: string | number | File; // supports remote (string) and local (number) images
  fallbackUri?: string; // optional fallback image (remote)
  className?: string; // outer container styling
  imageClassName?: string; // <Image> element styling
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center'; // how image is resized
  onPress?: () => void; // optional tap handler
};

const Img: React.FC<ImgProps> = ({source, fallbackUri, className, imageClassName, onPress, resizeMode = 'cover'}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const finalSource = imageOverloading(source) || fallbackUri;

  return (
    <View onTouchEnd={onPress} className={twMerge('', className)}>
      {/* Skeleton loader while image is loading */}
      {loading && <View className={twMerge('absolute inset-0 bg-gray-300 rounded')} />}

      {/* Only render <Image> if a valid source is available */}
      {finalSource && (
        <Image
          source={finalSource}
          resizeMode={resizeMode}
          onLoadEnd={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
          className={twMerge('w-full h-full', imageClassName)}
        />
      )}

      {/* Optional: show fallback UI if no imageSource at all */}
      {!finalSource && <View className={twMerge('bg-gray-200 justify-center items-center', className)}>{/* Add a placeholder icon or text if you like */}</View>}
    </View>
  );
};

export default Img;
