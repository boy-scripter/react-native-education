import Tab from '@components/ui/TabToggle';
import React from 'react';
import {ImageBackground, View, Text, ScrollView} from 'react-native';

function LeaderBoardScreen() {
  const items = [
    {placeholder: '2', color: '#4ade80'}, // green-400
    {placeholder: '1', color: '#facc15', className: '-mt-6 scale-125'}, // yellow-400
    {placeholder: '3', color: '#fb923c'}, // orange-400
  ];

  return (
    <ScrollView className="bg-theme flex-1">
      <ImageBackground className="h-72" resizeMode="cover" source={require('@assets/images/oval.png')}>
        <Tab className="mt-8" defaultTab="daily">
          <Tab.Button label="Daily" id="daily"></Tab.Button>
          <Tab.Button label="Weekly" id="weekly"></Tab.Button>
          <Tab.Button label="Monthly" id="monthly"></Tab.Button>
        </Tab>
        <View className="flex-row gap-8 justify-center mx-5 mt-16">
          {items.map((item, index) => (
            <View key={index} className={`h-20 aspect-square relative ${item.className}`}>
              <View key={index} className={`rounded-full relative w-full h-full bg-white z-10 border-2 aspect-square items-center justify-center `} style={{borderColor: item.color}}>
                <Text className="px-2 text-sm bottom-0 absolute translate-y-1/2 rounded-full" style={{backgroundColor: item.color, paddingVertical: 1}}>
                  {item.placeholder}
                </Text>
              </View>
              <View style={{backgroundColor: item.color + '60'}} className="absolute   z-0 px-2 top-1/2 rounded-t-2xl border w-full scale-x-110 h-[180%] ">
                <Text style={{fontSize: 8}} className="mt-14 text-white  text-center">
                  shivam gupta
                </Text>
                <Text className="text-white text-xs text-center">150 </Text>
              </View>
            </View>
          ))}
        </View>
      </ImageBackground>
      <View style={{borderRadius: 25}} className="flex-1 pb-10 bg-white rounded-b-none">
        <View className="mt-4 flex gap-3 mx-4">
          {[1, 2, 3, 4, 5, 6 ,7].map((item, index) => (
            <View style={{elevation: 14, borderRadius: 10}} className="shadow-slate-300 bg-white p-1 px-5" key={index}>
              <View className="flex-row items-center justify-between">
                <View className='flex-row items-center gap-2'>
                  <Text className="text-theme text-base font-medium">{index + 1}</Text>
                  <View className="flex-row items-center">
                    <View className="w-12 h-12 rounded-full bg-gray-300 mr-4"></View>
                    <Text className="text-theme text-base font-semibold">User {index + 1}</Text>
                  </View>
                </View>
                <Text className="text-theme text-base font-medium">100 pts</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

export default LeaderBoardScreen;
