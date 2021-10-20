#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(TextExtractor, NSObject)

RCT_EXTERN_METHOD(getTextFromImage:(NSString)url
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

@end
