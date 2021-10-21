package com.reactnativetextextractor

import android.net.Uri
import com.facebook.react.bridge.*
import java.io.IOException

import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.text.TextRecognition
import com.google.mlkit.vision.text.latin.TextRecognizerOptions
import java.net.URL

class TextExtractorModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "TextExtractor"
  }

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  fun getTextFromImage(url: String, promise: Promise) {
    val recognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS)
    try {
      val uri = Uri.parse(url)
      val image = InputImage.fromFilePath(reactApplicationContext, uri)
      recognizer.process(image).addOnSuccessListener { visionText ->
        val response = Arguments.createArray()
        for (block in visionText.textBlocks) {
          val map = Arguments.createMap()
          map.putString("text", block.text)
          if (block.boundingBox != null) {
            val frame = Arguments.createMap()
            frame.putInt("x", block.boundingBox!!.left)
            frame.putInt("y", block.boundingBox!!.top)
            frame.putInt("height", block.boundingBox!!.height())
            frame.putInt("width", block.boundingBox!!.width())
            map.putMap("frame", frame)
          }
          response.pushMap(map)
        }
        promise.resolve(response)
      }.addOnFailureListener { e ->
        promise.reject(e)
      }
    } catch (e: IOException) {
      promise.reject(e)
    }
  }


}
