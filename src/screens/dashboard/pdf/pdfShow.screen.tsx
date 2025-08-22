import TopImageLayout from '@components/layouts/TopImage.Layout';
import Button from '@components/ui/Button';
import {View, Text, FlatList} from 'react-native';
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
    <TopImageLayout lottie={require('@assets/lottie/profile.json')} title="Available PDFs"  description="Browse and view the available PDF documents below.">
      <LoadingManager asyncFunction={() => onInitialPageRender()}>
        {totalDocs ? (
          <FlatList
            data={pdfList}
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
              <View style={{elevation: 8, borderRadius: 10}} className="bg-white shadow-slate-400 p-3">
                <View className="flex-row items-center justify-between">
                  <Text className="text-theme px-2 text-base font-semibold">{pdf.title}</Text>
                  <Button label="View" className="p-2 px-3" textClassName="text-sm" onPress={() => handlePdfPress(pdf.url)}>
                    <Icon name="eye" size={18} color="white" />
                  </Button>
                </View>
              </View>
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
