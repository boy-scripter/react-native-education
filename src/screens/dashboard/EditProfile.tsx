import TopImageLayout from '@/components/layouts/TopImage.Layout';
import Button from '@/components/ui/Button';
import {FormInput} from '@/components/ui/FormInput';
import Img from '@/components/ui/Img';
import Input from '@/components/ui/Input';
import colorConstant from '@/constant/color.constant';
import {selectUser} from '@/store/auth/auth.selector';
import {useRootState} from '@/store/store';
import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import z from 'zod';

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  gender: z.enum(['male', 'female']).optional(),
  dateOfBirth: z.date().optional(),
});
type profileSchemaType = z.infer<typeof profileSchema>;

const EditProfileScreen = () => {
  const user = useRootState(selectUser);
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('null');
  const [birthday, setBirthday] = useState('');

  return (
    <TopImageLayout title="Edit Your Profile" description="Update your personal information below" lottie={require('@assets/lottie/profile.json')}>
      <View className="items-center my-4">
        <View className="relative"></View>
        <Img source={user?.avatar!} className="w-36 h-36 rounded-full border-2 border-theme" />
        <View className="absolute inset-0 justify-center items-center">
          <Button icon="camera" iconColor={colorConstant.theme.DEFAULT} className="bg-white/60 p-1 px-2 border-transparent" />
        </View>
      </View>

      <View className="flex-1 gap-6 pt-4 pb-2">
        <Input placeholder="Your Nickname" value={nickname} />
        <Input placeholder="Email" value={nickname} />

        <View className="flex-row justify-between ">
          <Button
            className={`flex-1 mr-2 rounded-xl items-center ${gender === 'male' ? 'bg-theme' : 'bg-theme/70'}`}
            icon="gender-male"
            iconColor="#fff"
            label="Male"
            onPress={() => setGender('male')}
          />

          <Button
            className={`flex-1 ml-2 rounded-xl items-center ${gender === 'female' ? 'bg-theme' : 'bg-theme/70'}`}
            icon="gender-female"
            iconColor="#fff"
            label="Female"
            onPress={() => setGender('female')}
          />
        </View>

        <Input placeholder="Your Birthday (YYYY-MM-DD)" value={birthday} />

        <Button label="Save" className="mt-auto mb-2" icon="content-save" />
      </View>
    </TopImageLayout>
  );
};

export default EditProfileScreen;
