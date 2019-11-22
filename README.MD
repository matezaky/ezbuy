keystore password: `123456`

Đọc qua phần này để có thể biết config build app

* [https://enqtran.com/react-native-build-apk-release/]
* [https://facebook.github.io/react-native/docs/signed-apk-android]

build apk android
``` bash
cd android && ./gradlew assembleRelease

```

Chạy react native

``` bash

react-native run-android --variant=release

```

* Cài bản release vào máy thật
* Lưu ý anh phải bật chế độ nhà phát triển trên android nhé.

``` bash

adb install -r android/app/build/outputs/apk/release/app-release.apk

```