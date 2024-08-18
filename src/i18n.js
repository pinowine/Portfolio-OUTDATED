import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: {
      'zh-CN': ['zh-cn'],
      'zh': ['zh-cn'],
      'zh-HK': ['zh-hk'],
      'zh-hk': ['zh-hk'],
      'en-US': ['en-us'],
      'en': ['en-us'],
      'default': ['en-us']
    },
    lng: 'zh-cn',
    debug: true,
    detection: {
        order: ['queryString', 'cookie', 'localStorage', 'sessionStorage', 'navigator'],
        caches: ['localStorage', 'cookie'],
        lookupLocalStorage: 'i18nextLng',
        lookupFromPathIndex: 0,
        checkWhitelist: true
    },
    backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    lowerCaseLng: true, // 将语言代码转换为小写，确保路径匹配不受大小写影响
    cleanCode: true // 移除地区代码，例如将 'en-US' 简化为 'en'，如果您想完全匹配则不应开启
  });

export default i18n;