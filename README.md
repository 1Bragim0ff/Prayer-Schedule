# Prayer-Schedule
Muslim Prayer Schedule. Extension for browser.

![screely-1645631985204](https://user-images.githubusercontent.com/61598125/155726081-ef57bd97-113b-4f17-8a27-0994722544c9.png)
# Supported browsers
<a href="https://chrome.google.com/webstore/detail/prayer-schedule/jhnipmlpomflpekhnamaklehjakhjgnk" target="_blank"><img src="https://imgur.com/3C4iKO0.png" width="64" height="64"></a>

# Build/Run
**Requirements**

- [Node.js](https://nodejs.org) v16.13.1 or greater
- NPM v8 or greater
- Google Chrome or any other browser

**Run the app**

Before running the application, you need to get the API key from https://opencagedata.com/api and paste it in the config.js file in the src folder

```
npm install
npm run build
```

You can now load the extension into your browser through the browser's extension tools page:

- Chrome:
  - Type `chrome://extensions` in your address bar to bring up the extensions page.
  - Enable developer mode (toggle switch)
  - Click the "Load unpacked extension" button, navigate to the `build` folder of your local extension instance, and click "Ok".

# Localization

Application localization uses i18n from [Chrome API](https://developer.chrome.com/docs/extensions/reference/i18n/).
The application has two components that need to be localized - time and text.
- The time format automatically adjusts to the user's region, so this part does not need to be localized manually
- To localize text in the application, you need to create a folder with the abbreviation of your language in the public /\_locales\_ folder, as described in the [Chrome API](https://developer.chrome.com/docs/extensions/reference/i18n/) documentation

**The application has already been translated into the following languages:**
- Russian
- English

