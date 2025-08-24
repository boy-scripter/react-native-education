import React, {useEffect, useState, Suspense} from 'react';
import {View, Text} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {DashboardStackParamList} from '@/types/navigation/dashboardstack/dashboardstack.interface';
import {GameRegistry} from '@/types/quiz';
import {JoyStickLoader} from '@/components/LoadingManger';
import {QuizSocketService} from '@/store/quiz/socket';

const Loader: React.FC<{message: string}> = ({message}) => (
  <View className="flex-1 justify-center items-center ">
    <JoyStickLoader message={message} />
  </View>
);

const QuizScreen: React.FC = () => {
  const route = useRoute<RouteProp<DashboardStackParamList, 'Quiz'>>();
  const {mode, category, ...anyOther} = route.params;

  const GameComponent = GameRegistry[mode].screen;

  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    const socketService = QuizSocketService.getInstance();

    // Define callbacks
    const onConnect = () => setSocketConnected(true);
    const onDisconnect = () => setSocketConnected(false);

    // Subscribe
    socketService.onConnect(onConnect);
    socketService.onDisconnect(onDisconnect);

    // If already connected
    if (socketService.isConnected()) {
      setSocketConnected(true);
    }

    return () => {
      socketService.getSocket().off('connect', onConnect);
      socketService.getSocket().off('disconnect', onDisconnect);
    };
  }, []);

  if (!socketConnected) {
    return <Loader message="Game Socket Initializing..." />;
  }

  return (
    <View className="flex-1 p-5 justify-start">
      <View className="flex-1 justify-center">
        <Suspense fallback={<Loader message="Loading Your Game..." />}>
          <GameComponent mode={mode} category={category} {...anyOther} />
        </Suspense>
      </View>
    </View>
  );
};

export default QuizScreen;
