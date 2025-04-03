import React, {createContext, useContext, useEffect, useState} from 'react';
import {TouchableOpacity, View, Text, Pressable, GestureResponderEvent} from 'react-native';
import {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
// for state management
interface TabMode {
  x: number;
  width: number;
  id: string;
}

interface TabProviderType {
  mode: TabMode;
  setMode: React.Dispatch<React.SetStateAction<TabMode>>;
}

const initalState = {
  mode: {
    x: 0,
    width: 0,
    id: '',
  },
  setMode: () => {},
};
const TabContext = createContext<TabProviderType>(initalState);

const TabProvider = ({children}: {children: React.ReactNode}) => {
  const [mode, setMode] = useState(initalState['mode']);
  return <TabContext.Provider value={{mode, setMode}}>{children}</TabContext.Provider>;
};

const useTabProvider = () => {
  const context = useContext(TabContext);
  if (!context) throw new Error('useTabProvider must be used within a TabProvider');
  return context;
};
// for state management

export interface TabsProps {
  defaultMode: string;
  onChange?: Function;
  children: ReturnType<typeof Tabs.Button>[];
}

export function Tabs({children, defaultMode}: TabsProps) {
  const {setMode, mode} = useTabProvider();
  const sliderTranslate = useSharedValue(0);
  const sliderWidth = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: sliderTranslate.value}],
    width: sliderWidth.value,
  }));

  useEffect(() => {
    if (defaultMode) {
      // setMode(prev => ({...prev, id: defaultMode}));
    }
  }, []);

  useEffect(() => {
    sliderWidth.set(mode.width);
    sliderTranslate.set(mode.x);
  }, [mode]);

  return (
    <TabProvider>
      <View className="p-2 relative flex-row gap-2 bg-slate-400">
        <Animated.View style={[animatedStyle]} className="slider absolute bg-red-500 w-full h-full top-0 left-0"></Animated.View>
        {children}
      </View>
    </TabProvider>
  );
}

export interface TabsButtonProps {
  id: string;
  label: string;
}

Tabs.Button = function ({id, label}: TabsButtonProps) {
  const {setMode} = useTabProvider();

  function handlePress(e: GestureResponderEvent) {
    e.target.measureInWindow((x, width) => {
      setMode({id, width, x});
    });
  }

  return (
    <Pressable onPress={handlePress}>
      <Text>{label}</Text>
    </Pressable>
  );
};
