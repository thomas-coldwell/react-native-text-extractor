import MLKitTextRecognition
import MLImage
import MLKitVision

@objc(TextExtractor)
class TextExtractor: NSObject {
    
    @objc(getTextFromImage:withResolver:withRejecter:)
    func getTextFromImage(url: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        do {
            guard let fileUrl = URL(string: url) else {
                reject("Error", "Invalid file URI", nil);
                return;
            };
            let imageData = try Data(contentsOf: fileUrl);
            guard let image = UIImage(data: imageData) else {
                reject("Error", "Bad imageData", nil);
                return;
            };
            let recognizer = TextRecognizer.textRecognizer(options: TextRecognizerOptions());
            let visionImage = VisionImage(image: image);
            visionImage.orientation = image.imageOrientation;
            let results = try recognizer.results(in: visionImage);
            var response: [Any] = [];
            for block in results.blocks {
                var map: [String: Any] = [:];
                map["text"] = block.text;
                map["frame"] = [
                    "x": block.frame.minX,
                    "y": block.frame.minY,
                    "height": block.frame.height,
                    "width": block.frame.width
                ];
                response.append(map);
            }
            resolve(response);
        }
        catch {
            reject("Error", error.localizedDescription, nil);
        }
    }
}
