import TopImageLayout from '@/components/layouts/TopImage.Layout';
import Button from '@/components/ui/Button';
import {selectUser} from '@/store/auth/auth.selector';
import {useRootState} from '@/store/store';
import {ScrollView, View} from 'react-native';
import {FormDatePickerInput, FormRadioInput, FormImageInput, FormInput} from '@/components/ui/Forms';
import React from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import z from 'zod';

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  gender: z.enum(['male', 'female', 'other']).optional(),
  dateOfBirth: z.date().optional(),
  avatar: z
    .object({
      uri: z.string().url(),
      type: z.string(),
      name: z.string(),
    })
    .optional(),
});
type profileSchemaType = z.infer<typeof profileSchema>;

const EditProfileScreen = () => {
  const user = useRootState(selectUser);
  const {control, handleSubmit} = useForm<profileSchemaType>({
    resolver: zodResolver(profileSchema),
    // defaultValues: {
    //   name: user?.name || '',
    //   email: user?.email || '',
    //   gender: user?.gender || undefined,
    //   dateOfBirth: user?.dateOfBirth ? new Date(user.dateOfBirth) : undefined,
    // },
  });

  return (
    <TopImageLayout title="Edit Your Profile" description="Update your personal information below" lottie={require('@assets/lottie/profile.json')}>
      <ScrollView className="" contentContainerStyle={{flexGrow: 1}}>
        <View className="flex-1  gap-6 pt-4 pb-2">
          <FormImageInput control={control} name="avatar" className="mx-auto"></FormImageInput>
          <FormInput control={control} name="name" icon="account" placeholder="Your Nickname" />
          <FormInput control={control} name="email" icon="email-outline" editable={false} placeholder="Email" />
          <FormRadioInput
            control={control}
            name="gender"
            value="female"
            itemClassName="flex-col flex-1"
            options={[
              {label: 'Male', value: 'male', icon: 'gender-male'},
              {label: 'Female', value: 'female', icon: 'gender-female'},
              {label: 'Other', value: 'other', icon: 'gender-non-binary'},
            ]}
          />
          <FormDatePickerInput control={control} name="dateOfBirth" label="Date Of Birth"></FormDatePickerInput>
          <Button label="Save" className="mt-auto mb-2" icon="content-save" />
        </View>
      </ScrollView>
    </TopImageLayout>
  );
};

export default EditProfileScreen;
