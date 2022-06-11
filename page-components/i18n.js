import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
   // 使用 i18next-http-backend
   .use(Backend)
   .use(LanguageDetector)
   // 將 i18next 傳入 react-i18next 裡面
   .use(initReactI18next)
   // 實例化 initReactI18next
   .init({
      backend: {
         //網頁載入時去下載語言檔的位置
         loadPath: "/locales/{{lng}}.json",
      },
      // 當目前的語言檔找不到對應的字詞時，會用 fallbackLng (en) 作為預設語言
      fallbackLng: "en",
      // 預設語言
      lng: "en",
      keySeparator: '.',
      interpolation: {
         // 是否要讓字詞 escaped 來防止 xss 攻擊，這裡因為 React.js 已經做了，就設成 false即可
         escapeValue: false,
      },
      react: {
        useSuspense: false,
        wait: true,
      },
   });

export default i18n;