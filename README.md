# StickerSmashExpoBoiler 

Project Name: StickerSmashExpoBoiler

Bundle Id / Package Name: com.simform.stickersmashexpoboiler

---

## Project Desctiption

A StickerSmashExpoBoiler boilerplate to kickstart your project with some commonly used setups, components, navigation and screens.

## Prerequisites

**iOS** : XCode(16) onwards

**Android** : Android Studio(Meerkat | 2024.3.1) with gradle(6.2) onwards

**Editor** : Visual Studio Code



## How to Run the Project when using EAS

  - Run iOS app

    ```bash
     yarn ios:build:eas:dev
    ```
    - Run iOS app in preview envrionment 
    
     ```bash
     yarn ios:build:eas:preview
    ```
    - Run iOS app in production envrionment

     ```bash
     yarn ios:build:eas:prod
    ```
     
   - Run Android app

     ```bash
     yarn android:build:eas:dev
     ```
     - Run Android app in preview environment 

     ```bash
     yarn android:build:eas:preview
     ```
     - Run Android app in production environment 

     ```bash
     yarn android:build:eas:prod
     ```
Note: Ensure that your eas.json file includes the ```projectId``` and ```slug``` that was generated for your project in the EAS dashboard.

To run EAS builds on a remote server, you need to add secrets with EXPO_PUBLIC like EXPO_PUBLIC_API_URL similar to how you've defined them in your local .env files (e.g., ```EXPO_PUBLIC_API_URL```). ```Your environment variables should match the names of the secrets.```

There is an exception when adding the Sentry Auth token while uploading **source maps** to the portal. The auth token must be strictly defined as ```SENTRY_AUTH_TOKEN``` across all environments, as Sentry does not allow any suffixes in the key.

- Note: This yarn scripts will lint your code first. If there are no lint errors, then it will run the ios or android app. Otherwise it will show the lint errors in the terminal.

In the output, you'll find options to open the app in a

- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)

## List of all dependencies used in the project with their usage

List all dependencies from the package.json file along with their usage. This list must be updated every time you change/add any dependecy. Here are some examples:

- **Framework:**
  - [expo](https://docs.expo.dev/)

- **State management libraries:**
  - [React Redux](https://react-redux.js.org/), [redux-persist](https://github.com/rt2zz/redux-persist)  
  
- **Middleware libraries:**
  - [Redux Toolkit](https://redux-toolkit.js.org/) 

- **Navigation:**

  - [react-navigation](https://github.com/react-navigation/react-navigation), [react-native-gesture-handler](https://github.com/kmagiera/react-native-gesture-handler), 
    [react-navigation-stack](https://github.com/react-navigation/stack),
  [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context),
    [react-native-screens](https://github.com/software-mansion/react-native-screens)

- **For Api**
  - [apisauce](https://github.com/infinitered/apisauce), [axios](https://github.com/axios/axios)

- **Storage:**

  - [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv)

- **Crash report:**

  - [@sentry/react-native](https://github.com/getsentry/sentry-react-native)

- **For Validations:**

  - [formik](https://github.com/jaredpalmer/formik), [yup](https://github.com/jquense/yup)

- **For Utilities**

  - [lodash](https://lodash.com/), [i18next](https://github.com/i18next/i18next), [react-i18next](https://github.com/i18next/react-i18next), [expo-localization](https://docs.expo.dev/versions/latest/sdk/localization/), [react-native-permissions](https://github.com/zoontek/react-native-permissions)


## Following accounts are used for the mentioned platform

_Mention all the accounts used for various development and deployement platforms. Just email/username should be mentioned but never a password. Make sure this information stays in a private repository. If your repository is public, do not share this kind of private information via readme. Provide another private source. Like a private file on our zoho or a file in Microsoft Teams._