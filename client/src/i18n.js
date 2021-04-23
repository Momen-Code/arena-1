import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

//Translations
import TRANSLATIONS_AR from './translations/ar/translations';
import TRANSLATIONS_EN from './translations/en/translations';
i18n.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			en: {
				translations: TRANSLATIONS_EN,
			},
			ar: {
				translations: TRANSLATIONS_AR,
			},
		},
		fallbackLng: 'en',
		debug: true,
		react: {
			wait: true,
			useSuspense: false,
		},
		preload: ['en', 'ar'],
		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		},
	});

export default i18n;
