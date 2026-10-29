/* global config, i18n */
'use strict';

// localization
const localize = () => {
  document.documentElement.lang = i18n.lang();
  document.documentElement.dir = i18n.dir();
  [...document.querySelectorAll('[data-i18n]')].forEach(e => {
    if (e.dataset.i18nValue) {
      e.setAttribute(e.dataset.i18nValue, i18n.get(e.dataset.i18n));
    }
    else {
      e.textContent = i18n.get(e.dataset.i18n);
    }
  });
  // detailed descriptions, shown when hovering a setting
  [...document.querySelectorAll('[data-i18n-title]')].forEach(e => e.title = i18n.get(e.dataset.i18nTitle));
};
i18n.ready.then(localize);

// languages (each one is displayed in its own language)
for (const [locale, name] of Object.entries(i18n.locales)) {
  document.getElementById('locale').append(new Option(name, locale));
}

async function restore(defaults = false) {
  document.getElementById('user-styling').value = localStorage.getItem('user-styling') || '';

  // sync
  await config.sync();
  for (const key of config.synced) {
    const e = document.querySelector(`input[type=checkbox][value="${key}"]`);
    if (e) {
      e.checked = true;
    }
  }

  const prefs = defaults ? config : await config.get([
    'numbers', 'timeout', 'countdown', 'badge', 'badge-color', 'domain',
    'simulate-allow', 'focus-popup', 'popup-hosts',
    'block-page-redirection', 'block-page-redirection-same-origin',
    'block-page-redirection-hostnames', 'block-automated-redirection',
    'top-hosts', 'protocols', 'silent', 'default-action',
    'whitelist-mode', 'immediate-action', 'rules', 'placement', 'scope', 'width', 'locale'
  ]);

  document.getElementById('rules').value = JSON.stringify(prefs.rules, undefined, '  ');
  document.getElementById('numbers').value = prefs.numbers;
  document.getElementById('timeout').value = prefs.timeout;
  document.getElementById('countdown').value = prefs.countdown;
  document.getElementById('badge').checked = prefs.badge;
  document.getElementById('badge-color').value = prefs['badge-color'];
  document.getElementById('domain').checked = prefs.domain;
  document.getElementById('simulate-allow').checked = prefs['simulate-allow'];
  document.getElementById('focus-popup').checked = prefs['focus-popup'];
  document.getElementById('block-page-redirection').checked = prefs['block-page-redirection'];
  document.getElementById('block-page-redirection-same-origin').checked = prefs['block-page-redirection-same-origin'];
  document.getElementById('block-automated-redirection').checked = prefs['block-automated-redirection'];
  document.getElementById('block-page-redirection-hostnames').value =
    prefs['block-page-redirection-hostnames'].join(', ');
  document.getElementById('popup-hosts').value = prefs['popup-hosts'].join(', ');
  document.getElementById('top-hosts').value = prefs['top-hosts'].join(', ');
  document.getElementById('protocols').value = prefs.protocols.join(', ');
  document.getElementById('silent').value = prefs.silent.join(', ');
  document.getElementById('default-action').value = prefs['default-action'];
  document.getElementById('whitelist-mode').value = prefs['whitelist-mode'];
  document.getElementById('immediate-action').checked = prefs['immediate-action'];
  document.getElementById('placement').value = prefs['placement'];
  document.getElementById('scope').value = prefs['scope'].join(', ');
  document.getElementById('width').value = prefs['width'];
  document.getElementById('locale').value = prefs['locale'];
}

const prepare = str => str.split(/\s*,\s*/)
  .map(s => s.replace('http://', '').replace('https://', '').split('/')[0].trim())
  .filter((h, i, l) => h && l.indexOf(h) === i);

