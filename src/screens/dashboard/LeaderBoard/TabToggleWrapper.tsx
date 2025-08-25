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
    <View className={`px-4 relative z-10 items-center ${className || ''}`}>
      <Tab className="bg-white/10 backdrop-blur-lg rounded-2xl p-1 flex-row" defaultTab={activeTab} onChange={onTabChange}>
        {tabs.map(tab => (
          <Tab.Button key={tab.id} id={tab.id} label={tab.label} />
        ))}
      </Tab>
    </View>
  );
};

export default TabToggleWrapper;
