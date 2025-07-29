import {FormDatePickerInput, FormRadioInput, FormInput, FormImageInput} from '@/components/ui/Forms';
import TopImageLayout from '@/components/layouts/TopImage.Layout';
import Button from '@/components/ui/Button';
import {selectUser} from '@/store/auth/auth.selector';
import {useRootState} from '@/store/store';
import {ScrollView, View} from 'react-native';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {fileSchema, getDirtyValues} from '@/util/zod';
import {DateTime} from 'luxon';
import {useFileResolver} from '@/hooks/useFileResolver.hook';
import {useProfileUpdateMutation} from '@/store/auth/endpoints';
import {GenderEnum} from '@/graphql/generated';
import ProfileImage from '@assets/images/profile.png';
import {successToast} from '@/components/Toast/Toast.config';
import z from 'zod';

const profileSchema = z.object({
  name: z.string({required_error: 'Name is required'}),
  email: z.string({required_error: 'Email is required'}).email('Invalid email address'),
  gender: z.enum(['MALE', 'OTHER', 'FEMALE']).nullable().optional(),
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
    .nullable().optional(),

  avatar: z
    .union([
      fileSchema()
        .patternExtension(/^(heic|png|jpeg|jpg)$/)
        .setMaxSize(1024 * 1024 * 1)
        .maxFiles(1)
        .build(),
      z.string().url(),
    ])
    .nullable().optional(),
});
type profileSchemaType = z.infer<typeof profileSchema>;

const EditProfileScreen = () => {

  const [profileUpdate] = useFileResolver({
    mutation: useProfileUpdateMutation,
    pathKeys: ['avatar'] as const,
  });

  const user = useRootState(selectUser);
  const {control, handleSubmit, formState} = useForm<profileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      gender: user.gender,
      avatar: user.avatar,
      email: user.email,
      dob: user.dob,
    },
  });

  async function handleSaveProfile(values: profileSchemaType) {
    const changedData = getDirtyValues(values, formState.dirtyFields);
   console.log(changedData)
    // await profileUpdate({input: changedData});
    successToast({text1: 'Profile Updated'});
  }

  return (
    <TopImageLayout title="Edit Your Profile" description="Update your personal information below" lottie={require('@assets/lottie/profile.json')}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View className="flex-1 gap-6 pt-4 pb-2">
          <FormImageInput fallbackUri={ProfileImage} containerClass="mx-auto text-center" control={control} name="avatar" mediaCode="PROFILE_IMAGE" />
          <FormInput control={control} name="name" icon="account" placeholder="Your Nickname" />
          <FormInput control={control} name="email" icon="email-outline" editable={false} placeholder="Email" />
          <FormRadioInput
            control={control}
            name="gender"
            value={GenderEnum.Female}
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
