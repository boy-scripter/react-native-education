import colorConstant from '@/constant/color.constant';
import {Text, View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

export function QuestionBox() {
  return (
    <>
      <View className="w-full rounded-2xl bg-white  p-8" style={{elevation: 14}}>
        <View className="mx-auto p-2 bg-white rounded-full -mt-20 mb-5">
          {/* ciricular indicator */}
          <AnimatedCircularProgress
            size={90}
            width={8}
            fill={80}
            tintColor={colorConstant.theme.DEFAULT}
            backgroundColor={colorConstant.greyish.DEFAULT}
            lineCap="round"
            children={() => (
              <View className="w-full flex-1 justify-center items-center bg-white">
                <Text className="font-interBold text-2xl">12</Text>
              </View>
            )}
          />
          {/* circualr indiactor ends here */}
        </View>
        <Text className="font-interBold text-xl text-theme ">What is the most Poppular game thoughtout the world ?</Text>
      </View>
    </>
  );
}
