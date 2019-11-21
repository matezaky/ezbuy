keystore password: `123456`
config build apk [https://enqtran.com/react-native-build-apk-release/]
[https://facebook.github.io/react-native/docs/signed-apk-android]

``./gradlew assembleRelease``
``react-native run-android --variant=release``
run realse to device
```adb install -r android/app/build/outputs/apk/release/app-release.apk```