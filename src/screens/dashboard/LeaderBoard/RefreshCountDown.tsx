import React from 'react';
import CountdownTimer from '@/components/ui/CountDownTimer';
import {LoadingManager} from '@/components/LoadingManger';
import {useState, useCallback} from 'react';
import {useLazyRefreshLeaderBoardQuery} from '@/store/leaderboard/endpoint';
import {Text, View} from 'react-native';

interface RefreshCountdownProps {
  onRefreshComplete?: () => void;
}

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

const RefreshCountdown: React.FC<RefreshCountdownProps> = ({onRefreshComplete}) => {
  const {seconds, onIntialRender} = useLeaderCountdownFacade();

  return (
    <LoadingManager asyncFunction={onIntialRender}>
      <View className="flex-row p-5 justify-center gap-2 items-center">
        <Text className=" text-xl font-black text-greyish-200 ">LeaderBoardWill Refresh In</Text>
        <CountdownTimer textClassName=" font-black text-xl text-greyish-200 " countdownDuration={seconds || 10 * 60} autoStart={true} onComplete={() => onRefreshComplete?.()} />
      </View>
    </LoadingManager>
  );
};

export default RefreshCountdown;
