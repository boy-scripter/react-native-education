import {Image} from 'react-native';
import {Text, View} from 'react-native';

export function HomeScreen() {
  const user = {
    name: 'Shivam',
    image: 'https://marketplace.canva.com/EAFaFUz4aKo/3/0/1600w/canva-yellow-abstract-cooking-fire-free-logo-tn1zF-_cG9c.jpg',
  };

  return (
    <View className="px-4 py-4 ">
      <View className="flex flex-row justify-between">
        <View className="self-end">
          <Text className="font-interBold">Hi, {user.name}</Text>
          <Text>Let's Make this Day Productive</Text>
        </View>
        <Image className="h-16 w-16 rounded-full" source={{uri: user.image}} />
      </View>

      <View className="mt-4 w-full px-4 mx-auto flex flex-row p-2 justify-between rounded-xl bg-theme ">
        <View className="flex-row">
          <Image className="w-10 h-10" source={require('@assets/images/trophy.png')} resizeMode="contain" />
          <View className='pl-3 flex justify-center'>
            <Text className='font-interBold text-white'>Ranking</Text>
            <Text className='font-interBold text-white'>100</Text>
          </View>
        </View>
        <View className="w-px bg-white mx-4" />
        <Image className="w-10 h-10" source={require('@assets/images/coin.png')} resizeMode="contain" />
      </View>

      <View className="mt-4">
        <Text>Let's Play</Text>
        {/* <View className="flex flex-row justify-around mt-4">
          <View className="items-center">
            <Image className="w-12 h-12 mb-2" source={require('@assets/images/book.png')} />
            <Text>Learn</Text>
          </View>
          <View className="items-center">
            <Image className="w-12 h-12 mb-2" source={require('@assets/images/game.png')} />
            <Text>Play</Text>
          </View>
          <View className="items-center">
            <Image className="w-12 h-12 mb-2" source={require('@assets/images/chat.png')} />
            <Text>Chat</Text>
          </View>
        </View> */}
      </View>
    </View>
  );
}
