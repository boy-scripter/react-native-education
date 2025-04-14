import Login from '@components/Login';
import Signup from '@components/Signup';
import Button from '@components/ui/Button';
import Tab from '@components/ui/TabToggle';
import React from 'react';
import {Image} from 'react-native';
import {View, ImageBackground, Text} from 'react-native';

export function AuthScreen() {
  const [tab, setTab] = React.useState('login');

  return (
    <View className="flex-1 bg-theme-900 ">
      <ImageBackground className="h-60  flex gap-3 justify-end py-5 px-5" source={require('@assets/images/star.png')}>
        <Text className="font-interBold text-white text-3xl">Get Started now</Text>
        <Text className="text-white font-inter text-xs">Create an account or log in to explore about our app</Text>
      </ImageBackground>

      <View style={{borderTopRightRadius: 20, borderTopLeftRadius: 20}} className="bg-white rounded-t-2xl flex-1 p-5">
        <Tab onChange={setTab} defaultTab="signup">
          <Tab.Button label="Login" id="login"></Tab.Button>
          <Tab.Button label="Signup" id="signup"></Tab.Button>
        </Tab>

        <View className="my-10 flex-1 ">
          {tab === 'login' ? <Login /> : <Signup />}

          <View className="flex-row items-center my-5 px-4">
            <View className="flex-1 h-px bg-greyish" />
            <Text className="mx-3 text-sm text-theme-900">Or</Text>
            <View className="flex-1 h-px bg-greyish" />
          </View>

          <Button label="Continue with Google" className="w-full border-greyish bg-white py-4" textClassName="text-sm text-theme-900">
            <Image className="w-5 h-5" source={require('@assets/images/google.png')} />
          </Button>
        </View>
      </View>
    </View>
  );
}
