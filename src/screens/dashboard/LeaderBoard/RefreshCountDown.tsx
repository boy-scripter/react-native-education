import React from 'react';
import CountdownTimer from '@/components/ui/CountDownTimer';
import {LoadingManager} from '@/components/LoadingManger';
import {useState, useCallback} from 'react';
import {useLazyRefreshLeaderBoardQuery} from '@/store/leaderboard/endpoint';
import {Text, View} from 'react-native';

function useLeaderCountdownFacade() {
  const [triggerRefresh] = useLazyRefreshLeaderBoardQuery();
  const [seconds, setSeconds] = useState<number | null>(null);

  const onIntialRender = useCallback(async () => {
    const res = await triggerRefresh().unwrap();
    const next = parseInt(res.refreshLeaderBoard.nextRefreshAt, 10);
    const now = Date.now();
    const remainingSeconds = Math.max(0, Math.floor((next - now) / 1000));
    setSeconds(remainingSeconds);
  }, [triggerRefresh]);

  return {
    seconds,
    onIntialRender,
  };
}

const RefreshCountdown: React.FC = () => {
  const {seconds, onIntialRender} = useLeaderCountdownFacade();
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <LoadingManager dependencies={[refreshKey]} asyncFunction={onIntialRender}>
      <View className="flex-row p-5 justify-center gap-2 items-center">
        {seconds ? (
          <>
            <Text className="text-xl font-black text-greyish-200">LeaderBoard Will Refresh In</Text>
            <CountdownTimer textClassName="font-black text-xl text-greyish-200" countdownDuration={seconds} autoStart={true} onComplete={() => setRefreshKey(refreshKey + 1)} />
          </>
        ) : (
          <Text className="text-xl font-black text-greyish-200">LeaderBoard Will Refresh In Sometime</Text>
        )}
      </View>
    </LoadingManager>
  );
};

export default RefreshCountdown;
