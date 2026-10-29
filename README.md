**English** | [繁體中文](README.zh-TW.md)

## ![icon](v3/data/icons/32.png) Popup Blocker (strict) — multilingual fork

This is an unofficial fork of [schomery/popup-blocker](https://github.com/schomery/popup-blocker) by Jeremy Schomery. It adds an in-extension language switch, a Traditional Chinese translation and detailed help for every setting, and fixes one bug. Everything else works the same as the original.

> This fork is not affiliated with or endorsed by the original author. Please report problems with the features listed below in this repository, not upstream.

### What's different from the original

| | Original (0.9.2) | This fork |
|---|---|---|
| Interface language | Always follows the browser's language | Pick one on the options page: English, العربية, Español, Français, Português (Brasil), Türkçe, 繁體中文, or "Browser default" |
| Traditional Chinese | Not included | Full translation (`zh_TW`), also used automatically when the browser is set to Traditional Chinese |
| Help for settings | Short labels only | Hover any setting on the options page to see what it does, in every bundled language |
| "Mute notifications on these hostnames" | Has no effect (the check was removed in upstream commit `1cfbf2e`) | Works again: popups on listed pages are still blocked, but no notification is shown |
| Close button of the notification | Always in English | Translated |

Details:

- **Language switch.** The selected language applies to the options page, the toolbar popup, the in-page notification and the toolbar icon's tooltip, and changes take effect without reloading. Text that has no translation yet falls back to English. The extension's name, description and keyboard shortcut descriptions are shown by the browser itself, so they always follow the browser's language.
- **Setting descriptions.** They are written from the actual code, so they cover details the labels leave out. For example, the countdown presses the action you chose for that site in the last 10 days, "Simulate allow" can break login popups, and "Reset to Defaults" only takes effect after you press Save.
- **Muted hostnames.** Matching uses the page's exact hostname, the same as before the upstream regression. Rules and the default action still run on those pages.

This fork is based on upstream commit [`c680634`](https://github.com/schomery/popup-blocker/commit/c680634) (version 0.9.2). Only the Manifest V3 version in [`v3/`](v3) has been changed; [`v2/`](v2) is the original legacy version, left as is.

---

### About the extension

Popup Blocker (strict) stops websites from opening new windows and tabs. Most popup blockers react after a popup appears; this one intercepts the request before anything opens and asks you what to do. Different requests are listed in a small box in the corner of the page, and repeated requests to the same address are counted with a badge.

#### What it blocks

- Popups opened with `window.open`
- Links with `target="_blank"`
- Form submissions that open a new window
- The `about:blank` trick (open an empty window, then load an address into it)
- Popups opened from frames whose address is `javascript:` or `data:`, a common way around popup blockers
- Optionally: pages that redirect the tab after their popup is blocked, or redirect by themselves

#### What you can do with a blocked request

| Button | Action | Shortcut |
|---|---|---|
| allow | Open the popup as the page intended | Alt + Shift + A |
| deny | Discard the request | Alt + Shift + D |
| background | Open the address in a background tab | Alt + Shift + B |
| redirect | Open the address in the current tab instead | Alt + Shift + R |
| trust | Add the site to the allow list (click twice to confirm) | Alt + Shift + T |

On macOS the shortcuts use Control + Option. You can also assign browser-wide shortcuts (in `chrome://extensions/shortcuts`) that allow, deny, background, redirect or focus the last request in the current tab.

#### Settings at a glance

- Turn blocking on or off globally or for the current site from the toolbar popup
- Allow lists for popup destinations and for whole pages, and allowed protocols such as `magnet:`
- A default action, an optional countdown that runs it automatically, and URL rules in JSON (regular expressions or URL patterns) for automatic decisions
- Position, width and custom CSS for the notification, a list of sites where it stays hidden, and the blocked-request counter on the toolbar icon
- Import, export, and syncing selected lists through your browser account

### Installation

The official store versions are the **original** extension and do not include the changes from this fork:

| Browser | Original extension |
|---|---|
| Chrome / Chromium | https://chrome.google.com/webstore/detail/popup-blocker-strict/aefkmifgmaafnojlojpnekbpbmjiiogg |
| Microsoft Edge | https://www.microsoft.com/store/p/popup-blocker/9ng26z2368n6 |
| Firefox / Firefox for Android | https://addons.mozilla.org/firefox/addon/popup-blocker/ |
| Opera | https://addons.opera.com/extensions/details/popup-blocker-ultimate/ |

To use this fork, install it from source. If you already have the store version, disable it first so the two don't both block popups.

**Chrome, Edge and other Chromium browsers**

1. Download this repository ([Code → Download ZIP](../../archive/refs/heads/master.zip), or a package from [Releases](../../releases) if available) and unzip it.
2. Open `chrome://extensions` (Edge: `edge://extensions`) and turn on **Developer mode**.
3. Click **Load unpacked** and select the `v3` folder.
4. Keep the folder: the browser loads the extension from it every time it starts.

**Firefox**

Release versions of Firefox only install extensions signed by Mozilla. To try the fork, open `about:debugging`, choose **This Firefox**, click **Load Temporary Add-on…** and select `v3/manifest.json`. A temporary add-on is removed when Firefox restarts. For a permanent install you would need to sign your own build on [addons.mozilla.org](https://addons.mozilla.org/developers/), which requires changing the add-on ID in `v3/manifest.json` (it is still the original extension's ID).

### Building a package

There is no build step: the `v3` folder is the extension. To create an archive for distribution, zip the contents of `v3` so that `manifest.json` is at the root of the archive:

```bash
cd v3 && zip -r ../popup-blocker.zip .
```

### Translations

Translations live in [`v3/_locales/<locale>/messages.json`](v3/_locales). To add a language:

1. Copy `v3/_locales/en/messages.json` to a new folder named after the locale (for example `de` or `zh_CN`) and translate the `message` values.
2. Add the locale and its name in its own language to `i18n.locales` in [`v3/i18n.js`](v3/i18n.js), so it shows up in the language selector.

The original project collects translations on [Transifex](https://explore.transifex.com/github-7/popup-blocker-strict/). Strings added by this fork (the language selector and the setting descriptions) are not on Transifex.

### Links

These pages belong to the original project. The extension also opens the original FAQ page when it is installed and after updates (at most once every 45 days; this can be turned off in the options), and a feedback page when it is uninstalled.

- FAQ: https://webextension.org/listing/popup-blocker.html
- Test page: https://webbrowsertools.com/popup-blocker/
- Video review: https://www.youtube.com/watch?v=Jp-RaiTHzCQ

### Supporting the original author

The extension is the work of Jeremy Schomery. If it helps you, consider supporting them:

- [PayPal](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=inbasic%2ecorp%40gmail%2ecom&lc=CA&item_name=support%20extension%20development&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_LG%2egif%3aNonHosted)
- Bitcoin: `bc1qh7juzrxrawpr65elm4qs285m5rdhnhgsn7h2jf`

### License

Released under the [Mozilla Public License 2.0](LICENSE), the same as the original project. Files changed in this fork remain under MPL-2.0.
