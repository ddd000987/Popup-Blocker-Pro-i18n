[English](README.md) | **繁體中文**

## ![icon](v3/data/icons/32.png) Popup Blocker Pro i18n

Popup Blocker Pro i18n 是 Jeremy Schomery 的 [Popup Blocker (strict)](https://github.com/schomery/popup-blocker) 的非官方 fork。這個版本加入了擴充功能內的語言切換（18 種語言），以及改版後附有每個設定詳細說明的設定頁，並修正了幾個 bug。封鎖彈出視窗的功能本身和原版相同。

> 這個 fork 與原作者沒有關係，也沒有得到原作者的認可。下列新功能如果有問題，請回報到這個 repository，不要回報給原專案。

### 與原版的差異

| | 原版（0.9.2） | 本 fork |
|---|---|---|
| 介面語言 | 一律跟隨瀏覽器的語言 | 可在設定頁從 18 種語言中選擇，或選「跟隨瀏覽器」（見[語言](#語言)） |
| 翻譯 | 7 種語言（韓文只翻了一部分，西班牙文缺 4 條字串） | 18 種語言：新增 11 種（包括繁體與簡體中文），並補齊韓文和西班牙文；瀏覽器語言設為這些語言時也會自動使用 |
| 阿拉伯文排版 | 由左到右 | 設定頁、工具列小視窗和網頁通知框都改為由右到左 |
| 設定頁 | 所有設定排成一長串 | 基礎設定放在前面；進階設定收在按一下才展開的區塊裡。新外觀支援深色模式和窄視窗版面，「儲存」按鈕固定在底部隨時按得到 |
| 設定說明 | 只有簡短的標籤 | 滑鼠停在設定頁的任一設定上，就會顯示它的作用；所有內建語言都有 |
| 「在下列主機名稱上不顯示通知」 | 沒有作用（檢查的程式在原專案 commit `1cfbf2e` 被刪除） | 恢復正常：清單上的頁面仍會封鎖彈出視窗，但不顯示通知 |
| 通知框的關閉按鈕 | 永遠是英文 | 已翻譯 |

詳細說明：

- **語言切換。** 選擇的語言會套用到設定頁、工具列小視窗、網頁上的通知框，以及工具列圖示的提示文字，切換後不必重新載入就會生效。還沒有翻譯的文字會改用英文顯示。擴充功能的名稱、描述和快捷鍵說明是由瀏覽器顯示的，所以一律跟隨瀏覽器的語言。
- **設定說明。** 這些說明是對照實際的程式碼寫的，所以包含標籤沒寫到的細節。例如：倒數自動按下的是你 10 天內對該網站選過的動作；「模擬允許」可能讓登入視窗失效；「重設為預設值」要按下儲存才會生效。
- **設定頁。** 基礎設定包括：語言、預設動作、倒數時間、顯示時間、位置、「信任」按鈕的作用、工具列數字、同網站的彈出視窗、常見問題頁面，以及兩份白名單。進階設定預設收合，要展開才會看到：通知框、不顯示通知的網站、自訂 CSS、通訊協定、網址規則、保護範圍和頁面重新導向。
- **由右到左。** 使用阿拉伯文時，頁面會左右翻轉，但網址、主機名稱清單和程式碼仍維持由左到右顯示。
- **不顯示通知的主機名稱。** 比對方式是頁面的完整主機名稱，和原專案出問題之前相同。這些頁面上的規則和預設動作仍會照常執行。

本 fork 以原專案的 commit [`c680634`](https://github.com/schomery/popup-blocker/commit/c680634)（0.9.2 版）為基礎。只有 [`v3/`](v3) 裡的 Manifest V3 版本有修改；[`v2/`](v2) 是原本的舊版，維持原樣。

---

### 關於這個擴充功能

Popup Blocker Pro i18n 會阻止網站開啟新視窗和新分頁。大多數彈出視窗封鎖工具是在彈出視窗出現之後才處理；這個擴充功能會在任何東西開啟之前就攔下請求，並詢問你要怎麼做。不同的請求會列在頁面角落的小框裡，同一個網址重複請求時會用數字標示次數。

#### 攔截的對象

- 用 `window.open` 開啟的彈出視窗
- 帶有 `target="_blank"` 的連結
- 會開啟新視窗的表單送出
- `about:blank` 手法（先開一個空白視窗，再把網址載入進去）
- 從網址為 `javascript:` 或 `data:` 的框架裡開啟的彈出視窗，這是繞過封鎖工具的常見手法
- 可選：在彈出視窗被擋下後把分頁轉走的頁面，或自行轉址的頁面

#### 攔下請求後可以怎麼處理

| 按鈕 | 動作 | 快速鍵 |
|---|---|---|
| 允許 | 照網頁原本的意思開啟彈出視窗 | Alt + Shift + A |
| 拒絕 | 捨棄這個請求 | Alt + Shift + D |
| 背景開啟 | 在背景分頁開啟該網址 | Alt + Shift + B |
| 轉址 | 改在目前分頁開啟該網址 | Alt + Shift + R |
| 信任 | 把網站加入白名單（按兩次確認） | Alt + Shift + T |

在 macOS 上，快速鍵改用 Control + Option。你也可以在 `chrome://extensions/shortcuts` 設定瀏覽器層級的快速鍵，用來允許、拒絕、背景開啟、轉址目前分頁的最後一筆請求，或把焦點移到該筆請求。

#### 設定一覽

- 在工具列小視窗中，可全域開關封鎖，或只對目前網站開關
- 彈出視窗目的地和整個頁面的白名單，以及可放行的通訊協定（例如 `magnet:`）
- 預設動作、可自動執行預設動作的倒數，以及用 JSON 撰寫的網址規則（正規表示式或 URL Pattern），讓擴充功能自動判斷
- 通知框的位置、寬度和自訂 CSS，不顯示通知的網站清單，以及工具列圖示上的封鎖數量
- 匯入、匯出，以及透過瀏覽器帳號同步指定的清單

### 安裝

官方商店上的是**原版**擴充功能，不包含本 fork 的修改：

| 瀏覽器 | 原版擴充功能 |
|---|---|
| Chrome / Chromium | https://chrome.google.com/webstore/detail/popup-blocker-strict/aefkmifgmaafnojlojpnekbpbmjiiogg |
| Microsoft Edge | https://www.microsoft.com/store/p/popup-blocker/9ng26z2368n6 |
| Firefox / Firefox for Android | https://addons.mozilla.org/firefox/addon/popup-blocker/ |
| Opera | https://addons.opera.com/extensions/details/popup-blocker-ultimate/ |

要使用本 fork，請從原始碼安裝。如果你已經裝了商店版，請先停用它，以免兩個擴充功能同時攔截彈出視窗。

**Chrome、Edge 和其他 Chromium 瀏覽器**

1. 下載這個 repository（[Code → Download ZIP](../../archive/refs/heads/master.zip)，或從 [Releases](../../releases) 下載打包好的版本，如果有的話）並解壓縮。
2. 開啟 `chrome://extensions`（Edge 是 `edge://extensions`），打開「開發人員模式」。
3. 按「載入未封裝項目」，選擇 `v3` 資料夾。
4. 請保留這個資料夾：瀏覽器每次啟動都會從這裡載入擴充功能。

**Firefox**

正式版 Firefox 只能安裝經過 Mozilla 簽署的擴充功能。想試用本 fork 的話，請開啟 `about:debugging`，選擇「這個 Firefox」，按「載入暫時附加元件…」，再選擇 `v3/manifest.json`。暫時附加元件會在 Firefox 重新啟動後被移除。若要長期安裝，需要自行到 [addons.mozilla.org](https://addons.mozilla.org/developers/) 簽署，而這必須先修改 `v3/manifest.json` 裡的附加元件 ID（目前仍是原版擴充功能的 ID）。

### 打包

這個專案不需要編譯：`v3` 資料夾本身就是擴充功能。要產生用來發布的壓縮檔，請把 `v3` 裡的內容壓縮起來，讓 `manifest.json` 位於壓縮檔的最上層：

```bash
cd v3 && zip -r ../popup-blocker-pro-i18n.zip .
```

### 語言

English（英文）、العربية（阿拉伯文）、Deutsch（德文）、Español（西班牙文）、Français（法文）、Bahasa Indonesia（印尼文）、Italiano（義大利文）、日本語（日文）、한국어（韓文）、Nederlands（荷蘭文）、Polski（波蘭文）、Português (Brasil)（巴西葡萄牙文）、Русский（俄文）、Türkçe（土耳其文）、Українська（烏克蘭文）、Tiếng Việt（越南文）、简体中文（簡體中文）和繁體中文。

本 fork 新增的翻譯（德文、印尼文、義大利文、日文、韓文、荷蘭文、波蘭文、俄文、烏克蘭文、越南文，以及繁簡兩種中文）是在機器輔助下完成的，只檢查過用語一致性。歡迎母語使用者協助修正。

### 翻譯

翻譯檔放在 [`v3/_locales/<語言代碼>/messages.json`](v3/_locales)。新增語言的方式：

1. 把 `v3/_locales/en/messages.json` 複製到以語言代碼命名的新資料夾（例如 `de` 或 `zh_CN`），然後翻譯其中的 `message` 值。
2. 在 [`v3/i18n.js`](v3/i18n.js) 的 `i18n.locales` 中加入該語言代碼和它在自己語言中的名稱，這樣它才會出現在語言選單裡。如果該語言是由右到左書寫的，還要把語言代碼加到同一個檔案中 `i18n.dir` 的清單裡。

原專案在 [Transifex](https://explore.transifex.com/github-7/popup-blocker-strict/) 上收集翻譯。本 fork 新增的字串（語言選單和設定說明）不在 Transifex 上。

### 相關連結

這些頁面屬於原專案。擴充功能在安裝時和更新後也會開啟原版的常見問題頁面（最多每 45 天一次，可在設定中關閉），解除安裝時則會開啟意見回饋頁面。

- 常見問題：https://webextension.org/listing/popup-blocker.html
- 測試頁面：https://webbrowsertools.com/popup-blocker/
- 介紹影片：https://www.youtube.com/watch?v=Jp-RaiTHzCQ

### 支持原作者

這個擴充功能是 Jeremy Schomery 的作品。如果它對你有幫助，歡迎支持原作者：

- [PayPal](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=inbasic%2ecorp%40gmail%2ecom&lc=CA&item_name=support%20extension%20development&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_LG%2egif%3aNonHosted)
- Bitcoin：`bc1qh7juzrxrawpr65elm4qs285m5rdhnhgsn7h2jf`

### 授權

本專案和原專案一樣，以 [Mozilla Public License 2.0](LICENSE) 授權釋出。本 fork 修改過的檔案仍適用 MPL-2.0。
