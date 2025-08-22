import React, {useState} from 'react';
import Pdf from 'react-native-pdf';
import {View, Text, useWindowDimensions} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {DashboardStackParamList} from '@/types/navigation/dashboardstack/dashboardstack.interface';

const PdfViewScreen = () => {
  const route = useRoute<RouteProp<DashboardStackParamList, 'PdfView'>>();
  const {url} = route.params;

  const {width} = useWindowDimensions();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  return (
    <View className="flex-1 bg-white relative">
      {/* Wrapper adds padding safely */}
      <View className="flex-1 px-3 pb-14">
        {/* bottom padding reserved for footer */}
        <Pdf
          source={{uri: url, cache: false}}
          trustAllCerts={false}
          style={{flex: 1, width: width - 24}}
          renderActivityIndicator={progress => (
            <View className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center z-10">
              <View className="bg-theme rounded-lg p-3 px-5">
                <Text className="text-lg font-interBold  text-white">Your Pdf Is Loading : {Math.round(progress * 100)}%</Text>
              </View>
            </View>
          )}
          onLoadComplete={setTotalPages}
          onPageChanged={(pageNum, total) => {
            setPage(pageNum);
            setTotalPages(total);
          }}
          enablePaging={true}
        />
      </View>

      {/* Bottom page indicator */}
      {
        <View className="absolute bg-theme bottom-0 left-0 right-0 p-3 border-t items-center">
          <Text className="text-lg font-interBold py-2 text-white">
            Page {page} of {totalPages}
          </Text>
        </View>
      }
    </View>
  );
};

export default PdfViewScreen;
