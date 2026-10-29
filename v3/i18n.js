/* global config */
'use strict';

/* localization with a user-selectable language; "auto" keeps the browser's language (chrome.i18n) */
const i18n = {
  // locales that can be selected from the options page (folder name in /_locales: native name)
  locales: {
    'en': 'English',
    'ar': 'العربية',
    'de': 'Deutsch',
    'es': 'Español',
    'fr': 'Français',
    'id': 'Bahasa Indonesia',
    'it': 'Italiano',
    'ja': '日本語',
    'ko': '한국어',
    'nl': 'Nederlands',
    'pl': 'Polski',
    'pt_BR': 'Português (Brasil)',
    'ru': 'Русский',
    'tr': 'Türkçe',
    'uk': 'Українська',
    'vi': 'Tiếng Việt',
    'zh_CN': '简体中文',
    'zh_TW': '繁體中文'
  },
  messages: null, // null means "use chrome.i18n"
  fallback: null
};

i18n.load = async locale => {
  i18n.messages = i18n.fallback = null;
  i18n.locale = 'auto';

  if (Object.hasOwn(i18n.locales, locale) === false) {
    return;
  }
  const read = locale => fetch(chrome.runtime.getURL('/_locales/' + locale + '/messages.json')).then(r => r.json());
  try {
    // missing keys fall back to the default locale (same as chrome.i18n)
    const [messages, fallback] = await Promise.all([read(locale), read('en')]);
    i18n.messages = messages;
    i18n.fallback = fallback;
    i18n.locale = locale;
  }
  catch (e) {
    console.warn('Cannot load "' + locale + '" locale', e);
  }
};

i18n.get = id => {
  const o = (i18n.messages && i18n.messages[id]) || (i18n.fallback && i18n.fallback[id]);
  return o ? o.message : chrome.i18n.getMessage(id);
};

// "lang" attribute value for the current language
i18n.lang = () => i18n.locale === 'auto' ? chrome.i18n.getUILanguage() : i18n.locale.replace('_', '-');

// "dir" attribute value; only the bundled right-to-left locales switch the layout
i18n.dir = () => ['ar'].includes(i18n.lang().split('-')[0]) ? 'rtl' : 'ltr';

i18n.ready = config.get(['locale']).then(prefs => i18n.load(prefs.locale));

config.changed(ps => {
  if (ps.locale) {
    i18n.ready = i18n.load(ps.locale.newValue);
  }
});
