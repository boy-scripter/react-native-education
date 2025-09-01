import React, {useEffect} from 'react';
import {View, FlatList, Text, Pressable, StyleSheet} from 'react-native';
import {MotiView} from 'moti';
import {useSharedValue} from 'react-native-reanimated';
import Loader from '@components/ui/Loader';
import {AnswerType} from '@myTypes/quiz';
import AnswerBox from './AnswerBox';

interface AnswerManagerProps {
  options: string[];
  onSubmitAnswer: (index: AnswerType) => void;
}

const AnswerManager: React.FC<AnswerManagerProps> = ({options, onSubmitAnswer}) => {
  const loaderProgress = useSharedValue(0); // loader active by default

  const handleSelect = (index: AnswerType) => {
    loaderProgress.value = 1; // show loader when an answer is selected
    onSubmitAnswer(index);
  };

  useEffect(() => {
    loaderProgress.value = 0;
  }, [options]);

  return (
    <View className="rounded-xl bg-white p-4 mt-4 pt-0">
      {/* Answers fade out when loader is shown */}
      <MotiView from={{opacity: 0, scale: 0.95}} animate={{opacity: loaderProgress.value ? 0 : 1, scale: loaderProgress.value ? 0.95 : 1}} transition={{type: 'timing', duration: 250}} >
      <FlatList
        data={options}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => <AnswerBox id={String(index) as AnswerType} label={item} onSelectId={handleSelect} />}
        contentContainerStyle={{gap: 16, width: '100%', marginTop: 20}}
      />
      </MotiView>

      {/* Loader fades in */}
      <MotiView
        from={{opacity: 0}}
        animate={{opacity: loaderProgress.value ? 1 : 0}}
        transition={{type: 'timing', duration: 250}}
        pointerEvents={loaderProgress.value ? 'none' : 'none'}
        style={[StyleSheet.absoluteFill, {justifyContent: 'center', alignItems: 'center'}]}>
        <Loader size={'large'} />
      </MotiView>
    </View>
  );
};

export default AnswerManager;
