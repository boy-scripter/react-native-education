import TopImageLayout from '@components/layouts/TopImage.Layout';
import Button from '@components/ui/Button';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from '@/components/ui/Loader';
import {usePdfFacade} from './pdf.facade';
import {LoadingManager} from '@/components/LoadingManger';
import {RouteProp, useRoute} from '@react-navigation/native';
import {DashboardStackParamList} from '@/types/navigation/dashboardstack/dashboardstack.interface';
import {navigate} from '@/hooks/useNavigation.hook';

export default function PdfViewScreen() {
  const route = useRoute<RouteProp<DashboardStackParamList, 'PdfShow'>>();
  const {category} = route.params;
  const {
    pagintedPdf: {
      docs: pdfList,
      hasNextPage,
      fetchPage,
      page,
      totalDocs,
      loading, // make sure your hook returns this
    },
    onInitialPageRender,
  } = usePdfFacade();

  function handlePdfPress(url: string) {
    navigate('DashboardStack', {
      screen: 'PdfView',
      params: {url},
    });
  }

  return (
    <TopImageLayout lottie={require('@assets/lottie/profile.json')} title="Available PDFs" description="Browse and view the available PDF documents below.">
      <LoadingManager asyncFunction={() => onInitialPageRender()}>
        {totalDocs ? (
          <FlatList
            data={pdfList}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item._id}
            contentContainerClassName="p-6  px-2 gap-5 "
            onEndReached={() => {
              if (!loading && hasNextPage) {
                fetchPage(page + 1, 10);
              }
            }}
            onEndReachedThreshold={0.1}
            ListFooterComponent={loading ? <Loader /> : !hasNextPage && pdfList.length > 0 ? <Text className="text-center text-gray-500 py-3">No more PDFs</Text> : null}
            renderItem={({item: pdf}) => (
              <TouchableOpacity className="bg-white rounded-2xl p-4 border-l-4 border-gray-300 shadow-xl " style={{elevation: 10}} activeOpacity={0.8}>
                <View className="flex-row items-center justify-between">
                  <Text className="text-gray-800 px-2 text-base font-bold flex-1" numberOfLines={1}>
                    {pdf.title}
                  </Text>
                  <TouchableOpacity className="bg-theme p-2 px-4 rounded-xl flex-row items-center gap-2" onPress={() => handlePdfPress(pdf.url)} activeOpacity={0.8}>
                    <Icon name="eye" size={18} color="white" />
                    <Text className="text-white text-sm font-semibold">View</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <PdfNotAvailable />
        )}
      </LoadingManager>
    </TopImageLayout>
  );
}

function PdfNotAvailable() {
  return (
    <View className="flex-1 w-full items-center justify-center">
      <Text className="text-xl text-theme font-bold">PDF Not Available</Text>
    </View>
  );
}
