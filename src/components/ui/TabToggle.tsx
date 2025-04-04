import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {Pressable, View, Text, GestureResponderEvent, LayoutChangeEvent} from 'react-native';
import {useContext, createContext, useRef, useCallback, RefObject, useState} from 'react';
import {twMerge} from 'tailwind-merge';

type TabContextType = {
  tab: string;
  setTab: (tab: string) => void;
  moveSliderValues: (input: {x: number; width: number}) => void;
  containerRef: RefObject<View>;
};

const TabContext = createContext<null | TabContextType>(null);

export default function Tab({children, defaultTab, className}: {children: React.ReactNode; defaultTab: string; className?: string}) {
  const sliderX = useSharedValue(0);
  const sliderWidth = useSharedValue(0);
  const [tab, setTab] = useState(defaultTab);
  const containerRef = useRef<View>(null) as RefObject<View>;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: sliderX.value}],
      width: sliderWidth.value,
    };
  });

  const moveSliderValues = useCallback(({x, width}: {x: number; width: number}) => {
    sliderX.set(withTiming(x, {duration: 200}));
    sliderWidth.set(withTiming(width, {duration: 200}));
  }, []);

  return (
    <TabContext.Provider value={{moveSliderValues, containerRef, setTab, tab}}>
      <View className={twMerge('p-1 bg-[#F5F6F9] w-4/5 mx-auto')} style={{borderRadius: 8}}>
        <View ref={containerRef} className="relative overflow-hidden flex-row gap-2">
          <Animated.View style={[{borderRadius: 6}, animatedStyle]} className="slider absolute bg-white h-full top-0 left-0"></Animated.View>
          {children}
        </View>
      </View>
    </TabContext.Provider>
  );
}

Tab.Button = function ({label, id, activeColor}: {label: string; id: string; activeColor?: string}) {
  const ctx = useContext(TabContext);
  if (!ctx) throw new Error('TabButton must be used within a Tab component');

  const {moveSliderValues, containerRef, setTab, tab} = ctx;

  function handlePress(e: GestureResponderEvent) {
    e.target.measureLayout(containerRef.current, (x, y, width, height) => {
      moveSliderValues({x, width});
      setTab(id);
    });
  }

  return (
    <Pressable
      className="flex-1 text-center"
      onLayout={(e: LayoutChangeEvent) => {
        e.target.measureLayout(containerRef.current, (x, y, width, height) => {
          moveSliderValues({x, width});
        });
      }}
      onPress={handlePress}>
      <Text className={`${id === tab ? 'opacity-100' : 'opacity-50'} p-2 px-4 text-center `}>{label}</Text>
    </Pressable>
  );
};
