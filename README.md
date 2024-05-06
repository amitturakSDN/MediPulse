# MediPulse (Mobile Application)

## Project Description
The objective of the application is to gather patient health data and maintain their health records.
Share the health documents with the providers so that they can review the patient's health record and conduct proper examinations based on that information.

The mobile app serves as the platform where appointments can be booked and patient health records can be maintained. Patients can book their appointments using
a scanner and NFC technology, and they have the facility to share their health records with the respective doctors.

## Prerequisites

- [Node.js > 16](https://nodejs.org) and npm (Recommended: Use [nvm](https://github.com/nvm-sh/nvm))
- [Watchman](https://facebook.github.io/watchman)
- [Xcode 14](https://developer.apple.com/xcode)
- [Cocoapods 1.10.1](https://cocoapods.org)
- [JDK > 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Android Studio and Android SDK](https://developer.android.com/studio)

## Base dependencies

- [axios](https://github.com/axios/axios) for networking.
- [prop-types](https://github.com/facebook/prop-types) to type-check our components exposed properties.
- [react-native-config](https://github.com/luggit/react-native-config) to manage envionments.
- [react-navigation](https://reactnavigation.org/) navigation library.
- [react-native-localization](https://github.com/stefalda/ReactNativeLocalization) for string localization.
- [react-native-mmkv-storage](https://github.com/ammarahm-ed/react-native-mmkv-storage#readme) as storage solution.
- [redux](https://redux.js.org/) for state management.
- [redux-persist](https://github.com/rt2zz/redux-persist) as persistance layer.
- [redux-thunk](https://github.com/gaearon/redux-thunk) to dispatch asynchronous actions.
- [jest](https://facebook.github.io/jest/) and [react-native-testing-library](https://callstack.github.io/react-native-testing-library/) for testing.

## Getting Started

Follow these steps to clone, install dependencies, and run the MediPulse application:

```bash
# Clone the project repository into your local machine
git clone https://google.com/MediPulse_RN 

# Navigate to the project folder
cd MediPulse_RN

# Install all the required npm packages
npm install

# Start the android application locally 
npm react-native run-android

# Start the Ios application locally 
npm react-native run-ios

