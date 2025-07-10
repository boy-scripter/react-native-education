import TopImageLayout from '@/components/layouts/TopImage.Layout';
import Button from '@/components/ui/Button';
import {DatePickerInput} from '@/components/ui/DatePickerInput';
import ImageInput from '@/components/ui/ImageInput';
import Img from '@/components/ui/Img';
import Input from '@/components/ui/Input';
import {RadioInput} from '@/components/ui/RadioInput';
import colorConstant from '@/constant/color.constant';
import {selectUser} from '@/store/auth/auth.selector';
import {useRootState} from '@/store/store';
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
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
    <ScrollView>
      <TopImageLayout title="Edit Your Profile" description="Update your personal information below" lottie={require('@assets/lottie/profile.json')}>
        <ImageInput source={user?.avatar!}></ImageInput>

        <View className="flex-1 gap-6 pt-4 pb-2">
          <Input icon="account" placeholder="Your Nickname" value={nickname} />
          <Input icon="email-outline" editable={false} placeholder="Email" value={nickname} />

          <RadioInput
            value="male"
            label="Select Gender"
            options={[
              {label: 'Male', value: 'male', icon: 'gender-male'},
              {label: 'Female', value: 'female', icon: 'gender-female'},
            ]}
          />

          <DatePickerInput value={birthday} onChange={setBirthday}></DatePickerInput>

          <Button label="Save" className="mt-auto mb-2" icon="content-save" />
        </View>
      </TopImageLayout>
    </ScrollView>
  );
};

export default EditProfileScreen;
