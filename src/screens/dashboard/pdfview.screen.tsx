import TopImageLayout from '@components/layouts/TopImage.Layout';
import Button from '@components/ui/Button';
import {View, Text, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '@/components/ui/Loader';

const PdfViewScreen = () => {
  const {} = use
  const pdfList = [
    {id: 1, name: 'Document 1', url: 'https://example.com/doc1.pdf'},
    {id: 2, name: 'Document 2', url: 'https://example.com/doc2.pdf'},
    {id: 3, name: 'Document 3', url: 'https://example.com/doc3.pdf'},
    {id: 4, name: 'Document 4', url: 'https://example.com/doc4.pdf'},
    {id: 6, name: 'Document 5', url: 'https://example.com/doc5.pdf'},
    {id: 7, name: 'Document 5', url: 'https://example.com/doc5.pdf'},
    {id: 8, name: 'Document 5', url: 'https://example.com/doc5.pdf'},
    {id: 9, name: 'Document 5', url: 'https://example.com/doc5.pdf'},
    {id: 10, name: 'Document 5', url: 'https://example.com/doc5.pdf'},
  ];

  const handlePdfPress = (url: string) => {
    // Handle PDF click (e.g., navigate to a PDF viewer or open in browser)
    console.log(`PDF URL: ${url}`);
  };


  function loadNextData(){




  }

  return (
    <TopImageLayout containerClassName="p-0" image="@assets/images/forgot.png" title="Available PDFs" description="Browse and view the available PDF documents below.">
      <ScrollView className="flex-1 px-6 pt-6 pb-5 bg-white">
        <InfiniteScroll loader={<Loader/>} next={loadNextData} hasMore={true} dataLength={}>
          {pdfList.map(pdf => (
            <View style={{elevation: 14, borderRadius: 10}} className="bg-white shadow-slate-400 p-3 mb-5" key={pdf.id}>
              <View className="flex-row items-center justify-between">
                <Text className="text-theme px-2 text-base font-semibold">{pdf.name}</Text>
                <Button label="View" className="p-2 px-3" textClassName="text-sm" onPress={() => handlePdfPress(pdf.url)}>
                  <Icon name="eye" size={18} color="white" />
                </Button>
              </View>
            </View>
          ))}
        </InfiniteScroll>
      </ScrollView>
    </TopImageLayout>
  );
};

export default PdfViewScreen;
