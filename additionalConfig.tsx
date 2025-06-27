import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {GOOGLE_CLIENT_ID} from '@env';

export function setupAdditionalConfig() {
  GoogleSignin.configure({
    webClientId: GOOGLE_CLIENT_ID,
  });
}