async function save() {
  // first update synced storage (use chrome.storage)
  config.synced = [...document.querySelectorAll('input[type=checkbox][name=synced]:checked')].map(e => e.value);
  await chrome.storage.local.set({
    synced: config.synced
  });

  const scopes = [];
  const patterns = document.getElementById('scope').value.split(/\s*,\s*/).filter((s, i, l) => {
    return s && l.indexOf(s) === i;
  });
  for (const pattern of patterns) {
    try {
      await chrome.scripting.registerContentScripts([{
        'id': 'test',
        'js': ['/data/inject/test.js'],
        'world': 'MAIN',
        'matches': [pattern]
      }]);
      scopes.push(pattern);
    }
    catch (e) {
      console.error('[Invalid Pattern for Scope]', pattern, e);
    }
    await chrome.scripting.unregisterContentScripts({
      ids: ['test']
    }).catch(() => {});
  }
  if (scopes.length === 0) {
    scopes.push('*://*/*');
  }

  const settings = {
    'width': Math.max(300, document.getElementById('width').value),
    'numbers': Math.max(1, document.getElementById('numbers').value),
    'timeout': Math.max(1, document.getElementById('timeout').value),
    'countdown': Math.max(0, document.getElementById('countdown').value),
    'badge': document.getElementById('badge').checked,
    'badge-color': document.getElementById('badge-color').value,
    'domain': document.getElementById('domain').checked,
    'simulate-allow': document.getElementById('simulate-allow').checked,
    'focus-popup': document.getElementById('focus-popup').checked,
    'block-page-redirection': document.getElementById('block-page-redirection').checked,
    'block-page-redirection-same-origin': document.getElementById('block-page-redirection-same-origin').checked,
    'block-automated-redirection': document.getElementById('block-automated-redirection').checked,
    'block-page-redirection-hostnames': prepare(document.getElementById('block-page-redirection-hostnames').value),
    'popup-hosts': prepare(document.getElementById('popup-hosts').value),
    'top-hosts': prepare(document.getElementById('top-hosts').value),
    'silent': prepare(document.getElementById('silent').value),
    'protocols': document.getElementById('protocols').value
      .split(/\s*,\s*/).filter(s => s && s.endsWith(':')),
    'default-action': document.getElementById('default-action').value,
    'whitelist-mode': document.getElementById('whitelist-mode').value,
    'immediate-action': document.getElementById('immediate-action').checked,
    'placement': document.getElementById('placement').value,
    'scope': scopes,
    'locale': document.getElementById('locale').value
  };

  let orules = '';
  try {
    settings.rules = JSON.parse(document.getElementById('rules').value || '{}');
  }
  catch (e) {
    orules = document.getElementById('rules').value;
    alert('Cannot parse rules: ' + e.message);
  }

  localStorage.setItem('user-styling', document.getElementById('user-styling').value || '');

  config.set(settings).then(async () => {
    // apply the new language to this page right away
    if (settings.locale !== i18n.locale) {
      i18n.ready = i18n.load(settings.locale);
      await i18n.ready;
      localize();
    }
    const status = document.getElementById('status');
    status.textContent = i18n.get('options_msg');
    restore();
    setTimeout(() => {
      status.textContent = '';
      if (orules) {
        document.getElementById('rules').value = orules;
      }
    }, 750);
  });
}

document.addEventListener('DOMContentLoaded', () => restore());
document.getElementById('save').addEventListener('click', save);

// footnote links open the notes
document.addEventListener('click', e => {
  if (e.target.href && e.target.href.indexOf('#n') !== -1) {
    document.getElementById('notes').open = true;
  }
});

document.getElementById('reset').addEventListener('click', () => restore(true));
document.getElementById('export').addEventListener('click', () => {
  // get all stored prefs
  config.get([]).then(prefs => {
    const text = JSON.stringify(prefs, null, '\t');
    const blob = new Blob([text], {type: 'application/json'});
    const objectURL = URL.createObjectURL(blob);
    Object.assign(document.createElement('a'), {
      href: objectURL,
      type: 'application/json',
      download: 'popup-blocker-preferences.json'
    }).dispatchEvent(new MouseEvent('click'));
    setTimeout(() => URL.revokeObjectURL(objectURL));
  });
});
document.getElementById('import').addEventListener('click', () => {
  const fileInput = document.createElement('input');
  fileInput.style.display = 'none';
  fileInput.type = 'file';
  fileInput.accept = '.json';
  fileInput.acceptCharset = 'utf-8';

  document.body.appendChild(fileInput);
  fileInput.initialValue = fileInput.value;
  fileInput.onchange = readFile;
  fileInput.click();

  function readFile() {
    if (fileInput.value !== fileInput.initialValue) {
      const file = fileInput.files[0];
      if (file.size > 100e6) {
        return console.warn('The file is too large!');
      }
      const fReader = new FileReader();
      fReader.onloadend = event => {
        fileInput.remove();
        const json = JSON.parse(event.target.result);
        config.set(json).then(() => chrome.runtime.reload());
      };
      fReader.readAsText(file, 'utf-8');
    }
  }
});
// the original project's FAQ still documents every setting; donations go to the original author
const faq = 'https://webextension.org/listing/popup-blocker.html';

// support
document.getElementById('support').addEventListener('click', () => chrome.tabs.create({
  url: faq + '?rd=donate'
}));
// review
document.getElementById('review').addEventListener('click', () => chrome.tabs.create({
  url: 'https://www.youtube.com/watch?v=Jp-RaiTHzCQ'
}));
// FAQs Page
document.getElementById('page').addEventListener('click', () => chrome.tabs.create({
  url: faq
}));

// version
document.getElementById('version').textContent = 'v' + chrome.runtime.getManifest().version;

// links
for (const a of [...document.querySelectorAll('[data-href]')]) {
  if (a.hasAttribute('href') === false) {
    a.href = faq + '#' + a.dataset.href;
  }
}
