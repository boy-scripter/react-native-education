import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {Pressable, View, Text, GestureResponderEvent, LayoutChangeEvent} from 'react-native';
import React, {useContext, createContext, useRef, useCallback, RefObject, useState, useEffect} from 'react';
import {twMerge} from 'tailwind-merge';

interface moveSliderValuesProps {
  x: number;
  width: number;
  tab: string;
}

type TabContextType = {
  currentTab: string;
  moveSliderValues: (input: moveSliderValuesProps) => void;
  containerRef: RefObject<View>;
};

type TabProps = {
  children: React.ReactNode;
  defaultTab: string;
  sliderClassName?: string;
  className?: string;
  onChange?: (tab: string) => void;
};

const TabContext = createContext<null | TabContextType>(null);

export default function Tab({children, defaultTab, sliderClassName, onChange, className}: TabProps) {
  console.log('re render tab ');

  const sliderX = useSharedValue(0);
  const sliderWidth = useSharedValue(0);
  const containerRef = useRef<View>(null) as RefObject<View>;
  const currentTab = defaultTab;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: sliderX.value}],
      width: sliderWidth.value,
    };
  });

  const moveSliderValues = useCallback(({x, width, tab}: moveSliderValuesProps) => {
    sliderX.set(withTiming(x, {duration: 200}));
    sliderWidth.set(withTiming(width, {duration: 200}));
    if (typeof onChange == 'function') onChange(tab);
  }, []);

  return (
    <TabContext.Provider value={{moveSliderValues, containerRef, currentTab}}>
      <View className={twMerge('p-1 bg-[#F5F6F9] w-4/5 mx-auto', className)} style={{borderRadius: 8}}>
        <View ref={containerRef} className={twMerge('relative overflow-hidden flex-row gap-2', sliderClassName)}>
          <Animated.View style={[{borderRadius: 6}, animatedStyle]} className="slider absolute bg-white h-full top-0 left-0"></Animated.View>
          {children}
        </View>
      </View>
    </TabContext.Provider>
  );
}

export interface TabButtonProps {
  label: string;
  id: string;
}

Tab.Button = React.memo(function ({label, id}: TabButtonProps) {
  console.log('re render tab btn');
  const ctx = useContext(TabContext);
  if (!ctx) throw new Error('TabButton must be used within a Tab component');

  const {moveSliderValues, containerRef} = ctx;

  function handlePress(e: GestureResponderEvent) {
    e.target.measureLayout(containerRef.current, (x, y, width, height) => {
      moveSliderValues({x, width, tab: id});
    });
  }

  return (
    <Pressable className="flex-1 text-center" onLayout={(e: LayoutChangeEvent) => moveSliderValues({x: e.nativeEvent.layout.x, width: e.nativeEvent.layout.width, tab: id})} onPress={handlePress}>
      <Text className={`${id ? 'opacity-100' : 'opacity-50'} p-2 px-4 text-center `}>{label}</Text>
    </Pressable>
  );
});
