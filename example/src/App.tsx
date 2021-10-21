import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { extractTextAsync } from 'react-native-text-extractor';
import * as FileSystem from 'expo-file-system';

const url =
  'http://brooklinmedical.com/2018/wp-content/uploads/2019/08/ontariohealthcard-sample.jpg';

export default function App() {
  React.useEffect(() => {
    FileSystem.downloadAsync(
      url,
      FileSystem.documentDirectory + 'image.jpg'
    ).then((download) =>
      extractTextAsync(download.uri).then((result) => console.log(result))
    );
  }, []);

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
