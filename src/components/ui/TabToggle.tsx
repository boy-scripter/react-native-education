// Tab.tsx
import React, {useContext, createContext, useRef, useCallback, RefObject, useLayoutEffect, useState, useEffect, ComponentRef, use} from 'react';
import {Pressable, View, Text, GestureResponderEvent} from 'react-native';
import {MotiView} from 'moti';
import {twMerge} from 'tailwind-merge';

interface ActivateSliderTabProps {
  x: number;
  width: number;
  tab: string;
}

type TabProps = {
  children: React.ReactNode;
  defaultTab: string;
  sliderClassName?: string;
  className?: string;
  onChange?: (tab: any) => void;
};

const TabContext = createContext<null | ReturnType<typeof useTabContextCreator>>(null);

export const useTabContextCreator = ({defaultTab, onChange}: {defaultTab: string; onChange?: (tab: string) => void}) => {
  const containerRef = useRef<View>(null);
  const [sliderPosition, setSliderPosition] = useState({x: 0, width: 0});
  const [currentTab, setCurrentTab] = useState(defaultTab);

  const activateSliderTab = useCallback(
    ({x, width, tab}: ActivateSliderTabProps) => {
      setSliderPosition({x, width});
      setCurrentTab(tab);
      if (typeof onChange === 'function') {
        onChange(tab);
      }
    },
    [onChange],
  );

  return {
    containerRef,
    sliderPosition,
    currentTab,
    activateSliderTab,
  };
};

export default function Tab({children, defaultTab, sliderClassName, onChange, className}: TabProps) {
  const {containerRef, sliderPosition, currentTab, activateSliderTab} = useTabContextCreator({defaultTab, onChange});
  return (
    <TabContext.Provider value={{activateSliderTab, containerRef, currentTab, sliderPosition}}>
      <View className={twMerge('p-1.5 bg-[#F5F6F9] w-4/5 mx-auto', className)} style={{borderRadius: 8}}>
        <View ref={containerRef} className={twMerge('relative overflow-hidden flex-row gap-2', sliderClassName)}>
          <MotiView
            animate={{translateX: sliderPosition.x, width: sliderPosition.width}}
            transition={{type: 'spring', damping: 15, stiffness: 200}}
            style={{borderRadius: 6}}
            className="slider absolute  bg-white h-full top-0 left-0"
          />
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

Tab.Button = React.memo(function TabButton({label, id}: TabButtonProps) {
  const ctx = useContext(TabContext);
  if (!ctx) throw new Error('TabButton must be used within a Tab component');

  const btnRef = useRef<ComponentRef<typeof Pressable>>(null);
  const {activateSliderTab, containerRef, currentTab} = ctx;
  const hasInitialized = useRef(false);

  const handlePress = (e: GestureResponderEvent) => {
    if (!containerRef?.current) return;

    btnRef.current?.measureLayout(
      containerRef.current,
      (x, y, width) => {
        activateSliderTab({x, width, tab: id});
      },
      () => {
        console.warn('Failed to measure layout for tab:', id);
      },
    );
  };

  const handleOnLayout = () => {
    if (hasInitialized.current) return;
    if (id !== currentTab) return;
    if (!containerRef?.current) return;

    btnRef.current?.measureLayout(
      containerRef.current,
      (x, y, width) => {
        activateSliderTab({x, width, tab: id});
        hasInitialized.current = true;
      },
      () => {
        console.warn('Failed to measure layout on mount for tab:', id);
      },
    );
  };

  const isActive = id === currentTab;

  return (
    <Pressable ref={btnRef} onLayout={handleOnLayout} onPress={handlePress} className="flex-1">
      <Text className={`${isActive ? 'opacity-100' : 'opacity-50'} p-2 px-4 text-center`}>{label}</Text>
    </Pressable>
  );
});
