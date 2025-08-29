import {LoadingManager, SpinnerLoader} from '@/components/LoadingManger';
import {Header} from '@/components/ui/Header';
import {GameHistory, GameRegistry} from '@/types/quiz';
import {SafeAreaView, View, Text} from 'react-native';
import React, {Suspense, useState} from 'react';
import {useLazyGameHistoryByIdQuery} from '@/store/game-history/endpoint';
import {RouteProp, useRoute} from '@react-navigation/native';
import {DashboardStackParamList} from '@/types/navigation/dashboardstack/dashboardstack.interface';

export default function Sheet() {
  const [gameHistory, setGameHistory] = useState<null | GameHistory>(null);
  const [trigger] = useLazyGameHistoryByIdQuery();
  const route = useRoute<RouteProp<DashboardStackParamList, 'Sheet'>>();

  if (!route.params?.gameId) {
    return (
      <>
        <Header message="GameID Not Found"></Header>
      </>
    );
  }

  async function fetchGameHistory() {
    const data: any = await trigger({input: route.params.gameId}).unwrap();
    setGameHistory(data.gameHistoryById);
  }

  // Only render LoadingManager; it handles the loading state
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Header message="Answer Sheet" />
      <LoadingManager asyncFunction={fetchGameHistory}>
        {gameHistory &&
          (() => {
            const LazySheetComponent = GameRegistry[gameHistory.mode]?.sheet;
            if (!LazySheetComponent) return null;
            return (
              <>
                <View className="px-4 py-4 bg-white mb-2">
                  <Text className="text font-bold text-gray-900 mb-1">{gameHistory.categoryId.name}</Text>
                </View>
                <Suspense fallback={<SpinnerLoader />}>
                  <LazySheetComponent data={gameHistory} />
                </Suspense>
              </>
            );
          })()}
      </LoadingManager>
    </SafeAreaView>
  );
}
