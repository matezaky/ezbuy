import I18n from 'react-native-i18n';
import en from './en-US.js'
import vi from './vi-VN.js'
I18n.fallbacks = true;

I18n.translations = {
  en,
  vi
};

export default I18n;