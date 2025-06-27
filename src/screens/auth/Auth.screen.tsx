import TopImageLayout from '@components/layouts/TopImage.Layout';
import Login from '@components/Login';
import Signup from '@components/Signup';
import Button from '@components/ui/Button';
import Tab from '@components/ui/TabToggle';
import React from 'react';
import {Image} from 'react-native';
import {View, Text} from 'react-native';
import {us} from '@/graphql/generated';
import {goWithGoogle} from '@/store/auth/auth.service';
import {successToast} from '@/components/Toast/Toast.config';
import {navigate} from '@/hooks/useNavigation.hook';

export default function AuthScreen() {
  const [tab, setTab] = React.useState('login');



  return (
    <TopImageLayout image={'@assets/images/auth.png'} title="Get Started now" description="Create an account or log in to explore about our app">
      <Tab onChange={value => setTab(value)} defaultTab="signup">
        <Tab.Button label="Signup" id="signup"></Tab.Button>
        <Tab.Button label="Login" id="login"></Tab.Button>
      </Tab>

      <View className="my-10 flex-1 ">
        {tab === 'login' ? <Login /> : <Signup />}
        <View className="flex-row items-center my-5 px-4">
          <View className="flex-1 h-px bg-greyish" />
          <Text className="mx-3 text-sm text-theme">Or</Text>
          <View className="flex-1 h-px bg-greyish" />
        </View>

        <Button onPress={handleGoogleLogin} label="Continue with Google" className="w-full border-greyish bg-white py-4" textClassName="text-sm text-theme">
          <Image className="w-5 h-5" source={require('@assets/images/google.png')} />
        </Button>
      </View>
    </TopImageLayout>
  );
}
