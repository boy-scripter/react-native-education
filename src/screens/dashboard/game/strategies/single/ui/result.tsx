import {useSelector} from 'react-redux';
import {PerformanceCard, ScoreCircle} from '../../../components';
import {selectQuizResult, SinglePlayerGameResult} from '../logic';
import {useEffect} from 'react';
import {useGameStrategy} from '../../../hooks/useGameStrategy';
import {Share} from 'react-native'; // Add this import
import {View, TouchableOpacity, Text} from 'react-native'; // Add these imports
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Add this import
import {navigate} from '@/hooks';

export default function Result() {
  const strategy = useGameStrategy('SINGLE');
  const result = useSelector(selectQuizResult);

  useEffect(() => {
    return () => strategy.gameClean();
  }, []);

  const actionButtons = [
    {
      label: 'Share',
      icon: 'share-variant',
      action: () => Share.share({message: buildShareMessage(result)}),
      color: 'bg-blue-600',
    },
    {
      label: 'Check Sheet',
      icon: 'clipboard-check',
      action: () =>
        navigate('DashboardStack', {
          screen: 'Sheet',
          params: {gameId: result.gameId!},
        }),
      color: 'bg-green-600',
    },
  ];

  return (
    <>
      <PerformanceCard correct={result.correct} incorrect={result.incorrect} skipped={result.skipped} total={result.asked} timeUsed={result.totalTimeTaken} totalTime={result.totalAvailableTime} />
      <ScoreCircle className="py-10" score={result.totalPoints} />

      {/* Action Buttons */}
      <View style={{flexDirection: 'row', justifyContent: 'center', gap: 16, marginTop: 20}}>
        {actionButtons.map((button, index) => (
          <TouchableOpacity
            key={index}
            onPress={button.action}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: button.color === 'bg-blue-600' ? '#2563eb' : '#16a34a',
              paddingHorizontal: 20,
              paddingVertical: 12,
              borderRadius: 8,
              gap: 8,
            }}>
            <Icon name={button.icon} size={20} color="white" />
            <Text style={{color: 'white', fontWeight: '600'}}>{button.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}

const buildShareMessage = result => {
  return `
          🎉 I just completed a quiz! 🎉

          📊 My Performance:
          ✅ Correct: ${result.correct}
          ❌ Incorrect: ${result.incorrect}
          ⚪ Skipped: ${result.skipped}
          📝 Total Questions: ${result.asked}

          ⏱ Time Used: ${result.totalTimeTaken} sec / ${result.totalAvailableTime} sec
          ⭐ Score: ${result.totalPoints} points

          Think you can beat my score? 💪
          `;
};
