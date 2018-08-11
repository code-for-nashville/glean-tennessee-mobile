# Glean Tennessee Mobile
Mobile app to allow farmers and other food providers to notify the [Society of St. Andrew](endhunger.org) of food donations available for harvest and pick up.

# Setup

### Requirements 

[node.js](https://nodejs.org/en/)

### Install dependencies
`$ npm install`

Download firebase configuration files or contact a project contributor for a config file. 

iOS - `ios/GleanTennesse/GoogleService-info.plist`
Android - `android/app/google-services.json`

# Development
### iOS
You can launch the dev server for iOS with `npm run dev:ios` or by running the project in XCode. [Docs](https://facebook.github.io/react-native/docs/running-on-simulator-ios)

### Android
You can launch the dev server for Android with `npm run dev:android`. A simulator will not open by default so you'll need to setup an Android simulator in Android Studio or use a tool like [Genymotion](https://www.genymotion.com/)

You will also need Google Play Services installed and updated on the emulator.