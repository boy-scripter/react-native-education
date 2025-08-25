import React from 'react';
import {View} from 'react-native';
import Tab from '@components/ui/TabToggle';

export interface TabItem {
  id: string;
  label: string;
}

interface TabToggleWrapperProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

const TabToggleWrapper: React.FC<TabToggleWrapperProps> = ({tabs, activeTab, onTabChange, className}) => {
  return (
    <View className={`px-4 mt-4 relative z-10 items-center ${className || ''}`}>
      <Tab  className=" backdrop-blur-lg bg-white/80 rounded-2xl " defaultTab={activeTab} onChange={onTabChange}>
        {tabs.map(tab => (
          <Tab.Button key={tab.id} id={tab.id} label={tab.label} />
        ))}
      </Tab>
    </View>
  );
};

export default TabToggleWrapper;
