import {FormDatePickerInput, FormRadioInput, FormInput, FormImageInput} from '@/components/ui/Forms';
import TopImageLayout from '@/components/layouts/TopImage.Layout';
import Button from '@/components/ui/Button';
import {selectUser} from '@/store/auth/auth.selector';
import {useRootState} from '@/store/store';
import {ScrollView, View} from 'react-native';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {fileSchema} from '@/util/zod';
import {DateTime} from 'luxon';
import {useFileResolver} from '@/hooks/useFileResolver.hook';
import {useProfileUpdateMutation} from '@/store/auth/endpoints';
import {GenderEnum} from '@/graphql/generated';
import z from 'zod';

const profileSchema = z.object({
  name: z.string({required_error: 'Name is required'}),
  email: z.string({required_error: 'Email is required'}).email('Invalid email address'),
  gender: z.enum(['MALE', 'OTHER', 'FEMALE']).optional(),
  dob: z
    .string()
    .refine(val => DateTime.fromISO(val).isValid, {message: 'Invalid Date'})
    .refine(
      val => {
        const dob = DateTime.fromISO(val);
        const age = DateTime.now().diff(dob, 'years').years;
        return age >= 18;
      },
      {message: 'You must be at least 18 years old'},
    )
    .optional(),

  avatar: z
    .union([
      fileSchema()
        .pattern(/^image\/(heic|png|jpeg|jpg)$/)
        .size(1024 * 1024 * 1)
        .single(),
      z.string().url(),
    ])
    .optional(),
});
type profileSchemaType = z.infer<typeof profileSchema>;

const EditProfileScreen = () => {
  const [profileUpdate] = useFileResolver({
    mutation: useProfileUpdateMutation,
    pathKeys: ['image'],
  });

  const user = useRootState(selectUser);
  const {control, handleSubmit} = useForm<profileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      // gender: user?.gender || undefined,
      // dateOfBirth: user?.dateOfBirth ? new Date(user.dateOfBirth) : undefined,
      // avatar: user?.avatar || '',
      // email: user.email,
    },
  });

  async function handleSaveProfile(schema: profileSchemaType) {
    await profileUpdate({input: schema})
  }

  return (
    <TopImageLayout title="Edit Your Profile" description="Update your personal information below" lottie={require('@assets/lottie/profile.json')}>
      <ScrollView className="" contentContainerStyle={{flexGrow: 1}}>
        <View className="flex-1  gap-6 pt-4 pb-2">
          <FormImageInput control={control} name="avatar" className="mx-auto" mediaCode="PROFILE_IMAGE" />
          <FormInput control={control} name="name" icon="account" placeholder="Your Nickname" />
          <FormInput control={control} name="email" icon="email-outline" editable={false} placeholder="Email" />
          <FormRadioInput
            control={control}
            name="gender"
            value="FEMALE"
            itemClassName="flex-col flex-1 py-4"
            options={[
              {label: 'Male', value: GenderEnum.Male, icon: 'gender-male'},
              {label: 'Female', value: GenderEnum.Female, icon: 'gender-female'},
              {label: 'Other', value: GenderEnum.Other, icon: 'gender-non-binary'},
            ]}
          />
          <FormDatePickerInput control={control} name="dob" label="Date Of Birth" />
          <Button label="Save" onPress={handleSubmit(handleSaveProfile)} className="mt-auto mb-2" icon="content-save" />
        </View>
      </ScrollView>
    </TopImageLayout>
  );
};

export default EditProfileScreen;
