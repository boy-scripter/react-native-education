import {View} from 'moti';
import Loader from '../ui/Loader';

View;
export function SpinnerLoader() {
  return (
    <>
      <View className="flex-1 items-center justify-center">
        <Loader size={'large'}></Loader>
      </View>
    </>
  );
}
