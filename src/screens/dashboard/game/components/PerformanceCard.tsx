import {formatTime} from '@/util/format';
import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  correct: number;
  incorrect: number;
  skipped: number;
  total: number;
  timeUsed: string | number;
  totalTime: string | number;
}

const PerformanceCard: React.FC<Props> = ({correct, incorrect, skipped, total, timeUsed, totalTime}) => (
  <View className="w-full bg-white rounded-3xl p-6 mb-8 border border-gray-100">
    <View className="mb-4">
      <Text className="text-center text-lg font-interBold text-gray-800 mb-1">Performance Overview</Text>
      <View className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mx-auto" />
    </View>

    {/* Cards Grid */}
    <View className="flex-row flex-wrap justify-between">
      <StatCard icon="check-circle" label="Correct" value={correct} color="#22c55e" bg="bg-green-50" border="border-green-100" />
      <StatCard icon="close-circle" label="Incorrect" value={incorrect} color="#ef4444" bg="bg-red-50" border="border-red-100" />
      <StatCard icon="minus-circle" label="Skipped" value={skipped} color="#f59e0b" bg="bg-amber-50" border="border-amber-100" />
      <StatCard icon="format-list-numbered" label="Total" value={total} color="#6366f1" bg="bg-indigo-50" border="border-indigo-100" />
      <StatCard icon="clock-outline" label="Time Used" value={formatTime(timeUsed)} color="#8b5cf6" bg="bg-purple-50" border="border-purple-100" />
      <StatCard icon="clock" label="Total Time" value={formatTime(totalTime)} color="#ec4899" bg="bg-pink-50" border="border-pink-100" />
    </View>
  </View>
);

const StatCard = ({icon, label, value, color, bg, border}: any) => (
  <View
    style={{
      shadowColor: color,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
    }}
    className={`w-[32%] items-center py-4 ${bg} rounded-xl border ${border} mt-3`}>
    <View className={`w-8 h-8 rounded-full items-center justify-center mb-2`} style={{backgroundColor: `${color}22`}}>
      <Icon name={icon} size={18} color={color} />
    </View>
    <Text className="text-gray-600 font-interMedium mb-1 text-xs">{label}</Text>
    <Text className="text-xl font-interBold" style={{color}}>
      {value}
    </Text>
  </View>
);

export default PerformanceCard;
