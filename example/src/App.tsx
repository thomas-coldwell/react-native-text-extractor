import * as React from 'react';

import { StyleSheet, View, Text, Alert, Button } from 'react-native';
import { extractTextAsync } from 'react-native-text-extractor';
import * as FileSystem from 'expo-file-system';
import { Camera } from 'expo-camera';

const url =
  'http://brooklinmedical.com/2018/wp-content/uploads/2019/08/ontariohealthcard-sample.jpg';

export default function App() {
  const cameraRef = React.useRef<Camera | null>(null);

  const performOCR = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      extractTextAsync(photo.uri).then((result) =>
        Alert.alert(JSON.stringify(result.map((r) => r.text)))
      );
    }
  };

  const [cameraAllowed, setCameraAllowed] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setCameraAllowed(status === 'granted');
    })();
  }, []);

  if (!cameraAllowed) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        type={Camera.Constants.Type.back}
        style={{ height: 300, width: 300 }}
        ref={cameraRef}
      />
      <Button title="Scan" onPress={() => performOCR()} />
    </View>
  );
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
