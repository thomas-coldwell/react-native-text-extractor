import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { extractTextAsync } from 'react-native-text-extractor';

export default function App() {
  React.useEffect(() => {
    extractTextAsync(
      'http://brooklinmedical.com/2018/wp-content/uploads/2019/08/ontariohealthcard-sample.jpg'
    ).then((result) => console.log(result));
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
