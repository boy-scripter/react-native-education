import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

export type ImgProps = {
  source?: string | number; // supports remote (string) and local (number) images
  fallbackUri?: string; // optional fallback image (remote)
  className?: string; // outer container styling
  imageClassName?: string; // <Image> element styling
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center'; // how image is resized
  onPress?: () => void; // optional tap handler
};

// Check if the string is a valid remote image URL
const isValidUrl = (value: string): boolean => {
  return /^https?:\/\/.+\.(png|jpe?g|gif|bmp|webp|svg|tiff?)$/i.test(value);
};

const Img: React.FC<ImgProps> = ({
  source,
  fallbackUri,
  className,
  imageClassName,
  onPress,
  resizeMode = 'cover',
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const shouldUseFallback = error && fallbackUri;
  const finalSource = shouldUseFallback ? fallbackUri : source;

  // If finalSource is a valid URL string → wrap with { uri }, else pass directly
  const imageSource =
    typeof finalSource === 'string' && isValidUrl(finalSource)
      ? { uri: finalSource }
      : typeof finalSource === 'number'
      ? finalSource
      : undefined;

  return (
    <View onTouchEnd={onPress} className={twMerge('', className)}>
      {/* Skeleton loader while image is loading */}
      {loading && (
        <View className={twMerge('absolute inset-0 bg-gray-300 rounded')} />
      )}

      {/* Only render <Image> if a valid source is available */}
      {imageSource && (
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
      )}

      {/* Optional: show fallback UI if no imageSource at all */}
      {!imageSource && (
        <View className={twMerge('bg-gray-200 justify-center items-center', className)}>
          {/* Add a placeholder icon or text if you like */}
        </View>
      )}
    </View>
  );
};

export default Img;
