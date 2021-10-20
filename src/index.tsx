import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-text-extractor' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const TextExtractor = NativeModules.TextExtractor
  ? NativeModules.TextExtractor
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

interface TextBlock {
  text: string;
  frame: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export function extractTextAsync(uri: string): Promise<TextBlock[]> {
  return TextExtractor.getTextFromImage(uri);
}
