package com.reactnativetextextractor

import android.net.Uri
import java.io.IOException
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

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
    val image: InputImage
    try {
      val uri = Uri.parse(url)
      image = InputImage.fromFilePath(reactApplicationContext, Uri.parse(url))
      recognizer.process(image).addOnSuccessListener { visionText ->
        val response = mutableListOf<Any>()
        for (block in visionText.textBlocks) {
          val map = mutableMapOf(
            "text" to block.text,
            "frame" to mutableMapOf<String, Any?>(
              "x" to block.boundingBox?.left,
              "y" to block.boundingBox?.top,
              "height" to block.boundingBox?.height(),
              "width" to block.boundingBox?.width()
            )
          )
          response.add(map)
        }
        promise.resolve(response)
      }.addOnFailureListener { e ->
        promise.reject(e)
      }
    } catch (e: IOException) {
      promise.reject(e)
    }
    promise.resolve(url)

  }


}
