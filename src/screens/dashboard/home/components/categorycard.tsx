import {Text, View} from 'react-native';
import Img from '@/components/ui/Img';
import Button from '@/components/ui/Button';
import {navigate} from '@/hooks/useNavigation.hook';
import {useModal} from '@/modals/modal.context';

interface QuizCardProps {
  _id: string;
  name: string;
  image: string;
  questionCount: number;
  color: string;
}

export function CategoryCardComponent({image, _id, name, color, questionCount}: QuizCardProps) {
  const {open} = useModal();
  const overlayColor = color + '80'; // appending '80' for ~50% opacity in hex

  function handleOnPlay() {
    const id = open(() => <QuizInstuctionModel modalId={id}></QuizInstuctionModel>, 'Read Instuction Carefully');
  }

  return (
    <View style={{elevation: 14}} className="flex-row w-full h-40 p-2 rounded-2xl overflow-hidden bg-white shadow-xl">
      {/* Left: Image with overlay */}
      <View className="w-2/5 h-full relative rounded-xl overflow-hidden ">
        <Img className="py-2" source={image} resizeMode="contain" />
        <View style={{backgroundColor: overlayColor}} className="absolute rounded-xl inset-0" />
        <View className="absolute top-3 left-3 bg-white/90 rounded-full px-3 py-1 shadow">
          <Text className="text-gray-800 text-xs font-interBold">Quiz</Text>
        </View>
      </View>

      {/* Right: Content */}
      <View className="flex-1 px-4 py-2 justify-between">
        <View>
          <Text numberOfLines={2} className="text-lg font-interBold text-gray-900">
            {name}
          </Text>
          <Text className="mt-1 text-xs text-gray-500 font-inter">{questionCount} Questions</Text>
        </View>

        <View className="flex-col gap-2">
          <Button onPress={handleOnPlay} icon="play" label="Play" iconSize={18} className="px-3 py-1 rounded-lg" iconPosition="left" style={{backgroundColor: color}} />
          <Button
            onPress={() => navigate('DashboardStack', {screen: 'PdfShow', params: {category: _id}})}
            icon="file-pdf-box"
            label="Learn"
            iconSize={18}
            className="px-3 py-1 rounded-lg"
            iconPosition="left"
            style={{backgroundColor: color}}
          />
        </View>
      </View>
    </View>
  );
}

function QuizInstuctionModel({modalId}: {modalId: string}) {
  const {close} = useModal();

  return (
    <>
      <View className="px-2">
        <Text className="text-greyish-100 mb-2">1. Read each question carefully.</Text>
        <Text className="text-greyish-100 mb-2">2. Select the best answer from the options provided.</Text>
        <Text className="text-greyish-100 mb-2">3. You can skip questions and return to them later.</Text>
        <Text className="text-greyish-100 mb-2">4. Submit your answers before the timer runs out.</Text>
        <View className="flex-row gap-2">
          <Button label="Cancel" className="mt-4 flex-1 bg-red-600 border-red-600" onPress={() => close(modalId)} />
          <Button label="Start Quiz" className="mt-4 flex-1 bg-green-600 border-green-600" onPress={() => navigate('quiz')} />
        </View>
      </View>
    </>
  );
}
