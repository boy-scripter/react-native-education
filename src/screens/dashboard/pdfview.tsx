// PdfViewerScreen.tsx
import React from 'react';
import Pdf from 'react-native-pdf';
import {View, StyleSheet} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { DashboardStackParamList } from '@/types/navigation/dashboardstack/dashboardstack.interface';

const PdfViewScreen = () => {
  const route = useRoute<RouteProp<DashboardStackParamList, 'PdfView'>>();
  const {url} = route.params;

  return (
    <View style={styles.container}>
      <Pdf source={{uri: url, cache: true}} style={styles.pdf} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  pdf: {flex: 1},
});

export default PdfViewScreen;
