import TopImageLayout from '@components/layouts/TopImage.Layout';
import Login from '@components/Login';
import Signup from '@components/Signup';
import Button from '@components/ui/Button';
import Tab from '@components/ui/TabToggle';
import {useState} from 'react';
import {Image} from 'react-native';
import {View, Text} from 'react-native';
import {resetRoot, useRouteEffect} from '@/hooks/useNavigation.hook';
import {AuthStackParamList} from '@/types/navigation/authstack/authstack.interface';
import {useLoginWithGoogleMutation} from '@store/auth/endpoints';
import {successToast} from '@/components/Toast/Toast.config';
import {goWithGoogle} from '@/store/auth/auth.service';
import {StepsAnimation} from '@/animation/StepsAnimation';
import {ScrollView} from 'moti';


export default function LoginAndSignUpScreen() {
  const [googleMutation] = useLoginWithGoogleMutation();
  const [tab, setTab] = useState('1');

  useRouteEffect<AuthStackParamList, 'LoginAndSignup'>(params => {
    if (params?.mode) {
      setTab(params.mode);
    }
  });

  const handleGoogleLogin = async () => {
    const idToken = await goWithGoogle();
    await googleMutation({idToken}).unwrap();
    successToast({text1: 'Login with Google Successful'});
    resetRoot('DashboardStack');
  };

  return (
    <ScrollView className='bg-white' contentContainerStyle={{flex : 1}}>
      <TopImageLayout  lottie={require('@assets/lottie/loginsignup.json')} >
        <Tab onChange={setTab} className='mt-4' defaultTab="1">
          <Tab.Button label="Signup" id="1"></Tab.Button>
          <Tab.Button label="Login" id="2"></Tab.Button>
        </Tab>

        <View className="my-10  flex-1 ">
          <StepsAnimation className="w-full flex-1 " step={parseInt(tab)}>
            {/* signup */}
            <View className="flex-1">
              <Signup />
              <View className="flex-row items-center my-5 px-4">
                <View className="flex-1 h-px bg-greyish" />
                <Text className="mx-3 text-sm text-theme">Or</Text>
                <View className="flex-1 h-px bg-greyish" />
              </View>
              <Button position='left' onPress={handleGoogleLogin} label="Continue with Google" className="w-full border-greyish bg-white py-4" textClassName="text-sm text-theme">
                <Image className="w-5 h-5" source={require('@assets/images/google.png')} />
              </Button>
            </View>

            {/* login */}
            <View className="flex-1">
              <Login />
              <View className="flex-row items-center my-5 px-4">
                <View className="flex-1 h-px bg-greyish" />
                <Text className="mx-3 text-sm text-theme">Or</Text>
                <View className="flex-1 h-px bg-greyish" />
              </View>
              <Button position='left' onPress={handleGoogleLogin} label="Continue with Google" className="w-full border-greyish bg-white py-4" textClassName="text-sm text-theme">
                <Image className="w-5 h-5" source={require('@assets/images/google.png')} />
              </Button>
            </View>
          </StepsAnimation>
        </View>
      </TopImageLayout>
    </ScrollView>
  );
}
