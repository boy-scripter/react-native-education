import React, {useEffect, useState, Suspense, useCallback} from 'react';
import {View, Text} from 'react-native';
import {RouteProp, useFocusEffect, useRoute} from '@react-navigation/native';
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
  const {mode, categoryId, ...anyOther} = route.params;
  const [socketConnected, setSocketConnected] = useState(false);
  const GameComponent = GameRegistry[mode].screen;

  useEffect(() => {
    const socketService = QuizSocketService.getInstance();
    const socket = socketService.getSocket();

    const onConnect = () => setSocketConnected(true);
    const onDisconnect = () => setSocketConnected(false);

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      QuizSocketService.reset();
    };
  }, []);

  if (!socketConnected) {
    return <Loader message="Game Socket Initializing..." />;
  }

  return (
    <View className="flex-1 p-5 justify-start">
      <View className="flex-1 justify-center">
        <Suspense fallback={<Loader message="Loading Your Game..." />}>
          <GameComponent mode={mode} categoryId={categoryId} {...anyOther} />
        </Suspense>
      </View>
    </View>
  );
};

export default QuizScreen;
