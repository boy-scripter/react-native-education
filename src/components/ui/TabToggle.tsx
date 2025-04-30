import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {Pressable, View, Text, GestureResponderEvent, findNodeHandle} from 'react-native';
import React, {useContext, createContext, useRef, useCallback, RefObject, useLayoutEffect, ElementRef, ComponentRef} from 'react';
import {twMerge} from 'tailwind-merge';

interface activateSliderTabProps {
  x: number;
  width: number;
  tab: string;
}

type TabContextType = {
  currentTab: string;
  activateSliderTab: (input: activateSliderTabProps) => void;
  containerRef: RefObject<View> | null;
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
  const sliderX = useSharedValue(0);
  const sliderWidth = useSharedValue(0);
  const containerRef = useRef<View>(null) as RefObject<View> | null;
  const currentTab = defaultTab;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: sliderX.value}],
      width: sliderWidth.value,
    };
  });

  const activateSliderTab = useCallback(({x, width, tab}: activateSliderTabProps) => {
    sliderX.set(withTiming(x, {duration: 200}));
    sliderWidth.set(withTiming(width, {duration: 200}));
    if (typeof onChange == 'function') onChange(tab);
  }, []);

  return (
    <TabContext.Provider value={{activateSliderTab, containerRef, currentTab}}>
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
  const ctx = useContext(TabContext);
  if (!ctx) throw new Error('TabButton must be used within a Tab component');

  const btnRef = useRef<ComponentRef<typeof Pressable>>(null);
  const {activateSliderTab, containerRef, currentTab} = ctx;
  if (!containerRef) throw new Error('Unable to move tab slider due to parent containerRef');

  function handlePress(e: GestureResponderEvent) {
    containerRef &&
      e.target.measureLayout(containerRef.current, (x, y, width, height) => {
        activateSliderTab({x, width, tab: id});
      });
  }

  useLayoutEffect(() => {
    if (id !== currentTab) return;
    btnRef.current?.measureLayout(containerRef.current, (x, y, width) => {
      activateSliderTab({x, width, tab: id});
    });
  }, []);

  return (
    <Pressable ref={btnRef} className="flex-1 text-center" onPress={handlePress}>
      <Text className={`${id ? 'opacity-100' : 'opacity-50'} p-2 px-4 text-center `}>{label}</Text>
    </Pressable>
  );
});
