# Daily Focus

A React Native mobile app for tracking daily tasks and building a consistent routine. It runs on Android and iOS through Expo.

## Features

- Track daily progress
- Mark tasks as complete
- Add new focus tasks
- View a daily streak
- Native Android and iOS experience

## Run Locally

Install dependencies:

```bash
npm install
```

Start Expo:

```bash
npm start
```

Then scan the QR code with Expo Go, or use one of these commands:

```bash
npm run android
npm run ios
```

For Windows PowerShell systems where `npm.ps1` is blocked, use:

```powershell
npm.cmd install
npm.cmd start
```

## Build Android APK / iOS IPA

Install EAS CLI and log in to Expo:

```bash
npm install --global eas-cli
eas login
```

Create the native build configuration:

```bash
eas build:configure
```

Build an Android APK for testing:

```bash
eas build --platform android --profile preview
```

Build an Android or iOS production release:

```bash
eas build --platform all --profile production
```

Android builds produce an APK or AAB. iOS builds produce an IPA and require an Apple Developer account.

## Build and Upload to Sauce Labs

The workflow in [.github/workflows/build-upload-sauce.yml](.github/workflows/build-upload-sauce.yml) builds an Android APK with EAS, uploads it to Sauce Labs storage, and runs an Appium smoke test on an Android device. It runs on pushes to `main` or from **Actions > Build Expo APK and Upload to Sauce Labs > Run workflow**.

Add these repository secrets under **Settings > Secrets and variables > Actions**:

| Secret | Value |
| --- | --- |
| `EXPO_TOKEN` | Expo access token created with `eas token:create` |
| `SAUCE_USERNAME` | Sauce Labs username |
| `SAUCE_ACCESS_KEY` | Sauce Labs access key |

The workflow also keeps a downloadable APK as a GitHub Actions artifact. The uploaded Sauce Labs app identifier is based on `daily-focus.apk`; use the identifier returned by the Sauce upload response in your Appium capabilities, for example `storage:filename=daily-focus.apk`.

The smoke test is in [tests/sauce-smoke.mjs](tests/sauce-smoke.mjs). It verifies that the Daily Focus screen opens and saves a Sauce Labs screenshot.

## Project Structure

- `App.js`: Expo entry point
- `src/App.jsx`: React Native screen and task logic
- `app.json`: Android/iOS app metadata
